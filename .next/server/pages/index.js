(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 3935:
/***/ ((module) => {

// Exports
module.exports = {
	"st": "start_st__Fgsks",
	"spt": "start_spt__WGl8L",
	"cardDiv": "start_cardDiv__yM3fB",
	"oh": "start_oh__TdbC1",
	"hid": "start_hid__bvUj3",
	"ti": "start_ti__Tijj5",
	"val": "start_val__uXxuW",
	"prv": "start_prv__9CnNu",
	"ig": "start_ig__5Nm1T",
	"closeBtn": "start_closeBtn__yL9_8"
};


/***/ }),

/***/ 4369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3935);
/* harmony import */ var _static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_navBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2424);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1831);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1837);
/* harmony import */ var _Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8697);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2248);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(262);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_9__);











class MikopoIndex extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    state = {
        bigData: [],
        imageSrc: [],
        lendMeLoading: false
    };
    constructor(props){
        super(props);
        this.toPopUp = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.toDemish = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    }
    static async getInitialProps(props) {
        // First after the component mount then you need to fetch all deployed contract a
        // address from factory...
        const deployedConntractAddresses = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
        console.log("This is deployed contracts addresses...");
        console.log(deployedConntractAddresses);
        // then load all mikopo and access from it the struct of DeniDetails..
        let addressDeniDetails = [];
        let bunchOfDeniStruct = [];
        console.log(addressDeniDetails);
        for(let i = 0; i < deployedConntractAddresses.length; i++){
            const myMkopo = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(deployedConntractAddresses[i]);
            const lengthOfDeniArray = await myMkopo.methods.lengthOfDeniDetailsRequest().call();
            if (lengthOfDeniArray > 0) {
                for(let z = 0; z < lengthOfDeniArray; z++){
                    let givenStruct = await myMkopo.methods.deniDetailsList(z).call();
                    let accessedArrayCollateral = await myMkopo.methods.accessingCollateralAssets(givenStruct.madeAt).call();
                    console.log("This is accessed collateral");
                    console.log(givenStruct);
                    console.log(accessedArrayCollateral);
                    // Hapa nataka niifanye i-avoid hiyo index kama kutakua no struct data means object is zero... deleted..
                    // Ko I should have if here....
                    if (parseInt(givenStruct.madeAt) === 0) {
                        continue;
                    } else {
                        if (accessedArrayCollateral.length > 0) {
                            // There some condition where by the user can put two or three collateral assets...
                            let imgSrc = [];
                            for(let i = 0; i < accessedArrayCollateral.length; i++){
                                // the aim of this for loop is to add image src to the imgSrc array above...
                                let index = accessedArrayCollateral[i];
                                // Then if you have that index it will become easy for you to access metadata url from blockchain..
                                // Hapa nftData to give u url it needs you to pass the address of the owner by default the owner of
                                // nft data is the one added or need loan since its the one which own the assets for now..
                                let metadata_url = await myMkopo.methods.nftData(parseInt(index), givenStruct.borrower).call();
                                console.log("This is the metadata url");
                                console.log(metadata_url);
                                // From metadata url convert it to json then get the image attribute from it
                                // From this metadata url fetch data
                                let response = await fetch(metadata_url);
                                // Response status its always ok since its already been tested..
                                let data = await response.json();
                                console.log(data.image);
                                imgSrc.push(data.image);
                            }
                            givenStruct["src"] = imgSrc[0]; // Remember even if the user has many images we only take the first one
                            console.log(givenStruct["src"]);
                            givenStruct["allSrc"] = imgSrc;
                            console.log("These are image src for you!");
                            console.log(imgSrc);
                        } else {
                            // Inakuja huku coz collateral assets is [].. Hii pia ipo sawa upande ambao kutakuwa na mtu ameshamkopesha jamaa...
                            givenStruct["src"] = "";
                            givenStruct["allSrc"] = [];
                        }
                        givenStruct["CA"] = deployedConntractAddresses[i];
                        givenStruct["collateral"] = accessedArrayCollateral;
                        bunchOfDeniStruct.push(givenStruct);
                    }
                }
                addressDeniDetails.push(bunchOfDeniStruct);
            }
        }
        // so now I will have a object contraining key and arrays...
        return {
            address: bunchOfDeniStruct
        };
    }
    // NOW IMEKUBALI ILA ISHU IPO KUWA YENYEWE KU-RETURN OBJECT HAITAKI.. HAIJUII...
    // the setInterval() and setTimeout() is executed by default... without being called, so kulikua hamna ulazima wa ku-store
    // it in checkAll.... variable coz its been executed without being called.... Hivyo tu mkali...
    // UZURI WA SETINTERVAL METHOD IS GET EXECUTED EVEN WITHOUT BEING CALLED.. SO HATA HII VARIABLE YA checkAllAfterBorrowing.... tukiitoa
    // yenyewe itaendelea kufanya kazi tu as long the script or codes is alive....
    /*
    checkAllAfterBorrowingMoneyIfDueDateHasBeenPassed = setInterval(() => {
        console.log('Hey pasko im executing everytime after 2 minutes');
        // when using new Date().getTime(); it returns milliseconds since epoch so no need to times it with 1000 since its milliseconds..
        let date = new Date().getTime();
        console.log('This is milliseconds to date since epoch for you '+date)
        // KUPITIA HII METHOD KUNA ISSUE ZINAWEZA ZIKA-RISE... UJUE KABISA KAMA HII INAKUWA RUN WHEN THE USER... ANY USER VISIT THE HOMEPAGE THEN
        // TO EXECUTE ALL LOGICS AND TO CALL FAILED TO PAYBACK NEED USER/CURRENT USER TO BE CHARGED WITH GAS FOR  THIS ISSUE.... HII HAIPO FAIR COZ 
        // PIA USER ANAWEZA AKAKATAA... KO THIS IS BAD HABIT WHAT I WANT YOU TO DO IS TO CREATE ANOTHER SCRIPT FILE WHICH WILL BE ALIVE AND CALLED 
        // BY ACCOUNT ONE NOT IN BROWSER SO WHAT I NEED YOU TO DO IS ON STARTING OF SERVER YOU SHOULD RUN THIS SCRIPT THIS IS ALL WE CAN DO.. TO AVOID 
        // THIS AMBIGUITY KAMA HUJUI HOW TO GET STARTED SEE IN deploy.js HOW ACCOUNT GET CALLED BY SERVER AND NOT CLIENT/BROWSER AND DEPLOY THE CONTRACT...
        // SO HII FUNCTION KUIWEKA HAPA KWENYE BROWSER NI MAKOSA SO CREATE ANOTHER SCRIPT AND EXECUTE IT USING 'node checkDate.js' KO NAONA HAPA UMEONA UTOFAUTI
        // IN BROWSER WE USE npm run dev while in SERVER WE USE node.js... REMEMBER NODE.JS IS SERVER SIDE  THAT'S ALL PASKO....
    }, 1000);
    */ lendme = async (e)=>{
        await this.setState({
            lendMeLoading: true
        });
        // This method on being called it should sent the amount of ether to borrower..
        // i to send these money I should have data such as Borrower address and amount he want
        e.preventDefault;
        console.log(e.target.name, e.target.value, e.target.title);
        // so let's see how we can lend this guy money..... call callNamkopesha this will complete all actions... But hapa kuna swali hii
        // amount to send we pass where... Ok nahisi hata kwenye call({from:_____, value: }) Nahisi kitu kama hichi kinawezekana... So don't
        // worry much...... There two important information to have here so as to proceed with our mission which are contract address and
        // value to send....
        const mkopo = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(e.target.name);
        const borrower = await mkopo.methods.owner().call();
        console.log(borrower, " the borrower"); // this is borrower
        const accounts = await _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__/* ["default"].eth.getAccounts */ .Z.eth.getAccounts();
        // After loading the contract then we can call method of namkopesha
        const moneyToSendInWei = await _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__/* ["default"].utils.toWei */ .Z.utils.toWei(e.target.value, "ether");
        console.log(moneyToSendInWei);
        // Jinsi ya ku-pass hii deniDetails ni vipi kwani... Kwanza use the array which store them then from there import the one
        // with timestamp of that we pass here...
        const DDLength = await mkopo.methods.lengthOfDeniDetailsRequest().call();
        let DDToPass; // there is two deniRequest detail i thinkkk... then what... Kwa nn ya mwsho inakubali ila ya kwanza inaenda kwa zote
        for(let i = 0; i < DDLength; i++){
            // From ehere check all of them if there is one
            let save = await mkopo.methods.deniDetailsList(i).call();
            if (parseInt(save.madeAt) === parseInt(e.target.title)) {
                console.log("I have got you!!!!");
                DDToPass = save;
            } else {
                console.log("Im outside...");
                continue;
            }
        }
        console.log("This is ddToPass for you!");
        console.log(DDToPass);
        // Naona kuna ugumu ku-pass struct nzima ni ngumu itakua ngumu sana labda hapa ni-iweke contract yangu sawa iwe ina-pass
        // madeAt integer since it's unique for each DeniDetail from there inside our Struct of ABM we should store only this madeAt
        // where we can use it later to Query the DeniDetail nahisi  HII NDO COUNTER MEASURE..
        // AU COZ HII INA-COMPLICATE KUWA MBONA SIIONI collateral Asset array pia kuna attribute zingine zimejiongeza hapa kama hizi
        // number 0, 1, 2, 3... Cha Kufanya sasa embu zifute then add collateralAssets key..
        delete DDToPass["0"];
        delete DDToPass["1"];
        delete DDToPass["2"];
        delete DDToPass["3"];
        // Use mapping to get the collateral Assets Array
        const collateral = await mkopo.methods.accessingCollateralAssets(parseInt(e.target.title)).call();
        const correctFormatCollateral = collateral.map((value, index)=>{
            return parseInt(value);
        });
        console.log(correctFormatCollateral);
        DDToPass["collateralAssets"] = correctFormatCollateral;
        console.log(DDToPass); // Kumbuka borrower ni yule yule hapa
        // MPAKA HAPA IMEKUBALI KU-PASS.. ISHU IPO HAPA KWENYE KU-CALL callNamkopesha Nashangaa hai-return chochote nimejaribu
        // ku-print iyo output inareturn empty object { } sa sijui ina maana gani.. Sijajua if alifanikiwa ku-mcall namkopesha payable
        // method pia cijajua kama namkopesha if get called imetengeneza AfterBorrowingMoney Struct... Nahisi niishie hapa kesho nitakuja
        // kuendelea from here.... ........ Au labda call haipokei arguments of from and value maybe...
        ////  THIS IS TOMMORRO STARTING POINT ******************************... KESHO CHA KUANGALIA NI DOCUMENTATION OF THIS CALL METHOD...
        // AU EMBU JARIBU KUWEKA .send() uone.... OK NISHAJUA WHENEVER YOU SEND MONEY PAYABLE YOU SHOULD USE .send() alafu embu angalia usenge
        // wa delete ima-acha gepu kule .... Inabidi hii deniDetails iwe haipo kabisa yenyewe imeipa 0... Ko KESHO BASI KAZI YETU NI KUI-WEKA VIZURI
        // PIA KAZI YETU NYINGINE NI KU-DEAL NA ZILE TABLES OF claims and Debts in Profile... Ko kwenye account1 coz amekopesha hadaiwi then kwake inabidi
        // kuwe na claims ila Kwenye account3 coz kakopesha ka-receive 2 ether kwake inabidi kuwe na Debts pia usisahau ukishaziweka sawa inabid u-redirect
        // user to the Profile to view these changes... Pia usisahau kuangalia kama hizi assets kweli zimekuwa locked... Inabidi uzi-display kwa user as locked.
        // Hivyo ndo vitu vya kufanay kesha............
        console.log("This is borrower address from DeniDetails");
        console.log(DDToPass.borrower); // Huyu ni borrower mwingine...
        console.log("Lets put the end of this shit...");
        let output = await mkopo.methods.callNamkopesha(DDToPass, borrower).send({
            from: accounts[0],
            value: moneyToSendInWei
        });
        console.log("This is the output for you!");
        console.log(output);
        _routes__WEBPACK_IMPORTED_MODULE_9__.Router.pushRoute("/profile/");
    };
    onClick = async ()=>{
        console.log("The above is returned value");
        const deployedConntractAddresses = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
        console.log(deployedConntractAddresses);
        // then load all mikopo and access from it the struct of DeniDetails..
        let addressDeniDetails = [];
        let bunchOfDeniStruct = [];
        for(let i = 0; i < deployedConntractAddresses.length; i++){
            const myMkopo = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(deployedConntractAddresses[i]);
            const lengthOfDeniArray = await myMkopo.methods.lengthOfDeniDetailsRequest().call();
            if (lengthOfDeniArray > 0) {
                for(let z = 0; z < lengthOfDeniArray; z++){
                    let givenStruct = await myMkopo.methods.deniDetailsList(z).call();
                    bunchOfDeniStruct.push(givenStruct);
                }
                addressDeniDetails.push(bunchOfDeniStruct);
            }
        }
        console.log("below is address deni details");
        console.log(addressDeniDetails);
    };
    showAssets = async (e)=>{
        e.preventDefault();
        let value = e.target.name;
        // By default data passed in the html element is of string data type...
        let goodArray = value.split(","); // this will convert string and split it in array...
        console.log("Maybe this will yield an array");
        console.log(goodArray);
        console.log(typeof goodArray);
        await this.setState({
            imageSrc: goodArray
        });
        this.toDemish.current.style.display = "none";
        this.toPopUp.current.style.display = "block";
    };
    onRemove = async (e)=>{
        this.toPopUp.current.style.display = "none";
        this.toDemish.current.style.display = "block";
    };
    render() {
        if (this.props.address.length > 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().st),
                        ref: this.toDemish,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Lend me and earn more... 5% of interest is earned.."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid.Column, {
                                        width: 12,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Group, {
                                                itemsPerRow: 3,
                                                children: this.props.address.map((value, key)=>{
                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card, {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {
                                                                src: value["src"],
                                                                wrapped: true,
                                                                ui: false
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Content, {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Header, {
                                                                        className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().hid),
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().oh),
                                                                            children: [
                                                                                "CA: ",
                                                                                value["CA"]
                                                                            ]
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Meta, {
                                                                        children: [
                                                                            "Amount in Ether: ",
                                                                            value[0]
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Meta, {
                                                                        children: [
                                                                            "Duration in Days: ",
                                                                            value[2]
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Meta, {
                                                                        className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().hid),
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().oh),
                                                                            children: [
                                                                                "BA: ",
                                                                                value[1]
                                                                            ]
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Description, {
                                                                        children: [
                                                                            "Collateral assets:",
                                                                            " ",
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().val),
                                                                                children: [
                                                                                    "(",
                                                                                    value["allSrc"].length,
                                                                                    ")"
                                                                                ]
                                                                            }),
                                                                            " ",
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                style: {
                                                                                    color: "rgb(67, 168, 222)"
                                                                                },
                                                                                name: value["allSrc"],
                                                                                onClick: this.showAssets,
                                                                                children: "View"
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Card.Content, {
                                                                extra: true,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                                    content: "Lend me",
                                                                    title: value[3],
                                                                    name: value["CA"],
                                                                    value: value[0],
                                                                    onClick: this.lendme
                                                                })
                                                            })
                                                        ]
                                                    }, key);
                                                })
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid.Column, {
                                        width: 4,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().spt),
                                                    children: [
                                                        "Need loan",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                            name: "question"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                                " Each loan will include the 5% of interest as Payback. Click the button below to Get started..",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                    href: "/profile/",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                        content: "Get Started",
                                                        primary: true
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().prv),
                        ref: this.toPopUp,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().closeBtn),
                                ref: this.closeBtn,
                                onClick: this.onRemove,
                                children: "\xd7"
                            }),
                            this.state.imageSrc.map((value, key)=>{
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: value,
                                    width: 800,
                                    height: 800,
                                    wrapped: true,
                                    ui: true,
                                    className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().ig)
                                }, key);
                            })
                        ]
                    })
                ]
            });
        } else {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().st),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Lend me and earn more... 5% of interest is earned.."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid.Column, {
                                        width: 12,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().ti),
                                                children: "It's seem today we all rich, No one need to lend money.."
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Grid.Column, {
                                        width: 4,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: (_static_css_start_module_css__WEBPACK_IMPORTED_MODULE_10___default().spt),
                                                    children: [
                                                        "Need loan",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                            name: "question"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                                " Each loan will include the 5% of interest as Payback. Click the button below to Get started..",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                    href: "/profile/",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                        content: "Get Started",
                                                        primary: true
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MikopoIndex);


/***/ }),

/***/ 2245:
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ 662:
/***/ ((module) => {

"use strict";
module.exports = require("next-routes");

/***/ }),

/***/ 562:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1831:
/***/ ((module) => {

"use strict";
module.exports = require("semantic-ui-react");

/***/ }),

/***/ 8519:
/***/ ((module) => {

"use strict";
module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [686,675,676,664,837,697,424], () => (__webpack_exec__(4369)));
module.exports = __webpack_exports__;

})();