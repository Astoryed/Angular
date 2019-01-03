import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-default',
    templateUrl: './dashboard-default.component.html',
    styleUrls: [
        './dashboard-default.component.css',
        '../../../../assets/icon/svg-animated/svg-weather.css'
    ]
})
export class DashboardDefaultComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log(localStorage.getItem('token'));
    }
}
