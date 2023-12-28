import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  showNavbar: Boolean = true;
  subscription: Subscription
  constructor(private router: Router, private authService: AuthService, private navbarService: NavbarService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value
    })
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
