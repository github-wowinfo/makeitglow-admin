import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void { }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
