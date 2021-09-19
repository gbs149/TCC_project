export const completePatientModel = {
  _tag: "Right",
  right: {
    active: true,
    birthdate: new Date("1969-12-13T03:00:00.000Z"),
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
    name: { first: "Thelonius Devadander", last: "Abercrombie Monk" },
    phone: { _tag: "Some", value: { use: "mobile", value: "+5551999977668" } },
  },
};

export const noPhonePatientModel = {
  _tag: "Right",
  right: {
    ...completePatientModel.right,
    phone: { _tag: "None" },
  },
};
