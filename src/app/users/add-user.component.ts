import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  onCreate() {
    this.userService.create(this.user)
      .subscribe(data => {
        this.router.navigate(['list-users']);
      },
        error => {
          alert(error);
        });
  }

  onCancel() {
    if (this.storageService.isTokenValid()) {
      this.router.navigate(['list-users']);
    } else {
      this.router.navigate(['home']);
    }
  }
}
