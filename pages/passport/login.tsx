import { deleteCookie, setCookie } from "hono/cookie";
import { useRequestContext } from "hono/jsx-renderer";
import { Input } from "../../components/Input.tsx";

export function PassportLoginPage() {
  return (
    <div class={"mx-auto max-w-64 mt-4   "}>
      <h1 class="text-center">版纳智联数据中心</h1>
      <form class="input-validation-required" hx-post="/passport/login">
        <sl-input name="username" label="账号" required></sl-input>
        <Input name="username" label="账号" />
        <br />

        <Input name="password" type="password" label="密码" />
        <br />
        <button type="submit" variant="primary">登录</button>

        <div id="error"></div>
      </form>
    </div>
  );
}
export async function PostPassportLogin() {
  const c = useRequestContext();
  const { username, password } = await c.req.parseBody();
  console.log(username, password);
  if (username == "admin" && password == "admin@123") {
    setCookie(c, "token", "admin");
    c.res.headers.set("hx-location", "/");
    return <div>ok登录成功</div>;
  } else {
    c.res.headers.set("hx-retarget", "#error");
    return <div>用户名或者密码错误</div>;
  }
}

export async function Logout() {
  const c = useRequestContext();
  deleteCookie(c, "token");
  // c.res.headers.set("HX-Redirect", "/passport/login");
  // c.res.headers.set("hx-refresh", "true");
  c.res.headers.set("HX-Location", "/passport/login");
  return <div>ok</div>;
}
