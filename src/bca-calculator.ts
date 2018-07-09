import {Application} from './models/application';
import {Transaction} from './models/transaction';
import {YmTimeSpan} from './models/ym-time-span';

export class BcaCalculator{
    static IsEligible(application: Application){
        if(!amountRequestedIsValid(application.amountRequested)){
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