import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formInit()
  }
  private passwordInputListen(){
    this.form.controls['passwordConfirmation'].valueChanges.subscribe(value =>{
      this.passwordMatch(value)
    })
  }

  private passwordMatch(pass: string){
    let password = this.form.controls['password'].value
    if(pass !== password){
      this.form.controls['passwordConfirmation'].setErrors({'incorrect': true})
    }else{
      this.form.controls['passwordConfirmation'].setErrors(null)
    }
  }

  private formInit(){
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    })
    this.passwordInputListen()
  }

  private getFormValue(): User{
    let user: User = {
      id: 0,
      name: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    }
    return user
  }
  private formClear(){
    this.form.controls['userName'].patchValue('')
    this.form.controls['password'].patchValue('')
    this.form.controls['passwordConfirmation'].patchValue('')
  }

  public save(){
    let user = this.getFormValue()
    this.userService.saveUser(user)
    this.toastr.success('User save with success', 'Thanks :)')
    this.formClear()
    this.router.navigate(['/login'])
  }

}
