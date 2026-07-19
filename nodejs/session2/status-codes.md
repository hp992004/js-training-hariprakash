# Status Codes

## 200 OK

The request was successful, and the server returned the requested data. **Example:** Opening `/users` and getting the list of users.

## 201 Created

A new resource was created successfully. **Example:** A new user signs up and their account is created.

## 400 Bad Request

The request contains invalid or missing data. **Example:** A user submits a form without filling in all the required fields.

## 401 Unauthorized

The user must log in before accessing the resource. **Example:** Trying to open a profile page without logging in.

## 403 Forbidden

The user is logged in but doesn't have permission to access the page. **Example:** A normal user tries to open the admin dashboard.

## 404 Not Found

The requested page or resource could not be found. **Example:** Visiting a URL that doesn't exist.

## 500 Internal Server Error

Something went wrong on the server while processing the request. **Example:** The server fails because of an unexpected error in the code.
