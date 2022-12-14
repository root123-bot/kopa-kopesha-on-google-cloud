import React, {Component} from 'react';
import {Button, Container} from 'semantic-ui-react';
import Head from 'next/head';
import factory from '../Ethereum/factory';
import web3 from '../Ethereum/web3';
import Mkopo from '../Ethereum/mkopo';


class ClearFailedToPayBackContracts extends Component {
    state = {
        loading: false
    }

    onCheckFailedToPayback = async () => {
        await this.setState({loading: true});
        const accounts = await web3.eth.getAccounts();
        
        let deployed = await factory.methods.getDeployedMikopo().call();



        for (let i = 0; i < deployed.length; i++) {
            const mkopo = await Mkopo(deployed[i]);
            const abm_length = await mkopo.methods.getAfterBorrowingMoneyLength().call();

            for (let p = 0; p < abm_length; p++) {
                let abm = await mkopo.methods.ListOfAfterBorrowingMoney(p).call();

                
                let issuedAt = abm['issuedAt'];
                let duration = abm['1']['duration']
                console.log('We accessed isssued at of this abm which we can use it together with duration to calculate deadline')
                console.log(issuedAt, duration);

                if (issuedAt ==0) {
                    continue;
                }
                else {

                    console.log('We might have some problem here!, Eminem Quote');
                    let currentTimeSpan = new Date().getTime(); 
    
                    console.log('This is seconds of current time since epoch')
                    console.log(currentTimeSpan, issuedAt);
                    let net = (parseInt(abm['issuedAt']) * 1000) + (parseInt(duration) * 24 * 60 * 60 * 1000);
                    let dead = new Date(net)
                    let deadline = dead.toDateString();
                    console.log('THIS IS DEADLINE DATE FOR YOUR CONTRACT... ' +deadline);
                    console.log('These below is seconds since epoch for current time and deadline...')
                    console.log(currentTimeSpan, net);



                    
                    if (parseInt(currentTimeSpan) < parseInt(net)) {
                        console.log('The deadline is already been passed, You failed to payback your debt!');
                
                        console.log('This is acccount 1 for you '+accounts[0]);
                        console.log('This is abm to be passed....')
                        let createdAt = abm['deniDetail']['madeAt'];
                        console.log('This is created at for you!');
                        console.log(createdAt);
                        console.log(typeof createdAt);
                        createdAt = parseInt(createdAt);
                        console.log(typeof createdAt);


                        try {
                            await mkopo.methods.failedToPayBack(createdAt).send({
                                from: accounts[0],
                                gas: '10000000'   
                            })
                            console.log('I HAVE BEEN DELETED!')
                            let message = await mkopo.methods.message().call();

                            let CA = await mkopo.methods.getCA().call();
                            let ABM = await mkopo.methods.getABM().call();
                            let givenMeta = await mkopo.methods.urlList().call();
                            console.log('This is message for you all');
                            console.log(message)
                            console.log(CA);
                            console.log(ABM);
                            console.log(givenMeta);
                        }
                        catch(err) {
                            console.log('This is error for you')
                            console.log(err.message)
                        }
                        
                        
                    }
                    else {
                        console.log('You still have time to payback the debt!')
                    }
                }
            }
        }
        await this.setState({loading: false});
    }


    render() {
        return (

            <Container>

                <Head>
                    <title>Kopa | Lipa</title>
                    <link
                        rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"
                    />
                    <link
                        rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css">
                    </link>

                </Head>
                
                <h2>Click below button to clear failed to payBack Debts.</h2>
                <span>This will help us to test if our server code is wrong or good enough...</span>
                <Button loading={this.state.loading} primary onClick={this.onCheckFailedToPayback}>Clear</Button>
            </Container>
        )
    }
}


export default ClearFailedToPayBackContracts;