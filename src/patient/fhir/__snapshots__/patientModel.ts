export const expectedPatientModel = {
  active: true,
  birthdate: new Date("1972-12-15T03:00:00.000Z"),
  cpf: "48597830000",
  currentAddress: {
    city: "Porto Alegre",
    lines: ["Rua Prv. Duplov", "nr. 65, apto.201"],
    postalCode: "90420030",
    state: "RS",
    use: "home",
  },
  email: { use: "work", value: "gabriel.schmitt@magrathealabs.com" },
  gender: "male",
  id: "958fa59a-2e1a-471b-80f7-7c18d9222af5",
  name: { first: "Gabriel", last: "Bohrer Schmitt" },
  phone: { _tag: "Some", value: { use: "mobile", value: "+5551999935297" } },
};
