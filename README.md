# ShareLink

Welcome to **ShareLink**—a platform I built that lets you effortlessly organize and share your important links with just a click! It’s simple, responsive, and focuses on security with its built-in authorization. Below, I’ll walk you through the technologies I used, how you can run it locally, and a few decisions I made during development.

## Technologies Used

Here’s a breakdown of the tech stack that powers ShareLink:

### Frontend:
- **TypeScript**: For better type safety and to catch errors early.
- **Next.js**: For the React framework and server-side rendering.
- **Tailwind CSS**: To handle styling, making everything responsive.
- **GSAP**: For animations to add a bit of fun and smooth interactions.

### Backend:
- **TypeScript**: Again, for safer code on the server side.
- **Express.js**: To build the API and handle server-side logic.
- **Node.js**: For the backend runtime environment.
- **JWT**: Used for token-based authentication.
- **Bcrypt**: For securely hashing passwords.
- **Zod**: For data validation, ensuring the inputs are what we expect.

### Database:
- **MongoDB**: Stores all user data and links.

### Deployment:
- **Vercel**: Used to host the frontend. You can check out the live app [here](https://oj-sigma.vercel.app/).
  
### Other Important Packages:
- **Next-Auth**: For handling authentication.
- **Resend Email**: For sending verification emails and OTPs.

## Features

1. **Authentication and Authorization**: Implemented with **Next-Auth** for secure login.
2. **User Dashboard**: After logging in, users can create, read, update, and delete links.
3. **Drag and Drop**: Easily reorder links by dragging them.
4. **Responsive Design**: Works on all screen sizes.
5. **Hover Effects**: For smoother, interactive experience.
6. **Database Integration**: All user data and links are saved securely in **MongoDB**.

## Running the Project Locally

To get ShareLink running locally on your machine, follow these steps:

### Prerequisites
- Make sure you have **Node.js** and **npm** (or **yarn**) installed.
- Clone the repository from GitHub: 
  ```git clone https://github.com/Ravi3727/ShareLink.git``` 
  ```cd ShareLink```   

  ## Steps to Start the Project 
  #### Install Dependencies: Run the following command to install all the required dependencies:
  ```npm install``` 
  #### Set Up Environment Variables: Create a .env file in the root of the project and add necessary environment variables, such as:

#### DATABASE_URL =""  
#### NEXTAUTH_SECRET="" 
#### MAIL_HOST="" 
#### MAIL_USER="" 
#### MAIL_PASS=""  

### Run the Development Server: Start the development server: 
```npm run dev```  
#### The project should now be running on http://localhost:3000. 

#### Build the Project: If you want to build for production, use: 
```npm run build```  

#### Assumptions and Decisions  
#### Unique Username Check: I implemented debouncing when verifying if a username is unique. This reduces unnecessary API calls while typing.  
#### OTP-based Email Verification: To ensure emails are valid, I added a feature where users receive an OTP during signup, which they must confirm. 
#### Security: Passwords are hashed using Bcrypt, and JWT handles session tokens. 
#### Drag and Drop: I used react-beautiful-dnd to implement the drag-and-drop functionality, which makes managing links more intuitive. 
#### Resend for Emails: Instead of setting up a custom mail server, I decided to use Resend for sending emails. This made the implementation easier and more reliable. 


#### Key Routes  
#### Here are some important routes for the API:

##### /api/signup: Creates a new user in the database. 
##### /api/signin: Logs in an existing user. 
##### /api/resetPassword: Allows users to reset their password. 
##### /api/verifyUniqueUsername: Checks if a username is already taken. 
##### /api/sendVerifyOTP: Sends an OTP to the user’s email for verification. 
##### /api/verifyOTP: Verifies the OTP entered by the user. 

### Final Thoughts 
#### I built ShareLink to simplify link management and make it easy to organize all your important URLs in one place. The secure authentication and drag-and-drop interface make it easy to use, and the responsive design ensures it works on all devices. 

#### If you have any feedback or ideas, feel free to reach out! You can also check out the website on (https://share-link-ivory.vercel.app) here. Thanks for checking out ShareLink!  
