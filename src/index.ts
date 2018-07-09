import { BcaCalculator } from "./bca-calculator";
import { Application } from './models/application';

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    
    let timeSpan: YmTimeSpan = {years: "2", months: "3" }
    let transaction: Transaction = {date: new Date("2018-03-01T00:00:00.000Z"), value: 6966}
    let transactions = [transaction];
    let application: Application = {
        amountRequested: 2000,
        timeInBusiness: timeSpan,
        transactions: transactions
    };
    
    elt.innerText = BcaCalculator.IsEligible(application).toString();
}

 showHello("greeting", "TypeScript");
