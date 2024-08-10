import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
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