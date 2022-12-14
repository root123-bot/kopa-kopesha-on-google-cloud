/*
    Even though we have two separate contracts.. Campaign and FactoryCampaign, I'm only going to create one single file. The 
    reasoning behind this is that, you know, the two contracts we have are so incredibly closed related that I think that it
    kind of makes sense to just keep them all in the same test file. In addition, there's not really a lot of stuff that we
    have to test around the FactoryCampaign itself. The campagin factory really just does two things(It deploy instance of 
    the campaign and it retrieves a list of the different instances it has deployed).
*/

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiiledCampaign = require('../ethereum/build/Campaign.json');


let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data: compiledFactory.bytecode}).send({from: accounts[0], gas: '1000000'});
    // we're going to now use the factory to create an instance of Campaign(since its factoryCampaign which create Campaign contract) and assign 
    // it to the campaign variable above and we're going to take the address of deployed Campaign and save it to above  campaignAddress variable 


    // Hapa instructor hajatoa maelezo yanayoeleweka ila ukienda kuchek kwenye contract utaona kasema hii minimumContribution inayopaswa
    // iwe passed inabidi iwe in "uint" but sijaelewa hapa kwa nini kapasi inform of string. Ona maneno aliyoyasema
    //      "Again u see here that I'm representing a number as string, I know that we still have not quite gone into great details on
    //       why that is, but certainly on this application that we're going to work on in just a little bit, it'll be a lot of obvious
    //       why we're using the string her"
    await factory.methods.createCampaign('100').send({from: accounts[0], gas: '1000000'}); 
    // Remeber anytime we send the transaction, we get absolutely no results back except for a transaction receipt, so we have absolutely 
    // no idea WHAT ADDRESS OF THE CAMPAIGN WAS JUST CREATED AT. But from returned receipt you can store this deployemnt/creation of the 
    // contract in variable then assume variable is "result" to read the address of deployed contract use result.options.address... for
    // more look on Lottery folder in deploy.js file, But for now since in FactoryCampaign which has method to return deployed contracts
    // we can call it to achieve this functionality instead of usig .options.address.......
    // But remember in FactoryCampaign we have the function to read the addresses of deployed campagin, this function is .getDeployedCampaigns() 
    // for more to see how this worked go in "Campaign.sol"
    const addresses = await factory.methods.getDeployedCampaigns().call();  // remember since getDeployedCampaign is view method it did'nt modify data we use call();

    campaignAddress = addresses[0]; // since we deploy only one contract then we're going to assume the first one is Campaign we deployed

    // So now we have address of deployed Campaign contract through FactoryCampaign method.. So now I want to load this contract deployed at this
    // address. To load the contract we need to pass.. ABI of the contract and its address... Kumbuka kwenye video za nyuma instructor alishaelekeza
    // alisema ku-create contract(new one) we use ABI and bytecode but to load contract we need ABI and Address
    campaign = await new web3.eth.Contract(
        JSON.parse(compiiledCampaign.interface),
        campaignAddress
    );

                                                        
})



describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        // remember assert.ok used to test if a given expression is true or not.
        // If expression evaluate to 0 of false, assertion failure is being caused
        // and the program terminated...  assert.ok(expression, message);
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it ('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it ('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]  // I want to use second account from the first one which is of manager.. so here the normal other account user try to contribute
        });
        // then we said if we make our variable public become available  to use to access as method of same name of variable
        // so here remember our mapping type approvers variable is the one which keep track and store contributors, so let's
        // now check if accounts[1] address has been added to approvers mapping or not, but remember u can't retrieve entire
        // mapping so we can't say campaign.methods.approvers  this will bring error coz mapping we said is lookup type so 
        // we should pass key(here for our mapping its address).. and since its a method this lookup key is passed through
        // ()
        const isContributor = await campaign.methods.approvers(accounts[1]).call(); // remember we expect this to return a boolean value
        assert(isContributor); // this will fails if we pass false here.. so if its false then our accounts[1] has not been added.

    });

    it ('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            // so tuna-expect hii await i-raise error coz 5 < 100, hii error itafanya code za chini yake kama hii assert hapa 
            // chini isiwe executed... but kama hii assert itakua executed maanake hii await ya hapa juu haijaleta error hivi
            // test yetu itakua imefel coz tunategemea coz mtu kachangia kiasi kidogo inabid iraise error ambayo tutakuja ku-i
            // catch in catch() statement below.
            assert(false)
        }
        catch(err) {
            assert(err)  // remember assert took/check the existence of error if there is error than we passed a test other wise 
                         // if inside 'err' there is no error then we're screwed..
        }
    });

    it ('allows a manager to make a payment request', async () => {
        // remember if we're going to change data 
        await campaign.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        // As I stated here our request [] is variable of array of address of public, since its public we said there is getter method
        // created automatically for us to access the variable.. since it's function return an array inside the function we can pass
        // the index of array to lookup the given element inside requests array and since there is only one request created now we're 
        // going to assume the returned request is the one manager create. Also remember Request stored inside requests array is a struct
        // so we expect to get the request element with attributes of description, value, recipient, complete and approvalCount, here this requests 
        // element we look is of Request struct and although this struct also have the property of approvals it'll not be returned since 
        // the approvals is of mapping data type and we said mapping is lookup variable there is no way to return it without passing key of 
        // to look.. so instead we should get Request of attributes of description, value, recipient, complete and approvalCount for more look in Campaign.sol
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy batteries', request.description); // so here we're going to check if request added here is the same by description as first one found in requests array
        // If u want to you can assert other  property like value, recipient and so on but for now its fine with that.
    })

    // I think we need one more test that really capture everything our campaign does from start to finish, so I want to take our
    // campaign, I want to contribute to it, I want to create the request, I want to approve the request and then finalize the request and
    // then in the end we should be able to assert that some other party received some money from the request. this is our final test.
    // to run test use 'npm run test' and we run folder of test so in the terminal you should be at the level of directory which contain test
    // folder...
    it('processses requests', async () => {
        // Hapa ili tuone changes embu tusend too much money... so now I will send 10 ether
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });


        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({from: accounts[0], gas: '1000000'});
        
        // approveRequest needs us to pass 'index' of request we want to approve.
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        // After  we finalize the request we expect account[1] to receive amount of 5 ether from contract address.
        let balance = await web3.eth.getBalance(accounts[1]); // remember we received balance in form of wei
        balance = web3.utils.fromWei(balance, 'ether')
        
        // Now balance is going to be string representing some amount money in ether, we can't do easy comparison with
        // the string, so let's convert it into a float 
        balance = parseFloat(balance);    // parseFloat takes string and turn it into float.


        // Kumbuka tumerudia rudia sana kufanya test kila tulipokua tunaandika test tulikua tuna-run npm so now 
        // hatuwezi kujua ni kiasi gan cha hela kimbaki kwenye account[0] au account[1] this is because there is
        // nothing at present that resets the amount of money that  any account had after running a number of test
        // runs. So in other words, we don't really know exactly amount of money accounts[1] have at this point of 
        // time because of some eariel tests we have done. In other words, we are not properly doing clean up of
        // our accounts list between test and unfortunately that's kind at present a limitation  of the Ganushe
        // network.. So ideally we would be able to do a full restart between every test, but again, its just 
        // not easy for us to do it right now.. So by experience I think at this point in time probably around
        // ninety nine ether can be contained in accounts[1], SO TO MAKE SURE THAT MY TEST PASS AND ALLOWS FOR
        // SOME FLOAT AT THE BALANCE ABOVE.. SO SINCE WE SEND 5 ether in accounts[1] then I will assume 99+5
        // it can be around 104 ether contained.
        //
        // console.log(balance);  // 104.999827986.. hii ndo balance yake inalekea 105 but imepungua coz accounts[1] 
        // at above test I think at above test of 'allows people to contribute money and marks them as approvers' has
        // sent 200 wei and some gases get consumed from it.. So like I said, that gas that got paid doesn't really
        // get cleaned up in between tests that we're running.
        assert(balance > 104)
    })
});