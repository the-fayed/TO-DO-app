# TO-DO App

Submit and track the progress of your daily, monthly, or yearly tasks!
## How to use APIs

At first, you need to configure environmental variables, such as:  

```
DB_CONNICTION, 
PORT,
SECRET_KEY,
EXPIRATION_TIME,
BASE_URL,
(SERVICE, EMAIL_PORT, SENDER, and SENDER_PASS) for email verification, 

```

## Usage of APIs

```
/api/v1/users (POST) => admin to add user

/api/v1/users (GET) => admin to get all users

/api/v1/users/:id (GET) => admin to get specific user info,
                        => user to get his info

/api/v1/users/:id (DELETE) => admin to delete user
                          => user to delete his account

/api/v1/users/:id (PATCH)  => admin to update users
                           => user to update his info (first name, last name, or password)


/api/v1/auth (POST) => user login API

/api/v1/signup (POST) => user signup API

/api/v1/users/:id/verify/:token (GET) => verify user email

------------------------------------------------------------------------------------------

/api/v1/tasks/:id (POST) => add new task

/api/v1/tasks (GET) => get all tasks for user (**MUST SEND USER ID ON HEADERS!**)

/api/v1/tasks/:id (GET) => get specific task info

/api/v1/tasks/:id (PUTCH) => update task ifo

/api/v1/tasks/:id (DELETE) => delete specific task



```
The app used technologies :  
=> node.js, express.js, and MongoDB  
=>express-validator for validation   
=>authorization  
=>authentication  
=> nodemailer for verifying user email


## Contributing


## License
