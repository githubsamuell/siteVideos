import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not valid email"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password should be at least 6 characters")
      .max(64, "password must not be longer than 64 characters"),
  }),
};

export type loginBody = TypeOf<typeof loginSchema.body>
