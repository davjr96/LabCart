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
```
git clone https://github.com/davjr96/LabCart.git
```

then install necessary packages
```
cd LabCart
npm install
cd front-end
npm install
```

Update config/db.js to reflect the PostgresSQL user you created when installing the database (NOT the user in the users table, but the actual DB user)

In one terminal tab run:
```
node server.js
```
In another run
```
cd front-end
npm Started
```

Go to localhost:8080 in a web browser and you should be greeted by a functioning system.



## Deployment

This are instructions for installing on a fresh RaspberryPi 3 in production.

### PostgresSQL Install
First install PostgresSQL:
```
sudo apt-get install postgresql-9.6
```
Then create the postgres user
```
sudo -u postgres psql
\password postgres
\q
```

Also install pgAdmin
```
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
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
```
Clone this repository
```
git clone https://github.com/davjr96/LabCart.git
```

then install necessary packages
```
cd LabCart
npm install
cd front-end
npm install
```

Update config/db.js to reflect the PostgresSQL user you created when installing the database (NOT the user in the users table, but the actual DB user)

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
