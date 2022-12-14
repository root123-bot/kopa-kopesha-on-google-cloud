const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./source/MikopoFactory.json"); // this is file containing Bytecode and ABI

// 'https://rinkeby.infura.io/v3/51f53b77759d4d58a8a139e62a128c76'
const provider = new HDWalletProvider(
  "observe they frost admit animal lock arrow price cram rude allow fade",
  "https://goerli.infura.io/v3/967ec8c304ff48c4a593c04832ea452c"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "10000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
