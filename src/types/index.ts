import { User } from "typegram";

export type TgInitData = {
  query_id: string;
  auth_date: number;
  hash: string;
  user: Partial<User>;
};
