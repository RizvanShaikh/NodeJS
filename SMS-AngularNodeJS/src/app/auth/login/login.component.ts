import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm
} from "@angular/forms";
import Swal from 'sweetalert2';
import { AuthServiceService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Sign in to your account";

  LoginForm: FormGroup;
  isSubmitted: boolean = false;

  formErrors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthServiceService,
    // private _route: ActivatedRoute,
     private _router: Router,
  ) {

    this.LoginForm = this.formBuilder.group({

      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
        // Validators.pattern(
        //   "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}"
        // )
      ])

      // file: [null, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  onLoginFormSubmit(): void {
    this.isSubmitted = true;

    console.log("\n ==> submitForm");
    console.log("\n ==> this.loginForm: ", this.LoginForm);

    if (this.LoginForm.valid) {

      console.log(
        "User LoginForm Form Submit Data",
        this.LoginForm.value
      );
      const formData = {
        'email': this.LoginForm.value.email,
        'password': this.LoginForm.value.password
      }
      console.log(this.LoginForm.value.email, "68")

      this._authService.userLogin(formData).subscribe(
        (response) => {
          this.formErrors = [];
          console.log("==> userLogin response: ", response);
          if (response.response.responseCode == 200) {
            this._authService.setAuthDetail(response.response)
          
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You Login Successfully!.',
              showConfirmButton: false,
              timer: 1500
            })
            this._router.navigate(['/courses']);
          } else {
            Object.keys(response.error).forEach(prop => {
              this.formErrors.push(response.error[prop])
            });

            Swal.fire('', this.formErrors.join('<br>'), 'error');
          }

        });

      // Swal.fire({
      //   position: 'center',
      //   icon: 'success',
      //   title: 'You Login Successfully!.',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      // this.LoginForm.reset();
    }

  }

}
