import { db } from "../core/db.ts";

type PlatformPanel = {
  name: string;
  count: number;
  logo: string;
  lastSyncTime: Date;
};
export async function IndexPage() {
  const [[{ count: fullcloudCount }]] = await db.query<[[{ count: number }]]>(
    "select count() as count from fullcloud_product group all",
  );
  const [[{ count: zxcxCount }]] = await db.query<[[{ count: number }]]>(
    "select count() as count from zxcx_goods group all",
  );
  const [[{ count: youyunCount }]] = await db.query<[[{ count: number }]]>(
    "select count() as count from youyun group all",
  );
  
  let syncDate = new Date(2025, 5, 20);
  let panels: PlatformPanel[] = [
    { name: '全境云供应商', lastSyncTime: syncDate, count: fullcloudCount, logo: 'https://50008426.s21i.huaweicloudsite.cn/4/ABUIABAEGAAg1ZjTvwYovJuFrgIw8w049gM.png' },
    { name: '甄新汇选', lastSyncTime: syncDate, count: zxcxCount, logo: 'https://www.zhenxinhuixuan.com/uploads/allimg/20240221/1-24022114055bD.png' },
    { name: '优云', lastSyncTime: syncDate, count: youyunCount, logo: 'https://www.yun8609.com/jsp/images/logo-yundian.png' },
    
    

  ];

  return (
    <div>
      <div class="text-2xl text-gray-50">数据统计</div>
      <hr />
      <div class="grid grid-cols-4 mt-4">
        {/* 卡片 */}

        {panels.map(p => <article class="group flex rounded-radius max-w-sm flex-col overflow-hidden bg-surface-alt text-on-surface dark:bg-surface-dark-alt dark:text-on-surface-dark">
          <div class="h-24 md:h-24 overflow-hidden">
            <img
              src={p.logo}
              class="object-cover transition duration-700 ease-out group-hover:scale-105 "
              alt="a penguin robot talking with a human"
            />
          </div>
          <div class="flex flex-col gap-4 p-6">
            {/* <span class="text-sm font-medium">Features</span> */}
            <h3
              class="text-balance text-xl lg:text-2xl font-bold text-on-surface-strong dark:text-on-surface-dark-strong"
              aria-describedby="featureDescription"
            >
              {p.name}
            </h3>
            <p>商品总数:{p.count}</p>
            <p id="featureDescription" class="text-pretty text-sm">
              上次同步时间:{p.lastSyncTime.toLocaleDateString()}
            </p>
          </div>
        </article>
        )}
       
      </div>
    </div>
  );
}
