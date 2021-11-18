import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: User | null;
  userLabel: string;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.currentUser$.pipe(first()).subscribe((x: User | null) => {
      this.currentUser = x;
      // this.userLabel = `${this.currentUser?.name} ${this.currentUser?.lastname}`;
    });
  }
}
