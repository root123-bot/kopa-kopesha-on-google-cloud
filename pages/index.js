import React, { Component } from "react";
import styles from "../static/css/start.module.css";
import Layout from "../components/navBar";
import { Grid, Button, Segment, Icon, Card, Image } from "semantic-ui-react";
import Link from "next/link";
import factory from "../Ethereum/factory.js";
import Mkopo from "../Ethereum/mkopo";
import moment from "moment";
import web3 from "../Ethereum/web3";
import { Router } from "../routes";

class MikopoIndex extends Component {
  state = {
    bigData: [],
    imageSrc: [],
    lendMeLoading: false,
  };

  constructor(props) {
    super(props);
    this.toPopUp = React.createRef();
    this.toDemish = React.createRef();
  }

  static async getInitialProps(props) {
    // First after the component mount then you need to fetch all deployed contract a
    // address from factory...
    const deployedConntractAddresses = await factory.methods
      .getDeployedMikopo()
      .call();
    console.log("This is deployed contracts addresses...");
    console.log(deployedConntractAddresses);
    // then load all mikopo and access from it the struct of DeniDetails..
    let addressDeniDetails = [];
    let bunchOfDeniStruct = [];
    console.log(addressDeniDetails);

    for (let i = 0; i < deployedConntractAddresses.length; i++) {
      const myMkopo = await Mkopo(deployedConntractAddresses[i]);
      const lengthOfDeniArray = await myMkopo.methods
        .lengthOfDeniDetailsRequest()
        .call();
      if (lengthOfDeniArray > 0) {
        for (let z = 0; z < lengthOfDeniArray; z++) {
          let givenStruct = await myMkopo.methods.deniDetailsList(z).call();

          let accessedArrayCollateral = await myMkopo.methods
            .accessingCollateralAssets(givenStruct.madeAt)
            .call();
          console.log("This is accessed collateral");
          console.log(givenStruct);
          console.log(accessedArrayCollateral);
          // Hapa nataka niifanye i-avoid hiyo index kama kutakua no struct data means object is zero... deleted..
          // Ko I should have if here....
          if (parseInt(givenStruct.madeAt) === 0) {
            // If block timestamp is zero then its indication of it's has been deleted..
            // if that is the case then continue to another loop
            continue;
          } else {
            if (accessedArrayCollateral.length > 0) {
              // There some condition where by the user can put two or three collateral assets...
              let imgSrc = [];
              for (let i = 0; i < accessedArrayCollateral.length; i++) {
                // the aim of this for loop is to add image src to the imgSrc array above...
                let index = accessedArrayCollateral[i];
                // Then if you have that index it will become easy for you to access metadata url from blockchain..
                // Hapa nftData to give u url it needs you to pass the address of the owner by default the owner of
                // nft data is the one added or need loan since its the one which own the assets for now..
                let metadata_url = await myMkopo.methods
                  .nftData(parseInt(index), givenStruct.borrower)
                  .call();
                console.log("This is the metadata url");
                console.log(metadata_url);
                // From metadata url convert it to json then get the image attribute from it
                // From this metadata url fetch data
                let response = await fetch(metadata_url);
                // Response status its always ok since its already been tested..
                let data = await response.json();
                console.log(data.image);
                imgSrc.push(data.image);
              }
              givenStruct["src"] = imgSrc[0]; // Remember even if the user has many images we only take the first one
              console.log(givenStruct["src"]);
              givenStruct["allSrc"] = imgSrc;
              console.log("These are image src for you!");
              console.log(imgSrc);
            } else {
              // Inakuja huku coz collateral assets is [].. Hii pia ipo sawa upande ambao kutakuwa na mtu ameshamkopesha jamaa...
              givenStruct["src"] = "";
              givenStruct["allSrc"] = [];
            }

            givenStruct["CA"] = deployedConntractAddresses[i];
            givenStruct["collateral"] = accessedArrayCollateral;
            bunchOfDeniStruct.push(givenStruct);
          }
        }
        addressDeniDetails.push(bunchOfDeniStruct);
      }
    }
    // so now I will have a object contraining key and arrays...
    return { address: bunchOfDeniStruct };
  }

