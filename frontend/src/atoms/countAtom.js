import { atom } from "recoil";

export const countData = atom({
  key: 'count',
  default: 3,
});
