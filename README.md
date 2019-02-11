# Emission-app
## [View site live](https://emission-app.herokuapp.com/)

Site that allows users to visually compare the rise of emissions between two areas.
Minimum requirement to see results is to select one area/country. To compare results between
two areas, select another area. Additionally you can select to see only records from specific years and 
also select the emission to be viewed in relation to the area's population.

## Initializing the database

The app uses a mongodb that is created and initialized by running the script db-init.js in
backend/dbinit. This takes the data from the xml files in data folder and initializes areas and
records based on the records in the xml files. If there is no MONGO_URI, MONGO_ADMIN_PASSWORD and
MONGO_ADMIN_USER environment variables specified, the database is initialized locally.

## Running the app

With docker-compose:
`docker-compose build` and `docker-compose up`

Without:
`node backend/server.js`
and from client-folder:
`npm run start`

## What I learned

* MERN-stack development
* Parsing data from xml files
* Creating graphs with React-libraries (Victory)
