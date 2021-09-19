import { PatientDTO } from "../model/PatientDTO";

export const invalidPatientDTO: PatientDTO = {
  active: true,
  birthdate: "2099-03-12",
  cpf: "16905255508",
  currentAddress: {
    city: "",
    lines: [
      "Rua Prov. Duplov, 61 apto. 205",
      "Camelias sdfaso OIS asdf APSodf asdF PAosdhf paosdufh pASODfiuh apsDOfhj apsodif PAOsdif paosdifu apoSDIfua sdFAPosdifuapsodifu aSDFp ASdofiu aspodif POAsdif asdofiuas Oifasudfoiasdu PASodfiu ",
    ],
    postalCode: "123123123",
    state: "RZ",
    use: "vacation",
  },
  email: { use: "test", value: "a@b" },
  gender: "no se",
  id: "e378b8b7-e217-4543-b401-6b23d0537d47e378b8b7-e217-4543-b401-6b23d0537d4h",
  name: { first: "   ", last: "  " },
  phone: { value: "519999776683", use: "test" },
};
