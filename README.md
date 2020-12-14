# About this file

This is the project repository of my final Project.

# How to run this file

You need to have nodejs and yarn installed

Download nodejs from [`here`](https://nodejs.org/en)

Then open up cmd and run the following command to install yarn

```
npm i -g yarn
```

Run the following in the project directory

```
yarn
```

Then open up the development server with

```
yarn dev
```

## Important

The database is hosted with heroku so it might be slow

If you want to use your own postgresql database then download postgresql from [`here`](https://www.enterprisedb.com/postgresql-tutorial-resources-training?cid=55)

Then run the following command to create the database table

```
yarn migrate
```

# Open your database

Open your database with following command

```
yarn open
```

## Problems

If you run into any errors, try running the following command and then try restarting the dev server

```
yarn clean
```

If this doesn't solve your problems, then delete node_nodules and yarn.lock files. Then try restarting the server.

### Project Structure

```
Layout
    NavBar
        '/' Homepage
            Introduction
            ProvideInvestors
            ProvideBorrowers
            Sponsors
            MobileApp
            UpperFooter
        '/login' Login Page
            FormikTextField
        '/register' Register Page
            FormikTextField
    Footer
/dashboard Dashboard Page
```
