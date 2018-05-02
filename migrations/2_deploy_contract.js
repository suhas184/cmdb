var Adoption = artifacts.require("./Adoption.sol")
//var Change = artifacts.require("./Change.sol")

module.exports = function (deployer) {
  deployer.deploy(Adoption);
//  deployer.deploy(Change);
}
