# Keycloak authentication and authorization

Welcome! Keycloak authentication and authorization is a project that shows how we can integrate the back end and front end with Keycloak. With this project the users can authentication and according to their respective roles, they can or not, perform an action on the app.

## Project structure

---

```
backend-spring-boot/ # Java + Spring boot + Gradle
database/ # Postgres database service
frontend-react-ts/ # React app + Typescript
frontend-vue-ts / # VueJS app + Typescript
keycloak / # Keycloak service
```

## Pre-install

The ports used on this are:

- 9090 for Backend
- 9091 for Keycloak
- 8080 for VueJS
- 8081 for ReactJS

Make sure those ports are available.

---

### Database service

Go to the database's folder and create the `.env` file from the `.env.example` file. Update the file `.env` and it should be like this:

```
POSTGRES_USER=keycloak_user
POSTGRES_PASSWORD=<DATABASE_PASSWORD> # put you db password here
POSTGRES_DB=keycloak
```

### Keycloak service

Go to the keycloak's folder and create the `.env` file from the `.env.example` file. Update the file `.env` and it should be like this:

```
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admiN!23?
KC_DB=postgres
KC_DB_PASSWORD=<DATABASE_PASSWORD> # put you db password here
KC_DB_USERNAME=keycloak_user
KC_DB_URL=jdbc:postgresql://pg_database:5432/keycloak
KC_HOSTNAME=localhost
```

### VueJS frontend

Go to the frontend-vue-ts's folder and create the `.env` file from the `.env.example` file.

### ReactJS frontend

Go to the frontend-vue-ts's folder and create the `.env` file from the `.env.example` file.

## Install and run - DEV mode

---

Use the [Docker Desktop](https://docs.docker.com/desktop/) or [Docker engine](https://docs.docker.com/engine/) to install and run.

Use the [JDK 11 or latest](https://openjdk.org/projects/jdk/17/) for the backend.

Use the [NodeJS 16 or latest LTS](https://nodejs.org/en/) for the frontend.

Make sure those items above are installed executing the commands line:

```command-line
$ docker --version

$ java --version

$ node --version
```

Execute the command line on the root path:

```command-line
$ docker-compose up
```

<b>Do not close the terminal after this command!</b>

Next, open on your browser on [Keycloak admin](http://localhost:9091/admin)

Do the login using the credentials used on Keycloak's `.env` file. In this example, it should be:

```
Username: admin
Password: admiN!23?
```

Create a new realm with the name: `development`.

![alt text](./.assets/button-create-realm.png)

![alt text](./.assets/creating-realm.png)

Create a new client with the name: `keycloak-authentication-authorization`

![alt text](./.assets/creating-client-1-on-realm.png)

![alt text](./.assets/creating-client-2-on-realm.png)

Now, set up the client `development` following:

![alt text](./.assets/client-settings-on-realm.png)

Create two groups (USER and ADMIN):

![alt text](./.assets/creating-group.png)

Create two users (MY_USER and MY_ADMIN) and set the MY_USER to USER and MY_ADMIN to ADMIN:

![alt text](./.assets/creating-user-1.png)

![alt text](./.assets/creating-user-2.png)

![alt text](./.assets/creating-user-3.png)

After create the users, set the passwords for them:

![alt text](./.assets/updating-user-1.png)
![alt text](./.assets/updating-user-2.png)
![alt text](./.assets/updating-user-3.png)
![alt text](./.assets/updating-user-4.png)

Well done! Next, now you can use the Makefile to up the apps:

```
make dev
```
