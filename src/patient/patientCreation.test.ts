import { PatientModel } from "./PatientModel";
import { Gender } from "./Gender";
import { CPF } from "./CPF";
import { Birthdate } from "./Birthdate";

describe("first test", () => {
  it("should", () => {
    const patient: PatientModel = {
      id: { id: "generated" },
      active: { active: true },
      gender: Gender.male,
      name: { first: "", last: "" },
      cpf: CPF.create("169.052.555-05"),
      birthdate: Birthdate.create(new Date("2012-03-12")),
      currentAddress: {
        use: "",
        postalCode: "",
        street: "",
        number: -1,
        city: "nem aqui nem la",
        state: "nope",
      },
      email: { use: "nenhum", value: "nem a pau" },
      phone: [{ use: "bla", value: " sdf  " }],
    };

    expect(patient).not.toBe(false);
  });
});
