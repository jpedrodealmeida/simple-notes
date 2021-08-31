import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public form!: FormGroup
  public hasNotification: boolean = true
  public showMenu: boolean = false
  public userIcon = faUser
  public user!: User

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.authVerify()
    this.getUserInfo()
    this.formInit()
  }
  private searchListen(){
    this.form.controls['search'].valueChanges.subscribe(value =>{
      this.noteService.searchSub.next(value)
    })
  }
  private formInit(){
    this.form = this.fb.group({
      search: ""
    })
    this.searchListen()
  }
  private getUserInfo(){
    this.user = this.authService.getUserInformations()
  }

  private authVerify(){
    this.authService.authUserEvent.subscribe(isAuth =>{
      if(isAuth)
       this.getUserInfo()
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
