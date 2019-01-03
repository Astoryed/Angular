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

@Component({
    selector: 'app-create-inventory',
    templateUrl: './create-inventory.component.html',
    styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent implements OnInit {

  public items;
  public itemName;
  public cartonType;
  public cartonQty = null;
  public dznQty = null;
  public pieceQty = null;
  public totalPiece;
  public currency;
  public currencyRate;
  public sellingPrice;
  public expireDate;



  public inventory:Inventory;
  public frieghtes: Frieght[];
  public currencies: Currency[];
  public products: Product[];
  public units: Unit[];

  public one = 0;
  public rate;

  public conversion;
  public currencyRateResult = null;

  public carton = 0;
  public dzn = 0;
  public piece = 0;

  public totalPieceResult;
  public totalCartonQty = 0;
  public totalDznQty = 0;
  public totalPiecesQty = 0;
  public grandTotal = 0;

  public con;
  public averageValue;


  // bar;
  // findBarCode;

  code;
  findProductCode;
  removed;
  delCartonQty;
  delDznQty;
  delPieceQty;
  delSellingPrice;
  delTotalPiece;

  public d;
  public c;

  random;

  errorMsg = {containerNumber:'', batchNumber:'', status:'', inventoryDate:'', productCode:'', barCodeName: '',
  avgPrice: '', notes: ''};

  constructor(private _router: Router, private inventoryService: InventoryService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.inventory = this.inventoryService.getter();

      console.log('When get Inventory id', this.inventory)


      console.log('From Main Controller', this.inventoryService.fItems())

      this.readFrieght();

      this.readCurrency();

      this.readProduct();

      this.readUnit();

      // this.items  = [ {itemName: '', cartonType: '', cartonQty: '', dznQty: '', pieceQty: '',
      //   totalPiece: '', currency: '', currencyRate: '', sellingPrice: ''}];
      this.items = [];

      this.randomNumber();



  }


// For inventory total Prices
    totalInventory(a, b, c, index){
        let d = 0;

        d = a + b + c;

        this.items[index].totalPiece = d;

        this.d = this.totalPiece

        console.log('Items', this.items[index].totalPiece + ' VALUE -->' + d)
        // return d
    }

    sell(a, index){
        let c = 0;
        c = (a * this.rate)  +  (this.averageValue*1);

        this.items[index].sellingPrice = c;

        this.c = this.sellingPrice
        this.grandTotals();

        // return c

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


    //When search from productCode field

    addIteminto(){
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
    }


    deleteItems(index) {
      this.removed = this.items.splice(index, 1);

      this.delCartonQty = this.removed[0].cartonQty;
      this.delDznQty = this.removed[0].dznQty;
      this.delPieceQty = this.removed[0].pieceQty;
      this.delSellingPrice = this.removed[0].sellingPrice;
      this.delTotalPiece = this.removed[0].totalPiece;

      console.log('removed', this.delSellingPrice);

      this.totalCartonQty = (this.totalCartonQty*1) - (this.delCartonQty*1);
      this.totalDznQty = (this.totalDznQty*1) - (this.delDznQty*1);
      this.totalPiecesQty = (this.totalPiecesQty*1) - (this.delPieceQty*1);
      // this.totalPieceResult = (this.totalPieceResult*1) - (this.delTotalPiece*1);


      this.grandTotal = (this.grandTotal*1) - (this.delSellingPrice*1);

  }



  // Add Total Piece of each Row
  //=================================================================
  cartonValue(e){
    this.carton = e.target.value;
    this.addFieldValues();
    this.totalCarton();
    // console.log(e)
  }

  dznValue(e){
    this.dzn = e.target.value;
    this.addFieldValues();
      this.totalDzn();
    // console.log(e)
  }

  pieceValue(e){
    this.piece = e.target.value;
    this.addFieldValues();
    this.totalPieces();
    // console.log(e)
  }

  addFieldValues() {
    this.totalPieceResult = (this.carton*1) + (this.dzn*1) + (this.piece*1) ;


  }

    // Add Total Of All
    //=================================================================

  totalCarton() {
    this.totalCartonQty = this.cartonQty;

      for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].cartonQty) {
             this.totalCartonQty = (this.totalCartonQty*1) + (this.items[i].cartonQty*1);
          }
      }

  }

  totalDzn() {
    this.totalDznQty = this.dznQty;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].dznQty) {
        this.totalDznQty = (this.totalDznQty*1) + (this.items[i].dznQty*1);
      }
    }

  }


  totalPieces() {
    this.totalPiecesQty = this.pieceQty;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].pieceQty) {
        this.totalPiecesQty = (this.totalPiecesQty*1) + (this.items[i].pieceQty*1);
      }
    }

  }


    grandTotals(){
        this.grandTotal = 0;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].sellingPrice) {
                this.grandTotal = (this.grandTotal*1) + (this.items[i].sellingPrice*1);
            }
        }
    }

    //=================================================================
    //Curreny Multiplied By the Rate and which is in the currency table
    //=================================================================


  currencyValue(e){
    let one = e.target.value;

    this.inventoryService.readCurrency()
      .subscribe(
        data => {
          let sortedList = [];

          let rawData = data['msg'];
          rawData.forEach((currency) => {

            if (currency.currencyName == one) {
              sortedList.push(currency.currencyRate)
            }

          });

          // console.log(rawData);

          this.rate = sortedList;

        },

        err =>{
          console.log(err);
        })
  }

  rateValue(e){
    this.conversion = e.target.value;

  }

  avgValue(e){
    this.averageValue = e.target.value;
    this.calculateSellingPrice();

  }


  calculateSellingPrice(){
    this.currencyRateResult = (this.conversion * this.rate) + (this.averageValue*1);
    this.grandTotals();
  }



  //=================================================================

    //Random Number For Invoice Number
    randomNumber(){
        // this.random = Math.random().toString(36).slice(-5);
        this.random =  Math.floor(100000 + Math.random() * 9000);

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

    //
    // searchBarCode(event: any){
    //     this.bar = event.target.value;
    //
    //     this.inventoryService.readProduct()
    //         .subscribe(
    //             data => {
    //                 let codeList = [];
    //
    //                 let rawData = data['msg'];
    //
    //                 rawData.forEach((products) => {
    //
    //                     if (products.barCode == this.bar) {
    //                         codeList.push(products.productName)
    //                     }
    //
    //                 });
    //
    //                 this.findBarCode = codeList;
    //
    //                 console.log('list',this.findBarCode)
    //                 if(this.findBarCode.length > 0){
    //                     this.addIteminto();
    //                 }
    //
    //             },
    //
    //             err =>{
    //                 console.log(err);
    //             });
    //
    // }

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
