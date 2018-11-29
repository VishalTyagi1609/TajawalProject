
export interface NetworkModel{

    adnetwork_name : string;
    date : string;
    metric_name : string;
    type : string;
    brand : string;
    product :string;
    mobile_os : string;
    value : string;

}

export class NetworClass{

    public adnetwork_name : string;
    public date : string;
    public metric_name : string;
    public type : string;
    public brand : string;
    public product :string;
    public mobile_os : string;
    public value : string;
   
    constructor(brand,product,mobile_os,type,metric_name,date,adnetwork_name,value){
       this.brand=brand
       this.product=product
       this.mobile_os=mobile_os
       this.type=type
       this.metric_name=metric_name
       this.date=date
       this.adnetwork_name=adnetwork_name
       this.value=value
   }
}