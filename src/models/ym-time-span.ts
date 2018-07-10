export interface YmTimeSpan {
    years: string,
    months: string,
    getTotalMonths(): any;
}

export class YmTimeSpan implements YmTimeSpan{
    constructor(years: number, months: number){
        this.years = years.toString();
        this.months = months.toString();
    }

    getTotalMonths(): any
    {
        let years = +this.years;
        let months = +this.months;

        if(isNaN(years) || isNaN(months)){
            return 0;
        }

        return years*12 + months;
    }
}