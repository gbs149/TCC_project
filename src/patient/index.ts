import Router from "@koa/router";

export const patientRouter = new Router();

// /patient POST GET
// /patient/{id} GET DELETE PUT

// router.use("/patient");
// router.use("/patient/{id}");

patientRouter.get("/patient", async (ctx) => {
  try {
    ctx.body = "PATIETN";
    console.log("patient", ctx.body);
  } catch (e) {
    console.error(e);
  }
});