  // NOW IMEKUBALI ILA ISHU IPO KUWA YENYEWE KU-RETURN OBJECT HAITAKI.. HAIJUII...
  // the setInterval() and setTimeout() is executed by default... without being called, so kulikua hamna ulazima wa ku-store
  // it in checkAll.... variable coz its been executed without being called.... Hivyo tu mkali...
  // UZURI WA SETINTERVAL METHOD IS GET EXECUTED EVEN WITHOUT BEING CALLED.. SO HATA HII VARIABLE YA checkAllAfterBorrowing.... tukiitoa
  // yenyewe itaendelea kufanya kazi tu as long the script or codes is alive....
  /*
    checkAllAfterBorrowingMoneyIfDueDateHasBeenPassed = setInterval(() => {
        console.log('Hey pasko im executing everytime after 2 minutes');
        // when using new Date().getTime(); it returns milliseconds since epoch so no need to times it with 1000 since its milliseconds..
        let date = new Date().getTime();
        console.log('This is milliseconds to date since epoch for you '+date)
        // KUPITIA HII METHOD KUNA ISSUE ZINAWEZA ZIKA-RISE... UJUE KABISA KAMA HII INAKUWA RUN WHEN THE USER... ANY USER VISIT THE HOMEPAGE THEN
        // TO EXECUTE ALL LOGICS AND TO CALL FAILED TO PAYBACK NEED USER/CURRENT USER TO BE CHARGED WITH GAS FOR  THIS ISSUE.... HII HAIPO FAIR COZ 
        // PIA USER ANAWEZA AKAKATAA... KO THIS IS BAD HABIT WHAT I WANT YOU TO DO IS TO CREATE ANOTHER SCRIPT FILE WHICH WILL BE ALIVE AND CALLED 
        // BY ACCOUNT ONE NOT IN BROWSER SO WHAT I NEED YOU TO DO IS ON STARTING OF SERVER YOU SHOULD RUN THIS SCRIPT THIS IS ALL WE CAN DO.. TO AVOID 
        // THIS AMBIGUITY KAMA HUJUI HOW TO GET STARTED SEE IN deploy.js HOW ACCOUNT GET CALLED BY SERVER AND NOT CLIENT/BROWSER AND DEPLOY THE CONTRACT...
        // SO HII FUNCTION KUIWEKA HAPA KWENYE BROWSER NI MAKOSA SO CREATE ANOTHER SCRIPT AND EXECUTE IT USING 'node checkDate.js' KO NAONA HAPA UMEONA UTOFAUTI
        // IN BROWSER WE USE npm run dev while in SERVER WE USE node.js... REMEMBER NODE.JS IS SERVER SIDE  THAT'S ALL PASKO....
    }, 1000);
    */
  lendme = async (e) => {
    await this.setState({
      lendMeLoading: true,
    });
    // This method on being called it should sent the amount of ether to borrower..
    // i to send these money I should have data such as Borrower address and amount he want
    e.preventDefault;
    console.log(e.target.name, e.target.value, e.target.title);
    // so let's see how we can lend this guy money..... call callNamkopesha this will complete all actions... But hapa kuna swali hii
    // amount to send we pass where... Ok nahisi hata kwenye call({from:_____, value: }) Nahisi kitu kama hichi kinawezekana... So don't
    // worry much...... There two important information to have here so as to proceed with our mission which are contract address and
    // value to send....

    const mkopo = await Mkopo(e.target.name);
    const borrower = await mkopo.methods.owner().call();
    console.log(borrower, " the borrower"); // this is borrower
    const accounts = await web3.eth.getAccounts();
    // After loading the contract then we can call method of namkopesha
    const moneyToSendInWei = await web3.utils.toWei(e.target.value, "ether");
    console.log(moneyToSendInWei);
    // Jinsi ya ku-pass hii deniDetails ni vipi kwani... Kwanza use the array which store them then from there import the one
    // with timestamp of that we pass here...
    const DDLength = await mkopo.methods.lengthOfDeniDetailsRequest().call();

    let DDToPass; // there is two deniRequest detail i thinkkk... then what... Kwa nn ya mwsho inakubali ila ya kwanza inaenda kwa zote
    for (let i = 0; i < DDLength; i++) {
      // From ehere check all of them if there is one
      let save = await mkopo.methods.deniDetailsList(i).call();
      if (parseInt(save.madeAt) === parseInt(e.target.title)) {
        console.log("I have got you!!!!");
        DDToPass = save;
      } else {
        console.log("Im outside...");
        continue;
      }
    }
    console.log("This is ddToPass for you!");
    console.log(DDToPass);

    // Naona kuna ugumu ku-pass struct nzima ni ngumu itakua ngumu sana labda hapa ni-iweke contract yangu sawa iwe ina-pass
    // madeAt integer since it's unique for each DeniDetail from there inside our Struct of ABM we should store only this madeAt
    // where we can use it later to Query the DeniDetail nahisi  HII NDO COUNTER MEASURE..
    // AU COZ HII INA-COMPLICATE KUWA MBONA SIIONI collateral Asset array pia kuna attribute zingine zimejiongeza hapa kama hizi
    // number 0, 1, 2, 3... Cha Kufanya sasa embu zifute then add collateralAssets key..
    delete DDToPass["0"];
    delete DDToPass["1"];
    delete DDToPass["2"];
    delete DDToPass["3"];
    // Use mapping to get the collateral Assets Array
    const collateral = await mkopo.methods
      .accessingCollateralAssets(parseInt(e.target.title))
      .call();
    const correctFormatCollateral = collateral.map((value, index) => {
      return parseInt(value);
    });
    console.log(correctFormatCollateral);
    DDToPass["collateralAssets"] = correctFormatCollateral;
    console.log(DDToPass); // Kumbuka borrower ni yule yule hapa

    // MPAKA HAPA IMEKUBALI KU-PASS.. ISHU IPO HAPA KWENYE KU-CALL callNamkopesha Nashangaa hai-return chochote nimejaribu
    // ku-print iyo output inareturn empty object { } sa sijui ina maana gani.. Sijajua if alifanikiwa ku-mcall namkopesha payable
    // method pia cijajua kama namkopesha if get called imetengeneza AfterBorrowingMoney Struct... Nahisi niishie hapa kesho nitakuja
    // kuendelea from here.... ........ Au labda call haipokei arguments of from and value maybe...
    ////  THIS IS TOMMORRO STARTING POINT ******************************... KESHO CHA KUANGALIA NI DOCUMENTATION OF THIS CALL METHOD...
    // AU EMBU JARIBU KUWEKA .send() uone.... OK NISHAJUA WHENEVER YOU SEND MONEY PAYABLE YOU SHOULD USE .send() alafu embu angalia usenge
    // wa delete ima-acha gepu kule .... Inabidi hii deniDetails iwe haipo kabisa yenyewe imeipa 0... Ko KESHO BASI KAZI YETU NI KUI-WEKA VIZURI
    // PIA KAZI YETU NYINGINE NI KU-DEAL NA ZILE TABLES OF claims and Debts in Profile... Ko kwenye account1 coz amekopesha hadaiwi then kwake inabidi
    // kuwe na claims ila Kwenye account3 coz kakopesha ka-receive 2 ether kwake inabidi kuwe na Debts pia usisahau ukishaziweka sawa inabid u-redirect
    // user to the Profile to view these changes... Pia usisahau kuangalia kama hizi assets kweli zimekuwa locked... Inabidi uzi-display kwa user as locked.
    // Hivyo ndo vitu vya kufanay kesha............
    console.log("This is borrower address from DeniDetails");
    console.log(DDToPass.borrower); // Huyu ni borrower mwingine...
    console.log("Lets put the end of this shit...");
    let output = await mkopo.methods.callNamkopesha(DDToPass, borrower).send({
      from: accounts[0],
      value: moneyToSendInWei,
    });
    console.log("This is the output for you!");
    console.log(output);

    Router.pushRoute("/profile/");
  };

