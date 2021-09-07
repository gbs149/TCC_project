export const patientFhir = {
  active: true,
  address: [
    {
      city: "anything",
      line: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Protosia"],
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
};
