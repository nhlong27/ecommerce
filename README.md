<!-- Improved compatibility of back to top link: See: https://github.com/nhlong27/dengueapp/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://firmedia.site/" target='_blank'>
    <img src="./client/public/assets/logos/logo-md.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">THIRSTORE</h3>

  <p align="center">
    An e-commerce website for beverages
    <br />
    Version: v1.0.0-alpha
    <br />
    Author: Nguyen Hoang Long 
    <br />
    Email: nhlong2706@gmail.com 
    <br />
    <a href="https://firmedia.site" target='_blank'>View Demo</a>
    ·
    <a href="https://github.com/nhlong27/movieSite/issues" target='_blank'>Report Bug</a>
    ·
    <a href="https://github.com/nhlong27/movieSite/pulls" target='_blank'>Request Feature</a>
  </p>
</div>

## Live Demo
Official website: <a href="https://ecommerce-nhlong.vercel.app/" target='_blank'>https://ecommerce-nhlong.vercel.app/</a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#duration">Duration</a></li>
        <li><a href="#challenges">Challenges</a></li>
        <li><a href="#solutions">Solutions</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting_started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
<a id='about'></a>
## About The Project

[![Product Name Screen Shot][homePage_preview-screenshot]](...url)

Thirstore is a user-friendly website designed to provide you with a seamless and enjoyable shopping experience. Whether you're searching for beverages, flavorful juices, or innovative energy drinks, our intuitive navigation and robust search options ensure that you find exactly what you're looking for, quickly and effortlessly.

#
<a id='screenshot'></a>
## Screenshots
Note: some screenshots might have been outdated
<details>
  <summary>Toggle Show/Hide </summary>
  <!-- <h1>Home page</h1>
  <img src='./screenshots/homePage.png' name="homePage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Light theme</h1>
  <img src='./screenshots/homePage_light.png' name="homePage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Search by keyword</h1>
  <img src='./screenshots/explorePage_search.png' name="explorePage_search-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Search by filters</h1>
  <img src='./screenshots/explorePage_filter.png' name="explorePage_filter-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Media page</h1>
  <img src='./screenshots/mediaPage.png' name="mediaPage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Profile page</h1>
  <img src='./screenshots/profilePage.png' name="profilePage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->

  <!-- <h1>Sign in/ Sign up</h1>
  <img src='./screenshots/authPage.png' name="authPage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->
</details>


<!-- 
[![Product Name Screen Shot][homePage-screenshot]](...url)
[![Product Name Screen Shot][explorePage_search-screenshot]](...url)
[![Product Name Screen Shot][explorePage_filter-screenshot]](...url)
[![Product Name Screen Shot][mediaPage-screenshot]](...url)
[![Product Name Screen Shot][profilePage-screenshot]](...url) -->
#

<a id='duration'></a>
## Duration

Around 2 weeks - June 2023 
## User stories  
<!-- <b>Note</b>: media = movie | TV shows -->
<ul>
  <li>User should be able to see (Trending products, Categories, Product Previews, Newest, Most) sections in <i>Home page</i>
  </li>
  <li>User should be able to search for product by: <i>keyword</i>, <i>filter options (ascending prices, descending prices, price ranges, ratings, locations)  </i> 
  </li>
  <li>User should be able to see click and see further information about a product such as: <i>images</i>, <i>description</i>, <i>price</i>, <i>in stock</i>, etc.
  </li>
  <li>User should be able to leave review for a product</li>
  <li>User should be able to see related/recommended  products</li>
  <li>User should be able to Sign in/ Sign up/ Sign out/ Deactivate BUYER account</li>
  <li>User should be able to edit profile information such as: <i>Username</i>, <i>email</i>, <i>avatar</i>, <i>password</i></li>
  <li>User should be able to add products to cart
  <li>User should be able to categorize them based on: <i>..</i>, <i>..</i>, <i>..</i>, <i>..</i>, <i>..</i>. 
