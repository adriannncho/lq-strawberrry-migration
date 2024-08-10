import { Component, Input } from '@angular/core';
import { User, UserType, Gender, DocumentTypeId, UserStatus } from 'src/app/core/models/users/users.interface';
import { UserService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {
  @Input() users!: User[];
  @Input() typeUser!: UserType[];
  @Input() gender!: Gender[];
  @Input() documentType!: DocumentTypeId[];
  @Input() userStatus!: UserStatus[];
  @Input() loadingUsers: boolean = false;

  isvisibleModal: boolean = false;
  usersModal!: User;
  isVisibleModalEdit: boolean = false;
  usersEdit!: User;

  constructor(
    private userService : UserService
  ) {
    
  }
  
  getFullName(user: User): string {
    return `${user.firstName} ${user.secondName ? user.secondName : ''} ${user.firstLastName} ${user.secondLastName}`.trim();
  }

  showModal(users: User) {
    this.usersModal = users;
    this.isvisibleModal = true;
  }

  hideModalInfo(hide: boolean) {
    this.isvisibleModal = hide;
  }

  showModalEdit(users: User) {
    this.usersEdit = users;
    this.isVisibleModalEdit = true;
  }

  hideModalEdit() {
    this.isVisibleModalEdit = false;
  }

}
