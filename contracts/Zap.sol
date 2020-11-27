pragma solidity >=0.4.21 <0.7.0;

contract Zap{
    
    string public name = 'Zap';
    
    
    struct File {
        string fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        uint uploadTime;
    }
    

    
    mapping(address => File[]) public users;

    mapping(address => File[]) public shares;
    
    
     event FileUploaded(
        string fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        uint uploadTime
  );

       event FileShareUploaded(
        string fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        uint uploadTime
  );
  
  constructor() public {
  }
    
  function uploadFile(address _address,string memory _fileId,string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName) public returns(string memory,string memory,uint, string memory,string memory,uint) {

    require(bytes(_fileHash).length > 0);
    require(bytes(_fileId).length > 0);

    require(bytes(_fileType).length > 0);

    require(bytes(_fileName).length > 0);

    require(_address != address(0));

    require(_fileSize>0);
    
    users[_address].push(File(_fileId,_fileHash, _fileSize, _fileType, _fileName, now));


    emit FileUploaded(_fileId,_fileHash, _fileSize, _fileType, _fileName,now);


    uint length = users[_address].length;

    File memory file = users[_address][length-1];
      
    return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
  }
  
  function getCount(address _address) public view returns(uint){
      
    return users[_address].length;
  }
  
  function getFilesofUser(uint _index, address _address) public view returns(string memory,string memory,uint, string memory,string memory,uint) {
      
      
      require(_index>=0);
      
      File memory file = users[_address][_index];
      
      return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
    
  }

    function removeHash(string memory _fileId, address _address) public {
      
         File[] storage f = users[_address];
  
         for (uint i = 0; i < f.length; i++) {
             if (keccak256(abi.encodePacked(f[i].fileId)) == keccak256(abi.encodePacked(_fileId))) {
              
               delete users[_address][i];
                 
             }
             
         }
  }

  function uploadShareFile(address _to,string memory _fileId,string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName) public returns(string memory,string memory,uint, string memory,string memory,uint) {

    require(bytes(_fileHash).length > 0);
    require(bytes(_fileId).length > 0);

    require(bytes(_fileType).length > 0);

    require(bytes(_fileName).length > 0);

    require(_to!=address(0));

    require(_fileSize>0);
    
    shares[_to].push(File(_fileId,_fileHash, _fileSize, _fileType, _fileName, now));


    emit FileShareUploaded(_fileId,_fileHash, _fileSize, _fileType, _fileName,now);


    uint length = shares[_to].length;

    File memory file = shares[_to][length-1];
      
    return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
  }
  
  function getShareCount(address _address) public view returns(uint){
      
    return shares[_address].length;
  }
  
  function getShareFilesofUser(uint _index,address _address) public view returns(string memory,string memory,uint, string memory,string memory,uint) {
      
      
      require(_index>=0);
      
      File memory file = shares[_address][_index];
      
      return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
    
  }

    function removeShareHash(string memory _fileId,address _address) public {
      
         File[] storage f = shares[_address];
  
         for (uint i = 0; i < f.length; i++) {
             if (keccak256(abi.encodePacked(f[i].fileId)) == keccak256(abi.encodePacked(_fileId))) {
              
               delete shares[_address][i];
                 
             }
             
         }
  }
    
}