# Flash-R-Play 

## Objective : 
  An innovative React application designed to elevate early childhood education inspired by Glenn Domans Right Brain Education method using Flashcards. This interactive platform is tailored to engage young learners through visually stimulating flashcards covering a diverse range of subjects. With the aim of improving photographic memory and cognitive development, Flash-R-Play presents these cards sequentially at a standard speed recommended by RBE method. Moreover, I am planning to implement interesting features like speed customization, goals tracking, integration of Web Speech API to convert displayed flashcards text to audio and many more... This user-friendly application reimagines the traditional RBE experience, where parents previously had to physically flash each set of cards at regular intervals while vocalizing the content aloud.

## Table of contents:
- [Requirement Analysis](#requirement-analysis)
- [Tech Stack](#tech-stack)
- [Design](#design)
- [Live Demo](#live-demo)
- [Running Scripts](#running-scripts)
- [Other Links](#other-links)

## Requirement Analysis
### Functional Requirments
- Signin/Signup for parents with username and password
- In landing page, display header with logo, user info and menu to logout.
- Below header, show a container with three columns like todo, in progress and done. Fetch the details from firebase. Initially all the flashcards are in todo, it is done by checking the completedTimes in userData fetched from firebase (if completedTimes < maxTimes and not equal to 0), then its in todo state, if they are equal or more then in done, else in progress. 
- Once a set of flashcards are flashed, that set is moved to in progress state. 
- On click of any button in any column, it takes to flashcard page, where the set of flashcards are displayed one after another each is flashed for one second. Below the flashcard container, play/ pause button and close button
- Fetch these data also from firebase. 
- The text showed in the flashcard must be converted to speech, using Web Speech API.
- Once the flashcard set is over, the db is updated with the completedTimes for that set.
- maxTimes, voiceType (male or female), speed (1, 2) in  settings of firebase

### Not Implemented (Future Scope)
- Goal tracking (strike)
- Option to edit the settings (voiceType/ spped/maxTimes) by users 
- More data for flashcards
## Tech Stack
- **UI Framework** :  React

- **Routing** : React Router DOM

- **CSS Framework** : Tailwind CSS (Tailwind automatically removes all unused CSS when building for production, responsive design with breakpoints, don't have to spend time on writing long css in css files, reusable classes)

- **Data/State Management** : React in-built techniques like Props drilling, lifting up state and Context API for sharing data (props) between components. I would have used **Redux** as state management library for complex application. Since this app does not have complex data to be globally stored, I did not use any framework for state management to have minimum scaffholding. 

- **Authentication and Database** : Firebase (Firebase Authentication, Firestore)

- **Cloud Storage** : Firebase Cloud Storage

- **Logging** :  Bugfender

- **Hosting** : Netlify

## Design
### UX
- Colors and Fonts suitable for kids 
- Simple UI with only required info and easy for parents to handle 
- Responsive design : Works in all devices and screen sizes.

## Live Demo
Please check https://flashrplay.netlify.app/ for live demo.
If you want to run the app in local, please check next section.

## Running Scripts
After cloning the project, you can run the following in the project directory.

### `yarn install or npm install`

Installs the required packages.

### `yarn start or npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build or npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Other Links

- [Blog Post](https://harshithasv.hashnode.dev/elevating-early-childhood-education-with-flash-r-play)

- [Bugfender](https://dashboard.bugfender.com/3/app/DXtETPbMAq/logs)

- [Hack-R-Play 2.0](https://hustles.reactplay.io/events/23/hackrplay)

