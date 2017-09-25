# Lab Inventory System

This application was designed to be an Inventory System for the Lab in Rice 120 at the University of Virginia. Each piece of hardware is labeled with a unique barcode and students can scan the barcode and enter their email to checkout or return an item. An admin can also add new items and see what is checked out. This application was written in JavaScript using NodeJS with express for the back-end and ReactJS + redux for the front-end. The data is stored in a PostgresSQL database. It was originally designed to be installed on a RaspberryPi which lives in the lab.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure your development system has PostgresSQL installed. You can find instructions for your specific system on the PostgresSQL website.
NodeJs and npm also need to be installed.  
First initialize the database by creating an items table and a users table.

```SQL
CREATE TABLE "public"."items" (
    "id" serial,
    "item_id" text,
    "out_on" text,
    "out_to" text,
    PRIMARY KEY ("id"),
    UNIQUE ("item_id")
) TABLESPACE "pg_default";

```
```SQL
CREATE TABLE "public"."users" (
    "id" serial,
    "user" text,
    "pass" text,
    PRIMARY KEY ("id")
) TABLESPACE "pg_default";
```
Then add a user
```SQL
INSERT INTO "public"."users"("user", "pass") VALUES('glc8a@virginia.edu', 'secret') RETURNING "id", "user", "pass";
```

### Installing

First clone this repository
```shell
git clone https://github.com/davjr96/LabCart.git
```

then install necessary packages
```shell
cd LabCart
npm install
cd front-end
npm install
```

Update config/db.js to reflect the PostgresSQL user you created when installing the database (NOT the user in the users table, but the actual DB user)

In one terminal tab run:
```shell
node server.js
```
In another run
```shell
cd front-end
npm Started
```

Go to localhost:8080 in a web browser and you should be greeted by a functioning system.



## Deployment

This are instructions for installing on a fresh RaspberryPi 3 in production.

### PostgresSQL Install
First install PostgresSQL:
```shell
sudo apt-get install postgresql-9.6
```
Then create the postgres user
```shell
sudo -u postgres psql
\password postgres
\q
```

Also install pgAdmin
```shell
sudo apt-get install pgadmin3
```
Create the tables:
```SQL
CREATE TABLE "public"."items" (
    "id" serial,
    "item_id" text,
    "out_on" text,
    "out_to" text,
    PRIMARY KEY ("id"),
    UNIQUE ("item_id")
) TABLESPACE "pg_default";

```
```SQL
CREATE TABLE "public"."users" (
    "id" serial,
    "user" text,
    "pass" text,
    PRIMARY KEY ("id")
) TABLESPACE "pg_default";
```
Then add an admin user for the web interface
```SQL
INSERT INTO "public"."users"("user", "pass") VALUES('glc8a@virginia.edu', 'secret') RETURNING "id", "user", "pass";
```

### Server Setup
First install node and npm
```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
```
Clone this repository
```shell
git clone https://github.com/davjr96/LabCart.git
```

then install necessary packages
```shell
cd LabCart
npm install
cd front-end
npm install
```

Update config/db.js to reflect the PostgresSQL user you created when installing the database (NOT the user in the users table, but the actual DB user)

Install pm2
```shell
sudo npm install -g pm2
```
Start server.js with pm2
```shell
pm2 start server.js
pm2 startup
```
After running the command pm2 enable it will output a command, run that so that pm2 will start on boot.

Build the front-end
```shell
cd front-end
npm run build
```

### Nginx Setup
We will use nginx to host the front-end and proxy the back-end API.
First install nginx
```shell
sudo apt-get install nginx
```
Then replace the configuration:
```shell
sudo nano /etc/nginx/sites-available/default
```
with the following
```nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /home/pi/LabCart/front-end/dist;

        index index.html index.htm

        server_name _;

        error_page 404 =200 /index.html;

        location /api {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;
                proxy_pass http://127.0.0.1:3000;
        }

}
```
Then start nginx
```shell
sudo /etc/init.d/nginx start
```
