# A recipe finding app using React, .NET 6 and C#
Using Spoonacular API for fetching recipes. API key must be provided via an environment variable or through user secrets apon running the app.

* Development environment has no modified base url.
* Production environment has a base url set to `/reactrecipes`, see Nginx section below for more.
* HTTPS is disabled as I am running a reverse proxy in front that provides SSL already.

## Docker Publish
### 1. Build docker image:
`docker build -t reactrecipes .`
### 2. Create container with api key as environment variable, assign host port 5003 to port 80 of container:
`docker run --name reactrecipes_app -p 5003:80 -e spoonacular=API_KEY_HERE reactrecipes`

OR 

## Docker Manual Publish
### 1. Publish in root of project (along side .sln file)
`dotnet publish -c Release -o publish`

### 2. Build docker image
`docker build -t reactrecipes -f Dockerfile_manual_publish .`
 
### 3. Create container with api key as environment variable, assign host port 5003 to port 80 of container:
`docker run -d --name reactrecipes_app -p 5003:80 -e spoonacular=API_KEY_HERE reactrecipes`

## Nginx Web Server Settings
Create a location block within server block, using `/reactrecipes/` url. Assign docker container port used above (e.g. 5003).
```
location /reactrecipes/ {
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:5003/;
}
```
