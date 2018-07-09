import {Application} from './models/application';
import {Transaction} from './models/transaction';
import {YmTimeSpan} from './models/ym-time-span';

export class BcaCalculator{
    static IsEligible(application: File|Application){
        return false;
    } 

    static GetApplicationFromFile(file: File){

    }
}

function parseFile(file: File){
    
    //placeholder below
}