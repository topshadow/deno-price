import { useRequestContext } from "hono/jsx-renderer";
import Navbar from "./Navbar.tsx";
import { BaseLayout } from "./BaseLayout.tsx";

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
  {
    link: "/product/data-sync",
    icon: <ion-icon name="cloud-upload-outline" size="middle"></ion-icon>,
    label: "同步数据",
  },
  {
    link: "/system/setting",
    icon: <ion-icon name="settings-outline"></ion-icon>,
    label: "设置",
  },
  
];
export function DashLayout({ children }) {
  const c = useRequestContext();
  let isActive = (m: MenuItem) => c.req.path == m.link;

  return (
    <BaseLayout>
      <div
        x-data="{ showSidebar: false }"
        class="relative flex w-full flex-col md:flex-row"
      >
        <a class="sr-only" href="#main-content">skip to the main content</a>

        <div
          x-cloak
          x-show="showSidebar"
          class="fixed inset-0 z-10 bg-surface-dark/10 backdrop-blur-xs md:hidden"
          aria-hidden="true"
          x-on:click="showSidebar = false"
          {...{ "x-transition.opacity": "" }}
        >
        </div>

        <nav
          x-cloak
          class="fixed left-0 z-20 flex h-svh w-60 shrink-0 flex-col border-r border-outline bg-surface-alt p-4 transition-transform duration-300 md:w-64 md:translate-x-0 md:relative dark:border-outline-dark dark:bg-surface-dark-alt"
          x-bind:class="showSidebar ? 'translate-x-0' : '-translate-x-60'"
          aria-label="sidebar navigation"
        >
          <a
            href="/"
            class="ml-2 w-fit text-2xl font-bold text-on-surface-strong dark:text-on-surface-dark-strong flex"
          >
            <span>版纳智联</span>
            <img src="/static/logo.png" class="max-w-10" />
          </a>

          <div class="relative my-4 flex w-full max-w-xs flex-col gap-1 text-on-surface dark:text-on-surface-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              class="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-on-surface/50 dark:text-on-surface-dark/50"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="search"
              class="w-full border border-outline rounded-radius bg-surface px-2 py-1.5 pl-9 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-75 dark:border-outline-dark dark:bg-surface-dark/50 dark:focus-visible:outline-primary-dark"
              name="search"
              aria-label="Search"
              placeholder="Search"
            />
          </div>

          <div class="flex flex-col gap-2 overflow-y-auto pb-6">
            {routes.map((r) => (
              <a
                href={r.link}
                hx-get={r.link}
                hx-target="#page"
                hx-select="#page"
                hx-push-url="true"
                class="flex items-center rounded-radius gap-2 px-2 py-1.5 text-sm font-medium text-on-surface underline-offset-2 hover:bg-primary/5 hover:text-on-surface-strong focus-visible:underline focus:outline-hidden dark:text-on-surface-dark dark:hover:bg-primary-dark/5 dark:hover:text-on-surface-dark-strong"
              >
                {r.icon}
                <span>{r.label}</span>
              </a>
            ))}

           

          </div>
        </nav>

        <div class="h-svh w-full overflow-y-auto p-4 bg-surface dark:bg-surface-dark">
          <Navbar></Navbar>
          <div id="page">
            {children}
          </div>
        </div>

        <button
          class="fixed right-4 top-4 z-20 rounded-full bg-primary p-4 md:hidden text-on-primary dark:bg-primary-dark dark:text-on-primary-dark"
          x-on:click="showSidebar = ! showSidebar;"
        >
          <svg
            x-show="showSidebar"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="size-5"
            aria-hidden="true"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
          <svg
            x-show="! showSidebar"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="size-5"
            aria-hidden="true"
          >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
          </svg>
          <span class="sr-only">sidebar toggle</span>
        </button>
      </div>
    </BaseLayout>
  );
}
