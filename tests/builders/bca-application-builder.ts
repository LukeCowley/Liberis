import {Application} from '../../src/models/application';
import {Transaction} from '../../src/models/transaction';
import {YmTimeSpan} from '../../src/models/ym-time-span';
import * as moment from 'moment';

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
        let timeInBus: YmTimeSpan = new YmTimeSpan(years, months);

        this.app.timeInBusiness = timeInBus;
        return this;
    }

    addTransaction(date: moment.Moment, value: number){
        let transaction = new Transaction(date, value);
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

    addValidTransactions(amount = 50000){
        this.addTransaction(moment().subtract(1, 'months'), amount);
        this.addTransaction(moment().subtract(1, 'months'), amount/2);
        this.addTransaction(moment().subtract(2, 'months'), amount);
        this.addTransaction(moment().subtract(3, 'months'), amount);
        this.addTransaction(moment().subtract(4, 'months'), amount);
        this.addTransaction(moment().subtract(5, 'months'), amount);
        this.addTransaction(moment().subtract(6, 'months'), amount);
        this.addTransaction(moment().subtract(7, 'months'), amount);
        this.addTransaction(moment().subtract(8, 'months'), amount);
        this.addTransaction(moment().subtract(9, 'months'), amount);
        this.addTransaction(moment().subtract(10, 'months'), amount);
        this.addTransaction(moment().subtract(11, 'months'), amount);
        this.addTransaction(moment().subtract(12, 'months'), amount);
        return this;
    }

    build(){
        return this.app;
    }
}