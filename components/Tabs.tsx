export type ITab = {
  label: string;
  content: any;
  icon?: any;
  name: string;
};

export function Tabs(
  { tabs, defaultActive }: { tabs: ITab[]; defaultActive: string },
) {
  return (
    <div
      x-data={JSON.stringify({
        selectedTab: defaultActive ? defaultActive : tabs[0].name,
      })}
      class="w-full"
    >
      <div
        {...{
          "x-on:keydown.right.prevent": "$focus.wrap().next()",
          "x-on:keydown.left.prevent": "$focus.wrap().previous()",
        }}
        class="flex gap-2 overflow-x-auto border-b border-outline dark:border-outline-dark"
        role="tablist"
        aria-label="tab options"
      >
        {tabs.map((t) => (
          <button
            x-on:click={`selectedTab ='${t.name}'`}
            x-bind:aria-selected={`selectedTab === '${t.name}'`}
            x-bind:tabindex={`selectedTab === '${t.name}' ? '0' : '-1'`}
            x-bind:class={`selectedTab === '${t.name}' ? 'font-bold text-primary border-b-2 border-primary dark:border-primary-dark dark:text-primary-dark' : 'text-on-surface font-medium dark:text-on-surface-dark dark:hover:border-b-outline-dark-strong dark:hover:text-on-surface-dark-strong hover:border-b-2 hover:border-b-outline-strong hover:text-on-surface-strong'`}
            class="flex h-min items-center gap-2 px-4 py-2 text-sm"
            type="button"
            role="tab"
            aria-controls="tabpanelGroups"
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div class="px-2 py-4 text-on-surface dark:text-on-surface-dark">
        {tabs.map((t) => (
          <div
            x-cloak
            x-show={`selectedTab === '${t.name}'`}
            id={t.name}
            role="tabpanel"
            aria-label="groups"
          >
            <b>
              <a href="#" class="underline">{t.content}</a>
            </b>
            tab is selected
          </div>
        ))}
      </div>
    </div>
  );
}
