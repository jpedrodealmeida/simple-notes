import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public hasNotification: boolean = true

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  public showNotifications(){
    this.hasNotification = !this.hasNotification
  }
}
