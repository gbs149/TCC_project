import { Patient } from "fhir/r4";

export const patient: Patient = {
  id: "e378b8b7-e217-4543-b401-6b23d0537d47",
  name: [
    {
      use: "usual",
      text: "Thelonius Devadander Abercrombie Monk",
      given: ["Thelonius", "Devadander"],
      family: "Abercrombie Monk",
      period: {
        start: "2021-08-26T17:26:23.746Z",
      },
    },
  ],
  active: true,
  gender: "male",
  address: [
    {
      use: "home",
      city: "Porto Alegre",
      line: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Ipiranga"],
      state: "RS",
      period: {
        start: "2021-08-26T17:26:23.746Z",
      },
      postalCode: "12312312",
    },
  ],
  telecom: [
    {
      use: "work",
      value: "thel.monk@blue.co",
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "email",
    },
    {
      use: "mobile",
      value: "+5551999977668",
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "phone",
    },
  ],
  birthDate: "1969-12-13",
  identifier: [
    {
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf",
      value: "16905255505",
    },
  ],
  resourceType: "Patient",
};

export const patientWithNoPhone: Patient = {
  ...patient,
  telecom: [
    {
      use: "work",
      value: "thel.monk@blue.co",
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "email",
    },
  ],
};
