import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from './user/authentication/token-storage.service';
import ActivateGuard from './activate.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee manager app';

  isLoggedIn = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private activateGuard: ActivateGuard
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      this.activateGuard.setCanActivate(true);
    }
  }

  handleLogout() {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
