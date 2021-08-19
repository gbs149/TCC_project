import { PatientModel } from "./PatientModel";
import { Gender } from "./Gender";
import { CPF } from "./CPF";

describe("first test", () => {
  it("should", () => {
    const patient: PatientModel = {
      id: "generated",
      active: true,
      gender: Gender.male,
      name: { first: "", last: "" },
      cpf: CPF.create("invalid"),
      birthdate: new Date(),
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
