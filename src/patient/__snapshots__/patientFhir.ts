export const patientFhir = {
  active: true,
  address: [
    {
      city: "Porto Alegre",
      line: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Ipiranga"],
      postalCode: "12312312",
      state: "RS",
      use: "home",
    },
  ],
  birthDate: "1969-12-13T03:00:00.000Z",
  gender: "male",
  id: "e378b8b7-e217-4543-b401-6b23d0537d47",
  identifier: [
    {
      system: "http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf",
      value: "16905255505",
    },
  ],
  name: [
    {
      family: "Abercrombie Monk",
      given: ["Thelonius", "Devadander"],
      use: "usual",
    },
  ],
  resourceType: "Patient",
  telecom: [
    { system: "phone", use: "mobile", value: "+5551999977668" },
    { system: "email", use: "work", value: "thel.monk@blue.co" },
  ],
};

export const noPhonePatientFhir = {
  ...patientFhir,
  telecom: [{ system: "email", use: "work", value: "thel.monk@blue.co" }],
};
