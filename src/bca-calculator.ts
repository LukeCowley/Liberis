import { Application } from './models/application';
import { Transaction } from './models/transaction';
import { YmTimeSpan } from './models/ym-time-span';
import * as moment from 'moment';
import * as _ from 'lodash'

export class BcaCalculator{
    static IsEligible(application: Application){
        if(!application){
            return false;
        }
        if(!amountRequestedIsValid(application.amountRequested)){
            return false;
        }
        if(!timeInBusinessIsGreaterThan(application.timeInBusiness, 12)){
            return false;
        }

        if(!application.transactions || application.transactions.length === 0){
            return false;
        }

        let filledTransactions = fillFirstYearAverage(application.transactions);
        //let monthlyTransactions = 
        if(avgTransactions(filledTransactions) > application.amountRequested){
            //console.log(avgTransactions(filledTransactions));
            //console.log(application.amountRequested);
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

function amountRequestedIsValid(amount: number) : boolean{
    return amount >= 5000 && amount <= 50000;
}

function timeInBusinessIsGreaterThan(timeInBusiness: YmTimeSpan, months: number): boolean{
    return timeInBusiness.getTotalMonths() > months;
}

function fillFirstYearAverage(transactions: Transaction[])
{
    let monthly = getMonthlyTransactions(transactions);

    let firstYear = new Array<Transaction>();
    for(let i = 0; i < 12; i++){
        let trans = _.filter(transactions, (t: Transaction) => {
            if(moment(t.date).startOf('month').format("YYYYMMDD") === moment().subtract(i, 'months').startOf('month').format("YYYYMMDD"))
            {
                console.log(t);
            }
            return moment(t.date).startOf('month').format("YYYYMMDD") === moment().subtract(i, 'months').startOf('month').format("YYYYMMDD");
        });
        firstYear = _.merge(firstYear, trans);
    }
    console.log(firstYear);

    // let firstYear = _.chain(monthly)
    //     .filter((t: Transaction[]) => {
    //         return _.findIndex(t, (ts: Transaction) => {
    //             return ts.date > moment().subtract(12, 'months');
    //         }) >= 0;
    //     })
    //     .value();
    let averageMonthly = _.map(firstYear, (t: Transaction[]) => {
        return _.meanBy(t, (ts: Transaction) => ts.value);
    });
    
    //TODO: fill with the correct month as part of the date rather than today's date
    let average = _.mean(averageMonthly);
    const today = moment();
    let count = firstYear.length
    while(count < 12){
        transactions.push(new Transaction(today, average));
        count++
    };
    return transactions;    
}

function getMonthlyTransactions(transactions: Transaction[]):Transaction[][] {
    /*lodash chain below
        - filter on date range and zero value transactions 
        - group by month
    */
    let aveTrans = _.chain(transactions)
        .filter((t: Transaction) => {
            return t.value !== 0
        })
        .groupBy((t: Transaction) => 
        {
            return moment(t.date).startOf('month').format("YYYYMMDD")
        })
        .map((t: Transaction[]) => {
            return t;
        })
        .value();
    return aveTrans;
}

function avgTransactions(transactions: Transaction[]){
    return _.meanBy(transactions, (t: Transaction) => t.value);
}



function averageTransactionsInTimeSpan(transactions: Transaction[], startDate: moment.Moment): number[]{
    /*lodash chain below
        - filter on date range and zero value transactions 
        - group by month
        - project sum and number of transactions
        - project average
    */
    let aveTrans = _.chain(transactions)
        .filter((t: Transaction) => {
            return moment(t.date).isSameOrAfter(startDate) || t.value === 0
        })
        .groupBy((t: Transaction) => 
        {
            return moment(t.date).startOf('month').format("YYYYMMDD")
        })
        .map((t: Transaction[], id: string) => {
            return {
                sum: _.sumBy(t, (ts:Transaction)=> ts.value),
                count: t.length
            }
        })
        .map((t: any) => t.sum / t.count)
        .value();
    return [1,2]//aveTrans;
}







// function averageMonthlyTransactionInTimespanIsHigherThanAmount(transactions: Array<Transaction>, amount: number, startDate: moment.Date): boolean{
//     let aveTrans : number[] = averageTransactionsInTimeSpan(transactions, startDate);
//     //Moment.moment();
//     return Math.min(...aveTrans) > amount;
// }



// function averageTransactionsInTimeSpan(transactions: Array<Transaction>, startDate: Moment.Date): number[]{ //min date
//     /*lodash chain below
//     - filter on date range 
//     - group by month
//     - project sum and number of transactions
//     - project average
//     - */

//     let aveTrans = _.chain(transactions)
//         .filter((t: Transaction) => {
//             return t.date > startDate
//         })
//         .groupBy((t: Transaction) => 
//         {
//             return t.date.getFullYear().toString() + t.date.getMonth().toString();
//         })
//         .map((t: Array<Transaction>, id: string) => {
//             console.log(t);
//             return {
//                 sum: _.sumBy(t, (ts:Transaction)=> ts.value),
//                 count: t.length
//             }
//         })
//         .map((t: any) => t.sum / t.count)
//         .value();
//     return aveTrans;
// }
