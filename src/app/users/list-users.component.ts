import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DialogService } from '../services/dialog.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: Observable<User[]>;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: DialogService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.reloadData();
  }

  private reloadData() {
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
      });
  }

  onAdd() {
    this.router.navigate(['add-user']);
  }

  onEdit(id: number) {
    this.storageService.setItem('EDIT_USER_ID', id.toString());
    this.router.navigate(['edit-user']);
  }

  onDelete(id: number) {
    this.modalService.confirm('Delete', 'Are you sure?')
      .then((confirmed) => {
        if (confirmed === true) {
          this.userService.delete(id)
            .subscribe(
              data => {
                this.reloadData();
              },
              error => {
                alert(error);
              });
        }
      })
      .catch(() => console.log('User dismissed dialog (by clicking outside the dialog, using ESC or the X icon)'));
  }
}
