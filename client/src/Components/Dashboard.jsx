import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import Zap from "../contracts/Zap.json";
import { ipfs, urlSource, globSource } from "../ipfs.util";

const Dashboard = () => {
  const history = useHistory();
  const [state, setstate] = useState({
    accounts: null,
    web3: null,
    contract: null,
    buffer: null,
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

  //Function to fetch all files of the logged in user.
  const getData = async () => {
    const { accounts, contract } = state;

    const response = await contract.methods.name().call();
    console.log(response);
    // console.log("Hey from getData");
  };
  const submit = async () => {
    console.log("UPLOADING TO IPFS", state.buffer);

    try {
      console.log("fdgdfg");
      const res = await ipfs.add(state.buffer);
      console.log(res);
      console.log("HERE");
    } catch (error) {
      console.log("ERROR IPFS", error);
    }
  };
  const uploadFile = (e) => {
    let buffer;
    let type;
    let name;
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      buffer = Buffer(reader.result);
      type = file.type;
      name = file.name;

      console.log("buffer", buffer);
      console.log("type", type);
      console.log("name", name);

      setstate({
        ...state,
        buffer,
      });
    };
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
      <input
        type="file"
        onChange={uploadFile}
        className="text-white text-monospace"
      />
      <button onClick={submit}>upload</button>
    </>
  );
};

export default Dashboard;
