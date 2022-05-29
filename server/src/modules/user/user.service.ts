import { User, userModel } from "./user.model";

export async function createUser(user: Omit<User, "comparePassword">) {
  return userModel.create(user);
}

export async function finduserByEmail(email: User["email"]) {
  return userModel.findOne({ email });
}
