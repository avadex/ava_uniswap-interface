export declare const FACTORY_ADDRESS = "0xE06B9a3C0A4314E00B33d9090a190ddC00a4DD01";
export declare const FACTORY_ADDRESS_AVA = "0xE06B9a3C0A4314E00B33d9090a190ddC00a4DD01";
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const POOL_INIT_CODE_HASH = "0x68b58c0c7cb7eee735ff41e28d34d055e34ebf55c6170f58890d725e87826579";
export declare const POOL_INIT_CODE_HASH_OPTIMISM = "0x0c231002d0970d2126e7e00ce88c3b0e5ec8e48dac71478d56245c34ea2f9447";
export declare const POOL_INIT_CODE_HASH_OPTIMISM_KOVAN = "0x1fc830513acbdb1608b8c18fd3cf4a4bee3329c69bb41d56400401c40fe02fd0";
export declare const POOL_INIT_CODE_HASH_AVA = "0x68b58c0c7cb7eee735ff41e28d34d055e34ebf55c6170f58890d725e87826579";
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
    LOW = 500,
    MEDIUM = 3000,
    HIGH = 10000
}
/**
 * The default factory tick spacings by fee amount.
 */
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
