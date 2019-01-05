export class Inventory {
    public _id?:string;
    public inventoryNumber:string;
    public containerNumber:string;
    public batchNumber:string;
    public inventoryDate:string;
    public productCode:string;
    public barCode:string;
    public avgPrice:number;



    public items:any;
    public itemName: string;
    public cartonType: string;
    public cartonQty: number;
    public dznQty: number;
    public pieceQty: number;
    public totalPiece: number;
    public currency: string;
    public currencyRate: number;
    public sellingPrice: number;
    public expireDate: string;




    public totalCarton:number;
    public totalDzn:number;
    public totalPieces:number;
    public totalPriceRs:number;
    public notes:string;
    public status:string;
    public created:number;
    public updated:number;
}
