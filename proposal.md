# PixelPath

## Overview

**PixelPath** is a web application designed to help gamers organize, track, and enhance their gaming experiences. Users can log their gaming sessions, rate games, and add personal notes or tags to their collection. The app provides tools for managing a customizable Game Library, discovering new games through an integrated Game Search tool, and receiving personalized recommendations based on their mood. By integrating features for tracking and discovery, PixelPath offers a comprehensive and engaging platform tailored to gamers’ needs.


### Problem

Gamers often face challenges in managing their growing libraries, remembering their gaming experiences, and finding games that match their mood or priorities. Existing platforms primarily focus on reviews and gameplay tracking but lack tools to log personal notes or tags alongside basic game reviews. This leaves users without a comprehensive way to reflect on their gaming journey.

**PixelPath** provides a streamlined solution for managing, reviewing, and visualizing gaming progress with user emotions in mind. By combining mood-based recommendations, library organization tools, and an integrated game search, PixelPath offers gamers a personalized platform to connect with their games on a deeper level.

### User Profile

- **Target Users**:
    - Avid or casual gamers who want to organize and manage their game libraries.
    - Players seeking personalized game recommendations based on their moods.
  
---

### Features

### **Game Library**
- As a user, I want to view and organize my game library.
- As a user, I want to filter and sort my games by status, tags, and genres.
- As a user, I want to update game statuses, ratings, and notes.

### **Game Search**
- As a user, I want to search for games using keywords or browse popular games.
- As a user, I want to add games from the search results to my library.

### **Mood-Based Recommendations**
- As a user, I want to select a mood and receive game recommendations based on metadata from my library and the IGDB API.

---

## Implementation

### Tech Stack

- **Frontend**:
    - React
    - React-router
    - Axios
- **Backend**:
    - Node.js
    - Express
    - MySQL
    - Knex
- **Authentication**:
    - Passport.js or JSON Web Tokens (JWT) for secure authentication.
- **API Integration**:
    - IGDB API for game search and metadata.

---

### Sitemap

- Home Page / Register / Login
- Game Library: Manage and organize personal game collection
- Game Search: Discover new games
- Game Details: View details of a specific game and personal notes/tags/status 
- Mood-Based Recommendations: Recieve tailored game suggestions based on mood

---

### Mockups

#### Home Page
![homepage with register/login links](/public/mockups/home.png)

#### Game Library - no games
![main games library page showing no games](/public/mockups/gamelibrary-nogames.png)

#### Game Library - games
![main games library page](/public/mockups/gamelibrary-games.png)

#### Game Search
![game search page](/public/mockups/gamesearch.png)

#### Mood-Based Recommendations - mood selected
![game suggestions based on mood selection](/public/mockups/moodrecommendations-selected.png)

#### Game Details - games card
![user-specific game details card](/public/mockups/gamedetails-games.png)

---

### Data

![data models and relationship](/public/mockups/mockup-datamodels.png)

---

### Endpoints

**GET /games**

- Retrieves all games in the user’s library with an optional filter/sorting option

Parameters: `filter` (optional), `sort` (optional)

Response Body: 
`200 OK`

`{ "gameID": 1,
"title": "The Legend of Zelda",
"status": "Playing",
"rating": 5,
"notes": "Amazing game!",
"tags": ["Adventure", "Action"] 
}`


**GET /games/search**
- Displays a list of games from the IGDB API, default set to display Most Popular. 

Response Body: 
`200 OK`
`{
    "id": 101,
    "title": "The Legend of Zelda",
    "coverArt": "exampleimage.jpg",
    "genres": ["Adventure", "Action"],
    "summary": "Link is awakened in a room by a voice calling him and learns that he has been asleep for 100 years after failing to stop a monster called Calamity Ganon. Although the monster is being held in Hyrule Castle by Princess Zelda, Calamity Ganon's power continues to grow and if not stopped he will eventually break free with enough power to destroy the entire world. Link embarks on his quest to defeat Calamity Ganon and save Hyrule and Zelda."
  }`

**POST /games/add**
- Adds a new game to the library.

Parameters:
- gameID, title, status, tags (optional), notes (optional)

Response Body: 
`201 Created`

