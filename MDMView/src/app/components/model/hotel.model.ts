export interface Hotel{
    status : string;
    data : Data[];
    recordFiltered : string;

}

export interface Response{
    status : string;
    data : Data[];
    recordFiltered : string;

}

export interface Data{

    id : string;
    name : string;
    city : string;
    country : string;
    chain : string;
    brand :string;
    chainName : string;
    address : string;

}

export class SearchHotel {

    constructor(
        public hotelBrand: string,
        public searchString: string
    ) { }   
}
