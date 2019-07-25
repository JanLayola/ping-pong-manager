# Ping Pong Manager

## Description

The App allows the table tennis players to create, join and manage tournaments.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **profile** - As a user I want to see and update my profile so that I can change my personal info.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **tournament create** - As a user I want to create a tournament so that the other users can join it.
- **tournament list** - As a user I want to see all the tournaments available so that I can choose which ones I want to attend

## Backlog

List of other features outside of the MVPs scope
- **tournament detail** - As a user I want to see the tournament details and attendee list of one event so that I can decide if I want to attend 
- **set match result** - As a user I want to set the match result so that I can view the updated draw.
- **ranking** - As a user I want to be able to see the general Ranking so that I can know wich are the best players.

User profile:
- upload my profile picture
- see other users profile
- list of events created by the user

Geo Location:
- add geolocation to tournaments when creating
- show event in a map in event detail page
- show all events in a map in the event list page

DashBoard:
- Add user main stats

Profile:
- Add user stats

Single Match:
- Create single match option

Search:
 - Players
 - Tournaments


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to /dashboard if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to /dashboard if user logged in
  - body:
    - username
    - email
    - password
    - city
    - country
    - profile img
- GET /auth/login
  - redirects to /dashboard if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to /dashboard if user logged in
  - body:
    - username
    - password
    - city
    - country
    - profile img
- POST /auth/logout
  - body: (empty)

- GET /tournaments
  - renders the tournament list + nav (my tournaments, search, create)
- POST /tournaments/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
    - players number
- GET /tournaments/:id
  - renders the tournament detail page
  - includes the list of players
  - attend button if user not attending yet
- POST /tournaments/:id/join 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)
- GET /profile
  - redirects to / if user is anonymous
  - show profile info + stats
- POST /profile/edit
  - redirects to / if user is anonymous
  - - body:
    - username
    - email
    - password
    - city
    - country
    - profile img

## Models

User model
 
```
username: String
password: String
email: String
City: String
Country: String
Image: String
```

Tournament model

```
owner: ObjectId<User>
name: String
numberOfPlayers: Number [4]
description: String
date: Date
location: String
players: [ObjectId<User>]
``` 

## Views

- homepage
 - login
 - sign up
- dashboard
- profile
 - update profile
 - user profile
- tournaments
 - create tounrament
 - tournament details
 - tournaments list

## Links

### Trello

[Link to trello board](https://trello.com/b/ojTjcuX6)

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


