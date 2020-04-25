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

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title = "Forgotten Password?";

  ForgotPasswordForm: FormGroup;
  isSubmitted: boolean = false;

  formErrors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthServiceService
  ) {
    this.ForgotPasswordForm = this.formBuilder.group({

      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])

    });
  }

  ngOnInit(): void {
  }

  onForgotPasswordFormSubmit(): void {
    this.isSubmitted = true;
    if (this.ForgotPasswordForm.valid) {
      console.log(
        "User Forgot Password Form Submit Data",
        this.ForgotPasswordForm.value
      );
      const formData = {
        'email': this.ForgotPasswordForm.value.email,
      }

      this._authService.forgotPassword(formData).subscribe(
        (response) => {
          this.formErrors = [];

          console.log("response: 60", response.response.code)
          if ( response.response.code == 201) {

            // this._toastr.success('Email sent sucsessfully');
            Swal.fire('Reset password link has been sended to your mail id ')
            // this._router.navigate(['/auth/login']);

          }
          else {

            Object.keys(response.error).forEach(prop => {
              this.formErrors.push(response.error[prop])
            });
            Swal.fire('', this.formErrors.join('<br>'), 'error');
          }

        }
      );
      // Swal.fire('Reset password link has been sended to your mail id ')
      // this.LoginForm.reset();
    }
    else {
      console.log("\n ==> formData not Valid X ");
    }
  }

}
