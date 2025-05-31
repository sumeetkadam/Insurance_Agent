import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-choose-login-method',
  templateUrl: './choose-login-method.component.html',
  styleUrls: ['./choose-login-method.component.css']
})

export class ChooseLoginMethodComponent implements OnInit {
  loginModeSelection!: FormGroup;
  loginModes = [{'id':'mpin' ,'modeName':'MPIN'},
{'id':'password', 'modeName':'Password'},
{'id':'Device-PIN', 'modeName':'Device PIN'},
{'id':'Biometrics', 'modeName':'Biometrics'}
];

  constructor( private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginModeSelection = this.fb.group({
      loginMode:['']
    });
  }
  selectedMode :string='';
  
  onCancel(): void{
    console.log("login mode cancelled. selected mode is:", this.loginModeSelection.value.loginMode);
  }

  onSubmit():void{
    console.log("login mode selected. selected mode is: ",this.loginModeSelection.value.loginMode);
    this.selectedMode = this.loginModeSelection.value.loginMode;
  }

  navigateToComponent(modeId: string){
    this.router.navigate([modeId]);
  }
}
