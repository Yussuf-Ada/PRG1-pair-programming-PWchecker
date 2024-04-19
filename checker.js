const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require("readline-sync"); // Import readline-sync for synchronous input

// No need for a comment as the function name is self-describing.
function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const year = String(currentDate.getFullYear());
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const passwordCriteria = {
  length: /.{8,}/, // Minimum 8 characters
  uppercase: /[A-Z]/, // Must have uppercase letters
  lowercase: /[a-z]/, // Must have lowercase letters
  digit: /[0-9]/, // Must have digits
  specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\|=]/, // Must have special characters
};

function isStrongPassword(password) {
  // Check each condition using the predefined regex
  return (
    passwordCriteria.length.test(password) &&
    passwordCriteria.uppercase.test(password) &&
    passwordCriteria.lowercase.test(password) &&
    passwordCriteria.digit.test(password) &&
    passwordCriteria.specialChar.test(password)
  );
}

function getPasswordStrength(password) {
  const conditionsPassed = [
    passwordCriteria.length.test(password),
    passwordCriteria.uppercase.test(password),
    passwordCriteria.lowercase.test(password),
    passwordCriteria.digit.test(password),
    passwordCriteria.specialChar.test(password),
  ].filter((x) => x === true).length;

  if (conditionsPassed === 5) {
    return "Strong";
  } else if (conditionsPassed >= 3) {
    return "Medium";
  } else {
    return "Weak";
  }
}

function getPasswordFromUser() {
  const password = readline.question("Please enter your password: ", {
    hideEchoBack: true, // Masks the password input for privacy
  });
  const currentDateTime = getCurrentDateTimeFormatted();
  fs.appendFileSync(outputFile, `${currentDateTime}\n`, "utf-8");

  const inputFile = "./common_passwords.txt";
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);
  if (lines.includes(password)) {
    console.log("Password in the list");
  } else {
    console.log("Password NOT in list");
  }
  const strength = getPasswordStrength(password);
  console.log(`Password strength: ${strength}`);
  let reshuffledPass = passwordJumbler(password);
  fs.appendFileSync(
    "./entered_passwords.txt",
    reshuffledPass + " - " + currentDateTime + "\n"
  );

  console.log("Added to password list");

  if (strength === "Strong") {
    console.log("Your password is strong.");
  } else {
    ``;
    console.log(
      "Password does not meet the criteria. Please enter a different password."
    );
    getPasswordFromUser();
  }
}

// End of functions

const outputFile = "./checking_password_log.txt";

const passwordJumbler = (password) => {
  return password.slice(2) + password.slice(4, -2) + password.slice(2, 2);
};

// Enter code to read in the 25 most common passwords from the text file here.

getPasswordFromUser();
