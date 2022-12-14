import web3 from './web3';
import Mkopo from './source/Mkopo.json';

export default(address) => {
    return new web3.eth.Contract(
        JSON.parse(Mkopo.interface),
        address
    )
}