export type FullCloudSearchGoodsResult = {
  data: {
    goodsPage: {
      pages: number;
      records: FullCloudGoodRecord[];
      total: number;
      size: number;
      current: number;
    };
    categories: any;
    props: Record<string, string>;
    tags: { tags: { name: string; value: string } };
  };
  success: true;
  msg: null;
  status: 200;
};

export type FullCloudGoodRecord = {
  available: 1;
  id: "1891827709180645378";
  inventory: null;
  /**商品名称 */
  name: "贤蓝  小瓶调味粉";
  officialDistriPriceRage: "16.5";
  onSelection: 0;
  operationId: null;
  operationName: null;
  priceRange: "12.18";
  profitRange: "毛利率28.9%";
  resourceUrl:
    "https://scce-cos-prd.obs.cn-south-1.myhuaweicloud.com:443/c058e581cc3547c6a9fce20601451b6f.jpg";
  salesQuantity: "0";
  selectionId: "1732571091281682434";
  selectionName: "VIP商品库";
  suggestPriceRange: "15.7";
};

export type FullCloudGoodDetail = {
  addLibId: null;
  basePrice: "￥154.35";
  brandId: "1395316896789696514";
  brandName: "雅鹿";
  carouselImgList: string[];
  categoryId1: "1395308859156860930";
  categoryId2: "1395308859186221057";
  categoryId3: "1395308859475628034";
  categoryName1: "家纺";
  categoryName2: "床上用品";
  categoryName3: "棉花被";
  choiceLotLibName: "VIP商品库";
  contentImgList: string[];
  dataType: 0;
  deliveryPlace: "";
  deliveryTimeType: 2;
  extSpu: null;
  freeExpress: 0;
  id: string;
  inSelfSpuLib: 0;
  inventory: 2000;
  inventoryStr: "2000件";
  isLimitArea: "Y";
  limitArea: string;
  limitAreaJson: number[];

  limitAreaType: 0;
  logisticsNameList: null;
  logisticsNamesStr: "";
  materialId: null;
  maxBasePrice: 147;
  maxOfficialDistriPrice: 1199;
  maxProfitRate: number;
  maxSuggPrice: 1140;
  minBasePrice: 147;
  minOfficialDistriPrice: 1199;
  minProfitRate: number;
  minSuggPrice: 1140;
  name: "雅鹿 抑菌全棉印花夏被米漾200*230cm";
  officialDistriPrice: "￥1199.00";
  partno: "";
  propertys: "[]";
  propertysJson: [];
  resellerGross: "￥985.65";
  resellerGrossRate: "638.58%";
  returnInstructions: 0;
  salesQuantity: 0;
  salesQuantityStr: "0件";
  singleSpec: 1;
  /**sku列表 */
  skuList: FullCloudGoodSku[];

  source: "通化泓臻商贸有限公司";
  spuId: "1854124297526546433";
  spuStatus: 1;
  status: 10;
  suggestPrice: "￥1140.00";
  supplierId: "1637633974175850497";
  supplierName: "通化泓臻商贸有限公司";
  taxCode: "1040199990000000000";
  templateId: "1850768631808176129";
  video: "";
  videoImg: null;
};
export type FullCloudGoodSku = {
  alarmStock: "50件";
    /** 进价*/ 
    basePrice: "￥154.35";
    buyStartCount: 1;
    distriPrice?: number;
    id: "1854124297962754051";
    /**市场价格 */
    officialDistriPrice: "￥1199.00";
    picUrl:
      "https://scce-cos-prd.obs.cn-south-1.myhuaweicloud.com:443/244e309883fa4e3c93e1cb25e3e99988.JPG";
    profitRate: number;
    propertys: [
      {
        loading: false;
        picUrl: "";
        specId: "1384493961015152641";
        specName: "规格";
        specValueId: "1384493961187119105";
        specValueName: "200*230cm";
      },
    ];
    saasBasePrice: number;
    salesQuantity: "0件";
    skuCode: number;
    skuId: "1854124297962754050";
    spuId: "1854124297526546433";
    /**库存 */
    stock: "2000件";
    /**建议销售价格 */
    suggestPrice: "￥1140.00";
  } 
