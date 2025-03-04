"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COST_PER_HOP = exports.COST_PER_INIT_TICK = exports.BASE_SWAP_COST = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const __1 = require("../../../..");
//l2 execution fee on optimism is roughly the same as mainnet
const BASE_SWAP_COST = (id) => {
    switch (id) {
        case __1.ChainId.MAINNET:
        case __1.ChainId.AVALANCHE:
        case __1.ChainId.ROPSTEN:
        case __1.ChainId.RINKEBY:
        case __1.ChainId.GÖRLI:
        case __1.ChainId.OPTIMISM:
        case __1.ChainId.OPTIMISTIC_KOVAN:
        case __1.ChainId.KOVAN:
            return bignumber_1.BigNumber.from(2000);
        case __1.ChainId.ARBITRUM_ONE:
        case __1.ChainId.ARBITRUM_RINKEBY:
            return bignumber_1.BigNumber.from(5000);
        case __1.ChainId.POLYGON:
        case __1.ChainId.POLYGON_MUMBAI:
            return bignumber_1.BigNumber.from(2000);
    }
};
exports.BASE_SWAP_COST = BASE_SWAP_COST;
const COST_PER_INIT_TICK = (id) => {
    switch (id) {
        case __1.ChainId.MAINNET:
        case __1.ChainId.AVALANCHE:
        case __1.ChainId.ROPSTEN:
        case __1.ChainId.RINKEBY:
        case __1.ChainId.GÖRLI:
        case __1.ChainId.KOVAN:
            return bignumber_1.BigNumber.from(31000);
        case __1.ChainId.OPTIMISM:
        case __1.ChainId.OPTIMISTIC_KOVAN:
            return bignumber_1.BigNumber.from(31000);
        case __1.ChainId.ARBITRUM_ONE:
        case __1.ChainId.ARBITRUM_RINKEBY:
            return bignumber_1.BigNumber.from(31000);
        case __1.ChainId.POLYGON:
        case __1.ChainId.POLYGON_MUMBAI:
            return bignumber_1.BigNumber.from(31000);
    }
};
exports.COST_PER_INIT_TICK = COST_PER_INIT_TICK;
const COST_PER_HOP = (id) => {
    switch (id) {
        case __1.ChainId.MAINNET:
        case __1.ChainId.AVALANCHE:
        case __1.ChainId.ROPSTEN:
        case __1.ChainId.RINKEBY:
        case __1.ChainId.GÖRLI:
        case __1.ChainId.KOVAN:
        case __1.ChainId.OPTIMISM:
        case __1.ChainId.OPTIMISTIC_KOVAN:
            return bignumber_1.BigNumber.from(80000);
        case __1.ChainId.ARBITRUM_ONE:
        case __1.ChainId.ARBITRUM_RINKEBY:
            return bignumber_1.BigNumber.from(80000);
        case __1.ChainId.POLYGON:
        case __1.ChainId.POLYGON_MUMBAI:
            return bignumber_1.BigNumber.from(80000);
    }
};
exports.COST_PER_HOP = COST_PER_HOP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLWNvc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvdjMvZ2FzLWNvc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFxRDtBQUNyRCxtQ0FBc0M7QUFFdEMsNkRBQTZEO0FBQ3RELE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBVyxFQUFhLEVBQUU7SUFDdkQsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLFdBQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxXQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssV0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLFdBQU8sQ0FBQyxLQUFLLENBQUM7UUFDbkIsS0FBSyxXQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCLEtBQUssV0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLEtBQUssV0FBTyxDQUFDLEtBQUs7WUFDaEIsT0FBTyxxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixLQUFLLFdBQU8sQ0FBQyxZQUFZLENBQUM7UUFDMUIsS0FBSyxXQUFPLENBQUMsZ0JBQWdCO1lBQzNCLE9BQU8scUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsS0FBSyxXQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssV0FBTyxDQUFDLGNBQWM7WUFDekIsT0FBTyxxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQWpCVyxRQUFBLGNBQWMsa0JBaUJ6QjtBQUNLLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFXLEVBQWEsRUFBRTtJQUMzRCxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssV0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLFdBQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxXQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssV0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuQixLQUFLLFdBQU8sQ0FBQyxLQUFLO1lBQ2hCLE9BQU8scUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsS0FBSyxXQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCLEtBQUssV0FBTyxDQUFDLGdCQUFnQjtZQUMzQixPQUFPLHFCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEtBQUssV0FBTyxDQUFDLFlBQVksQ0FBQztRQUMxQixLQUFLLFdBQU8sQ0FBQyxnQkFBZ0I7WUFDM0IsT0FBTyxxQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixLQUFLLFdBQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxXQUFPLENBQUMsY0FBYztZQUN6QixPQUFPLHFCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsa0JBQWtCLHNCQWtCN0I7QUFFSyxNQUFNLFlBQVksR0FBRyxDQUFDLEVBQVcsRUFBYSxFQUFFO0lBQ3JELFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxXQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssV0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLFdBQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxXQUFPLENBQUMsS0FBSyxDQUFDO1FBQ25CLEtBQUssV0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuQixLQUFLLFdBQU8sQ0FBQyxRQUFRLENBQUM7UUFDdEIsS0FBSyxXQUFPLENBQUMsZ0JBQWdCO1lBQzNCLE9BQU8scUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsS0FBSyxXQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFCLEtBQUssV0FBTyxDQUFDLGdCQUFnQjtZQUMzQixPQUFPLHFCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEtBQUssV0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLFdBQU8sQ0FBQyxjQUFjO1lBQ3pCLE9BQU8scUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDLENBQUM7QUFqQlcsUUFBQSxZQUFZLGdCQWlCdkIifQ==
