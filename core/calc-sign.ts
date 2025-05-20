import { md5 } from "@takker/md5";
import { encodeHex } from "@std/encoding";
import { TaobaoSearchResult } from "./taobao.ts";


let str =
  '0fdbc1715b114b47260053a1a4d8574a&1747645726241&12574478&{"appId":"43356","params":"{\\"device\\":\\"HMA-AL00\\",\\"isBeta\\":\\"false\\",\\"grayHair\\":\\"false\\",\\"from\\":\\"nt_history\\",\\"brand\\":\\"HUAWEI\\",\\"info\\":\\"wifi\\",\\"index\\":\\"4\\",\\"rainbow\\":\\"\\",\\"schemaType\\":\\"auction\\",\\"elderHome\\":\\"false\\",\\"isEnterSrpSearch\\":\\"true\\",\\"newSearch\\":\\"false\\",\\"network\\":\\"wifi\\",\\"subtype\\":\\"\\",\\"hasPreposeFilter\\":\\"false\\",\\"prepositionVersion\\":\\"v2\\",\\"client_os\\":\\"Android\\",\\"gpsEnabled\\":\\"false\\",\\"searchDoorFrom\\":\\"srp\\",\\"debug_rerankNewOpenCard\\":\\"false\\",\\"homePageVersion\\":\\"v7\\",\\"searchElderHomeOpen\\":\\"false\\",\\"search_action\\":\\"initiative\\",\\"sugg\\":\\"_4_1\\",\\"sversion\\":\\"13.6\\",\\"style\\":\\"list\\",\\"ttid\\":\\"600000@taobao_pc_10.7.0\\",\\"needTabs\\":\\"true\\",\\"areaCode\\":\\"CN\\",\\"vm\\":\\"nw\\",\\"countryNum\\":\\"156\\",\\"m\\":\\"pc_sem\\",\\"page\\":1,\\"n\\":48,\\"q\\":\\"%E7%99%BD%E9%86%8B\\",\\"qSource\\":\\"manual\\",\\"pageSource\\":\\"tbpc.pc_sem_alimama/a.201856.d13\\",\\"tab\\":\\"all\\",\\"pageSize\\":48,\\"totalPage\\":100,\\"totalResults\\":4800,\\"sourceS\\":\\"0\\",\\"sort\\":\\"_coefp\\",\\"bcoffset\\":\\"\\",\\"ntoffset\\":\\"\\",\\"filterTag\\":\\"\\",\\"service\\":\\"\\",\\"prop\\":\\"\\",\\"loc\\":\\"\\",\\"start_price\\":null,\\"end_price\\":null,\\"startPrice\\":null,\\"endPrice\\":null,\\"itemIds\\":null,\\"p4pIds\\":null,\\"categoryp\\":\\"\\",\\"myCNA\\":\\"rps3ILBQqgwBASQJikz/gasi\\",\\"clk1\\":\\"88519ddce779dff6bf6bd616c955c701\\",\\"refpid\\":\\"mm_2898300158_3078300397_115665800437\\"}"}';
// 每2分钟刷新一次token
// let token = "0a49860cc3a61bdf591cdf17bbd877c6";
let token_enc = "";
let tokenCookie = "";
// 固定
const now = Date.now(); //Date.now()
let appid = "12574478";
let cookie = "";
let lastTime = Date.now();
export function calcSign(
  token: string,
  timestamp: number,
  appid: string,
  datastr: string,
) {
  return encodeHex(md5(`${token}&${timestamp}&${appid}&${datastr}`));
}

