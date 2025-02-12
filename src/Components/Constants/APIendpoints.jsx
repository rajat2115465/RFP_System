export const EndPoints={
    "addCategory":"categories", //Post
    "categoryList":"categories",
    "categoryById":"categories/",
    "vendorList":"vendorlist",
    "createRfp":"createrfp",
    "RFPlist":"rfp/all",
    "CloseRFP":"rfp/closerfp/",
    "RFPQuotesByID":"rfp/quotes/",
    "approveVendor":"approveVendor",
    "registerAdmin":"registeradmin",
    "forgetPassword":"forgetPassword", //post,
    "reset":"confirmotpresetPassword", //post
    "login":"login",//post
    "registervendor":"registervendor",
    "rfpapply":"rfp/apply/",
    "vendorRFP":"rfp/getrfp/",
    "vendorQuote":"rfp/quotes/"
}
export const clientSideValidation={
    "firstName":"First name is required",
    "lastName":"Last name is required",
    "cpassword":"Confirm Password is required",
    "password":"Enter a valid Password.(e.g., Pass@123)",
    "email":"Enter a valid email address",
    "mobile":"Phone must be 10 digits",
    "passwordMatch":"Passwords do not match",
    "otp":"Invalid OTP",
    "gst":"Enter a valid GST No.(e.g., 22AAAAA1234A1Z5)",
    "pan":"Enter a valid PAN No. (e.g., AAAAA1234A)",
    "category":"Category Name is required",
    "revenue":"Last 3year revenue is required(e.g.,100,100,100)",
    "noOfEmployee":"Number of Employees is required",
    "vendorPrice":"Vendor Price is required",
    "rfpno":"RFP No. is required",
    "itemname":"Item name is required",
    "itemdescription":"Item description is required",
    "quantity":"Quantity is required",
    "lastdate":"Last date is required",
    "minprice":"Minimum price is required",
    "maxprice":"Maximum price is required",
    "vendor":"Vendor is required"
}
export const Regex={
   "email":/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   "password":/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
   "mobile":/^\d{10}$/,
   "revenue":/^\d+,\d+,\d+$/,
   "gst":/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
   "pan":/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
   
}
export const alertMessage={
    "tryAgain":"Please try again.",
    "reset":"Password Reset successful!",
    "login":"Login successful!",
    "Incorrect":"Incorrect Email/Password!",
    "Registration":"Registration successful!",
    "quotation":"quatation submit successfull",
    "category":"Category Add successfully!",
    "updatecategory":"Category updated successfully!",
    "rfp":"RFP Create successful!"
}
export const storage={
    "userName":"userName",
    "token":"Token",
    "user_id":localStorage.getItem("user_id"),
    "quantity":"quantity",
    "rfp_id":"rfp_id",
    "category_id":"category_id"

}