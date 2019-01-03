import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-with-bg-image',
    templateUrl: './with-bg-image.component.html',
    styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

    errorMsg = {email:'', password:''};

    loginUserData = {email:'', password:''};

    constructor(private _auth: AuthService, private _router: Router) { }

    ngOnInit() {

    }

    loginUser(){
        this._auth.loginUser(this.loginUserData)
            .subscribe(
                res => {
                    localStorage.setItem('token', res.token)
                    this._router.navigate(['/dashboard/default'])},
                err =>{
                    if (err.error) {
                        this.errorMsg = JSON.parse(err.error)
                    }
                }
            )
    }


}