  onClick = async () => {
    console.log("The above is returned value");
    const deployedConntractAddresses = await factory.methods
      .getDeployedMikopo()
      .call();
    console.log(deployedConntractAddresses);
    // then load all mikopo and access from it the struct of DeniDetails..
    let addressDeniDetails = [];
    let bunchOfDeniStruct = [];
    for (let i = 0; i < deployedConntractAddresses.length; i++) {
      const myMkopo = await Mkopo(deployedConntractAddresses[i]);
      const lengthOfDeniArray = await myMkopo.methods
        .lengthOfDeniDetailsRequest()
        .call();
      if (lengthOfDeniArray > 0) {
        for (let z = 0; z < lengthOfDeniArray; z++) {
          let givenStruct = await myMkopo.methods.deniDetailsList(z).call();
          bunchOfDeniStruct.push(givenStruct);
        }
        addressDeniDetails.push(bunchOfDeniStruct);
      }
    }
    console.log("below is address deni details");
    console.log(addressDeniDetails);
  };

  showAssets = async (e) => {
    e.preventDefault();
    let value = e.target.name;
    // By default data passed in the html element is of string data type...
    let goodArray = value.split(","); // this will convert string and split it in array...
    console.log("Maybe this will yield an array");
    console.log(goodArray);
    console.log(typeof goodArray);
    await this.setState({
      imageSrc: goodArray,
    });
    this.toDemish.current.style.display = "none";
    this.toPopUp.current.style.display = "block";
  };

