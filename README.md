## Simple api with JWT - JSON WEB TOKEN

```
Are three parths, splited by dot(.), encoded with base64 individually:
<base64-encoded header>.<base64-encoded claims>.<base64-encoded assinatura>
```

### availables requests

### home page

GET '/'

```Javascript
{
  "message": "Welcome"
}
```

### List all users

GET '/api/users'

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

POST '/api/users/create'

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

### Login

POST /api/login
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
