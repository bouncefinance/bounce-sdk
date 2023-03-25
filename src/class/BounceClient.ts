// 获取公开信息 rpc 调用

import axios, { AxiosInstance } from "axios"
import { PoolCategryMap, PoolType, SupportChain } from "../types"

const requestHost = 'https://api-v3.bounce.finance/api/v3'

export class BounceClient {
    private axios: AxiosInstance
    private chainId: SupportChain

    constructor(chainId: SupportChain) {
        this.chainId = chainId

        this.axios = axios.create({
            baseURL: requestHost,
            headers: {
                "User-Agent": "bounce-sdk-node",
                "Connection": 'keep-alive',
                "Content-Type": "application/json"
            }
        })
    }


    async getPools<T>(options?: {
        offset?: number,
        limit?: number,
        category?: 1,
        creatorAddress?: string,
        creatorName?: string,
        orderBy?: "openTs",
        poolId?: string,
        poolName?: string,
        poolStatusFrontend?: null,
        token0Address?: string
    }): Promise<T> {
        return new Promise(async (resovle, reject) => {
            try {
                const requestParams = {
                    offset: 0,
                    limit: 1000,
                    category: 1,
                    chainId: this.chainId,
                    creatorAddress: "",
                    creatorName: "",
                    orderBy: "openTs",
                    poolId: "",
                    poolName: "",
                    poolStatusFrontend: null,
                    token0Address: "",
                    ...options
                }

                const poolsResponse = await this.axios.post(`/pools`, requestParams)

                resovle(poolsResponse.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async getProfile<T>(params: { userId: number }): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const profileResponse = await this.axios.post('/personal/profile', params)
                resolve(profileResponse.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async getInvest<T>(params: {
        limit: number, offset: number, userId: number
    }): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const investResponse = await this.axios.post('/personal/invest', params)
                resolve(investResponse.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    // async getSignatureWhenCreatePool(poolType: PoolType, chainId: SupportChain, options?: {
    //     amountMin1?: string,
    //     amountTotal0?: string,
    //     amountTotal1?: string,
    //     claimAt?: string,
    //     closeAt?: string,
    //     creator?: string,
    //     is721?: boolean,
    //     maxAmount1PerWallet?: string,
    //     merkleroot?: string,
    //     message?: string,
    //     name?: string,
    //     openAt?: string,
    //     signature?: string,
    //     token0?: string,
    //     token1?: string,
    //     tokenId?: string
    // }) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log({ category: PoolCategryMap[poolType],
    //                 chainId: chainId,
    //                 ...options})

    //             const signatureResponse = await this.axios.post(`/user/create_pool_sign`, {
    //                 category: PoolCategryMap[poolType],
    //                 chainId: chainId,
    //                 ...options
    //             },{
    //                 headers: {
    //                     token: ``
    //                 }
    //             })

    //             resolve(signatureResponse.data)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }

    async getPoolDetail(poolType: PoolType, poolId: number, chainId: SupportChain) {
        return new Promise(async (resolve, reject) => {
            try {
                const poolDetailResponse = await this.axios.post(`/pools/pool`, {
                    category: PoolCategryMap[poolType],
                    chainId: chainId,
                    poolId: poolId
                })

                resolve(poolDetailResponse.data)
            } catch (error) {
                reject(error)
            }
        })
    }
}