`[ 
  { 
    "message": "Game added successfully!",
    "gameID": 3, 
    "title": "Animal Crossing", 
    "genres": ["Simulation", "Relaxing"]
    "status": "Want to Play"
  }
]`

**PUT /games/update**
- Updates an existing game from the user's library.

Parameters:
- gameID, status, tags (optional), notes (optional)

Response Body: 
`201 Created`

`[ 
  { "message": "Game updated successfully!",
    "gameID": 3, 
    "title": "Animal Crossing", 
    "genres": ["Simulation", "Relaxing"]
    "status": "Currently Playing"
    "tags": "Chill", "Cute" 
    "notes": "Great for a rainy day!" 
  }
]`

**DELETE /games/remove**
- Removes a game from the user’s library.

Parameters:
- gameID

Response Body: 
`204 No Content { message: "Game removed successfully!" }`


**GET /tags/game/:gameID**
- Get all tags for a game. 

Response Body: 
`200 OK`

`{ "tagID": 1,
    "name": "Relaxed"
},
{ "tagID": 2,
    "name": "Adventure"
  }`


**GET /tags/user/:userID**
- Get all tags for a game. 

Response Body: 
`200 OK`

`{ "tagID": 1,
    "gameID": 123,
    "name": "Relaxed"
  },
  { "tagID": 2,
    "gameID": 124,
    "name": "Challenging"
  }`



**POST /tags/add**
- Creates a new tag for a game.

Parameters: 
- userID
- gameID
- name

Response Body: 
`201 Created { "message": "Tag added successfully!" }`


**DELETE /tags/remove**
- Deletes a tag from a game.

Parameters: 
- userID
- gameID
- name

Response Body: 
`204 No Content { "message": "Tag removed successfully!" }`


**GET /recommendations**
- Fetches games based on user's mood selection from personal game library and global API. 

Parameters: 
- mood: user selected mood ("Relaxed")

Response Body: 
`200 OK`

`{ 
"userLibraryRecommendations": 
  [
    {
      "gameID": 1,
      "title": "Animal Crossing",
      "tags": ["Relaxed", "Cozy"],
      "genres": ["Simulation"]
    }
  ],
  "apiRecommendations": 
  [
    {
      "id": 201,
      "title": "Journey",
      "genres": ["Adventure"],
      "releaseDate": "2012-03-13"
    }
  ]
}`

**POST /users/register**

- Add a user account

Parameters:

- username: User's provided username
- email: User's email
- password: User's provided password

Response Body:

`{ "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..." }`


**POST /users/login**

- Login a user

Parameters:
- username: User's provided username
- password: User's provided password

Response Body: `{ "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..." }`


---

### Roadmap

#### **Week 1: Foundation and Core Features**
1. **Days 1-2**:
    - Set up project: Initialize frontend and backend, configure MySQL database.
    - Integrate IGDB API and test basic functionality.
2. **Days 3-4**:
    - Build Game Library:
        - Backend: CRUD endpoints.
        - Frontend: UI with search, filter, and sort features.
3. **Day 5**:
    - Build Game Search:
        - Backend: Endpoint for IGDB API integration.
        - Frontend: Search page with keyword input and results display.

#### **Week 2: Advanced Features and Finalization**
4. **Days 6-7**:
    - Build Mood-Based Recommendations:
        - Backend: Mood selection logic and recommendation generation.
        - Frontend: Mood selector UI and recommendation display.
5. **Days 8-9**:
    - Debugging, testing, and refinement of all features.
6. **Days 10-11**:
    - Apply styling with Sass for a polished look.
    - Deploy to Netlify (frontend) and Render (backend).
7. **Day 12**:
    - Prepare demo, polish UI, and finalize README documentation.

---

## Nice-to-Haves / Future Implementations


- Dynamic Game Insights Dashboard: Visualize trends like genres played or time spent
- Backlog Tracker: Organize and prioritize games users plan to play based on playtime or priority levels 
- Enhanced game recommendations using machine learning models
- Social sharing features for libraries, lists, reviews and gameplay clips
- Add a gamified experience with leaderboards or achievement badges. (e.g., “10 games completed”)
- Expanded user profile functionality


### Auth

- **JWT-based Authentication**:
    - Authentication will be added after core features are implemented.
    - Store JWT in local storage, remove on logout.
    - Logged-in users will have access to protected endpoints and personalized features.
