import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;

  constructor(
    private service: UserService,
    private router: Router) { }

  ngOnInit() {
    const id = window.localStorage.getItem('EDIT_USER_ID');
    if (!id) {
      alert('Invalid action.');
      this.router.navigate(['list-users']);
      return;
    } else {
      this.service.getByID(+id)
        .subscribe(data => {
          this.user = data;
        },
          error => {
            alert(error);
          });
    }
  }

  onUpdate() {
    this.service.update(this.user)
      .subscribe(data => {
        this.router.navigate(['list-users']);
      },
        error => {
          alert(error);
        });
  }

}
