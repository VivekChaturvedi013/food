import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleComponent, InputContainerComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginform!:FormGroup
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    private activatedroute:ActivatedRoute,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedroute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginform.controls
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.userService.login({
      email:this.fc.email.value,
      password:this.fc.password.value
    }).subscribe(()=> 
    this.router.navigateByUrl(this.returnUrl));
    // Here you would typically handle the login logic, e.g., call an authentication service
  }


}
