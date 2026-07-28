# Section 1: 

## Task 1.1:

### 1. What is the status code?

`200 OK`

The status code 200 means the request was successful. The server received the request, processed it correctly, and returned the requested data. The OK message confirms that the response was completed without any errors.

---

### 2. What is the Content-Type header value?

`application/json; charset=utf-8`

The Content-Type header tells the client what type of data is being returned. Here:

- `application/json` means the response body is in JSON (JavaScript Object Notation) format.
- `charset=utf-8` specifies that the response uses UTF-8 character encoding, which supports most languages and special characters.

---

### 3. How many users are returned? (Count the `"id"` fields in the body)

`10`

The response body contains 10 user objects, each with a unique `"id"` field ranging from 1 to 10. Since each object represents one user, the API returns a total of 10 users.

---

### 4. What is the URL structure — collection or single resource?

Collection Resource (`/users`)

The URL `https://jsonplaceholder.typicode.com/users` represents a collection resource because it returns a list of multiple users. Collection endpoints are used to retrieve or manage groups of resources.

If the URL were `https://jsonplaceholder.typicode.com/users/1`, it would represent a single resource, as it returns information for only one specific user with the ID `1`.

## Task 1.2:

### 1. What status code did the second request return?

`404 Not Found`

The second request was made to `/users/9999`, but no user with the ID `9999` exists. The server returned the 404 Not Found status code, indicating that the requested resource could not be found.

---

### 2. What was in the response body for the 404?

`{}`

The response body contains an empty JSON object (`{}`). This means the API did not return any user data because the requested resource does not exist.

---

### 3. What does this tell you about how this API handles "not found"?

This API handles a "not found" request by returning a 404 Not Found status code along with an empty JSON object (`{}`). This clearly indicates that the requested resource does not exist while still returning a valid JSON response that applications can process without errors.

## Task 1.3:

### 1. How many posts were returned?

`10`

The response contains 10 post objects, all of which have `"userId": 1`. This means the API returned all posts created by User 1.

---

### 2. Which part of the URL is the path? Which part is the query string?

For the URL:

```text
https://jsonplaceholder.typicode.com/posts?userId=1
```

- Path: `/posts`
- Query String: `?userId=1`

The path identifies the resource (`posts`), while the query string filters the results by returning only posts where `userId` is `1`.

---

### 3. Could you use a path parameter instead (`/users/1/posts`)?

Yes.

The URL:

```text
https://jsonplaceholder.typicode.com/users/1/posts
```

uses a path parameter (`1`) to identify the user and accesses the posts that belong to that specific user.

---

### 4. Do both return the same results? Which URL style do you prefer and why?

Yes, both URLs return the same 10 posts for User 1.

I prefer the path parameter style (`/users/1/posts`) because it clearly represents the relationship between the user and their posts. It is more intuitive and follows RESTful API design, making the URL easier to understand.

The query parameter style (`/posts?userId=1`) is useful when filtering a collection of posts based on one or more criteria, especially when multiple filters are needed.

# Section 2:

## Task 2.1:

### 1. What status code was returned?

`201 Created`

The 201 Created status code indicates that the request was successful and a new resource was created on the server. This is the standard response for a successful `POST` request that creates a resource.

---

### 2. What is in the response body? What `id` was assigned?

The response body contains the data that was sent in the request, along with a newly assigned `id`.

```json
{
  "title": "REST is easy",
  "body": "Once you know the verbs",
  "userId": 1,
  "id": 101
}
```

The assigned `id` is `101`. Since JSONPlaceholder is a fake API, it simulates creating a new resource by returning a new ID instead of actually storing the data.

---

### 3. Did the `Location` header appear?

No.

The response did not include a `Location` header. In many real-world REST APIs, the `Location` header is returned after a successful `POST` request to indicate the URL of the newly created resource (for example, `/posts/101`). JSONPlaceholder does not provide this header, which is a limitation of the mock API.

---

### Comment: What would happen if you sent the same POST request a second time? What status code should a well-designed API return on a duplicate?

If the same `POST` request is sent a second time to JSONPlaceholder, it will again simulate creating a new resource and return `201 Created` with a new `id`. Since it is a mock API, it does not check for duplicate data.

In a well-designed real-world API, if duplicate resources are not allowed, the server should detect the duplicate and return `409 Conflict`. This status code informs the client that the request could not be completed because it conflicts with an existing resource.

## Task 2.2:

### 1. What fields appear in the PUT response body vs the PATCH response body?

PUT Response Body:

```json
{
  "id": 1,
  "title": "Replaced title",
  "body": "All fields replaced",
  "userId": 1
}
```

The `PUT` response contains all fields of the resource:

- `id`
- `title`
- `body`
- `userId`

This is because `PUT` is used to replace the entire resource.

