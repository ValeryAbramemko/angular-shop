import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],

})
export class LoginPageComponent implements OnInit {
  constructor(public auth: AuthService, private  router: Router) { }

  submitted =  false
  submit(){
    if (this.form.invalid){
      return;
    }
    this.submitted = true

    const User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(User).subscribe(res => {
      console.log(res)
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
      this.submitted = false
    },() => {
      this.submitted = false
      }
    )

  }
  form : FormGroup = new FormGroup({
    "email": new FormControl(),
    "password": new FormControl()
  });



  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

}


