# RedSquare (Lighthouse Labs Mid-term group project)

## Collaborators/Group members (Anarchonist7, mBarlescu, bert-bae)

## How to get started

- Fork and clone this repo.
- Go to the folder and install the dependencies

```js
npm i
```

- Go to the folder and start the server

```js
npm run local
```

- go to http://localhost:8080

## What is it?

RedSquare is one of the most popular squares in the world (according to Google, but take it with a grain of salt :p ). Doodle helps you plan events by creating a polling system for you and your friends, co-workers, etc. RedSquare applies the same logic using the SQL database to track event time slot votes for the event planner to go back and confirm the event time once voting ends to send a customizable event-confirmation e-mail to everyone.

This was a very interesting project as it was our first one together working as a group which came with a lot of interesting and unexpected challenges, great learning moments, and successes (git was the best).

## Images

!["Main page"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img1.png)
!["Enter event creator Info"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img2.png?raw=true)
!["Enter event details"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img3.png?raw=true)
!["Create time slots"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img4.png?raw=true)
!["Share URL to friends to vote"](https://github.com/bert-bae/outdoodle/blob/master/public/img/url.png?raw=true)
!["Enter votes"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img5.png?raw=true)
!["Confirm event"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img7.png?raw=true)
!["SQL Database at work"](https://github.com/bert-bae/outdoodle/blob/master/public/img/img8.png?raw=true)

## Dependencies (Project skeleton instructions below via Lighthouse Labs instructions)
  -"body-parser": "^1.15.2",
  -"cookie-session": "^2.0.0-beta.3",
  -"dotenv": "^2.0.0",
  -"ejs": "^2.4.1",
  -"express": "^4.13.4",
  -"knex": "^0.11.7",
  -"knex-logger": "^0.1.0",
  -"morgan": "^1.7.0",
  -"node-sass-middleware": "^0.11.0",
  -"nodemailer": "^4.6.8",
  -"pg": "^6.0.2"

## Main Tech Stack used
  -JavaScript
  -jQuery
  -EJS
  -PostgreSQL
  -Knex
  -SASS
  -HTML/CSS
  -NodeJS
  -Express

# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
