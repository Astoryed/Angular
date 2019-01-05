import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {FrieghtService} from '../../../services/frieght.service';
import {Frieght} from '../fright';


@Component({
  selector: 'app-view-frieght',
  templateUrl: './view-frieght.component.html',
  styleUrls: ['./view-frieght.component.css']
})
export class ViewFrieghtComponent implements OnInit {

    constructor(private _router: Router, private frieghtService: FrieghtService){}

    public frieght:Frieght;

  ngOnInit() {

      this.frieght = this.frieghtService.getter()
  }

}
