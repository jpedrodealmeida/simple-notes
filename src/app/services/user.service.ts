import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList!: User[]

  constructor() { 
    
  }

  /**
   * @author Joao Pedro
   * @param user {name: string, password: string} 
   * @description Method to save user in local storage
   * @returns void
   */
  public saveUser(user: User): void{
    this.setUserToLocalStorage(user)
  }
  private setUserToLocalStorage(user: User): void{
    let users = this.getUsers()
    if(users == null)
      localStorage.setItem('users', JSON.stringify([user]))
    else{
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
   /**
   * @author Joao Pedro
   * @description Method to get users in local storage
   * @returns User {name: string, password: string} or null
   */
  private getUsers(): User[] | null{
    let userFromStorage = localStorage.getItem('users')
    if(userFromStorage)
      return JSON.parse(userFromStorage)
    return null
  }
  public getUserByName(name: string): User | undefined{
    let list = this.getUsers()
    if(list !== null){
      let userFound = list.find(user => user.name == name)
      return userFound
    }
    return undefined
  }
}
