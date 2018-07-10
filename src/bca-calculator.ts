import {Application} from './models/application';
import {Transaction} from './models/transaction';
import {YmTimeSpan} from './models/ym-time-span';
import * as _ from 'lodash'

export class BcaCalculator{
    static IsEligible(application: Application){
        if(!amountRequestedIsValid(application.amountRequested)){
            return false;
        }
        if(!application.transactions || application.transactions.length === 0){
            return false;
        }
        if(!averageMonthlyTransactionIsHigherThanAmount(application.transactions, application.amountRequested)){
            return false;
        }
        if(!timeInBusinessIsGreaterThan(application.timeInBusiness, 12)){
            return false;
        }
        return true;
    } 

    static GetApplicationFromFile(file: File){

    }
}

function parseFile(file: File){
    
    //placeholder below
}

function amountRequestedIsValid(amount: number){
    return amount >= 5000 && amount <= 50000;
}

function averageMonthlyTransactionIsHigherThanAmount(transactions: Array<Transaction>, amount: number){
    /*lodash chain below 
     - group by month
     - project sum and number of transactions
     - project average
     - */
    
    let aveTrans = _.chain(transactions)
        .groupBy((t: Transaction) => t.date.getMonth())
        .map((t: Array<Transaction>, id: string) => {
            return {
                sum: _.sumBy(t, (ts:Transaction)=> ts.value),
                count: t.length
            }
        })
        .map((t: any) => t.sum / t.count)
        .value();
    return Math.min(...aveTrans) > amount;
}

function timeInBusinessIsGreaterThan(timeInBusiness: YmTimeSpan, months: number){
    return timeInBusiness.getTotalMonths() > months;
}

function hasTransactions(transactions: Array<Transaction>){
    return transactions;
}