const STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 404,
    ERRORPW: 500,
    succes: 201,
}

const MESSAGES = {
  NAME_CANT_EMPTY: "Name is empty or invalid!.",
  PWD_CANT_EMPTY: "Password is empty or invalid!.",
  EmailCantEmpty: "Email id cannot be empty!.,",
  PASWORD_LENGTH: "Password must be six characters or greater!.",
  passwordUpdate : "Password updated successfully!.",
  resetPassswordLInkExpire  : "Reset password link has been expired!.",
  resetPasswordLink :"Reset Password link has been send to your mail!." ,
  passwordLinkNotSend : "Reset Password link couldn't not be send!." ,
  FIRST_NAMEEMPTY: "First name cannot be empty!.",
  InvalidEmail: "Invalid email!.",
  InvalidPhoneNumber: "Invalid phone number!.",
  invalidToken: "Invalid token!.",
  validationError: "Validation errors!.",
  UserIdCantEmpty: "User id cannot be empty!.",
  PHONE_CANT_EMPTY: "Phone number cannot be empty!.",
  UserNameCantEmpty: "User name cannot be empty!.",
  FbIdNotRequired: "Facebook id is not required!.",
  reset_new_password: "New password is required!.",
  reset_reagain_password: "Re-enter password is required!.",
  reset_password_mismatch: 'Password and Re-enterd Password does not match!.',
  userNotFound: "User not found!.",

  Registered: "Successfully registered!.",
  userExist: "User already exist!.",
  successfullyLogin: "Successfully Logged In!.",
  incorrectPW : "Incorrect Password!.",
  adminCanChange : "Only admin can perform changes!.",
  changesMade : "Changes has been performed successfully!.",
  cantPerformAction: "Oops! Can't be performed actions!.",
  courseDeleted : "Course deleted successfully!.",
  userDeleted : "User deleted successfully!.",
 courseAlreadydeleted : "Course has already been deleted!.",
  onlyStudentBuyCours : "Only student can buy courses!.",

};
module.exports = {
  MESSAGES: MESSAGES,
  STATUS_CODE: STATUS_CODE
};
