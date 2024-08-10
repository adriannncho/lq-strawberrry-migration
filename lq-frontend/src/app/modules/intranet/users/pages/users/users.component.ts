import { Component } from '@angular/core';
import { User, UserType, Gender, DocumentTypeId, UserStatus } from 'src/app/core/models/users/users.interface';
import { UserService } from 'src/app/core/services/users/users.services';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  loadingUsers: boolean = false;
  users!: User[];
  typeUser!: UserType[];
  gender!: Gender[];
  documentTypeId!: DocumentTypeId[];
  userStatus!: UserStatus[];

  constructor(
    private userService : UserService,
    private notificationService : NotificationService
  ) {
    this.getDocumentTypeId();
    this.getUsers();
  }

  getUsers() {
    this.loadingUsers = true;
    this.userService.getAllUsers().subscribe(res => {
      if(res) {
        this.users = res;
      }
    })
  }

  getDocumentTypeId() {
    this.loadingUsers = true;
    this.userService.getAllDocumentTypeId().subscribe(res => {
      if(res) {
        this.documentTypeId = res;
      }
    })
  }

  getTypeUser() {
    this.loadingUsers = true;
    this.userService.getAllUserType().subscribe(res => {
      if(res) {
        this.typeUser = res;
      }
    })
  }

  getGender() {
    this.loadingUsers = true;
    this.userService.getAllGender().subscribe(res => {
      if(res) {
        this.gender = res;
      }
    })
  }

  getUserStatus() {
    this.loadingUsers = true;
    this.userService.getAllUserStatus().subscribe(res => {
      if(res) {
        this.userStatus = res;
      }
    })
  }
}
