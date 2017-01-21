

# sg-uService-event-buddy-web-server


Microservice description

## Installation


Install via git clone

```bash
$ git clone https://github.com/visa-innovation-sf/sg-uService-event-buddy-web-server.git
$ cd sg-uService-event-buddy-web-server
$ npm install
$ npm start
```

## Documentation

Microservice description

## Example


```javascript
//example code here
```

## Authentication

Explain JWT authentication with steps.

### Creating a token for accessing micro service


## Tests

Run all tests

```bash
$ npm test 
# Execute tests in watch mode
$ npm run test:watch
```
## APIs



|  API                             | Method    |Description                                      |Secured
| -------------------------------- | --------- |-------------------------------------------------|-----
| /api/health-check       | GET       | Check microservice status. Should return 200/OK | No
| /api/users/:userId      | Get       | Retrieves a user                                | Yes
| /api/users              | GET       | Retrieves all user                              | Yes
| /api/users/:userId      | PUT       | Updates a user                                  | Yes
| /api/users/:userId      | DELETE    | Deletes a user                                  | Yes
| /api/users/:userId      | POST      | API Description                                 | Yes
| /api/auth/login         | POST      | Authenticates a user into microservice          | No

## Dev notes

Additional notes for developers



