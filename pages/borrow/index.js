import React, { Component, useState } from "react";
import styles from '../../static/css/borrow.module.css';
import NavBar from "../../components/navBar";
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import factory from '../../Ethereum/factory.js';
import Mkopo from '../../Ethereum/mkopo';
import web3 from '../../Ethereum/web3';
const assert = require('assert');
import { Router } from '../../routes';


class BorrowComponent extends Component {

    state = {
        nameOfNFT : '', // this is the name used when user create a new instance of the contract.
        jsonUrl: '',
        loading: false,
        loading1: false,   
        alreadyContainedAddress: '',
        errorMessage: '',
        alreadyContainedAddress1: '',
        alreadyAddedAssets: [{'tokenId' :0, 'dataUrl': "dummy"}],
        previewInitialMessage: 'ZERO ASSETS ADDED.',
        init : 1,
        urlObj: [],
        idsObj: [],
        updateIdsObj: [],
        updateUrlObj: [],
        imHoldingUrlForLoadToNotUploadedYet: [],
        imHoldingIdsForLoadToNotUploadedYet: [],
        // I should have three states which holds corrent format of ids stored in tokenId
        // of alreadyAddedAssets, also I should have the props which store the metadata url
        // of assets which has been already minted but not added... also I should have the 
        // state which holds the src of Image of the image which has not yet loaded... this 
        // is how we will achieve loading image...
        pureLoadingCountIds: [],  // this will store elements of array of pureCountIds..   here is where tokenId stored...
        pureLoadingCountUrls: [],   // this will store element in array of pureCountUrls...  here is where metadata url stored...
        pureLoadingCleanUrlWithImage: [],
        /// This is form input.....
        amountToBorrow: 0,
        durationToPayback: 0,
        collateralAssets: [],
        bigBenzLoading: false
    }   


    constructor(props) {
        super(props);
        this.addElem = React.createRef();
        this.popElem = React.createRef();
        this.popElem1 = React.createRef();
        this.closeBtn = React.createRef();
        this.toHide = React.createRef();
        this.errorBlock = React.createRef(); // Hapa hamna previewWrapper obj
        this.previewWrapper = React.createRef();
        this.previewWrapper1 = React.createRef();
        this.loadContainer = React.createRef();
        this.closeButton = React.createRef();
        this.loadContainer1 =React.createRef();
    }

    static async getInitialProps(props) {
        const {address} = props.query;
        return {address: address}
    };    // Hii ndo inasumbua mda mwingi inaniambia haijawa setted even if mpaka nirudie process



    finishHim = async () => {
        this.setState({
            bigBenzLoading: true
        })
        // We should access amount, duration to payback and collateral assets...... collateral assets ids 
        // get sored stored inside this.props.idsObj... but remember these ids stored here is greater than 1 
        // to  those foundin solidity..
        console.log(this.state.amountToBorrow, this.state.durationToPayback, this.state.idsObj);
        console.log(this.state.alreadyContainedAddress, this.state.alreadyContainedAddress1);
        let ind = this.state.idsObj;
        let correctCollateralAssets = ind.map((value) => (parseInt(value) - 1));
        let amount = this.state.amountToBorrow;
        // PIA NAHISI SOLIDITY STORE BALANCE IN STRING.... SO YOU SHOULD PARSE IT FROM INT TO STR
        let amountInWei = await web3.utils.toWei((amount).toString(), 'ether');
        console.log('This is the amount in wei' + amountInWei)
        let duration = this.state.durationToPayback;
        // But remember duration is in form of days so you should convert them into the miliseconds...
        // lakini naona sio case labda hapa cha kuzingatia ni amount coz here we store the amount in 
        // ether but remember in solidity we have 'wei'...
        console.log(correctCollateralAssets)
        console.log('I should convert this in the correct format of the nftToken stored inside the solidity since this one is greater than 1')
    
        // to save this value to solidity what should we do....
        const myMkopo = await Mkopo(this.state.alreadyContainedAddress);
        console.log(this.props.address);
        console.log(myMkopo)
        console.log('In solidity we expect amount in wei to be integer and duration to be integer')
        console.log(typeof amountInWei)
        console.log(typeof duration)
        console.log(typeof correctCollateralAssets);
        console.log(correctCollateralAssets);
        let amountCorrectFormat = parseInt(amount)
        let durationInt = parseInt(duration)
        console.log((typeof amountCorrectFormat), (typeof durationInt));
        console.log(amountCorrectFormat, durationInt)
        
        
        const nakopaPromise = await myMkopo.methods.nakopa(amountCorrectFormat, durationInt, correctCollateralAssets).send({
            from: this.props.address
        });
        // Kaka ku-store struct it needs amount of 0.08888.... ether mbona bei hivi .... But we should achieve this shit.... Nahisi nitasend kesho.... Afu leo usiku jaribu ku
        // figure out on how you access Structs ok DeniDetails for you to return it in home ..... You should do that if you want Shem to be Excited...
        
        // SO WHAT DO WE NEEDED TO DO HERE IS TO ACCESS THE LATEST CREATED DATABASE AND FROM IT GET THE TIME-STAMP THEN FROM IT AGAIN CREATE  A DJANGO TABLE WHICH STORE THIS 
        // TIMESTAMP AND COLLATERAL ASSETS... SO TO DISPLAY THESE IMAGES WE NEED THIS INDEXES.... BUT MBONA HIYO IMEKAA KAMA CENTRALIZED PASKO SO WHAT IT SOMEONE HAS HACKED 
        // THAT DJANGO SERVER.... OK WHAT WE'LL LOST IS REPRESENTATION OF THESE IMAGES IN THE INTERFACE... BUT PASKO WHY DON'T YOU CREATE A MAPPING IN SOLIDITY WHICH STORE 
        // THESE TIMESTAMP AND ARRAY OF THESE COLLATERAL ASSETS SO AS TO DISPLAY THEM TO THE USER YOU CAN USE IT'S TIMESTAMP TO ACCESS THE COLLATERAL ASSETS... MMMH IM NOT 
        // SURE IF THE MAPPING CAN YIELD A FULL ARRAY WITHOUT NEED YOU TO PASS INDEX BUT LET'S PROVE THIS LOGIC IN REMIX IF THERE IS SUCH WAY...

        // OK NIMETEST KWENYE SOLIDITY IMEKUBALI THEN THERE IS NO NEED TO STORE DATA INSIDE THE DJANGO COZ KWELI KWA ISHU YA SECURITY INGETUSUMBUA SO UMEFANYA VIZURI PASKO..
        // THEN HOW TO GET THIS LAST CREATED BLOCK.. FIRST YOU SHOULD LOAD THE CONTRACT AND THEN TRY TO ACCESS THE LIST OF ADDED DENIDETAILS IN ARRAY THEN GRAB THE LAST ONE 
        // THEN ACCESS ITS TIMESTAMP... THIS IS ONLY WAY TO ACHIEVE THAT...
        const mkopo = await Mkopo(this.state.alreadyContainedAddress);
        let lengthOfListOfDeniDetails = await mkopo.methods.lengthOfDeniDetailsRequest().call();
        let lastIndex = lengthOfListOfDeniDetails - 1;
        console.log('This is the index of last added deniDetails ' + lastIndex);
        // After that let's try accessing the struct by this array
        let desiredStruct = await mkopo.methods.deniDetailsList(lastIndex).call();
        // Then after accessing this struct try to access from it the madeAt attribute....
        let createdAt = desiredStruct.madeAt
        console.log(createdAt + ' This is the timestamp that we want, good job guyz');
        // then let's create the mapping... that will store our collateral assets
        const out = await mkopo.methods.createdeniDetailCollateralAssets(createdAt, correctCollateralAssets).send({
            from: this.props.address
        })
        console.log('this is output we get');
        console.log(out)
        // It needs us to send some gas amount ....
        console.log('This is nakopaPromise')
        console.log(nakopaPromise)
    
        
        let lengthOfDeniDetails = await myMkopo.methods.lengthOfDeniDetailsRequest().call();
        console.log('This is then length of DeniDetails '+ lengthOfDeniDetails)  
    
        Router.pushRoute('/');
        // After that I should you should redirect us to the home page using the Link component of the next-routes.....

        
    }

