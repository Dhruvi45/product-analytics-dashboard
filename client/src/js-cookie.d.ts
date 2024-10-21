// src/types/js-cookie.d.ts
declare module "js-cookie" {
  interface CookiesStatic<T = string> {
    get(key: string): T;
    set(key: string, value: T, options?: any): void;
    remove(key: string, options?: any): void;
  }
  const Cookies: CookiesStatic;
  export default Cookies;
}
