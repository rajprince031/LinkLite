# url-shortener
The URL shortener application is a Node.js service that uses Express to manage URL shortening and redirection. It connects to a MongoDB database for persistent storage of URLs.

**Key Features:**

URL Shortening: Users send a POST request to /url with a long URL, and the service generates a short URL and stores it in MongoDB.
URL Redirection: Users can access the shortened URL via GET request to /shortID, which redirects them to the original URL.
Components:

**server.js**

Sets up the Express server, connects to MongoDB, and defines routes for URL shortening and redirection.
url_routes.js: Manages URL-related routes, including shortening and redirection, by calling functions from the URL controller.
url_controller.js: Contains the logic for generating short URLs and handling redirects.
Usage Example:

**Shorten UR**L: POST to http://localhost:8000/url with JSON { "originalUrl": "https://www.example.com" }.
**Redirect**: Access http://localhost:8000/{shortID} to be redirected to the original URL.
The application is designed to handle URL shortening and redirection efficiently with MongoDB for persistent storage.
