import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./constants";
import helmet from 'helmet'
import userRoute from "./modules/user/user.route"

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());

app.use(express.json())

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));

app.use(helmet());

app.use('/api/users', userRoute)

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server is running at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info("GoodBye, got the signal", signal);

    server.close;
    //disconnect from db

    await disconnectFromDatabase();

    logger.info("My worker here is done");

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefullShutdown(signals[i]);
}
