import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import Footer from "./Footer";

const Home = () => {
  const [isConnected, setConnected] = useState(null);
  let [web3, setWeb3] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const currentAddress = window.ethereum.selectedAddress;
    if (currentAddress) {
      setConnected(true);
      history.push("/dashboard");
    } else {
      setConnected(false);
    }
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
    return (
      <div className="home">
        <div className="bar"></div>
        <div className="mainholder">
          <div className="title">
            <i className="fas fa-project-diagram"></i> Zap
          </div>
          <div className="sub-text">Decentralized file storage platform.</div>
          <button className="login-btn" onClick={authHandler}>
            Login with Metamask
          </button>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Home;
