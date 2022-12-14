(() => {
var exports = {};
exports.id = 386;
exports.ids = [386];
exports.modules = {

/***/ 9287:
/***/ ((module) => {

// Exports
module.exports = {
	"proStyle": "show_profile_proStyle__OZRPR",
	"profileDiv": "show_profile_profileDiv__w7KuD",
	"profile": "show_profile_profile__RtCoA",
	"anuani": "show_profile_anuani__mJrSZ",
	"assets": "show_profile_assets__V9LO7",
	"numb": "show_profile_numb__IFWsI",
	"assets1": "show_profile_assets1__zVJXj",
	"assets2": "show_profile_assets2__p4Fha",
	"buttonWrappers": "show_profile_buttonWrappers__fWgqP",
	"lend": "show_profile_lend__ZvMRP",
	"xo": "show_profile_xo__C0G1N",
	"notify": "show_profile_notify__I6VwB",
	"hl": "show_profile_hl__QeEGW",
	"timelineDiv": "show_profile_timelineDiv__h7MIj",
	"firstTimeline": "show_profile_firstTimeline__BFHDe",
	"nftTitle": "show_profile_nftTitle__woltb",
	"miniSp": "show_profile_miniSp___XIZi",
	"secondTimeline": "show_profile_secondTimeline__8z86f",
	"clmTitle": "show_profile_clmTitle__hSNVY",
	"thirdTimeline": "show_profile_thirdTimeline__rfkSm",
	"dbTitle": "show_profile_dbTitle__UMb6i",
	"underline": "show_profile_underline__SAEHZ",
	"underline1": "show_profile_underline1__to_HG",
	"underline2": "show_profile_underline2__rCIof",
	"belowHr": "show_profile_belowHr__20iqB",
	"nftContent": "show_profile_nftContent__sm0Cn",
	"claimContent": "show_profile_claimContent__Yk7Lc",
	"debtContent": "show_profile_debtContent__wjaYH",
	"picha": "show_profile_picha__Jkm8m",
	"prv": "show_profile_prv__cqJyI",
	"ig": "show_profile_ig__20bmM",
	"closeBtn1": "show_profile_closeBtn1__5FxfN",
	"debtsPrev": "show_profile_debtsPrev__5ObSi",
	"closeBtn2": "show_profile_closeBtn2__aocyh",
	"cLoading": "show_profile_cLoading__SCP9M"
};


/***/ }),

/***/ 7367:
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
/* harmony import */ var _components_navBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2424);
/* harmony import */ var _static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9287);
/* harmony import */ var _static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1831);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(262);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1837);
/* harmony import */ var _Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8697);
/* harmony import */ var _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2248);












