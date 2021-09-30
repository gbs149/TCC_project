import Router from "@koa/router";
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
      ctx.body = "PATIETN";
      console.log("patient", ctx.body);
    } catch (e) {
      console.error(e);
    }
  })
  .post("/", async (ctx) => {
    const patientDTO: PatientDTO = ctx.request.body;

    const patient = createPatient(patientDTO);

    console.log(patient);

    ctx.body = "PATTIIEN POST";
  });
