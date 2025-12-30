export interface CreateUserType {
  username: string;
  fullName: string;
  role: RoleType;
}

export interface UserType extends CreateUserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RoleType {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}
