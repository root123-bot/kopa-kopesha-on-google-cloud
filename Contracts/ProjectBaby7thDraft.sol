pragma solidity ^0.4.17;

contract MikopoFactory {
    address[] public deployedMikopo;

    function createMkopo(string nameOfNFT) public {
        address newMkopo = new Mkopo(nameOfNFT, msg.sender);
        deployedMikopo.push(newMkopo);
    }

    function getDeployedMikopo() public view returns (address[]) {
        return deployedMikopo;
    }
}

contract Mkopo {
    address public developerAddress = 0xACc647D5ae13cACFbb55E79b53036914bf842bf3;
    uint256 public collateralAssetsLength;

    struct DeniDetails {
        uint256 deni;
        address borrower;
        uint256[] collateralAssets;
        uint256 duration;
    }

    DeniDetails[] public deniDetailsList;  // These are objects of types DeniDetails struct

    struct AfterBorrowingMoney {
        address lender;
        DeniDetails deniDetail;
        uint256 issuedAt;
        uint256 deadline;
        uint256 returnedAmount;
    }

    AfterBorrowingMoney[] ListOfAfterBorrowingMoney;  // These are objects of types AfterBorrowingMoney struct.

    mapping(uint256 => bool) closedAssets;

    address public owner;
    mapping (address => bool) public mkopeshaji;
    mapping(address => bool) public isLender;

    string public NFTName;
    uint256 maxMint = 5;
    mapping (address => uint256) public mintedWallet;
    uint256 public tokenIdInit = 1;
    uint256 public mintingPrice = 2 ether;

    mapping(uint256 => mapping(address => string)) public nftData;    // Hii string ni nfturl
    
    event afterTransfer(address indexed from, address indexed to, uint256 indexed amount);

    

    string NFTname;

    function Mkopo(string name, address mmiliki) public {
        NFTname = name;
        owner = mmiliki;
    }


    function mint(string  NFTurl) public payable {
        require(msg.sender == owner);
        require(msg.value >= mintingPrice);
        require(mintedWallet[msg.sender] < 51);
        developerAddress.transfer(msg.value);  
        nftData[tokenIdInit][msg.sender] = NFTurl;
        mintedWallet[msg.sender] += 1;
        tokenIdInit += 1;    
    }


    function nakopa(uint256 amount, uint256 duration, uint256[] assets) public {
        collateralAssetsLength = assets.length;
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            require(closedAssets[assets[i]]);    // UMEONA HICHI KITU NDO NILICHOKISEMA PASKO(unavyotumia require yenyewe chap ina-stop execution of
            // code in short it makes the whole program crash so you can't go to another loop) ..... BUT HAINA SHIDA COZ 
            // WHAT I MEAN THE USER SHOULD HAVE ONLY CLEAN ASSETS ONE WHICH IS NOT FOUND INSIDE THE CLOSED ASSETS..

        }
        DeniDetails memory newDeniDetails = DeniDetails({
            deni: amount, 
            borrower: msg.sender,
            duration: duration,
            collateralAssets: assets
        });

        deniDetailsList.push(newDeniDetails);
    }

    function creatingAfterBorrowningMoneyStruct(DeniDetails deni) internal {
        AfterBorrowingMoney memory newAfterBorrowingMoney = AfterBorrowingMoney({
            lender: msg.sender,
            deniDetail: deni,
            issuedAt: block.timestamp,   // wanasema now ishakuwa depreceded tutumie block.timestamp sema sahihi coz hii function ina-change data itasababisha addition of block in blockchain..
            deadline: block.timestamp + deni.duration,
            returnedAmount: deni.deni + (deni.deni * 5 / 100)
        });
        ListOfAfterBorrowingMoney.push(newAfterBorrowingMoney);

    }


    function namkopesha(DeniDetails deni) private{
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            closedAssets[deni.collateralAssets[i]] = true;
        }
        // Call creatingAfterBorrowingMoneyStruct... remember struct need internal keyword if you need to store more than 32 bit of info.. 
        creatingAfterBorrowningMoneyStruct(deni);
        require(msg.value >= deni.deni);  
        deni.borrower.transfer(deni.deni);
        isLender[msg.sender] = true;
        afterTransfer(msg.sender, deni.borrower, deni.deni);

        //(Struct can only store 32 bit only Error is limited, For what its worth, this is limited to public functions. If you can make it internal or private the problem is circumvented.
    }


    event dealt(AfterBorrowingMoney indexed deal);

    function failedToPayBack(AfterBorrowingMoney abm) private {  // Ili kuondoa error ya more than 32 bit static data used.. we can solve this by using private or internal keyword in function.
        require(msg.sender == developerAddress);
        uint256[] memory assetsList = abm.deniDetail.collateralAssets;

        for (uint256 i=0; i < assetsList.length; i++) {
            delete closedAssets[assetsList[i]];  // You should remove the closed them from closedAssets mapping...
            // Kuhusu keccak256(abi.encodePacked()) kwa nini zimetumika in comparison of string this is a link https://stackoverflow.com/questions/54499116/how-do-you-compare-strings-in-solidity
            // https://ethereum.stackexchange.com/questions/4559/operator-not-compatible-with-type-string-storage-ref-and-literal-string
            // https://ethereum.stackexchange.com/questions/4559/operator-not-compatible-with-type-string-storage-ref-and-literal-string
            if(keccak256(nftData[assetsList[i]][abm.deniDetail.borrower]) != keccak256("")) { // sawa hii inareturn string, na error yetu hapa ni kuwa inashindwa ku-convert hii returned data into bool to be executed in if...
                string memory uri = nftData[assetsList[i]][abm.deniDetail.borrower];
                delete nftData[assetsList[i]][abm.deniDetail.borrower];
                nftData[assetsList[i]][abm.lender] = uri;
            }
            // Remove these assets from closed assets array
        }
        // You should remove the given abm from the abmList..... by passing value coz abm is element, maybe we need index
        //delete ListOfAfterBorrowingMoney[];
        // there is no shortcut way of getting the index of given element of array.. mpaka tutumie for loop.. another gas... 
        uint256 index;
        for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
            if (ListOfAfterBorrowingMoney[ind].issuedAt == abm.issuedAt) {  // How to compare two struct.... Hapa hatuwezi tuka-compare struct nzima ni lazima tuchague unique data kwenye hizi struct then tu-compare... sasa hapa nahisi pasco inabidi uongeze "struct id" field in your struct for everything to go well
                index = ind;    // Ok nishapata jibu kwenye hii struct yetu data muhimu ambayo NI LAZIMA IWE UNIQUE NI issuedAt.. Kumbuka time coz inahusisha had miliseconds and microseconds kuwa sawa nahisi itakua ngumu so this is our uinque identifier...
            }
        }
        delete ListOfAfterBorrowingMoney[index];
        dealt(abm);
        
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
        alreadyPaid(msg.sender, abm.lender, msg.value);
    }

    // To do payback remember u should send abm.. so how we do..
    function doPayback() public payable {
        AfterBorrowingMoney memory abmObj;   // then hii tunaipata vipi pasco tunai-query vipi ili tui-pass kwenye payback..
        payback(abmObj);                     // Ngoja tutafute plan... WAIT NAFIKIRIA ITAKUJE COZ ZILE HIZI FUNCTION TUNAZO-CALL
                                             // NI PRIVATE SO THERE IS NO WAY TO CALL THEM OUTSIDE THEY SHOULD BE CALLED INTERNALLY..
                                             // KO HATUNA BUDI KUFANYA HIVI KO HAPA TUTAFUTE NI KIVIPI TUTA-ACHIEVE HICHI KITU...
    }


    // To call failedToPayBack() function...
    function callFailedToPayBack() public payable {
        AfterBorrowingMoney memory abmObj;    // HII OBJECT BY ANYMEANS INABIDI TUTAFUTE WAY YA KU-ASSIGN.. NAHISI ON THE
        failedToPayBack(abmObj);              // FRONTEND... INABIDI IWE HIVYO...
    }

    function callNamkopesha() public payable {
        DeniDetails memory debtObj;
        namkopesha(debtObj);
    }
}


