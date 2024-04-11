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
- /* - 404 not found

## Pages & Components

- Home Page (public)
- Sign in Page (public)
- Log in Page (public)
- User Profile (user only)
- Edit Profile (user only)
- Dashboard (user only)
- Lodging List (user only)
- Lodging Details (user only)
- Create Lodging (user only)
- Edit Lodging (user only)
- Activities List (user only)
- Activity Details (user only)
- Create Activity (user only)
- Edit Activity (user only)
- Girl Power Playlist (user only)
- 404 Page (public) 

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
firstName - String
lastName - String
phoneNumber - Number
profilePicture - String
aboutMe - String
location - String
age - Number
occupation - String
languages - [String]
lodgings : populate by 'Lodging'
activities : populate by 'Activity'
```

Lodging model

```
title - String // required
description - String // required
location - String // required
type - String // required
amenities - Array
maxGuests - Number // required
maxStay - Number // required
images - Array
host - populate by 'User'
observations - String
latitude - Number
longitude - Number

```

Activity model

```
title - String // required
description - String // required
location - String // required
meetingPoint - String // required
capacity - Number // required // min 1
price - Number // required
thumbnail - String
images - Array
host - populate by 'User'
latitude - Number
longitude - Number

```

Review model

```
user - populate by 'User'
property - populate by 'Lodging'
activity - populate by 'Activity'
title - String
comment - String
rating - Number // enum 1 to 5

```


## API Endpoints/Backend Routes

- GET /auth/:userId
- POST /auth/signup
  - body:
    - userName
    - email
    - password
- POST /auth/login
  - body:
    - email
    - password
   
- PUT /user//:userId
  - body:
    - username 
    - email 
    - firstName
    - lastName 
    - phoneNumber
    - profilePicture
    - aboutMe
    - location
    - age
    - occupation 
    - languages

- POST /lodging
  - body:
    - title 
    - description 
    - location 
    - type 
    - amenities 
    - maxGuests 
    - maxStay 
    - images
    - observations 
    - latitude 
    - longitude 
- DELETE /lodging/:lodgingId
  - body: (empty)
- GET /lodging
- GET /lodging/:lodgingId
  
- POST /activity
  - body:
    - title 
    - description 
    - location 
    - meetingPoint 
    - capacity 
    - price 
    - thumbnail
    - images 
    - latitude 
    - longitude 
- GET /activity
- GET /activity/:activityId

- GET /review/:lodgingId
- GET /review/:activityId
- POST /review
  - body
    - title 
    - comment 
    - rating 

## Links

### Trello/Kanban

[Link to our trello board](https://trello.com/b/5jPx8eJS/project-03-baby)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Caro-isj/WanderHer-FE)
[Server repository Link](https://github.com/Caro-isj/WanderHer-BE)

[Deploy Link](https://wanderher.netlify.app)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1TZ-hi1PLOdVmn-IpbqPFcOJMvPM1qp8vCVld5v6lx3E/edit#slide=id.p)
