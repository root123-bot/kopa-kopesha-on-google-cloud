
// Kwenye hii function ninachohitaji kwanza iwe public.. Pia nisihitaji any argument... 
// Nahisi kutafuta contract iliyo-expire logics zifanyike humuhumu ndani au... Lakini hapana


// VERSION ONE......

string public message;
uint256[] public accessedCA;

function failedToPayBack(uint256 created) public {
    require(msg.sender == developerAddress);
    message = 'Hello World';
    uint256[] memory assetsList = accessingCollateralAssets(created);
    
    uint256 index;
    AfterBorrowingMoney memory abm;

    for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
        if (ListOfAfterBorrowingMoney[ind].deniDetail.madeAt == abmddIssuedAt) {  
            index = ind;   
            abm = ListOfAfterBorrowingMoney[ind];
        }
    }

    accessedCA = assetsList;
    message = 'Hello World2';   
}



// END OF VERSION ONE.......



// version1 imekubali let's extends these logics to version 2....




//  VERSION2 STARTS HERE;
    string public message;
    uint256[] public accessedCA;
    AfterBorrowingMoney[] public abmList;
    string public urlList;

    function failedToPayBack(uint256 created) public {
        require(msg.sender == developerAddress);
        message = 'Hello World';
        uint256[] memory assetsList = accessingCollateralAssets(created);
        
        uint256 index;
        AfterBorrowingMoney memory abm;

        for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
            if (ListOfAfterBorrowingMoney[ind].deniDetail.madeAt == created) {  
                index = ind;   
                abm = ListOfAfterBorrowingMoney[ind];
                abmList.push(abm);
            }
        }
        accessedCA = assetsList;
        message = 'Hello World2';   


        for (uint256 i = 0; i < assetsList.length; i++) {
            delete closedAssets[assetsList[i]];
    
            string memory uri = nftData[assetsList[i]][abm.deniDetail.borrower];
            urlList = uri;
            delete nftData[assetsList[i]][abm.deniDetail.borrower];
            nftData[assetsList[i]][abm.lender] = uri;   
            
                
        }
        message = 'Hello world3';
    }


    function getCA() returns(uint256[]) public {
        return accessedCA;
    }

    function getABM() returns(AfterBorrowingMoney[]) public {
        return abmList;
    }


// VERSION2 END HERE...



    string public message;
    uint256[] public accessedCA;
    AfterBorrowingMoney[] public abmList;
    string public urlList;

    function failedToPayBack(uint256 created) public {
        require(msg.sender == developerAddress);
        message = 'Hello World';
        uint256[] memory assetsList = accessingCollateralAssets(created);
        
        uint256 index;
        AfterBorrowingMoney memory abm;

        for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
            if (ListOfAfterBorrowingMoney[ind].deniDetail.madeAt == created) {  
                index = ind;   
                abm = ListOfAfterBorrowingMoney[ind];
                abmList.push(abm);
            }
        }
        accessedCA = assetsList;
        message = 'Hello World2';   

        for (uint256 i = 0; i < assetsList.length; i++) {
            delete closedAssets[assetsList[i]];
    
            string memory uri = nftData[assetsList[i]][abm.deniDetail.borrower];
            urlList = uri;
            delete nftData[assetsList[i]][abm.deniDetail.borrower];
            nftData[assetsList[i]][abm.lender] = uri;   
            
                
        }
        message = 'Hello world3';
    }

    function getCA() public view returns (uint256[])  {
        return accessedCA;
    }

    function getABM() public view returns (AfterBorrowingMoney[])  {
        return abmList;
    }



/////////////////// VERSION2 IMEKUBALI BUT SINA UHAKIKA SANA......


// VERSION 3




    string public message;
    uint256[] public accessedCA;
    AfterBorrowingMoney[] public abmList;
    string public urlList;

    function failedToPayBack(uint256 created) public {
        require(msg.sender == developerAddress);
        message = 'Hello World';
        uint256[] memory assetsList = accessingCollateralAssets(created);
        
        uint256 index;
        AfterBorrowingMoney memory abm;

        for (uint256 ind=0; ind < ListOfAfterBorrowingMoney.length; ind++) {  
            if (ListOfAfterBorrowingMoney[ind].deniDetail.madeAt == created) {  
                index = ind;   
                abm = ListOfAfterBorrowingMoney[ind];
                abmList.push(abm);
            }
        }
        accessedCA = assetsList;
        message = 'Hello World2';   

        for (uint256 i = 0; i < assetsList.length; i++) {
            delete closedAssets[assetsList[i]];
    
            string memory uri = nftData[assetsList[i]][abm.deniDetail.borrower];
            urlList = uri;
            delete nftData[assetsList[i]][abm.deniDetail.borrower];
            nftData[assetsList[i]][abm.lender] = uri;   
            
                
        }
        message = 'Hello world3';

        
    }

    function getCA() public view returns (uint256[])  {
        return accessedCA;
    }

    function getABM() public view returns (AfterBorrowingMoney[])  {
        return abmList;
    }

