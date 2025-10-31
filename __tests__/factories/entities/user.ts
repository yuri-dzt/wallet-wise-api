import { CreateUserProps, User } from "../../../src/domain/entities/user";

export const makeUser = (override?: Partial<CreateUserProps>) => {
  return new User({
    id: "1",
    email: "user@gmail.com",
    name: "User",
    password: "1234",
    ...override,
  });
};
