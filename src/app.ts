import Koa from "koa";

import Router from "@koa/router";

import { patientRouter } from "./patient";

const router = new Router();

router.use(patientRouter.routes()).use(patientRouter.allowedMethods());

export const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.on("error", function (error: Error) {
  console.error(error.message, error);
});
