import { atom } from "recoil";

export const userData = atom({
  key: 'userData',
  default: { username: '', email: '', cart: [], orders: [] },
});
