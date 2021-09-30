import Koa from "koa";

import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

import { patientRouter } from "./patient";

const router = new Router();

router.use("/patient", patientRouter.routes(), patientRouter.allowedMethods());

export const app = new Koa();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.on("error", function (error: Error) {
  console.error(error.message, error);
});
