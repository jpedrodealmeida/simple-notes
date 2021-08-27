import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false

  constructor(
    private userService: UserService
  ) { }

  public verifyAuthentication(): boolean{
    return this.isAuthenticated
  }
  public userAuthenticate(user: User){
    let storageUser = this.userService.getUserByName(user.name) || undefined
    if(storageUser){
      if(user.password == storageUser.password)
        this.isAuthenticated = true
    }
  }
  
}
