import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'; // Adjust path as necessary
import { User } from '../user'; // Adjust path as necessary
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers:[UserService]
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null; // Correct type for a single User or null
  isLoading = true; // Initialize correctly

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.user = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Invalid user ID');
      this.isLoading = false;
    }
  }
}
