import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agent } from '../agent';
import { AgentServiceService } from '../services/agent-service.service';
import { FormdataService } from '../services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userRoleForm !: FormGroup;
  roles:agent[]=[];
  selectedRoles!:any;
  selectedAgencyCode!:any;
  agencyCode:string='';

  constructor(
    private roledetails:AgentServiceService,
    private fb:FormBuilder,
    private router:Router,
    private formDataService:FormdataService
  ) { }

  ngOnInit(): void {
    this.userRoleForm = this.fb.group({
      role:['Agent', Validators.required],
      AgencyCode:[''],
    });
    this.roledetails.getAllRole().subscribe((data)=>{
      this.roles = data;
      console.log(this.roles);
      this.selectedRoles = this.roles[0].role;
      this.selectedAgencyCode = this.roles[0].agencyCode;
    });
  }

  onSubmit():void{
    this.formDataService.updateFormData({agencyCode:this.userRoleForm.value.role});
    this.router.navigate(['/roleDetails']);
  }

  // onGetStarted():void{
  //   console.log('Selected Role:',this.userRoleForm.value.role);
  //   //navigate to next screen here
  // }

}

  
