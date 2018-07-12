import {assert} from 'chai';
import {BcaCalculator} from '../../src/bca-calculator'
import { ApplicationBuilder } from '../builders/bca-application-builder';
import * as moment from 'moment'

describe('bca calculator tests', () => {
    describe('IsEligible', () => {  
        //*********min/max amount *********/
        it('return false for amount < 5000', () =>{
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(1000)
                .addValidTimeInBusiness()
                .addValidTransactions();
            let app = builder.build();
            
            //act
            let result = BcaCalculator.IsEligible(app);
            
            //assert
            assert.isFalse(result);
        });
    
        it('return false for amount > 50,000', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(50001)
                .addValidTimeInBusiness()
                .addValidTransactions();
            let app = builder.build();
            
            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isFalse(result);
        });
    
        it('return true for amount: 5000', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(5000)
                .addValidTimeInBusiness()
                .addValidTransactions();
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isTrue(result);
        });
    
        it('return true for amount: 50,000', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(50000)
                .addValidTimeInBusiness()
                .addValidTransactions(100000);
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isTrue(result);
        });
    
        it('return true for 5000 <= amount <= 50000', () =>{
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(50000)
                .addValidTimeInBusiness()
                .addValidTransactions(100000);
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isTrue(result);
        });
        
        //*********transaction avg/month *********/
        it('return false if transaction avg/month < requested amount', () =>{
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
               .addValidTimeInBusiness()
               .addValidTransactions(1000);
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            //assert
            assert.isFalse(result);

        });
    
        it('return true if transaction avg/month >= requested amount', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addValidTimeInBusiness()
                .addValidTransactions(10000);
        
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isTrue(result);
        })
    
        it('return false if transaction avg/month == requested amount', () =>{
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addValidTimeInBusiness()
                .addValidTransactions(7500);
        
            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);

            //assert
            assert.isFalse(result);
        });

        // //*********business details *********/
        it('return false if business age < 12 months', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addTimeInBusiness(0, 1)
                .addValidTransactions(10000);

            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            assert.isFalse(result);
        });

        it('return false if business age: 12 months', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addTimeInBusiness(0, 12)
                .addValidTransactions(10000);

            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            assert.isFalse(result);
        });

        it('return true if business age > 12 months', () => {
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addTimeInBusiness(1, 1)
                .addValidTransactions(10000);

            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            assert.isTrue(result);
        });

        // //*********transaction audit *********/
        it('return false if no transactions', () =>{
            //assemble
            let builder = new ApplicationBuilder();
            builder.addAmount(7500)
                .addTimeInBusiness(1, 1);

            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            assert.isFalse(result);
        });

        it('return true if with missing transaction/month in last 12 months average applied *passes other validation*', () => {
            //assemble
            let builder = new ApplicationBuilder();
            let amount = 5000;
            builder.addAmount(9999)
                .addTimeInBusiness(1, 1)
                .addTransaction(moment().subtract(1, 'months'), amount)
                .addTransaction(moment().subtract(1, 'months'), amount/2)
                .addTransaction(moment().subtract(3, 'months'), amount)
                .addTransaction(moment().subtract(4, 'months'), amount)
                .addTransaction(moment().subtract(5, 'months'), amount)
                .addTransaction(moment().subtract(6, 'months'), amount)
                .addTransaction(moment().subtract(7, 'months'), amount)
                .addTransaction(moment().subtract(8, 'months'), amount)
                .addTransaction(moment().subtract(9, 'months'), amount)
                .addTransaction(moment().subtract(10, 'months'), amount)
                .addTransaction(moment().subtract(11, 'months'), amount)
                .addTransaction(moment().subtract(12, 'months'), amount)

            let app = builder.build();

            //act
            let result = BcaCalculator.IsEligible(app);
            
            assert.isTrue(result);
        });
        
        
    });
});