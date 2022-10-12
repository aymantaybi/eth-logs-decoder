import ABICoder from "web3-eth-abi";
import { Log } from "web3-core";
import { AbiItem, AbiInput } from "web3-utils";

function decodeLog(
  log: Log,
  jsonInterface: AbiItem[]
): {
  address: string;
  event: {
    signature: string;
    name: string | undefined;
    inputs: { [key: string]: number | string | object | string[] | object[] };
  };
} {
  let { topics, data } = log;
  let eventJsonInterface = jsonInterface.find(
    (item) => ABICoder.encodeEventSignature(item) == topics[0]
  );
  if (!eventJsonInterface) throw new Error("Cannot find Event ABI item");
  let inputs = eventJsonInterface.inputs || [];
  let decodedTopics = decodeTopics(
    topics,
    inputs.filter((input) => input.indexed)
  );
  let decodedData =
    data != "0x"
      ? decodeInputs(
          data,
          inputs.filter((input) => !input.indexed)
        )
      : {};
  return {
    address: log.address,
    event: {
      signature: topics[0],
      name: eventJsonInterface.name,
      inputs: {
        ...decodedTopics,
        ...decodedData,
      },
    },
  };
}

function decodeTopics(
  topics: string[],
  inputs: AbiInput[]
): { [key: string]: string } {
  let decoded: { [key: string]: any } = {};

  for (let i = 1; i < topics.length; i++) {
    let topic = topics[i];
    let input = inputs[i - 1];
    decoded[input.name] = ABICoder.decodeParameter(input.type, topic);
  }
  return decoded;
}

function decodeInputs(hexString: string, inputs: AbiInput[]) {
  let decoded = ABICoder.decodeParameters(inputs, hexString);
  return formatDecoded(decoded);
}

function formatDecoded(element: {
  [key: string]: any;
}): Array<string | object> | { [key: string]: string | object } {
  if (element == null || typeof element != "object") return element;
  let objectKeys = Object.keys(element);
  if (Array.isArray(element) && objectKeys.every((key: any) => !isNaN(key)))
    return element.map((value: any) => formatDecoded(value));
  let formatted: { [key: string]: any } = {};
  objectKeys
    .filter((key: any) => isNaN(key) && key != "__length__")
    .forEach((key: any) => {
      formatted[key] = formatDecoded(element[key]);
    });
  return formatted;
}

export { decodeLog, decodeInputs };
