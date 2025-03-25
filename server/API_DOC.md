# API Documentation

## Endpoints Overview

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/getItems"`          | `GET`  | Returns an array with all the items and their properties       |


---

## Responses Overview

Each of these endpoints will return an object. What it contains depends on if it succeeded or failed.

If there is an issue, the response object will contain a status and a message.

```js
{
  "status": >=400,
  "message": "...",
}
```

If the server was successful, there will always be a status in the object, but any other key values pairings will depend on the endpoint.

---

## Endpoint Details

### "/faces" (GET)

On success
```js
{
  "status": 200,
  "data": [...],
}
```

Elements of the `data` array will have keys: `_id`, `name`, `price`, `body_location`, `category`, `imageSrc`, `numInStock`, and `companyId`.

Unsuccessful status codes: 500.

---
