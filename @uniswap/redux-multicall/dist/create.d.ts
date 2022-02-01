export interface MulticallOptions {
    reducerPath?: string;
}
export declare function createMulticall(options?: MulticallOptions): {
    reducerPath: string;
    reducer: import("redux").Reducer<import("./types").MulticallState, import("redux").AnyAction>;
    actions: import("@reduxjs/toolkit").CaseReducerActions<{
        addMulticallListeners: (state: import("immer/dist/internal").WritableDraft<import("./types").MulticallState>, action: {
            payload: import("./types").MulticallListenerPayload;
            type: string;
        }) => void;
        removeMulticallListeners: (state: import("immer/dist/internal").WritableDraft<import("./types").MulticallState>, action: {
            payload: import("./types").MulticallListenerPayload;
            type: string;
        }) => void;
        fetchingMulticallResults: (state: import("immer/dist/internal").WritableDraft<import("./types").MulticallState>, action: {
            payload: import("./types").MulticallFetchingPayload;
            type: string;
        }) => void;
        errorFetchingMulticallResults: (state: import("immer/dist/internal").WritableDraft<import("./types").MulticallState>, action: {
            payload: import("./types").MulticallFetchingPayload;
            type: string;
        }) => void;
        updateMulticallResults: (state: import("immer/dist/internal").WritableDraft<import("./types").MulticallState>, action: {
            payload: import("./types").MulticallResultsPayload;
            type: string;
        }) => void;
    }>;
    hooks: {
        useMultipleContractSingleData: (chainId: number | undefined, latestBlockNumber: number | undefined, addresses: (string | undefined)[], contractInterface: import("@ethersproject/abi").Interface, methodName: string, callInputs?: (string | number | import("ethers").BigNumber | (string | number | import("ethers").BigNumber)[] | undefined)[] | undefined, options?: (Partial<import("./types").ListenerOptions> & {
            gasRequired?: number | undefined;
        }) | undefined) => import("./types").CallState[];
        useSingleContractMultipleData: (chainId: number | undefined, latestBlockNumber: number | undefined, contract: import("ethers").Contract | null | undefined, methodName: string, callInputs: ((string | number | import("ethers").BigNumber | (string | number | import("ethers").BigNumber)[] | undefined)[] | undefined)[], options?: (Partial<import("./types").ListenerOptions> & {
            gasRequired?: number | undefined;
        }) | undefined) => import("./types").CallState[];
        useSingleContractWithCallData: (chainId: number | undefined, latestBlockNumber: number | undefined, contract: import("ethers").Contract | null | undefined, callDatas: string[], options?: (Partial<import("./types").ListenerOptions> & {
            gasRequired?: number | undefined;
        }) | undefined) => import("./types").CallState[];
        useSingleCallResult: (chainId: number | undefined, latestBlockNumber: number | undefined, contract: import("ethers").Contract | null | undefined, methodName: string, inputs?: (string | number | import("ethers").BigNumber | (string | number | import("ethers").BigNumber)[] | undefined)[] | undefined, options?: (Partial<import("./types").ListenerOptions> & {
            gasRequired?: number | undefined;
        }) | undefined) => import("./types").CallState;
    };
    Updater: (props: Pick<import("./updater").UpdaterProps, "chainId" | "latestBlockNumber" | "contract" | "isDebug">) => JSX.Element;
};
