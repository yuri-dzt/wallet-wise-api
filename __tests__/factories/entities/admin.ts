import { Admin, CreateAdminProps } from "../../../src/domain/entities/admin";

export const makeAdmin = (override?: Partial<CreateAdminProps>) => {
  return new Admin({
    id: "1",
    email: "admin@gmail.com",
    name: "Admin",
    password: "1234",
    permission: 1,
    ...override,
  });
};
