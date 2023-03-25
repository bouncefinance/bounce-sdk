import { SupportChain } from "../types"


type LogicContractType = 'BounceFixedSwap'

export const LogicContractAddr: Record<SupportChain, { [key in LogicContractType]: string }> = {
    [SupportChain.Mainnet]: {
        BounceFixedSwap: '0x9e2C12D9240BF267fbeBD510d47Ac3AbD4D9d9ee',
    },
    [SupportChain.Binance]: {
        BounceFixedSwap: '0x630f7c658267dc9b9edf3eb92ed56f42fac4c655',
    },
    [SupportChain.Arbitrum]: {
        BounceFixedSwap: '',
    }
}

type TokenContracType = 'AUCTION' | "USDT" | 'USDC' | "DAI" | 'BUSD' | 'ARB' | 'ETH' | 'WBTC' | 'WETH' | 'UNI'

export const TokenContractAddr: Record<SupportChain, { [key in TokenContracType]?: string }> = {
    [SupportChain.Mainnet]: {
        AUCTION: "0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096",
        USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
        BUSD: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
        WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        UNI: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    },
    [SupportChain.Binance]: {
        AUCTION: "0x48DC0190dF5ece990c649A7A07bA19D3650a9572",
        USDT: "0x55d398326f99059ff775485246999027b3197955",
        USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        DAI: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
        BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        ETH: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        WETH: "0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA",
        UNI: "0xbf5140a22578168fd562dccf235e5d43a02ce9b1"
    },
    [SupportChain.Arbitrum]: {
        ARB: "0x912ce59144191c1204e64559fe8253a0e49e6548",
        USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        WBTC: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        WETH: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        UNI: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0"
    }
}