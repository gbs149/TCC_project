import { fromValidatedModel } from "./patientFhir";
import { PatientDTO } from "../model/PatientDTO";
import { createPatient } from "../model/PatientModel";

describe("patientFhir", () => {
  it("should create a valid fhir resource from PatientModel", () => {
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
      name: { first: " fsda qwerty ", last: " asdf " },
      phone: { value: "51999977668", use: "mobile" },
    };
    const patient = createPatient(patientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toEqual({
      _tag: "Right",
      right: {
        active: true,
        address: [
          {
            city: "anything",
            line: ["Camelias, 12 ap.1"],
            postalCode: "12312312",
            state: "RS",
            use: "home",
          },
        ],
        birthDate: "2012-03-12T03:00:00.000Z",
        gender: "female",
        id: "generated",
        identifier: [
          {
            system: "http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf",
            value: "16905255505",
          },
        ],
        name: [{ family: "asdf", given: ["fsda", "qwerty"], use: "usual" }],
        resourceType: "Patient",
        telecom: [
          { system: "phone", use: "mobile", value: "51999977668" },
          { system: "email", use: "home", value: "a@b.co" },
        ],
      },
    });
  });

  it("should not create a fhir resource when there are errors in model", () => {
    // we should trust the model to create a valid patient, so no validation should be needed when going to FHIR
    const patientDTO: PatientDTO = {
      active: true,
      birthdate: "2099-03-12",
      cpf: "16905255508",
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
      name: { first: "   ", last: " asdf " },
      phone: { value: "519999776683", use: "shuffle" },
    };
    const patient = createPatient(patientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toEqual({
      _tag: "Left",
      left: [
        "Invalid birthdate",
        "Invalid CPF",
        "Invalid first name",
        "Invalid phone number",
        "Invalid contact use",
      ],
    });
  });
});
