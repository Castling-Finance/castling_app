import './App.css';
import web3modal from "web3modal";
import {ethers} from "ethers";
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {providerOptions} from './providerOptions.js';
import { CardContent } from '@mui/material';
import { Divider } from '@mui/material';
import logo from './logo.png' 

function App() {

  const [web3Provider, setWeb3Provider] = useState(null);
  const [display, setdisplay] = useState(true);

  async function connectWallet(){
    try {
      let web3Modal = new web3modal({
        cacheProvider: true,
        providerOptions
      })
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);


      if(web3ModalProvider){
        setWeb3Provider(web3ModalProvider);
      }
      console.log(web3Provider);

    } catch (error) {
      console.log(error)
    }
  }

  async function setWithdraw(){
    setdisplay(false)
  }

  async function setDeposit(){
    setdisplay(true)
  }

  return ( 
    <div className="App">
      <div className='connect_wallet'>
      <div className='title'>
      <img src={logo} className='logo'></img>
       <p className='title_text'> Castling Finance </p>
      </div>
      {
        web3Provider == null ? (
          <button onClick={connectWallet} className="wallet">
            Connect Wallet
          </button>
        ):(
          <button className="wallet_connected">
            {web3Provider.provider.selectedAddress}
          </button>
        ) 
      }
      </div>

      <div className='cardHolder'>
      <Card className='card'>
      <CardActions className='cardInterface'>
      <button onClick={setDeposit} className="top_button">
            Deposit
      </button>
      <Divider orientation="vertical" flexItem />
      <button  onClick={setWithdraw} className="top_button">
            Withdraw
      </button>
      </CardActions>
      </Card>
{
  display == true ? (
  <CardContent className='depositContent'>
    Deposit Content
  </CardContent>
  ):(

  <CardContent className='withdrawContent'>
    Withdraw Content
  </CardContent>
  )
}
      </div>
    </div>
  );
}

export default App;
