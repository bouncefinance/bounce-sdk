// class modules
export { BounceClient } from './class/BounceClient'
export { Bouncer } from './class/Bouncer'
export { Currency } from './class/Currency'

/**
 * @module web3
 */
import { ChainState } from './contracts/chainStates'
import { LogicContractAddr, TokenContractAddr } from './contracts/addresses'
import * as constants from './contracts/constants'

/**
 * @module utils
 */
import * as bn from './utils/bn'


export default {
    web3: {
        ChainState,
        LogicContractAddr,
        TokenContractAddr,
        ...constants
    },
    utils: {
        ...bn,
    }
}

