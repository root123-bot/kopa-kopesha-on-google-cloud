pragma solidity ^0.4.17;

contract MkopoFactory {
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
    address public developerAddress = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
    uint256 public collateralAssetsLength;

    struct DeniDetails {
        uint256 deni;
        address borrower;
        uint256[] collateralAssets;
        uint256 duration;
    }

    DeniDetails[] public deniDetailsList;

    struct AfterBorrowingMoney {
        address lender;
        DeniDetails deniDetail;
        uint256 issuedAt;
        uint256 deadline;
        uint256 returnedAmount;
    }

    AfterBorrowingMoney[] ListOfAfterBorrowingMoney;

    mapping(uint256 => bool) closedAssets;

    address public owner;   // It's the same with manager...

    mapping (address => bool) public mkopeshaji;
    mapping(address => bool) public isLender;

    string public NFTName;
    uint256 maxMint = 5;
    mapping (address => uint256) public mintedWallet;
    uint256 public tokenIdInit = 1;
    uint256 public mintingPrice = 2 ether;

    mapping(uint256 => mapping(address => string)) public nftData;    // Hii string ni nfturl
    
    event afterTransfer(address indexed from, address indexed to, uint256 indexed amount);

    function Mkopo(string name, address mmiliki) public {
        NFTName = name;
        owner = mmiliki;
    }


    function mint(string NFTurl, uint256 price) public payable {
        require(msg.sender == owner);
        require(msg.value >= mintingPrice);
        require(mintedWallet[msg.sender] < 6);
        developerAddress.transfer(msg.value);
        nftData[tokenIdInit][msg.sender] = NFTurl;
        mintedWallet[msg.sender] += 1;
        tokenIdInit += 1;
    }

    function nakopa(uint256 amount, uint256 duration, uint256[] assets) public {
        collateralAssetsLength = assets.length;
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            require(closedAssets[assets[i]]);  

        }
        DeniDetails memory newDeniDetails = DeniDetails({
            deni: amount, 
            borrower: msg.sender,
            duration: duration,
            collateralAssets: assets
        });

        deniDetailsList.push(newDeniDetails);
    }

    // Au transfer the length of assets uint256[] array here to work with it.. sema cijui kama event moja
    // inaweza ikatumwa to another function and get executed... or google how to transfer data from one function
    /* to another in solidity..  oook nishapata jibu 
    function namkopesha(DeniDetails deni) public {
        for (uint256 i = 0; i < collateralAssetslength; i++) {
            closedAssets[deni.collateralAssets[i]] = true;
        }
    }
    
    */
    function namkopesha(DeniDetails deni) public {
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            closedAssets[deni.collateralAssets[i]] = true;
        }
    }
}      // hii inaleta error of solidity bytes on using struct in namkopesha() but when I put it in solidity version of 0.8.0 somehow worked for me... see ProjectBaby3rdDraft.sol