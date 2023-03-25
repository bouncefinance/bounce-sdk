import { IChainConfig, SupportChain } from "../types";

export const ChainState: Record<SupportChain, IChainConfig> = {
    [SupportChain.Mainnet]: {
        name: 'Ethereum Mainnet',
        chainId: '0x' + Number(SupportChain.Mainnet).toString(16),
        rpcUrls: ["https://rpc.ankr.com/eth"],
        nativeCurrency: {
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: 'https://etherscan.io/'
    },
    [SupportChain.Binance]: {
        name: 'Binance Smart Chain',
        chainId: '0x' + Number(SupportChain.Binance).toString(16),
        rpcUrls: ["https://bsc.publicnode.com"],
        nativeCurrency: {
            symbol: 'BNB',
            decimals: 18
        },
        blockExplorerUrls: 'https://bscscan.com/'
    },
    [SupportChain.Arbitrum]: {
        name: 'Arbitrum One',
        chainId: '0x' + Number(SupportChain.Arbitrum).toString(16),
        rpcUrls: ["https://rpc.ankr.com/arbitrum"],
        nativeCurrency: {
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: 'https://arbiscan.io'
    }
}