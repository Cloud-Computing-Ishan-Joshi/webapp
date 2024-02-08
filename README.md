# webapp

Cloud Computing Assignments

# Assignment #02

Name: Ishan Subodh Joshi

NUID: 002836254

## Setup

### APIs To Implement[¶](https://spring2024.csye6225.cloud/assignments/02/#apis-to-implement "Permanent link")

[Swagger Docs](https://app.swaggerhub.com/apis-docs/csye6225-webapp/cloud-native-webapp/2024.spring.02)

1. Your web application must only support Token-Based Basic authentication and not Session Authentication.
2. As a user, I must provide a basic authentication token when making an API call to the authenticated endpoint.
3. Create a new user
   1. As a user, I want to create an account by providing the following information.
      1. Email Address
      2. Password
      3. First Name
      4. Last Name
   2. `account_created` field for the user should be set to the current time when user creation is successful.
   3. Users should not be able to set values for `account_created` and `account_updated`. Any value provided for these fields must be ignored.
   4. `Password` should never be returned in the response payload.
   5. As a user, I expect to use my email address as my username.
   6. Application must return 400 Bad Request HTTP response code when a user account with the email address already exists.
   7. As a user, I expect my password to be stored securely using the `BCrypt` password hashing scheme with salt.
4. Update user information
   1. As a user, I want to update my account information. I should only be allowed to update the following fields.
      1. First Name
      2. Last Name
      3. Password
   2. Attempt to update any other field should return 400 Bad Request HTTP response code.
   3. `account_updated` field for the user should be updated when the user update is successful.
   4. A user can only update their own account information.
5. Get user information
   1. As a user, I want to get my account information. Response payload should return all fields for the user except for password.

### To Install requirements

```bash
npm i
```

### Create .env file in Project folder

```shell
DB_NAME=healthz 
DB_USER=postgres
DB_PASSWORD=<password>
DB_HOST=localhost
PORT=5000
NODE_ENV=dev
```

### Run Test Cases

```shell
npm run test
```

### Run application

```shell
npm run dev
```
