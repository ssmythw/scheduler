# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Screenshots

![ScreenShot](https://raw.githubusercontent.com/ssmythw/scheduler/master/screenshots/Screen%20Shot%202023-01-28%20at%204.22.00%20PM.png)
![ScreenShot](https://raw.githubusercontent.com/ssmythw/scheduler/master/screenshots/Screen%20Shot%202023-01-28%20at%204.22.09%20PM.png)
![ScreenShot](https://raw.githubusercontent.com/ssmythw/scheduler/master/screenshots/Screen%20Shot%202023-01-28%20at%204.22.23%20PM.png)


## Dependencies

- Axios
- Classnames
- Normalize
- React, React-dom, React-scripts
- Storybook
- Jest
- React Testing Library
- Babel
- Prop-types
- Sass

## Running Backend Server 

- Run npm install in scheduler-api directory
- Create database scheduler_development in psql, using development as the username and password
- Update .env with require credentials
- Seed the database by sending GET request to /api/debug/reset
- Run npm start to start the api on localhost:8001

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


