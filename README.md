# 👨🏽‍💻 ParvaazParindey
A website for Asha Akanksha Foundation using Node.js, Express,MongoDB. Deployed at [link https://parvaaz-parindey.aafngo.org](https://parvaaz-parindey.aafngo.org)

The website uses Passport.js for handling authentication. It also uses good coding practices like RESTful routing.

### 🔌 Technologies used
- Front-End: HTML, CSS, Bootstrap, JavaScript.
- Back-End: JavaScript (npm, nodejs,  async, body-parser, cloudinary, connect-flash, ejs, express,express-session, method-override, mongoose,multer, nodemailer, passport, passport-local, passport-local-mongoose)

### :star: Features
- Responsive web design
- Authentication:
    - User sign up and login with email and password
    - Admin login using admin credentials
    - Password Reset
- User Mode
    - The website consists of a portal for keeping people updated about the latest opportunities in different fields. These posts could be looked up category wise by clicking on the category and also allows the user to navigate from one category to another.
    After logging in the user can also submit an opportunity using a form, which would be reviewed by the admin (using admin dashboard in the admin mode) before posting.
    - It consists of another section for holding discussions and bringing into light importance issues. The users could submit posts which after being reviewed by admin appear in the explore section of the website. The posts support like and comment features on logging in.
- Admin Mode
    - Consists of an admin dashboard which allows the admin to approve or delete the submitted posts/opportunity.
    - Provides admin access to edit/delete feature on all posts and comments.
- Authorization:
    - User can submit a post/opportunity and comment after logging in.
    - Admin can manage,approve , edit and delete all posts and opportunities
- Displaying flash messages for responding to user's interaction with the application.
- MongoDB Atlas (Cloud Database)

### :rocket: Getting Started
If you have git installed: 
```sh
$ git clone https://github.com/aastha985/ParvaazParindey.git
```
```sh
$ npm start
```

### :copyright: License
[MIT License](http://opensource.org/licenses/MIT)
