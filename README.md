# A recipe finding app using React, .NET 6 and C#
Using Spoonacular API for fetching recipes. API key must be provided via an environment variable or through user secrets apon running the app.

*Note: HTTPS is disabled as I am running a reverse proxy in front that provides SSL already.*
## Docker
### Build docker image:
* docker build -t reactrecipes .
### Create container with api key as environment variable, assign host port 5002 to port 80 of container:
* docker run --name reactrecipes_app -p 5002:80 -e spoonacular=API_KEY_HERE reactrecipes
