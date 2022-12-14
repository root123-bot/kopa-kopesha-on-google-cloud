pragma solidity ^0.8.0;


contract MkopoFactory {
    Mkopo[] public deployedMikopo;

    function createMkopo(string memory nameOfNFT) public {  // Error Type contract Mkopo is not implicitly convertible to expected type address specified in newMkopo so hapa nijiulize object returned is of what kind to store it here..
        Mkopo newMkopo = new Mkopo(nameOfNFT, msg.sender);  // Nahisi hii newMkopo inashindwa ku-store hii returned value of deployed contract
        deployedMikopo.push(newMkopo);   // Hapa mi target yangu nataka tu nipate address of deployed contract.... then nistore
    }

    function getDeployedMikopo() public view returns (Mkopo[] memory) {
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

    constructor(string memory name, address mmiliki) {
        NFTName = name;
        owner = mmiliki;
    }


    function mint(string memory NFTurl, uint256 price) public payable {
        require(msg.sender == owner);
        require(msg.value >= mintingPrice);
        require(mintedWallet[msg.sender] < 6);
        payable(developerAddress).transfer(msg.value);   // solidity 0.8.0... needs you to pass address inside payable() to make it get money...
        nftData[tokenIdInit][msg.sender] = NFTurl;
        mintedWallet[msg.sender] += 1;
        tokenIdInit += 1;
    }

    function nakopa(uint256 amount, uint256 duration, uint256[] memory assets) public {
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
    function namkopesha(DeniDetails memory deni) public payable{
        for (uint256 i = 0; i < collateralAssetsLength; i++) {
            closedAssets[deni.collateralAssets[i]] = true;
        }

        AfterBorrowingMoney memory newAfterBorrowingMoney = AfterBorrowingMoney({
            lender: msg.sender,
            deniDetail: deni,
            issuedAt: block.timestamp,   // wanasema now ishakuwa depreceded tutumie block.timestamp sema sahihi coz hii function ina-change data itasababisha addition of block in blockchain..
            deadline: block.timestamp + deni.duration,
            returnedAmount: deni.deni + (deni.deni * 5 / 100)
        });
        ListOfAfterBorrowingMoney.push(newAfterBorrowingMoney);

        require(msg.value >= deni.deni, 'You try to send less fund');
        payable(deni.borrower).transfer(deni.deni);
        isLender[msg.sender] = true;
        emit afterTransfer(msg.sender, deni.borrower, deni.deni);
    }


}


