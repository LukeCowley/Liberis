import {Application} from '../../src/models/application';
import {Transaction} from '../../src/models/transaction';
import {YmTimeSpan} from '../../src/models/ym-time-span';

export interface ApplicationBuilder{
    build();
}

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
    }

    addTimeInBusiness(years: number, months: number){
        let timeInBus: YmTimeSpan = {
            months: months.toString(),
            years: years.toString()
        };

        this.app.timeInBusiness = timeInBus;
    }

    addTransaction(date: Date, value: number){
        let transaction: Transaction = {
            date: date, 
            value: value
        }
    }
}