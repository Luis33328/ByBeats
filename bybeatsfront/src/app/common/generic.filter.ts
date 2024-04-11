export class GenericFilter {

    constructor(pageIndex?: Number, pageSize?: Number) { 
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }

    public pageIndex: Number;
    public pageSize: Number;
    
}