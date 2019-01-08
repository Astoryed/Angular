import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {InventoryService} from '../../../services/inventory.service';
import {Inventory} from '../inventory';
import {Frieght} from '../../frieght/fright';
import {Currency} from '../../currency/currency';
import {Product} from '../../product/product';
import {Unit} from '../../units/units';
import { FormGroup, FormControl } from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {fr} from 'ngx-bootstrap/locale';

@Component({
    selector: 'app-create-inventory',
    templateUrl: './create-inventory.component.html',
    styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent implements OnInit {

  public inventory:Inventory;
  public frieghtes: Frieght[];
  public currencies: Currency[];
  public products: Product[];
  public units: Unit[];


    public items;
    public itemName;
    public cartonType;
    public cartonQty;
    public dznQty;
    public pieceQty;
    public totalPiece;
    public currency;
    public currencyRate;
    public sellingPrice;
    public expireDate;

    public rate;

    public totalCartonQty;
    public totalDznQty;
    public totalPiecesQty;
    public grandTotal;

    public con;
    public random;

    public bar;
    public findBarCode;

    public code;
    public findProductCode;
    public removed;
    public removedValue;
    public delCartonQty;
    public delDznQty;
    public delPieceQty;
    public delSellingPrice;
    public delTotalPiece;



  errorMsg = {containerNumber:'', batchNumber:'', status:'', inventoryDate:'', productCode:'', barCodeName: '',
  avgPrice: '',expireDate: '', notes: ''};

  constructor(private _router: Router, private inventoryService: InventoryService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.inventory = this.inventoryService.getter();

      this.readFrieght();

      this.readCurrency();

      this.readProduct();

      this.readUnit();

      this.items = [];

      this.randomNumber();
  }


  // For Adding Multiple Rows in the Inventory Form
  //=================================================================

  addItems() {
          this.items.push({
              itemName: this.itemName,
              cartonType: this.cartonType,
              cartonQty: this.cartonQty,
              dznQty: this.dznQty,
              pieceQty: this.pieceQty,
              totalPiece:this.totalPiece  ,
              currency: this.currency,
              currencyRate: this.currencyRate,
              sellingPrice:  this.sellingPrice,
              expireDate: this.expireDate,
          });
          this.itemName =  '';
          this.cartonType = '';
          this.cartonQty = '';
          this.dznQty = '';
          this.pieceQty = '';
          this.totalPiece = '';
          this.currency = '';
          this.currencyRate = '';
          this.sellingPrice = '';
          this.expireDate ='';
          console.log(this.items);

  }

   putItems() {
        this.inventory.items.push({
            itemName: this.itemName,
            cartonType: this.cartonType,
            cartonQty: this.cartonQty,
            dznQty: this.dznQty,
            pieceQty: this.pieceQty,
            totalPiece:this.totalPiece  ,
            currency: this.currency,
            currencyRate: this.currencyRate,
            sellingPrice:  this.sellingPrice,
            expireDate: this.expireDate,
        });
        this.itemName =  '';
        this.cartonType = '';
        this.cartonQty = '';
        this.dznQty = '';
        this.pieceQty = '';
        this.totalPiece = '';
        this.currency = '';
        this.currencyRate = '';
        this.sellingPrice = '';
        this.expireDate ='';
        console.log(this.items);

    }


    removeItems(index) {
        this.removedValue = this.inventory.items.splice(index, 1);

        this.delCartonQty = this.removedValue[0].cartonQty;
        this.delDznQty = this.removedValue[0].dznQty;
        this.delPieceQty = this.removedValue[0].pieceQty;
        this.delSellingPrice = this.removedValue[0].sellingPrice;
        this.delTotalPiece = this.removedValue[0].totalPiece;

        console.log('removed', this.delSellingPrice);

        this.inventory.totalCarton = (this.inventory.totalCarton*1) - (this.delCartonQty*1);
        this.inventory.totalDzn = (this.inventory.totalDzn*1) - (this.delDznQty*1);
        this.inventory.totalPieces = (this.inventory.totalPieces*1) - (this.delPieceQty*1);
        this.inventory.totalPriceRs = (this.inventory.totalPriceRs*1) - (this.delSellingPrice*1);

    }


    //When search from productCode field

    addIteminto(){

      if(this.inventory._id == undefined){
          if(this.findProductCode){
              this.items.push({
                  itemName: this.findProductCode,
                  cartonType: this.cartonType,
                  cartonQty: this.cartonQty,
                  dznQty: this.dznQty,
                  pieceQty: this.pieceQty,
                  totalPiece: this.totalPiece,
                  currency: this.currency,
                  currencyRate: this.currencyRate,
                  sellingPrice: this.sellingPrice,
                  expireDate: this.expireDate,
              });
          }
      }else{
          if(this.findProductCode){
              this.inventory.items.push({
                  itemName: this.findProductCode,
                  cartonType: this.cartonType,
                  cartonQty: this.cartonQty,
                  dznQty: this.dznQty,
                  pieceQty: this.pieceQty,
                  totalPiece: this.totalPiece,
                  currency: this.currency,
                  currencyRate: this.currencyRate,
                  sellingPrice: this.sellingPrice,
                  expireDate: this.expireDate,
              });
          }
      }

    }

    deleteItems(index) {
      this.removed = this.items.splice(index, 1);

      this.delCartonQty = this.removed[0].cartonQty;
      this.delDznQty = this.removed[0].dznQty;
      this.delPieceQty = this.removed[0].pieceQty;
      this.delSellingPrice = this.removed[0].sellingPrice;
      this.delTotalPiece = this.removed[0].totalPiece;

      console.log('removed', this.delSellingPrice);

      this.inventory.totalCarton = (this.inventory.totalCarton*1) - (this.delCartonQty*1);
      this.inventory.totalDzn = (this.inventory.totalDzn*1) - (this.delDznQty*1);
      this.inventory.totalPieces = (this.inventory.totalPieces*1) - (this.delPieceQty*1);
      this.inventory.totalPriceRs = (this.inventory.totalPriceRs*1) - (this.delSellingPrice*1);

  }

    //=================================================================

    //Random Number For Invoice Number
    randomNumber(){
        // this.random = Math.random().toString(36).slice(-5);
        this.random =  Math.floor(100000 + Math.random() * 9000);

    }

    //=================================================================

    //For Update Inventory Total Each Quantity

    addTotal(){
        let totalQty = 0;
        let totalCarton = 0;
        let totalDzn = 0;
        let totalPiece = 0;


        //For Update
        if(this.inventory._id !== undefined){

            for (let key of this.inventory.items) {
                totalQty =   key.cartonQty + key.dznQty + key.pieceQty

                totalCarton = totalCarton + key.cartonQty
                totalDzn = totalDzn + key.dznQty
                totalPiece = totalPiece + key.pieceQty


                key.totalPiece = totalQty;
            }

            //For Create
        }else {

            for (let key of this.items) {

                totalQty =   key.cartonQty + key.dznQty + key.pieceQty

                totalCarton = totalCarton + key.cartonQty
                totalDzn = totalDzn + key.dznQty
                totalPiece = totalPiece + key.pieceQty



                key.totalPiece = totalQty;
            }

        }


        this.inventory.totalCarton = totalCarton;
        this.inventory.totalDzn = totalDzn;
        this.inventory.totalPieces = totalPiece;

        // console.log('Total Qty', this.items.totalPiece)
    }

    //=================================================================
    //Currency Multiplied By the Rate and which is in the currency table
    //=================================================================


    currencyValue(i) {
        let currencyTaken = this.items[i].currency;

        let sellPrice = 0;
        let currencyRate;
        let currentRate = this.items[i].currencyRate;
        let totalSellingPrice = this.items[i].sellingPrice;
        let avgPrice = this.inventory.avgPrice;
        let totalCurrencyConversion = 0;

        this.currencies.forEach((currency) => {


            if (currency.currencyName == currencyTaken) {
                // parseInt(currency.currencyRate);
                currencyRate = currency.currencyRate;

                // currencyRate = currency.currencyRate;
                console.log('Currency Foreach Rate', currencyRate);

            }


            totalCurrencyConversion = currencyRate * currentRate;

            this.items[i].sellingPrice = totalCurrencyConversion + avgPrice;

            // Accumulation of Selling Price

            let accumulatedValue = 0;

            for (let key in this.items) {
                let value = this.items[key].sellingPrice;
                accumulatedValue = accumulatedValue + value;

            }

            this.inventory.totalPriceRs = accumulatedValue;


        });
    }

    // For Update
    currencyUpdate(i){
        let currencyTaken = this.inventory.items[i].currency;

        let sellPrice = 0;
        let currencyRate;
        let currentRate = this.inventory.items[i].currencyRate;
        let totalSellingPrice = this.inventory.items[i].sellingPrice;
        let avgPrice = this.inventory.avgPrice;
        let totalCurrencyConversion = 0;

        this.currencies.forEach((currency) =>{


            if(currency.currencyName ==  currencyTaken){
                currencyRate = currency.currencyRate;

            }

            totalCurrencyConversion = currencyRate * currentRate;

            this.inventory.items[i].sellingPrice = totalCurrencyConversion + (avgPrice*1);

            // Accumulation of Selling Price

            let accumulatedValue = 0;

            for (let key in this.inventory.items){
                let value = this.inventory.items[key].sellingPrice;
                accumulatedValue = accumulatedValue + value;

            }

            this.inventory.totalPriceRs = accumulatedValue;


        });

    }

    readProduct()
    {
      this.inventoryService.readProduct()
        .subscribe(
          data => {
            let sortedList = [];
            // let codeList = [];

            let rawData = data['msg'];

            rawData.forEach((products) => {

              if (products.status !== 3) {
                sortedList.push(products)
              }

            });

            this.products = sortedList;

          },

          err =>{
            console.log(err);
          })
    }


    search(event: any){
        this.code = event.target.value;

        this.inventoryService.readProduct()
            .subscribe(
                data => {
                    let codeList = [];

                    let rawData = data['msg'];

                    rawData.forEach((products) => {

                        if (products.productCode == this.code) {
                            codeList.push(products.productName)
                        }

                    });

                    this.findProductCode = codeList;

                    console.log('list',this.findProductCode)
                    if(this.findProductCode.length > 0){
                        this.addIteminto();
                    }

                },

                err =>{
                    console.log(err);
                });

    }



    //////////////////Find And Put Average Price////////////////////

    searchAveragePrice(e){

        let containerNum = e.target.value;

        let averageList = 0;
        // let role = [];

        this.frieghtes.forEach((frieght) => {


            if (frieght.container.containerNumber = containerNum) {

                averageList =  frieght.avgPrice


                // console.log('containerNum',role)
            }


        });


        // console.log('Frieghts',frieght.container[i].containerNumber)

        this.inventory.avgPrice = averageList;

        console.log('AverageList',this.inventory.avgPrice)


    }



    ////////////////////Find And Put Average Price////////////////////
    // searchAveragePrice(e){
    //
    //     let containerNum = e.target.value;
    //
    //     let averageList = 0;
    //     // let role = [];
    //
    //     this.frieghtes.forEach((frieght) => {
    //
    //
    //         if (frieght.container.containerNumber = containerNum) {
    //
    //             averageList =  frieght.avgPrice
    //
    //
    //             // console.log('containerNum',role)
    //         }
    //
    //
    //     });
    //
    //
    //     // console.log('Frieghts',frieght.container[i].containerNumber)
    //
    //     this.inventory.avgPrice = averageList;
    //
    //     console.log('AverageList',this.inventory.avgPrice)
    //
    //
    // }



    searchBarCode(event: any){
        this.bar = event.target.value;

        this.inventoryService.readProduct()
            .subscribe(
                data => {
                    let codeList = [];

                    let rawData = data['msg'];

                    rawData.forEach((products) => {

                        if (products.barCode == this.bar) {
                            codeList.push(products.productName)
                        }

                    });

                    this.findBarCode = codeList;

                    console.log('list',this.findBarCode)
                    if(this.findBarCode.length > 0){
                        this.addIteminto();
                    }

                },

                err =>{
                    console.log(err);
                });

    }

    readUnit()
    {
        this.inventoryService.readUnit()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((units) => {

                        if (units.status !== 3) {
                            sortedList.push(units)
                        }
                    });

                    this.units = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    readFrieght()
    {
        this.inventoryService.readFrieght()
            .subscribe(
                data => {
                    let sortedList = [];

                    let resetList = [];

                    let rawData = data['msg'];

                    rawData.forEach((frieght) => {

                        if (frieght.status !== 3) {
                            resetList.push(frieght)
                        }
                    });

                    this.frieghtes = resetList;

                    for (let i = 0; i < this.frieghtes.length; i++) {
                        let container = this.frieghtes[i].container;


                        container.forEach((con) => {
                            if (con.containerNumber[i] !== null) {
                                sortedList.push(con)
                            }
                        });
                        this.con = sortedList;

                    }
                },

                err => {
                    console.log(err);
                })

    }


    readCurrency() {
    this.inventoryService.readCurrency()
      .subscribe(
        data => {
          let sortedList = [];

          let rawData = data['msg'];

          rawData.forEach((currency) => {

            if (currency.status !== 3) {
              sortedList.push(currency)
            }
          });

          this.currencies = sortedList;

          console.log('Currency', this.currencies)
        },

        err =>{
          console.log(err);
        })
  }

  createInventory() {

    let inventory = this.inventory;

      if (inventory._id == undefined) {

          if(inventory.inventoryNumber == null){
              inventory.inventoryNumber = this.random
          }

          if(inventory.items == null){
              inventory.items  = this.items
          }

          if(inventory.totalCarton == null){
              inventory.totalCarton = this.totalCartonQty
          }

          if(inventory.totalDzn == null){
              inventory.totalDzn = this.totalDznQty
          }

          if(inventory.totalPieces == null){
              inventory.totalPieces = this.totalPiecesQty
          }

          if(inventory.totalPriceRs == null){
              inventory.totalPriceRs = this.grandTotal
          }

      this.inventoryService.createInventory(this.inventory).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/inventories']).then(() => {
            this.toastr.success('Inventory is created successfully', 'Inventory Created');
          });

        },
        err => {
          console.log(err);
          if (err.error) {
            this.errorMsg = JSON.parse(err.error)
          }
        }
      )
    }else{
      this.inventoryService.updateInventory(this.inventory).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/inventories']).then(() => {
            this.toastr.info('Inventory is updated', 'Inventory Updated');
          });
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}
