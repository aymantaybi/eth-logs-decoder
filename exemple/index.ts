import { decodeInputs } from "../dist";

const data =
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000240e50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000639e41c200000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b7007c13325c48911f73a2dad5fa5dcbf808adc000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000000000000000000000000000000000000000004146d4264f9b10b0821713383f19d298c70b71b529bf0e9cb84a52b804b17bde7676cda503ffe1b627410be0365c7df41ee01196230b6ec81d7de4226f913d69531b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000663a007064f0800102a968ef5c8fee91fa754e9e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000006489b298000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000000000000000000000000000000000006399c19800000000000000000000000000000000000000000000000000071afd498d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000032950db2a7164ae833121501c797d79e7b79d74c000000000000000000000000000000000000000000000000000000000015644c0000000000000000000000000000000000000000000000000000000000000000";

const inputs = [
  {
    internalType: "uint256",
    name: "_expectedState",
    type: "uint256",
  },
  {
    internalType: "uint256",
    name: "_settlePrice",
    type: "uint256",
  },
  {
    internalType: "address",
    name: "_referralAddr",
    type: "address",
  },
  {
    internalType: "uint256",
    name: "_deadline",
    type: "uint256",
  },
  {
    internalType: "address[]",
    name: "_path",
    type: "address[]",
  },
  {
    internalType: "bytes",
    name: "_signature",
    type: "bytes",
  },
  {
    components: [
      {
        internalType: "address",
        name: "maker",
        type: "address",
      },
      {
        internalType: "enum MarketOrder.OrderKind",
        name: "kind",
        type: "uint8",
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
        internalType: "struct MarketAsset.Asset[]",
        name: "assets",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "expiredAt",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "basePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endedPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expectedState",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "marketFeePercentage",
        type: "uint256",
      },
    ],
    internalType: "struct MarketOrder.Order",
    name: "_order",
    type: "tuple",
  },
];

const decodedInputs: any = decodeInputs(data, inputs);

console.log(decodedInputs);
