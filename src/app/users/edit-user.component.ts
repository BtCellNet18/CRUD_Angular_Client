import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    const id = this.storageService.getItem('EDIT_USER_ID');
    if (!id) {
      alert(`User Not Found`);
      this.storageService.removeItem('EDIT_USER_ID');
      this.router.navigate(['list-users']);
    } else {
      this.userService.getByID(+id)
        .subscribe(data => {
          this.user = data;
        },
          error => {
            alert(error);
          });
    }
  }

  onUpdate() {
    this.userService.update(this.user)
      .subscribe(data => {
        this.storageService.removeItem('EDIT_USER_ID');
        this.router.navigate(['list-users']);
      },
        error => {
          alert(error);
        });
  }

}