    renderPreviewItems = async (listOfObj) => {
        console.log('Hey lil bitch hoow  are you!');
        
        console.log(listOfObj)
        console.log('above is a element of listOfObj')
        // Sometimes there is duplication of values in listOfObj.... from alreadyAddedAsset array so we should 
        // make sure we filter all of them out
        listOfObj = listOfObj.filter((value, index, self) => index == self.findIndex((t) =>(
            t.tokenId === value.tokenId
        )))
        console.log(listOfObj);
        console.log('Below is updated listOfObj element');

        // This above one is updated listOfObj....

        var tokenIdUrlObj = {};
        let i = this.state.init;  // Sijui kama itachange in calling... again au iwe global in state kama hapa itakataa
        var tokenIdImgUrlObj = {};
        if (listOfObj.length == 1) {
            // this means we still not add any asset
            this.previewWrapper.current.style.display = 'flex';
            console.log('IM inside the if statement this means the user didn\'t add any nft');
        }
        else {
            console.log('Im outside means a user has minted or add nft..')
            var updateIdsObj = this.state.updateIdsObj;
            var updateUrlObj = this.state.updateUrlObj;

            console.log('HEY THIS IS INITIAL STATES OF UPDATESIDS AND UPDATEURL');
            console.log(updateIdsObj, updateUrlObj);
            console.log('Check them when you delete element there.... or add another')
            try {
                // hapa initially after adding image... length should be 2..... 
                // but remember evertime we added new asset then this for loop become
                // repeated again and again... so when We already previewed 2 then again 
                // it comes and do some dance with 2, 3 and so on... But no pasco how about 
                // i++ we already make it 2 so... Ngoja tuone but naona lazima ianze for loop again
                // and come with i=1 again and again.. Ngoja tuone kama itajirudia then
                // hii "i" should be global to function...
                console.log(listOfObj.length);
                console.log('Above is length of alreadyAddedAssets');
                console.log(i + 'This is i for you... initially we set it to start from 1.. naona inashindwa kuingia humu kwenye for loop')
                // Hii i inabidi iwe less than 1... cijui ila na-guess kuna-sehemu tumesahau ku-ipunguza
            

                // ISHU IPO HAPA NAHISI KUNA SEHEMU NAJISAHAU KU-DECREASE HII ONCE I DELETE SOMETHING....
                for (i; i < listOfObj.length; i++) {
                    // Hapa nimeanza na 1 coz zero or first element of array is dummy value..
                    console.log('IM inside the for statement trying to loop data');
                    console.log(listOfObj[i]['tokenId']);
                    let nftId = listOfObj[i]['tokenId'];
                    console.log('Already printed..')
                    console.log(listOfObj[i]['dataUrl']);
                    console.log('above is printed url..')
                    tokenIdUrlObj[nftId] = listOfObj[i]['dataUrl'];
                    console.log(tokenIdUrlObj);
                    // Baada ya hapa tumia hii url kupata actualImage metadata
                    // Let's call fetch to fetch these images url which then get used inside "src" of image tag
                    // Access data url of given object... by passing its key of tokenId
                    console.log('Tupo hapa za juu zote zimekubali...')
                    let urli = tokenIdUrlObj[listOfObj[i]['tokenId']];
                    console.log('Hapa vipi.....')
                    let response = await fetch(urli);
                    console.log(response.status);
                    if (!response.ok) {
                        console.log('Problem with this url ');

                        this.setState({errorMessage: 'Problem with this metadata, enter the valid url'});
                        console.log(this.errorBlock.current);
                        this.errorBlock.current.style.display = 'block';
                        console.log(this.errorBlock.current);

                        setTimeout(() => {
                            // this will wait for 5 second then close the url
                            this.errorBlock.current.style.display = 'none';
                            this.setState({errorMessage: ''});
                        }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                        // **************
                    }
                    else {
                        console.log('Im going to try to parse response in json format...')
                        let data = await response.json();
                        console.log(data);
                        console.log('Above are data for you');
                        let imageSrc = data.image;
                        console.log(imageSrc);
                        console.log('Hadi hapa nimefanya vizuri... ngoja tuone huko chini')

                        //let currentState = this.state.urlObj;
                        //console.log(currentState)
                        //console.log('Above is current state of urlObj');
                        let netState = updateUrlObj.concat(imageSrc);  // Hapa maanake tulikua tuna-print value but we didn't assign.... Ukiangalia hapa maanake ili hii ui-assign ni lazima uchukue... HAPA ALIENISAIDIA NI THABITI
                        //console.log(netState);
                        updateUrlObj = netState;   // Hapa ndo actually tume-assign value...... we should make-sure output is not duplicated....
                        updateUrlObj = updateUrlObj.filter((item, index, self) => updateUrlObj.indexOf(item) === index);
                        console.log(updateUrlObj, updateIdsObj);
                        console.log(this.state.updateIdsObj, this.state.updateIdsObj);  // It returns [], []...
                        console.log('Above are saying is updated urlObj');
                        //let tokenCurrentstate = this.state.idsObj;
                        //console.log(tokenCurrentstate);
                        //console.log('This is current state of idsObj');
                        let tokenNetState = updateIdsObj.concat(listOfObj[i]['tokenId']);   // Hapa hatuja-assign value here badala yake tume-store assigned value kwenye variable fulani.. Ko ndo maana ilikua inakusumbua mbona tulikua tuki-iprint bado inatuletea variable ya juu ok nishajua..... MSAADA UMETOKA KWA THABITI..
                        console.log(tokenNetState);
                        updateIdsObj = tokenNetState;  // Hapa ndo actually tume-assign value ...... we should make-sure output is not duplicated....
                        updateIdsObj = updateIdsObj.filter((item, index, self) => updateIdsObj.indexOf(item) === index)
                        console.log(updateUrlObj, updateIdsObj);
                        console.log('Above is update token idsObj');
                        //this.setState({
                        //    urlObj: netState,
                        //    idsObj: tokenNetState
                        //})
                        console.log(this.state.urlObj);   // us we're good, but mshamba hapa anaetaka kutuharibia ni updateIdsObj na updateUrls.....
                        console.log(this.state.idsObj);   // us we're good, but mshamba hapa anaetaka kutuharibia ni updateIdsObj na updateUrls.....
                        console.log('Till here above code worked good for now I already updated the state of urlObj and idsObj');
                        
                        // After getting imageUrl then 
                        //tokenIdImgUrlObj[tokenIdUrlObj[listOfObj[i]['tokenId']]] = imageSrc;
                        
                    }
                    /*
                    console.log(updateIdsObj);
                    console.log(updateUrlObj);

                    this.setState({
                        urlObj: updateUrlObj,
                        idsObj: updateIdsObj
                    });
                    */
                    
                    console.log('Till now is all things correct..... Waoooh Good Job!');
                    


                }
                // MCHAWI HAPA KAMA UNAONA HIZI ZINAJIRUDIA THEN TUMIA ILE WAY YA KU-REMOVE DUPLICATE ELEMENTS FROM ARRAY...
                console.log(updateIdsObj);
                let concatIds = (this.state.idsObj).concat(updateIdsObj);
                let concatUrls = (this.state.urlObj).concat(updateUrlObj)
                console.log(updateUrlObj)
                let updatedInit = (this.state.init) + 1;
                console.log('How about here')
                await this.setState({
                    urlObj: updateUrlObj,
                    idsObj: updateIdsObj,
                    updateIdsObj: updateIdsObj,
                    updateUrlObj: updateUrlObj,
                    init: updatedInit
                });
                console.log('Hey fuck you react..... ')
                console.log(this.state.urlObj);
                console.log(this.state.idsObj);
                console.log(this.state.updateIdsObj);
                console.log(this.state.updateUrlObj);
                console.log('these is updated states above')


                console.log(this.previewWrapper1.current);
                console.log(this.previewWrapper.current);
                this.previewWrapper.current.style.display = 'none';
                this.previewWrapper1.current.style.display = 'block';
                this.previewWrapper1.current.style.height = 'auto';
                console.log(this.previewWrapper1.current);

            }
            catch(err) {
                console.log('Failed to execute above block')
            }
        }
    }


    onDrop = (e) => {
        // Here don't forget you should make sure you drop a elementId and Url in urlObj, 
        // idsObj, updateIdsObj and updateUrlObj states since are the one used to store and 
        // lender the assets to be used  as collateral... So don't forget..
        // To achieve this deleting use .splice() method..
        console.log(e.target)
        let indexOfElem = e.target.id; 
        console.log(indexOfElem);
        console.log('This is index to remove '+indexOfElem);
        let uUrs = this.state.urlObj;
        let uIds = this.state.idsObj;

        // Hawa wawili ndo wenye data urlObj, idsObj ambazo zinatumika hapa 
        // Ko hapa inabidi... Kwanza ni set updatIds and updateUrl ziwe na 
        // value kama hizi za hapa coz nime-print updateIdsObj and updateUrlObj
        // Nimegundua ni empty array.. ko first make them containing these data 
        // then other things will goes on

        console.log('this is states before removing that element.')
        console.log(this.state.updateIdsObj, this.state.updateUrlObj);
        console.log(this.state.urlObj, this.state.idsObj);
        console.log('this is the END ONE');
        uIds.splice(indexOfElem, 1);
        uUrs.splice(indexOfElem, 1);
        // Tafuta another way to remove the the Element of that index from these 
        // arrays naona splice kama inazingua... hvi...
        /*console.log(uIds, uUrs);
        let newFilteredArray = uIds.filter((ele) => {
            return indexOf(ele) != indexOfElem
        })
        console.log(newFilteredArray)
        let newFilteredArray2 = uUrs.filter((ele) => {
            return indexOf(ele) != indexOfElem;
        })
        */

        //console.log(newFilteredArray, newFilteredArray2);
        this.setState({
            urlObj: uUrs,
            idsObj: uIds,
            updateIdsObj: uIds,
            updateUrlObj: uUrs, 
            init: (this.state.init)-1    /// HAPA NIME-DECREASE THE NUMBER OF LOADED PREVIEW  ON DROP
        });
        /*
        let idS = this.state.idsObj;
        let urS = this.state.urlObj;
        console.log(idS, urS);
        console.log('Above is updated state of ids, urls');
        let result1 = (this.state.updateIdsObj).concat(idS);
        let results2 = (this.state.updateUrlObj).concat(urS);
        console.log(result1, results2)
        // Kama itakataa use updateIdsObj.concat(this.state.uIds);
        // Nasema hivi coz kumbe defaulted state of updated is []
        this.setState({
            updateIdsObj: result1,
            updateUrlObj: results2,
        }, () => {
            console.log(this.state.updateIdsObj, this.state.updateUrlObj);
        });
        */
        console.log('See above setState if it worked as Async')
        console.log(this.state.updateIdsObj, this.state.updateUrlObj);
        /*
        async updateStes() {
            await this.setState({})
        }
        
        */
       // https://github.com/microsoft/TypeScript/issues/34508
        // Au Google/Check Video on setState callback in react....
        // This is a link why seState fails to change the value of updateIdsObj and updateurlObj states
        // https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately
        //urlObj.splice(indexOfElem, 1);
        console.log('This is the updated version of these states....')
        console.log(this.state.urlObj, this.state.idsObj, this.state.updateIdsObj, this.state.updateUrlObj);
        
        // Now we need to check if the urlObj and idsObj is 0, if so then make sure you return the preview1 div 
        // to display block and 
        if ((this.state.urlObj).length == 0) {
            this.previewWrapper.current.style.display = 'flex';
            this.previewWrapper1.current.style.display = 'none';
        }
        // there is no need to add else.. since by default this is enabled on 
    }


    onAddLoadedNft = async (e) => {
        // Get the index of nft wanting to be added
        // Kumbuka hapa nina-click image sio div ndo maana nilivyoweka e.target.id ambayo
        // ipo kwenye div container imekataaa... Ko imabidi uweke alt coz ndo value inayohold
        // index..
        console.log(e.target)
        let assetIndex = e.target.alt; 
        console.log(assetIndex);
        console.log('Above is asset index for you!')
        let token_id = (this.state.pureLoadingCountIds)[assetIndex];
        console.log(token_id)
        let metadata_url = (this.state.pureLoadingCountUrls)[assetIndex];
        let toBePushedToTheAlreadyAddedAssetsState = {};
        toBePushedToTheAlreadyAddedAssetsState['tokenId'] = token_id.toString();
        toBePushedToTheAlreadyAddedAssetsState['dataUrl'] = metadata_url;
        console.log(toBePushedToTheAlreadyAddedAssetsState);
        // HAPA KINACHONICHANGANYA MIMI NI KUWA MPAKA UCLICK MARA MBILI NDO INAANZA KU-ADD ASSET SIJUI KWA NINI
        // NGOJA TUTAFUTE SABABU TUFIX....
        // After that then concatenate this to the this.state.alreadyAddedAsset
        // Hapa makesure una-add elements ambazo hazipo kabisa kwenye alreadyAddedAssets
        // remember from alreadyAddedAsset we care only from second element to the rest
        console.log(this.state.alreadyAddedAssets);
        console.log('above is the aaa with length of '+ (this.state.alreadyAddedAssets).length)
        // Ok imeniambia length ni 1... coz we only have dummy object, there so if the initial length.. so
        // here   
        
        let toConcat = [];
        let loopingArray = this.state.alreadyAddedAssets;
        for (let z=0; z < loopingArray.length; z++) {
            console.log(loopingArray[z])

            // Hii condition ya kisenge haicheck chochote...
            console.log(toBePushedToTheAlreadyAddedAssetsState['tokenId'], loopingArray[z]['tokenId'])
            console.log('this is values going to be tested inside the if ')
            if (toBePushedToTheAlreadyAddedAssetsState['tokenId'] == loopingArray[z]['tokenId']) {
                console.log('We are the same!')
                continue;
            }
            else {
                console.log('We are different!')
                toConcat = toBePushedToTheAlreadyAddedAssetsState;
                console.log(this.state.alreadyAddedAssets);
                /*
                this.setState({    
                    alreadyAddedAssets: (this.state.alreadyAddedAssets).concat(toConcat)
                })


                setTimeout(() => {
                    console.log('Im going to wait for 10 seconds')
                    console.log(this.state.alreadyAddedAssets)
                }, 10000)
                */
               /* Alafu embu ielewe await kuwa sio lazima object ili-return promise inaweza ikatumika hata ku-execute expression... ndo maana hapa nimeweka na imekubali
                  PASKO TUSHAJUA NI KIVIPI TUTAWEZA KUWAIT KWENYE SET STATE WAAAAOOOOOOHHHH! YOUR AWESOME SASA TUNAWEZA TUKA-MOVE ON NA MAMBO MENGINE......  */
                
                //// YOOOOUU await HERE YOUR MY SAVIOOOOOOOOOOOOOOOOOOOOOOR.... MDOGO ANGU FOR ANY SETSTATE USE await USIOGOPE HIYO ERROR AU WARNING KUWA 'await' has no effect here....
                //// ni UONGO AWAIT SIO LAZIMA IWEKWE KWENYE METHOD AMBAYO INA-RETURN PROMISE... HATA KWENYE EXPRESSION KAMA HIII INAFANYA KAZI... I-LUV YOU await...

                  await this.setState((prevState) => ({  
                    alreadyAddedAssets: (prevState.alreadyAddedAssets).concat(toBePushedToTheAlreadyAddedAssetsState)
                }))  // Hii await imetusaidia bila hii dah cijui ingekuaje... ..Hapa nimegundua kuwa hii haimalizi hai-iterate
                // element zote then wewe unakua ushadd what if there is 10 element and the one you find is at position 10 then you
                // will add 10 duplicatess.... 

                // Also I needed to remove these index in loading arrays...
            
                break;   // Hapa tukishapata hiyo index ambayo haipo sawa then break loop  since remember we need to add only this  value of image... nahisi hivi...
            }
            
        }
        console.log('loading state before being updated')  
        console.log(this.state.pureLoadingCountIds, this.state.pureLoadingCountUrls, this.state.pureLoadingCleanUrlWithImage)
        // lazima hii element ya hii index iwe removed to make it no longer loaded...
        console.log('This is the asset_index to remove '+assetIndex);

        let toUpdatePureLoadingCountIds = this.state.pureLoadingCountIds;
        let toUpdatePureLoadingCountUrls = this.state.pureLoadingCountUrls;
        let toUpdatePureLoadingCleanUrlWithImage = this.state.pureLoadingCleanUrlWithImage;

        toUpdatePureLoadingCountIds.splice(assetIndex, 1);   // KUmbuka splice return the removed value so don't lie yourself to think that if you store this output inside the variable then you have remaining array... no you would have the element removed.... Don't forget I did this kind of mistake down below
        toUpdatePureLoadingCountUrls.splice(assetIndex, 1);  // KUmbuka splice return the removed value so don't lie yourself to think that if you store this output inside the variable then you have remaining array... no you would have the element removed.... Don't forget I did this kind of mistake down below
        toUpdatePureLoadingCleanUrlWithImage.splice(assetIndex, 1); // KUmbuka splice return the removed value so don't lie yourself to think that if you store this output inside the variable then you have remaining array... no you would have the element removed.... Don't forget I did this kind of mistake down below

        await this.setState((prevState) =>({  
            pureLoadingCountIds: toUpdatePureLoadingCountIds,
            pureLoadingCountUrls: toUpdatePureLoadingCountUrls,
            pureLoadingCleanUrlWithImage: toUpdatePureLoadingCleanUrlWithImage
        }))

        
        console.log('loading state after being updated')
        console.log(this.state.pureLoadingCountIds, this.state.pureLoadingCountUrls, this.state.pureLoadingCleanUrlWithImage)
     
        console.log(toConcat)
      
        console.log('Outside the for loop');
        console.log(this.state.alreadyAddedAssets);

        /*
        console.log(this.state.alreadyAddedAssets)
        // After that I should make this loading window disappear....
        let cP = this.loadContainer;
        cP.current.style.display='none';
        console.log(this.previewWrapper1.current)
        console.log(this.previewWrapper1.current.style.display)

        this.previewWrapper1.current.style.display = 'block'
        this.previewWrapper1.current.style.height = 'auto'
        console.log(this.previewWrapper1.current.style.display)
        // NAHISI IMEKATAA COZ ILI UWEZE KU-PREVIEW YOU SHOULD CALL renderPreview() method 
        // nahisi hivi... ndo maana hapa naona hakijatokea kitu baada ya kuweka hizo code
        // hapo juu...
        */
        // remember to remove the element from loading prop..


        // HAPA COZ TUSHAONA  HUKO JUU KUWA ENDAPO USER ATA-CLICK THAT'S IMAGE MARA NYINGI NDIO HIVYO HIVYO 
        // MARA NYINGI ITAKAVYOKUA ADDED ... HAPA INABIDI TU-REMOVE DUPLICATES FROM alreadyAddedAssets before 
        // passing it to renderPreviewItems....
        // THANK YOU GOD HATIMAYE NIMEWEZA KU-FIX HII ISHU YA JINSI YA KU-REMOVE DUPLICATE OBJECTS FROM ARRAY HII CODE
        // HAPA CHINI IME-WORK HII INANIPA HINT YA KUJUA ZAIDI KUHUSU filter.... Also credit to stackoverflow this is a link
        // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects

        let pureAlreadyAddedAssets = (this.state.alreadyAddedAssets).filter((value, index, self) => index === self.findIndex((t) => (
            t.tokenId === value.tokenId
        )))  
        console.log('Below is pure aad with zero duplicates..')
        console.log(pureAlreadyAddedAssets)
        // Jamani await inazidi kutamba hii ndo solution to wait React setting the state 
        await this.setState({
            alreadyAddedAssets: pureAlreadyAddedAssets
        })
        console.log('This below is updated aad....')
        console.log(this.state.alreadyAddedAssets);  

        // Ili nft zetu ziwe rendered hivi vitu navyo lazima tu-update.....
        let updateIdsObj = this.state.updateIdsObj;
        let updateUrlObj = this.state.updateUrlObj;


        this.renderPreviewItems(this.state.alreadyAddedAssets); // imekubali...

    

        
    }


    onAdd = async () => {
 
        this.setState({loading: true});  // IKIZINGUA NITAITOA COZ ZITACHANGANYANA NA ADD BUTTON YA 'add' of popup form

        const mikopo = await factory.methods.getDeployedMikopo().call()
        console.log('This is deployed mikopo contract addresses.')
        console.log(mikopo)
   
        if (mikopo.length == 0) {
            // Hapa ku-add hii active kidogo inakua mtihani labda cijui tufanyeje..
            let cN = this.popElem.current;
            this.setState({loading: false});
            this.toHide.current.style.display = 'none';
            cN.style.display = 'block'

        }
        else {  
            let desiredAddress;
            let managers = new Array();
            let comparisonList = new Array();
            for (let i = 0; i < mikopo.length; i++) {
                const mkopo = await Mkopo(mikopo[i]);
                let manager = await mkopo.methods.owner().call();
                managers.push(manager);
                comparisonList.push(manager.toLowerCase());
                if (manager.toLowerCase() == (this.props.address).toLowerCase()) {
                    desiredAddress = mikopo[i];
                    console.log(desiredAddress)
                    console.log('You should contain value if you passed this if')
                    this.setState({
                        alreadyContainedAddress: desiredAddress
                    });
                }
            }
            console.log(managers +' this is managers for you');
            console.log(comparisonList)
            console.log(this.props.address);
            let ress = this.props.address;
            let comparisonAddress = ress.toLowerCase()
            if (comparisonList.includes(comparisonAddress)) {
                // Humu ndani kuna shida ngoja tupashughulikie..
                // Kama address/contract has already deployed by this user.. then
                console.log('This is  the desired address for you!!!!');
                console.log(desiredAddress);
                const mkopo = await Mkopo(desiredAddress);
                // If you have error of "This contract" object does not have address set yet, 
                // please set an address first.. Hii imenitokea mimi hapa mwanzo shida ni kuwa
                // address ya contract uliyopass ili u-load contract inakua sio sahihi.. For more 
                // this is a link https://ethereum.stackexchange.com/questions/69794/this-contract-object-doesnt-have-address-set-yet-please-set-an-address-first
                console.log(mkopo);
                let contractName = await mkopo.methods.NFTName().call();
                this.setState({
                    nameOfNFT: contractName
                })
                console.log('Kama kuna address ambayo imekua deployed na hii contract then show popElem1... second popElem')
                let cN = this.popElem1.current;
                this.setState({loading: false});
                this.toHide.current.style.display = 'none';
                cN.style.display = 'block';
            }
            else {
                // Kama address/contract is not deployed by this user.. then
                console.log('IM outside');
                let cN = this.popElem.current;
                this.setState({loading: false}); // HII IKIZINGUA NITAITOA
                this.toHide.current.style.display = 'none';
                cN.style.display = 'block';
            }
      
        }


    
    }
    /*

    hoverToDelete = (e) => {
        console.log('I want to delete collateral assets on preview..')
        e.target.style.cursor = 'pointer';
        console.log(e.target.src);
    }

    hoverOutToNotDelete = (e) => {
        console.log('Im not wanting to delete the asset')
        console.log(e.target.src);
    }

    */



    onLoad = async () => {
        // What to do when user click the load button.....
        // We should check if the user has already minted the nft.. We can 
        // achieve... By loading address of mikopo Contract then access the 
        // nftUrlIndex.....
        // But what if there is no any contract by this user.....
        // First get all deployed contract and then check one after another if there one the
        // owner is of this 
        this.setState({loading1: true});

        const mikopo = await factory.methods.getDeployedMikopo().call();
        // Kama there is no any contract uploaded then show the user the given popup with not deploy contract
        if (mikopo.length == 0) {
            // This means the user did'nt have any contract....
            let cD = this.loadContainer1;
            this.toHide.current.style.display = 'none';
            cD.current.style.display = 'block';
            this.setState({loading1: false});

        }
        else {
            let desiredAddress1;  
            let managers = new Array();
            let comparisonList = new Array();  

            for (let i = 0; i < mikopo.length; i++) {
                const mkopo = await Mkopo(mikopo[i]);
                let manager = await mkopo.methods.owner().call();
                managers.push(manager);
                comparisonList.push(manager.toLowerCase());
                if(manager.toLowerCase() == (this.props.address).toLowerCase()) {
                    desiredAddress1 = mikopo[i];
                    this.setState({
                        alreadyContainedAddress: desiredAddress1
                    });
                    // then after that if we get the contract address deployed by this user..
                    // then we should also check if he/she has minted any of assets
                    let loadedContract = await Mkopo(desiredAddress1);
                    let nftUrlIndexes = await loadedContract.methods.getNFTIndexes().call();
                    console.log('This is grabbed uploaded id of assets...')
                    console.log(nftUrlIndexes)
                    console.log('We are outside')
                    // Hizi index hapa inabidi nizichuje pia... Ngoja nitest...
                    let nonLocked = [];
                    for (let p = 0; p < nftUrlIndexes.length; p++) {
                        // Here we should get only which return false..
                        let assetStatus = await loadedContract.methods.closedAssets((nftUrlIndexes[p])).call();
                        if (assetStatus == false) {
                            nonLocked.push(nftUrlIndexes[p]);
                        }
                        else {
                            continue;
                        }
                    }
                    // Then set nftUrlIndex to nonLocked...
                    nftUrlIndexes = nonLocked;


                    // Sema hapa cijajua n kwanini niki-mint kule then niki-add kwenye mapping ya solidity token
                    // id ya url inareturn 2 as id of this but on nftUrlIndexes it starts from 1 as first one... cijua
                    // ni kwanini ila hapa kama itakusumbua kupata kwa moja basi ujue 1+1 is 2..
                    if (nftUrlIndexes.length == 0) {
                        // The user has not minted any asset.. We should display window with none of 
                        // nft asset.....
                        let cD =this.loadContainer1;
                        this.setState({loading1: false});
                        this.toHide.current.style.display = 'none';
                        cD.current.style.display = 'block';

                    }

                    else {  
                        // Then here you should check if those uploaded nft is already uploaded or not
                        // Remember in nftUrlIndexes we store the tokenId of each nft.. also you should 
                        // remember that we store these ids in state of idsObj.. so you should compare 
                        // create another array which store the nftIds of non-loaded assets...
                        console.log('Long time ago')  
                        console.log(this.state.urlObj, this.state.idsObj, this.state.updateIdsObj, this.state.updateUrlObj)
                        /* 
                            POINT OF NOTE::: You should know these states get updated to hold some value but when the user 
                            refresh a page or the server load again they get updated to [], so you should be able to handle 
                            these conditions by checking if we have nftUrlIndexes but these values is of [] also you should 
                            SHOULD KNOW THAT THE NFTURLINDEXES STORES THE TOKENID ONE LESS THAN THE ACTUAL ID OF NFT ASSET SO 
                            IF IT YIELD 1 THEN TOKENID OF ASSET IS 2... IF ITS 3 THEN 4 and so on..........
                        */
                        let alreadyAddedIds = this.state.idsObj;
                        // KUNA ERROR IMETOKEA HAPA WHAT IF NILISHA-MINT ILA KWA SABABU ETI ALREADYADDEDIDS INARETURN 0 THEN NDO NISHIDWE 
                        // KU-LOAD ALREADY UPLOADED  NFT THIS CONDITION SHOULD BE MODIFIED TO MEET THE CONDITION I THINK HERE I SHOULD ADD 
                        // A CONDTION WHICH WILL CHECK ALSO IF THERE IS NO MINTED NFTSSSSS....... PLEASE PASKO DO  THIS WE'RE RUNNING OUT OF 
                        // TIME... JUST KEEP RUNNING.......   KWANZA HAPA JUA HII CONDITION INAKUA CHECKED WHEN MINTED NFT ASSETS 
                        // IS NOT ZERO ITS GREATE THAN 0... WHAT I MEAN IS FOR THIS CONDITION THE LOADING SHOULD BE TRIGGERED SINCE 
                        // USER HAS MINTED NFTS...
                        if (alreadyAddedIds.length == 0) {  
                            // then the page was refreshed you should yield or show all nft asset uploaded by user.. coz initial 
                            // uploaded were perished... so display all nft by this user...                    
                            // Lazima idsObj ilete zero coz you refreshed the page... so by default state will be 
                            // updates to it's initial so is 0.. You should find another way Pasko.............
                            console.log('Hello Your my Friend')
                            // Umeona hapa tulikuwa na nft but when we refresh the page then all data get lost.... All u niggas gonna die!
                            console.log('Ok we have zero alreadyAddedIds but we have got some already added or minted nft assets so we should display them on loading')
                            // First get these nftUrlIndexes imported from the solidity above
                            let updateNftUrlIndexes1 = [];
                            for (let i = 0; i < nftUrlIndexes.length; i++) {
                                updateNftUrlIndexes1.push((parseInt(nftUrlIndexes[i]) + parseInt(1)));
                            }   // Hapa ndo tupo kwenye format ya tokenId starting from 2 instead of solidity of 1

                            let pureTokenIds1 = [];         // here is wherethe pure solidity token stored....
                            let pureCountUrls1 = [];        // here we store the metadata url array;
                            let cleanUrlWithImage1 = [];    // here is where the image src metadata urls is stored...

                            let pakuaMkopo1 = await Mkopo(desiredAddress1);

                            // Let's iterate the ids stored inside the updateNfrUrlIndexes1 to get the metadata json url
                            for (let i = 0; i < updateNftUrlIndexes1.length; i++) {
                                let grabbedUrl1 = await pakuaMkopo1.methods.nftData(parseInt(updateNftUrlIndexes1[i] - 1), this.props.address).call();
                                pureTokenIds1.push(parseInt(updateNftUrlIndexes1[i] - 1));
                                pureCountUrls1.push(grabbedUrl1);
                            }
                            console.log(pureCountUrls1)
                            console.log('Above are metadata urls of all minted urls when alreadyAddedAssets length is 0');

                            for (let i = 0; i < pureCountUrls1.length; i++) {
                                if (pureCountUrls1[i] === "") {
                                    continue;
                                }
                                else {
                                    let metaUrl1 = pureCountUrls1[i];
                                    let response1 = await fetch(metaUrl1);
                                    let data1 = await response1.json();
                                    let imgSrc1 = data1.image;
                                    cleanUrlWithImage1.push(imgSrc1)
                                }
                            }
                            console.log(cleanUrlWithImage1, pureCountUrls1, updateNftUrlIndexes1);

                            for (let i=0; i<cleanUrlWithImage1.length; i++) {
                                if ((this.state.pureLoadingCleanUrlWithImage).includes(cleanUrlWithImage1[i])) {
                                    continue;
                                }
                                else {
                                    this.setState({
                                        pureLoadingCleanUrlWithImage: (this.state.pureLoadingCleanUrlWithImage).concat(cleanUrlWithImage1[i]),
                                        pureLoadingCountIds: (this.state.pureLoadingCountIds).concat(updateNftUrlIndexes1[i]),
                                        pureLoadingCountUrls: (this.state.pureLoadingCountUrls).concat(pureCountUrls1[i])
                                    });
                                }
                            }
                            // Hapa kagoma ku-update states za hawa mabwana ndo maana hapa image hazija-load......
                            // Kama zinakataa kwa sababu ya call back sijui tuziweke ndani ya method au....
                            console.log('Below is updated states.....');
                            console.log(this.state.pureLoadingCleanUrlWithImage, this.state.pureLoadingCountIds,  this.state.pureLoadingCountUrls);

                            let cP = this.loadContainer;

                            this.setState({
                                loading1: false
                            })
                            this.toHide.current.style.display = 'none';
                            cP.current.style.display = 'block';
                        }

                        else {
                            console.log(alreadyAddedIds);
                            console.log('This is comparison between alreadyAddedIds and returned urlIdsIndexes returned from solidity')
                            console.log(alreadyAddedIds, nftUrlIndexes)

                            //let updateNftUrlIndexes = nftUrlIndexes.filter(x => x+1);
                            let updateNftUrlIndexes = [];
                            for (let i = 0; i < nftUrlIndexes.length; i++) {
                                console.log(nftUrlIndexes[i]);
                                console.log((parseInt(nftUrlIndexes[i]) + parseInt(1)));
                                updateNftUrlIndexes.push((parseInt(nftUrlIndexes[i]) + parseInt(1)));
                            }
                            console.log('This below is comparison between updatedNftUrlIndexes andNftUrlIndexes');
                            console.log(nftUrlIndexes, updateNftUrlIndexes);

                            console.log('Outside, outside.')  
                            let pureCountIds = updateNftUrlIndexes.filter(x => !alreadyAddedIds.includes(x.toString()));
                            console.log('This is comparison between alreadyAddedIds and pureCountIds');
                            console.log(alreadyAddedIds, pureCountIds);

                            let pureTokenIds = [];    // This will holds the tokenIds of nfts which does not found in preview...
                            let pureCountUrls = [];   // This will holds the metadataUrls of nfts which does not found inside preview...
                            let cleanUrlWithImage = [];

                            // then here you should check if the pure count length is zero if so then
                            // all minted assets has been added, else then load those indexes..
                            if (pureCountIds.length == 0) {
                                let cD =this.loadContainer1;
                                this.setState({loading1: false});
                                this.toHide.current.style.display = 'none';
                                cD.current.style.display = 'block';
                            }  

                            else {
                                // then load these indexes... To access there urls of images 
                                // the metadata url will helps you to render images...  KO HII 
                                // INAKUA EXECUTED WHEN YOU HAVE NFT ASSET IN PREVIEW ONLY NOT IN 
                                // OTHER CONDITION SO YOU HAVE ON PREVIEW ONE BUT OTHERS ARE NOT FOUND
                                // SINCE THEY GET REFRESHED.....
                                console.log('You have some nft to load!')
                                // But unajua kuwa hii pureCountIds imestore ids in form of string and we depend on the Solidity to get nftmetadata url
                                // remember ids in this has been stored in form of uint256 so when we pass element of pureCountIds in string it will make us
                                // in trouble... So be careful to use parseInt() everytime you pass these element to solidity

                                // Hapa kinachofanyika ni kilekile kwanza create a state to store all of these nft ids and url
                                // then use then inside the...
                                let pakuaMkopo = await Mkopo(desiredAddress1);
                                console.log('We are inside the else statement and this below is purCountIds array')
                                console.log(pureCountIds);   
                                console.log(await pakuaMkopo.methods.nftData(1, this.props.address).call())
                                console.log('This above is metadata url of first minted nft asset, ngoja tuone je ni kweli id inaanza na 1 au 2')
                                console.log('Kama nime-prove kuwa id ya nft asset inaanza na 1... But sijui ni kwa nini niki-asset asset inaniletea id ya 2... But ushaelewa hapo coz nimeprint nimeona kitu kama hicho...')
                                // then from this pakuaMkopo I should get nftUrl...
                                for (let i = 0; i < pureCountIds.length; i++) {   // Kama itakataa nitaweka 1 hapa...   
                                    // Grab all the metadata urls then you shoud access image key from them.....
                                    /*  Hapa nimeweka i+2 coz.. kwanza nishakwambia hii  NftIndex ipo nyuma kwa moja kwa id ya NftAsset... so hapa nimeweka hivi.
                                        Hiyo moja nyingine bado cjajua.... Koja tu-render then tuone kama itawork....
                                    */  
                                    console.log('Kama nime-prove kuwa id ya nft asset inaanza na 1... But sijui ni kwa nini niki-asset asset inaniletea id ya 2... But ushaelewa hapo coz nimeprint nimeona kitu kama hicho...')
                                    let grabbedUrl = await pakuaMkopo.methods.nftData(parseInt(pureCountIds[i] - 1), this.props.address).call();
                                    console.log(grabbedUrl); 
                                    pureTokenIds.push(parseInt(pureCountIds[i] - 1));   // this pureTokenIds will store the true ids of asset remeber our pureCountIds to match ids stored inside the solidity they needt to minimize 1... so there is a need to have another container which store Corrent Ids of assets
                                    pureCountUrls.push(grabbedUrl);
                                }
                                console.log(pureCountUrls);  
                                // Mpaka hapa tupo vizuri ko nishazipata hizi url za hizi metadata ambazo hazipo kule what next.. do I need to
                                //  HAPA NDO TUNAPOENDELEA NAPO TUNA-FETCH JSON FOR RETURNED URLS INSIDE pureCountUrls...
                                // REMEMBER WHEN YOU GET THE IMAGE DATA YOU SHOULD PUSH IT TO cleanUrlWithImage defined above don't create another container..
                                console.log('Above are metadata urls for you to display them to the user!')

                                
                                for (let i = 0; i < pureCountUrls.length; i++) {
                                    let metaUrl = pureCountUrls[i];
                                    let response = await fetch(metaUrl);
                                    // No need to worry if we fail to fetch or response fails since all of this is first tested on onAdd
                                    let data = await response.json();
                                    let imgSrc = data.image;
                                    cleanUrlWithImage.push(imgSrc);
                                    // Hapa mchezo umeisha tunachokitaka tumekipata ambacho ni imgsUrl... 
                                    // But remeber on click to add we should pass something like tokenIds of these 
                                    // nft... Nahisi kitu kama hichi kama sio basi inabidi tu-pass nftMetadataUr to 
                                    // add method... Nataka nitumie hii hii method so go and check what is required for 
                                    // this.... YEAH I REMEMBER ON ADD IT ONLY REQUIRE THE NFTMETADATA URL AND REMEMBER 
                                    // ADD MINT THE METADATA URL THIS IS NOT REQUIRED TO US SINCE THESE NFT IS ALREADY MINTED
                                    // SO ... HOW DO WE ACHIEVE RENDERING THEM TO THE PREVIEW LETS LOOK renderPreview method ..
                                    // let's look on this renderPreview method what it require for it to render the nft data....
                                    // Ok renderPreview it requires 'alreadyAddedAssets state'... for it to render our image in the 
                                    // preview then the there should be a data of clicked image on it....... ok renderPreview requires
                                    // us to given it alreadyAddedAssets state... a alreadyAddedAssets array needs us to give it the 
                                    // {tokenId: , metadataUrl: }... so this is what we needed to have to render our component 
                                    // in the renderToPreview...
                                    // So all images for user to click should have these....
                                }

                                console.log(cleanUrlWithImage, pureCountIds, pureCountUrls);
                                console.log('Above is the data found before try to assign them to the state')
                                
                                // I should have condition first to check if the nftImageUrl is either found inside the 
                                // pureLoadingCleanUrlWithImage state... if not then we should add or update this state
                                for (let i = 0; i < cleanUrlWithImage.length; i++) {
                                    // then here check if the url is already existed in pureLoadingCleanUrlWithImage
                                    if ((this.state.pureLoadingCleanUrlWithImage).includes(cleanUrlWithImage[i])) {
                                        // if it includes then ignore the iteration to another iteration;
                                        continue;
                                    }
                                    /// don't forget on click image to add from loading window you should update these states of pureLoading.........
                                    else {
                                        this.setState({
                                            pureLoadingCleanUrlWithImage: (this.state.pureLoadingCleanUrlWithImage).concat(cleanUrlWithImage[i]),
                                            pureLoadingCountIds: (this.state.pureLoadingCountIds).concat(pureCountIds[i]),
                                            pureLoadingCountUrls: (this.state.pureLoadingCountUrls).concat(pureCountUrls[i])
                                        })
                                    }
                                }
                                /*
                                this.setState({
                                    pureLoadingCountIds: (this.state.pureLoadingCountIds).concat(pureCountIds),
                                    pureLoadingCountUrls: (this.state.pureLoadingCountUrls).concat(pureCountUrls),
                                    pureLoadingCleanUrlWithImage: (this.state.pureLoadingCleanUrlWithImage).concat(cleanUrlWithImage)
                                })
                                */

                                console.log('Below is updated states......')
                                console.log(this.state.pureLoadingCleanUrlWithImage, this.state.pureLoadingCountIds, this.state.pureLoadingCountUrls);
                                let cP = this.loadContainer;

                                this.setState({
                                    loading1: false
                                })
                                this.toHide.current.style.display = 'none';
                                cP.current.style.display = 'block';
                            }
                            /*
                            for (let i = 0; i < nftUrlIndexes.length; i++) {
                                for (let j = 0; j < alreadyAddedIds.length; j++) {
                                    if (alreadyAddedIds[j] != nftUrlIndexes[i]) {
                                        // If so, then count pureCount, push that element to pureCount
                                        // pure count will Contain the minted urls which didn't added as
                                        // nft assets
                                        pureCount.push(nftUrlIndexes[i]);
                                        
                                    }
                                }
                            }
                            */
                        }
                    }
                }
                else {
                    // Yaa kunaweza kukawa na many deployed contract of mikopo in this list
                    // but you're not the owner then what should we do is to redirect to popup
                    // of people with no contract..
                    
                    let cD = this.loadContainer1;
                    this.setState({loading1: false});
                    this.toHide.current.style.display = 'none';
                    cD.current.style.display = 'block';

                    // Then the rest code will be executed when the user click "Mount and Add" button
                } 
            }
        }
    }

    onRemove = () => {
        //this.popElem.classList.remove("active");
        let cN = this.popElem.current;
        this.toHide.current.style.display = 'block';
        cN.style.display = 'none'
    }

    onRemove0 = () => {
        let cP = this.loadContainer;
        this.toHide.current.style.display = 'block';
        cP.current.style.display = 'none';
    }

    onRemove7 = () => {
        let cP = this.loadContainer1;
        this.toHide.current.style.display = 'block';
        cP.current.style.display = 'none';
    }

    onRemove1 = () => {
        //this.popElem.classList.remove("active");
        let cN = this.popElem1.current;
        this.toHide.current.style.display = 'block';
        cN.style.display = 'none'
    }

    onSub1 = async () => {
        this.setState({ loading: true});
     
        let jina = this.state.nameOfNFT;
        console.log(jina)
        let dataUrl = this.state.jsonUrl;
        console.log(dataUrl);

        // Nahisi for this case we should have try... catch statement here..
        try {

            // HAPA KWA SABABU HUYU USER HAJAWAHI KU-DEPLOY ANY CONTRACT THEN MAANAKE 
            // HANA ANY NFTurl deployed by this user since he never deployed contract... 
            // So we can rise exception if user use the same dataUrl...
            
            let response = await fetch(dataUrl);  // You should add some fetch parameters like
            // HEADERS.. so as you can send request even to the network node which did'nt send any
            // reponse like www.google.com.. Ukijaribu hii inareturn error coz hapa fetch yetu hatuja
            // i-customize.




            if (!response.ok) {
                console.log('Problem with this url!');
                this.setState({errorMessage: 'Problem with this url'});

                this.errorBlock.current.style.display = 'block';
                setTimeout(() => {
                    this.errorBlock.current.style.display = 'none';
                    this.setState({errorMessage: ''});
                    // this will wait for 5 second then close the url
                }, 10000);
                this.errorBlock.current.style.display = 'none';

                // you should throw an error here..
                //assert(false);
                this.setState({ loading: false});
            }
            else {
                // try to access image key from the returned response..
                try {
                    console.log('Im inside the try block')
                    console.log(response)
                    let data = await response.json() // this json used to gives our output/response in json format, parsing json should be asynchoronous..
                    let urli = data.image;
                    console.log(data);
                    console.log(urli);
                    console.log(data.name);
                    console.log(data.image);
                    console.log(data.description);
                    console.log('Everything is good!');
                    // if we have good url then what next... we already have good name and metadata url
                    // Javascript is unlike python try-----except ambayo code ambazo sio za kutest unaweza ukaziweka
                    // outside this try----except block... huku kwenye try... catch inabid code zote uziweke humu ndani
                    // nahisi hivyo
                    // What we care about metadata json is keys of "name", "description" and "image"
                    if (data.image && data.name && data.description) {
                        
                        
                        console.log('Everything is good!');
                        // Kama kila kitu kipo vizuri then you should create a Contract instance, deploy the contract
                        // after that submit the form and then render.... and work with preview section to show the 
                        // collateral assets.. Hapa kwanza deploy the contract and mint the nft url we have..
                        // To deploy the contract what we need is the ABI and Bytecode..
                        // We already said that we use MkopoFactory to deploy the contract..
                        console.log('Im executing get accounts method');
                        const accounts = await web3.eth.getAccounts();
                        console.log('End of getAccounts');

                        const results = await factory.methods.createMkopo(jina).send({from: accounts[0]});
                        console.log(results);
                        // HADI HAPA JUU SAFI LETS TEST FROM HERE
                        const deployedList = await factory.methods.getDeployedMikopo().call();
                        let cadd = deployedList[deployedList.length-1];
                        console.log(cadd);  // Hapa imetiki.. 
                        const loadedContract = await Mkopo(cadd);
                        console.log(loadedContract);
                        console.log('Relief it seems something is good above here....');
                        // Baada ya ku-create mkopo then tunayo-instance of mkopo in loan...
                        // HAPA KUPATA ADDRESS IMEKUA KIDOGO NI MTIHANI BUT SINCE ITS INSTANT 
                        // PROCESS WHY WE FETCH LAST ADDED ARRAY ELEMENT THERE IS MORE PROBABILITY
                        // TO BE OF THIS SENDER SINCE INSTANT AFTER CREATING A CONTRACT WHICH THEN 
                        // TO THE LIST OF DEPLOYED CONTRACT OF MIKOPOFACTORY THEN WE CAN FETCH THIS 
                        // FROM HERE.. HAPA HATUNA CHAGUO JINGINE ZAIDI YA KU-GET THE LAST ADDED 
                        // ADDRESS INSIDE THE deployedMikopo array.
                        // const deployedContractAddress = results.contractAddress;
                        // let's load this deployedContract by using address.
                        console.log('This is the address of deployed contract of Mkopo')
                        console.log('I\'ve about to mint the nft asset');
                        // then from loaded contract mint nft 
                        // Hadi hapa kwenye ku-mint imetiki WAAOOH
                        //let mintingPrice = web3.utils.toWei(0.51, 'ether');
                        //console.log(mintingPrice);
                        await loadedContract.methods.mint(dataUrl).send({
                            value: '100000000000000000',
                            from: accounts[0]
                        });
                        console.log('Already minted');
                        // After minting the nft...

                        // since here we mint and add this json of alreadyAddedAssets;
                        // Ni muhimu ni-store na tokenId ya hiyo assets... How we do....
                        // Since here we add unique not minted url what happen when new url is minted.. Hapa tunaangalia 
                        // already minted url... Kozi kuna url ambazo zipo tiar then what I mean here we ANTICIPATE easily 
                        // that the next tokenId is tokenId++... so SINCE HERE WE HAVE ALREADY ADDED ANOTHER URL OR MINTING
                        // THEN TO GET THE ID OF that nft assets is by accessing tokenId value
                        // and use as key and value is metadata url.. THIS IS IMPORTANT ON PREVIEW AND DOING SOME LOGICS..
                        const tokenId = await loadedContract.methods.tokenIdInit().call();
                        console.log('This is the tokenId of last added nft assets '+ tokenId);
                        
                        //// KUANZIA HAPA NAHISI HATUWEZI KU-STORE THE ARRAY INSIDE THIS.. INASHINDIKANA LABDA TU-CREATE ANOTHER JSON....
                        //alreadyAddedAssetsUrl.push(tokenId);
                        //alreadyAddedAssetsTokenIdInit.push(dataUrl);
                        //console.log(this.state.alreadyAddedAssetsTokenIdInit, this.state.alreadyAddedAssetsUrl);
                        // HAPA NISHAPATA JIBU KAMA VIPI DECLARE THE VARIABLE FOR IT TO STORE AND APPEND NEW KEY
                        // VALUE PAIR..
                        // HAPA MWANZO ILISHIDWA KU-ASSIGN VALUE OR APPEND KEY VALUE PAIR BECAUSE WE DIDN'T USE
                        // this.setState({});
                        //console.log(this.state.alreadyAddedAssets);
                        //this.setState({
                        //    alreadyAddedAssets: dataUrl // Here dataUrl should be of json objecct... But why its difficult to append these key value pair 
                        //})
                        
                        // FIRST ACCESS DATA.... OR ARRAY OR OBJECT WHICH STORED IN THE alreadyAddedAssets..
                        let initialAlreadyAddedAssets = this.state.alreadyAddedAssets;
                        let dataToPopulate = {tokenId, dataUrl};
                        let netAsset = initialAlreadyAddedAssets.concat(dataToPopulate);
                        console.log(netAsset);
                        console.log('Above is a data we want to populate iniside alreadyAddedAssets');
                        this.setState({
                            alreadyAddedAssets: netAsset
                        });
                        console.log(this.state.alreadyAddedAssets);
                        
                        //console.log(this.state.alreadyAddedAssetsTokenIdInit, this.state.alreadyAddedAssetsUrl);
                        ////// MWISHO HAPA KO INABI UPACHECK
                        


                        // Call the addAssetToPreviewFunction to add your nft assets on the preview
                        // this function should be passed with alreadyAddedAssets array of objects so
                        // as to acess images to render....
                        console.log('IM about to call preview method')
                        this.renderPreviewItems(this.state.alreadyAddedAssets);

                        /** BLOCK OF RENDERPREVIEWITEMS TO EXECUTE 

                        console.log('Hey lil bitch hoow  are you!');
                        var tokenIdUrlObj = {};
                        var tokenIdImgUrlObj = {};
                        if (listOfObj.length == 1) {
                            // this means we still not add any asset
                            this.previewWrapper.current.style.display = 'flex';
                            
                        }
                        else {
                            console.log('Im going to try the code in try here');
                            try {
                                for (i = 1; i < listOfObj.length; i++) {
                                    // Hapa nimeanza na 1 coz zero or first element of array is dummy value..
                                    tokenIdUrlObj[listOfObj[i]['tokenId']] = listOfObj[i]['dataUrl'];
                                    console.log(tokenIdUrlObj);
                                    // Baada ya hapa tumia hii url kupata actualImage metadata
                                    // Let's call fetch to fetch these images url which then get used inside "src" of image tag
                                    // Access data url of given object... by passing its key of tokenId
                                    let urli = tokenIdUrlObj[listOfObj[i]['tokenId']];
                                    console.log('Now we try to await and fetch the given url')
                                    let response = await fetch(urli);
                                    if (!response.ok) {
                                        console.log('Problem with this url ');

                                        this.setState({errorMessage: 'Problem with this metadata, enter the valid url'});
                                        console.log(this.errorBlock.current);
                                        this.errorBlock.current.style.display = 'block';
                                        console.log(this.errorBlock.current);

                                        setTimeout(() => {
                                            // this will wait for 5 second then close the url
                                            this.errorBlock.current.style.display = 'none';
                                            this.setState({errorMessage: ''});
                                        }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                                        // **************
                                    }
                                    else {
                                        console.log('we are good to go!');
                                        let data = await response.json();
                                        let imageSrc = data.image;
                                        let currentState = this.state.urlObj;
                                        let netState = currentState.concat(imageSrc);
                                        let tokenCurrentstate = this.state.idsObj;
                                        let tokenNetState = tokenCurrentstate.concat(tokenIdUrlObj[listOfObj[i]['tokenId']]);
                                        this.setState({
                                            urlObj: netState,
                                            idsObj: tokenNetState
                                        })

                                        
                                        // After getting imageUrl then 
                                        tokenIdImgUrlObj[tokenIdUrlObj[listOfObj[i]['tokenId']]] = imageSrc;
                                        
                                    }
                                    this.previewWrapper.current.style.display = 'none';
                                    this.previewWrapper1.current.style.display = 'block';


                                }
                            }
                            catch(err) {
                                console.log('Failed to execute above block')
                            }
                        }

                        /** BLOCK OF RENDERPREVIEWITEMS TO EXECUTE */

                        console.log('Tumepita kwenye renderPreview function...')
                        this.setState({ loading: false});
                        let cN = this.popElem.current;
                        console.log(cN);
                        this.toHide.current.style.display = 'block';
                        cN.style.display = 'none';

                        // Call the addAssetToPreviewFunction to add your nft assets on the preview
                        // this function should be passed with alreadyAddedAssets array of objects so
                        // as to acess images to render....
                    }
                    else {
                        console.log('We have problem here');
                        //*********** */
                        this.setState({errorMessage: 'Eithe we can\'t parse data in JSON format or problem in finding image metadata from parsed JSON.'});
                        console.log(this.errorBlock.current);
                        this.errorBlock.current.style.display = 'block';
                        console.log(this.errorBlock.current);
            
                        setTimeout(() => {
                            // this will wait for 5 second then close the url
                            this.errorBlock.current.style.display = 'none';
                            this.setState({errorMessage: ''});
                        }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                        // **************
                        this.setState({ loading: false});
                    }
                    console.log('Pasco tell us how we proceed!!!');
                }
                catch(err) {
                    console.log('Something went wrong we are in catch block')
                    this.setState({ loading: false});
                }
                console.log('Pasco tell us how we proceed');
            }
        }
        catch(err) {
          
            console.log('Im inside catch main')
            this.setState({errorMessage: err.message});
            this.errorBlock.current.style.display = 'block';

            setTimeout(() => {
                this.errorBlock.current.style.display = 'none';
                this.setState({errorMessage: ''});
            }, 10000);
            this.setState({loading: false});  
        }
    }

    onSub2 = async () => {
        // Hii inakua pale user akiwa tiari alisha-create contract instance.. Hapa tunategema 
        // input moja tu ya url... of metadata
        this.setState({loading: true});
        let dataUrl = this.state.jsonUrl;
        console.log(dataUrl);
        try{
            // Access all assets of nftUrlIndex;.. then after that check if iterate all
            // nftUrl of metadata from it if the url is found then dont send or fetch and
            // throw an error, since when user click the add button we have already initialized
            // the address of the contract of the user
            const mikopo = await factory.methods.getDeployedMikopo().call();
            if (mikopo.length == 0) {
                // Kama hamna mkopo ambao umekua deployed  then call onSub1()
                onSub1();
            }

            else {
                let desiredAddress;
                let managers = new Array();
                let comparisonList  = new Array();
                for (let i = 0; i < mikopo.length; i++) {
                    const mkopo = await Mkopo(mikopo[i]);
                    let manager = await mkopo.methods.owner().call();
                    managers.push(manager);
                    comparisonList.push(manager.toLowerCase());
                    if (manager.toLowerCase() == (this.props.address).toLowerCase()) {
                        desiredAddress = mikopo[i];
                        console.log(desiredAddress);
                        this.setState({
                            alreadyContainedAddress1: desiredAddress
                        });
                    }
                } 
                // then we have got desired address of Contract we should load this contract
                const deployedContractByThisUser = await Mkopo(desiredAddress);
                console.log(deployedContractByThisUser);
                // After load that contract then from it get all JSON Urls..
                const mintedUrlsListOfIndexes = await deployedContractByThisUser.methods.getNFTIndexes().call();
                console.log('This is the array of minted Metadata by this user');
                console.log(mintedUrlsListOfIndexes);
                console.log('This above is List of Indexes of minted asset')
                const mintedUrls = new Array();
                for (let i=0; i < mintedUrlsListOfIndexes.length; i++) {
                    let userAddress = this.props.address;
                    console.log(userAddress);
                    console.log('Im about to......')
                    let accessedUrl = await deployedContractByThisUser.methods.nftData(mintedUrlsListOfIndexes[i], userAddress).call();
                    console.log('Im good now......')
                    console.log(accessedUrl);
                    mintedUrls.push(accessedUrl);
                    
                }

                try {
                    if (mintedUrls.includes(dataUrl)) {
                        console.log('You should throw error.. since url is already possessed!');
                        assert(false);   // this is used to throw the error..
                    }
                    else {
                        console.log('Url is uniques its good')

                        // Hzi nitaziadd Hapa juu.....Ngoja kwanza nitest mitambo..
                        let response = await fetch(dataUrl);

                        if (!response.ok) {
                            console.log('Problem with this url');
                            // ****************
                            
                            this.setState({errorMessage: 'Problem with this metadata, enter the valid url'});
                            console.log(this.errorBlock.current);
                            this.errorBlock.current.style.display = 'block';
                            console.log(this.errorBlock.current);

                            setTimeout(() => {
                                // this will wait for 5 second then close the url
                                this.errorBlock.current.style.display = 'none';
                                this.setState({errorMessage: ''});
                            }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                            // **************
                            this.setState({loading: false});
                        }
                        else {
                            try {
                                let data = await response.json();
                                let urli = data.image;
                                // Baadae nITAADD VALIDATION ILI KUONA NI JINSI GANI USER HA-MINT ALREADY MINTED NFT URL..
                                if (data.image && data.name && data.description) {
                                    
                                    console.log('Everythingis good')
                                    const accounts = await web3.eth.getAccounts();

                                    // Hapa inabidi tutafute any contract which is of this address
                                    // Naona hapa njia rahisi ya kuipata hii our already deployed contract of ourself executed 
                                    // already above when I clicked add button of parent section... so let's import that address
                                    // here.... Nilichofanya nimi-isave kule juu as initialState of "alreadyDeployedAddress" then
                                    // inside on checking whether  the user has already contract when its found then i set the state
                                    // of this key... so I already have the address of my Contract found inside alreadyDeployedAddress state
                                    const loadedContract = await Mkopo(this.state.alreadyContainedAddress);
                                    await loadedContract.methods.mint(dataUrl).send({
                                        value: '100000000000000000',
                                        from: accounts[0]
                                    });
                                    // since here we mint and add this json of alreadyAddedAssets;
                                    // Ni muhimu ni-store na tokenId ya hiyo assets... How we do....
                                    // Since here we add unique not minted url what happen when new url is minted.. Hapa tunaangalia 
                                    // already minted url... Kozi kuna url ambazo zipo tiar then what I mean here we ANTICIPATE easily 
                                    // that the next tokenId is tokenId++... so SINCE HERE WE HAVE ALREADY ADDED ANOTHER URL OR MINTING
                                    // THEN TO GET THE ID OF that nft assets is by accessing tokenId value
                                    // and use as key and value is metadata url.. THIS IS IMPORTANT ON PREVIEW AND DOING SOME LOGICS..
                                    const tokenId = await loadedContract.methods.tokenIdInit().call();


                                    console.log('This is the tokenId of last added nft assets '+ tokenId);
                                    ///// HAPA NDO KUNA SHIDA CIJUI INASABABISHWA NA NINI

                                    let initialAlreadyAddedAssets = this.state.alreadyAddedAssets;
                                    let dataToPopulate = {tokenId, dataUrl};
                                    let netAsset = initialAlreadyAddedAssets.concat(dataToPopulate);
                                    console.log(netAsset)
                                    console.log('Above is a data we want to populate iniside alreadyAddedAssets');
                                    this.setState({
                                        alreadyAddedAssets: netAsset
                                    });
                                    console.log(this.state.alreadyAddedAssets);
            
                                     // call renderPreviewItems to add...
                                     this.renderPreviewItems(this.state.alreadyAddedAssets);


                                    /** BLOCK OF RENDERPREVIEWITEMS TO EXECUTE 

                                    console.log('Hey lil bitch hoow  are you!');
                                    var tokenIdUrlObj = {};
                                    var tokenIdImgUrlObj = {};
                                    if (listOfObj.length == 1) {
                                        // this means we still not add any asset
                                        this.previewWrapper.current.style.display = 'flex';
                                        
                                    }
                                    else {
                                        console.log('Im going to try the code in try here');
                                        try {
                                            for (i = 1; i < listOfObj.length; i++) {
                                                // Hapa nimeanza na 1 coz zero or first element of array is dummy value..
                                                tokenIdUrlObj[listOfObj[i]['tokenId']] = listOfObj[i]['dataUrl'];
                                                console.log(tokenIdUrlObj);
                                                // Baada ya hapa tumia hii url kupata actualImage metadata
                                                // Let's call fetch to fetch these images url which then get used inside "src" of image tag
                                                // Access data url of given object... by passing its key of tokenId
                                                let urli = tokenIdUrlObj[listOfObj[i]['tokenId']];
                                                console.log('Now we try to await and fetch the given url')
                                                let response = await fetch(urli);
                                                if (!response.ok) {
                                                    console.log('Problem with this url ');

                                                    this.setState({errorMessage: 'Problem with this metadata, enter the valid url'});
                                                    console.log(this.errorBlock.current);
                                                    this.errorBlock.current.style.display = 'block';
                                                    console.log(this.errorBlock.current);

                                                    setTimeout(() => {
                                                        // this will wait for 5 second then close the url
                                                        this.errorBlock.current.style.display = 'none';
                                                        this.setState({errorMessage: ''});
                                                    }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                                                    // **************
                                                }
                                                else {
                                                    console.log('we are good to go!');
                                                    let data = await response.json();
                                                    let imageSrc = data.image;
                                                    let currentState = this.state.urlObj;
                                                    let netState = currentState.concat(imageSrc);
                                                    let tokenCurrentstate = this.state.idsObj;
                                                    let tokenNetState = tokenCurrentstate.concat(tokenIdUrlObj[listOfObj[i]['tokenId']]);
                                                    this.setState({
                                                        urlObj: netState,
                                                        idsObj: tokenNetState
                                                    })

                                                    
                                                    // After getting imageUrl then 
                                                    tokenIdImgUrlObj[tokenIdUrlObj[listOfObj[i]['tokenId']]] = imageSrc;
                                                    
                                                }
                                                this.previewWrapper.current.style.display = 'none';
                                                this.previewWrapper1.current.style.display = 'block';


                                            }
                                        }
                                        catch(err) {
                                            console.log('Failed to execute above block')
                                        }
                                    }

                                    /** BLOCK OF RENDERPREVIEWITEMS TO EXECUTE */ 


                                    ////// MWISHO HAPA KO INABID UPACHECK........
                                    console.log('Tumepita kwenye renderPreview function...')
                                    this.setState({loading: false});
                                    let cN = this.popElem1.current;
                                    console.log(cN);
                                    this.toHide.current.style.display = 'block';
                                    cN.style.display = 'none';
                                    // call renderPreviewItems to add...

                                }
                                else {
                                    console.log('We have problem here');
                                    this.setState({loading: false});
                                }
                            }
                            catch(err) {
                                console.log('Something went wrong we are in a catch block')
                                //*********** */
                                this.setState({errorMessage: 'Eithe we can\'t parse data in JSON format or problem in finding image metadata from parsed JSON.'});
                                console.log(this.errorBlock.current);
                                this.errorBlock.current.style.display = 'block';
                                console.log(this.errorBlock.current);
                    
                                setTimeout(() => {
                                    // this will wait for 5 second then close the url
                                    this.errorBlock.current.style.display = 'none';
                                    this.setState({errorMessage: ''});
                                }, 10000);   // Ko this code will be run after 5 seconds...setTimeout is like python time.sleep. in this the code found inside it is run after that given time.
                                // **************
                                this.setState({loading: false});
                            }
                            console.log('Pasco tell us how we proceed!!!');
                        }
                        // ************** THE END **************** //


                    }
                }


                catch(err) {
                    console.log('Im inside catch statement...The metadata url has already been added or minted, you can\'t mint more than one metadata url twice');

                    console.log('Im inside catch main')
                    this.setState({errorMessage: 'Metadata URL already exitst, you can\'t mint one url twice!!'});   //////////////////////////////////////////////////////////
                    this.errorBlock.current.style.display = 'block';

                    setTimeout(() => {
                        this.errorBlock.current.style.display = 'none';
                        this.setState({errorMessage: ''});
                    }, 10000);

                    this.setState({loading: false});

                }
               
            }


        }
        catch(err) {
            console.log('Im inside catch main')
            this.setState({errorMessage: err.message});
            this.errorBlock.current.style.display = 'block';

            setTimeout(() => {
                this.errorBlock.current.style.display = 'none';
                this.setState({errorMessage: ''});
            }, 10000);
            this.setState({loading: false});
        }
    }

    render() {

        return (
            <div>
                <NavBar />
                <section className={styles.secStyles}>
                    <div ref={this.toHide}>
                        <p className={styles.title}>Fill below form to request fund from different lenders.</p>
                        <Form>
                            <Form.Group>
                                <Form.Input label='Amount in Ether' placeholder='Amount to borrow' width={6} onChange={event => this.setState({amountToBorrow: event.target.value})} />
                                <Form.Input label='Duration to Payback' placeholder='Duration in Days' width={6} onChange={event => this.setState({durationToPayback: event.target.value})} />
                            </Form.Group>
                            <div className={styles.imYourFather}>
                                <p className={styles.ca}>Collateral assets<span className={styles.no}>(0)</span></p>
                                <span className={styles.btnWrapper}>
                                        <Button icon='cloud download' floated='right' primary content='Load' size="mini" loading={this.state.loading1}  onClick={this.onLoad} />
                                        <Button icon='add circle' loading={this.state.loading} floated='right' primary content='Add' size="mini" onClick={this.onAdd} ref={this.addElem} />
                                </span>
                                <div className={styles.previewWrapper} ref={this.previewWrapper}>
                                    <span className={styles.msg}>{this.state.previewInitialMessage}</span>
                                </div>
                                {/* create another preview which will be displayed only when user add or load data, this is link for more https://www.codegrepper.com/code-examples/javascript/react+for+loop+inside+html*/}
         
                                <div className={styles.previewWrapper1} ref={this.previewWrapper1}>
                                    {(this.state.urlObj).map((value, index) => {
                                        return(
                                            <div className={styles.im} id={index} onClick={this.onDrop}>
                                                <img src={value} alt={index} width={200} height={200} className={styles.pic} /> 
                                            </div>
                                        )  
                                    })}

                                </div>
                                

                            </div>
                        </Form>
                        <div className={styles.finishBtn}>
                            <Button loading={this.state.bigBenzLoading} fluid color="black" onClick={this.finishHim}>Finish</Button>
                        </div>
                    </div>
                    {/* This is the popup div form for a new user a user who didn't created a Contract.. a one which never deployed a contract. */}
                    <div className={styles.addAssetsPopup} ref={this.popElem} >
                        <div className={styles.closeBtn} ref={this.closeBtn} onClick={this.onRemove}>&times;</div>
                        <div className={styles.form}>
                            <p className={styles.addTit}>Add collateral asset.</p>

                            <Form>
                                <Form.Group>
                                    <Form.Input label='Name of Asset Collection' placeholder='Assets referred from this name' width={14} onChange={event => this.setState({nameOfNFT: event.target.value})} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Metadata Url' placeholder='Used to fetch metadata of given asset.' width={14} onChange={event => this.setState({jsonUrl: event.target.value})} />
                                </Form.Group>
                                <Button icon='add circle' content="Add" color="green" loading={this.state.loading} onClick={this.onSub1} />
                            </Form>
                        </div>
                    </div>
                     
                    {/* this is the second popup form for user who have already deployed a contract... Has already creating a contract */}

                    <div className={styles.addAssetsPopup} ref={this.popElem1} >
                        <div className={styles.closeBtn} ref={this.closeBtn} onClick={this.onRemove1}>&times;</div>
                        <div className={styles.form}>
                            <p className={styles.addTit}>{this.state.nameOfNFT}</p>

                            <Form>
                                <Form.Group>
                                    <Form.Input label='Metadata Url' placeholder='Used to fetch metadata of given asset.' width={14} onChange={event => this.setState({jsonUrl: event.target.value})} />
                                </Form.Group>
                                <Button icon='add circle' loading = {this.state.loading} content="Add" color="green" onClick={this.onSub2} />
                            </Form>
                        </div>
                    </div>
                    {/* this is the end of the second div */}
                    {/* this is how you put literal string expression in className,, here I added class of material ui and one inside my custom css file
                    <div className={`ui mini top attached floating error icon message ${styles.jumbe}`}>   */}
                    <div className={`ui mini orange message ${styles.jumbe}`} ref={this.errorBlock}>
                        <i aria-hidden="true" className="close icon"></i>
                        <h4 className="header">Oops!!</h4>
                        <p>{this.state.errorMessage}</p>    
                    </div>
 
                    {/* Here we add the window for user to load*/}
                    <div className={styles.loadContainer} ref={this.loadContainer}>
                        <div className={styles.closeButton} ref={this.closeButton} onClick = {this.onRemove0}>&times;</div>
                        <div>
                            <h2 className={styles.loadTit}>Click NFT asset to add as Collateral asset.</h2>
                        </div>
                        {(this.state.pureLoadingCleanUrlWithImage).map((value, index) => {
                            return(
                                <div className={styles.ima} id={index} onClick={this.onAddLoadedNft} >
                                    <img src={value} alt={index} width = {200} height = {200} className={styles.pic1} title="Click to add" />
                                </div> 
                            )
                        })}
                        {/*  
                        <div className={styles.imgContainer}>
                            <div className={styles.ima}>
                                <img height={200} width={200} src='/static/images/3.jpg' />
                            </div>
                            <div className={styles.ima}>
                                <img height={200} width={200} src='/static/images/3.jpg' />
                            </div>
                            <div className={styles.ima}>
                                <img height={200} width={200} src='/static/images/3.jpg' />
                            </div>

                        </div>
                        */}
                    </div>
                    {/* This above is displayed if there is a couple of url minted and not added */}

                    {/* This below is displayed if the user didn't minted any url or if all url minted has already been added */}

                    <div className={styles.loadContainer1} ref={this.loadContainer1}>
                        <div className={styles.closeButton1} ref={this.closeButton} onClick = {this.onRemove7}>&times;</div>
                        <div>
                            <h2 className={styles.loadTit}>Click NFT asset to add as Collateral asset.</h2>
                        </div>
                        <div className={styles.nonce}>
                            <p>It seems either you have already added all of your nft assets as collateral assets, you have minted zero nft assets or both of these cases. 
                                <br />
                                <br />
                                Click the button below to mint and add new asset as Collateral.
                                <br />
                                <br />  
                                <Button primary content="Mint and Add" />
                            </p>
                        </div>
                        
                    </div>

                    {/* The end of this.. */}
                
                </section>
            </div>
        )
    }
}


export default BorrowComponent