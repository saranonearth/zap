# zap
Zap is a decentralized file storage application built over ethereum blockchain and ipfs📦🌐


![Preview1](https://i.ibb.co/2W81V5F/preview2.png)
![Preview1](https://i.ibb.co/VJjVyyz/preview1.png)

### File structure

    .
    ├── client                   # Client application for Zap
    ├── contracts                # Test for zap smart contract
    ├── migrations               # Zap smartcontract
    ├── test                     # Migration for deploying the smartcontract                  
    ├── LICENSE
    └── README.md
    

![Untitled Diagram](https://user-images.githubusercontent.com/44068102/100355477-d8866700-3017-11eb-99d2-45db5db675f4.jpg)


### How to run localy?
Make sure you have metamask, ganache and truffle installed.
```
Setup a local blockchain with ganache.

Run truffle migrate --reset

Run npm start
```

### How to test the smart contract?

```
Go to the /test directory 
Run truffle test
```
