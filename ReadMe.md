# Backend Course: https://youtu.be/rOpEN1JDaD0?si=0JG1L3AVgd4iRlg5

- **Upstash**: sending automatic reminders <https://upstash.com/?utm_source=jsmastery2>

- **Arcjet**: to secure your whole application - for security purposes - Attack Protection, Email Validation <https://jsm.dev/backend25-arcjet>

- **Hostinger VPS**: Virtual Private Server - full control and complete customization - hosting API, fullstack application deployment   <https://hostinger.com/mastery10>

## Steps

1 Create supscription-tracker folder
2 npx express-generator --no-view --git ./
3. Delete bin, public and route, clean app.js code
4. npm install --save-dev nodemon  (nodemon always restarts your server whenever you make changes)
5. In package.json
     - change "name": "subdub"
     - Add "type": "module",  /*Use new ES6 modules*/
     - Add in "scripts"
         - "start": "node app.js",
         - "dev": "nodemon app.js"
6. Install Linter
     - npx eslint --init
     ![alt text](image.png)
7. Create Express server: to run application both locally and in production
      - Ctrl + C
      - npm install dotenv
      - Create config folder
           - create env.js
      - Create .env.production.local
      - Create .env.development.local
      - in app.js
           - `import { PORT } from './config/env.js';`
           - ```
app.listen(PORT, () => {
console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})
            ```
     - in .gitignore

            # dotenv environment variables file
           .env
           .env.*.local


8. Setup Routes
      - Create routes folder
           - Create auth.routes.js file
           - Create user.routes.js file
           ![alt text](image-1.png)
           - Create subscription.routes.js file
           - in app.js
           ![alt text](image-2.png)

           ![alt text](image-3.png)

9. Setup Database --> MongoDB (allows to create database and host it on cloud completely for free), (mongoDB in a non-sql database)          
      - Create account in MongoDB Atlas > Create Project as Project Owner
     - Choose free model in cluster
           - username - hk, password - hk
           - Choose Driver option
           - copy command --> npm install mongodb
           - In terminal --> npm install mongodb moongose (moongose allows you to cxreate easily database models and schemas)
           - Copy connecting string and add in .env.development.local
            mongodb+srv://hk:<db_password>@cluster0.fghslaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
           - write hk in place of <db_password>
           - Add DB_URI in env.js
     - Create database folder in root 
           - create mongodb.js
     - Call connectToDatabase(); in app.js  
     - Add in .env.development.local
             - # ENVIRONMENT
               NODE_ENV=development    


10. Models: How data is going to look like
       - Create models folder in root 
             - create user.model.js
             - create subscription.model.js 

11. Error Handler: Create global errror handler middleware
  - for understanding
  create a subscription --> middleware (check for renewal date) --> middleware (check for error) -->next --> controller (controller handle the actual logic of creating subscription)
       - Create middlewares folder
             - Create error.middleware.js

       -  in `app.js` add
              - app.use(errorMiddleware);
              - app.use(express.json());
              - app.use(express.urlencoded({ extended: false }));
              - app.use(cookieParser());

12. JWT Auth
        - npm install jsonwebtoken bcryptjs 
        - add in .env.development.local -->
         # JWT AUTH
         JWT_SECRET="secret"
         JWT_EXPIRES_IN="1d"    
       - Add in env.js -->  JWT_SECRET, JWT_EXPIRES_IN
       - Create controllers folder
             - auth.controller.js
                   - we write the handler for all authRouter which are previously in auth.routes.js
                            
                            ```js
                            authRouter.post('/sign-up', (req, res) => {
                           // req.body contains the parsed JSON payload sent by the client
                           // For example, { email: '...', password}
                           console.log(req.body);
                              res.send({title: 'Sign up'})
                              });
                            ```

                            **---- instead of it, we can import handler from auth.controlller-----**

                            ```js
                            import { signUp } from '../controllers/auth.controller';
                            authRouter.post('/sign-up', (req, res) => {'/sign-up', signUp});
                            ```

       - Basically **auth.routes.js** ---> create routes
       - And **auth.controller.js** ---> form the logic of what happens once you hit those routes
       - // What is a req body? --> req.body is an object containing data from the client specifically when you have (POST request)
       **Path:/api/v1/auth/sign-up --> POST BODY --> { name, email, password } --> CREATES A NEW USER**
       -POST --> http://localhost:5500/api/v1/subscriptions
        ![alt text](image-5.png)
       -POST --> http://localhost:5500/api/v1/auth/sign-up
        ![alt text](image-4.png)
       - To see users you have created in postman API
             - MongoDB>Subscription Tracker>Clusters>Browse Collections>Collections>test>users  
                   - If you see users that means our first POST API call is succeeded.
                   - Network Access > + ADD IP ADDRESS > allow all IP address > Confirm
       - POST --> http://localhost:5500/api/v1/auth/sign-in
       ![alt text](image-6.png) 
       ![alt text](image-7.png) 
       ![alt text](image-8.png)      

