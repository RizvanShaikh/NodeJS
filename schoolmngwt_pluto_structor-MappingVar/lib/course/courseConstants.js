const STATUS_CODE = {
  ERROR:  404,
  SUCCESS: 200,
  Success: 201
};

const MESSAGES = {
  TEACHER_COURSE_ONLY: "Only teacher can create courses!.",
  purchsedCourse :"This course can't be Inactive because this course has been purchsed by someone!.",
  userNotFound: "User not found!.",
  coursNotFound: "Courses doesn't found!.",
  FavCourseAdded: "Course has been favourited successfully!",
  UnFavCourse: "Course has been unfavourited successfully!",
  purchasedCours: "Course purchased successfully!.",
  courseExist: "Course already exist!.",
  courseDeleted: "Course deleted successfully!",
  courseAlreadyDeleted: "Course already deleted successfully!.",
  activeCourse: "Active course can't be deleted!.",
  studentCantDelete: "Student can't delete courses!.",
  studentCantUpdateCourse: "Student can't update courses!.",
  updatedCourse : "Course updated succesfully!.",
  onlyTeacherCreate : "Only teacher can create courses!.",
  onlyStudentBuyCours : "Only student can buy courses!.",
};

module.exports = {
  MESSAGES: MESSAGES,
  STATUS_CODE: STATUS_CODE,
};
