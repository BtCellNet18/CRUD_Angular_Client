import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { ListUsersComponent } from './users/list-users.component';
import { AddUserComponent } from './users/add-user.component';
import { EditUserComponent } from './users/edit-user.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { DialogService } from './services/dialog.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  entryComponents: [ConfirmComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListUsersComponent,
    AddUserComponent,
    EditUserComponent,
    ConfirmComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    AuthService,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
