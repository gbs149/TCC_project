import { PatientDTO } from "../../model/PatientDTO";

export const invalidPatientDTO: PatientDTO = {
  active: true,
  birthdate: "2099-03-12",
  cpf: "16905255508",
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
  name: { first: "   ", last: " asdf " },
  phone: { value: "519999776683", use: "shuffle" },
};
