import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from '../../../services/currency.service';
import {Currency} from '../currency';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.css']
})
export class CreateCurrencyComponent implements OnInit {

    public currency:Currency;

    errorMsg = {currencyName: '', currencyRate: ''};


    constructor(private _router: Router, private currencyService:CurrencyService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.currency = this.currencyService.getter();
    }


    createCurrency() {
        if (this.currency._id == undefined) {
            this.currencyService.createCurrency(this.currency).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/currencies']).then(() => {
                        this.toastr.success('Currency is created successfully', 'Currency Created');
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
            this.currencyService.updateCurrency(this.currency).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/currencies']).then(() => {
                        this.toastr.info('Currency is updated', 'Currency Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
