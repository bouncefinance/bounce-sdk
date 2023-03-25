export enum SupportChain {
    Mainnet = 1,
    Binance = 56,
    Arbitrum = 42161
}

export interface IChainConfig {
    name: string,
    chainId: string,
    rpcUrls: string[],
    nativeCurrency: {
        symbol: string,
        decimals: number,
    },
    blockExplorerUrls: string
}

export type PoolType = 'FIXED_SWAP' | "DUTCH" | 'LOTTERY' | 'SEALED_BID' | 'FIXED_SWAP_NFT'

export enum PoolCategryMap {
    FIXED_SWAP = 1,
    DUTCH,
    LOTTERY,
    SEALED_BID,
    FIXED_SWAP_NFT
}