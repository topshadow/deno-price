import { Surreal } from "@surrealdb/surrealdb";
import { db } from "../core/db.ts";
const onlinedb = new Surreal();
await onlinedb.connect(Deno.env.get("online_url") as string);
await onlinedb.signin({ username: "root", password: "root" });
await onlinedb.use({ "database": "test", namespace: "test" });
let tableName = "fullcloud_product";
const [[{ count: youyunCount }]] = await db.query<[[{ count: number }]]>(
  `select count() from ${tableName} group all`,
  { tableName },
);
console.log("count:", youyunCount);
for (let i = 0; i < Math.ceil(youyunCount / 100); i++) {
  console.log("i:", i);
  const [youyundata] = await db.query<[any[]]>(
    `select * from ${tableName} limit 100 start $st`,
    { st: i * 100, tableName },
  );
  youyundata.forEach((i) => {
    delete i.limitArea;
    delete i.limitAreaJson;
  });
  await onlinedb.insert(tableName, youyundata);
}
