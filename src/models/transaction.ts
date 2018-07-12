import * as moment from 'moment'

export interface Transaction {
    date: moment.Moment,
    value: number
}

export class Transaction implements Transaction{
    constructor(date: moment.Moment, value: number){
        this.date = date;
        this.value = value;
    }
}