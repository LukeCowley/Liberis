import {Application} from '../../src/models/application';
import {Transaction} from '../../src/models/transaction';
import {YmTimeSpan} from '../../src/models/ym-time-span';

export class ApplicationBuilder implements ApplicationBuilder{
    app: Application;
    constructor(app?: Application ){
        if(app){
            this.app = app;
        }else{
            let application: Application = {
                amountRequested: 0,
                timeInBusiness: undefined,
                transactions: new Array<Transaction>()
            }
            this.app = application;
        }
    }

    addAmount(amount: number){
        this.app.amountRequested = amount;
        return this;
    }

    addTimeInBusiness(years: number, months: number){
        let timeInBus: YmTimeSpan = {
            months: months.toString(),
            years: years.toString()
        };

        this.app.timeInBusiness = timeInBus;
        return this;
    }

    addTransaction(date: Date, value: number){
        let transaction: Transaction = {
            date: date, 
            value: value
        }
        this.app.transactions.push(transaction);
        return this;
    }

    addValidAmount(){
        this.addAmount(10000);
        return this;
    }

    addValidTimeInBusiness(){
        this.addTimeInBusiness(2,0);
        return this;
    }

    addValidTransactions(){
        let today = new Date(Date.now());

        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth(), 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 1, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 2, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 3, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 4, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 5, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 6, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 7, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 8, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 9, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 10, 1), 50000);
        this.addTransaction(new Date(today.getFullYear() - 1, today.getMonth() + 11, 1), 50000);
        return this;
    }

    build(){
        return this.app;
    }
}