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
    

    function Mkopo(string name, address mmiliki) public {
        NFTName = name;
        owner = mmiliki;
    }
}