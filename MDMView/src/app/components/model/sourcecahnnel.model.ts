
export interface SourceChannelModel{

    network : string;
    revenue : string;
    bookings : string;
    startDate : string;
    endDate : string;

       
}

export class SourceChannelClass{

    network : string;
    revenue : string;
    bookings : string;
    startDate : string;
    endDate : string;

    constructor(network,revenue,bookings,startDate,endDate){
        this.network=network;
        this.revenue=revenue;
        this.bookings=bookings;
        this.startDate=startDate;
        this.endDate=endDate;

        
    }
    
}
