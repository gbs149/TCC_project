import { createPatient } from "./PatientModel";
import { PatientDTO } from "./PatientDTO";
import { right } from "fp-ts/lib/Either";

describe("Patient", () => {
  it("should create a patient", () => {
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
      email: { use: "home", email: "a@b.co" },
      gender: "female",
      id: "generated",
      name: { first: " fsda ", last: " asdf " },
      phone: { value: "51999977668", use: "mobile" },
    };

    expect(createPatient(patientDTO)).toStrictEqual(
      right({
        active: true,
        birthdate: new Date("2012-03-12T03:00:00.000Z"),

        cpf: "16905255505",
        currentAddress: {
          city: "anything",
          complement: {
            _tag: "Some",
            value: "ap.1",
          },
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
        phone: { use: "mobile", value: "51999977668" },
      })
    );
  });

  it("should add a bunch of errrors  a patient", () => {
    const patientDTO: PatientDTO = {
      active: true,
      birthdate: "2099-03-12",
      cpf: "16905255507",
      currentAddress: {
        city: "",
        complement: "",
        number: -12,
        postalCode: "12312312098",
        state: "RY",
        street:
          "Camelias sdfaso OIS asdf APSodf asdF PAosdhf paosdufh pASODfiuh apsDOfhj apsodif PAOsdif paosdifu apoSDIfua sdFAPosdifuapsodifu aSDFp ASdofiu aspodif POAsdif asdofiuas Oifasudfoiasdu PASodfiu ",
        use: "bar",
      },
      email: { use: "tes", email: "a@b" },
      gender: "fluid",
      id: "generated",
      name: { first: "  ", last: "  " },
      phone: { value: "519999776683", use: "lsdf" },
    };

    expect(createPatient(patientDTO)).toStrictEqual({
      _tag: "Left",
      left: [
        "Invalid city name",
        "Number must be positive",
        "Invalid postal code",
        "Invalid state",
        "Invalid street name",
        "Invalid address use",
        "Invalid birthdate",
        "Invalid CPF",
        "Invalid email",
        "Invalid contact use",
        "Invalid gender type",
        "Invalid first name",
        "Invalid last name",
        "Invalid phone number",
        "Invalid contact use",
      ],
    });
  });
});
