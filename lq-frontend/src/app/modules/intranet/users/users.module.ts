import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';


@NgModule({
  declarations: [
    UsersComponent,
    TableUsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,  
  ],
  providers: [],
})
export class UsersModule { }