import { ethers } from "ethers";
import { ChainState } from "../contracts/chainStates";
import { MAX_ALLOWANCE } from "../contracts/constants";
import { generateUniversalErc20Contract } from "../contracts/contract";
import { SupportChain } from "../types";

export class Currency {
    private provider: ethers.providers.JsonRpcProvider
    private universalErc20ContractWithProvider: ethers.Contract

    public address: string
    public name: string | undefined
    public symbol: string | undefined
    public decimals: string | undefined

    constructor(tokenAddress: string, chainId: SupportChain) {
        this.address = tokenAddress
        this.provider = new ethers.providers.JsonRpcProvider(ChainState[chainId].rpcUrls[0])
        this.universalErc20ContractWithProvider = generateUniversalErc20Contract(tokenAddress).connect(this.provider)

        // init token base info
        this.initialization()
    }

    async initialization() {
        this.symbol = await this.universalErc20ContractWithProvider.symbol()
        this.symbol = await this.universalErc20ContractWithProvider.decimals()
        this.name = await this.universalErc20ContractWithProvider.name()
    }

    async totalSupply() {
        return await this.universalErc20ContractWithProvider.totalSupply()
    }

    async balanceOf(accountAddress: string) {
        return await this.universalErc20ContractWithProvider.balanceOf(accountAddress)
    }

    async allowance(owner: string, spender: string) {
        return this.universalErc20ContractWithProvider.allowance(owner, spender)
    }

    async approve(signer: ethers.Wallet | ethers.providers.JsonRpcSigner, spender: string, wei_amount: string = MAX_ALLOWANCE) {
        const universalErc20ContractWithSigner = this.universalErc20ContractWithProvider.connect(signer)
        await universalErc20ContractWithSigner.estimateGas.approve(spender, wei_amount)
        return await universalErc20ContractWithSigner.approve(spender, wei_amount) as ethers.ContractTransaction
    }
}