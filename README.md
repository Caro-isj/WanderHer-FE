# WanderHer 🧳

## Description

Welcome to WanderHer, your go-to companion for globe-trotting solo with a sprinkle of sass and a whole lot of empowerment.<br>
Created by and for women with itchy feet and fierce hearts, WanderHer is here to revolutionize the way women travel—solo, but never alone.

## User Stories

-  **404:** I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start browsing activities and lodgings
-  **Login:** As a user I can login to the platform so that I can browsing activities and lodgings
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Activity** As a user I can become a host by adding an activity that I want to share with people
-  **Add Lodging** As a user I can become a host by adding an accomodation that I want to share with people
-  **Filter/Search lodgings** As a user I can filter and search the lodgings by places to check which ones are near me
-  **Edit user profile** As a trusted user I want to add as much informations about me for others to rely on
-  **Browse the girl boss page** As a user I can listen to a girl boss spotify playlist, randomize facts about empowered woman and discover the 'woman of the month' selected by the WanderHer team
-  **About us** As a user I can check the concept of the website and learn more about it.

## Backlog

User profile:
- see my users profile and add informations

Host profile:
- see hosts profile linked at the bottom of their actitivy/lodging posts

Geo Location:
- see where the activity is happening on the map, in addition to the location of the lodgings
  

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /user/:userId - get user details/update user details
- /lodging - accomodation list/create acomodation
- /lodging/:lodgingId - one accomodation details
- /activity - activities list/create an activity
- /activity/:activityId - one activity details
- /review/:lodgingId - get reviews for a lodging
- /review/:activityId - get reviews for an activity
- 404

## Pages

- Home Page (public)
- Sign in Page (public)
- Log in Page (public)
- Dashboard (user only)
- Lodging List (user only)
- Restaurant Detail Page (public only)
- My Profile Page (user only)
- 404 Page (public)

## Components

- Restaurant Card component
  - Input: restaurant: any
  - Output: favorite(restaurantId: string, on: boolean)
- Search component
  - Output: change(terms: string)

## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Restaurant model

```
owner - ObjectID<User> // required
name - String // required
phone - String
address - String
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - restaurantId
- DELETE /user/me/favorite/:restaurantId
  - body: (empty)
- GET /restaurant
- POST /restaurant
  - body:
    - name
    - phone
    - address
- GET /restaurant/:id

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
