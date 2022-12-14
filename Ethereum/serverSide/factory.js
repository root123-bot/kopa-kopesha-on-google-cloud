const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const MikopoFactory = require("../source/MikopoFactory.json"); // this is file containing Bytecode and ABI
const Mkopo = require("../source/Mkopo.json");

/*
const output = async () => {
    const accounts = await web3.eth.getAccounts();
    const out = await instance.methods.getDeployedMikopo().call({
        from: accounts[0]
    }); 
    // this output is returned in form of array... so assign it to deployedMikopo array
    deployedMikopo = out;
    // Kama hii deployed mikopo ingekua humu ndani yaani ingekuwa rahis kuwa assigned but ukienda kwa nje unakuta ni empty...

    provider.engine.stop();  //  this line of code will stop teh script if await process completed without this the script won't stop it continue to run even if we have got the output;
};

// Hii imekaa pambe tuta-wait till execution of output function to complete for us to print deployedMikopo.. Na ndio imefanya kazi the same way you can 
//apply it for it to wait the function that loading the mikopo and give gives us these deployed addresses for us then to iterate them in other function 
// that is power of promise.... So here create your logic to achieve your goal of dealine.....

output().then((promised) => {  
    console.log(deployedMikopo)
});


output();
console.log('this is a list of all deployed mikopo addresses..')
console.log(deployedMikopo);

setTimeout(() => {
    console.log('Hey lets access deployed mikopo after 5 seconds..')
    console.log(deployedMikopo);
}, 5000);

console.log('Im good to go');
console.log(deployedMikopo);
*/

setInterval(async () => {
  const provider = new HDWalletProvider(
    "observe they frost admit animal lock arrow price cram rude allow fade",
    "https://goerli.infura.io/v3/967ec8c304ff48c4a593c04832ea452c"
  );
  const web3 = new Web3(provider);

  //const MikopoFactory = require('../source/MikopoFactory.json');

  const instance = new web3.eth.Contract(
    JSON.parse(MikopoFactory.interface),
    "0xcDbf43dC10E5F8963689B20026Dc9E0B94567e13"
  );

  let deployedMikopo = [];

  const accounts = await web3.eth.getAccounts();
  const out = await instance.methods.getDeployedMikopo().call({
    from: accounts[0],
  });
  deployedMikopo = out;

  for (let i = 0; i < deployedMikopo.length; i++) {
    // load mkopo for each one of address
    const mkopo = new web3.eth.Contract(
      JSON.parse(Mkopo.interface),
      deployedMikopo[i]
    );
    // After loading mkopo I should access abm stored..
    console.log("This is loaded Mkopo for you");
    const abm_length = await mkopo.methods
      .getAfterBorrowingMoneyLength()
      .call();
    console.log(
      "The abm length is " + abm_length + " for " + deployedMikopo[i]
    );

    for (let p = 0; p < abm_length; p++) {
      let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();
      // then from this abm access issued at....
      let issuedAt = abm["issuedAt"];
      let duration = abm["1"]["duration"];
      console.log(
        "We accessed isssued at of this abm which we can use it together with duration to calculate deadline"
      );
      console.log(issuedAt, duration);

      // Here we should have the condtio to check if the abm is already paid back or deleted..
      if (issuedAt == 0) {
        continue;
      } else {
        console.log("We might have some problem here!, Eminem Quote");
        let currentTimeSpan = new Date().getTime(); // remember this yield time in form of
        // seconds since epoch... Our block span is in milliseconds.. So to compare with this
        // we should times 1000 to our issuedAt;
        console.log("This is seconds of current time since epoch");
        console.log(currentTimeSpan, issuedAt);
        let net =
          parseInt(abm["issuedAt"]) * 1000 +
          parseInt(duration) * 24 * 60 * 60 * 1000;
        let dead = new Date(net);
        let deadline = dead.toDateString();
        console.log("THIS IS DEADLINE DATE FOR YOUR CONTRACT... " + deadline);
        console.log(
          "These below is seconds since epoch for current time and deadline..."
        );
        console.log(currentTimeSpan, net);

        // Naweka vise versa kwa sasa ili nitest madude kama yanafanya caz < instead of >
        if (parseInt(currentTimeSpan) > parseInt(net)) {
          console.log(
            "The deadline is already been passed, You failed to payback your debt!"
          );
          // Here I needed to user loaded mkopo and call failedToPayBack web3 blockchain method....
          // Usishangae blockchain kukupa time tofauti coz hii ni time taken for miner when he add the
          // block I think the timezone used is for that miner... For more ask how or which time zone of
          // the block.timestamp nahisi utapata majibu....
          console.log("This is acccount 1 for you " + accounts[0]);
          console.log("This is abm to be passed....");
          let createdAt = abm["deniDetail"]["madeAt"];
          console.log("This is created at for you!");
          console.log(createdAt);
          console.log(typeof createdAt);
          createdAt = parseInt(createdAt);
          console.log(typeof createdAt);

          // NAFINALIZE SHIDA EITHER IPO KWENYE SOLIDITY PIA VILEVILE WHY OBJECT FAILS TO BE ALTERED COZ HAPA NASET IWE
          // NA ARRAY YA INT BUT YENYEWE HAITAKI INABIDI UJUE NI KWA NINI COZ NAHISI SOLIDITY LOGICS ZINAKATAA COZ HII ARRAY
          // YETU TULIOPASS INASTORE NUMBER IN STRING INSTEAD OF INTEGER.... WHY.....   AU SHIDA IPO KWENYE SOLIDITY KWA KWELI
          // SIJUI KWA NINI INAFANYA HIVI.... Coz as you know we access abm from solidity so it has all valid data with it like
          // collateral assets but when i print in solidity all data are in form of string ... so why I faced this kind of error...

          // Sema sometimes naisi code zangu kwenye solidity zitakua na makosa
          try {
            await mkopo.methods.failedToPayBack(createdAt).send({
              from: accounts[0],
              gas: "10000000", // Ok nimekosea hii sio payable....
            });
            // Ikiprint hii line then no error if not then there is an error..
            console.log("I HAVE BEEN DELETED!");
          } catch (err) {
            console.log("This is error for you");
            console.log(err.message);
          }
        } else {
          console.log("You still have time to payback the debt!");
        }
      }
    }
  }
  provider.engine.stop();
}, 15000);
