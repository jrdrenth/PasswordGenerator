// Characters to generate the password from
var specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
var numbers = '0123456789'.split('');
var lowerCaseLetters = 'abcdefghijklmnopqrstuvwxzy'.split('');
var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

var passwordLength = 128;
var useSpecialCharacters = true;
var useNumbers = true;
var useLowerCaseLetters = true;
var useUpperCaseLetters = true;


// Assignment Code
var generateBtn = document.querySelector("#generate");

function chooseRandom(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomItem = array[randomIndex];
  return randomItem;
}

function shuffle(array) {
  for(let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) { 
    
    // Get random index. Example: array length is 10, currentIndex starts at 9, randomIndex will be anywhere between 0-8.  Swap the two.
    randomIndex = Math.floor(Math.random() * currentIndex); // 
    
    // The swap
    let tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
}

function generatePassword() {
  
  // Initialize array with a string and then empty it, so it will retain the string[] trype for later on when joining the contents
  var passwordArray = [''];
  passwordArray.pop();
  
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
  
  // Randomly add all remaining characters
  for (let iPwd = passwordArray.length; iPwd < passwordLength; iPwd++) {
    passwordArray = passwordArray.concat(chooseRandom(characterPool));
  }

  // Shuffle the characters in the password array since the first ones will have always been one special character, one number, etc.
  shuffle(passwordArray);

  var password = passwordArray.join('');
  //var password = "hello";
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
