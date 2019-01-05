export class Frieght {
    public _id?:string;
    public invoiceNumber:string;
    public client:string;
    public finalDestination:string;
    public blNumber:string;
    public mblNumber:string;
    public invoiceDate:string;

    public container: any;
    public containerNumber: string;
    public price: number;
    public size: string;

    public containerPrice: number;
    public expensePrice:number;
    public totalPrice:number;
    public avgPrice:number;
    public totalProductPiece:number;
    public notes:string;
    public status:string;
    public created:number;
    public updated:number;
}
