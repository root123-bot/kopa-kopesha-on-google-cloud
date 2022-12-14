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

    string NFTname;
    address public owner;

    function Mkopo(string name, address mmiliki) public {
        NFTname = name;
        owner = mmiliki;
    }
}