PATCH Response Body:

```json
{
  "userId": 1,
  "id": 1,
  "title": "Just the title changed",
  "body": "quia et suscipit..."
}
```

The `PATCH` request only sent the `title`, but the response contains the complete resource. The updated `title` is returned, while the other fields (`id`, `userId`, and `body`) remain unchanged.

---

### 2. Why did PATCH only need one field in the body?

`PATCH` is designed for partial updates. It only requires the fields that need to be changed, leaving all other fields unchanged.

In this example, only the `title` needed to be updated, so the request body contained just:

```json
{
  "title": "Just the title changed"
}
```

This makes `PATCH` more efficient because there is no need to resend the entire resource.

---

### 3. When would you choose PUT over PATCH in a real intern dashboard API?

You would use PUT when you want to replace an entire resource. For example, if an administrator edits an intern's complete profile (name, email, department, score, and status), the client can send the full updated object using `PUT`.

You would use PATCH when only a few fields need to be updated. For example, updating only an intern's score, department, or status without sending the rest of the profile. This reduces the amount of data sent and avoids modifying fields that have not changed.

## Task 2.3:

### 1. What status code was returned?

`200 OK`

The server returned 200 OK, indicating that the `DELETE` request was successfully processed. In JSONPlaceholder, the request is simulated, so the resource is not actually deleted.

---

### 2. What was in the response body?

`{}`

The response body contains an empty JSON object (`{}`). This indicates that the server successfully handled the request but did not return any additional data about the deleted resource.

---

### 3. Is 200 or 204 more appropriate for a successful DELETE? Why?

While 200 OK is a valid response for a successful `DELETE` request, 204 No Content is generally considered more appropriate when there is no response body to return.

- 200 OK is suitable if the server wants to return information about the deleted resource or a confirmation message.
- 204 No Content is preferred when the deletion is successful and there is nothing else the client needs to receive.

In most real-world REST APIs, 204 No Content is commonly used for successful `DELETE` operations because it clearly indicates that the resource was deleted and no response body is necessary.

# Section 3:

### Task 3.1:

| Scenario | Status Code | Reason |
|----------|------------:|--------|
| GET /interns — 15 interns found | 200 OK | The request was successful, and the server returned the requested list of interns. |
| POST /interns — intern created successfully | 201 Created | A new intern resource was successfully created on the server. |
| DELETE /interns/42 — deleted, no body needed | 204 No Content | The resource was deleted successfully, and there is no response body to return. |
| GET /interns/9999 — this intern does not exist | 404 Not Found | The requested intern does not exist on the server. |
| POST /interns — request body is missing `name` field | 400 Bad Request | The client sent an invalid request because a required field (`name`) is missing. |
| GET /interns — user is not logged in | 401 Unauthorized | The user must authenticate before accessing the resource. |
| GET /interns/42 — user is logged in but only admins can see this | 403 Forbidden | The user is authenticated but does not have permission to access this resource. |
| POST /interns — database crashed | 500 Internal Server Error | An unexpected server-side error occurred while processing the request. |

## Task 3.2:

### Bug A

Response:

```http
GET /interns/99
→ 200 OK
→ { "error": "Intern not found" }
```

What's wrong?

The server returned 200 OK, which indicates that the request was successful. However, the response contains an error message saying the intern was not found.

Correct Status Code: `404 Not Found`

Reason: The requested intern does not exist, so the API should return 404 Not Found instead of 200 OK.

---

### Bug B

Response:

```http
POST /interns
→ 200 OK
→ { "id": 44, "name": "Priya" }
```

What's wrong?

The intern was successfully created, but the API returned 200 OK instead of the standard status code for resource creation.

Correct Status Code: `201 Created`

Reason: A successful `POST` request that creates a new resource should return 201 Created.

---

### Bug C

Response:

```http
DELETE /interns/42
→ 200 OK
→ { "message": "deleted" }
```

What's wrong?

Although 200 OK is valid, the response body is unnecessary if there is no additional information to return.

Correct Status Code: `204 No Content`

Reason: When a resource is successfully deleted and no response body is needed, 204 No Content is the preferred RESTful response.

---

### Bug D

Response:

```http
GET /interns
→ 403 Forbidden
```

What's wrong?

The user's authentication token has expired. This is an authentication issue, not a permission issue.

Correct Status Code: `401 Unauthorized`

Reason: 401 Unauthorized indicates that the user must authenticate again because the token is invalid or has expired. 403 Forbidden is used when the user is authenticated but does not have permission to access the resource.

---

### Comment: Why does returning `200 OK` with `{ "error": "..." }` break API consumers?

