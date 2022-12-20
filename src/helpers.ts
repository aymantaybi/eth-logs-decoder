import { AbiInput, toChecksumAddress } from "web3-utils";

export function formatDecodedParameters(value: any, inputs: AbiInput[]) {
  const result: any = {};
  for (const input of inputs) {
    if (!input.type.endsWith("[]")) {
      result[input.name] = formatDecodedParameter(value[input.name], input);
    } else {
      result[input.name] = value[input.name].map((item: any) => formatDecodedParameter(item, input));
    }
  }
  return result;
}

export function formatDecodedParameter(value: any, input: AbiInput) {
  if (input.type.startsWith("uint") || input.type.startsWith("int")) {
    return Number(value);
  } else if (input.type.startsWith("address")) {
    return toChecksumAddress(value);
  } else if (input.type.startsWith("tuple") && input.components) {
    return formatDecodedParameters(value, input.components);
  } else {
    return value;
  }
}