</ul>
productSchema_custom = 
{
  id: uuid,
  title: string,
  price: float,
  rating: float
  solds: number 
  in-stock: number
  reviews: number
  category: string,
  description: string,
  image: string
  location: string
}
[https://fakestoreapi.com/products]?limit, sort
productSchema_fake = {
  id: number
  title: string
  price: float
  description: string
  category: string = ['electronics', 'jewelery', 'men's clothing', 'women's clothing]
  image: string
  rating {
    rate: float
    count: number
  }
} 
userSchema_custom = {
  id: uuid
  username: string
  name {
    firstname: string
    lastname: string
  }
  email: string
  emailVerified: boolean 
  image: string 
  password: st
  phone: string
  address {
    city: string
    street: string
    ...
  } 
  role: string 
}
cartSchema_custom = {
  id: uuid,
  userId: uuid,
  date: date,
  products [
    {
      productId: uuid,
      quantity: number
    }
  ]
}

<a id='challenges'></a>
<h2>Challenges</h2>


<ul>
  <li>Use 100% Typescript with frontend and backend</li>
  <li>Pick a suitable API</li>
  <li>Pick state management library for client side (between Redux, Zustand, Jotai or React Context, + React Query)</li>
  <li>Pick a UI routing options</li>
  <li>Implement auth</li>
  <li>Pick a suitable database paradigm</li>
  <li>Create unit tests</li>
  <li>Deploy frontend and backend on seperate machines</li>
</ul>

<a id='solutions'></a>
<h2>Solutions</h2>


Companies can scrape product data from websites using web scraping tools or custom scripts. Web scraping involves extracting data from web pages and storing it in a structured format within a database. However, it's important to comply with website terms of service and legal considerations when scraping data

the website's terms of service and ensure that your scraping activities comply with legal and ethical guidelines. Some websites may have restrictions or require permission for scraping their data.

<h3>API Source</h3>
The Movie Database API. (refer https://developer.themoviedb.org/docs/getting-started)
<br />
(Please look into the ./client/src/config/urls.ts file for more resource details)

### Solution Stack

Here are all major frameworks/libraries used to bootstrap this project
* [![React][React-badge]][React-url]
* [![Typescript][Typescript-badge]][Typescript-url]
* [![TailwindCSS][TailwindCSS-badge]][TailwindCSS-url]
* [![Jotai][Jotai-badge]][Jotai-url]
* [![Zustand][Zustand-badge]][Zustand-url]
* [![Zod][Zod-badge]][Zod-url]
* [![Vite][Vite-badge]][Vite-url]
* [![NodeJS][NodeJS-badge]][NodeJS-url]
* [![ExpressJS][ExpressJS-badge]][ExpressJS-url]
* [![MongoDB][MongoDB-badge]][MongoDB-url]
<br/> 
<br/> 
<b>Note</b>: necessary libraries may have been left out
* React-Query with Axios
* Mongoose
* React Hook Form
* React Router v6
* React Auto-Animated
* React Toastify
* React Infinite Scroll Component
* React Lazy Load Image Component
* React Router Dom

### Images & Icons
* React Icons
* Midjourney 

### Deployment

Frontend: React + Vite - render.com (refer https://render.com/docs/static-sites)
<br />
Backend logic: Express + Node - render.com (refer https://render.com/docs/web-services)
<br />
Database: Mongodb instance - railway.app (refer https://docs.railway.app/databases/mongodb)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
<a id='getting_started'></a>
## Getting Started
<!-- 
You can use this setup if you don't want to self-configure your project 
* [vite-react-ts-eslint-prettier](https://github.com/igdev116/vite-react-ts-eslint-prettier) -->

### Installation
<a id='installation'></a>

_Below is how you can install and set up your own app._

1. Because this is an isolated monorepo which contains both the client and the server, you need to clone the repo and individually install the packet.json files of each directory ./client and ./server.
   ```sh
   git clone https://github.com/nhlong27/movieSite
   ```
2. Install NPM packages
   ```sh
   cd ./client && npm install *** (cd ./server && npm i)
   ```
3. Default hosts are render.com and railway.app. Create your own accounts and add environment variables (locally or on your hosts)
  - for Client: VITE_TMDB_API_KEY (from your tmdb account), VITE_SERVER (your server address)
  - for Server: PORT (your server port), CLIENT (your client address), MONGOUSER('mongo'), MONGOHOST, MONGOPASSWORD, MONGOPORT, DOMAIN(* wildcard domain for setting cookies). As for authentication with JWT. Create your own PUBLIC_KEY, PRIVATE_KEY with openSSL (you can download it here: https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/openssl-for-windows/openssl-0.9.8k_X64.zip) (refer https://gist.github.com/Hakky54/b30418b25215ad7d18f978bc0b448d81 for useful commands)
3. Then if locally run the scripts for both directories
   ```js
   npm run dev
   
   ```
(if you have any troubles please either create an issue or email me. Or message me here: (link to be added))
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
<a id='contributing'></a>
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


See the [open issues](https://github.com/nhlong27/movieSite/issues) for a full list of proposed features (and known issues).


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
<a id='license'></a>
## License

<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->
To be added 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
<a id='acknowledgments'></a>
## Acknowledgments

This space is for resources I found helpful and would like to give credit to.

* [Moonlight Films - fuocy](https://github.com/kettanaito/naming-cheatsheet)
* [GitHub Naming Cheetsheet](https://github.com/kettanaito/naming-cheatsheet)
* [Git Conventional Naming](https://www.conventionalcommits.org/en/v1.0.0/)
* [Tkdodo's Blog - Mastering React Query](https://tkdodo.eu/blog/practical-react-query)
* [Img Shields](https://shields.io)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [Why choose Vite over Webpack?](https://www.reddit.com/r/vuejs/comments/r0fbfw/eli5_why_is_vite_so_much_faster_than_webpack/)
* [RefactoringUI](https://www.refactoringui.com/) 
* [React bulletproof](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
* [Midjourney](https://www.midjourney.com/)
* [Testing with Vitest](https://eternaldev.com/blog/testing-a-react-application-with-vitest/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/nhlong27/movieSite.svg?style=for-the-badge
[contributors-url]: https://github.com/nhlong27/movieSite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nhlong27/movieSite.svg?style=for-the-badge
[forks-url]: https://github.com/nhlong27/movieSite/network/members
[stars-shield]: https://img.shields.io/github/stars/nhlong27/movieSite.svg?style=for-the-badge
[stars-url]: https://github.com/nhlong27/movieSite/stargazers
[issues-shield]: https://img.shields.io/github/issues/nhlong27/movieSite.svg?style=for-the-badge
[issues-url]: https://github.com/nhlong27/movieSite/issues
[license-shield]: https://img.shields.io/github/license/nhlong27/movieSite.svg?style=for-the-badge
[license-url]: https://github.com/nhlong27/movieSite/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/long-nguyen-95517b250/

<!-- Screenshots -->
[homePage-screenshot]: screenshots/homePage.png
[explorePage_search-screenshot]: screenshots/explorePage_search.png
[explorePage_filter-screenshot]: screenshots/explorePage_filter.png
[mediaPage-screenshot]: screenshots/mediaPage.png
[profilePage-screenshot]: screenshots/profilePage.png
[authPage-screenshot]: screenshots/authPage.png
[homePage_preview-screenshot]: screenshots/homePage_preview.png

<!-- Frameworks/libraries -->
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite-badge]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS-badge]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Jotai-badge]: https://img.shields.io/badge/-Jotai-white?style=for-the-badge
[Jotai-url]: https://jotai.org/
[NodeJS-badge]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MongoDB-badge]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[ExpressJS-badge]: 	https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[ExpressJS-url]: https://expressjs.com/
[Zustand-badge]: https://img.shields.io/badge/-zustand-orange
[Zustand-url]: https://github.com/pmndrs/zustand
[Typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Zod-badge]: https://img.shields.io/badge/-zod-blue
[Zod-url]: https://zod.dev/




<!-- ROADMAP -->
<!-- ## Development Pipeline

**DESIGN**

usbat: "user should be able to"
_item_: "movie" || "tv"
_recommended_: {
  movie: {
    trending,
    upcoming,
    now-playing
  },
  tv: {
    trending,
    on-the-air,
    airing-today
  }
}
_filters_: {
  movie: {
    sort_by: {
      popularity.asc,
      popularity.desc,
      release_date.desc,
      vote_average.desc,
      vote_average.asc,
      vote_count.desc,
      vote_count.asc,
    },
    year,
    with_genres
  },
  tv: {
    sort_by: {
      popularity.asc,
      popularity.desc,
      first_air_date.desc,
      vote_average.desc,
      vote_average.asc,
      vote_count.desc,
      vote_count.asc,
    },
    first_air_date_year,
    with_genres,
    with_status: {
      Planned,
      In Production,
      Ended,
      Cancelled,
      Pilot
    },
    with_type: {
      Documentary,
      News,
      Miniseries,
      Reality,
      Scripted,
      TalkShow',
      Video,
    },
  }
}
_overview_: {
  movie: [
    title, overview, genres, vote_average, vote_count, runtime, status, tagline, release_date, spoken_languages{name}, (poster_path, backdrop)
  ],
  tv: [
    tagline, name, overview, genres, vote_average, vote_count, episode_run_time, status, type, next_episode_to_air{episode_number, name, season_number, id, air_date}, last_episode_to_air{episode_number, name, , id, air_date}, first_air_date, spoken_languages{name}, networks[{name,logo_path}], number_of_seasons
  ]
}
_casts_: [
  get[cast{name, profile_path, character}, crew{job, name, profile_path}]
]
_reviews_: [
  results[{author_details{username,avatar_path,rating}, content, created_at}]
]
_similar_: [
  results[{backdrop_path, genre_ids, name, vote_average, vote_count, first_air_date, overview, popularity, id}]
]
_additionals_: {
  movie: [
    get[videos{key}]
  ],
  tv: [
    get[season{episodes{air_date, episode_number, name, id, still_path, vote_average}, season_number, name, poster_path}]
  ]
}
_item-list_: [
  _added-item_: {
    status/"Add to List": {
      watching,
      plan-to-watch,
      dropped,
      completed,
      none/"Add status"
    },
    score/"Select score",
    isFavorited/"Add to Favorites",
    <!-- isReviewed/Reviews,
    isDiscussed/Discussion 
    user,
    title,
    name,
    poster_path,
    season_number,
    id,
    createdAt,
    updatedAt
  }
]

###
Info:
    Item details: 
        imagery: poster_path, backdrop_path, trailers*
        overview: 
           movie: *title*, *tagline*, *overview*, status, *vote_average*, *release_date*, *runtime*, *budget*, *revenue*, original_language, *genres [{name}]*, *production_companies [{name}]*,
           *production_countries [{name}]*,
           ( vote_count, popularity)

           tv: name, tagline, overview, status, type, vote_average, first_air_date, episode_run_time [number], number_of_seasons, number_of_episodes,
           genres [{name}],
           original_language,
           created_by [{name, profile_path}],
            production_companies [{name}],
           production_countries [{name}], 
           networks [{name, logo_path}],

           last_episode_to_air {air_date, episode_number, name, overview, season_number, still_path} -> (season_number -> getSeason)

           next_episode_to_air {air_date, episode_number, name, overview, season_number, still_path},
           
           seasons [{season_number, episode_count, poster_path, name, overview, air_date, id}]
           (vote_count, popularity)

        user-related: user score, status, isFavorited
    Lists: similar: (you may also like)
Actions:
    Watch: - Choose different servers
    Add to Favorite
    Add Score
    Add Status
###

usbat see _recommended_[_item_] 

usbat search for _item_
  usbat search by keyword
  usbat search by _filters_[_item_][...]

usbat see _item_ information 
    watch, overview, reviews, cast, comments, slides
    usbat see _overview_[_item_]
    usbat see _casts_
    usbat see _reviews_:
    usbat see _similar_:
    usbat see _additionals_[_item_]

usbat watch _item_

usbat read and write customized information
  usbat sign up/ sign in/ sign out/ delete account
  usbat read and write personal information
  usbat read and write _added-item_ in _item-list_
  usbat read and write their reviews for _item_ 
  usbat read and write their comments for _item_ 

  Status [default: Watching] - Score - Reviews - Favorite - Comments
  'Plan to watch', ['Watching','Dropped','Completed'] && score
  (score || review || favorite) && (status ? 'watching' : status) -->

<!-- 

## Architecture

**CLIENT STATE**
  **Server API Layer**
  ### API/Request-Response Handling
    debounce
    Api_key -> proxy server: nginx route api requests
    Axios + React Query
      Infinity query
        Keep previous data
      % https://github.com/alan2207/react-query-auth
    Zustand - user, show form optimistic update + rollback/cancel mutations

  **UI/View Layer**
  ### Routing
    Code Splitting
      router + conditionals
      % https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
    Transition
      framer-motion
    Loaders
    errorElement
  ### Error Handling
    Toast, reset form
    Receive server error handling -> React Query handles try-catch, error bubbling to route if no errorBoundary
    404 page - errorElement on <Route>
  ### Suspense Handling
    Skeleton
      react-loading-skeleton
    Lazy loading image
      browser lazyload
      blurhash

Construct step
  Responsive
  Home
    Movie Component
    Swiper
  Discover
    Filter section

  Profile

Functionality Step
  button disabled
Paint Step
  react auto animate - parent & children
  progress bar
  toggling dark/light theme

**SERVER STATE**
  **Client API Layer**
  ### API/Request-Response Handling
    Express
      res.append
      Routing
      % https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
    Error handling
      "When an error is thrown, the JavaScript runtime will immediately stop executing the current function and start unwinding the call stack to find a catch block that can handle the error. If no catch block is found, the error will be passed up to the global error handler, which will display an error message in the console or in the UI."
      "Without return, the code after res.send() would still be executed, even though it's unlikely to have any effect on the response to the client. For example, if you have logging statements or other code that modifies variables after the call to res.send(), it would still be executed even though it doesn't affect the response to the client.

      "Using return after res.send() is a good practice because it ensures that any subsequent code is not executed, which can help prevent errors and improve the performance of your code. However, if you're confident that there's no code after res.send() that would have unintended consequences, you can omit the return statement."
  **Domain**
  ### Middlewares (client has middleware too)

  **Persistence**
  ### Data types 
    MultiMedia
      % Using multer: https://www.youtube.com/watch?v=srPXMt1Q0nY
      % https://www.mongodb.com/community/forums/t/process-of-storing-images-in-mongodb/15093/5
  ### ORM
    Mongoose

**TEST**
**SECURITY**
  **Auth**
  # Tokens + Cookie
    Httponly cookie + browser CORS, xsrf support (axios withCredentials + corsOptions credentials: true, allow origin: localhost...)  
    % https://www.reddit.com/r/webdev/comments/rck2mv/where_is_best_place_to_store_the_bearer_token_you/
    % https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
    % https://stackoverflow.com/questions/43772830/access-control-allow-credentials-header-in-the-response-is-which-must-be-t -->

<!-- **OTHERS**
 .gitignore - remove cache
% https://stackoverflow.com/questions/38983153/git-ignore-env-files-not-working
  setting up
% https://blog.tericcabrel.com/set-up-a-nodejs-project-with-typescript-eslint-and-prettier/
See the [open issues](https://github.com/nhlong27/movieSite/issues) for a full list of proposed features (and known issues). -->

## Eslint
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/display-name": "off",
    "import/no-anonymous-default-export": "off",
  }
}

## Middle ware
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Can also move this to a separate utility function to put in getServerSideProps()
export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  if (!session){
    return NextResponse.redirect(`${process?.env?.NEXT_PUBLIC_SERVER}`);
  }
  console.log('no redirect')
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token'
  });
  // if (!token){
  //   return NextResponse.redirect(`${process?.env?.NEXT_PUBLIC_SERVER}`);
  // }
  //@ts-ignore
  if (Date.now() / 1000 > token?.expires_at) {
    // renew access_token by calling jwt callback
    await getServerSession();
  }
  // redirect user without admin access to login
  // if (token.role==='ADMIN') {
  //   return NextResponse.redirect("http://localhost:3000/");
  // }
  return NextResponse.next();
}

export const config = { matcher: [ '/admin', '/user' ] }