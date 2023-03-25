import { ethers } from 'ethers'
import UniversalErc20_ABI from './abi/UniversalErc20.json'
import BounceFixedSwap_ABI from './abi/BounceFixedSwap.json'
import { LogicContractAddr } from './addresses'
import { PoolType, SupportChain } from "../types"

const generateUniversalErc20Contract = (tokenAddress: string) => {
    return new ethers.Contract(tokenAddress, UniversalErc20_ABI)
}

const getBouncePoolContract = (poolType: PoolType, chainId: SupportChain) => {
    switch (poolType) {
        case 'FIXED_SWAP':
            const tarContractAddress = LogicContractAddr[chainId].BounceFixedSwap
            return new ethers.Contract(tarContractAddress, BounceFixedSwap_ABI)

        default:
            throw new Error(`Temporarily unsupported pool types: ${poolType}`);
    }

}

export {
    generateUniversalErc20Contract,
    getBouncePoolContract
}