export interface Cookie {
  name: string;
  value: string;
}

export interface Storage {
  sensor: string[];
  cookies: Cookie[];
}
