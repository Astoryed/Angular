import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {BatchService} from '../../../services/batch.service';
import {Batch} from '../batch';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {

    public batch:Batch;

    errorMsg = {batchNumber:''};


    constructor(private _router: Router, private batchService: BatchService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.batch = this.batchService.getter();
    }


    createBatch() {
        if (this.batch._id == undefined) {
            this.batchService.createBatch(this.batch).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/batches']).then(() => {
                        this.toastr.success('Batch is created successfully', 'Batch Created');
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
            this.batchService.updateBatch(this.batch).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/batches']).then(() => {
                        this.toastr.info('Batch is updated', 'Batch Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
