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
    
    
     event FileUploaded(
        string fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        uint uploadTime
  );
  
  constructor() public {
  }
    
  function uploadFile(string memory _fileId,string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName) public returns(string memory,string memory,uint, string memory,string memory,uint) {

    require(bytes(_fileHash).length > 0);
    require(bytes(_fileId).length > 0);

    require(bytes(_fileType).length > 0);

    require(bytes(_fileName).length > 0);

    require(msg.sender!=address(0));

    require(_fileSize>0);
    
    users[msg.sender].push(File(_fileId,_fileHash, _fileSize, _fileType, _fileName, now));


    emit FileUploaded(_fileId,_fileHash, _fileSize, _fileType, _fileName,now);


    uint length = users[msg.sender].length;

    File memory file = users[msg.sender][length-1];
      
    return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
  }
  
  function getCount() public view returns(uint){
      
    return users[msg.sender].length;
  }
  
  function getFilesofUser(uint _index) public view returns(string memory,string memory,uint, string memory,string memory,uint) {
      
      
      require(_index>=0);
      
      File memory file = users[msg.sender][_index];
      
      return (file.fileId,file.fileHash,file.fileSize,file.fileType,file.fileName,file.uploadTime);
    
  }

    function removeHash(string memory _fileId) public {
      
         File[] storage f = users[msg.sender];
  
         for (uint i = 0; i < f.length; i++) {
             if (keccak256(abi.encodePacked(f[i].fileId)) == keccak256(abi.encodePacked(_fileId))) {
              
               delete users[msg.sender][i];
                 
             }
             
         }
  }
    
}