import { PatientModel } from "./PatientModel";
import { Gender } from "./Gender";
import { CPF } from "./CPF";
import { Birthdate } from "./Birthdate";
import { Name } from "./Name";

describe("first test", () => {
  it("should", () => {
    const patient: PatientModel = {
      id: { id: "generated" },
      active: { active: true },
      gender: Gender.male,
      // TS accepts this invalid object literal
      // name: { first: "", last: "" },
      name: Name.create({
        first: " fsda ",
        last: " asdf ",
      }),
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
