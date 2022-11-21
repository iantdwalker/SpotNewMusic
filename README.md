# SpotNewMusic
An Angular SPA started in 2019 that will help to discover new music artists and genres using the public Spotify web API. Still in active development.

# Build & Run
The project is currently deployed as a Microsoft Azure Static Web App with an embeded Azure Fuction API. To run both locally via the Azure emulator:  
-Install Node.js v16 LTS  
-Run: npm install -g @azure/static-web-apps-cli  
-Install Azure Functions Core Tools v4  
-Run: npm install  
-Run: npm run build  
-Run: npm run start to begin Angular project on http://localhost:4200 with hot refresh enabled  
-Run: npm run swa  

# Update History
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

-13/11/2022 - Updated from Angular v13.3.11 to v14.2.10  
-12/11/2022 - Updated from Angular v12.2.8 to v13.3.11 and from Typescript v4.3.5 to v4.6.4  
-02/10/2021 - Updated from Angular v11.2.14 to v12.2.8 and from Typescript v4.0.8 to v4.3.5  
-01/10/2021 - Updated from Angular v10.2.5 to v11.2.14  
-01/10/2021 - Updated from Angular v9.1.13 to v10.2.5 and from Typescript v3.8.3 to v4.0.8  
-01/10/2021 - Updated from Angular v9.1.13 to v10.2.5 and from Typescript v3.8.3 to v4.0.8  
-30/09/2021 - Updated from Angular v8.2 to v9.1.13 and from Typescript v3.5.3 to v3.8.3  
-30/09/2021 - Updated from Angular v7.2 to v8.2 and from Typescript v3.2.2 to v3.5.3  

# Version History
v3.0 - TBD:  
-Changed the session token message handling, its position on screen and the wording  
-Restructured the header component to utilise a responsive nav-bar for the image logo, heading and any future options  
-Changed from using basic css to scss  
-Removed all spec and e2e test source files, config files and packages  
-Updated browser tab icon to the Spotify icon  

v2.2 - 13/11/2022:  
-Updated all other npm packages to their latst versions and removed redundant packages  
-Updated @angular-eslint/* packages to v14  
-Updated to Angular (v14)  
-Updated to Angular (v13) and Typescript (4.6.4)  

v2.1 - 08/11/2022:  
-Created a Microsoft Azure Static Web App preview environment for the GitHub development branch  
-Converted Azure Managed Function embedded API to an ESM module for Node.js v16  
-Updated Microsoft Azure Static Web App Node.js runtime to v16 for Client and API

v2.0 - 06/11/2021 (tagged 08/11/2022):  
-Migrated from Google Cloud to a Microsoft Azure Static Web App  
-Replaced SpotNewMusic-Server API with a Microsoft Azure Managed Function embedded API  
-Non-functional code path improvements  
-Updated to Angular (v12) and Typescript (4.3.5)  
-Migrated from TSLint to ESLint

v1.2 - 22/06/2021:  
-General: Deployed client and server to a cloud native environment (GCP)  
-General: RxJs improvements  
-Search Results UI/UX: Display message if no results are found  
-Searching: Fine tuned the filtered artist search  
-Searching: Modified search bar to use a paged results list on each key press  
-Searching: Now uses a stock template image for broken/null artist image links  
-Searching: Add 'genre unknown' label to artists without any genres  
-Searching: BUG: Genres can no longer overlap artist name  
-Searching/Search Results UI/UX: BUG: Artists without related artists no longer leave previous results on display  
-Searching: BUG: broken artist selection fixed  
-Searching: Ensure duplicate search results are not added to the search results list

v1.1 - 14/10/2019:  
-Spotify access token is now requested and granted automatically without need for button click  
-Spotify access token expiry is shown via an on-screen count down  
-Spotify access token text is now responsive and better sized  
-Spot New Music logo and header is now responsive and better sized  
-Artist search bar is now responsive and better sized  
-Artist search bar magnifying glass icon can be clicked to search  
-Artist search bar is now disabled if the access token cannot be granted  
-Improved the scaling of the artist information within the artist circle image  
-Improved the display of the artist genres and limited the list to three  
-Split up the Angular components more logically  
-General code refactoring/tidy ups

v1.0 - 06/07/2019:  
-Created a Spotify session using the authentication API that issues an active token.  
-Search for artists using exact match search term.  
-The artist search result and their related artists are displayed below the search bar.  
-Artist information display includes the artist name, popularity rating and list of genres.  
-Clicking on an artist sets that artist as the selected artist and displays their related artists.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

!!Removed as of Spot New Music v3.0!!  
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

!!Removed as of Spot New Music v3.0!!  
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
