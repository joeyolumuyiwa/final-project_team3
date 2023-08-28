# final-project_team3

# Definition of project
Gift4U 

To create a user-friendly platform where users can buy e-gift cards, we created a mobile/web application. In order to provide all your e-gift cards, prepaid payment cards, game cards and subscriptions online, instantly delivered by email, we provide seamless and secure online payment solutions. We bring a digital assistant to issue prepaid cards & gift cards directly to you. Wherever you are, whenever you need them, looking for subscriptions, games, shopping vouchers, choose from a wide variety of vendors and buy your eGift cards online with fast email delivery. The main objective of the Gift4U is to create a user-friendly management tool that helps individuals stay organised and productive.

# Pre-requisites
Gift4U application was developed using CSS, Javascript, Node.js, Express.js, React.js. We used Cloudinary to store the images of the e-gift cards. The google authentication was implemented using the OAuth 2.0 Client IDs. For the database, and for data management, the application was built on the industry's developer data platform MongoDB. From event-driven app to edge use cases and search, we built at the scale users demand. We selected a variety of expedited integration options to harness the power of the application We delivered our transactional and marketing emails through the world's largest cloud-based email delivery platform, Sendgrid. We built and monitor our email solution on this trusted foundation. We used the signing algorithm Json Web Token to take the header, the payload, and the secret to create a unique signature. Then together with the header and the payload, these signatures form the JWT, which then gets sent to the client.

# Installation (for Linux)
Clone the repository https://github.com/joeyolumuyiwa/final-project_team3
Run 
``npm i to install Node on both the server-side and on the client-side.
To install the dependencies on the server side, run

``npm i cors
``npm i dotenv
``npm i express
``npm i jsonwebtoken
``npm i mongoose
``npm i morgan
``npm i multer
``npm i react-google-login
``npm i validator
``npm i bcrypt
``npm i @sendgrid/mail
``npm i cloudinary

To install the dependencies on the client side, run
``npm i --save @fortawesome/fontawesome-free.

``npm i @react-oauth/google.

``npm i axios.

``npm i react-google-login.

``npm i react.

``npm i react-router-dom.

``npm i gapi-script.

``npm i react-oauth.

# Features
The git4U Project features a minimalist and clean design. The interface is designed to be visually appealing and easy to navigate, allowing users to focus on their tasks without unnecessary distractions. The color scheme and typography are chosen to enhance readability and promote a sense of clarity and organization.

Gift cards are non-reloadable prepaid cards that can be used anywhere the card brand whose logo they display is accepted. The stored Euro amounts vary. 

### Registration and login
Each user can register and login subsequently. Here the browser's Local Storage API is used to store and retrieve login data, allowing users to keep their login details even after refreshing the application. In the application, event-handler is used in handling user interactions and responding to events such as button clicks, enabling smooth and efficient registration and login management.

### Google authentication
To use the Google login, we’ll need to install the @react-oauth/google or react-google-login package. This is Google’s new Identity Services SDK; it allows us to integrate the Google login feature into our React app. Additionally, react-google-login allowed us to obtain the access tokens we need to access all Google APIs quickly and safely. 

With react-google-login and @react-oauth/google we got an error message. We inserted gapi from gapi-script, and the script ran smoothly.	

### Change password, reset password, recover password 					
Putting security measures in place on our application to ensure that users register with strong passwords is a top priority for us. As users, the passwords used on websites are easily forgotten. Normally, users who create different accounts with unique passwords are more likely to forget their passwords. 

When a user tries to log in and the server returns an error indicating that either the email or password is invalid, the user can click on the Forgot Password link on the login page. Also, in the event that the user’s account was compromised, the user can click on the Forgot Password link to start the password reset process.

On this application, there are error handlers with error messages viz “password and confirm password don't match”, “your current password is wrong. If you forgot your current password, click here to reset your password”. At submithandler, a logic was written to check the confirmed password. Then we used axios to make an api call.

On the forgot password page, the user will provide the email and click on the send reset code button. Next, React will make an axios PUT request with the email address included in the payload to the /api/user/reset-password endpoint on the server.

The server will then check the database to see if a user with that email exists, generate the password reset HTML template and send the password reset link to the user’s email inbox using sendgrid/email.

From the password reset email, the user can click on the “Reset Password” button to be redirected to the password reset page. On a successful password update, an alert notification will be displayed to the user, and React will redirect the user to the login page.

### Landing page
Here we used useEffect hook to set a settimeout for the page to lay a graphic and then navigate to the home page.


### Home
On the home page, we have the various category of e-gift cards. The user can select their cards according to their wish.

### Cart
In ecommerce apps, the shopping cart is a place where the user can store and view the items they are considering purchasing. In other words, the cart page displays the customer's chosen items. Each item should display at least an image, a title, plus and minus buttons (for adding/removing items) and the current quantity of the item in the cart.

This component is responsible for rendering the chosen products of the user. It displays one product per row and includes a component that allows the user to update the quantity of the product. At the bottom of the page, it also shows the total price of the selected products.




																								
