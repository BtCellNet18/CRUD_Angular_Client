import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;

  constructor(
    private service: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  onCreate() {
    this.service.create(this.user)
      .subscribe(data => {
        this.router.navigate(['list-users']);
      },
        error => {
          alert(error);
        });
  }
}
