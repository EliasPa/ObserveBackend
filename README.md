<h1>Observation application backend implementation.</h1>

This application is running on heroku and it works as the main API of my weather
observing application found here: https://github.com/EliasPa/Observe .

<h2>Install guide</h2>

To install:
* set up MongoDB
* clone the project
* navigate to the root folder and run `npm install`
* run `npm start` to start the server on port 3000

<h2>Documentation</h2>

The API documentation for individual functions can be found in the comments of `observation-router.js`

* When information is passed to the server through the temperature API, it will always be checked for its validity first.
This way no invalid information will make its way into the database.

* The API doesn't support adding locations dynamically, but the locations are seeded in the database separately,
which makes adding more locations quick and easy.

<h4>Technologies used</h4>

* NodeJS
* MongoDB and MongoLab
* Heroku