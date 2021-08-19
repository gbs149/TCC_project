// @ts-ignore
import validarCpf from "validar-cpf";

export const isValidCpf = (cpf: string): boolean => validarCpf(cpf);
