import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BatchService} from '../../services/batch.service';
import {Router} from '@angular/router';
import {Batch} from './batch';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

    public batches:Batch[];

  constructor(private batchService: BatchService, private _router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

    p: number = 1;

    ngOnInit() {

        this.readBatch();
    }

    readBatch() {
        this.batchService.readBatch()
            .subscribe(
                data => {
                    // console.log(data);
                    // this.batches = data['msg'];

                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((batch) => {

                        if (batch.status !== 3) {
                            sortedList.push(batch)
                        }
                    });

                    this.batches = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    showError() {
        this.toastr.error('Batch is deleted');
    }

    createBatch(event: any){
        event.preventDefault();
        this.batchService.setter(new Batch());
        this._router.navigate(['/createBatch']);

        // console.log(event);
    }

    updateBatch(batch){
        this.batchService.setter(batch);
        this._router.navigate(['/createBatch']);
    }

    deleteBatch(batch){
        const isConfirmed = confirm("Are you sure to delete this batch ?");
        if(isConfirmed) {
            this.batchService.deleteBatch(batch._id).subscribe(
                data => {
                    this.batches.splice(this.batches.indexOf(batch), 1)
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
