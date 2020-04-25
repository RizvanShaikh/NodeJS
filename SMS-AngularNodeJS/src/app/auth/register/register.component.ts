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
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "Register Form";

  registrationForm: FormGroup;
  isSubmitted: boolean = false;

  formErrors: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthServiceService
  ) {

    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      // phoneNumber: new FormControl("", [
      //   Validators.required,
      //   Validators.minLength(8),
      //   Validators.maxLength(15)
      // ]),
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
        Validators.pattern(
          "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}"
        )
      ]),
      userType: new FormControl(""),
      gender: new FormControl("Male"),
      userImage: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  file1mb: number = 1000000;
  fil10mb = this.file1mb * 10;
  multipleImages=  null ; //userImage 
  // multipleImages=  [] ; //userImage 
  onRegistrationFormSubmit() {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      if (
        this.fileToUpload.type == "image/jpg" ||
        this.fileToUpload.type == "image/jpeg"
      ) {
        if (this.fileToUpload.size <= this.fil10mb) {
          this.isSubmitted = true;
          console.log(
            "User Registration Form Submit Data",
            this.registrationForm.value
          );
          // const formData = {
          //   'firstName': this.registrationForm.value.firstName,
          //   'lastName': this.registrationForm.value.lastName,
          //   'email': this.registrationForm.value.email,
          //   'password': this.registrationForm.value.password,
          //   'userType': this.registrationForm.value.userType,
          //   'gender': this.registrationForm.value.gender,
          //   'userImage': this.multipleImages,
          //   'dateOfBirth': this.registrationForm.value.dateOfBirth,
          // }

          let formData = new FormData();
          formData.append('firstName', this.registrationForm.value.firstName);
          formData.append('lastName', this.registrationForm.value.lastName);
          formData.append('email', this.registrationForm.value.email);
          formData.append('password', this.registrationForm.value.password);
          formData.append('userType', this.registrationForm.value.userType);
          formData.append('gender', this.registrationForm.value.gender);
          // // formData.append('userImage', this.registrationForm.value.userImage);
          formData.append('dateOfBirth', this.registrationForm.value.dateOfBirth);
          // formData.append("userImage", this.multipleImages, this.multipleImages.name);
         
          for (var i = 0; i < this.multipleImages.length; i++) {
              formData.append("userImage[]", this.multipleImages[i], this.multipleImages[i].name);
          }
       
          this._authService.userRegister(formData).subscribe(
            (response) => {
              this.formErrors = [];
              console.log("==> userRegister response: ", response);
              if (response.response.responseMessage == 200) {

                // this._authService.setAuthDetail(response.data)
                // this._router.navigate(['/dashboard']);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'You Sign Up Successfully!.',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigate(['/login']);
              } 
              if( response.response.responseMessage == 404) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'User already exist!.',
                })
              }
              else {

                Object.keys(response.error).forEach(prop => {
                  this.formErrors.push(response.error[prop])
                });

                Swal.fire('', this.formErrors.join('<br>'), 'error');

              }

            }
          );


        } else {
          this.isSubmitted = false;
          Swal.fire('file size is greater than 10mb')
        }
      } else {
        this.isSubmitted = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'form can not be Sign up because files are not in jpg/jpeg formate!',
        })
      }

      // this.registrationForm.reset();
    }

  }

  fileToUpload: any;
  imageUrl: any;
  // multipleImages = [];
    handleFileInput(file: FileList) {
    // debugger
    console.log("handelFileInpute 63", file);
    this.fileToUpload = file.item(0);
    // console.log(event.target.files)
    if (
      this.fileToUpload.type == "image/jpg" ||
      this.fileToUpload.type == "image/jpeg"
    ) {
      this.multipleImages = file;

      //Show image preview
      let reader = new FileReader();
      // console.log("reader 68")
      reader.onload = (event: any) => {
        // this.imageUrl = this.fileToUpload;
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      Swal.fire('Only jpg/jpeg files are allowed!')
    }
  }


  ////======
  // selectMultipleImage(event){
  //   debugger
  //   if (event.target.files.length > 0) {
  //     this.multipleImages = event.target.files;
  //   }
  // }
}
// https://www.youtube.com/watch?v=-Hvmj8yXfyU