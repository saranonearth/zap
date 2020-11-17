import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Popover from "react-awesome-popover";
import Blockies from "react-blockies";

import getWeb3 from "../getWeb3";
import Zap from "../contracts/Zap.json";
import { ipfs } from "../ipfs.util";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import { readings, generateUID } from "../utilities";
import {
  Wrapper,
  Light,
  Container,
  Heading,
  FileUpload,
  TopBar,
  Account,
  Flex,
  White,
  Bar,
  Holder,
  SearchHolder,
  AlignCenter,
  SmallButton,
  Align,
  FileList,
  File,
} from "../Styles";

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

  const [fileData, setFiles] = useState({
    files: [],
  });

  useEffect(() => {
    const address = window.ethereum.selectedAddress;

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

  useEffect(() => {
    getData();
  }, [state.contract]);

  const cancelUpload = () => {
    console.log("cancel upload");
    setstate({
      ...state,
      buffer: null,
      name: null,
      type: null,
    });
  };
  const getData = async () => {
    const { accounts, contract } = state;
    if (contract) {
      const filesCount = await contract.methods.getCount().call();
      console.log(generateUID());
      console.log("FILECOUNT", filesCount);

      let files = [];

      for (var fileIndex = 0; fileIndex < filesCount; fileIndex++) {
        const FILE = await contract.methods.getFilesofUser(fileIndex).call();
        files.push(FILE);
      }

      console.log("FILES IN GETDATA", files);

      setFiles({
        files,
      });
    }
  };

  const handleSubmit = async () => {
    const { accounts, contract } = state;

    console.log("IPFS UPLOAD");
    console.log(state.buffer);
    setstate({
      ...state,
      loading: true,
    });

    try {
      const res = await ipfs.add(state.buffer);

      console.log("IPFS RESPONSE", res);
      const FILE_ID = generateUID();
      const FILE_HASH = res.path;
      const FILE_SIZE = res.size;

      const uploadedFile = await contract.methods
        .uploadFile(FILE_ID, FILE_HASH, FILE_SIZE, state.type, state.name)
        .send({ from: accounts[0] });

      const uploadedFileDetails = uploadedFile.events.FileUploaded.returnValues;

      //Building file object to add to state
      let newAddedFile = {};
      newAddedFile[0] = uploadedFileDetails.fileId;
      newAddedFile[1] = uploadedFileDetails.fileHash;
      newAddedFile[4] = uploadedFileDetails.fileName;
      newAddedFile[2] = uploadedFileDetails.fileSize;
      newAddedFile[3] = uploadedFileDetails.fileType;
      newAddedFile[5] = uploadedFileDetails.uploadTime;

      setFiles({
        ...fileData,
        files: [newAddedFile, ...fileData.files],
      });

      console.log("FileData", fileData);
      // reset the component state of file upload
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
    console.log("BUFFER", buffer);
    setstate({
      ...state,
      buffer,
      type,
      name,
    });
  };

  const Files = () => {
    return fileData.files.length > 0 ? (
      fileData.files.map((e, index) => (
        <File key={index}>
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
                <p className="hover">{e[4]}</p>
              </div>
            </div>
          </div>
        </File>
      ))
    ) : (
      <p>No files</p>
    );
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

      {state.buffer && state.loading === false ? (
        <div className="cancel hover" onClick={cancelUpload}>
          <i className="fas cancel-icon fa-window-close"></i> Cancel
        </div>
      ) : null}

      <FileUpload>
        {state.loading ? (
          <div>
            <i className="fas fa-hourglass-half"></i>
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

        <FileList>{Files()}</FileList>
      </Container>

      <Footer />
    </div>
  );
};

export default Dashboard;
