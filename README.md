# Shopify Word Search

This is my submission for the Mobile Development Shopify Coding Challenge

## Pre-requisites

- Node.js
- Expo CLI
- Android Studio/ XCode
- A running Android or iOS emulator

## Steps to reproduce

Type these commands into your command line to reproduce:

1. `git clone https://github.com/akshay2000saxena/shopify-word-search.git` will copy the code here to your machine
2. `yarn add expo` in the shopify-word-search directory (`npm intall` install packages if it fails)
3. `npm start` or `expo start` to start the server
4. `a` or `i` to open the app on an android or an iOS emulator respectively

(If you do not have android emulator installed, just install the expo app on your phone and scan the QR code generated on running expo start)

## Tasks
- [X] Create an Android/iOS word search mobile app
- [X] The word search should have at least a 10x10 grid
- [X] Include at least the following 6 words: Swift, Kotlin, ObjectiveC, Variable, Java, Mobile
- [X] Keep track of how many words a user has found
- [X] Make sure it compiles successfully
- [X] Randomize where the words are placed
- [X] Make a slick UI with smooth animations
- [X] Make it look good in portrait and landscape
- [X] Additional features: Timer
- [ ] Allow the user to find the words by swiping over the words


## Screenshots

### Game Screen
The first screenshot shows the screen before you start the game.

<p align="left">
  <img alt="" src="screenshots/portrait2.jpg" width="360" /><br>
</p>
<p align="left">
  <img alt="" src="screenshots/landscape2.jpg" width="800" /><br>
</p>


The second screenshot shows the screen when all but one word is found and the last word is almost found. The highlighted tiles will spell out the string the player is forming and is cleared on finding the word.
If word is not found, the user can press the X button to revert the incorrect highlighted titles into black tiles and start the new string from scratch.
The active score counter is in the form of the items in the list which are highlighted in the respective color and scratched off.

<p align="left">
  <img alt="" src="screenshots/portrait1.jpg" width="360" /><br>
</p>
<p align="left">
  <img alt="" src="screenshots/landscape1.jpg" width="800" /><br>
</p>


### Game Over Screen
The third screenshot shows the screen where the user has found all the words. (Fix on opacity=0.2 needed, old screenshot) 

<p align="left">
  <img alt="" src="screenshots/end1.jpg" width="360" /><br>
</p>
<p align="left">
  <img alt="" src="screenshots/end2.jpg" width="800" /><br>
</p>

## Additional Feature

### Randomize

Every time a user resets the game or finishes the game, the grid is randomized.
(Used the function created by https://github.com/bahamas10/wordsearch.js#wordsearchjs)

### Timer

User can see how long it takes for them to beat the game
