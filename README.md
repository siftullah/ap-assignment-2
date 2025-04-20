# Advanced Programming Assignment 2
## Movie House - Next.js Movie Directory

A movie directory application built with Next.js demonstrating various rendering patterns and routing strategies.

## Pages and Features

### Home Page (`/index.js`)
- Displays trending movies section
- Browse Genres button for navigation
- Uses `getStaticProps()` with ISR (revalidate: 3600)
- Shows 404 when data not found

### Movies Page (`/movies`)
- Lists all movies in card format
- Genre-based filtering via select input
- Links to individual movie pages
- Implements ISR with `getStaticProps()`
- 404 handling for missing data

### Movie Details (`/movies/[id]`)
- Complete movie information:
  - Title
  - Description  
  - Director (with link to director page)
  - Release Year
  - Rating
- Uses `getStaticPaths` and `getStaticProps`
- Implements fallback pages for on-demand generation

### Director Page (`/movies/[id]/director`) 
- Detailed director information

### Help Section (`/help/[[...slug]]`)
Catch-all routes for help pages:
- `/help`
- `/help/faqs`  
- `/help/contact`
- `/help/privacy`

### Custom 404 Page
- User-friendly error message
- "Go Home" navigation button

### Genres Page (`/genres`)
- Server-side rendered with `getServerSideProps()`
- Lists genres with movie counts
- Links to genre-specific pages

### Genre Details (`/genres/[id]`)
- Server-side rendered filtered movie list
- Shows all movies in selected genre

### Directors Page (`/directors`)
- Client-side rendered using `useSWR`
- Dynamic fetching of director data
- Displays:
  - Director name
  - Biography
  - Movies directed
