export type Cookie = chrome.cookies.Cookie;

export interface Storage {
  sensor: string[];
  cookies: Cookie[];
}
