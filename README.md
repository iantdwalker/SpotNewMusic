# SpotNewMusic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

V1.1 Features:

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

V1.0 Features:

-Create a Spotify session using the authentication API that issues an active token.  
-Search for artists using exact match search term.  
-The artist search result and their related artists are displayed below the search bar.  
-Artist information displaye includes the artist name, popularity rating and list of genres.  
-Clicking on an artist sets that artist as the selected artist and displays their related artists.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
