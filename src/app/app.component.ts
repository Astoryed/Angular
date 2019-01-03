import { Component } from '@angular/core';
import 'rxjs/add/operator/map'

@Component({
    selector: 'app-root',
    template: '<router-outlet><app-spinner></app-spinner></router-outlet>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';


}
