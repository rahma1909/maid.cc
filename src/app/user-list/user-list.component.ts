import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Adjust path as necessary
import { User } from '../user'; // Adjust path as necessary
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatFormFieldModule} from '@angular/material/form-field'
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports:[MatToolbarModule,MatFormFieldModule,NgFor,NgIf],

standalone:true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers:[UserService]
})

  export class UserListComponent implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    private searchTerms = new Subject<string>();
  
    constructor(private _userService: UserService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadUsers();
      this.searchTerms.pipe(
        debounceTime(300),
        switchMap(query => this._userService.getUsers(1).pipe(
          switchMap(users => of(users.filter(user => user.id.toString().includes(query))))
        ))
      ).subscribe(filteredUsers => {
        this.filteredUsers = filteredUsers;
      });
    }
  
    loadUsers(): void {
      this._userService.getUsers(1).subscribe(data => {
        this.users = data;
        this.filteredUsers = this.users;
      });
    }
  
    onSearch(event: Event): void {
      const input = event.target as HTMLInputElement;
      console.log(input.value); 
      this.searchTerms.next(input.value);
    }
  
    viewUser(id: number): void {
      this.router.navigate(['/user', id]);
    }
  }