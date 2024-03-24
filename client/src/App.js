import abi from "./artifacts/contracts/Payment.sol/Payment.json";

import "./App.css";

import { useState, useRef } from "react";

const { ethers } = require("ethers");

function App() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const amountRef = useRef();
  const accountRef = useRef();

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    setContract(contract);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const transaction = await contract.sendEther(accountRef.current.value, {
        value: ethers.parseEther(amountRef.current.value),
      });
      await transaction.wait();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <p>Connected Account : {account}</p>
      )}
      <form onSubmit={submitFormHandler}>
        <div className="input-group">
          <label for="address">Reciever Address :</label>
          <input
            placeholder="Address"
            ref={accountRef}
            name="address"
            id="address"
          />
        </div>
        <div className="input-group">
          <label for="amount">Amount :</label>
          <input
            type="number"
            placeholder="Amount"
            ref={amountRef}
            name="amount"
            id="amount"
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
