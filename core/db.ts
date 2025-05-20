import {Surreal} from '@surrealdb/surrealdb'
const db= new Surreal();
await db.connect(Deno.env.get('dburl') as string);
await db.signin({username:'root',password:'root'});
await db.use({'database':'test',namespace:'test'});

let a= await db.query('select * from a');
console.log(`a:`,a)
export {db}