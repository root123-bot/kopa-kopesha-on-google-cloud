import React, {Component} from 'react';
import {Button, Container} from 'semantic-ui-react';
import Head from 'next/head';
import factory from '../../Ethereum/factory';
import web3 from '../../Ethereum/web3';

class ClearAddresses extends Component {
    state = {
        loading: ''
    }

    onDelete = async () => {
        this.setState({loading: true});
        // First load factory contract
        const accounts = await web3.eth.getAccounts();
        await factory.methods.clearListOfDeployedMikopo().send({
            from: accounts[0]
        })
        const mikopo = await factory.methods.getDeployedMikopo().call();
        console.log(mikopo)
        this.setState({loading: false});
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
                
                <h2>Click below button to clear all created addresses of Mikopo.</h2>
                <span>This will help us to clear the addresses instead of deploying another contract which make us faced an error and fatal bug without backup then we were nothing.</span>
                <Button loading={this.state.loading} primary onClick={this.onDelete}>Clear</Button>
            </Container>
        )
    }
}
export default ClearAddresses;