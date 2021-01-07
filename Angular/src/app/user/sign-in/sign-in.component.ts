import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Router} from "@angular/router"

import { UserService } from '../../shared/user.service'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userService:UserService,private router:Router) { }

  model = {
    email : '',
    password:''
  }
  emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  serverErrorMessages:string;

  ngOnInit(): void {
  }
    onSubmit(form : NgForm){
      this.userService.login(form.value).subscribe(
        res =>{
          this.userService.setToken(res['token']);
          if(this.userService.isAdmin())
          this.router.navigateByUrl('/homepage');
          else(this.router.navigateByUrl('/home'))
        },
        err =>{
          this.serverErrorMessages=err.error.message;
        }
      )
    }

}
