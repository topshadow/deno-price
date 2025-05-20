import { useRequestContext } from "hono/jsx-renderer";
import { loadTaobaoPassToken } from "../../core/calc-sign.ts";
import { TaobaoItemLite } from "../../core/taobao.ts";
import { Input } from "../../components/Input.tsx";
import { ZxcxProductDetail } from "../../core/zxcx.ts";
import { Tabs } from "../../components/Tabs.tsx";
import { db } from "../../core/db.ts";
import {
  FullCloudGoodDetail,
  FullCloudGoodRecord,
  FullCloudGoodSku,
} from "../../core/fullcloud.ts";
import { IYouyunProduct } from "../../core/youyun.ts";
import { Button } from "../../components/Button.tsx";
enum Platform {
  Taobao = "taobao",
  Zxhx = "zxhx",
}
const platforms: Platform = [Platform.Taobao, Platform.Zxhx];
export function PricePage() {
  return (
    <div id="page" x-data={JSON.stringify({ loading: false })}>
      <form
        hx-get="/product/price/search"
        hx-target="#result"
        hx-select="#result"
        x-on:submit="loading=true"
      >
        <div class="flex">
        <Input label="" placeholder="关键字" name="keyword"></Input>
          <Button type="submit" variant="primary" >搜索</Button>
          </div>
      </form>

      <div id="result">
        <div class="flex w-full flex-col gap-2" x-show="loading">
          <div
            class="h-3.5 w-full animate-pulse rounded-radius bg-on-surface/30 dark:bg-on-surface-dark/30"
            aria-hidden="true"
          >
          </div>
          <div
            class="h-3.5 w-full animate-pulse rounded-radius bg-on-surface/30 dark:bg-on-surface-dark/30"
            aria-hidden="true"
          >
          </div>
          <div
            class="h-3.5 w-full animate-pulse rounded-radius bg-on-surface/30 dark:bg-on-surface-dark/30"
            aria-hidden="true"
          >
          </div>
          <div
            class="h-3.5 w-1/2 animate-pulse rounded-radius bg-on-surface/30 dark:bg-on-surface-dark/30"
            aria-hidden="true"
          >
          </div>
          <span class="sr-only">loading</span>
        </div>
      </div>
    </div>
  );
}
function ProductGridContainer({ children }) {
  return (
    <div class="grid md:grid-cols-6 gap-5 mt-4 grid-cols-2 ">{children}</div>
  );
}
export async function PricePageSearch() {
  const c = useRequestContext();
  const keyword = c.req.query("keyword");
  let taobaoData: TaobaoItemLite[] = [];
  try {
    const searchResult = await loadTaobaoPassToken(keyword);
    taobaoData = searchResult.data.itemsArray;
  } catch (e) {
    console.log(e)
    taobaoData = [];
  }

  const [data] = await db.query<[ZxcxProductDetail[]]>(
    `
  select  *,Type::number(productInfo.price) as price from zxcx_goods where   productInfo is not NONE 
and ( string::contains(productInfo.store_name ,$kw )) order by price asc
`,
    { kw: keyword },
  );
  const [fullcloudData] = await db.query<[FullCloudGoodDetail[]]>(
    `
    select  name,skuList,brandName from fullcloud_product where string::contains(name,$kw)  limit 10
`,
    { kw: keyword },
  );
  const [youyunData] = await db.query<[IYouyunProduct[]]>(
    `
   select  * from youyun where string::contains(name,$kw) order by pfprice1 asc;
`,
    { kw: keyword },
  );

  return (
    <div id="result">
      <div>
        <Tabs
          tabs={[
            {
              label: "淘宝",
              content: (
                <ProductGridContainer>
                  {taobaoData.map((i) => (
                    <TaobaoProduct product={i}></TaobaoProduct>
                  ))}
                </ProductGridContainer>
              ),

              name: "test",
            },
            {
              label: "甄心汇选",
              content: (
                <ProductGridContainer>
                  {data.map((i) => <ZxhxProduct product={i}></ZxhxProduct>)}
                </ProductGridContainer>
              ),
              name: "zxcx",
            },
            {
              label: "全境云",
              content: (
                <ProductGridContainer>
                  {fullcloudData.map((p) => (
                    <>
                      {p.skuList.map((sku) => (
                        <FullCloudProduct product={p} sku={sku}>
                        </FullCloudProduct>
                      ))}
                    </>
                  ))}
                </ProductGridContainer>
              ),
              name: "fullcloud",
            },
            {
              label: "优云",
              content: (
                <ProductGridContainer>
                  {youyunData.map((p) => (
                    <YouyunProduct product={p}></YouyunProduct>
                  ))}
                </ProductGridContainer>
              ),
              name: "youyun",
            },
          ]}
          defaultActive="taobao"
        >
        </Tabs>
      </div>
    </div>
  );
}

