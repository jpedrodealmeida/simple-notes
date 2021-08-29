import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false
  public authUserEvent = new EventEmitter<boolean>()

  constructor(
    private userService: UserService
  ) { }

  public verifyAuthentication(): boolean{
    let userAuth = localStorage.getItem('auth')
    if(userAuth)
      this.userAuthenticate(JSON.parse(userAuth))
    this.authUserEvent.emit(this.isAuthenticated)
    return this.isAuthenticated
  }
  public userAuthenticate(user: User): void{
    let storageUser = this.userService.getUserByName(user.name) || undefined
    if(storageUser){
      if(user.password == storageUser.password)
        this.setUserCredentials(user)
    }
  }
  private setUserCredentials(user: User): void{
    this.isAuthenticated = true
    localStorage.setItem('auth', JSON.stringify(user))
  }
  public logout(): void{
    this.isAuthenticated = false
    this.authUserEvent.emit(false)
    localStorage.removeItem('auth')
  }

  
}
