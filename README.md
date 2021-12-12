# Web-Engineering-Project - Vehicle Cost Calculator
##Functionality
The Vehicle Cost Calculator (VCC) is a web application for tracking and managing the costs
of different vehicles. There are different users with different vehicles. Every vehicle
belongs to one user and has different cost items of different cost types. In the VCC are you
able to track 3 different cost types:

- **Single Costs**: every cost item, that doesn't repeat and is a repair, administrative purchase
, normal purchase or other non repeating cost item.
- **Repeating Costs**: cost items that repeat in a given period of time e.g. Tax or insurance
- **Fuel Costs**: all costs which belong to fuel

Every user can have multiple vehicles and costs. For user management VCC differentiate between 
**members** (normal user) and **admins** (administrators). The member is a normal user,
using VCC. The admin has the same functionality such as a member. But he can see under his profile
a table of all users of VCC. He is able to delete them and edit their role and email.

## Compatibility
- For devices with a minimal screen width of 320px, for perfect functionality minimal screen width of 360px
- last 1 Chrome version
- last 1 Firefox version
- last 2 Edge major versions
- last 2 Safari major versions
- last 2 iOS major versions
- Firefox ESR
- not IE 11


##Installation
1. At first unzip the .zip archive. 
2. Then go into the frontend folder.
3. (opt.) If you want to host this tool, and use it not only at the local host:
   1. Go into ``<Route_to_folder>/frontend/src/environments/constants.ts``
   2. Change the following in string ``localhost`` to the address of your server:
    ```typescript
    export const backend = {
      url: 'http://localhost:3000/api',
    };
    ```
   3. Save the file and close it
4. Open the command prompt in the root folder of the frontend ``<Route_to_folder>/frontend``
5. Run following commands to install all needed modules and generate the ``/dist`` folder:
```commandline
npm install
npm run-script build
```
6. Open the command prompt in the root folder of the backend ``<Route_to_folder>/backend``
7. Run following commands to install all needed modules and start the host server:
```commandline
npm install
npm run-script start
```
8. The server is now running under ``http://localhost:3000``, (opt.) if you are hosting the server, the address is
the address of your server.
##First steps
After installing and starting the server you are able to use the VCC. Initially there exists an admin user with following
login data:
- Username: Admin
- Password: Admin-123

It is recommended to change this data. For this follow the following steps:
1. If you are logged in, click the logout button in the header.
2. In the Login page, click ``singup now`` create a new user with new username and password.
3. After creating your account, login as the Admin user, with the login data above
4. Click in the navigation area on ``Admin``, so that you can see the admin overview
5. In the displayed table click at the lens to search your created username.
6. After finding your own created user, change the role to admin, and save the changes
7. Now click on delete this account, to delete the default Admin account.
8. Now your created account should be the only admin on the page

Beside the admin account there is an example User, with a vehicle and added costs to show the functionality
his login data are:
- Username: Example User
- Password: Example-123

Also, there are 4 Dummy Users to train the admin functionality under your admin profile

##Api Documentation
The documentation of the api is located in the root directory of the .zip archive. It's written with
OpenApi.

##References and Libraries
###1. Frontend
- SVGs on the page from: [unDraw](https://undraw.co/)
- [Angular 12](https://angular.io/)
- Design with [NG-Zorro](https://ng.ant.design/docs/introduce/en)
- For the token management [auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)
- For the charts [ngx-echarts](https://xieziyu.github.io/ngx-echarts/api-doc/overview.html) 
with [echarts](https://echarts.apache.org/en/index.html)

###2. Backend
- [Express](https://expressjs.com/)
- For validating the requests [express-validator](https://express-validator.github.io/docs/)
- For the jwt token [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- Database [neDB](https://github.com/louischatriot/nedb)
- For generating ids [uuid](https://www.npmjs.com/package/uuid)

###3. Api Documentation
- [OpenApi](https://swagger.io/specification/)