function loadTaboByKeyword(keyword: string) {
  const data = JSON.stringify({
    "appId": "43356",
    "params": JSON.stringify({
      "device": "HMA-AL00",
      "isBeta": "false",
      "grayHair": "false",
      "from": "nt_history",
      "brand": "HUAWEI",
      "info": "wifi",
      "index": "4",
      "rainbow": "",
      "schemaType": "auction",
      "elderHome": "false",
      "isEnterSrpSearch": "true",
      "newSearch": "false",
      "network": "wifi",
      "subtype": "",
      "hasPreposeFilter": "false",
      "prepositionVersion": "v2",
      "client_os": "Android",
      "gpsEnabled": "false",
      "searchDoorFrom": "srp",
      "debug_rerankNewOpenCard": "false",
      "homePageVersion": "v7",
      "searchElderHomeOpen": "false",
      "search_action": "initiative",
      "sugg": "_4_1",
      "sversion": "13.6",
      "style": "list",
      "ttid": "600000@taobao_pc_10.7.0",
      "needTabs": "true",
      "areaCode": "CN",
      "vm": "nw",
      "countryNum": "156",
      "m": "pc_sem",
      "page": 1,
      "n": 48,
      "q": "%E7%99%BD%E9%86%8B",
      "qSource": "url",
      //   "pageSource": "tbpc.pc_sem_alimama/a.201856.d13",
      "tab": "all",
      "pageSize": 48,
      "totalPage": 100,
      "totalResults": 4800,
      "sourceS": "0",
      "sort": "_coefp",
      "bcoffset": "",
      "ntoffset": "",
      "filterTag": "",
      "service": "",
      "prop": "",
      "loc": "",
      "start_price": null,
      "end_price": null,
      "startPrice": null,
      "endPrice": null,
      "itemIds": null,
      "p4pIds": null,
      "categoryp": "",
      "myCNA": "rps3ILBQqgwBASQJikz/gasi",
      //   "myCNA": "+cOxIBbmKx0BASQJikzYLMoB",
      "clk1": "88519ddce779dff6bf6bd616c955c701",
      "refpid": "mm_2898300158_3078300397_115665800437",
    }),
  }).replace(`%E7%99%BD%E9%86%8B`, encodeURIComponent(keyword));

  const [token, time] = tokenCookie
    ? tokenCookie.split(";")[0].split("=")[1].split("_")
    : ["", ""];
  console.log(`token:$${token}$ time$${time}$`);
  let sign = tokenCookie ? calcSign(token, now, appid, data) : "";
  console.log(`sign:$${sign}$`);
  let headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "sec-ch-ua":
      '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
  };
  if (tokenCookie) {
    headers["cookie"] = tokenCookie;
  }
  return fetch(
    `https://h5api.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?jsv=2.7.2&appKey=12574478&t=${now}&sign=${sign}&api=mtop.relationrecommend.wirelessrecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp11&data=` +
      encodeURIComponent(data),
    {
      headers,

      "body": null,
      "method": "GET",
    },
  );
}

export async function loadTaobaoPassToken(keyword: string):Promise<TaobaoSearchResult> {
    await refreshTotken(keyword);
  return await loadTaboByKeyword(keyword).then((r) => r.text()).then((r) => {
    // console.log(r)
    let tmp = r.substring(r.indexOf("("));
    return tmp.substring(1, tmp.length - 1);
  }).then(r=>JSON.parse(r) as TaobaoSearchResult);
}
async function refreshTotken(keyword: string) {
    let passtime =  Date.now() - lastTime;
    console.log(`passtime:$${passtime / 1000}秒$`);
    
    
    if(tokenCookie&&Date.now()-lastTime<1000*60*2){
        return;
    }
  await loadTaboByKeyword(keyword).then((r) => {
    const rescookie = r.headers.get("set-cookie");

    tokenCookie = calcRescookie(rescookie!);
    lastTime=Date.now();
    return r.text();
  }).then((r) => console.log(r));
}

function calcRescookie(str: string) {
    console.log("res cookie:",str)
  let start = str.split("HttpOnly, ")[1];

  let segment = start.split(";").filter((m) => m.includes("_m_h5_tk")).map(
    (m) => m.substring(m.indexOf("_m_h5")),
  );
  return segment.map((s) => s + ";").join("");
}
