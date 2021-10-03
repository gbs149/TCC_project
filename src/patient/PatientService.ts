import Router from "@koa/router";
import { Either, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { match } from "fp-ts/lib/Either";
import { PatientDTO } from "./DTOs/PatientDTO";
import { createPatient } from "./model/PatientModel";
import { getAllPatients, register } from "./PatientController";

export const patientRouter = new Router();

patientRouter
  .get("/", async (ctx) => {
    try {
      ctx.body = await getAllPatients();
      console.log("GET patients", ctx.body);
    } catch (e) {
      console.error(e);
    }
  })
  .get("/:id", async (ctx) => {
    const { id } = ctx.params;
    ctx.body = `GET PATIENT ${id}`;
    console.log(`GET PATIENT ${id}`);
  })
  .post("/", async (ctx) => {
    pipe(
      right(ctx.request.body as PatientDTO),
      map(createPatient),
      match(
        (errors) => {
          ctx.status = 400;
          ctx.body = errors;
        },
        (patientModel) => {
          ctx.status = 200;
          ctx.body = patientModel;
        }
      )
    );
  })
  .delete("/:id", async (ctx) => {
    const { id } = ctx.params;

    ctx.body = `DELETE ${id}`;
    console.log(id);
  })
  .patch("/:id", async (ctx) => {
    const { id } = ctx.params;
    const patientDTO: PatientDTO = ctx.request.body;

    ctx.body = patientDTO;
    console.log(`PATCH ${id}`, patientDTO);
  });
