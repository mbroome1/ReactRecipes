# A recipe finding app using React, .NET 6 and C#
Using Spoonacular API for fetching recipes. API key must be provided via an environment variable or through user secrets apon running the app.

*Note: HTTPS is disabled as I am running a reverse proxy in front that provides SSL already.*
## Docker
### 1. Build docker image:
* docker build -t reactrecipes .
### 2. Create container with api key as environment variable, assign host port 5002 to port 80 of container:
* docker run --name reactrecipes_app -p 5002:80 -e spoonacular=API_KEY_HERE reactrecipes

## Docker Manual Publish
### 1. Publish in root of project
* dotnet publish -c Release -o publish

### 2. Build docker immage
* docker build -t reactrecipes_manual -f Dockerfile_manual_publish .
 
### 3. Create container with api key as environment variable, assign host port 5003 to port 80 of container:
* docker run -d --name reactrecipes_manual_one -p 5003:80 -e spoonacular=API_KEY_HERE reactrecipes_manual
