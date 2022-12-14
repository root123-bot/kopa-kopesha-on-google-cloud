const path = require("path");
const solc = require("solc");

const fs = require("fs-extra");
const buildPath = path.resolve(__dirname, "source"); // __dirname is the name of parent working directory.. So this will create path for Ethereum/souce directory
fs.removeSync(buildPath);

const eventsContractPath = path.resolve(
  __dirname,
  "..",
  "Contracts",
  "Project.sol"
); // this is full path to access events.sol contract
const sourceCodes = fs.readFileSync(eventsContractPath, "utf-8");

const output = solc.compile(sourceCodes, 1).contracts; // hii contracts is the key attribute in returned JSON file which contains contract(s) data
fs.ensureDirSync(buildPath);
console.log(solc.compile(sourceCodes));
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
