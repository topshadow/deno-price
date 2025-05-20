import { useRequestContext } from "hono/jsx-renderer";
import Navbar from "./Navbar.tsx";

type MenuItem = {
  link: string;
  icon: any;
  label: string;
};
const routes: MenuItem[] = [
  {
    link: "/",
    icon: <ion-icon name="analytics-outline"></ion-icon>,
    label: "数据统计",
  },
  {
    link: "/product/price",
    icon: <ion-icon name="cash-outline"></ion-icon>,
    label: "比价",
  },
];
export function BaseLayout({ children }) {
    const c = useRequestContext();
  let isActive = (m: MenuItem) => c.req.path == m.link;
  return (
    <html
      lang="en"
      class=" text-surface bg-surface-dark dark"
      data-theme="halloween"
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>版纳智联数据中心</title>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        >
        </script>
       
        <script src="//unpkg.com/alpinejs" defer></script>
        <link rel="stylesheet" href="/static/output.css" />
      </head>
      <body
        x-data={JSON.stringify({
          isCollapsed: false,
          "selectedRoute": c.req.path,
          selectedRouteLabel: routes.find((r) => isActive(r))?.label,
        })}
        class=" text-surface bg-surface-dark"
      >
        {children}
      </body>
    </html>
  );
}



