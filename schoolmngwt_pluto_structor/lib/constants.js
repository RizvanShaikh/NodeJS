const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};
const ACCOUNT_LEVEL = {
    ADMIN: 1,
    NORMAL_USER: 0
};
const LOGIN_TYPE = {
    FB: 0,
    TW: 1
};
const DB_MODEL_REF = {
    USER: "User",
    VERSION: "Version",
    NOTIFICATIONS: "Notification",
};

const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access ",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    invalidMobile: "Please fill valid Mobile No",
    blockedMobile: "Action Blocked for Illegal use of Services.",
    invalidOtp: "Invalid OTP",
    nameCantEmpty: "Name can't be empty",
    invalidZipcode: "please fill valid zip Code",
    invalidNum: "Please fill valid phone number or Do not add country code",
    passCantEmpty: "Password can't be empty",
    validationError: "Validation errors",
    incorrectPass: "Invalid email or passoword",
    userNotFound: "User not found.",
    accessTokenCantEmpty: "Access token cannot be empty",
    tokenSecretCantEmpty: "Secret token cannot be empty",
    incorrectTwToken: "Sorry, we could not contact twitter with the provided token",
    deviceIdCantEmpty: "Device id cannot be empty",
    platformCantEmpty: "Platform cannot be empty or invalid",
    deviceTokenCantEmpty: "Device token cannot be empty",
    ACCOUNT_DEACTIVATED: "Your account is suspended, please contact the SHiNE admin: vishalrana9915@gmail.com.",
};

// const QUEUES_NAME = {
//     SEND_NOTI_ONE:"shineSendNotiOne",
//     SEND_NOTI_MANY:"shineSendNotiMany",
// };

module.exports = Object.freeze({
    APP_NAME: 'School Management System',
    // TOKEN_EXPIRATION_TIME : 60 * 24 * 60, // in mins - 60 days
    STATUS_CODE: STATUS_CODE,
    ACCOUNT_LEVEL: ACCOUNT_LEVEL,
    LOGIN_TYPE: LOGIN_TYPE,
    DB_MODEL_REF: DB_MODEL_REF,
    MESSAGES: MESSAGES,
    // email : {
    //     //Credentials
    //     SENDER : 'alerts@pluto.com',
    //     TOKEN_SEPARATOR  : '#&$',
    //     SENDGRID_KEY : "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",

    //     //constants
    //     OTP : '[OTP]',
    //     LINK : '[LINK]',
    //     TOKEN : '[TOKEN]',
    //     REASON : '[REASON]',
    //     POSTMESSAGE : '[POSTMESSAGE]',
    //     PAGEMESSAGE : '[PAGEMESSAGE]',
    //     USERMESSAGE : '[USERMESSAGE]',
    //     MEDIA : '[MEDIA]',

    //     subject : {
    //         OTP_EMAIL : 'chat_bot : One Time Password',
    //         VERIFY_EMAIL : 'Confirm Email Address',
    //         FORGOT_PWD : 'Reset Password',
    //         FUND_REFIL_MAIL: 'chat_bot: Refil your Funds',
    //         PROMOTION_STOPPED_MAIL: "chat_bot: Promotion Stopped",
    //         POST_DEACTIVATED_MAIL: 'chat_bot: Post Deactivated',
    //         PAGE_DEACTIVATED_MAIL: 'chat_bot: Page Deactivated',
    //         USER_DEACTIVATED_MAIL: 'chat_bot: Account Deactivated',
    //     },
    //     //Predefined Mail Templates
    //     templates : {


    //     }
    // },
    masterOtpKey: 1234
});
