import { addDuePayment, DuePaymentTypes } from "../global-state/AppData";
import { sendMessageInChat } from "../global-state/MessengerData";
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

    onCtrlPlusKey('m', evt => {
        console.log('Sending message from Mom')
        sendMessageInChat('Mom', 'Mom', 'Hello there, dear!')
    })

}