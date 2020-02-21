import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: DialogService,
    private storeService: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.storeService.isTokenValid();
  }

  Logout() {
    this.modalService.confirm('Logout', 'Are you sure?')
      .then((confirmed) => {
        if (confirmed === true) {
          this.storeService.removeToken();
          this.router.navigate(['home']);
        }
      })
      .catch(() => console.log('User dismissed dialog (by clicking outside the dialog, using ESC or the X icon)'));
  }
}
