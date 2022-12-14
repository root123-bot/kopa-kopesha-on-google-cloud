"use strict";
exports.id = 837;
exports.ids = [837];
exports.modules = {

/***/ 1837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ factory)
});

// EXTERNAL MODULE: ./Ethereum/web3.js
var web3 = __webpack_require__(2248);
;// CONCATENATED MODULE: ./Ethereum/source/MikopoFactory.json
const MikopoFactory_namespaceObject = JSON.parse('{"w3":"[{\\"constant\\":true,\\"inputs\\":[],\\"name\\":\\"getDeployedMikopo\\",\\"outputs\\":[{\\"name\\":\\"\\",\\"type\\":\\"address[]\\"}],\\"payable\\":false,\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"constant\\":false,\\"inputs\\":[],\\"name\\":\\"clearListOfDeployedMikopo\\",\\"outputs\\":[],\\"payable\\":false,\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"constant\\":true,\\"inputs\\":[{\\"name\\":\\"\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"deployedMikopo\\",\\"outputs\\":[{\\"name\\":\\"\\",\\"type\\":\\"address\\"}],\\"payable\\":false,\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"constant\\":false,\\"inputs\\":[{\\"name\\":\\"nameOfNFT\\",\\"type\\":\\"string\\"}],\\"name\\":\\"createMkopo\\",\\"outputs\\":[],\\"payable\\":false,\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"}]"}');
;// CONCATENATED MODULE: ./Ethereum/factory.js


// this factory need to load the deployed contract so here we should use ABI and contact address, we've got contact address when we run deploy.js
const instance = new web3/* default.eth.Contract */.Z.eth.Contract(JSON.parse(MikopoFactory_namespaceObject.w3), "0xb4bF447F819C1fCcfA1815e9Ddf3eA073cdD1908");
/* harmony default export */ const factory = (instance);


/***/ }),

/***/ 2248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);

let web3;
if (false) {} else {
    const provider = new (web3__WEBPACK_IMPORTED_MODULE_0___default().providers.HttpProvider)("https://goerli.infura.io/v3/967ec8c304ff48c4a593c04832ea452c");
    web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(provider);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (web3);


/***/ })

};
;