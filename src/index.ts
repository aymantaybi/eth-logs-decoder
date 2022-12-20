import ABICoder from "web3-eth-abi";
import { Log } from "web3-core";
import { AbiItem, AbiInput } from "web3-utils";
import { fromObject } from "./utils";
import { formatDecodedParameters } from "./helpers";

export function decodeLog(
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
  let eventJsonInterface = jsonInterface.find((item) => ABICoder.encodeEventSignature(item) == topics[0]);
  if (!eventJsonInterface) throw new Error("Cannot find Event ABI item");
  let eventJsonInterfaceInputs = eventJsonInterface.inputs || [];
  let decodedTopics = decodeTopics(
    topics,
    eventJsonInterfaceInputs.filter((input) => input.indexed)
  );
  let decodedData =
    data != "0x"
      ? decodeInputs(
          data,
          eventJsonInterfaceInputs.filter((input) => !input.indexed)
        )
      : {};

  const inputs = { ...decodedTopics, ...fromObject(decodedData) };

  return {
    address: log.address,
    event: {
      signature: topics[0],
      name: eventJsonInterface.name,
      inputs,
    },
  };
}

export function decodeTopics(topics: string[], inputs: AbiInput[]): { [key: string]: string } {
  let decoded: { [key: string]: any } = {};

  for (let i = 1; i < topics.length; i++) {
    let topic = topics[i];
    let input = inputs[i - 1];
    decoded[input.name] = ABICoder.decodeParameter(input.type, topic);
  }
  return decoded;
}

export function decodeInputs(hexString: string, inputs: AbiInput[]) {
  const decoded = ABICoder.decodeParameters(inputs, hexString);
  return formatDecodedParameters(decoded, inputs);
}
