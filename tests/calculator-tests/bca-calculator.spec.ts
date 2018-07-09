import {assert} from 'chai';
import {BcaCalculator} from '../../src/bca-calculator'
import { ApplicationBuilder } from '../builders/bca-application-builder';

describe('bca calculator tests', () => {
    describe('IsEligible', () => {  
        //*********min/max amount *********/
        it('return false for amount < 5000', () =>{
            let builder = new ApplicationBuilder();
            builder.addAmount(1000)
                .addValidTimeInBusiness()
                .addValidTransactions();
            let app = builder.build();

            assert.isFalse(BcaCalculator.IsEligible(app));
        });
    
        // it('return false for amount > 50,000', () => {
        //     assert.isTrue(false);
        // });
    
        // it('return true for amount: 5000', () => {
        //     assert.isTrue(false);
        // });
    
        // it('return true for amount: 50,000', () => {
        //     assert.isTrue(false);
        // });
    
        // it('return true for 5000 <= amount <= 50,000', () =>{
        //     assert.isTrue(false);
        // });
        
        // //*********transaction avg/month *********/
        // it('return false if transaction avg/month < requested amount', () =>{
        //     assert.isTrue(false);
        // });
    
        // it('return true if transaction avg/month >= requested amount', () => {
        //     assert.isTrue(false);
        // })
    
        // it('return true if transaction avg/month == requested amount', () =>{
        //     assert.isTrue(false);
        // });

        // //*********business details *********/
        // it('return false if business age > 12 months', () => {
        //     assert.isTrue(false);
        // });

        // it('return true if business age <= 12 months', () => {
        //     assert.isTrue(false);
        // });

        // //*********transaction audit *********/
        // it('return false ', () =>{
        //     assert.isTrue(false);
        // });

        // it('return true if with missing transaction/month average applied *passes other validation*', () => {
        //     assert.isTrue(false);
        // });

        //it('return true if with missing transaction/month average applied *fails other validation*', () => {
            //assert.isTrue(false);
        //});       
    });
});