Returning 200 OK with an error message can confuse API consumers because 200 tells the client that the request was successful. Many frontend applications check the HTTP status code before processing the response. If they receive 200 OK, they may assume the request succeeded and try to display or process the expected data instead of handling the error. Using the correct status code, such as 404 Not Found or 400 Bad Request, allows the frontend to detect the failure immediately and handle it appropriately, such as showing an error message or redirecting the user.

# Section 4:

## Task 4.1:

### Scenario A: Get a specific intern by ID

Correct URL:

```text
GET /interns/42
```

Reason: The intern ID identifies a single specific resource, so it should be passed as a path parameter.

---

### Scenario B: Get interns whose role is "Frontend"

Correct URL:

```text
GET /interns?role=Frontend
```

Reason: The role is used to filter the list of interns, so it should be a query parameter.

---

### Scenario C: Get the first 5 interns, sorted by score descending

Correct URL:

```text
GET /interns?limit=5&sort=score&order=desc
```

Reason: `limit`, `sort`, and `order` are used to control how the results are returned, so they belong in the query string.

---

### Scenario D: Get attendance records for intern 42

Correct URL:

```text
GET /interns/42/attendance
```

Reason: The request is for the attendance resource belonging to a specific intern, so the intern ID should be a path parameter.

---

### Scenario E: Get interns whose name contains "Rahu"

Correct URL:

```text
GET /interns?name=Rahu
```

Reason: The name is used to search or filter the collection of interns, so it should be a query parameter.

## Task 4.2:

### 1. Did the fake token cause a 401? Why not?

No.

The fake token did not cause a 401 Unauthorized response. Instead, the API returned 200 OK because JSONPlaceholder is a mock API and does not perform authentication or validate the `Authorization` header. It simply ignores the header and returns the requested data.

---

### 2. In a real API, what would the server do with the Authorization header?

In a real API, the server would read and validate the `Authorization` header before processing the request. It would typically:

- Check whether the header is present.
- Verify that the token is valid and has not been tampered with.
- Check whether the token has expired.
- Identify the authenticated user.
- Verify that the user has permission to access the requested resource.

If the token is valid, the server processes the request. Otherwise, it returns an appropriate error response, such as 401 Unauthorized or 403 Forbidden.

---

### 3. What is the difference between 401 and 403 in terms of the Authorization header?

| Status Code | Meaning |
|-------------|---------|
| 401 Unauthorized | The request is missing a valid `Authorization` header, or the token is invalid or has expired. The client must authenticate again before accessing the resource. |
| 403 Forbidden | The `Authorization` header is valid, and the user is authenticated, but they do not have permission to access the requested resource. |

In simple terms:

- 401 → "Who are you? Please authenticate."
- 403 → "I know who you are, but you are not allowed to access this resource."

## Task 4.3:

| Action | Method | URL | Request Body | Expected Status |
|--------|--------|-----|--------------|-----------------|
| List all interns | `GET` | `/interns` | None | `200 OK` |
| Get intern #7 | `GET` | `/interns/7` | None | `200 OK` |
| Create a new intern | `POST` | `/interns` | `{ "name": "...", "role": "...", "score": ..., "isPresent": ... }` | `201 Created` |
| Update intern #7's score only | `PATCH` | `/interns/7` | `{ "score": 95 }` | `200 OK` |
| Replace intern #7 entirely | `PUT` | `/interns/7` | `{ "name": "...", "role": "...", "score": ..., "isPresent": ... }` | `200 OK` |
| Delete intern #7 | `DELETE` | `/interns/7` | None | `204 No Content` |
| List interns with role = Backend | `GET` | `/interns?role=Backend` | None | `200 OK` |
| Get all attendance for intern #7 | `GET` | `/interns/7/attendance` | None | `200 OK` |

---

### Comment: Would you have a separate `/attendance` resource or would you nest it under `/interns/{id}/attendance`? What are the tradeoffs?

We would use `/interns/{id}/attendance` because attendance belongs to a specific intern, making the relationship between the intern and their attendance records clear. This approach is simple, easy to understand, and follows REST principles by treating attendance as a sub-resource of an intern.

A separate `/attendance` resource would be more suitable if attendance records needed to be managed independently or queried across multiple interns, such as filtering attendance by date or generating reports. While it provides more flexibility, it also requires additional query parameters (for example, `/attendance?internId=7`).

For an intern dashboard, we would choose `/interns/{id}/attendance` because it clearly expresses the relationship and is easier for clients to understand and use.

# Section 5:

## Task 5.1:

### 1. Which lines starting with `>` are the request headers sent by curl?

The lines starting with `>` are the request sent by `curl` to the server.

```http
> GET /users/1 HTTP/1.1
> Host: jsonplaceholder.typicode.com
> User-Agent: curl/8.19.0
> Accept: */*
```

---

### 2. Which lines starting with `<` are the response headers received from the server?

