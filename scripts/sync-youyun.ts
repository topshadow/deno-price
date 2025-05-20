import { db } from "../core/db.ts";

const jsonl = await Deno.readTextFile('./static/data/miniapp.jsonl');

let data= jsonl.split('\n').filter(l=>l).map((line) => {
    const data = JSON.parse(line);
    const products = data.data.list;
    products.forEach(p => {
        p.pid = p.id;
        delete p.id
    });
    return products
})
let items = data.flat();
console.log(items.slice(0,10))
for (let i = 0;i< Math.round(items.length)/1000;i++){
await db.insert('youyun',items.slice(i*1000,(i+1)*1000))    
}