13. Authorization   
       - Creare `user.controller.js` in `controllers`
       - import getUsers and getUser from user.controller.js as handler in `routes>user.routes.js`    

       ```js
       userRouter.get('/', (req, res) => res.send({title: 'GET all users'}));

       userRouter.get('/:id', (req, res) => res.send({title: 'GET user details'}));
       ```
       ==***replace handler with getUsers and getUser***==
       
       ```js
       userRouter.get('/', getUsers);

       userRouter.get('/:id', getUser);
       ```
       - ![alt text](image-9.png)
       - ![alt text](image-10.png)

       - Create `auth.middleware.js` in `middlewares`
         - someone is making a request get user details --> authorize middle --> verify --> if valid --> next --> get user details
         - import authorize from "../middlewares/auth.middleware.js"; in `user.routes.js`
         - add authorize in userRouter.get('/:id',authorize, getUser); in `user.routes.js`
          ![alt text](image-11.png)
         - authorize is middleware which shows deal with token and token is available in user data, add token as bearer token in Auth otherwise it doesn't show the user details
           - copy token -->
                     ![alt text](<Screenshot 2025-09-02 235002.png>)
           - use token in auth --> ![alt text](image-12.png)




### 14. Arcjet: -------------------------------------------------------
restrict the number of requests a user can make in a certain period of time. Almost every production app does this. Arcjet helps to protect the data from bots.
![alt text](image-13.png)
 - Bot protection refers to the measures and techniques designed to detect, mitigate, and prevent malicious activities

 - Login to Arcjet 
   - Create New Site with name --> subscription-tracker
   - Select Node.js + Express
   - Copy ARCJET_KEY
   - Continue
 - Add in env.development.local
 ```
 # ARCJET
 ARCJET_KEY="ajkey_01k47rf350eh1az88vfp3ygpg0"
 ARCJET_ENV="development"
 ```
 - Add in `config>env.js` -->  ARCJET_ENV, ARCJET_KEY,
 - Get Started with Arcjet Setup ---> https://docs.arcjet.com/get-started?f=node-js-express
      - npm i @arcjet/node
      - Create `arcjet.js` in `config`
         - Copy the code from **3. Add rules** --> const aj = arcjet({});
         - change the code as per requirement
      - Create `arcjet.middleware.js` in `middlewares`
       https://docs.arcjet.com/rate-limiting/configuration  
      - add `app.use(arcjetMiddleware)` and import arcjetMiddleware in app.js (it is a middleware) 
      - Go throught Token bucket --> https://docs.arcjet.com/rate-limiting/algorithms/#token-bucket to understand what is happening

      - **Token bucket**: 
                  This algorithm is based on a bucket filled with a specific number of tokens. Each request withdraws a token from the bucket and the bucket is refilled at a fixed rate. Once the bucket is empty, the client is blocked until the bucket refills.
      - In `arcjet.middleware.js`   
            `const decision = await aj.protect(req, { requested: 1 }); ` --> which means you will take away one token from bucket

      - You can see the request in Arcjet https://app.arcjet.com/sites/site_01k47rf34xeh1bhbc5adysp6mb/requests   


15. Subscription: Creating and tracking subscription        
       - Create `subscription.controller.js` in `controllers`
       - add subscriptionRouter.post('/', authorize, (req, res) => res.send({title: 'CREATE subscription'})); ---> authorize in this line in `subscription.routes.js`
         - import authorize from "../middlewares/auth.middleware.js";
       - subscriptionRouter.post('/', authorize, createSubscription); in `subscription.routes.js`
         - import { createSubscription } from "../controllers/subscription.controller.js";
       - https://hoppscotch.io/?utm_source=chatgpt.com
       ![alt text](image-15.png)
       ![alt text](image-16.png)
      
- Create `getUserSubscription`in `subscriptions.controller.js`
- import `getUserSubscription` in `subscription.routes.js`
  - subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

```js
  {
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "startDate": "2024-02-01T00:00:00.000Z",
  "paymentMethod": "Credit Card"
}

{
  "email": "dee@fake.com",
  "password": "123123"
}
```

![alt text](image-17.png)


## 16. Workflows -------------------------------------------------
![alt text](image-18.png) 2: 20
- Schedule email reminder whether they want to cancel the subscription or keep it going

![alt text](<Screenshot 2025-09-04 214734.png>)
![alt text](image-19.png)

- https://upstash.com/ Go to Workflow and add the below keys in `.env.development.local`
![alt text](image-20.png)

