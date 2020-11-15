const { assert } = require("console")

const Zap = artifacts.require('./Zap.sol')

contract('Zap', ([deployer, uploader]) => {
    let zap

    before(async() => {
        zap = await Zap.deployed()
    })


    it('deploys successfully', async() => {
        const address = await zap.address
        assert(address != 0x0)
        assert(address != '')
        assert(address != null)
        assert(address != undefined)
    })

    it('has a name', async() => {
        const name = await zap.name()
        assert(name === 'Zap')
    })


    let result;
    const fileHash = 'XYZ'
    const fileSize = '6'
    const fileType = 'ABC'
    const fileName = 'ABC'


    before(async() => {
        result = await zap.uploadFile(fileHash, fileSize, fileType, fileName)
    })


    it('upload file', async() => {

        const event = result.logs[0].args

        assert(event.fileHash === fileHash)
        assert(event.fileSize === fileSize)
        assert(event.fileType === fileType)
        assert(event.fileName === fileName)

    })


    it('get count', async() => {
        const count = await zap.getCount();
        assert(count == 1);
    })

    it('get index file', async() => {
        const fileAtIndexZero = await zap.getFilesofUser(0);
        console.log(fileAtIndexZero[0])
        assert(fileAtIndexZero[0] === fileHash);
        assert(fileAtIndexZero[1] === fileSize);
        assert(fileAtIndexZero[2] === fileType);
        assert(fileAtIndexZero[3] === fileName);
    })



})