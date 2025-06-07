import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent {

  constructor(private router: Router){ }


  chooseLoginMethod(){
    this.router.navigate(['/chooseLoginMethod']);
  
  }

}