The lines starting with `<` are the response headers returned by the server.

```http
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< Content-Length: 509
< Server: cloudflare
```

---

### 3. Where is the blank line that separates the headers from the body?

The blank line appears after the last response header and before the JSON response body. It marks the end of the headers and the start of the body.

---

### 4. What is the `Host` header? What value does curl send automatically?

The `Host` header tells the server which website is being requested. Curl automatically sends:

```http
> Host: jsonplaceholder.typicode.com
```

## Task 5.2:

### Comment: In a real application, which layer would make the POST request — the UI component, the service layer, or the repository layer? Why?

In a well-designed application, the service layer should make the `POST` request. The UI component should only collect user input and display the results, while the service layer handles the business logic and communicates with the API. If a repository layer exists, it is typically responsible for data access and is called by the service layer. This separation keeps the code modular, reusable, and easier to maintain and test.

## Task 5.3

### 1. What happened when `Content-Type` was missing? Did it work? Should it?

The request still worked because JSONPlaceholder is a mock API and does not strictly validate the `Content-Type` header.

In a production API, this request should usually fail if the server expects JSON. The API should return `400 Bad Request` or `415 Unsupported Media Type`, depending on how it validates incoming requests.

---

### 2. What status code did the 404 endpoint return?

`404 Not Found`

The server returned 404 Not Found because the requested endpoint (`/nonexistent`) does not exist.

---

### 3. What should a production API return in the body of a 400 or 404 response?

A production API should return a clear JSON error response that helps the client understand the problem. For example:

```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist."
}
```

or

```json
{
  "error": "Bad Request",
  "message": "The request body is invalid or missing required fields."
}
```

This makes it easier for clients to identify and handle errors correctly.

# Section 6:

## Task 6.1:

### Mistake A

Current Endpoint:

```http
GET /getAllInterns
```

Mistake: Uses a verb (`getAll`) in the URL.

Correct Endpoint:

```http
GET /interns
```

Reason: REST APIs use nouns to represent resources, while the HTTP method (`GET`) specifies the action.

---

### Mistake B

Current Endpoint:

```http
POST /interns/delete/42
```

Mistake: Uses `POST` and includes the action (`delete`) in the URL.

Correct Endpoint:

```http
DELETE /interns/42
```

Reason: The `DELETE` method should be used to delete a resource, and the resource ID should be a path parameter.

---

### Mistake C

Current Endpoint:

```http
GET /createIntern?name=Rahul&role=Frontend&score=88
```

Mistake: Uses `GET` to create a resource.

Correct Endpoint:

```http
POST /interns
```

Request Body:

```json
{
  "name": "Rahul",
  "role": "Frontend",
  "score": 88
}
```

Reason: Resource creation should use `POST`, with the data sent in the request body.

---

### Mistake D

Current Endpoint:

```http
POST /interns/42/updateScore
Body: { "score": 95 }
```

Mistake: Uses `POST` and includes the action (`updateScore`) in the URL.

Correct Endpoint:

```http
PATCH /interns/42
```

Request Body:

```json
{
  "score": 95
}
```

Reason: `PATCH` is used for partial updates, such as updating only the score.

---

### Mistake E

Current Endpoint:

```http
DELETE /interns?id=42
```

Mistake: Uses a query parameter to identify a specific resource.

Correct Endpoint:

```http
DELETE /interns/42
```

Reason: Resource identifiers should be passed as path parameters, while query parameters are intended for filtering or searching collections.

## Task 6.2:

| Action | Method | URL | Expected Status |
|--------|--------|-----|-----------------|
| List all projects | `GET` | `/projects` | `200 OK` |
| Get a specific project | `GET` | `/projects/{projectId}` | `200 OK` |
| Create a project | `POST` | `/projects` | `201 Created` |
| List all projects an intern is assigned to | `GET` | `/interns/{internId}/projects` | `200 OK` |
| Assign an intern to a project | `POST` | `/projects/{projectId}/interns/{internId}` | `201 Created` |
| Remove an intern from a project | `DELETE` | `/projects/{projectId}/interns/{internId}` | `204 No Content` |

---

### Comment: Is `POST /projects/{id}/interns/{internId}` a good endpoint for assigning an intern? Or should it be `POST /interns/{id}/projects/{projectId}`? What determines which is the "owner" resource?

Both endpoints can be valid because they represent the same relationship from different perspectives. The choice depends on which resource is considered the owner of the relationship.

If projects are responsible for managing their assigned interns, then `POST /projects/{projectId}/interns/{internId}` is the better choice. If interns are responsible for managing the projects they are assigned to, then `POST /interns/{internId}/projects/{projectId}` is more appropriate.

The owner resource is usually determined by the application's business logic and which resource naturally controls or manages the relationship.