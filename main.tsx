import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { jsxRenderer } from "hono/jsx-renderer";
import { DashLayout } from "./layout/DashLayout.tsx";
import { IndexPage } from "./pages/IndexPage.tsx";

import {
  deleteCookie,
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
} from "hono/cookie";
import {
  Logout,
  PassportLoginPage,
  PostPassportLogin,
} from "./pages/passport/login.tsx";
import { BaseLayout } from "./layout/BaseLayout.tsx";
import { PricePage, PricePageSearch } from "./pages/product/PricePage.tsx";
import { BlankLayout } from "./layout/BlankLayout.tsx";
import { DataSync } from "./pages/product/DataSync.tsx";
import { SystemSetting } from "./pages/system/SystemSettings.tsx";
const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));
app.use(async (c, next) => {
  const token = getCookie(c, "token");
  if (c.req.url.includes("/passport") || token) {
    await next();
  } else {
    return c.redirect("/passport/login");
  }
});

app.use(
  jsxRenderer(({ children }, c) =>
    c.req.path.includes("passport")
      ? <BlankLayout>{children}</BlankLayout>
      : <DashLayout>{children}</DashLayout>
  ),
);
// const indexHtml = await Deno.readTextFile("./static/index.html");
app.get("/", (c) => c.render(<IndexPage></IndexPage>));
// app.get("/", (c) => c.html(indexHtml));
// passport
app.get("/passport/login", (c) => c.render(<PassportLoginPage />));
app.post("/passport/login", (c) => c.render(<PostPassportLogin />));
app.get("/passport/logout", (c) => c.render(<Logout></Logout>));

// /product/price
app.get("/product/price", (c) => c.render(<PricePage></PricePage>));
app.get("/product/price/search", (c) => c.render(<PricePageSearch />));
app.get('/product/data-sync', c => c.render(<DataSync />))
app.get('/system/setting',c=>c.render(<SystemSetting/>))
// app.notFound((c) => c.html(indexHtml));

export default app;
