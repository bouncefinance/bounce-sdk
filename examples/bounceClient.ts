// import { BounceClient } from 'bounce-sdk-node'

import { BounceClient } from "bounce-sdk-node"
import { SupportChain } from "bounce-sdk-node/dist/types"


interface IUniversalResponse {
    code: number, msg: string
}

export const bounceClientExamples = async () => {
    const bounceClient = new BounceClient(SupportChain.Mainnet)


    interface IPoolsResponse extends IUniversalResponse {
        data: Record<string, { total: 13, list: any[] | null }>
    }
    // query all pools
    const pools = await bounceClient.getPools<IPoolsResponse>()
    console.log('pools', pools)
    // {
    //     code: 200,
    //     data: {
    //       fixedSwapList: { total: 13, list: [Array] },
    //       dutchPoolList: { total: 0, list: null },
    //       lotteryPoolList: { total: 0, list: null },
    //       sealedBidPoolList: { total: 0, list: null },
    //       fixedSwapNftList: { total: 0, list: null }
    //     },
    //     msg: 'ok'
    //   }


    // query filter pools
    const testPools = await bounceClient.getPools<IPoolsResponse>({ limit: 10, creatorName: 'test' })
    console.log('testPools', testPools)


    // getProfile
    const profile = await bounceClient.getProfile({ userId: 1159 })
    console.log(profile)

    // getProfile
    const invest = await bounceClient.getInvest({ userId: 1159, limit: 100, offset: 0 })
    console.log(invest)

    // getPoolDetail
    const poolDetail = await bounceClient.getPoolDetail('FIXED_SWAP', 15, SupportChain.Binance)
    console.log(poolDetail)

}