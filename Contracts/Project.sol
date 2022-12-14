pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract MikopoFactory {
    address[] public deployedMikopo;
    
    function createMkopo(string nameOfNFT) public {
        address newMkopo = new Mkopo(nameOfNFT, msg.sender);
        deployedMikopo.push(newMkopo);
    }

    function getDeployedMikopo() public view returns (address[]) {
        return deployedMikopo;
    }

    function clearListOfDeployedMikopo() public {
        deployedMikopo = new address[](0);
    }

}

contract Mkopo {
    address public developerAddress = 0xACc647D5ae13cACFbb55E79b53036914bf842bf3;
    uint256 public collateralAssetsLength;
    uint256[] public nftUrlIndex; // It contain index of all minted url nft to this user..we can use it and msg.sender to get urls(Assets of given user)

    struct DeniDetails {
        uint256 deni;
        address borrower;
        uint256[] collateralAssets;
        uint256 duration;   // Hii inakua mbili kama coz array hapo juu inakua ngumu ku-be returned... due to lookup...
        uint256 madeAt;    // Hii ndo tutaitumia kama unique identifier of our contract... PLEASE
    }

    DeniDetails[] public deniDetailsList;  // These are objects of types DeniDetails struct

    struct AfterBorrowingMoney {
        address lender;
        DeniDetails deniDetail;
        uint256 issuedAt;
        uint256 deadline;
        uint256 returnedAmount;
    }

    mapping(uint256 => uint256[]) public deniDetailCollateralAssets; // This will assist us instead of depending on django to store the array of collateral assets we can store them here then accessing them NILICHOGUNDUA UKI-PASS KEY KWENYE MAPPING INAKUPA ARRAY NZIMA NO NEED FOR LOOKUP... THANK YOU GOD... NOW I CAN SOLVE THIS.
    // here in this mapping the deni madeAt variable is passed to reference all collateral assets stored....

    AfterBorrowingMoney[] public ListOfAfterBorrowingMoney;  // These are objects of types AfterBorrowingMoney struct.
    // Au inasema sio function coz sijaipa public... Lakini sizani..
    // Nahisi inabidi tuipe iwe public...
    // NISHAPATA JIBU KWA KILA VARIABLE INABID UIPE SCOPE EITHER "public" or "private" other wiser inakua ngumu kui-access kule
    // Ndo kilichonikuta hapa... Come...

    mapping(uint256 => bool) public closedAssets;

    address public owner;
    mapping (address => bool) public mkopeshaji;
    mapping(address => bool) public isLender;

    string public NFTName;
    uint256 public maxMint = 5;
    mapping (address => uint256) public mintedWallet;
    uint256 public tokenIdInit = 1;
    uint256 public mintingPrice = 0.000001 ether;

    mapping(uint256 => mapping(address => string)) public nftData;    // Hii string ni nfturl
    
    event afterTransfer(address indexed from, address indexed to, uint256 indexed amount);

    

    string NFTname;

    constructor(string name, address mmiliki) public {
        NFTname = name;
        owner = mmiliki;
    }

    function createdeniDetailCollateralAssets(uint256 createTime, uint256[] arr) public {
        deniDetailCollateralAssets[createTime] = arr;
    }

    // the createdAt passed here is the madeAt attribute of DeniDetails
    function accessingCollateralAssets(uint256 createdAt) public view returns (uint256[]) {
        return deniDetailCollateralAssets[createdAt];
    }

    function mint(string  NFTurl) public payable {
        require(msg.sender == owner);
        require(mintedWallet[msg.sender] < 51);
        require(msg.value >= mintingPrice);
        developerAddress.transfer(msg.value);  
        nftData[tokenIdInit][msg.sender] = NFTurl;
        mintedWallet[msg.sender] += 1;
        nftUrlIndex.push(tokenIdInit); // Everytime user mint nft we should store index of that NftUrl in this array for us to use to query all nftUrl and assets belonged to the given user
        tokenIdInit += 1;    
    }

    function getNFTIndexes() public view returns(uint256[]) {
        return nftUrlIndex;
    }

    function nakopa(uint256 amount, uint256 duration, uint256[] assets) public {
        collateralAssetsLength = assets.length;
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            require(closedAssets[assets[i]] == false);    // UMEONA HICHI KITU NDO NILICHOKISEMA PASKO(unavyotumia require yenyewe chap ina-stop execution of
            // code in short it makes the whole program crash so you can't go to another loop) ..... BUT HAINA SHIDA COZ 
            // WHAT I MEAN THE USER SHOULD HAVE ONLY CLEAN ASSETS ONE WHICH IS NOT FOUND INSIDE THE CLOSED ASSETS..
            // Naona hii require nimeikosea in short inabidi inareturn False to ensure that the assets is not closed there.....
        }
        DeniDetails memory newDeniDetails = DeniDetails({
            deni: amount, 
            borrower: msg.sender,
            duration: duration,
            collateralAssets: assets,
            madeAt: block.timestamp
        });

        deniDetailsList.push(newDeniDetails);
    }

    function creatingAfterBorrowningMoneyStruct(DeniDetails deni) internal {
        AfterBorrowingMoney memory newAfterBorrowingMoney = AfterBorrowingMoney({
            lender: msg.sender,
            deniDetail: deni,
            issuedAt: block.timestamp,   // wanasema now ishakuwa depreceded tutumie block.timestamp sema sahihi coz hii function ina-change data itasababisha addition of block in blockchain..
            deadline: block.timestamp + deni.duration,   // Hii haitokusaidia coz block.timestamp is in form of milliseconds while deni.duration is in form of days.. so it will be difficult to use this field to determine the dealine instead... You should calculate issuedAt + duration in milliseconds manually..
            returnedAmount: deni.deni + (deni.deni * 5 / 100)
        });
        ListOfAfterBorrowingMoney.push(newAfterBorrowingMoney);

    }

    function lengthOfDeniDetailsRequest() public view returns (uint256) {
        return deniDetailsList.length;
    }

    function getAfterBorrowingMoneyLength() public view returns (uint256) {
        return ListOfAfterBorrowingMoney.length;
    }


    function namkopesha(DeniDetails deni, address _mkopaji) private{
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            closedAssets[deni.collateralAssets[i]] = true;
        }
        // Call creatingAfterBorrowingMoneyStruct... remember struct need internal keyword if you need to store more than 32 bit of info.. 
        creatingAfterBorrowningMoneyStruct(deni);
        require(msg.value >= deni.deni);  
        _mkopaji.transfer(deni.deni);
        isLender[msg.sender] = true;

        // To avoid some difficulties after assigning the given DeniDetail as ABM struct object I should
        // delete it to avoid some confusiion

        for (uint256 z = 0; z < deniDetailsList.length; z++) {
            // Find the index of this deni...
            if ((deniDetailsList[z]).madeAt == deni.madeAt) {
                delete deniDetailsList[z]; 
            }
        }
        //delete deniDetailsList[windex]; // Haina jinsi in solidity 0.4.17 to there is no pop() maybe in latest versions.. kama 0.8.0 nimeona pop() inafanya kazi...

        withdraw();   // Coz nashangaa eti badala hiyo hela atumiwe borrower address hapo inaenda kwenye contract.. So this is our counter measure this will take all money sent to the contract address and transfer them to the owner.... 
        // PASKO HICHI KITU KIMENIUMIZA AKILI SANA NASHUKURU NAMSHUKURU MUNGU PIA UMEWEZA KU-SOLVE SO NOW HERE WE GO... SO TRANSFER() HII NI YA KISENGE INITIALLY ILIKUA INAFANYA KAZI YAKE VIZURI TU KWA KU-TRANSFER HII HELA KWENYE MKOPAJI 
        // ADDRESS BUT NIMESHANGAA ETI NOW IMEKUJA KUKATAA... SO HII NDO COUNTER MEASURE KAMA ZINAENDA KWENYE CONTRACT ADDRESS THEN ZITOE... LAKN SIO KWA SCENARIO ZOTE HICHI KITU KINATOKEA KWA MFANO HAPO JUU KWENYE KU-MINT JAPO UKIMINT HELA
        // INAENDA KWENYE ADDRESS YA CONTRACT LAKNI BAADAE DEVELOPER ADDRESS ANAIPATA HELA YAKE HAIWI LOCKED KWENYE CONTRACT.. MI NAHISI HAIJAWA LOCKED KWA SABABU DEVELOPER ADDRESS SIO OWNER OF THIS CONTRACT SO HATUWEZI KUMTUNZIA HELA COZ 
        // ITAKUA NGUMU KUZITOA.... LAKNI KWA SCENARIO YA PILI YA HAPA NAMKOPESHA TUNAONA HII INAKUWA LOCKED COZ HUYU ANAETUMIA NI OWNER OF THIS CONTRACT SO ITAKUA RAHISI KWAKE KUZITOA USING WITHDRAW... SO NAHISI KITU KAMA HICHI..
        
        emit afterTransfer(msg.sender, deni.borrower, deni.deni);

        //(Struct can only store 32 bit only Error is limited, For what its worth, this is limited to public functions. If you can make it internal or private the problem is circumvented.
    }


    //event dealt(AfterBorrowingMoney indexed deal);
    uint256[] public jackedNftIndex;

    function failedToPayBack(uint256 abmddIssuedAt) public {
        // Hapa inafeli coz ya hii require statement inamuhitaji msg.sender to be developerAddress but 
        // in our case is method which call this.. so you should solve this by doing this...
        require(msg.sender == developerAddress);
        // By using this passed abmddIssuedAt we can query all the assets stored into it...
        uint256[] memory assetsList = accessingCollateralAssets(abmddIssuedAt);

        uint256 index;
        AfterBorrowingMoney memory abm;

        for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
            if (ListOfAfterBorrowingMoney[ind].deniDetail.madeAt == abmddIssuedAt) {  // How to compare two struct.... Hapa hatuwezi tuka-compare struct nzima ni lazima tuchague unique data kwenye hizi struct then tu-compare... sasa hapa nahisi pasco inabidi uongeze "struct id" field in your struct for everything to go well
                index = ind;    // Ok nishapata jibu kwenye hii struct yetu data muhimu ambayo NI LAZIMA IWE UNIQUE NI issuedAt.. Kumbuka time coz inahusisha had miliseconds and microseconds kuwa sawa nahisi itakua ngumu so this is our uinque identifier...
                abm = ListOfAfterBorrowingMoney[ind];
            }
        }
        
        for (uint256 i = 0; i < assetsList.length; i++) {
            delete closedAssets[assetsList[i]];

            // Hizi assets zote lazima ziwe na metada url coz zimekuwa minted.. so lazima haina haja ya kuweka if...
            // Hii condition ni ya kutoa coz all nftasset by default will be owned by borrower... Nahisi hii ndo inayoleta shida....
            string memory uri = nftData[assetsList[i]][abm.deniDetail.borrower];
            delete nftData[assetsList[i]][abm.deniDetail.borrower];
            nftData[assetsList[i]][abm.lender] = uri;   
            
                
        }

        // Get all elements stored inside the collateralAssets, This block will update the 
        // nftUrlIndex array since the nft is no longer owned by given user/first owner..
        for (uint256 a = 0; a < assetsList.length; a++) {   // CONTRACT ZOTE ZILIKUA ZINAFELI HAPA JAMAN.... DAH BADALA NIWEKE a nimeweka 'i++'.... AAAAAh kweli mtihani....
            uint256 element = assetsList[a];
            // I should remove this element in nftUrlIndexes array
            for (uint256 z = 0; z < nftUrlIndex.length; z++) {
                if (element == nftUrlIndex[z]) {
                    jackedNftIndex.push(nftUrlIndex[z]);
                    delete nftUrlIndex[z];   // Hapa ndo tulipobug kuifutilia mbali... nftUrlIndex...
                    // Sasa pasko unajua hizi nftUrlIndex ndo inatupa urahisi wa ku-interact na nftData...
                    // Ko ili usivurunde inabidi u-create maybe another variable to save this data ambazo user zinakua 
                    // sio zake...
                }
                    
            }
        }

        delete ListOfAfterBorrowingMoney[index];
        //emit dealt(abm);
                                
    }

    function getJackedNftIndex() public view returns(uint256[]) {
        return jackedNftIndex;
    }

    event alreadyPaid(address indexed from, address indexed to, uint256 indexed amount);

    
    function payback(AfterBorrowingMoney memory abm) private{    // These private are function which is called only internal... so why we should create a caller method of public
        require(msg.sender == abm.deniDetail.borrower);
        require(msg.value >= abm.returnedAmount);
        abm.lender.transfer(msg.value);

        uint256 index;
        for (uint256 i=0; i < ListOfAfterBorrowingMoney.length; i++) {
            if (ListOfAfterBorrowingMoney[i].issuedAt == abm.issuedAt) {
                index = i;
            }
        }
        delete ListOfAfterBorrowingMoney[index];

        // You forget to unlock asset when user has already paid the debt, you should unlock them here
        for (uint256 p = 0; p < (abm.deniDetail.collateralAssets).length; p++) {  // But abm in solidity should be the same defined here..
            // Vilevile nina option hapa kama hii ikikataa nita-load hizi array from mapping of deni timestamp and array..
            delete closedAssets[(abm.deniDetail.collateralAssets)[p]];
        }

        emit alreadyPaid(msg.sender, abm.lender, msg.value);
    }

    // To do payback remember u should send abm.. so how we do..
    function doPayback(AfterBorrowingMoney abmObj) public payable {
        //AfterBorrowingMoney memory abmObj;   // then hii tunaipata vipi pasco tunai-query vipi ili tui-pass kwenye payback..
        payback(abmObj);                     // Ngoja tutafute plan... WAIT NAFIKIRIA ITAKUJE COZ ZILE HIZI FUNCTION TUNAZO-CALL
                                             // NI PRIVATE SO THERE IS NO WAY TO CALL THEM OUTSIDE THEY SHOULD BE CALLED INTERNALLY..
                                             // KO HATUNA BUDI KUFANYA HIVI KO HAPA TUTAFUTE NI KIVIPI TUTA-ACHIEVE HICHI KITU...
    }

    function callNamkopesha(DeniDetails debtObj, address borrower) public payable {
        namkopesha(debtObj, borrower);
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function withdraw() public {
        owner.transfer(this.balance);  // Coz hii tuna-icall kwenye lend me na anae-call anaweza akawa any address like lender.. so having restricted to owner only to call this method it can be difficult....
    }
}

