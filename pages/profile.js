import React, { Component } from "react";
import NavBar from "../components/navBar";
import styles from "../static/css/profile.module.css";
import { Button, Message } from "semantic-ui-react";
import Web3 from "web3";
import { Router } from "../routes";

class Profile extends Component {
  state = {
    loading: false,
    errorMessage: "",
  };

  // SOMETIMES HIZI BROWSER ZINASUMBUA KU-LOAD METAMASK OBJECTS SO IN ORDER
  // FOR YOU TO DETECT THAT SEE IN CONSOLE F12 OF THE BROWSER AND REFRESH ONCE
  // THEN EVERYING IS GOOD... BY REFRESHING PAGES ONCE EVERYTHING WILL WORK WELL
  // HII IPO KOTEKOTE KWENYE FIREFOX NA CHROME PIA...
  onConnect = async () => {
    this.setState({ loading: true });
    let web3;
    let accounts;
    try {
      if (typeof window !== "undefined" && window.ethereum !== "undefined") {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // this above await is the one used to wait for user to unlock account by requesting connection
        // without this we're nothing pasco...ANGALAU UMEVUKO MTIHANI WA KWANZA...
        web3 = new Web3(window.ethereum);
      } else {
        const provider = new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/967ec8c304ff48c4a593c04832ea452c"
        );
        web3 = new Web3(provider);
      }
      console.log(accounts);
      let address = accounts[0];
      Router.pushRoute(`/profile/${address}`);
    } catch (err) {
      console.log(err.message);
      this.setState({ errorMessage: err.message });
    }
    //this.setState( {loading: false} );
  };

  render() {
    return (
      <div>
        <NavBar />
        <section className={styles.sStyles}>
          <p className={styles.title}>Connect your wallet.</p>
          <span className={styles.sp}>
            At the moment we only provide support of connecting to Metamask
            wallet, we'll extends to other wallets in future. Connect your
            wallet to proceed <br />
            to your profile.
          </span>
          <div className={styles.walletDiv}>
            <img
              src="/static/images/metamask.png"
              alt="metamask-icon"
              height={40}
              width={40}
              className={styles.mIcon}
              title="Metamask icon"
            />
            <span className={styles.mt}>Metamask</span>
            <span className={styles.cB}>
              <Button
                primary
                size="mini"
                onClick={this.onConnect}
                loading={this.state.loading}
              >
                connect
              </Button>
            </span>
          </div>
        </section>
        <p className={styles.err}>{this.state.errorMessage} </p>
      </div>
    );
  }
}
export default Profile;
