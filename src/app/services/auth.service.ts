import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false
  public authUserEvent = new EventEmitter<boolean>()
  public loginTryEvent = new EventEmitter<boolean>()

  constructor(
    private userService: UserService
  ) { }

    /**
   * @author Joao Pedro
   * @description Method to verify user authenticate
   * @returns boolean value if user is authenticate
   */
  public verifyAuthentication(): boolean{
    let userAuth = sessionStorage.getItem('auth')
    if(userAuth)
      this.userAuthenticate(JSON.parse(userAuth))
    this.authUserEvent.emit(this.isAuthenticated)
    return this.isAuthenticated
  }
  /**
   * @author Joao Pedro
   * @description Method to authenticate user
   * @param user User object
   */
  public userAuthenticate(user: User): void{
    let storageUser = this.userService.getUserByName(user.name) || undefined
    if(storageUser){
      if(user.password == storageUser.password)
        this.setUserCredentials(storageUser)
      else
        this.loginTryEvent.emit(true)
    }else
      this.loginTryEvent.emit(true)
  }
  private setUserCredentials(user: User): void{
    this.isAuthenticated = true
    sessionStorage.setItem('auth', JSON.stringify(user))
  }
    /**
   * @author Joao Pedro
   * @description Method to get user authenticate informations
   * @returns User object
   */
  public getUserInformations(): any{
    let userAuth = sessionStorage.getItem('auth')
      if(userAuth)
        return JSON.parse(userAuth)
      return userAuth
  }
  /**
   * @author Joao Pedro
   * @description Method to make logout
   */
  public logout(): void{
    this.isAuthenticated = false
    this.authUserEvent.emit(false)
    sessionStorage.removeItem('auth')
  }

  
}
