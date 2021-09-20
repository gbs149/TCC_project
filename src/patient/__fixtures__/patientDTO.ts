import { PatientDTO } from "../DTOs/PatientDTO";

export const noPhonePatientDTO: PatientDTO = {
  active: true,
  birthdate: "1969-12-13",
  cpf: "16905255505",
  currentAddress: {
    city: "Porto Alegre",
    lines: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Ipiranga"],
    postalCode: "12312312",
    state: "RS",
    use: "home",
  },
  email: { use: "work", value: "thel.monk@blue.co" },
  gender: "male",
  id: "e378b8b7-e217-4543-b401-6b23d0537d47",
  name: { first: " Thelonius Devadander ", last: " Abercrombie Monk " },
};

export const completePatientDTO: PatientDTO = {
  ...noPhonePatientDTO,
  phone: { value: "51999977668", use: "mobile" },
};
