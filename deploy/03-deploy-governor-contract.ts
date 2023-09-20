import { HardhatRuntimeEnvironment } from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";
import {networkConfig, developmentChains, VOTING_DELAY, VOTING_PERIOD,QUORUM_PERCENTAGE } from "../helper-hardhat-config";
import verify from "../helper-functions"
import {ethers} from "hardhat"

const deployGovernorContract: DeployFunction = async function ( hre: HardhatRuntimeEnvironment){
   const {getNamedAccounts, deployments, network} = hre;
   const {deploy, log} = deployments;
   const {deployer} = await getNamedAccounts();
   const governanceToken = await ethers.getContract("GovernanceToken")
   const timeLock = await ethers.getContract("TimeLock")
   log("Deploying Governor Contract...");
   const governorContract = await deploy("GovernorContract", {
    from: deployer,
     /**
     * Here we can set any address in admin role also zero address.
     * previously In tutorial deployer has given admin role then
     * renounced as well. in later section so we are doing the same by giving admin role to
     * deployer and then renounced to keep the tutorial same.
     */
    args: [governanceToken.address,timeLock.address,VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
    log: true,
     // we need to wait if on a live network so we can verify properly
     waitConfirmations: networkConfig[network.name].blockConfirmations || 1
   });

   log(`Deployed Time Lock to address ${governorContract.address}`)


   //verify
   if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(governorContract.address, [])
  }

}





export default deployGovernorContract
deployGovernorContract.tags = ["all", "governor"]