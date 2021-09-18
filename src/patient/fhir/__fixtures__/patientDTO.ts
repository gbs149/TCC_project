import { PatientDTO } from "../../model/PatientDTO";

export const patientDTO: PatientDTO = {
  active: true,
  birthdate: "2012-03-12",
  cpf: "16905255505",
  currentAddress: {
    city: "anything",
    lines: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Protosia"],
    postalCode: "12312312",
    state: "RS",
    use: "home",
  },
  email: { use: "home", value: "a@b.co" },
  gender: "female",
  id: "generated",
  name: { first: " fsda qwerty ", last: " asdf " },
  phone: { value: "51999977668", use: "mobile" },
};

export const noPhonePatientDTO: PatientDTO = {
  active: true,
  birthdate: "2012-03-12",
  cpf: "16905255505",
  currentAddress: {
    city: "anything",
    lines: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Protosia"],
    postalCode: "12312312",
    state: "RS",
    use: "home",
  },
  email: { use: "home", value: "a@b.co" },
  gender: "female",
  id: "generated",
  name: { first: " fsda qwerty ", last: " asdf " },
};