class ProfileComponent extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    state = {
        claims: [],
        debts: [],
        payback: false,
        claimAssets: [],
        debtAssets: [],
        lenderLoad: false
    };
    constructor(props){
        super(props);
        this.elemNFT = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.elemClaim = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.elemDebt = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.toPopUp = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.toDemish = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.debtPrv = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.closeBtn = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.closeBtn1 = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.claimLoading = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.debtLoading = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    }
    static async getInitialProps(props) {
        const { address  } = props.query;
        const deployedContractAddress = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
        let managers = new Array();
        let comparisonList = new Array();
        let desiredContractAddress;
        for(let i = 0; i < deployedContractAddress.length; i++){
            const mkopo1 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployedContractAddress[i]);
            let manager = await mkopo1.methods.owner().call();
            managers.push(manager);
            comparisonList.push(manager.toLowerCase());
            if (manager.toLowerCase() == address) {
                desiredContractAddress = deployedContractAddress[i];
                console.log(desiredContractAddress);
            }
        // Au zingefanyika humu ndani kwa pamoja zilete hizo assets which is found in 
        // other contract... Ngoja naweza nikaweka logic humu kama mambo yatakua sio..
        }
        console.log("This is desired contract address" + desiredContractAddress);
        // Hapa nahisi hii condition imekaa vibaya... inabid niiweke poa... coz hapa ikipita hata mkopo itashindwa
        // ku-load....
        // After getting the contract address load a new mkopo then from it take the url..
        if (desiredContractAddress != null) {
            let loadedMkopo = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(desiredContractAddress);
            let mintedNfts = await loadedMkopo.methods.getNFTIndexes().call();
            // mintednfts inaacha 0 kama ulifuta element.. na ndo kilichofanyika 
            console.log(mintedNfts);
            // Hapa condition ni kwamba hata ambaye hajadeploy contract anaweza akadai.... Vilevile hata alie-deploy pia anaweza akadai..
            // Ila hapa pia mtu anaweza akawa na nfts ambazo hajazimint yeye bali kamint mwingne coz alishindwa kulipa deni....
            let metadataList = [];
            let imageUrlSrc = [];
            for(let z = 0; z < mintedNfts.length; z++){
                if (mintedNfts[z] == 0) {
                    console.log("This nft asset has been jacked!");
                    continue;
                } else {
                    let closedOrNot = await loadedMkopo.methods.closedAssets(mintedNfts[z]).call();
                    console.log("This is status of given assets either its closed or not!");
                    console.log(closedOrNot);
                    console.log("End of checking status of the asset");
                    let meta = await loadedMkopo.methods.nftData(mintedNfts[z], address).call();
                    metadataList.push(meta);
                }
            }
            for(let p = 0; p < metadataList.length; p++){
                let response = await fetch(metadataList[p]);
                if (!response.ok) {
                    console.log("Problem with this url");
                } else {
                    let data = await response.json();
                    let imageSrc = data.image;
                    imageUrlSrc.push(imageSrc);
                }
            }
            // Nahisi hapa ndo ni sehemu nzuri ya ku-add logic endapo user ana contract ila nft zake zipo
            // kwenye contract nyingne..... Hapa coz nina contract ambayo imekua deployeed na huyu jamaa
            // then itakua rahisi kuitoa na kucheck kwenye contract zingne... Let's go
            for(let n = 0; n < deployedContractAddress.length; n++){
                if (deployedContractAddress[n].toLowerCase() == desiredContractAddress.toLowerCase()) {
                    // this is contract of this user achana nayo
                    console.log("This is the contract by this user");
                    continue;
                } else {
                    const loan = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployedContractAddress[n]);
                    // From it you should get jackedNfts
                    let jacked = await loan.methods.getJackedNftIndex().call();
                    // Sasa hapa from this jacked array you should test one after another for this address
                    for(let k = 0; k < jacked.length; k++){
                        let metada = await loan.methods.nftData(jacked[k], address).call();
                        if (metada === "") {
                            // there is no any jacked nfts jacked by this address
                            console.log("Its not you who jacked nft");
                            continue;
                        } else {
                            // then he is the one who jack nft
                            console.log("Its you who jacked this");
                            let response = await fetch(metada);
                            let dat = await response.json();
                            let imgU = dat.image;
                            imageUrlSrc.push(imgU);
                        }
                    }
                }
            }
            // KO LOGIC ZA KUCHECK JACKED NFT inaishia hapa...
            console.log("This is metadata " + imageUrlSrc);
            console.log(imageUrlSrc + " this is for me");
            // Hapa inabidi ije condition either also to check if the user has any claims...
            const deployed = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
            let counter = 0;
            let debtsCounter = 0;
            for(let i = 0; i < deployed.length; i++){
                const mkopo2 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployed[i]);
                const abm_length = await mkopo2.methods.getAfterBorrowingMoneyLength().call();
                if (abm_length > 0) {
                    for(let p = 0; p < abm_length; p++){
                        let abm = await mkopo2.methods.ListOfAfterBorrowingMoney(p).call();
                        console.log("Hey please this is for me my friend!");
                        console.log(abm);
                        let lender = abm.lender;
                        let borrower = abm["1"]["1"]; // Kwani hamna abm yoyote au...
                        console.log("This below is deni contained in abm");
                        console.log(borrower);
                        if (lender.toLowerCase() === address.toLowerCase() && borrower.toLowerCase() === address.toLowerCase()) {
                            counter++;
                            debtsCounter++;
                        } else if (lender.toLowerCase() === address.toLowerCase()) {
                            counter++;
                        } else if (borrower.toLowerCase() === address.toLowerCase()) {
                            debtsCounter++;
                        } else {
                            continue;
                        }
                    }
                }
            }
            console.log(counter, debtsCounter);
            return {
                address: address,
                mintedArrays: imageUrlSrc,
                counter: counter,
                debtsCounter: debtsCounter
            };
        } else {
            const deployed = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
            let desiredABM = [];
            let imgList = [];
            let counter = 0 // Hapa nahisi hii conter ni number of claims counted..... all these logics is for retrieving number of claims by this user...
            ;
            for(let i = 0; i < deployed.length; i++){
                const mkopo3 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployed[i]);
                const abm_length = await mkopo3.methods.getAfterBorrowingMoneyLength().call();
                if (abm_length > 0) {
                    for(let p = 0; p < abm_length; p++){
                        let abm = await mkopo3.methods.ListOfAfterBorrowingMoney(p).call();
                        let lender = abm.lender;
                        if (lender.toLowerCase() === address.toLowerCase()) {
                            //  I need to count these things if the lender is of this address..
                            counter++;
                        } else {
                            continue;
                        }
                    }
                }
                // Here for each contract access all minted asset index
                let mintedAssets = await mkopo3.methods.getNFTIndexes().call();
                console.log("This is mintedAsset " + mintedAssets);
                let metaList = [];
                console.log("This is mintedAsset length");
                console.log(mintedAssets.length);
                console.log(mintedAssets[0]);
                // Jua huyu jamaa hajamint na tushasema data muhimu kama mtu alishindwa kulipa zinakuwa stored
                // in jackedNftIndex
                let jackedNft = await mkopo3.methods.getJackedNftIndex().call();
                console.log("This are jacked nft");
                console.log(jackedNft);
                for(let z = 0; z < jackedNft.length; z++){
                    // Mpaka jacked length imezidi 0 ujue kuna vitu...
                    let metad = await mkopo3.methods.nftData(jackedNft[z], address).call();
                    console.log(metad);
                    if (metad === "") {
                        console.log("Huna chako");
                        continue;
                    } else {
                        let response = await fetch(metad);
                        let data = await response.json();
                        let imgUrl = data.image;
                        imgList.push(imgUrl);
                    }
                }
                console.log("This is metaList for this user...");
                console.log(metaList);
                console.log(imgList);
            // So hapa you can take these and assign them to the props for it to be rendered yaani hapa pasko
            // in short tuna condition 2 kuwa unaweza ukawa huna contract ila una asset kwa watu ndo kilichofanyika
            // hapa lakn vilevile unaweza ukawa una contract vilevile una-assets kwenye contracts za watu.. Hivyo pasko
            // hii conditon tutahandle kwenye if hapo juu........ Ko baadae huyu assign mintedArrays = imgList... vilevile
            // elewa coz user hana-contract then there is no way for them to have the debts... Ndo maana debts by default it
            // remain zero... LAKN PASKO HAPO JUU SI UMESEMA KUWA HUYU USER ANAWEZA AKATUMIA CONTRACT YA MTU ALIEKOPA AKAKOPA ILA
            // KWENYE RENDER IKAKAA ADDRESS YAKE????????? DUH NAHISI HII KITU TUSIIWEKE... COZ VITU VITAKUA COMPLICATED ZAIDI COZ 
            // HATA PALE KWENYE LOADING ITABIDI PIA TUANGALIE NA HII CONDITION .... SO IN SHORT THERE IS NO WAY FOR USER TO USE NFT
            // FOUND IN OTHER CONTRACT HATAKAMA YEYE NDO MMILIKI KUKOPA HELA.... HIVYO FULL STOP..
            }
            return {
                address: address,
                mintedArrays: imgList,
                counter: counter,
                debtsCounter: 0
            }; // Hii debtsCounter lazima iwe 0 coz huyu mtu hajawai deploy contract...
        }
    }
    redirectToHome = async (e)=>{
        await this.setState({
            lenderLoad: true
        });
        e.preventDefault();
        console.log("Hello world");
        _routes__WEBPACK_IMPORTED_MODULE_4__.Router.pushRoute("/");
    };
    onClickNFT = ()=>{
        // Access claims and debts, make underline disappear and color of text grey.
        let NFTElem = this.elemNFT.current;
        let claimElem = this.elemClaim.current;
        let debtElem = this.elemDebt.current;
        //console.log(claimElem.firstChild.nextSibling)  /*claimElem.innerHTML, ko inner html inafanya kazi hapa*/
        // Nini cha kufanya... Kwanza mtu aki-bonyeza nft inabidi tu-update.. But coz it's default since
        // at start no line displayed in debt and claim..
        let claimSpanElem = claimElem.firstChild.nextSibling;
        claimSpanElem.style.color = "#a1a1a1";
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = "#a1a1a1";
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let nftSpanElem = NFTElem.firstChild.nextSibling;
        nftSpanElem.style.color = "black";
        nftSpanElem.firstChild.nextSibling.nextSibling.style.display = "block";
        // Kingine cha kufanya ni ku-make content of other dissappear.
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = "block";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = "none";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = "none";
    };
    // ALAFU INABIDI UJUE KUWA BY DEFAULT USER INPUT TAKEN IN FORM OF STRING SO IF YOU PUT DECIMAL AND GET THAT THEN
    // TRIES TO CONVERT IT INTO INT USING PARSE INT THEN YOU'VE BEEN SCREWED COZ '0.6' IN PARSEINT IS 0.. 12.5 IS 12..
    // THIS IS BECAUSE INT IS NOT FLOAT OR DECIMAL SO IT WILL NOT TAKE THE DECIMAL PLACE PLACED... NI HIVYO TU PASKO 
    // INABIDI UJUE COZ KUNA CONTRACT NILIWEKA 0.5 THEN HUKU NAONA NI 0.
    putEverythingAboutClaimTogether = async ()=>{
        // we needed to iterate all the contracts address and access the ABM stored then return the
        // array of one having the lender of this address after that you can store them inside the state
        // so as to be iterated....
        // Here at first I should display the loading interface
        console.log("This is claim loading for you!");
        console.log(this.claimLoading.current);
        const deployedContractAddresses = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
        let desiredABM = [];
        for(let i = 0; i < deployedContractAddresses.length; i++){
            const mkopo4 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployedContractAddresses[i]);
            // from that mkopo try to access the ABM list.. 
            const abm_length = await mkopo4.methods.getAfterBorrowingMoneyLength().call();
            // After getting this tries to iterate through it and access abm
            if (abm_length > 0) {
                console.log("This is abm_length for you ...") // Hapa inaleta 1 ni kweli coz aliekopeshwa mpaka sasa ni mtu mmoja tu....
                ;
                console.log(abm_length);
                for(let p = 0; p < abm_length; p++){
                    // then here check from it push lender to lenders array;
                    let max_mint = await mkopo4.methods.maxMint().call();
                    console.log(max_mint);
                    let abm = await mkopo4.methods.ListOfAfterBorrowingMoney(p).call();
                    let lender = abm.lender;
                    // Baadae mtu akishalipa kumbuka inabidi tu-delete  the abm so by default it
                    // will be of 0.... if so if we compare this with address it will return false..
                    console.log("This is lender for you!");
                    console.log(lender);
                    // for each you should check if the lender is of this address if so then you 
                    // should save it into desiredABM... But they can be many of them so desiredABM
                    // should be an array to push these claims data..
                    if (lender.toLowerCase() === this.props.address.toLowerCase()) {
                        // remember we should fetch the collateral assets from mapping using the 
                        // timestamp of the deniDetails saved within the ABM and from that get the 
                        // the array of the collateral asset also we should store the address of the
                        // contract inside this....
                        abm["CA"] = deployedContractAddresses[i];
                        let createdAt = parseInt(abm["1"]["4"]);
                        // then after that let's access the collateral assets..
                        let collaterals = await mkopo4.methods.accessingCollateralAssets(createdAt).call();
                        console.log("This is collateral for you");
                        console.log(collaterals);
                        abm["collateralAssets"] = collaterals;
                        // TO CONVERT MILLISECONDS OF BLOCK.TIMESTAMP ... REMEMBER BLOCK TIMESTAMP IS THE TOTAL SECONDS PASSED SINCE
                        // THE EPOCH... HERE IN OUR CASE BLOCK.TIMESTAMP RETURNS MILLISECONDS SO WE SHOULD FIRST CONVERT THEM INTO 
                        // SECONDS BY MULTIPLYING WITH 1000 THEN CALL date() object to convert it into the date....
                        // For more read this article https://poopcode.com/convert-epoch-timestamp-to-javascript-date/
                        let start = abm["issuedAt"];
                        console.log("This is the start date of abm " + start);
                        let correctStartDate = new Date(start * 1000);
                        start = correctStartDate.toDateString();
                        let accessedDuration = parseInt(abm["1"]["duration"]);
                        console.log("This is accessed duration " + accessedDuration);
                        let net = parseInt(abm["issuedAt"]) * 1000 + parseInt(accessedDuration) * 24 * 60 * 60 * 1000;
                        let date2 = new Date(net);
                        console.log("Below is net and date2");
                        console.log(net, date2);
                        let deadlineString = date2.toDateString();
                        abm["deadline"] = deadlineString;
                        abm["issuedAt"] = start;
                        // Haina haja ya ku-calculate return amount na ku-store it in solidity coz naona even if nimeweka logic zote za ku-add 5% to it as 
                        // return amount kwenye solidity it's remained the same as debt amount... So hii logic ya ku-add na ku-calculate 5% of interest rate 
                        // naia-cha kwenye javascript so javascript will take debt amount and calculate the returned value like we see there in interface on 
                        // claims table in profile that's all I want to tell you today..
                        desiredABM.push(abm);
                    } else {
                        console.log("Im not the lender so continue to another dont add me");
                        continue;
                    }
                }
            // then here we needed to compare these addresses
            } else {
                continue;
            }
            console.log("This is abms to use as claims for you");
            console.log(desiredABM);
            await this.setState({
                claims: desiredABM
            });
        }
    };
    onClickClaim = async ()=>{
        // Ili niweze ku-display all logics required to display actual data to the user inabid
        // niwe na function ambayo kazi yake itakuwa ni ku-execute all logics required to populate
        // the claims... JIULIZE NI KWA NINI HIZI LOGIC SIJAZIWEKA KWENYE getInitialProps() funtion 
        // Jibu ni kuwa coz on start only logic of NftCollection is required so its those which needed
        // to get placed inside the getInitialProps coz initially when user navigate to our page is already
        // been in NFtCollection so that's why we placed this there but other logic of claim and Debts table
        // is only rendered when the user clicked it and not by default so this make us to use other function 
        // rather than getInitialProps to execute  these logics...
        // this executed when user click claim.
        // this.claimLoading.current.style.display = 'block';
        let NFTElem = this.elemNFT.current;
        let claimElem = this.elemClaim.current;
        let debtElem = this.elemDebt.current;
        let NFTSpanElem = NFTElem.firstChild.nextSibling;
        NFTSpanElem.style.color = "#a1a1a1";
        NFTSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = "#a1a1a1";
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let claimSpanElem = claimElem.firstChild.nextSibling;
        claimSpanElem.style.color = "black";
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = "block";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = "none";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = "block";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = "none";
        await this.putEverythingAboutClaimTogether();
        this.claimLoading.current.style.display = "none";
    };
    putEverythingAboutDebtTogether = async ()=>{
        const deployedContractAddresses = await _Ethereum_factory_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].methods.getDeployedMikopo */ .Z.methods.getDeployedMikopo().call();
        let desiredABM = [];
        for(let i = 0; i < deployedContractAddresses.length; i++){
            const mkopo5 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(deployedContractAddresses[i]);
            const abm_length = await mkopo5.methods.getAfterBorrowingMoneyLength().call();
            if (abm_length > 0) {
                console.log("This is abm_length for you");
                console.log(abm_length);
                for(let p = 0; p < abm_length; p++){
                    let abm = await mkopo5.methods.ListOfAfterBorrowingMoney(p).call();
                    console.log("Hey this is abm for you");
                    console.log(abm);
                    let borrower = abm["1"]["1"];
                    console.log("This is borrower for you!");
                    console.log(borrower);
                    if (borrower.toLowerCase() === this.props.address.toLowerCase()) {
                        // Kama ni abm ileile CA itakua nayo but kama user ataanza ku-click claimsCatalogue kwanza... But here we should set it
                        abm["CA"] = deployedContractAddresses[i];
                        let createdAt = parseInt(abm["1"]["4"]);
                        let collateral = await mkopo5.methods.accessingCollateralAssets(createdAt).call();
                        console.log("This is collateral for you");
                        console.log(collateral);
                        abm["collateralAssets"] = collateral;
                        let start = abm["issuedAt"];
                        let correctStartDate = new Date(start * 1000);
                        start = correctStartDate.toDateString();
                        let accessedDuration = parseInt(abm["1"]["duration"]);
                        let net = parseInt(abm["issuedAt"]) * 1000 + parseInt(accessedDuration) * 24 * 60 * 60 * 1000;
                        let date2 = new Date(net);
                        let deadlineString = date2.toDateString();
                        abm["deadline"] = deadlineString;
                        abm["issuedAt"] = start;
                        desiredABM.push(abm);
                    } else {
                        console.log("Im not the borrower so continue to another don't add me");
                        continue;
                    }
                }
            } else {
                continue;
            }
            console.log("This is abm to use as debts for you");
            console.log(desiredABM);
            await this.setState({
                debts: desiredABM
            });
        }
    };
    onClickDebt = async ()=>{
        // this executed when user click debt.
        let NFTElem = this.elemNFT.current;
        let claimElem = this.elemClaim.current;
        let debtElem = this.elemDebt.current;
        let NFTSpanElem = NFTElem.firstChild.nextSibling;
        NFTSpanElem.style.color = "#a1a1a1";
        NFTSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let claimSpanElem = claimElem.firstChild.nextSibling;
        claimSpanElem.style.color = "#a1a1a1";
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = "none";
        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = "black";
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = "block";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = "none";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = "none";
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = "block";
        await this.putEverythingAboutDebtTogether();
        this.debtLoading.current.style.display = "none";
    };
    onPayback = async (e)=>{
        await this.setState({
            payback: true
        });
        // Remember solidity payback method need us to pass the ABM... But how we can detect this abm... On button we should pass
        // abm timestamp then contract address of containing that abm, load that contract then from abm list iterate through all abms
        // to get one with our needed timestamp... After  that everything is good... But mbona unashangaa coz ume-edit abm timestamp 
        // iende kwenye tarehe za kisasa in 'issuedAt' key don't worry we have altenative index of string of integer which store this
        // timestamp of issuedAt instead of 'issuedAt' key we can use this index and  then here we go..
        // so in this target of event in this button we should bind CA and issueAt in form of milliseconds...
        console.log(e.target.name, e.target.value, e.target.title);
        let targetABM;
        const mkopo6 = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(e.target.name);
        const accounts = await _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__/* ["default"].eth.getAccounts */ .Z.eth.getAccounts();
        const abm_length = await mkopo6.methods.getAfterBorrowingMoneyLength().call();
        const amountInWei = await _Ethereum_web3__WEBPACK_IMPORTED_MODULE_8__/* ["default"].utils.toWei */ .Z.utils.toWei(e.target.value, "ether");
        for(let i = 0; i < abm_length; i++){
            let givenABM = await mkopo6.methods.ListOfAfterBorrowingMoney(i).call();
            if (parseInt(e.target.title) === parseInt(givenABM["2"])) {
                targetABM = givenABM; // there is no way two ABM having the same timestamp... take this in ur head timestamp is milliseconds... no way...
            }
        }
        console.log(amountInWei);
        await mkopo6.methods.doPayback(targetABM).send({
            from: accounts[0],
            value: amountInWei
        });
        console.log(targetABM);
        _routes__WEBPACK_IMPORTED_MODULE_4__.Router.pushRoute("/");
        await this.setState({
            payback: false
        });
    };
    showClaim = async (e)=>{
        // This needed to be executed for user to view an image of claims... To achieve that we should
        // pass collateral assets inside the clicked link... Also we need the contract address to retrieve these
        // asset metadata url
        e.preventDefault();
        console.log(e.target.name, e.target.title, e.target.target);
        let goodArray = e.target.title.split(",");
        console.log(goodArray);
        const contract = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(e.target.name);
        let imgUrls = [];
        let metadataUrls = [];
        for(let i = 0; i < goodArray.length; i++){
            let metaUrl = await contract.methods.nftData(parseInt(goodArray[i]), e.target.target).call();
            metadataUrls.push(metaUrl);
        }
        console.log(metadataUrls);
        for(let p = 0; p < metadataUrls.length; p++){
            let response = await fetch(metadataUrls[p]);
            let data = await response.json();
            let imgSrc = data.image;
            imgUrls.push(imgSrc);
        }
        console.log(imgUrls);
        await this.setState({
            claimAssets: imgUrls
        });
        // After that let's make toDemish display none
        this.toDemish.current.style.display = "none";
        this.toPopUp.current.style.display = "block";
    };
    onRemove = ()=>{
        this.toPopUp.current.style.display = "none";
        this.toDemish.current.style.display = "block";
    };
    showDebt = async (e)=>{
        e.preventDefault();
        console.log(e.target.name, e.target.title, e.target.target);
        let goodArray = e.target.title.split(",");
        console.log(goodArray);
        const contract = await (0,_Ethereum_mkopo__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(e.target.name);
        let imgUrls = [];
        let metadataUrls = [];
        for(let i = 0; i < goodArray.length; i++){
            let metaUrl = await contract.methods.nftData(parseInt(goodArray[i]), e.target.target).call();
            metadataUrls.push(metaUrl);
        }
        console.log(metadataUrls);
        for(let p = 0; p < metadataUrls.length; p++){
            let response = await fetch(metadataUrls[p]);
            let data = await response.json();
            let imgSrc = data.image;
            imgUrls.push(imgSrc);
        }
        console.log(imgUrls);
        await this.setState({
            debtAssets: imgUrls
        });
        this.toDemish.current.style.display = "none";
        this.debtPrv.current.style.display = "block";
    };
    onRemove1 = ()=>{
        this.toDemish.current.style.display = "block";
        this.debtPrv.current.style.display = "none";
    };
    render() {
        if (this.props.mintedArrays.length == 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().proStyle),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                ref: this.toDemish,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().profileDiv),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: "/static/images/3.jpg",
                                                height: 220,
                                                width: 230,
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().profile)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().anuani),
                                                children: this.props.address
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets),
                                                children: [
                                                    "Total assets(NFTs): ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.mintedArrays.length
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets1),
                                                children: [
                                                    "Number of Debts: ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.debtsCounter
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets2),
                                                children: [
                                                    "Number of Claims: ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.counter
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().buttonWrappers),
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_routes__WEBPACK_IMPORTED_MODULE_4__.Link, {
                                                            route: `/profile/${this.props.address}/borrow`,
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                                animated: "vertical",
                                                                primary: true,
                                                                size: "medium",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                        visible: true,
                                                                        children: "Borrow"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                        hidden: true,
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                                            name: "money",
                                                                            size: "large"
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().lend),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                            animated: "vertical",
                                                            loading: this.state.lenderLoad,
                                                            size: "medium",
                                                            color: "black",
                                                            onClick: this.redirectToHome,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                    visible: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().xo),
                                                                        children: "Lend"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                    hidden: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                                        name: "money",
                                                                        size: "large"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().notify),
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/static/images/notification.png",
                                                            height: 40,
                                                            width: 40
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().timelineDiv),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().firstTimeline),
                                                onClick: this.onClickNFT,
                                                ref: this.elemNFT,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/coin.png",
                                                        height: 45,
                                                        width: 45
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().nftTitle),
                                                        children: [
                                                            "NFT Collection",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.mintedArrays.length
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().secondTimeline),
                                                onClick: this.onClickClaim,
                                                ref: this.elemClaim,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/lendn.png",
                                                        height: 35,
                                                        width: 35
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().clmTitle),
                                                        children: [
                                                            "Claims Catalogue",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.counter
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline1)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().thirdTimeline),
                                                onClick: this.onClickDebt,
                                                ref: this.elemDebt,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/beggar.png",
                                                        height: 35,
                                                        width: 35
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().dbTitle),
                                                        children: [
                                                            "Debts Catalogue",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.debtsCounter
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline2)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().belowHr)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().nftContent),
                                                children: this.props.mintedArrays.map((value, index)=>{
                                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: value,
                                                        width: 290,
                                                        height: 320,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().picha)
                                                    }, index);
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().claimContent),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table, {
                                                        fixed: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Header, {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Contract Address"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Lender"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Borrower"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Amount Lendered"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Return Amount"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Issued On"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Due Date"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Assets"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Body, {
                                                                children: this.state.claims.map((value, index)=>{
                                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["CA"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["lender"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["borrower"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["deni"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"])
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["issuedAt"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deadline"]
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: [
                                                                                    value["collateralAssets"].length,
                                                                                    " Assets ",
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                        href: "#",
                                                                                        onClick: this.showClaim,
                                                                                        target: value["deniDetail"]["borrower"],
                                                                                        name: value["CA"],
                                                                                        title: value["collateralAssets"],
                                                                                        children: "View"
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }, index);
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        ref: this.claimLoading,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().cLoading),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Dimmer, {
                                                                    active: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Loader, {
                                                                        content: "Loading"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {
                                                                    src: "https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().debtContent),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table, {
                                                        fixed: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Header, {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Contract Address"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Lender"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Borrower"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Amount Lendered"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Return Amount"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Issued On"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Due Date"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Assets"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Action"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Body, {
                                                                children: this.state.debts.map((value, index)=>{
                                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["CA"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["lender"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["borrower"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["deni"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"])
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["issuedAt"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deadline"]
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: [
                                                                                    value["collateralAssets"].length,
                                                                                    " Assets ",
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                        href: "#",
                                                                                        onClick: this.showDebt,
                                                                                        target: value["deniDetail"]["borrower"],
                                                                                        name: value["CA"],
                                                                                        title: value["collateralAssets"],
                                                                                        children: "View"
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                                                    color: "teal",
                                                                                    loading: this.state.payback,
                                                                                    content: "Payback",
                                                                                    value: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"]),
                                                                                    name: value["CA"],
                                                                                    title: value["2"],
                                                                                    onClick: this.onPayback
                                                                                })
                                                                            })
                                                                        ]
                                                                    }, index);
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        ref: this.debtLoading,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().cLoading),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Dimmer, {
                                                                    active: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Loader, {
                                                                        inverted: true,
                                                                        content: "Loading"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {
                                                                    src: "https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().prv),
                                ref: this.toPopUp,
                                children: [
                                    " ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().closeBtn1),
                                        ref: this.closeBtn,
                                        onClick: this.onRemove,
                                        children: "\xd7"
                                    }),
                                    this.state.claimAssets.map((value, key)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: value,
                                            width: 800,
                                            height: 800,
                                            wrapped: true,
                                            ui: true,
                                            className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().ig)
                                        }, key);
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().debtsPrev),
                                ref: this.debtPrv,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().closeBtn2),
                                        ref: this.closeBtn1,
                                        onClick: this.onRemove1,
                                        children: "\xd7"
                                    }),
                                    this.state.debtAssets.map((value, key)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: value,
                                            width: 800,
                                            height: 800,
                                            wrapped: true,
                                            ui: true,
                                            className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().ig)
                                        }, key);
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
        } else {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().proStyle),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                ref: this.toDemish,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().profileDiv),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: "/static/images/3.jpg",
                                                height: 220,
                                                width: 230,
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().profile)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().anuani),
                                                children: this.props.address
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets),
                                                children: [
                                                    "Total assets(NFTs): ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.mintedArrays.length
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets1),
                                                children: [
                                                    "Number of Debts: ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.debtsCounter
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().assets2),
                                                children: [
                                                    "Number of Claims: ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().numb),
                                                        children: this.props.counter
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().buttonWrappers),
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_routes__WEBPACK_IMPORTED_MODULE_4__.Link, {
                                                            route: `/profile/${this.props.address}/borrow`,
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                                animated: "vertical",
                                                                primary: true,
                                                                size: "medium",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                        visible: true,
                                                                        children: "Borrow"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                        hidden: true,
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                                            name: "money",
                                                                            size: "large"
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().lend),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                            animated: "vertical",
                                                            loading: this.state.lenderLoad,
                                                            size: "medium",
                                                            color: "black",
                                                            onClick: this.redirectToHome,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                    visible: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().xo),
                                                                        children: "Lend"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button.Content, {
                                                                    hidden: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                                                                        name: "money",
                                                                        size: "large"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().notify),
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/static/images/notification.png",
                                                            height: 40,
                                                            width: 40
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().timelineDiv),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().firstTimeline),
                                                onClick: this.onClickNFT,
                                                ref: this.elemNFT,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/coin.png",
                                                        height: 45,
                                                        width: 45
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().nftTitle),
                                                        children: [
                                                            "NFT Collection",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.mintedArrays.length
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().secondTimeline),
                                                onClick: this.onClickClaim,
                                                ref: this.elemClaim,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/lendn.png",
                                                        height: 35,
                                                        width: 35
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().clmTitle),
                                                        children: [
                                                            "Claims Catalogue",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.counter
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline1)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().thirdTimeline),
                                                onClick: this.onClickDebt,
                                                ref: this.elemDebt,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: "/static/images/beggar.png",
                                                        height: 35,
                                                        width: 35
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().dbTitle),
                                                        children: [
                                                            "Debts Catalogue",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().miniSp),
                                                                children: this.props.debtsCounter
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().underline2)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().belowHr)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().nftContent),
                                                children: this.props.mintedArrays.map((value, index)=>{
                                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: value,
                                                        width: 290,
                                                        height: 320,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().picha)
                                                    }, index);
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().claimContent),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table, {
                                                        fixed: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Header, {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Contract Address"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Lender"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Borrower"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Amount Lendered"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Return Amount"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Issued On"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Due Date"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Assets"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Body, {
                                                                children: this.state.claims.map((value, index)=>{
                                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["CA"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["lender"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["borrower"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["deni"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"])
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["issuedAt"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deadline"]
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: [
                                                                                    value["collateralAssets"].length,
                                                                                    " Assets ",
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                        href: "#",
                                                                                        onClick: this.showClaim,
                                                                                        target: value["deniDetail"]["borrower"],
                                                                                        name: value["CA"],
                                                                                        title: value["collateralAssets"],
                                                                                        children: "View"
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }, index);
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        ref: this.claimLoading,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().cLoading),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Dimmer, {
                                                                    active: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Loader, {
                                                                        inverted: true,
                                                                        content: "Loading"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {
                                                                    src: "https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().debtContent),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table, {
                                                        fixed: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Header, {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Contract Address"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Lender"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Borrower"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Amount Lendered"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Return Amount"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Issued On"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Due Date"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Assets"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.HeaderCell, {
                                                                            children: "Action"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Body, {
                                                                children: this.state.debts.map((value, index)=>{
                                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Row, {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["CA"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["lender"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["borrower"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deniDetail"]["deni"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"])
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["issuedAt"]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: value["deadline"]
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: [
                                                                                    value["collateralAssets"].length,
                                                                                    " Assets ",
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                        href: "#",
                                                                                        onClick: this.showDebt,
                                                                                        target: value["deniDetail"]["borrower"],
                                                                                        name: value["CA"],
                                                                                        title: value["collateralAssets"],
                                                                                        children: "View"
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table.Cell, {
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                                                    color: "teal",
                                                                                    loading: this.state.payback,
                                                                                    content: "Payback",
                                                                                    value: parseFloat(value["deniDetail"]["deni"] * 0.05) + parseFloat(value["deniDetail"]["deni"]),
                                                                                    name: value["CA"],
                                                                                    title: value["2"],
                                                                                    onClick: this.onPayback
                                                                                })
                                                                            })
                                                                        ]
                                                                    }, index);
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        ref: this.debtLoading,
                                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().cLoading),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Segment, {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Dimmer, {
                                                                    active: true,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Loader, {
                                                                        inverted: true,
                                                                        content: "Loading"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {
                                                                    src: "https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().prv),
                                ref: this.toPopUp,
                                children: [
                                    " ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().closeBtn1),
                                        ref: this.closeBtn,
                                        onClick: this.onRemove,
                                        children: "\xd7"
                                    }),
                                    this.state.claimAssets.map((value, key)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: value,
                                            width: 800,
                                            height: 800,
                                            wrapped: true,
                                            ui: true,
                                            className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().ig)
                                        }, key);
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().debtsPrev),
                                ref: this.debtPrv,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().closeBtn2),
                                        ref: this.closeBtn1,
                                        onClick: this.onRemove1,
                                        children: "\xd7"
                                    }),
                                    this.state.debtAssets.map((value, key)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: value,
                                            width: 800,
                                            height: 800,
                                            wrapped: true,
                                            ui: true,
                                            className: (_static_css_show_profile_module_css__WEBPACK_IMPORTED_MODULE_9___default().ig)
                                        }, key);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileComponent);


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

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [686,675,837,697,424], () => (__webpack_exec__(7367)));
module.exports = __webpack_exports__;

})();