export function TaobaoProduct({ product }: { product: TaobaoItemLite }) {
  return (
    <article class="group flex rounded-radius max-w-sm flex-col overflow-hidden bg-surface-alt text-on-surface dark:bg-surface-dark-alt dark:text-on-surface-dark">
      <div class="h-44 md:h-44 overflow-hidden">
        <img
          src={product.pic_path}
          alt="a penguin robot talking with a human"
        />
      </div>
      <div class="flex flex-col gap-4 p-6">
        {/* <span class="text-sm font-medium">Features</span> */}
        <h6
          class="text-balance text-xl  lg:text-2xl font-bold text-on-surface-strong dark:text-on-surface-dark-strong"
          aria-describedby="featureDescription"
        >
          <div class="text-xl">价格{product.priceShow.price}</div>
        </h6>
        <p>
          规格: {product.structuredUSPInfo?.map((p) =>
            p.propertyName + ":" + p.propertyValueName
          ).join(";")}
        </p>
        <p id="featureDescription" class="text-pretty text-sm">
          {product.title}
        </p>
        <a
          href={`https://chaoshi.detail.tmall.com/item.htm?id=${product.item_id}`}
          target={"_blank"}
          class="text-sm font-medium text-primary-strong dark:text-primary-strong underline text-primary-dark underline-offset-1"
        >
          在线网址
        </a>
      </div>
    </article>
  );
}
export function ZxhxProduct({ product }: { product: ZxcxProductDetail }) {
  return (
    <div class="text-xs relative py-10">
      <div>{product.productInfo.store_name}</div>
      <div>
        <img src={product.productInfo.image} class="w-full " />
      </div>
      <div>{product.productInfo.store_info}</div>
      <div>规格名:{product.productInfo.unit_name}</div>
      <div>市场价: {product.productInfo.market_price}</div>
      <div>价格:{product.productInfo.price}</div>
    </div>
  );
}
export function FullCloudProduct(
  { product, sku }: { product: FullCloudGoodDetail; sku: FullCloudGoodSku },
) {
  return (
    <div class="text-xs relative py-10">
      <div>{product.name}</div>
      <div>
        <img src={sku.picUrl} class="w-full" alt="" />
      </div>
      <div>
        进价: {sku.basePrice}
      </div>
      <div>市场价:{sku.officialDistriPrice}</div>
      <div>建议销售价格:{sku.suggestPrice}</div>
      <div>
        规格:{sku.propertys.map((p) => p.specName + ":" + p.specValueName).join(
          ";",
        )}
      </div>
    </div>
  );
}

export function YouyunProduct({ product }: { product: IYouyunProduct }) {
  return (
    <div>
      <div>{product.name}</div>
      <div>
        <img
          src={`https://byyoupic.oss-cn-shenzhen.aliyuncs.com/` +
            product.imageurl}
          class="w-full"
          alt=""
        />
      </div>
      <div>
        价格: {product.pfprice1}
      </div>
      <div>规格:{product.size}</div>
    </div>
  );
}
