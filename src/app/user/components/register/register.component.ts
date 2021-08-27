import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.formInit()
  }
  private passwordInputListen(){
    this.form.controls['passwordConfirmation'].valueChanges.subscribe(value =>{
      let password = this.form.controls['password'].value
      if(value !== password){
        this.form.controls['password'].setErrors({'incorrect': true})
      }else{
        this.form.controls['password'].setErrors(null)
      }
        
    })
  }

  private formInit(){
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    })
    this.passwordInputListen()
  }

  public save(){

  }

}
