import Router from "@koa/router";
import { match } from "fp-ts/lib/Either";
import { PatientDTO } from "./DTOs/PatientDTO";
import { createPatient } from "./model/PatientModel";

export const patientRouter = new Router();

// /patient POST GET
// /patient/{id} GET DELETE PUT

// router.use("/patient");
// router.use("/patient/{id}");

patientRouter
  .get("/", async (ctx) => {
    try {
      ctx.body = ["PATIETNS"];
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
    const patientDTO: PatientDTO = ctx.request.body;

    const patient = createPatient(patientDTO);

    match(
      (errors) => {
        ctx.status = 400;
        ctx.body = errors;
      },
      (patientModel) => {
        ctx.status = 200;
        ctx.body = patientModel;
      }
    )(patient);
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
