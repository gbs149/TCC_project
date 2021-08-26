import { createPatient } from "./PatientModel";
import { Street } from "../Address/Street";
import { City } from "../Address/City";
import { PatientDTO } from "./PatientDTO";

describe("first test", () => {
  it("should", () => {
    const patientDTO: PatientDTO = {
      active: true,
      birthdate: "2012-03-12",
      cpf: "16905255505",
      currentAddress: {
        city: "anything",
        complement: "ap.1",
        number: 12,
        postalCode: "12312312",
        state: "RS",
        street: "Camelias",
        use: "home",
      },
      email: { use: "home", value: "a@b.co" },
      gender: "female",
      id: "generated",
      name: { first: " fsda ", last: " asdf " },
      phone: [{ value: "51999977668", use: "mobile" }],
    };

    expect(createPatient(patientDTO)).toStrictEqual({
      active: { value: true },
      birthdate: { _tag: "Right", right: new Date("2012-03-12T03:00:00.000Z") },
      cpf: { value: "16905255505" },
      currentAddress: {
        city: { _tag: "Right", right: "anything" },
        complement: { _tag: "Some", value: { _tag: "Right", right: "ap.1" } },
        number: { _tag: "Right", right: 12 },
        postalCode: { _tag: "Right", right: "12312312" },
        state: { _tag: "Right", right: "RS" },
        street: { _tag: "Right", right: "Camelias" },
        use: { _tag: "Right", right: "home" },
      },
      email: { _tag: "Right", right: { use: "home", value: "a@b.co" } },
      gender: { _tag: "Right", right: "female" },
      id: { value: "generated" },
      name: {
        first: { _tag: "Right", right: " fsda " },
        last: { _tag: "Right", right: " asdf " },
      },
      phone: [
        { _tag: "Right", right: { use: "mobile", value: "51999977668" } },
      ],
    });
  });

  it("should not work", () => {
    const takesCity = (val: City) => val;

    const street: Street = "street";

    // TS is useless if we can use any type alias to replace another with the same underlying type
    expect(takesCity(street)).not.toBe(street);
  });
});
