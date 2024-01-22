import { InfuraProvider, Provider, ethers } from "ethers";
import { useEffect, useState } from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import Error from './components/Error';
import Home from './components/Home';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function App() {
  const SEPOLIA_CHAIN_ID = 11155111;
  const infuraProvider = new ethers.InfuraProvider("sepolia" , process.env.INFURA_API_KEY);

  const [provider, setProvider] = useState<Provider>(infuraProvider);
  const [signer, setSigner] = useState<string>("")
  const [balance, setBalance] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  
  useEffect(() => {
    connectWallet();

    //Events
    window.ethereum.on('chainChanged', handleChanges);
    window.ethereum.on('accountsChanged', handleChanges);
  }, []);

  async function connectWallet() {
    if(window.ethereum){
      try{
        let provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.getSigner().then((signer) => {
          setSigner(signer.address);
          setAccountBalance(provider, signer.address);
          setChainId(parseInt(window.ethereum.chainId));
        })
      } catch {
        setSigner("");
        setBalance("");
        console.log("Error retrieving BrowserProvider");
      }
    } else {
      console.error('Browser Provider not available: install Metamask extension on your browser');
      // let provider = new ethers.InfuraProvider("sepolia" , process.env.INFURA_API_KEY);
      // setProvider(provider);
    }
  }

  const handleChanges = async () => {
    console.log(window.ethereum.chainId);
    window.location.reload();
  };

  function setAccountBalance(provider: Provider, signer: string){
    if(provider && signer){
      provider.getBalance(signer).then((balance: bigint) => {
        let bal: number = parseFloat(ethers.formatEther(balance));
        console.log("balance available: " + bal + " ETH");
        setBalance(bal.toFixed(4));
      });
    }
  }

  return (
    <div className="App">
      <ButtonAppBar
        provider={provider}
        signer={signer}
        balance={balance}
        connectWallet={connectWallet}
      />
    { signer ? 
    <>
      { chainId === SEPOLIA_CHAIN_ID ?
      <Home 
        chainId={chainId} 
        signer={signer} 
        provider={provider}
        />
      :
      <Error errorMessage={"SP"}/>
      }
    </>
    :
    <>
     <Error errorMessage={"WL"}/>
    </>}
    </div>
  );
}

