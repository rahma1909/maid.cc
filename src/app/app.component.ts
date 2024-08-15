import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailsComponent } from './user-details/user-details.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent,UserDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
}
