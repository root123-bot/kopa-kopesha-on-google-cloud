import React, { Component } from "react";
import NavBar from '../components/navBar';
import styles from '../static/css/show_profile.module.css';
import { Button, Icon, Table, Header, Segment, Rating, Loader, Dimmer, Image } from 'semantic-ui-react';
import {Link} from '../routes';
import moment from "moment";
import factory from "../Ethereum/factory.js"
import Mkopo from '../Ethereum/mkopo';
import web3 from "../Ethereum/web3";
import { Router } from "../routes";
import mkopo from "../Ethereum/mkopo";

class ProfileComponent extends Component {

    state = {
        claims: [],
        debts: [],
        payback: false,
        claimAssets: [],
        debtAssets: [],
        lenderLoad: false
    }
    
    constructor(props) {
        super(props);
        this.elemNFT = React.createRef();
        this.elemClaim = React.createRef();
        this.elemDebt = React.createRef();
        this.toPopUp = React.createRef();
        this.toDemish = React.createRef();
        this.debtPrv = React.createRef();
        this.closeBtn = React.createRef();
        this.closeBtn1 = React.createRef();
        this.claimLoading = React.createRef();
        this.debtLoading = React.createRef();
    }

    
    static async getInitialProps(props) {
        const {address} = props.query;
        const deployedContractAddress = await factory.methods.getDeployedMikopo().call()

        let managers = new Array();
        let comparisonList = new Array()
        let desiredContractAddress;
        for (let i = 0; i < deployedContractAddress.length; i++) {
            const mkopo = await Mkopo(deployedContractAddress[i]);
            let manager = await mkopo.methods.owner().call();
            managers.push(manager);
            comparisonList.push(manager.toLowerCase());

            if (manager.toLowerCase() == address) {
                desiredContractAddress = deployedContractAddress[i];
                console.log(desiredContractAddress);
            }
            // Au zingefanyika humu ndani kwa pamoja zilete hizo assets which is found in 
            // other contract... Ngoja naweza nikaweka logic humu kama mambo yatakua sio..
        }

        console.log('This is desired contract address' + desiredContractAddress)
        // Hapa nahisi hii condition imekaa vibaya... inabid niiweke poa... coz hapa ikipita hata mkopo itashindwa
        // ku-load....
        // After getting the contract address load a new mkopo then from it take the url..
        if (desiredContractAddress != null) { // then this man has already deployed the contract..
            let loadedMkopo = await Mkopo(desiredContractAddress);
            let mintedNfts = await loadedMkopo.methods.getNFTIndexes().call();
            // mintednfts inaacha 0 kama ulifuta element.. na ndo kilichofanyika 
            console.log(mintedNfts)

            // Hapa condition ni kwamba hata ambaye hajadeploy contract anaweza akadai.... Vilevile hata alie-deploy pia anaweza akadai..
            // Ila hapa pia mtu anaweza akawa na nfts ambazo hajazimint yeye bali kamint mwingne coz alishindwa kulipa deni....
            let metadataList = []
            let imageUrlSrc = []
            for (let z = 0; z < mintedNfts.length; z++) {
                if (mintedNfts[z] == 0) {
                    console.log('This nft asset has been jacked!');
                    continue;
                }
                else {
                    let closedOrNot = await loadedMkopo.methods.closedAssets(mintedNfts[z]).call();
                    console.log('This is status of given assets either its closed or not!');
                    console.log(closedOrNot)
                    console.log('End of checking status of the asset');
                   
                    let meta = await loadedMkopo.methods.nftData(mintedNfts[z], address).call();
                    metadataList.push(meta);

                   
                
                }

            
            }

        
            
            for (let p = 0; p < metadataList.length; p++) {
                let response = await fetch(metadataList[p]);

                if (!response.ok) {
                    console.log('Problem with this url');
                }

                else {
                    let data = await response.json();
                    let imageSrc = data.image;
                    imageUrlSrc.push(imageSrc);

                  
                }
            }

            // Nahisi hapa ndo ni sehemu nzuri ya ku-add logic endapo user ana contract ila nft zake zipo
            // kwenye contract nyingne..... Hapa coz nina contract ambayo imekua deployeed na huyu jamaa
            // then itakua rahisi kuitoa na kucheck kwenye contract zingne... Let's go
            
            for (let n = 0; n < deployedContractAddress.length; n++) {
                if ((deployedContractAddress[n]).toLowerCase() == desiredContractAddress.toLowerCase()) {
                    // this is contract of this user achana nayo
                    console.log('This is the contract by this user');
                    continue;
                }
                else {
                    const loan = await Mkopo(deployedContractAddress[n]);
                    // From it you should get jackedNfts
                    let jacked = await loan.methods.getJackedNftIndex().call();
                    // Sasa hapa from this jacked array you should test one after another for this address
                    for (let k = 0; k < jacked.length; k++) {
                        let metada = await loan.methods.nftData(jacked[k], address).call();

                        if (metada === '') {
                            // there is no any jacked nfts jacked by this address
                            console.log('Its not you who jacked nft');
                            continue;
                        }
                        else {
                            // then he is the one who jack nft
                            console.log('Its you who jacked this');
                            let response = await fetch(metada);
                            let dat = await response.json();
                            let imgU = dat.image;
                            imageUrlSrc.push(imgU);
                        }
                    }
                }
            }
            
            // KO LOGIC ZA KUCHECK JACKED NFT inaishia hapa...
           
            console.log('This is metadata ' + imageUrlSrc)
            console.log(imageUrlSrc+ ' this is for me')
            // Hapa inabidi ije condition either also to check if the user has any claims...
            const deployed = await factory.methods.getDeployedMikopo().call();
            let counter = 0;
            let debtsCounter = 0;
            for (let i = 0; i < deployed.length; i++) {
                const mkopo = await Mkopo(deployed[i]);
                const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();

                if (abm_length > 0) {
                    for (let p = 0; p < abm_length; p++) {
                        let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();
                        console.log('Hey please this is for me my friend!')
                        console.log(abm)
                        let lender = abm.lender;
                        let borrower = abm['1']['1']; // Kwani hamna abm yoyote au...
                        console.log('This below is deni contained in abm');
                        console.log(borrower)
                        
                        if (lender.toLowerCase() === address.toLowerCase()  && borrower.toLowerCase() === address.toLowerCase()) {
                            counter++;
                            debtsCounter++;
                        }
                        else if (lender.toLowerCase() === address.toLowerCase()) {
                            counter++;
                        }
                        else if (borrower.toLowerCase() === address.toLowerCase()) {
                            debtsCounter++
                        }
                        else {
                            continue;
                        }
                        

                    }
                }
            }
            console.log(counter, debtsCounter)
            return {
                address: address,
                mintedArrays: imageUrlSrc,
                counter: counter,
                debtsCounter: debtsCounter
            }

         
        }
        else {
            const deployed = await factory.methods.getDeployedMikopo().call();
            let desiredABM = [];
            let imgList = [];
            let counter = 0  // Hapa nahisi hii conter ni number of claims counted..... all these logics is for retrieving number of claims by this user...
            for (let i = 0; i < deployed.length; i++) {
                const mkopo = await Mkopo(deployed[i]);
                const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();
                
                if (abm_length > 0) {
                    for (let p = 0; p < abm_length; p++) {
                        let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();
                        let lender = abm.lender;
                        
                        if (lender.toLowerCase() === address.toLowerCase()) {
                            //  I need to count these things if the lender is of this address..
                            counter++;
                        }
                        else {
                            continue;
                        }
                    }
                }

                // Here for each contract access all minted asset index
                let mintedAssets = await mkopo.methods.getNFTIndexes().call();
                console.log('This is mintedAsset ' + mintedAssets);

                
                let metaList = [];
                console.log('This is mintedAsset length');
                console.log(mintedAssets.length)
                console.log(mintedAssets[0]);
                // Jua huyu jamaa hajamint na tushasema data muhimu kama mtu alishindwa kulipa zinakuwa stored
                // in jackedNftIndex
                let jackedNft = await mkopo.methods.getJackedNftIndex().call();
                console.log('This are jacked nft');
                console.log(jackedNft);
                for (let z = 0; z < jackedNft.length; z++) {
                    // Mpaka jacked length imezidi 0 ujue kuna vitu...
                    let metad = await mkopo.methods.nftData(jackedNft[z], address).call();
                    console.log(metad);

                    if (metad === "") {
                        console.log('Huna chako');
                        continue;
                    }
                    else {
                        let response = await fetch(metad);
                        let data = await response.json();
                        let imgUrl = data.image;
                        imgList.push(imgUrl);
                    }
                    
                    
                }
                console.log('This is metaList for this user...');
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
            return {address: address, mintedArrays: imgList, counter: counter, debtsCounter: 0};  // Hii debtsCounter lazima iwe 0 coz huyu mtu hajawai deploy contract...
        }
    }

    redirectToHome = async (e) => {
        await this.setState({lenderLoad: true})
        e.preventDefault();
        console.log('Hello world')
        Router.pushRoute('/');
    }

    onClickNFT = () => {
        // Access claims and debts, make underline disappear and color of text grey.
        let NFTElem = this.elemNFT.current;
        let claimElem = this.elemClaim.current;
        let debtElem = this.elemDebt.current;
        //console.log(claimElem.firstChild.nextSibling)  /*claimElem.innerHTML, ko inner html inafanya kazi hapa*/
        // Nini cha kufanya... Kwanza mtu aki-bonyeza nft inabidi tu-update.. But coz it's default since
        // at start no line displayed in debt and claim..
        let claimSpanElem = claimElem.firstChild.nextSibling 
        claimSpanElem.style.color = '#a1a1a1';
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';
        
        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = '#a1a1a1';
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';

        let nftSpanElem = NFTElem.firstChild.nextSibling;
        nftSpanElem.style.color = 'black'
        nftSpanElem.firstChild.nextSibling.nextSibling.style.display = 'block';

        // Kingine cha kufanya ni ku-make content of other dissappear.
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = 'block'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = 'none'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = 'none'
    }

    // ALAFU INABIDI UJUE KUWA BY DEFAULT USER INPUT TAKEN IN FORM OF STRING SO IF YOU PUT DECIMAL AND GET THAT THEN
    // TRIES TO CONVERT IT INTO INT USING PARSE INT THEN YOU'VE BEEN SCREWED COZ '0.6' IN PARSEINT IS 0.. 12.5 IS 12..
    // THIS IS BECAUSE INT IS NOT FLOAT OR DECIMAL SO IT WILL NOT TAKE THE DECIMAL PLACE PLACED... NI HIVYO TU PASKO 
    // INABIDI UJUE COZ KUNA CONTRACT NILIWEKA 0.5 THEN HUKU NAONA NI 0.
    putEverythingAboutClaimTogether = async () => {
        // we needed to iterate all the contracts address and access the ABM stored then return the
        // array of one having the lender of this address after that you can store them inside the state
        // so as to be iterated....

        // Here at first I should display the loading interface
        
        console.log('This is claim loading for you!')
        console.log(this.claimLoading.current);
        const deployedContractAddresses = await factory.methods.getDeployedMikopo().call();

        let desiredABM = [];
        
        for (let i = 0; i < deployedContractAddresses.length; i++) {
            const mkopo = await Mkopo(deployedContractAddresses[i]);
            // from that mkopo try to access the ABM list.. 
            const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();
            // After getting this tries to iterate through it and access abm
            if (abm_length > 0) {
                console.log('This is abm_length for you ...') // Hapa inaleta 1 ni kweli coz aliekopeshwa mpaka sasa ni mtu mmoja tu....
                console.log(abm_length);
                for (let p = 0; p < abm_length; p++) {
                    // then here check from it push lender to lenders array;
                    let max_mint = await mkopo.methods.maxMint().call();
                    console.log(max_mint)
                    let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();
                    let lender = abm.lender;
                    // Baadae mtu akishalipa kumbuka inabidi tu-delete  the abm so by default it
                    // will be of 0.... if so if we compare this with address it will return false..
                    console.log('This is lender for you!');
                    console.log(lender);

                    // for each you should check if the lender is of this address if so then you 
                    // should save it into desiredABM... But they can be many of them so desiredABM
                    // should be an array to push these claims data..
                    if (lender.toLowerCase() === (this.props.address).toLowerCase()) {
                        // remember we should fetch the collateral assets from mapping using the 
                        // timestamp of the deniDetails saved within the ABM and from that get the 
                        // the array of the collateral asset also we should store the address of the
                        // contract inside this....
                        abm['CA'] = deployedContractAddresses[i];
                        let createdAt = parseInt(abm['1']['4']);
                        // then after that let's access the collateral assets..
                        let collaterals = await mkopo.methods.accessingCollateralAssets(createdAt).call()
                        console.log('This is collateral for you');
                        console.log(collaterals);
                        abm['collateralAssets'] = collaterals;
                        // TO CONVERT MILLISECONDS OF BLOCK.TIMESTAMP ... REMEMBER BLOCK TIMESTAMP IS THE TOTAL SECONDS PASSED SINCE
                        // THE EPOCH... HERE IN OUR CASE BLOCK.TIMESTAMP RETURNS MILLISECONDS SO WE SHOULD FIRST CONVERT THEM INTO 
                        // SECONDS BY MULTIPLYING WITH 1000 THEN CALL date() object to convert it into the date....
                        // For more read this article https://poopcode.com/convert-epoch-timestamp-to-javascript-date/
                        let start = abm['issuedAt'];
                        console.log('This is the start date of abm '+start)
                        let correctStartDate = new Date(start * 1000);
                        start = correctStartDate.toDateString()
                        let accessedDuration = parseInt(abm['1']['duration']);
                        console.log('This is accessed duration ' + accessedDuration)
                        let net = (parseInt(abm['issuedAt']) * 1000) + (parseInt(accessedDuration) * 24 * 60 * 60 * 1000)
                        let date2 = new Date(net);
                        console.log('Below is net and date2');
                        console.log(net, date2)
                        let deadlineString = date2.toDateString();
                        abm['deadline'] = deadlineString;
                        abm['issuedAt'] = start;
                        // Haina haja ya ku-calculate return amount na ku-store it in solidity coz naona even if nimeweka logic zote za ku-add 5% to it as 
                        // return amount kwenye solidity it's remained the same as debt amount... So hii logic ya ku-add na ku-calculate 5% of interest rate 
                        // naia-cha kwenye javascript so javascript will take debt amount and calculate the returned value like we see there in interface on 
                        // claims table in profile that's all I want to tell you today..
                        desiredABM.push(abm);
                    }
                    else {
                        console.log('Im not the lender so continue to another dont add me')
                        continue;
                    }
                }
                // then here we needed to compare these addresses

           
            }
            else {
                continue;
            }
            console.log('This is abms to use as claims for you');
            console.log(desiredABM);
            await this.setState({
                claims: desiredABM
            })

        }
    }

    onClickClaim = async () => {
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


        let NFTSpanElem = NFTElem.firstChild.nextSibling 
        NFTSpanElem.style.color = '#a1a1a1';
        NFTSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';
        
        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = '#a1a1a1';
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';


        let claimSpanElem = claimElem.firstChild.nextSibling;
        claimSpanElem.style.color = 'black'
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = 'block';

        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = 'none'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = 'block'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = 'none'
        await this.putEverythingAboutClaimTogether();
        this.claimLoading.current.style.display = 'none';



    }

    putEverythingAboutDebtTogether = async () => {
        const deployedContractAddresses  = await factory.methods.getDeployedMikopo().call();
        let desiredABM = []

        for (let i = 0; i < deployedContractAddresses.length; i++) {
            const mkopo = await Mkopo(deployedContractAddresses[i]);
            const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();

            if (abm_length > 0) {
                console.log('This is abm_length for you');
                console.log(abm_length);
                for (let p = 0; p < abm_length; p++) {
                    let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();
                    console.log('Hey this is abm for you');
                    console.log(abm)
                    let borrower = abm['1']['1'];
                    console.log('This is borrower for you!');
                    console.log(borrower)

                    if (borrower.toLowerCase() === (this.props.address).toLowerCase()) {
                        // Kama ni abm ileile CA itakua nayo but kama user ataanza ku-click claimsCatalogue kwanza... But here we should set it
                        abm['CA'] = deployedContractAddresses[i];
                        let createdAt = parseInt(abm['1']['4']);

                        let collateral = await mkopo.methods.accessingCollateralAssets(createdAt).call();
                        console.log('This is collateral for you');
                        console.log(collateral);
                        abm['collateralAssets'] = collateral;

                        let start = abm['issuedAt'];
                        let correctStartDate = new Date(start * 1000);
                        start = correctStartDate.toDateString();
                        let accessedDuration = parseInt(abm['1']['duration']);
                        let net = (parseInt(abm['issuedAt']) * 1000) + (parseInt(accessedDuration) * 24 * 60 * 60 * 1000);
                        let  date2 = new Date(net);
                        let deadlineString = date2.toDateString();
                        abm['deadline'] = deadlineString;
                        abm['issuedAt'] = start;
                        desiredABM.push(abm);
                    }
                    else {
                        console.log('Im not the borrower so continue to another don\'t add me');
                        continue;
                    }
                }
            }
            else {
                continue;
            }
            console.log('This is abm to use as debts for you');
            console.log(desiredABM);
            await this.setState({
                debts: desiredABM
            })
        }
    }

    onClickDebt = async () => {
        // this executed when user click debt.
        let NFTElem = this.elemNFT.current;
        let claimElem = this.elemClaim.current;
        let debtElem = this.elemDebt.current;

        let NFTSpanElem = NFTElem.firstChild.nextSibling 
        NFTSpanElem.style.color = '#a1a1a1';
        NFTSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';
        
        let claimSpanElem = claimElem.firstChild.nextSibling 
        claimSpanElem.style.color = '#a1a1a1';
        claimSpanElem.firstChild.nextSibling.nextSibling.style.display = 'none';
        

        let debtSpanElem = debtElem.firstChild.nextSibling;
        debtSpanElem.style.color = 'black'
        debtSpanElem.firstChild.nextSibling.nextSibling.style.display = 'block';

        NFTElem.parentNode.nextSibling.firstChild.nextSibling.style.display = 'none'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.style.display = 'none'
        NFTElem.parentNode.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.style.display = 'block'
   
        await this.putEverythingAboutDebtTogether();
        this.debtLoading.current.style.display = 'none';

    }


    onPayback = async (e) => {
        await this.setState({
            payback: true
        })
        // Remember solidity payback method need us to pass the ABM... But how we can detect this abm... On button we should pass
        // abm timestamp then contract address of containing that abm, load that contract then from abm list iterate through all abms
        // to get one with our needed timestamp... After  that everything is good... But mbona unashangaa coz ume-edit abm timestamp 
        // iende kwenye tarehe za kisasa in 'issuedAt' key don't worry we have altenative index of string of integer which store this
        // timestamp of issuedAt instead of 'issuedAt' key we can use this index and  then here we go..
        // so in this target of event in this button we should bind CA and issueAt in form of milliseconds...
        console.log(e.target.name, e.target.value, e.target.title);
        let targetABM;
        const mkopo = await Mkopo(e.target.name);
        const accounts = await web3.eth.getAccounts();
        const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();
        const amountInWei = await web3.utils.toWei((e.target.value), 'ether');

        for (let i = 0; i < abm_length; i++) {
            let givenABM = await mkopo.methods.ListOfAfterBorrowingMoney(i).call();
            if (parseInt(e.target.title) === parseInt(givenABM['2'])) {
                targetABM = givenABM;   // there is no way two ABM having the same timestamp... take this in ur head timestamp is milliseconds... no way...
            }
        }
        console.log(amountInWei)
        
        await mkopo.methods.doPayback(targetABM).send({
            from: accounts[0],
            value: amountInWei
        });
        console.log(targetABM);
        Router.pushRoute('/');
        await this.setState({
            payback: false
        })
    }

    showClaim = async (e) => {
        // This needed to be executed for user to view an image of claims... To achieve that we should
        // pass collateral assets inside the clicked link... Also we need the contract address to retrieve these
        // asset metadata url
        e.preventDefault();
        console.log(e.target.name, e.target.title, e.target.target);
        let goodArray = (e.target.title).split(',');
        console.log(goodArray);
        const contract = await Mkopo(e.target.name);
        let imgUrls = [];
        let metadataUrls = [];
        
        for (let i = 0; i < goodArray.length; i++) {
            let metaUrl = await contract.methods.nftData(parseInt(goodArray[i]), (e.target.target)).call();
            metadataUrls.push(metaUrl);
        }
        console.log(metadataUrls);
        for(let p = 0; p < metadataUrls.length; p++) {
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
        this.toDemish.current.style.display = 'none';
        this.toPopUp.current.style.display = 'block';
    }

    onRemove = () => {
        this.toPopUp.current.style.display = 'none';
        this.toDemish.current.style.display = 'block';
    }

    showDebt = async(e) => {
        e.preventDefault();
        console.log(e.target.name, e.target.title, e.target.target);
        let goodArray = (e.target.title).split(',');
        console.log(goodArray);
        const contract = await Mkopo(e.target.name);
        let imgUrls = [];
        let metadataUrls = [];
        
        for (let i = 0; i < goodArray.length; i++) {
            let metaUrl = await contract.methods.nftData(parseInt(goodArray[i]), (e.target.target)).call();
            metadataUrls.push(metaUrl);
        }
        console.log(metadataUrls);
        for(let p = 0; p < metadataUrls.length; p++) {
            let response = await fetch(metadataUrls[p]);
            let data = await response.json();
            let imgSrc = data.image;
            imgUrls.push(imgSrc);
        }
        console.log(imgUrls);
        await this.setState({
            debtAssets: imgUrls
        });


        this.toDemish.current.style.display = 'none';
        this.debtPrv.current.style.display = 'block';
    }

    onRemove1 = () => {
        this.toDemish.current.style.display = 'block';
        this.debtPrv.current.style.display = 'none';
    } 

    render() {

        if ((this.props.mintedArrays).length == 0) {

            return (
                <div>
                    <NavBar />
                    <section className={styles.proStyle}>
                        <div ref={this.toDemish}>
                            <div className={styles.profileDiv}>
                                <img src='/static/images/3.jpg' height={220} width={230} className = {styles.profile} />
                                <p className={styles.anuani} >{this.props.address}</p>
                                <span className={styles.assets}>Total assets(NFTs): <span className={styles.numb}>{(this.props.mintedArrays).length}</span></span>
                                <span className={styles.assets1}>Number of Debts: <span className={styles.numb}>{this.props.debtsCounter}</span></span>
                                <span className={styles.assets2}>Number of Claims: <span className={styles.numb}>{this.props.counter}</span></span>
                                <div className={styles.buttonWrappers}>
                                    <div>
                                        <Link route={`/profile/${this.props.address}/borrow`}>
                                            <Button animated='vertical' primary size="medium">
                                                <Button.Content visible>Borrow</Button.Content>  
                                                <Button.Content hidden>
                                                    <Icon name='money' size="large"/>    
                                                </Button.Content>  
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className={styles.lend}>
                                            <Button animated='vertical' loading={this.state.lenderLoad} size="medium" color="black" onClick={this.redirectToHome}>
                                                <Button.Content visible><span className={styles.xo}>Lend</span></Button.Content>  
                                                <Button.Content hidden>
                                                    <Icon name='money' size="large"/>    
                                                </Button.Content>  
                                            </Button>
                                    </div>
                                    <div className={styles.notify}>
                                        <img src="/static/images/notification.png" height={40} width={40} />    
                                    </div>
                                </div>
                            </div>
                            {/*<hr className={styles.hl} />*/}
                            <div className={styles.timelineDiv}>
                                    <div className={styles.firstTimeline} onClick = {this.onClickNFT} ref = {this.elemNFT}>
                                        <img src="/static/images/coin.png" height={45} width={45} />
                                        <span className={styles.nftTitle}>NFT Collection<span className={styles.miniSp}>{(this.props.mintedArrays).length}</span><div className={styles.underline}></div></span>
                                    </div>
                                    <div className={styles.secondTimeline} onClick= {this.onClickClaim} ref={this.elemClaim}>
                                        <img src="/static/images/lendn.png" height={35} width={35} />
                                        <span className={styles.clmTitle}>Claims Catalogue<span className={styles.miniSp}>{this.props.counter}</span><div className={styles.underline1}></div></span>
                                    </div>
                                        <div className={styles.thirdTimeline} onClick={this.onClickDebt} ref={this.elemDebt}>
                                        <img src='/static/images/beggar.png' height={35} width={35} />
                                    <span className={styles.dbTitle}>Debts Catalogue<span className={styles.miniSp}>{this.props.debtsCounter}</span><div className={styles.underline2}></div></span>
                                    </div>
                            </div>
                            <div>
                                <hr className={styles.belowHr}/>
                                
                                <div className={styles.nftContent}>

                                        {(this.props.mintedArrays).map((value, index) => {
                                            return (
                                                <img key={index} src={value} width={290} height={320} className={styles.picha} />

                                                
                                            )
                                        })}    
                                    
                                </div>
                                <div className={styles.claimContent}>
                    
                                <Table fixed>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Contract Address</Table.HeaderCell>
                                        <Table.HeaderCell>Lender</Table.HeaderCell>
                                        <Table.HeaderCell>Borrower</Table.HeaderCell>
                                        <Table.HeaderCell>Amount Lendered</Table.HeaderCell>
                                        <Table.HeaderCell>Return Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Issued On</Table.HeaderCell>
                                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                                        <Table.HeaderCell>Assets</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                           
                                    {(this.state.claims).map((value, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{value['CA']}</Table.Cell>
                                                <Table.Cell>{value['lender']}</Table.Cell>
                                                <Table.Cell>{value['deniDetail']['borrower']}</Table.Cell>
                                                <Table.Cell>{value['deniDetail']['deni']}</Table.Cell>
                                                <Table.Cell>{parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])}</Table.Cell>
                                                <Table.Cell>{value['issuedAt']}</Table.Cell>
                                                <Table.Cell>{value['deadline']}</Table.Cell>
                                                <Table.Cell>
                                                    {(value['collateralAssets'].length)} Assets <br />
                                                    <a href="#" onClick = {this.showClaim} target={value['deniDetail']['borrower']} name={value['CA']} title={value['collateralAssets']}>View</a>
                                                </Table.Cell>


                                            </Table.Row>
                                        )
                                    })}
                                    </Table.Body>
                                    
                                </Table>
                                <div ref={this.claimLoading} className={styles.cLoading}>
                                    <Segment>
                                        <Dimmer active >
                                            <Loader content='Loading' />
                                        </Dimmer>

                                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                    </Segment>
                                </div>
                                </div>
                                <div className={styles.debtContent}>
                                <Table fixed>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Contract Address</Table.HeaderCell>
                                        <Table.HeaderCell>Lender</Table.HeaderCell>
                                        <Table.HeaderCell>Borrower</Table.HeaderCell>
                                        <Table.HeaderCell>Amount Lendered</Table.HeaderCell>
                                        <Table.HeaderCell>Return Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Issued On</Table.HeaderCell>
                                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                                        <Table.HeaderCell>Assets</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>

                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {(this.state.debts).map((value, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{value['CA']}</Table.Cell>
                                                    <Table.Cell>{value['lender']}</Table.Cell>
                                                    <Table.Cell>{value['deniDetail']['borrower']}</Table.Cell>
                                                    <Table.Cell>{value['deniDetail']['deni']}</Table.Cell>
                                                    <Table.Cell>{parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])}</Table.Cell>
                                                    <Table.Cell>{value['issuedAt']}</Table.Cell>
                                                    <Table.Cell>{value['deadline']}</Table.Cell>
                                                    <Table.Cell>
                                                        {(value['collateralAssets'].length)} Assets <br />
                                                        <a href='#' onClick={this.showDebt} target={value['deniDetail']['borrower']} name={value['CA']} title={value['collateralAssets']}>View</a>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button color="teal" loading={this.state.payback} content='Payback' value={parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])} name={value['CA']} title={value['2']} onClick={this.onPayback} />
                                                    </Table.Cell>

                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table> 
                                
                                <div ref={this.debtLoading} className={styles.cLoading}>
                                    <Segment>
                                        <Dimmer active>
                                            <Loader inverted content='Loading' />
                                        </Dimmer>

                                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                    </Segment>
                                </div>

                                </div>
                            </div>
                           
                        </div>
                        <div className={styles.prv} ref={this.toPopUp}> {/* this div will be displayed to preview claims/only claims nfts...*/}
                            <div className={styles.closeBtn1} ref={this.closeBtn} onClick={this.onRemove}>&times;</div>     
                            {(this.state.claimAssets).map((value, key) => {
                                return (
                                    <img key = {key} src = {value} width={800} height={800} wrapped ui={true} className={styles.ig} />
                                )
                            })}
                        </div> 

                        <div className={styles.debtsPrev} ref={this.debtPrv}>
                            <div className={styles.closeBtn2} ref={this.closeBtn1} onClick={this.onRemove1}>&times;</div>     
                            {(this.state.debtAssets).map((value, key) => {
                                return (
                                    <img key = {key} src = {value} width={800} height={800} wrapped ui={true} className={styles.ig} />
                                )
                            })}
                        </div>
                    </section>
                    
                </div>
            )
        }
        else {

            return (
                <div>
                    <NavBar />
                    <section className={styles.proStyle}>
                        <div ref={this.toDemish}>
                            <div className={styles.profileDiv}>
                                <img src='/static/images/3.jpg' height={220} width={230} className = {styles.profile} />
                                <p className={styles.anuani} >{this.props.address}</p>
                                <span className={styles.assets}>Total assets(NFTs): <span className={styles.numb}>{(this.props.mintedArrays).length}</span></span>
                                <span className={styles.assets1}>Number of Debts: <span className={styles.numb}>{this.props.debtsCounter}</span></span>
                                <span className={styles.assets2}>Number of Claims: <span className={styles.numb}>{this.props.counter}</span></span>
                                <div className={styles.buttonWrappers}>
                                    <div>
                                        <Link route={`/profile/${this.props.address}/borrow`}>
                                            <Button animated='vertical' primary size="medium">
                                                <Button.Content visible>Borrow</Button.Content>  
                                                <Button.Content hidden>
                                                    <Icon name='money' size="large"/>    
                                                </Button.Content>  
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className={styles.lend}>
                                        <Button animated='vertical' loading={this.state.lenderLoad} size="medium" color="black" onClick={this.redirectToHome}>
                                            <Button.Content visible><span className={styles.xo}>Lend</span></Button.Content>  
                                            <Button.Content hidden>
                                                <Icon name='money' size="large"/>    
                                            </Button.Content>  
                                        </Button>
                                    </div>
                                    <div className={styles.notify}>
                                        <img src="/static/images/notification.png" height={40} width={40} />    
                                    </div>
                                </div>
                            </div>
                            {/*<hr className={styles.hl} />*/}
                            <div className={styles.timelineDiv}>
                                    <div className={styles.firstTimeline} onClick = {this.onClickNFT} ref = {this.elemNFT}>
                                        <img src="/static/images/coin.png" height={45} width={45} />
                                        <span className={styles.nftTitle}>NFT Collection<span className={styles.miniSp}>{(this.props.mintedArrays).length}</span><div className={styles.underline}></div></span>
                                    </div>
                                    <div className={styles.secondTimeline} onClick= {this.onClickClaim} ref={this.elemClaim}>
                                        <img src="/static/images/lendn.png" height={35} width={35} />
                                        <span className={styles.clmTitle}>Claims Catalogue<span className={styles.miniSp}>{this.props.counter}</span><div className={styles.underline1}></div></span>
                                    </div>
                                        <div className={styles.thirdTimeline} onClick={this.onClickDebt} ref={this.elemDebt}>
                                        <img src='/static/images/beggar.png' height={35} width={35} />
                                    <span className={styles.dbTitle}>Debts Catalogue<span className={styles.miniSp}>{this.props.debtsCounter}</span><div className={styles.underline2}></div></span>
                                    </div>
                            </div>
                            <div>
                                <hr className={styles.belowHr}/>
                                
                                <div className={styles.nftContent}>

                                        {(this.props.mintedArrays).map((value, index) => {
                                            return (
                                                <img key={index} src={value} width={290} height={320} className={styles.picha} />

                                                
                                            )
                                        })} 
                                    

                                    
                                </div>
                                <div className={styles.claimContent}>


                                <Table fixed>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Contract Address</Table.HeaderCell>
                                        <Table.HeaderCell>Lender</Table.HeaderCell>
                                        <Table.HeaderCell>Borrower</Table.HeaderCell>
                                        <Table.HeaderCell>Amount Lendered</Table.HeaderCell>
                                        <Table.HeaderCell>Return Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Issued On</Table.HeaderCell>
                                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                                        <Table.HeaderCell>Assets</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                 
                                    {(this.state.claims).map((value, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{value['CA']}</Table.Cell>
                                                <Table.Cell>{value['lender']}</Table.Cell>
                                                <Table.Cell>{value['deniDetail']['borrower']}</Table.Cell>
                                                <Table.Cell>{value['deniDetail']['deni']}</Table.Cell>
                                                <Table.Cell>{parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])}</Table.Cell>
                                                <Table.Cell>{value['issuedAt']}</Table.Cell>
                                                <Table.Cell>{value['deadline']}</Table.Cell>
                                                <Table.Cell>
                                                    {(value['collateralAssets']).length} Assets <br />
                                                    <a href="#" onClick = {this.showClaim} target={value['deniDetail']['borrower']} name={value['CA']} title={value['collateralAssets']}>View</a>
                                                    
                                                </Table.Cell>


                                            </Table.Row>
                                        )
                                    })}
                                    </Table.Body>

                                    
                                </Table>
                                <div ref={this.claimLoading} className={styles.cLoading}>
                                    <Segment>
                                        <Dimmer active>
                                            <Loader inverted content='Loading' />
                                        </Dimmer>

                                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                    </Segment>
                                </div>
                                </div>
                                <div className={styles.debtContent}>
                                <Table fixed>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Contract Address</Table.HeaderCell>
                                        <Table.HeaderCell>Lender</Table.HeaderCell>
                                        <Table.HeaderCell>Borrower</Table.HeaderCell>
                                        <Table.HeaderCell>Amount Lendered</Table.HeaderCell>
                                        <Table.HeaderCell>Return Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Issued On</Table.HeaderCell>
                                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                                        <Table.HeaderCell>Assets</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>

                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>

                                    
                                        {(this.state.debts).map((value, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{value['CA']}</Table.Cell>
                                                    <Table.Cell>{value['lender']}</Table.Cell>
                                                    <Table.Cell>{value['deniDetail']['borrower']}</Table.Cell>
                                                    <Table.Cell>{value['deniDetail']['deni']}</Table.Cell>
                                                    <Table.Cell>{parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])}</Table.Cell>
                                                    <Table.Cell>{value['issuedAt']}</Table.Cell>
                                                    <Table.Cell>{value['deadline']}</Table.Cell>
                                                    <Table.Cell>
                                                        {(value['collateralAssets'].length)} Assets <br />
                                                        <a href='#' onClick={this.showDebt} target={value['deniDetail']['borrower']} name={value['CA']} title={value['collateralAssets']}>View</a>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button color="teal" loading={this.state.payback} content='Payback' value={parseFloat(value['deniDetail']['deni']*0.05) + parseFloat(value['deniDetail']['deni'])} name={value['CA']} title={value['2']} onClick={this.onPayback} />
                                                    </Table.Cell>

                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table> 
                                
                                <div ref={this.debtLoading} className={styles.cLoading}>
                                    <Segment>
                                        <Dimmer active>
                                            <Loader inverted content='Loading' />
                                        </Dimmer>

                                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                    </Segment>
                                </div>

                                </div>
                            </div>
                         
                        </div>
                        <div className={styles.prv} ref={this.toPopUp}> {/* This div will be executed or displayed to preview image.... */}
                            <div className={styles.closeBtn1} ref={this.closeBtn} onClick={this.onRemove}>&times;</div>     
                            {(this.state.claimAssets).map((value, key) => {
                                return (
                                    <img key = {key} src = {value} width={800} height={800} wrapped ui={true} className={styles.ig} />
                                )  
                            })}                            
                        </div>

                        <div className = {styles.debtsPrev} ref={this.debtPrv}>
                            <div className={styles.closeBtn2} ref={this.closeBtn1} onClick={this.onRemove1}>&times;</div>     
                            {(this.state.debtAssets).map((value, key) => {
                                return (
                                    <img key = {key} src = {value} width={800} height={800} wrapped ui={true} className={styles.ig} />
                                )
                            })}
                        </div>
                    </section>
                    
                </div>
            )
        }
    }
}
export default ProfileComponent;