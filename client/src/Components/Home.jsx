import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";

const Home = () => {
  const [isConnected, setConnected] = useState(null);
  let [web3, setWeb3] = useState(null);

  const history = useHistory();

  useEffect(() => {
    window.addEventListener("load", () => {
      const currentAddress = window.ethereum.selectedAddress;
      if (currentAddress) {
        setConnected(true);
        history.push("/dashboard");
      } else {
        setConnected(false);
      }
    });
  });

  const authHandler = async () => {
    try {
      web3 = await getWeb3();
      //CHANGE STATE OF WEB3 OBJECT
      setWeb3(web3);

      history.push("/dashboard");
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  if (isConnected === null || isConnected === true) {
    return <h1>Connecting...</h1>;
  } else if (isConnected === false) {
    return <button onClick={authHandler}>Login with metamask</button>;
  }
};

export default Home;
