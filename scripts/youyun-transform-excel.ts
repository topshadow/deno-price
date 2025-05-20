import * as XLSX from "xlsx/xlsx.mjs";
const jsonl = await Deno.readTextFile('./miniapp.jsonl');
let jsondata = jsonl.split('\n').filter(str => str).map(str => JSON.parse(str)).map(a => a.data.list).flat();
jsondata.forEach(i => {
    i['产品名称'] = i.name;
    delete i.name;
    i['产品价格'] = i.pfprice1;
    delete i.pfprice1;
    i['规格'] = i.size;
    delete i.size;
    i['图片'] = `https://oss.yun8609.net/` + i.imgurl
    delete i.imgurl


})
const worksheet = XLSX.utils.json_to_sheet(jsondata, {

  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "优云");

  await XLSX.writeFile(workbook, "优云.xlsx", { compression: true });
// await Deno.writeTextFile('data.json',JSON.stringify(jsondata))