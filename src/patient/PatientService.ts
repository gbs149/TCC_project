import Router from "@koa/router";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { PatientDTO } from "./DTOs/PatientDTO";

import { getAllPatients, getById, register, remove } from "./PatientController";

export const patientRouter = new Router();

patientRouter
  .get("/", async (ctx) =>
    pipe(
      await getAllPatients(),
      E.match(
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
      )
    )
  )
  .get("/:id", async (ctx) =>
    pipe(
      await getById(ctx.params.id),
      E.match(
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
      )
    )
  )
  .post("/", async (ctx) =>
    pipe(
      await register(ctx.request.body as PatientDTO),
      E.match(
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
      )
    )
  )
  .delete("/:id", async (ctx) => {
    return pipe(
      await remove(ctx.params.id),
      E.match(
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
      )
    );
  })
  .patch("/:id", async (ctx) => {
    const { id } = ctx.params;
    const patientDTO: PatientDTO = ctx.request.body;

    ctx.body = patientDTO;
    console.log(`PATCH ${id}`, patientDTO);
  });