- **Express.js** --> https://upstash.com/docs/workflow/quickstarts/express#express-js
  - npm install @upstash/workflow
  - Create `upstash.js` in `config`
  - Create `workflow.routes.js` in `routes`
  - Add `app.use('/api/v1/workflows', workflowRouter);` in `app.js`
  - npm install dayjs
  - Create `workflow.controller.js` in `controllers`
  -
  - Add `SERVER_URL="http://localhost:5500"` in `env.development.local`
  - Local Development overview --> https://upstash.com/docs/qstash/howto/local-development
  - npx @upstash/qstash-cli dev --port 8081
  -  On Local mode inside console:--> https://console.upstash.com/workflow?teamid=0 
  ![alt text](image-25.png)
  ![alt text](image-24.png)
    - Copy QSTASH_TOKEN from terminal
    - Move the old QSTASH keys in `.env.production.local`
    - Copy the cURL request starting part in terminal --> http://127.0.0.1:8081 and store it as value of **QSTASH_URL** in `.env.development.local`

    - Copy cURL command and run in new terminal 
      - curl -X POST http://127.0.0.1:8081/v2/publish/https://example.com -H "Authorization: Bearer eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="
        - It gives random `messageId`
        ![alt text](image-21.png)

     - add workflowRouter.post('/subscription/reminder', sendReminders); in `routes>workflow.routes.js` and `import { sendReminders } from "../controllers/workflow.controller.js";`   
     - With this request --> this time you will get **workflowRunId** as well
     ![alt text](image-23.png)
     ![alt text](image-26.png)
     ![alt text](image-27.png)
     2:42:42

    ## Nodemailer -----------------------------------------------
    - https://nodemailer.com/
    - npm install nodemailer
    - Turn on 2-Step Verification in Gmail --> https://support.google.com/accounts/answer/185839?hl=en&utm_source=google-account&utm_medium=search-screen
    - Search App passwords under security --> https://myaccount.google.com/u/0/apppasswords?continue=https://myaccount.google.com/u/0/personal-info?rapt%3DAEjHL4MkFSjpCRqtP67VNXiqKd1HVpX59z6OX87PLUF5T_CQnjmo0rXBQJesDpM2wRPmQIQtDFi82g4sb6dG01FAdPjzUsxu0y6sRey0xp_y7UPmVpqHStI%26hl%3Den&pli=1&rapt=AEjHL4NzHpSjygIV5yrhFKNc6IVlAVtXXx7PjumwVUGL57s18NTvXXNhdFftN11fT9d9RbVQOFIEESbHEAHV4fAJRVkkYKv8J1mhLghr2FYVOyacCET9ag8
    - Give App name --> Subscription Tracker
    - Copy Generated App password --> nyfa awwa eugd uvfw
    - Add in `.env.development.local`
    ```js
    ## NODEMAILER
    EMAIL_PASSWORD="nyfa awwa eugd uvfw"
    ``` 
    - add `EMAIL_PASSWORD`in `env.js`
    - Create `nodemailer.js` in `config`
    - Create `utils` folder
    - Create `email-template.js` in `utils` folder
    - Create `send-email.js` in `utils` folder
    - Getting error in sending email to my account: below is the fix `tls: { rejectUnauthorized: false }` to your transporter:
    - Send post request with Auth - Bearer token
    ![alt text](image-33.png)
    **To check which user's account is it, write user' value ( "user": "68b570fd39a51569980f94a3") in **GET** request as shown below
    ![alt text](image-34.png)
    ![alt text](image-28.png)
    ![alt text](image-29.png)
    **==FINAL OUTPUT in TERMINAL==**
    ![alt text](image-30.png)
    ==**EMAIL Received in Gmail**==
    ![alt text](image-31.png)
    ![alt text](image-32.png)
     "user": "68b570fd39a51569980f94a3",
     "_id": "68c0118bd0555f85564fcc3a",


     #### Example -----------------
     - **Create user** ---> **POST** -->sign-up
     http://localhost:5500/api/v1/auth/sign-up
     ![alt text](image-35.png)
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMwMTYxM2QwNTU1Zjg1NTY0ZmNjNDEiLCJpYXQiOjE3NTc0MTkwMjcsImV4cCI6MTc1NzUwNTQyN30.dvbpNO4hv7N3DPrmIAWpyt4iZG_0MY5Mtx8oe6ImXO4"

     - **sign-in**   ---> **POST** ---> sign-in
     http://localhost:5500/api/v1/auth/sign-in
     - Add bearer token in Auth
     ![alt text](image-36.png) 

     - **Sending subscription reminder**
     ![alt text](image-40.png)
     ![alt text](image-41.png)
     **In TERMINAL** --> I get one email sent for 1 days before reminder
     ![alt text](image-39.png)
     ![alt text](image-42.png)
     ![alt text](image-43.png)



### 17. Deploy & Host to our own virtual private server


## Github
- git init
- git add .
- git commit -m "initial commit"
- git branch -M main
- git remote add origin https://github.com/HimanayK/subscription-tracker.git
- git push -u origin main
