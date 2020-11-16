import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import Zap from "../contracts/Zap.json";
import { ipfs } from "../ipfs.util";
import { createBuffer } from "../utilities";
import styled from "styled-components";
import Blockies from "react-blockies";
import Footer from "./Footer";
import { Bar } from "./Styles";
import Popover from "react-awesome-popover";
import ProgressBar from "./ProgressBar";

const readings = [
  {
    name: "pdf",
    value: 60,
    color: "#4818a9",
  },
  {
    name: "jpeg",
    value: 10,
    color: "#5e299a",
  },
  {
    name: "others",
    value: 30,
    color: "#6a4cb0",
  },
];

const Wrapper = styled.div`
  text-align: center;
`;

const Light = styled.span`
  font-weight: 200;
  font-size: 0.6em;
`;

const Container = styled.div`
  width: 75%;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 2em;
  font-weight: 600;
  color: rgba(77, 1, 180, 1);
`;
const FileUpload = styled.div`
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  transition: 0.5s;
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );

  color: white;
  padding: 30px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  position: fixed;
  right: 3%;
  bottom: 5%;
`;

const TopBar = styled.div`
  width: 100%;

  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  height: 150px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Account = styled.div`
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );
  height: 150px;
  width: 30%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
`;
const Flex = styled.div`
  display: flex;
  padding: 10px 40px;
  color: #893ec5;
  font-weight: 700;
  font-size: 1.5em;
  justify-content: space-between;
`;
const White = styled.p`
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const Holder = styled.div`
  width: 30%;
`;

const SearchHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 1.5em;
  font-weight: 600;
`;
const SmallButton = styled.div`
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );
  transition: 0.5s;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.6em;
  font-weight: 500;
  color: #f2e3ff;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Align = styled.div`
  margin: 25px;
  display: flex;
  margin-left: 45px;
`;
const FileList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const File = styled.div`
  width: 300px;
  margin: 15px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid #b487d9;
`;

const Dashboard = () => {
  const hiddenFileInput = useRef();
  const history = useHistory();

  const [state, setstate] = useState({
    accounts: null,
    web3: null,
    contract: null,
    buffer: null,
    type: null,
    name: null,
    ipfsError: null,
    loading: false,
  });

  useEffect(() => {
    const address = window.ethereum.selectedAddress;
    console.log(address);
    if (address === null) {
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
    console.log("IPFS UPLOAD");
    console.log(state.buffer);
    setstate({
      ...state,
      loading: true,
    });

    try {
      const res = await ipfs.add(state.buffer);
      console.log(res);

      setstate({
        ...state,
        buffer: null,
        name: null,
        type: null,
        loading: false,
      });
    } catch (error) {
      setstate({
        ...state,
        ipfsError: "Upload Error",
        loading: false,
      });
      console.log("ERROR IPFS", error);
    }
  };

  const handleOnChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, file.type, file.name);
  };
  const convertToBuffer = async (reader, type, name) => {
    const buffer = await Buffer.from(reader.result);

    console.log(buffer, type, name);

    setstate({
      ...state,
      buffer,
      type,
      name,
    });
  };

  return (
    <div>
      <Bar>
        <Flex>
          <div>
            <p>
              <i className="fas fa-project-diagram"></i> Zap |{" "}
              <Light> Decentralized file storage platform. </Light>
            </p>
          </div>
          <div>
            <SmallButton
              onClick={() =>
                window.open(
                  `https://etherscan.io/address/${window.ethereum.selectedAddress}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <p>Etherscan</p>
            </SmallButton>
          </div>
        </Flex>
      </Bar>
      <Wrapper></Wrapper>

      <input
        style={{ display: "none" }}
        ref={hiddenFileInput}
        type="file"
        onChange={handleOnChange}
      />

      <FileUpload>
        {state.loading ? (
          <div>
            <i class="fas fa-hourglass-half"></i>
          </div>
        ) : !state.buffer ? (
          <div onClick={() => hiddenFileInput.current.click()}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
        ) : (
          <div onClick={() => handleSubmit()}>
            <i className="fa fa-upload" aria-hidden="true"></i>
          </div>
        )}
      </FileUpload>
      <Container>
        <TopBar>
          <Account>
            <Align>
              <div>
                <Blockies
                  seed={window.ethereum.selectedAddress}
                  size={10}
                  scale={10}
                  color="#dfe"
                  bgcolor="#aaa"
                  className="identicon"
                  spotcolor="#000"
                />
              </div>
              <AlignCenter>
                <Popover action="hover" overlayColor="rgba(0,0,0,0)">
                  <div>
                    <White>
                      {window.ethereum.selectedAddress &&
                        window.ethereum.selectedAddress.substr(0, 6) +
                          "..." +
                          window.ethereum.selectedAddress.substr(37, 42)}
                    </White>
                  </div>
                  <div className="sm">
                    <White>{window.ethereum.selectedAddress}</White>
                  </div>
                </Popover>
              </AlignCenter>
            </Align>
          </Account>

          <Holder className="flex center">
            <Align className="v-center">
              <div>
                <div className="md display">
                  <i className="fas fa-file md-v"></i> <p>16 files</p>
                </div>
              </div>
            </Align>
            <Align className="v-center">
              <div>
                <div className="md display">
                  <i className="fas fa-clock md-v"></i>
                  <p>Last uploaded yesterday</p>
                </div>
              </div>
            </Align>
          </Holder>
          <Holder>
            <ProgressBar readings={readings} />
          </Holder>
        </TopBar>
        <SearchHolder>
          <div>
            {" "}
            <Heading>Files</Heading>
          </div>
          <div className="flex ">
            <div className="sort">
              <div>
                <i className="far fa-calendar-alt"></i>
              </div>
            </div>
            <div>
              <input type="text" className="search" placeholder="Search" />
            </div>
          </div>
        </SearchHolder>

        <FileList>
          <File>
            <div className="file-content">
              <div className="part-top">
                <div>
                  <i className="far fa-image file-icon"></i>
                </div>
              </div>
              <div className="part-bottom flex">
                <div className="ml-2 w-sm">
                  <p>
                    <i className="fas fa-download primary"></i>
                  </p>
                </div>
                <div className="center w-lg">
                  <p>File Name</p>
                </div>
              </div>
            </div>
          </File>
        </FileList>
      </Container>

      <Footer />
    </div>
  );
};

export default Dashboard;
