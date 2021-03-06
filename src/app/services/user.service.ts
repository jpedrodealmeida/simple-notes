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
   * @param user {id: number, name: string, password: string} 
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
      users = this.addUserOnList(user, users)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
   /**
   * @author Joao Pedro
   * @description Method to get users in local storage
   * @returns Array of User  [{id: number, name: string, password: string}] or null
   */
  public getUsers(): User[] | null{
    let userFromStorage = localStorage.getItem('users')
    if(userFromStorage)
      return JSON.parse(userFromStorage)
    return null
  }
     /**
   * @author Joao Pedro
   * @description Method to get users by name
   * @param name String user name
   * @returns Array of User {id: number, name: string, password: string} or undefined
   */
  public getUserByName(name: string): User | undefined{
    let list = this.getUsers()
    if(list !== null){
      let userFound = list.find(user => user.name == name)
      return userFound
    }
    return undefined
  }
    /**
   * @author Joao Pedro
   * @param user User {id: number, name: string, password: string}
   * @param userList Array of current user list [{id: number, name: string, password: string}]
   * @description Method to push new user on user list
   * @returns Array of User [{id: number, name: string, password: string}]
   */
  private addUserOnList(user: User, userList: User[]): User[]{
    user.id = userList.length
    userList.push(user)
    return userList
  }
}
