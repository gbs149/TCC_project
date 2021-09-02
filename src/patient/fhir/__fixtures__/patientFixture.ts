import { Patient } from "fhir/r4";

export const patient: Patient = {
  id: "958fa59a-2e1a-471b-80f7-7c18d9222af5",
  name: [
    {
      use: "usual",
      text: "Gabriel Bohrer Schmitt",
      given: ["Gabriel"],
      family: "Bohrer Schmitt",
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
      line: ["Rua Prv. Duplov", "nr. 65, apto.201"],
      state: "RS",
      period: {
        start: "2021-08-26T17:26:23.746Z",
      },
      postalCode: "90420030",
    },
  ],
  telecom: [
    {
      use: "work",
      value: "gabriel.schmitt@magrathealabs.com",
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "email",
    },
    {
      use: "mobile",
      value: "+5551999935297",
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "phone",
    },
  ],
  birthDate: "1972-12-15",
  identifier: [
    {
      period: {
        start: "2021-08-26T16:48:13.799Z",
      },
      system: "http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf",
      value: "48597830000",
    },
  ],
  resourceType: "Patient",
};
