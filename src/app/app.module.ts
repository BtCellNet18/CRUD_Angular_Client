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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { StorageService } from './services/storage.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'login',
    component: LayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'add-user',
    component: LayoutComponent,
    children: [
      { path: '', component: AddUserComponent }
    ]
  },
  {
    path: 'edit-user',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EditUserComponent }
    ]
  },
  {
    path: 'list-users',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListUsersComponent }
    ]
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
    ConfirmComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
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
    },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
