import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

    errorMsg = {firstName: '', lastName: '', email:'', password:'', password2:''};

  registerUserData = {firstName: '', lastName: '', email:'', password:'', password2:''};

  validateUser = false;

  constructor(private _auth: AuthService, private _router: Router) { }


  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {this.validateUser = true,
        localStorage.setItem('token', res.token)
        this._router.navigate(['/login/default'])},
        err=> {
          if (err.error) {
            this.errorMsg = JSON.parse(err.error)
    }
  }
)
  }

  ngOnInit() {

  }

}
