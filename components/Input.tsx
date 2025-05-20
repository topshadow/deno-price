export function Input({ label,name,placeholder,type }:{label:string,name:string,placeholder?:string,type?:'text'|'password'}) {
  return (
    <div class="flex w-full max-w-xs flex-col gap-1 text-on-surface dark:text-on-surface-dark">
      <label for="textInputDefault" class="w-fit pl-0.5 text-sm">{label}</label>
      <input
        id="textInputDefault"
        type={type}
        class="w-full rounded-radius bg-surface-alt px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-75 dark:bg-surface-dark-alt/50 dark:focus-visible:outline-primary-dark"
        name={name}
        placeholder={placeholder}
        autocomplete="name"
      />
    </div>
  );
}
