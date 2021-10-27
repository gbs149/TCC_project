import Router from "@koa/router";
import * as TE from "fp-ts/TaskEither";

import { PatientDTO } from "./DTOs/PatientDTO";

import { getAllPatients, getById, register, remove } from "./PatientController";

export const patientRouter = new Router();

patientRouter
  .get("/", async (ctx) => {
    const all = getAllPatients();
    const match = TE.match(
      async (errors) => {
        ctx.status = 400;
        ctx.body = await errors;
        console.error("400", ctx.body);
      },
      async (resource) => {
        ctx.status = 200;
        ctx.body = await resource;
        console.log("200", ctx.body);
      }
    );
    await match(all)();
  })
  .get("/:id", async (ctx) => {
    const byId = getById(ctx.params.id);
    const match = TE.match(
      async (errors) => {
        ctx.status = 400;
        ctx.body = await errors;
        console.error("400", ctx.body);
      },
      async (resource) => {
        ctx.status = 200;
        ctx.body = await resource;
        console.log("200", ctx.body);
      }
    );
    return await match(byId)();
  })
  .post("/", async (ctx) => {
    const reg = register(ctx.request.body as PatientDTO);
    const match = TE.match(
      async (errors) => {
        ctx.status = 400;
        ctx.body = await errors;
        console.error("400", ctx.body);
      },
      async (resource) => {
        ctx.status = 201;
        ctx.body = await resource;
        console.log("201", ctx.body);
      }
    );
    return await match(reg)();
  })
  .delete("/:id", async (ctx) => {
    const removed = remove(ctx.params.id);
    const match = TE.match(
      async (errors) => {
        ctx.status = 400;
        ctx.body = await errors;
        console.error("400", ctx.body);
      },
      async (resource) => {
        ctx.status = 200;
        ctx.body = await resource;
        console.log("200", ctx.body);
      }
    );
    return await match(removed)();
  })
  .patch("/:id", async (ctx) => {
    // TODO: implement
    const { id } = ctx.params;
    const patientDTO: PatientDTO = ctx.request.body;

    ctx.body = patientDTO;
    console.log(`PATCH ${id}`, patientDTO);
  });
