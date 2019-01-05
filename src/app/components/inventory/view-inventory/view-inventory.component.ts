import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InventoryService} from '../../../services/inventory.service';
import {Inventory} from '../inventory';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {

    constructor(private _router: Router, private inventoryService:InventoryService){}

    public inventory:Inventory;

    ngOnInit() {

        this.inventory = this.inventoryService.getter()
    }

}