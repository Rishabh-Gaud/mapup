
---
# Intersections API

The Intersections API is a mapping-based API that allows you to find intersections between a long linestring and a set of randomly spread lines on a plane. It is built using Express.js and Node.js, and it leverages the Turf.js library for geospatial calculations.

## API Features

- **Protected with Header-Based Authentication**: The API requires requests to include a `security` header with the value `"mapup"` for authentication. Requests without the correct authentication header will be restricted with a 403 Forbidden response.

- **POST Request**: The API expects a POST request to the `/intersections` endpoint.

- **Request Body**: The request body should include a GeoJSON representation of a long linestring and an array of lines.

- **Long Linestring**: The linestring represents a path with a large number of points (5,000 points) in GeoJSON format.

- **Randomly Spread Lines**: The API expects an array of 50 randomly spread lines, where each line is represented by its start and end points.

- **Intersection Calculation**: The API performs intersection calculations using the Turf.js library. It checks which of the 50 lines intersect with the given linestring.

- **Response**: The API returns one of the following:
  - An empty array (`[]`) if there are no intersections.
  - An array of intersecting line IDs along with the points of intersection.
  - An error message with a 4XX status code if the request body or authentication header is missing or malformed.
  - An error message with a 5XX status code if there is an internal server error.

## Getting Started

1. Install Node.js and npm (Node Package Manager) on your system.

2. Clone the repository and navigate to the project directory.

3. Install the dependencies by running the following command:
   ```
   npm install
   ```

4. Start the server by running the following command:
   ```
   npm run start
   ```

5. The API will start running on `http://localhost:3000`. You can now send POST requests to `http://localhost:3000/intersections` with the required headers and request body.

## Testing the API with Postman or cURL

You can test the Intersections API using Postman or cURL. Here's how you can make a POST request to the API:

### Using Postman

1. Open Postman and create a new request.

2. Set the request method to `POST` and enter the API endpoint URL: `http://localhost:3000/intersections`.

3. Add the required authentication header:
   - Key: `security`
   - Value: `mapup`

4. In the request body, select the `form-data` option and set keys file type.
![image](https://github.com/Rishabh-Gaud/mapup/assets/65586827/65596724-21ca-4b49-88c4-31bcd5d087e8)
![image](https://github.com/Rishabh-Gaud/mapup/assets/65586827/a4af99bd-db47-4030-84c6-1e32411e5e8e)
![image](https://github.com/Rishabh-Gaud/mapup/assets/65586827/fba9289a-a4ee-4d99-a26c-a572290f1682)

5. Provide the GeoJSON representation of the linestring and lines in the request DataForm file. For example:
```
lines.json file
long-ls.json file

```

6. Click the "Send" button to send the request. The response will contain the intersections or error messages based on the request.


---
