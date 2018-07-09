import {YmTimeSpan} from './ym-time-span';
import {Transaction} from './transaction';

export interface Application {
    amountRequested: number,
    timeInBusiness: YmTimeSpan,
    transactions: Array<Transaction>
}