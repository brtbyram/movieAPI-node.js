# movieAPI-node.js
Node.JS - Movie API 

# Movie

| Route | HTTP Verbs | POST body | Description |
| ----- | ---------- | --------- | ----------- |
| /api/movies/ | `GET` | Empty | List all movies |
| /api/movies/ | `POST` | {'title': 'string' , 'category': 'string' , 'country': 'string', 'year': 'number' , 'imdb_score': 'number' } | create a new movie |
| /api/movies/:movie_id | `GET` | Empty | get a movie |
| /api/movies/:movie_id | `PUT` | Empty | Update a movie with new info |
| /api/movies/:movie_id | `DELETE` | Empty | Delete a movie |
| /api/movies/top10 | `GET` | Empty | Get the top 10 movies |