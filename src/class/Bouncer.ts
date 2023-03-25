// 执行操作


import { ethers } from "ethers";
import { MAX_ALLOWANCE } from "../contracts/constants";
import { getBouncePoolContract } from "../contracts/contract";
import { PoolType } from "../types";
import { bn_toWei } from "../utils/bn";
import { Currency } from "./Currency";

export class Bouncer {
    private provider: ethers.providers.JsonRpcProvider
    private signer: ethers.Wallet
    private chainId: number | undefined

    private fixedSwapContractWithSigner: ethers.Contract | undefined

    constructor(provider: ethers.providers.JsonRpcProvider, signer: ethers.Wallet) {
        this.provider = provider
        this.signer = signer.connect(provider)

        this.initializeAsync()
    }

    private async initializeAsync() {
        this.chainId = (await this.provider.getNetwork()).chainId
        const fixedSwapContract = getBouncePoolContract('FIXED_SWAP', this.chainId)
        this.fixedSwapContractWithSigner = fixedSwapContract.connect(this.signer)
    }

    // query token balance
    async getBalance(token: Currency): Promise<ethers.BigNumber> {
        return await token.balanceOf(this.signer.address)
    }

    async approve(token: Currency, spender: string, wei_amount: string = MAX_ALLOWANCE) {
        return token.approve(this.signer, spender, wei_amount)
    }

    async allowance(token: Currency, spender: string) {
        return token.allowance(this.signer.address, spender)
    }

    async signMessage(msgStr: string) {
        return this.signer.signMessage(msgStr)
    }

    async swap(params: {
        poolType: PoolType,
        poolId: number,
        payment: number,
        merkleProofs?: string[]
    }): Promise<ethers.ContractTransaction> {
        return new Promise(async (resolve, reject) => {
            if (!this.fixedSwapContractWithSigner || !this.chainId) return reject(new Error(`fixedSwapContractWithSigner or chainId not initialized!`))
            try {
                switch (params.poolType) {
                    case 'FIXED_SWAP':
                        const swapArgs = [params.poolId, bn_toWei(params.payment), params.merkleProofs || []]
                        const swapOvrrides: ethers.PayableOverrides = { value: bn_toWei(params.payment) }
                        await this.fixedSwapContractWithSigner.estimateGas.swap(...swapArgs, swapOvrrides)
                        const fixedSwapTransaction = await this.fixedSwapContractWithSigner.swap(...swapArgs, swapOvrrides) as ethers.ContractTransaction
                        // await fixedSwapTransaction.wait()
                        resolve(fixedSwapTransaction)

                    default:
                        reject(`Temporarily unsupported pool types: ${params.poolType}`)
                }
            } catch (error) {
                reject(error)
            }
        })
    }


    async reverse(params: {
        poolType: PoolType, poolId: number, reverseAmount0: number
    }): Promise<ethers.ContractTransaction> {
        return new Promise(async (resolve, reject) => {
            try {
                switch (params.poolType) {
                    case 'FIXED_SWAP':
                        if (!this.fixedSwapContractWithSigner || !this.chainId) return reject(new Error(`fixedSwapContractWithSigner or chainId not initialized!`))

                        const reverseArgs = [params.poolId, bn_toWei(params.reverseAmount0)]
                        const reverseOvrrides: ethers.Overrides = {}
                        await this.fixedSwapContractWithSigner.estimateGas.reverse(...reverseArgs, reverseOvrrides)
                        const fixedReverseTransaction = await this.fixedSwapContractWithSigner.reverse(...reverseArgs, reverseOvrrides) as ethers.ContractTransaction
                        // await fixedReverseTransaction.wait()
                        resolve(fixedReverseTransaction)

                    default:
                        reject(`Temporarily unsupported pool types: ${params.poolType}`)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

}


// export interface IFixedSwapParams {
//     poolName: string,
// }