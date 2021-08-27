import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formInit()
  }
  private formInit(){
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  public login(){
    let user: User = this.getFormValue()
    if(user){
      this.authService.userAuthenticate(user)
      this.router.navigate(['/noteList'])
    }
  }

  private getFormValue(): User{
    let user: User = {
      name: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    }
    return user
  }

}
