import { Bouncer, Currency } from "bounce-sdk-node"
import { SupportChain } from "bounce-sdk-node/dist/types"
import { ethers } from "ethers"
import { LogicContractAddr, TokenContractAddr } from "../src/contracts/addresses"
import { ChainState } from "../src/contracts/chainStates"
import { bn_fromWei, bn_toWei } from "../src/utils/bn"

export const bouncerExamples = async () => {
    const CHAIN_ID = SupportChain.Binance
    const signer = ethers.Wallet.createRandom()
    const provider = new ethers.providers.JsonRpcProvider(ChainState[CHAIN_ID].rpcUrls[0])
    const bouncer = new Bouncer(provider, signer)

    // get auction token balance
    const auction = new Currency(TokenContractAddr[CHAIN_ID].AUCTION as string, CHAIN_ID)
    const balance_ = await bouncer.getBalance(auction)
    console.log(bn_fromWei(balance_))

    // swap pool
    try {
        const busd = new Currency(TokenContractAddr[CHAIN_ID].BUSD as string, CHAIN_ID)
        const approveTransaction = await bouncer.approve(busd, LogicContractAddr[CHAIN_ID].BounceFixedSwap, bn_toWei(0.88))
        console.log(`approveTransaction hash`, approveTransaction.hash)
        const approveTransactionRes = await approveTransaction.wait()
        console.log(approveTransactionRes)

        const swapTransaction = await bouncer.swap({
            poolType: 'FIXED_SWAP',
            poolId: 16,
            payment: 0.0001
        })

        console.log('swapTransaction hash', swapTransaction.hash)
        const swapTransactionRes = await swapTransaction.wait()

        console.log(swapTransactionRes)
    } catch (error: any) {
        console.error(error.message)
    }

    // reverse pool
    // try {
    //     const reverseTransaction = await bouncer.reverse({
    //         poolType: 'FIXED_SWAP',
    //         poolId: 15,
    //         reverseAmount0: 0.00002
    //     })

    //     console.log('reverseTransaction hash', reverseTransaction.hash)
    //     const reverseTransactionRes = await reverseTransaction.wait()

    //     console.log(reverseTransactionRes)
    // } catch (error: any) {
    //     console.error(error.message)
    // }

}