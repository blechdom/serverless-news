# Kristin Galvin
## Full-Stack Developer Task
### Live Site
http://hellobluegoose.com

### Login
http://hellobluegoose.com/login

#### User Credentials (to see 'article viewed' feature)
    email: user@hellobluegoose.com
    password: userPassword

#### Admin Credentials (to see 'new/edit article' features)
    email: admin@hellobluegoose.com
    password: adminPassword

### Architecture
* Create-React-App
* MUI (Material UI)
* axios library
* Static Website Hosting on S3
* Image Storage on S3
* DynamoDB
* Lambda Proxy
* API Gateway
* Route53 DNS
* Github Actions for CI/CD
* Jest

### Pain Points / Self-Critique
* AWS CORS issues between API Gateway, Lambda Proxy and React App
* Time needed for additional Front-end tweaks
* Lack of security for login/authentication
* Cheap implementation of 'viewed article' feature
* Only a few tests
* HTTP not HTTPS, still 'pending validation' from AWS Certificate Manager for SSL
