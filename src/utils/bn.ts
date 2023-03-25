import BigNumber from "bignumber.js"
import { BigNumber as EBignumber } from 'ethers'

BigNumber.config({ EXPONENTIAL_AT: [-8, 30] })

export const wrapperBn = (tar: number | string | BigNumber | EBignumber): BigNumber => {
    if (tar instanceof EBignumber) tar = tar.toString()
    return new BigNumber(tar)
}

export const bn_fromWei: (
    tar: BigNumber | string | number | EBignumber, decimals?: string | number, fixed?: number
) => number = (tar, decimals = 18, fixed = 4) => {
    if (tar instanceof EBignumber) tar = tar.toString()
    return new BigNumber(tar).div(new BigNumber(10).pow(decimals)).dp(fixed, 1).toNumber()
}

export const bn_toWei: (
    tar: BigNumber | string | number | EBignumber, decimals?: string | number
) => string = (tar, decimals = 18) => {
    if (tar instanceof EBignumber) tar = tar.toString()
    return new BigNumber(tar).times(new BigNumber(10).pow(decimals)).toString()
}

export const GWEI = EBignumber.from(10).pow(9)
export const ETHER = EBignumber.from(10).pow(18)