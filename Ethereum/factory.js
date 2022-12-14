import web3 from "./web3";

import MikopoFactory from "./source/MikopoFactory.json";

// this factory need to load the deployed contract so here we should use ABI and contact address, we've got contact address when we run deploy.js
const instance = new web3.eth.Contract(
  JSON.parse(MikopoFactory.interface),
  "0xb4bF447F819C1fCcfA1815e9Ddf3eA073cdD1908"
);

export default instance;
