import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  private users: Observable<User[]>;

  constructor(private userService: UserService,
    private modalService: DialogService,
    private router: Router) { }

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
    window.localStorage.setItem('EDIT_USER_ID', id.toString());
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
