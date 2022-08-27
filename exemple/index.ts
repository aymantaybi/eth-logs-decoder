import * as dotenv from "dotenv";
import Web3 from "web3";
import ABICoder from "web3-eth-abi";
import { AbiItem, AbiInput } from "web3-utils";
import { decodeLog } from "../dist";

dotenv.config();

const { WEBSOCKET_PROVIDER_HOST } = process.env;

const websocketProvider = new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER_HOST!);
const web3 = new Web3(websocketProvider);

const AxieggSpawnedEventInterface: AbiItem = {
  anonymous: false,
  inputs: [
    {
      internalType: "uint256",
      indexed: true,
      name: "_axieId",
      type: "uint256",
    },
    {
      internalType: "uint256",
      indexed: true,
      name: "_sireId",
      type: "uint256",
    },
    {
      internalType: "uint256",
      indexed: true,
      name: "_matronId",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "birthDate",
      type: "uint256",
    },
    {
      components: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      internalType: "struct AxieGenetics.Genes",
      name: "sireGenes",
      type: "tuple",
    },
    {
      components: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      internalType: "struct AxieGenetics.Genes",
      name: "matronGenes",
      type: "tuple",
    },
  ],
  name: "AxieggSpawned",
  type: "event",
};

(async () => {
  let eventSignature = ABICoder.encodeEventSignature(
    AxieggSpawnedEventInterface as any
  );

  let reciept = await web3.eth.getTransactionReceipt(
    "0x615ec35fce24d7f07c61201dfb3c8678f3f53ab43808bd32af9d08df2b0ebd39"
  );

  let log = reciept.logs.find((log) => log.topics[0] == eventSignature)!;

  let decodedLog = decodeLog(log, [AxieggSpawnedEventInterface]);

  console.log(decodedLog);
})();

const DepositedEventInterface: AbiItem = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      internalType: "uint256",
      name: "nonce",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "address",
      name: "owner",
      type: "address",
    },
    {
      components: [
        {
          internalType: "enum MarketAsset.TokenStandard",
          name: "erc",
          type: "uint8",
        },
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
      ],
      indexed: false,
      internalType: "struct MarketAsset.Asset[]",
      name: "assets",
      type: "tuple[]",
    },
  ],
  name: "Deposited",
  type: "event",
};

(async () => {
  let eventSignature = ABICoder.encodeEventSignature(
    DepositedEventInterface as any
  );

  let reciept = await web3.eth.getTransactionReceipt(
    "0x3b3d66ab179b2f71e9d002ce4c17fee2f51fe9b00c2772681c6064da48710572"
  );

  let log = reciept.logs.find((log) => log.topics[0] == eventSignature)!;

  let decodedLog = decodeLog(log, [DepositedEventInterface]);

  console.log(JSON.stringify(decodedLog, null, 4));
})();

const OrderMatchedEventInterface: AbiItem = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      internalType: "bytes32",
      name: "hash",
      type: "bytes32",
    },
    {
      indexed: false,
      internalType: "address",
      name: "maker",
      type: "address",
    },
    {
      indexed: false,
      internalType: "address",
      name: "matcher",
      type: "address",
    },
    {
      indexed: false,
      internalType: "enum MarketOrder.OrderKind",
      name: "kind",
      type: "uint8",
    },
    {
      indexed: false,
      internalType: "address",
      name: "bidToken",
      type: "address",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "bidPrice",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "address",
      name: "paymentToken",
      type: "address",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "settlePrice",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "sellerReceived",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "marketFeePercentage",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "marketFeeTaken",
      type: "uint256",
    },
  ],
  name: "OrderMatched",
  type: "event",
};

(async () => {
    let eventSignature = ABICoder.encodeEventSignature(
        OrderMatchedEventInterface as any
    );
  
    let reciept = await web3.eth.getTransactionReceipt(
      "0x34e58464aee74414058c13b635262dae012ca5aaabfc993d7329de10eaaf89d5"
    );
  
    let log = reciept.logs.find((log) => log.topics[0] == eventSignature)!;
  
    let decodedLog = decodeLog(log, [OrderMatchedEventInterface]);
  
    console.log(JSON.stringify(decodedLog, null, 4));
  })();