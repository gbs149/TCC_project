import { PatientModel } from "./PatientModel";
import { createCPF } from "./CPF";
import { createDate } from "./Birthdate";
import { createName } from "./Name";
import { createPhone } from "./Phone";
import { createEmail } from "./Email";
import { createPostalCode } from "../Address/PostalCode";
import { createAddressNumber } from "../Address/AddressNumber";
import { createStreet } from "../Address/Street";
import { createCity } from "../Address/City";
import { createComplement } from "../Address/Complement";

describe("first test", () => {
  it("should", () => {
    const patient: PatientModel = {
      active: { value: true },
      birthdate: createDate(new Date("2012-03-12T00:00:00.000Z")),
      cpf: createCPF("169.052.555-05"),
      currentAddress: {
        city: createCity("anything"),
        complement: createComplement("ap.1"),
        number: createAddressNumber(12),
        postalCode: createPostalCode("12312312"),
        state: "RS",
        street: createStreet("Camelias"),
        use: "home",
      },
      email: { use: "home", value: "a@b.co" },
      gender: "female",
      id: { value: "generated" },
      name: { first: " fsda ", last: " asdf " },
      phone: [{ use: "mobile", value: "51999977668" }],
    };

    expect(patient).toMatchObject({
      active: { value: true },
      birthdate: { value: new Date("2012-03-12T00:00:00.000Z") },
      cpf: { value: "169.052.555-05" },
      currentAddress: {
        city: { value: "anything" },
        complement: { value: "ap.1" },
        number: { value: 12 },
        postalCode: { value: "12312312" },
        state: "RS",
        street: { value: "Camelias" },
        use: "home",
      },
      email: createEmail("a@b.co", "home"),
      gender: "female",
      id: { value: "generated" },
      name: createName({ first: " fsda ", last: " asdf " }),
      phone: [createPhone("51999977668", "mobile")],
    });
  });
});
