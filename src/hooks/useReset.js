/* eslint-disable default-case */

import useCurrency from "./useCurrency";
import useUpgrades from "./useUpgrades";
import useGenerators from "./useGenerators";
import useTrinkets from "./useTrinkets";


/* Hook used to reset the state of the game */
const useReset = () => {
    const { reset: resetCurrency } = useCurrency();
    const { reset: resetUpgrades } = useUpgrades();
    const { reset: resetGenerators } = useGenerators();
    const { reset: resetTrinkets } = useTrinkets();

    function reset() {
        resetCurrency();
        resetUpgrades();
        resetGenerators();
        resetTrinkets();
    }

    return {
        reset
    };
};

export default useReset;