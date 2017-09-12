## Simple api with JWT - JSON WEB TOKEN

```
Are three parths, splited by dot(.), encoded with base64 individually:
<base64-encoded header>.<base64-encoded claims>.<base64-encoded assinatura>
```

### availables requests


|URL|Method|Description|
|---|------|-----------|
|/|GET| The Home page of the system|
|/api/login|POST| Authenticate a user in the app|
|/api/users/create|POST| Create a user in the app|
|/api/users|GET| List all user of the app|

### home page
```Javascript
{
  "message": "Welcome"
}
```


### Login
```Javascript
// Success
{
  "token": "the string with the token generated",
  "expires": "the expired timestamp",
  "user": "json with date of the user found"
}
// Fail
{
  "message": "the fail message"
}
```

### List all users
```Javascript
// Success
[
  {
        "_id": "mongo-id",
        "username": "my-username",
        "password": "my-passwd",
        "created": "datetime",
        "status": 1,
        "email": "my-email@email.com",
        "name": "name",
        "id": "mongo-id"
    },
]
// Fail
{
  "message": "the fail message"
}
```

### Create User
```Javascript
// Success
{
  "message": "the success message", 
  "data": "the json with user data"
}
// Fail
{
  "message": "the fail message"
}
```
