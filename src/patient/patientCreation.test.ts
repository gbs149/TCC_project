import { PatientModel } from "./PatientModel";
import { CPF } from "./CPF";
import { Birthdate } from "./Birthdate";
import { Name } from "./Name";
import { Phone } from "./Phone";
import { Email } from "./Email";
import { PostalCode } from "../Address/PostalCode";
import { AddressNumber } from "../Address/AddressNumber";
import { Street } from "../Address/Street";
import { City } from "../Address/City";
import { Complement } from "../Address/Complement";

describe("first test", () => {
  it("should", () => {
    const patient: PatientModel = {
      id: { id: "generated" },
      active: { active: true },
      gender: "female",
      // TS accepts this invalid object literal
      name: { first: "", last: "" },
      // name: Name.create({
      //   first: " fsda ",
      //   last: " asdf ",
      // }),
      cpf: CPF.create("169.052.555-05"),
      birthdate: Birthdate.create(new Date("2012-03-12")),
      currentAddress: {
        city: City.create("nem aqui nem la"),
        number: AddressNumber.create(12),
        postalCode: PostalCode.create("11111112"),
        complement: Complement.create("ap.23"),
        state: "RS",
        street: Street.create("A"),
        use: "home",
      },
      email: Email.create("home", "a@b.co"),
      phone: [Phone.create("mobile", "51999977668")],
    };

    expect(patient).toMatchObject({
      active: { active: true },
      birthdate: { date: new Date("2012-03-12T00:00:00.000Z") },
      cpf: { value: "169.052.555-05" },
      currentAddress: {
        city: { name: "nem aqui nem la" },
        complement: { value: "ap.23" },
        number: { num: 12 },
        postalCode: { postalCode: "11111112" },
        state: "RS",
        street: { name: "A" },
        use: "home",
      },
      email: { use: "home", value: "a@b.co" },
      gender: "female",
      id: { id: "generated" },
      name: { first: " fsda ", last: " asdf " },
      phone: [{ use: "mobile", value: "51999977668" }],
    });
  });
});
