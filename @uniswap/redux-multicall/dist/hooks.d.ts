import { BigNumber, Contract, utils } from 'ethers';
import type { MulticallContext } from './context';
import type { CallState, ListenerOptions } from './types';
declare type MethodArg = string | number | BigNumber;
declare type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined;
export declare function useSingleContractMultipleData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, methodName: string, callInputs: OptionalMethodInputs[], options?: Partial<ListenerOptions> & {
    gasRequired?: number;
}): CallState[];
export declare function useMultipleContractSingleData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, addresses: (string | undefined)[], contractInterface: utils.Interface, methodName: string, callInputs?: OptionalMethodInputs, options?: Partial<ListenerOptions> & {
    gasRequired?: number;
}): CallState[];
export declare function useSingleCallResult(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, methodName: string, inputs?: OptionalMethodInputs, options?: Partial<ListenerOptions> & {
    gasRequired?: number;
}): CallState;
export declare function useSingleContractWithCallData(context: MulticallContext, chainId: number | undefined, latestBlockNumber: number | undefined, contract: Contract | null | undefined, callDatas: string[], options?: Partial<ListenerOptions> & {
    gasRequired?: number;
}): CallState[];
export {};
