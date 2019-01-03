import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from './currency';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  constructor(private _router: Router, private currencyService: CurrencyService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

    public currencies:Currency[];

    p: number = 1;


  ngOnInit() {

    this.readCurrency();

  }

    showError() {
        this.toastr.error('Currency is deleted');
    }


    readCurrency() {
        this.currencyService.readCurrency()
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

    createCurrency(event: any){
        event.preventDefault();
        this.currencyService.setter(new Currency());
        this._router.navigate(['/createCurrency']);
    }

    updateCurrency(currency){
        this.currencyService.setter(currency);
        this._router.navigate(['/createCurrency']);
    }

    deleteCurrency(currency){
        const isConfirmed = confirm("Are you sure to delete this Currency ?");
        if(isConfirmed) {
            this.currencyService.deleteCurrency(currency._id).subscribe(
                data => {
                    this.currencies.splice(this.currencies.indexOf(currency), 1)
                    this.showError();
                    console.log(data)
                },
                error => {
                    console.log(error);
                }
            );
        }else{
            return false;
        }
    }

}
