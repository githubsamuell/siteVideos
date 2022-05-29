import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/omit";
import { finduserByEmail } from "../user/user.service";
import { loginBody } from "./auth.schema";
import { signJwt } from "./auth.utils";
export async function loginHandler(req: Request<{}, {}, loginBody>, res: Response) {
  const { email, password,  } = req.body;

  const user = await finduserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  };

  const payload = omit(user.toJSON(), ["password", "__v"]);

  const jwt = signJwt(payload);

  res.cookie("acessToken", jwt, {
      maxAge: 3.154e10, // 1year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: false,
  })


  return res.status(StatusCodes.OK).send(jwt);

}
