# Movie App

Movie browsing app built using [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction). Fully responsive on all screen sizes.

---

### Users are able to

-  Browse "Top Rated" and "Now Playing" movies.
-  Search for movies
-  Login or signup to add movies to their personal watchlist

---

### Built using:

-  MERN stack
-  React router
-  React query(with mutations and infinite querying)
-  Material UI
-  JWT for authentication
-  CryptoJS for password encryption
-  Vite

---

### Important lessons learnt:

1. Material UI: Properly utilise theming, palette, typography to avoid excessive use of sx{} props.
2. React router: The "learn as you go" mentality was probably not the best idea. I feel like I didn't follow best practices or was just outright wrong in my implementation of client side routing. I definitely should've read the docs or a tutorial before starting. This will be something I'll come back later to fix, or start fresh in my next project.
3. Backend routing: Again, I need to do some revision here. I feel like I was making random API endpoints and just forcing axios requests to hit the endpoints. Need to revise on how to synchronise the frontend with backend. E.g - the URL of the search results doesn't show up?
4. Maybe start thinking about using redux
5. How to fix watchlist bug where users have to click twice to remove movie from watchlist? Come back to this later...
