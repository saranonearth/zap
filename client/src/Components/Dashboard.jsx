import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import Zap from "../contracts/Zap.json";
import { ipfs } from "../ipfs.util";
import { createBuffer } from "../utilities";

const Dashboard = () => {
  const history = useHistory();
  const [state, setstate] = useState({
    accounts: null,
    web3: null,
    contract: null,
    buffer: null,
    type: null,
    name: null,
    ipfsError: null,
  });

  useEffect(() => {
    if (state.contract != null) {
      getData();
    }
  }, [state.contract]);

  useEffect(() => {
    const address = window.ethereum.selectedAddress;

    if (address == null) {
      history.push("/");
    }
    setup();
  }, []);

  const setup = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Zap.networks[networkId];

      const instance = new web3.eth.Contract(
        Zap.abi,
        deployedNetwork && deployedNetwork.address
      );

      setstate({
        ...state,
        contract: instance,
        accounts,
        web3,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const { accounts, contract } = state;

    const response = await contract.methods.name().call();
    console.log(response);
  };

  const handleSubmit = async () => {
    try {
      const res = await ipfs.add(state.buffer);
      console.log(res);
    } catch (error) {
      setstate({
        ...state,
        ipfsError: "Upload Error",
      });
      console.log("ERROR IPFS", error);
    }
  };

  const handleOnChange = (e) => {
    const { buffer, type, name } = createBuffer(e);
    setstate({
      ...state,
      buffer,
      type,
      name,
    });
  };

  return (
    <>
      <h1>Dashboard here</h1>
      <p>{window.ethereum.selectedAddress}</p>
      <p>value:</p>
      <input type="file" onChange={handleOnChange} />
      <button onClick={handleSubmit}>upload</button>
    </>
  );
};

export default Dashboard;
