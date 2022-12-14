// USIHANGAIKE SANA HAPA CHA MUHIMU NENDA YOUTUBE KUNA VIDEO NIME-DOWNLOAD  IN HOW TO SEND
// transaction with web3 and NodeJs... Yaani hapa ni jinsi gani ya ku-load or import given contract and
// then send transaction using it... UMEHANGAIKA SANA YOUTUBE IS THERE FOR YOU NOW GO AND LEARN FROM IT
// SIJA-DOWNLOAD VIDEO BALI NIMEIPIGA SCREENSHOTS VIEW ON YOUR DESKTOP THERE... LEARN IT YOU'LL SUCCEED...
// THAT'S ALL FOR TODAY PASKO KESHO LEARN JINSI YA KUTUMIA NODE.JS UMESHAZOEA KUTUMIA ONLY IN FRONTEND...

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//const factory = require('../Ethereum/factory');  // Hii factory ndo iliyoleta shida inasema cannot use import statement outside a module see error arise from factory.js...
const factory = require("../Ethereum/serverSide/factory.mjs"); // Hii error ya Cannot use import statement outside a module... Inabidi ui-google uone inakuaje coz hapa tu ndo panaposumbua;
// this read article to solve it https://stackoverflow.com/questions/61558835/type-module-in-package-json-throw-new-err-require-esmfilename-parentpath
const provider = new HDWalletProvider(
  "observe they frost admit animal lock arrow price cram rude allow fade",
  "https://goerli.infura.io/v3/967ec8c304ff48c4a593c04832ea452c"
);
const web3 = new Web3(provider);

console.log(factory);
const checkDeadlineToPayDebt = setImmediate(async () => {
  const accounts = await web3.eth.getAccounts();

  let date = new Date().getTime();
  console.log("This is milliseconds to date since epoch for you " + date); // this epoch is in miliseconds so no need to *1000;
  // then let's use imported MkopoFactory...
  const deployedMikopo = await factory.methods.getDeployedMikopo().call();
  console.log(deployedMikopo);
});

// Remember setTime method didn't need to be called its called everytime automatically after given interval
// you provide.... The same goes for setTimeout();  But hii haijakaa kikubwa haiwezekani accounts to execute
// everytime so if you can you should only part of code you want to execute again and again in setInterval
// ...
