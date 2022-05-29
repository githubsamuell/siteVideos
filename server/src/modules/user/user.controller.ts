import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger";
import { registerUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(req: Request<{}, {}, registerUserBody>, res: Response) {
  const { username, email, password } = req.body;

  logger.info(req.body)

  try {
     await createUser({ username, email, password });

    return res.status(StatusCodes.CREATED).send("user created sucessfully");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
