export type UserType = "一般" | "管理者";
export type UserStatus = "有効" | "無効";

export type User = {
  id: string;
  name: string;
  type: UserType;
  status: UserStatus;
};
