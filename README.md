# bounce-sdk-node

> Official Site： https://app.bounce.finance
>
> Node SDK for quick calls to Bounce functions



## Introduction

Token decentralized auction platform, including fixed swap auctions, Dutch-style auctions and sealed bid auctions.

Using bounce-sdk-node allows you to quickly invoke platform-related functions
1. to query and listen to some platform-related content information
2. Quickly invoke the platform function contract and participate in the auction
3. other related toolkits, the latest verified contract address and ABI



## Quick Start

To run the tests, follow these steps. You must have at least node v10 installed

**Installation package**

```bash
npm install bounce-sdk-node
or
yarn add bounce-sdk-node
```

This library comes with typescript type definitions, no need to install additional @types package



**Usage**

You can export methods, types, or class directly for use in your project

```ts
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
}
```



## Methods Guide

### Bouncer

> Platform user examples to quickly invoke platform-related contract methods

```ts
constructor(provider: ethers.providers.JsonRpcProvider, signer: ethers.Wallet)
```

- provider: Node providers instantiated using Rpc nodes
- Instantiated web3 wallet using private key

**Attributes**

| name        | type     | params                                                       | return |
| ----------- | -------- | ------------------------------------------------------------ | ------ |
| getBalance  | Call     | token: Currency                                              | Wei    |
| allowance   | Call     | token: Currency<br />spender: string                         | Wei    |
| approve     | Write    | token: Currency<br />spender: string<br />wei_amount: string = MAX_ALLOWANCE |        |
| signMessage | Function | msgStr: string                                               | String |
| swap        | Write    | params: {<br />poolType: PoolType<br />poolId: number<br /> payment: number<br />merkleProofs?: string[]<br />} |        |
| reverse     | Write    | params: {<br />poolType: PoolType<br />poolId: number<br />reverseAmount0: number <br />} |        |

**Example**

```ts
import { Bouncer, Currency } from "bounce-sdk-node"
import { SupportChain } from "bounce-sdk-node/dist/types"

const signer = ethers.Wallet('your parvateKey')
const provider = new ethers.providers.JsonRpcProvider(ChainState[CHAIN_ID].rpcUrls[0])
const bouncer = new Bouncer(provider, signer)

const swapTransaction = await bouncer.swap({
    poolType: 'FIXED_SWAP',
    poolId: 15,
    payment: 0.0001
})

const swapTransactionRes = await swapTransaction.wait()
```



### BounceClient

> Rpc client, query Rpc public method class

```ts
constructor(chainId: SupportChain)
```

- chainId: Corresponding chain ID

**Attributes**

| name          | type      | params                                                       | return |
| ------------- | --------- | ------------------------------------------------------------ | ------ |
| getPools      | Axis post | options: {<br />offset?: number,<br/>limit?: number,<br/>category?: 1,<br/>creatorAddress?: string,<br/>creatorName?: string,<br/>orderBy?: "openTs",<br/>poolId?: string,<br/>poolName?: string,<br/>poolStatusFrontend?: null,<br/>token0Address?: string<br />} |        |
| getProfile    | Axis post | params: { userId: number }                                   |        |
| getInvest     | Axis post | params: {<br />limit: number, <br />offset: number, <br />userId: number<br />} |        |
| getPoolDetail | Axis post | poolType: PoolType<br /> poolId: number<br /> chainId: SupportChain |        |

**Example**

```ts
import { BounceClient } from "bounce-sdk-node"
import { SupportChain } from "bounce-sdk-node/dist/types"

const bounceClient = new BounceClient(SupportChain.Mainnet)
// query all pools
const pools = await bounceClient.getPools<IPoolsResponse>()
```



### Currency

> Quickly construct a Currency class for Erc20 Token, you can very easily call the base ERC20 methods using the default RPC of the corresponding chain, such as balanceOf, approve, transfer...

```ts
constructor(tokenAddress: string, chainId: SupportChain) 
```

- tokenAddress: Address of the Erc20 token contract you want to construct
- chainId: Corresponding chain ID

**Attributes**

| name        | type    | params                                                       | return                     |
| ----------- | ------- | ------------------------------------------------------------ | -------------------------- |
| address     | Address |                                                              | String                     |
| name        |         |                                                              | String                     |
| symbol      |         |                                                              | String                     |
| decimals    |         |                                                              | Number                     |
| totalSupply | Call    | none                                                         | Wei                        |
| balanceOf   | Call    | none                                                         | Wei                        |
| allowance   | Call    | token: Currency<br />spender: string                         | Wei                        |
| approve     | Write   | signer: ethers.Wallet \|ethers.providers.JsonRpcSigner <br />spender: string<br />wei_amount: string = MAX_ALLOWANCE | ethers.ContractTransaction |

**Example**

```ts
import { Currency } from "bounce-sdk-node"
import { SupportChain } from "bounce-sdk-node/dist/types"

const busd = new Currency(TokenContractAddr[CHAIN_ID].BUSD as string, CHAIN_ID)
const approveTransaction = await bouncer.approve(
  busd,
  LogicContractAddr[CHAIN_ID].BounceFixedSwap,
  bn_toWei(0.88)
)

const approveTransactionRes = await approveTransaction.wait()
```



### Contracts

> For some wrapper methods and properties related to web3, you can safely get the verified information from here

**SupportChain**

```ts
export enum SupportChain {
    Mainnet = 1,
    Binance = 56,
    Arbitrum = 42161
}
```

Currently only `Mainnet`, `Binance`, `Arbitrum` are supported



**ChainState**

```ts
export const ChainState: Record<SupportChain, IChainConfig> 
```

Return the generic chain configuration for supported chains



**LogicContractAddr**

```ts
export const LogicContractAddr: Record<SupportChain, { [key in LogicContractType]: string }>
```

Return verified logic contract address information



**TokenContractAddr**

type TokenContracType = 'AUCTION' | "USDT" | 'USDC' | "DAI" | 'BUSD' | 'ARB' | 'ETH' | 'WBTC' | 'WETH' | 'UNI'

```ts
export const TokenContractAddr: Record<SupportChain, { [key in TokenContracType]?: string }> 
```

Return verified token contract address information



## Tool Library

### Bn.ts

- wrapperBn: Wrap ` number | string | BigNumber | EBignumber` to `Bignumber`

- bn_fromWei: Quickly convert cognitive quantities into wei quantities

- bn_toWei: Quickly convert wei number to cognitive quantity
- GWEI: EBignumber.from(10).pow(9)
- ETHER: EBignumber.from(10).pow(18)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.