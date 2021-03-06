
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {sequelize} from "./models";
import { userRouter } from "./routes/user";
import { indexRouter } from "./routes/index";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import {authHandler} from "./middleware/auth";
import cookieParser from "cookie-parser";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(cookieParser());

sequelize.sync({ force: false }) // force를 true로 하면 시작할때마다 db를 초기화함
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch((err: Error) => {
        console.error(err);
    });

app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use("/", indexRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);
app.use(notFoundHandler);
app.use(authHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