  onRemove = async (e) => {
    this.toPopUp.current.style.display = "none";
    this.toDemish.current.style.display = "block";
  };

  render() {
    if (this.props.address.length > 0) {
      return (
        <section>
          <Layout />
          <div className={styles.st} ref={this.toDemish}>
            <p>Lend me and earn more... 5% of interest is earned..</p>
            <Grid>
              <Grid.Column width={12}>
                <Segment>
                  <Card.Group itemsPerRow={3}>
                    {this.props.address.map((value, key) => {
                      return (
                        <Card key={key}>
                          <Image src={value["src"]} wrapped ui={false} />
                          <Card.Content>
                            <Card.Header className={styles.hid}>
                              <span className={styles.oh}>
                                CA: {value["CA"]}
                              </span>
                            </Card.Header>
                            <Card.Meta>Amount in Ether: {value[0]}</Card.Meta>
                            <Card.Meta>Duration in Days: {value[2]}</Card.Meta>

                            <Card.Meta className={styles.hid}>
                              <span className={styles.oh}>BA: {value[1]}</span>
                            </Card.Meta>

                            <Card.Description>
                              Collateral assets:{" "}
                              <span className={styles.val}>
                                ({value["allSrc"].length})
                              </span>{" "}
                              <a
                                style={{ color: "rgb(67, 168, 222)" }}
                                name={value["allSrc"]}
                                onClick={this.showAssets}
                              >
                                View
                              </a>
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <Button
                              content="Lend me"
                              title={value[3]}
                              name={value["CA"]}
                              value={value[0]}
                              onClick={this.lendme}
                            />
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </Card.Group>
                </Segment>
              </Grid.Column>

              <Grid.Column width={4}>
                <Segment>
                  <span className={styles.spt}>
                    Need loan
                    <Icon name="question" />
                  </span>
                  <hr /> Each loan will include the 5% of interest as Payback.
                  Click the button below to Get started..
                  <br /> <br />
                  <Link href="/profile/">
                    <Button content="Get Started" primary />
                  </Link>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>

          <div className={styles.prv} ref={this.toPopUp}>
            <div
              className={styles.closeBtn}
              ref={this.closeBtn}
              onClick={this.onRemove}
            >
              &times;
            </div>
            {/* here we should map the all images.. so how do we achieve this... ok on click view link we should be able to send the givenStruct['allSrc'] this will helps us to render these images... */}
            {this.state.imageSrc.map((value, key) => {
              return (
                <img
                  key={key}
                  src={value}
                  width={800}
                  height={800}
                  wrapped
                  ui={true}
                  className={styles.ig}
                />
              );
            })}
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <Layout />
          <div className={styles.st}>
            <p>Lend me and earn more... 5% of interest is earned..</p>
            <Grid>
              <Grid.Column width={12}>
                <Segment>
                  <p className={styles.ti}>
                    It's seem today we all rich, No one need to lend money..
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column width={4}>
                <Segment>
                  <span className={styles.spt}>
                    Need loan
                    <Icon name="question" />
                  </span>
                  <hr /> Each loan will include the 5% of interest as Payback.
                  Click the button below to Get started..
                  <br /> <br />
                  <Link href="/profile/">
                    <Button content="Get Started" primary />
                  </Link>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </section>
      );
    }
  }
}
export default MikopoIndex;
