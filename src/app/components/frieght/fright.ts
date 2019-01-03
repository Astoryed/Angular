export class Frieght {
    public _id?:string;
    public invoiceNumber:string;
    public client:string;
    public finalDestination:string;
    public blNumber:string;
    public mblNumber:string;
    public invoiceDate:string;
    // public container:Container[];
    public container: any;
    public containerNumber: string;
    public price: number;
    public size: string;
    public containerPrice: number;
    public expensePrice:string;
    public totalPrice:string;
    public avgPrice:string;
    public totalProductPiece:string;
    public notes:string;
    public status:string;
    public created:number;
    public updated:number;
}
//
// export class Container {
//     public containerNumber: string;
//     public price: number;
//     public size: string;
// }