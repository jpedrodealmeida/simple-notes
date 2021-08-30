import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public hasNotification: boolean = true
  public showMenu: boolean = false
  public userIcon = faUser
  public user!: User

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authVerify()
    this.getUserInfo()
  }
  private getUserInfo(){
    this.user = this.authService.getUserInformations()
  }

  private authVerify(){
    this.authService.authUserEvent.subscribe(isAuth =>{
      this.showMenu = isAuth
    })
  }
  public logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  public showNotifications(){
    this.hasNotification = !this.hasNotification
  }
  public showList(){
    this.router.navigate(['/'], {relativeTo: this.route})
  }
  public goToCreate(){
    this.router.navigate(['/note/create'])
  }
}
