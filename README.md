# url-shortener
The URL shortener is a Node.js application using Express and MongoDB. It allows users to shorten long URLs and redirects them to the original URL. The service exposes two main routes: POST `/url` for creating short URLs and GET `/:shortID` for redirection. MongoDB is used for storing URL mappings persistently.
