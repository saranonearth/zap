import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import Zap from "../contracts/Zap.json";

const Dashboard = () => {
  const history = useHistory();
  const [state, setstate] = useState({
    accounts: null,
    web3: null,
    contract: null,
  });

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

  useEffect(() => {
    const address = window.ethereum.selectedAddress;

    if (address == null) {
      history.push("/");
    }
    setup();
  }, []);

  console.table(state);

  const getData = async () => {
    const { accounts, contract } = state;

    const response = await contract.methods.name().call();

    console.log(response);
    console.log("Hey from getData");
  };

  useEffect(() => {
    if (state.contract != null) {
      getData();
    }
  }, [state.contract]);

  return (
    <>
      <h1>Dashboard here</h1>
      <p>{window.ethereum.selectedAddress}</p>
      <p>value:</p>
    </>
  );
};

export default Dashboard;
