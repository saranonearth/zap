import IPFS from 'ipfs-http-client'
const { urlSource } = IPFS;
const { globSource } = IPFS
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export { ipfs, urlSource, globSource };