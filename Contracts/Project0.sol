pragma solidity ^0.4.17

contract MkopoFactory {
    address[] public deployedMikopo;

    function createMkopo(uint nameOfNFT) public {
        address newMkopo = new Mkopo(nameOfNFT, msg.sender);
        deployedMikopo.push(newMkopo);
    }

    function getDeployedMikopo() public view returns (address[]) {
        return deployedMikopo;
    }
}


contract Mkopo {
    address developerAddress = '0x....'


    // this struct data get added by nakopa function() but hii data ya  mapping (string => uint256) inanichanganya coz user atataka a-add data/nft assets nying so unaona inakuwa mtihani ko hapa itabidi tutumie array tu haina jinsi..
    struct DeniDetails {
        uint256 deni;
        address borrower;  // mkopaji by default is msg.sender
        // assets anazodai... hapa nitumie mapping...nft alizoweka bond hapa cjui nitumie data structure gani au array... nft hapa nitumie tokenId au unasemaje.. hii baadae ita-affect nftData mapping coz owner will be changed... let's do this.
        // Ko hii assetsId ni NFTokenId..... collateralAssets inastore token ids..
        mapping uint256[] collateralAssets;  // but hapa kwenye lookup kuzipata zote ku-return zote na kuzimanipulate in solidity c itakuwa ni ngumu au??????? nakuuliza wewe.. ni sahihi coz hizi address tunazihitaji, pale mtu akishindwa kulipa deni ku-return  address zote itakua ni ngumu so naomba tutumie mapping... address and tokens... tutumie address => tokenList... au tutumie ...addressOfBorrower => tokenId => sema bado... Ko tufanyeje for this issue....
        //mapping (string => uint256); //naona iwe hivi string ni url and uint is token id...Ko kwenye kushindwa kurudisha deni nitatumia hii url and id of token tutazitumia ku-hamisha umiliki ownership of given token....

        // Hapa kwenye date in solidity we have only block.timestamp and now... so it's difficult to deal with date in solidity the way we  want.... embu tutumie now coz hii struct tunataka data ziwe added only when the use anavyokopa
        //uint issuedAt;   // In creating contract it will take now
        uint duration;   // this is duration for contract to expire.
        //uint deadline;   // it will take now + duration passed on function nakopa

    }
    // Ni muhimu ku-store kila deniDetail inside here
    DeniDetails[] deniDetailsList;


    struct AfterBorrowingMoney {
        address lender;
        struct DeniDetails;
        uint issuedAt;
        uint deadline;
        uint returedAmount
    }

    AfterBorrowingMoney[] ListOfAfterBorrowingMoney;


    // Ngoja nitumie mapping ya lender address and struct data instead of array hii itakua rahisi mimi ku-access... but kuna shida what if we have one lender address with multiple mkopo details  yaani akawakopesha wengi itakuwa ngumu ku-track coz one key is associated with one value, labda nitumie struct one address of lender can be associated with many lending activities

    mapping(uint256 => bool) closedAssets;  // Ko hapa hii ni tokenId and boolean.. Hii tuta-add hizi assets kwenye nakopa function...

    // Keep track if the given address is lender or not...
    mapping(address => bool) islender;

    address owner; // this will make the one who creating Mkopo object to be the owner by default in the constructor.. msg.sender
    // Requirement, hapa jua tuna-expect watu wawili either uwe mkopaji au mkopeshaji... Let's expect category on constructor
    // I expect you to provide the NFT name... Huyu ni kama manager kule kwenye course, ila mimi nimeamua nimuite owner;

    mapping (address => bool) mkopeshaji;   // If false is returned then ur not mkopeshaji
    mapping (address => bool) mkopaji;
    string NFTname;
    //string NFTurl;
    uint256 bei;
    uint256 maxMint = 5;
    mapping (address => uint256) mintedWallet;   // Hapa kila waleti inabidi i-mint mwisho 5 NFT token...
    tokenId = 1;
    mintingPrice = 2 ether
    // hapa tutamweka owner of given token by defaul at firts it's one with nft but if fails to pay become of payee
    // here to get the own
    mapping (address => uint256) owner;
    // inabidi niwe na mapping of tokenId, owner, url
    mapping (uint256 => mapping(address => NFTurl)) nftData;
    // Hii constructor iwe kama ile ya kwenye project yetu ya mwisho kwenye ile course ya kickstarters mwenye contract ni mtu
    // mmoja ambaye ni watu wanaohitaji hela then nyinyi wengine mnakuwa added pale mnapochangia.. Ushanipata...
    // Hii price tutaitumia kujua wewe mkopo tukupe wa sh ngapi kama nft yako ni sh 200 basi utapewa mkopo wa sh 150.. 
    constructor(string name, string mmiliki) {
        // then here check if the use category is either mkopeshaji au mkopaji
        NFTname = name;
        owner = mmiliki; // the one creating an object for this contract is the owner of the contract.
    }

    // Inabdi tumu-allow mkopaji apost hata nft or digital assets nyingi at once..... this is in order ili aweke bond
    // malinying kama atakua anahitaji mkopo mkubwa.... so in one contract you can have maximum amount of 5 nft


    // In minting it means you mint the given NFT to given account address, hii payable inapeleka hela kwenye address ya contract
    // ambayo sisi as developers hatutakuwa na uwezo wa kupata chetu, so ili contract iwe na hela kidogo embu hii minting price
    // iwe 0.00000000001 ether, then huko chini you should transfer 3 ether to the "Developer account"... inabidi iwe hivyo ili
    // na mimi nipate ... au tufanye kama ticha hivi tupeleke hela zote kwenye address husika(ya developer) and not in contract
    // address...
    function mint(string nftUrl, uint256 price) public payable {
        // anaemint inabidi awe aliye-create hii contract
        require(msg.sender == owner, 'Your not owner of this contract instance!');
        require(msg.value >= mintingPrice);   // but hapa kwenye kulipa inabidi hizi hela ziwe transfered kwenye account yetu na
        // sio contract address which all authority has been given to creator of the contract which in our case is the one minting
        // here
        // also you should check since we said one account can mint maximum 5 token....
        require(mintedWallet[msg.sender] > 5, 'You have reached maximum amount to mint');
        developerAddress.transfer(msg.value)
        nftData[tokenId][msg.sender] = NFTUrl;   // Hapa mtu anapomint ndo inabidi tujaze metadata of tokenid, owner and url
        mintedWallet[msg.sender] =+ 1;
        tokenId =+ 1;   // then I will increment the tokenId so the next token to be minted gonna be the second one..
    }


    event afterTransfer(address indexed from, address indexed to, uint256 indexed amount);

    function nakopa(uint256 amount, uint256 duration, uint256[] assets) public {
        // ILI KUFANYA CONTRACT MOJA IWE ASSOCIATED WITH KUKOPA KUMOJA KWANINI TUSITUMIE REQUIRE KEYWORD HERE..  AU KAMA UNATAKA USER AKOPE MARA NYINGI YANI KUWA NA STRUCT NYINGI HAPO JUU BASI INABIDI UZICLOSE ZILE MARI AMBAZO AMESHAWEKA BONDI KAZI KWAKO PASCO... COZ USER ANAWEKA AKAWA NA NFT ASSETS NYINGI ZINGNE AKAWEKA BOND AFU ZINGNE ASIWEKE BOND.... NAHISI USHANIPATA... mi naenda na hii ya pili kuwa na struct nying then ntacreate variable hapo juu ya ku-hold nfts alizoweka bond... niweke mapping ya token id and url.. then here in nakopa i should add require.. ko hapa assets anazotaka aziweke inabidi niweke require kwa ajili ya ku-check kama zipo kwenye bond kama zipo so nitatumia require....... sasa hizi assets utazipass vipi kama array basi poa then hapa tutafanya looking......
        // sasa hapa pasko uki-query array.length hio ni looping na utasababisha too much gas... bwana potelea kote mi nitatumia array.length cijui kama inafanya loopin... cijui
        // lengthOfAssets = assets.length();  // mfano imereturn 5 sasa hapa itabidi u-loop tu na hapo ndo UCHAWI UNAPOKUJA... hapa tutahitaji struct/mapping haina jinsi... ni tumie token and boool... Haina jinsi itabidi tu nikubali coz hata nikitumie 
        for (uint256 i = 0; i < assets.length; i++) {
            require(!closedAssets[assets[i]], 'Token is locked as collateral');
        }  // Japo gas inatumika kubwa but sina jinsi.. ndugu.


        // Unalipa lini unataka kukopa sh ngapi, assets unazoziambatanisha, only owner of the contract can call this method
        // Inabidi u-create hata struct ambayo inatunza data za anaedaiwa, kiasi, mwisho wa kulipa, assets alizoweka bond,
        // tarehe aliosaini dili now() siku ambayo tunaanza kuehesabia, pia kuna taarifa nyingne muhimu kama status of  
        // expired or not... Na vitu vingne kama hivyo huu ni mwanzo tu...   Pia kesho google uone kama solidity ina-object
        // ya duration.. ambayo itatusaidia ku-track mwisho wa kutoa... Kama haina in javascript interface chora kama drop-down 
        // ambapo mtu atakua na uwezo wa kuchagua day, months, year, hours then ki-box cha kuweka idadi/number
        // vilevile katika hii struct usisahau kuhifadhi information ya huyu mtu kama ashajitokeza mtu wa kumkopa au la..
        // if kajitokeza weka address yake pale if not weka null kuonesha bado ni hivyo kazi iendelee hii project inabidi ikamilike
        // by any means...........

        // create the DeniDetails struct and add it inside the array of 
        // deniDetails;;;
        DeniDetails memory newDeniDetails = DeniDetails({
            deni: amount,
            borrower: msg.sender,
            duration: duration
        })
        // Add the deniDetail to deniDetailsList...
        deniDetailsList.push(newDeniDetails)  // then how we access these deni-details to add to lender variable sawa najua by index but where do we get that index for given... hii tunai-add hapo chini kwenye function ya namkopesha..

    } 

    function namkopesha(DeniDetails deni) public {
        // this by default it will take the address of the borrower from the link.. and pass it here, hii namkopesha ina-uhusiano na DeniDetails, so hapa tutatumia mapping ambayo itakua ina-map owner(anaekopesha) and DeniDetails struct..... Kwani ane-click hii link ya namkopesha ni mwenye hela zake... ko hapa ni msg.sender...
        // Apo point yangu kwanza nitengeneze hii struct then add it inside the deniDetails array.. hii struct ninayotaka ni-store kwenye array nita-istore kwanza kwenye variable then nita-imapp na 

        // Hapa inabidi tuzi-lock hizi assets mtu asizitumie tena kwenye kuomba mkopo... Look nyingne oooh my god too much gas but hii ni mtu akishapewa hela
        for (uint256 i = 0; i < assets.length; i++) {
            // add all of them inside the closedAssets mapping
            closedAssets[assers[i]] = true;
        }

        // create DeniDetails struct then add it inside the array
        AfterBorrowingMoney memory newAfterBorrowingMoney = AfterBorrowingMoney({
            address: msg.sender, 
            DeniDetails: deni,
            issuedAt: now,
            deadline: now + deni.duration,
            returnedAmount: deni.deni + (deni.deni * 5%); // plus interest rate of 5%
        })
        ListOfAfterBorrowingMoney.push(newAfterBorrowingMoney);

        islender[msg.sender] = true; 

        // then transfer the amount of money to borrower hapa add some events for us to send feedback to the users...
        deni.borrower.transfer(deni.deni)
        emit afterTransferEvent(msg.sender, deni.borrower, deni.deni);

    }

    // Hii ina-execute kwa kila contract instance and one contract is 
    // associated with only one kukopa... Ko here we should pass the
    // Kama ulikuwa unataka hivi kwa nini ume-create struct PASKO U 
    // FAILED..... kama kuna struct objects nyingi basi hapa itabidi upass struct objects ya ku-check deadline but this is too complicate so jifikirie hii
    function checkDeadLine()



    function payback() public {
        // Hapa inabidi anae-call hii method a-pass
    }

    // Hapa mi naona hii function iwe ina-check AfterBorrowing money object zote iangalie muda ili tujue je ni contract gani ishaexpire ili tujue kama mtu ashashindwa na hii nishasema inakua execute all the time by Javascript setInterval everytime...  hapa pasco haiwezekani gas itakuwa kubwa sana, hapa ina-bidi ni-pass index moja tu ya given contract then nicheck...   Basi hii contract iwe executed everytime user visit or click a given AfterBorrowingMoney where by default you will take that object and check it... hii kidogo itakua rahisi....  hapa hii function iwe ni ya ku-call tu isiwe na haja ya kusababisha executing gas koz itakua inamtaka mtu asibitishe gas evertime we call it na tushasema kuwa everytime itakua executed so let's create a mapping of debtStatus to bool to store either debt deadline is reached or not.. NIELEWE PASKO HII INABIDI TU-CALL TU.. ISIHUSISHE GAS PASCO PLEAZE... HATA EVENT INABIDI USI-EMIT COZ KU-EMIT EVENT KUNASABABISHA GAS PRICE...
    mapping (AfterBorrowingMoney => bool) failedToPay;

    event dealt(AfterBorrowingMoney indexed deal)

// PASCO USISAHAU KAZI YA REQUIRE REQUIRE IKIWA EXECUTED MOJA TU INA-SABABISHA CODE I-CRASH STOP EXECUTING SO HATA KAMA UNATAKA UZITUMIE KWENYE FOR LOOP REMEMBER ONCE first REQUIRE EXECUTE TO FALSE THEN YOU'RE DONE IT NEVER GO TO ANOTHER LOOP.. SO HILO KUWA NAO MAKINI PLEASE NAKUOMBA PASCKO NAHISI ICHI KITU UTAKUWA UMESHAKIFANYA AU UNAFIKIRIA KUKIFANYA NDO MAANA NAKUKUMBUSHA....  hichi kitu umekifanya kwenye function nakopa() see cleaned code of project baby you will see this..

    // Unajua pasco user ku-pass abm ni ngumu ila coz abm is stored in Array we can make user pass the index of given abi
    function failedToPayBack(AfterBorrowingMoney abm) public {
        // Hii is used to check if the dealine of paying the debt is out then transfer all ownership of NFT to lender address.... Yaleyale itabidi tu-niloop but everytime to execute this pasco inahitaji gas evertime pasco mbona mtihani....
        // Hapa tunaihitaji django kufanya hizi logic kwa kweli mimi sina option nyingne ya kutunza hizi data..
        // failedToPayBack this should call not by using metamask  but the server will add some gas to be consumed and this is only called by the developer
        require(msg.sender == developerAddress, 'You should be developer of this contract to execute')
        require(!isPaid[abm], 'The debt is already been paid')  
        // Hapa ninachomaanisha Huyu developer/admin atakuwa na his account kwenye django ambapo akiingia ataona all debts codes and its status.. na ishu nyingne kama hivyo pasco ndo tunaenda mdogomdogo
        // Point ya kwanza kama kashindwa kulilpa basi transfer the ownership of assets to lender.. kwanza delete hii mapping yenye id and given key..// Hapa pasko tunaweza tukawa na nft id nying sana kwenye assets array, how u gonna handle this 
        // First access this array containing the assets
        uint256 assetsArray = abm.deniDetail.collateralAssets;
        // this assetsArray list will store the index of all NFT the user has put it as bond.. so what next embu chukua tokenId moja moja humu then jaribu kucheck kama ipo kama ipo take it's url then delete and add updated one with new owner...
        
        for (uint256 i=0; i < assetsArray.length; i++) {
            // check if we have nftData for this tokenId
            if (ntfData[assetsArray[i]][abm.borrower]) {
                // Kama ina-exist hii url then access it store somewhere, delete data and update it
                uri = nftData[assetsArray[i]][abm.borrower];
                del nftData[assetsArray[i]][abm.borrower];
                nftData[assetsArray[i]][abm.lender];
            }
        }
        // Haya tusha-change ownership then what next... au ndo tushamaliza kuhusu hii function.. ila nahisi coz hili deni lishakuwa processed kwanini tusili-delete au pasco unasemaje... Ili u-update upande wa Django and front-end embu hapa emit event kuwa oya kuna-contract/deni tushalishughulikia ko mnotify aliekopa na lender hii action na kwenye database la Django la ku-keep tracks of these issue should be updated..
        emit dealt(abm);
        //nftData[][abm.borrower]
    }

    // MBONA HII CONCEPT YA FAILED TO PAY ISHU YA KUCHECK MUDA INAKUA NGUMU HUKU ... COZ NISHASEMA KUWA HII FAILEDTOPAYBACK HAIHITAJI KABISA KUHUSISHA GAS NA HIZI METHOD KWA KAWAIDA ANAEKOPA NDO ANAZI-CALL SASA HAPA SIELEWI INABID NIFANYEJE.... AU NI-EXECUTE HII KWENYE JAVASCRIPT.. OK NGOJA TUFIKIRIE TUNAIFANYEJE HII KWENYE JS.....

    //mapping(AfterBorrowingMoney => bool) isPaid; // hii imekataa coz haifanyi mapping na struct data structure...  //


// PASKO TUMEFAIL HII isPaid haiwezi kuwa mapping coz inasema yenyewe inafanya mapping na elementary and enum data so Struct mapping yake inakua ngumu kufanya NAHISI PLANI NINAYOKUJA NAYO NI YA KU-CREATE event AMBAYO ITAWASILIANA NA DJANGO PIA NA JAVASCRIPT PALE USER ANAPO-PAY DENI.. KO KULE KWA TABLE YA DEVELOPER IN DJANGO WA PASKO....   NISHAPATA JIBU KAMA MTU AMESHALIPA DENI BASI DELETE HII STRUCT YA DENI HUKU KWENYE HII LIST YA LISTOFAFTERBORROWINDMONEY.. THEN SEND EVENT KULE KWA JS NA DJANGO TO UPDATE/DELETE THE DEBT COZ ITS ALREADY PAID.....HIVYO PASKO....THERE SHOULD BE ANOTHER FIELD OF isPaid which is boolean..
// nahisi hiyo ndo option iliyobaki pascko..
    // Unajua pasco user ku-pass abm ni ngumu ila coz abm is stored in Array we can make user pass the index of given abi, HII INAKUA RAHISI KWA USER KU-PASS INDEX OF THE DEBT HE WANT TO PAY. KO DON'T PASS STRUCT HERE JUST PASS INDEX OF THE STRUCT.... SAWA PASKO....   NISHAPATA JIBU KAMA MTU AMESHALIPA DENI BASI DELETE HII STRUCT YA DENI HUKU KWENYE HII LIST YA LISTOFAFTERBORROWINDMONEY.. THEN SEND EVENT KULE KWA JS NA DJANGO TO UPDATE/DELETE THE DEBT COZ ITS ALREADY PAID.....HIVYO PASKO....
    function payBack(uint256 abm_index) {
        // Hapa ili user alipe deni na apate assets zake kwanza lazima awe mkopaji pia lazima apass AfterBorrowingMoney which provides many information about given 
        abm = ListOfAfterBorrowingMoney[abm_index]
        // Pia lazima tuhakikishe due date is not passed 
        require(msg.sender == abm.deniDetail.borrower, 'Only borrower can call this');
        // Pia hapa lazima tuweke hata mapping kuonesha given AfterBorrowingMoney is paid or not.. HII IS PAID PIA ADD HAPO JUU KWENYE failedToPayBack() function ili tusisumbuke ena deniDetails ambazo zishakuwa paid...
        isPaid[abm] = true;
        // ko hapa tume-track all paid abm struct.. UPO VIZURI PASKO...
    }


// PASKO TUMEFAIL HII isPaid haiwezi kuwa mapping coz inasema yenyewe inafanya mapping na elementary and enum data so Struct mapping yake inakua ngumu kufanya NAHISI PLANI NINAYOKUJA NAYO NI YA KU-CREATE event AMBAYO ITAWASILIANA NA DJANGO PIA NA JAVASCRIPT PALE USER ANAPO-PAY DENI.. KO KULE KWA TABLE YA DEVELOPER IN DJANGO WA PASKO....   NISHAPATA JIBU KAMA MTU AMESHALIPA DENI BASI DELETE HII STRUCT YA DENI HUKU KWENYE HII LIST YA LISTOFAFTERBORROWINDMONEY.. THEN SEND EVENT KULE KWA JS NA DJANGO TO UPDATE/DELETE THE DEBT COZ ITS ALREADY PAID.....HIVYO PASKO....

/*         // You should remove the given abm from the abmList..... by passing value coz abm is element, maybe we need index
        //delete ListOfAfterBorrowingMoney[];
        // there is no shortcut way of getting the index of given element of array.. mpaka tutumie for loop.. another gas... 
        uint256 index;
        for (uint256 i=0; i < ListOfAfterBorrowingMoney.length; i++) {  
            if (ListOfAfterBorrowingMoney[i].issuedAt == abm.issuedAt) {  // How to compare two struct.... Hapa hatuwezi tuka-compare struct nzima ni lazima tuchague unique data kwenye hizi struct then tu-compare... sasa hapa nahisi pasco inabidi uongeze "struct id" field in your struct for everything to go well
                index = i;    // Ok nishapata jibu kwenye hii struct yetu data muhimu ambayo NI LAZIMA IWE UNIQUE NI issuedAt.. Kumbuka time coz inahusisha had miliseconds and microseconds kuwa sawa nahisi itakua ngumu so this is our uinque identifier... NAWEZA NIKAONGEZA debt_id but for now since block.timestamp return data in milliseconds then there is difficulties of two blocks to be mined at the same time nahisi hivyo but if there is some difficulties then use debt_id in struct as UNIQUES IDENTIFIER OF OUR AfterBorrowingMoney... A block timestamp is a time of block generation. The time is specified in milliseconds that have passed since the beginning of the Unix epoch .
            }
        }
        delete ListOfAfterBorrowingMoney[index];
        emit dealt(abm);
        
    }
    //mapping(uint256 => AfterBorrowingMoney) indexOf;  // Mapping ya hivi inakubali kama keys ikiwa sio AfterBorrowingMoney
    // can you access the keys of mapping kama hii inawezekana kupata index ni rahisi... plz kubali..

*/
    // Since its used who want to payback the debt from a list of debts then when he click given debt we should input its amb struct inside..
    function payback(AfterBorrowingMoney abm) public {
        // get that struct then inspect from it the returnValue of debt then add require to check if msg.value is greater or the same to that of returnValue after that delete that abm from abm list since we depend on it to keep track of all people with debts....
    }
}