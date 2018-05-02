pragma solidity ^0.4.4;

contract Adoption {
    address[16] public adopters;
    string public changeDescription;
    string public changeTime;
    string public changeNewRAM;
    string public changeOldRAM;
    function changeRequest(uint petId, string _descriptionField, string _timeField, string _newRAMField, string _oldRAMField) public returns (uint) {
        require (petId >=0 && petId <=7);
        adopters[petId]= msg.sender;
        changeDescription = _descriptionField;
        changeTime = _timeField;
        changeNewRAM = _newRAMField;
        changeOldRAM = _oldRAMField;
        return petId;
    }

    function getAdopters() public returns (address[16]) {
        return adopters;
    }
}
