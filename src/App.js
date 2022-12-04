import './App.css';
import web3modal from "web3modal";
import {ethers} from "ethers";
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import {providerOptions} from './providerOptions.js';
import { CardContent } from '@mui/material';
import { Divider } from '@mui/material';
import logo from './logo.png';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Knight from './knight.png'

import USDC_logo from './usdc_logo.png';
import USDT_logo from './usdt_logo.png';
import DAI_logo from './dai_logo.png';

function App() {

  const [web3Provider, setWeb3Provider] = useState(null);
  const [display, setdisplay] = useState(true);
  const contract_address_1= "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B81"
  const contract_address_2= "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B82"
  const contract_address_3= "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B83"

  const [contract_address, setContract_Address] = useState(null);

  const handleContractChange = (event) => {
    setContract_Address(event.target.value);
  };

  const token_address_USDC = "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B84"
  const token_address_USDT = "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B85"
  const token_address_DAI = "0x0D80C4B7713Cb4a4A2A38c0F680f7e71d6524B86"

  const [token_address, setToken_Address] = useState(null);

  const handleTokenChange = (event) => {
    setToken_Address(event.target.value);
  };


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
      <img src={logo} className='logo' alt="logo"></img>
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
      <button onClick={setDeposit} className="top_button" style={{textDecoration: display === true ? 'underline': 'none'}}>
            Deposit
      </button>
      <Divider orientation="vertical" flexItem />
      <button  onClick={setWithdraw} className="top_button" style={{textDecoration: display === false ? 'underline': 'none'}}>
            Withdraw
      </button>
      </CardActions>
      {
  display === true ? (

    //Deposit Page
  <CardContent className='depositContent'>
    <Box className='deposit_pool'>
<FormControl fullWidth >
        <InputLabel >Deposit Pool</InputLabel>
        <Select
          value={contract_address}
          label="Contract"
          onChange={handleContractChange}
        >
          <MenuItem value={contract_address_1} >
            <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool I - Low Risk</p></div> </MenuItem>
          <MenuItem value={contract_address_2}>
          <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool II - Medium Risk</p></div> </MenuItem>
          <MenuItem value={contract_address_3}>
          <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool III - High Risk</p></div> </MenuItem>
        </Select>
      </FormControl> </Box>

      <Box className='deposit_token'>
<FormControl fullWidth >
        <InputLabel>Deposit Token</InputLabel>
        <Select
          value={token_address}
          label="Token"
          onChange={handleTokenChange}
        >
          <MenuItem value={token_address_USDC}>
            <div className='menu_item'><img src={USDC_logo} className='strategy_logo' alt="knight"></img>
            <p className='menu_text'> USDC</p></div>  </MenuItem>
          <MenuItem value={token_address_USDT}>
          <div className='menu_item'><img src={USDT_logo} className='strategy_logo' alt="knight"></img>
          <p className='menu_text'> USDT</p></div>  </MenuItem>
          <MenuItem value={token_address_DAI}>
          <div className='menu_item'><img src={DAI_logo} className='strategy_logo' alt="knight"></img>
            <p className='menu_text'> DAI</p></div> </MenuItem>
        </Select>

      </FormControl>

      <FormControl>
      <OutlinedInput placeholder="Deposit Amount" className='balance_text' type="number"/>
        <FormHelperText>Balance: 1000</FormHelperText>
      </FormControl>


       </Box>


      <FormControl>
      <button className='depositButton'>
        Make Deposit
      </button>
      </FormControl>
  </CardContent>
  ):(

//Withdraw Page

<CardContent className='depositContent'>
    <Box className='deposit_pool'>
<FormControl fullWidth >
        <InputLabel >Withdraw Pool</InputLabel>
        <Select
          value={contract_address}
          label="Contract"
          onChange={handleContractChange}
        >
          <MenuItem value={contract_address_1} >
            <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool I - Low Risk</p></div> </MenuItem>
          <MenuItem value={contract_address_2}>
          <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool II - Medium Risk</p></div> </MenuItem>
          <MenuItem value={contract_address_3}>
          <div className='menu_item'><img src={Knight} className='strategy_logo' alt="knight"></img>
            <p>Knight Pool III - High Risk</p></div> </MenuItem>
        </Select>
      </FormControl> </Box>


      <FormControl>
      <OutlinedInput placeholder="Withdrawal Amount" className='balance_text' type="number"/>
        <FormHelperText>Balance: 1000</FormHelperText>
      </FormControl>

      <Box className='deposit_token'>
<FormControl fullWidth >
        <InputLabel>Withdraw Token</InputLabel>
        <Select
          value={token_address}
          label="Token"
          onChange={handleTokenChange}
        >
          <MenuItem value={token_address_USDC}>
            <div className='menu_item'><img src={USDC_logo} className='strategy_logo' alt="knight"></img>
            <p className='menu_text'> USDC</p></div>  </MenuItem>
          <MenuItem value={token_address_USDT}>
          <div className='menu_item'><img src={USDT_logo} className='strategy_logo' alt="knight"></img>
          <p className='menu_text'> USDT</p></div>  </MenuItem>
          <MenuItem value={token_address_DAI}>
          <div className='menu_item'><img src={DAI_logo} className='strategy_logo' alt="knight"></img>
            <p className='menu_text'> DAI</p></div> </MenuItem>
        </Select>

      </FormControl>



       </Box>


      <FormControl>
      <button className='depositButton'>
        Make Withdrawal
      </button>
      </FormControl>
  </CardContent>
  )
}


      </Card>
      </div>
    </div>
  );
}

export default App;
