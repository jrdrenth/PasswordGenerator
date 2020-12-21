// Characters to generate the password from
var specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
var numbers = '0123456789'.split('');
var lowerCaseLetters = 'abcdefghijklmnopqrstuvwxzy'.split('');
var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Initialize user input with default values
var passwordLength = 18;
var useSpecialCharacters = true;
var useNumbers = true;
var useLowerCaseLetters = true;
var useUpperCaseLetters = true;

// Generate Password button from html
var generateBtn = document.querySelector('#generate');

// FUNCTIONS
function getUserInputs() {
  var textPrefix = 'Use ';
  var textSuffix = '?  Press OK to accept or Cancel to decline.';
  var errorMessage = 'You must select at least one to generate the password.  Please try again.';

  //alert('Please answer the following questions so that a password can be generated.');

  var isInputCollected = false;
  while (!isInputCollected) {
    let displayText = 'special characters';
    useSpecialCharacters = confirm(textPrefix + displayText + textSuffix);

    displayText = 'numbers';
    useNumbers = confirm(textPrefix + displayText + textSuffix);

    displayText = 'lower case letters';
    useLowerCaseLetters = confirm(textPrefix + displayText + textSuffix);

    displayText = 'upper case letters';
    useUpperCaseLetters = confirm(textPrefix + displayText + textSuffix);

    isInputCollected = useSpecialCharacters || useNumbers || useLowerCaseLetters || useUpperCaseLetters;
    
    if (!isInputCollected) {
      alert(errorMessage);
    }
  }

  isInputCollected = false;
  while (!isInputCollected) {
    passwordLength = prompt('What should the length of the password be?  Please choose a number between 8 and 128 and press OK.');

    if (isNaN(passwordLength)) {
      alert('Must enter a numeric value.  Please try again.');
    } else if (passwordLength < 8 || passwordLength > 128) {
      alert('Value must be between 8 and 128.  Please try again.');
    } else {
      //alert('Press the "Generate Password" button when you are ready.  You may keep pressing it as many times as you like until getting a password to your liking.');
      isInputCollected = true;
    }
  }

}

function chooseRandom(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomItem = array[randomIndex];
  return randomItem;
}

function shuffle(array) {
  for(let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) { 
    
    // Get random index to swap value with current index. Example: array length is 10, currentIndex starts at 9, randomIndex will be anywhere between 0-8.  Swap the two.
    randomIndex = Math.floor(Math.random() * currentIndex); // 
    
    // The swap
    let tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
}

function generatePassword() {
  var passwordArray = [];
  var characterPool = [];
  
  // Add at least one special character if selected
  if (useSpecialCharacters) {
    passwordArray = passwordArray.concat(chooseRandom(specialCharacters));
    characterPool = characterPool.concat(specialCharacters);
  }

  // Add at least one number if selected
  if (useNumbers) {
    passwordArray = passwordArray.concat(chooseRandom(numbers));
    characterPool = characterPool.concat(numbers);
  }

  // Add at least one lower case letter if selected
  if (useLowerCaseLetters) {
    passwordArray = passwordArray.concat(chooseRandom(lowerCaseLetters));
    characterPool = characterPool.concat(lowerCaseLetters);
  }

  // Add at least one upper case letter if selected
  if (useUpperCaseLetters) {
    passwordArray = passwordArray.concat(chooseRandom(upperCaseLetters));
    characterPool = characterPool.concat(upperCaseLetters);
  }
  
  // Randomly add all remaining characters from the full character pool
  for (let iPwd = passwordArray.length; iPwd < passwordLength; iPwd++) {
    passwordArray = passwordArray.concat(chooseRandom(characterPool));
  }

  // Shuffle the characters in the password array so it doesn't always begin with one special character, then one number, etc.
  shuffle(passwordArray);

  var password = passwordArray.join('');
  return password;
}

// Write password to the #password input
function writePassword() {
  getUserInputs();
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// Uncomment the line below to run promopts immediately when page loads instead of waiting for the button to be pressed
//getUserInputs();
