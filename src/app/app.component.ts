import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from './@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'meang-frontend-public';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.loadCurrentUser().pipe(first()).subscribe();
  }
}
