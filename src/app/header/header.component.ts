import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public hasNotification: boolean = true
  public showMenu: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authVerify()
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
}
