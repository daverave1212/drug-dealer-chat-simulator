import { addDuePayment, DuePaymentTypes } from "../global-state/AppData";
import { onCtrlPlusKey } from "../lib/utils";

export function activateDebuggingInUseEffect() {

    onCtrlPlusKey('p', evt => {
        let sum = prompt('Add due payment with sum:')
        if (sum == '') {
            return
        }
        sum = parseFloat(sum)
        addDuePayment({
            name: 'Debug Sum',
            sum: sum,
            dueInDays: 3
        })
    })

}