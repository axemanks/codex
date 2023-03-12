import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = documnet.querySelector('#chat_container'); // the main app fom index.html

let loadInterval; // delclare the variable that will be use in the loading indicator

// loading indicator
function loader(element) {
  element.textContent = ''; // set element to blank
  loadInterval = setInterval(() => {
    element.textContent += '.'; // add one .
    if (element.textContent === '.....') {
      element.textContent = ''; // clear when reaching 4 dots
    }
  }, 300);
}

// this function causes the response text to be delayed so it looks like typing rather than the response delivered all at once.

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval); // when reaching end of text clear interval
    }
  }, 20); // 20 miliseconds for each letter
}
// function to generate a random ID
function generateUniqueId() {
  const timestamp = Date.now(); // generate a random number from date
  const randomNumber = Math.random(); //another random number
  const hexadecimalString = randomNumber.toString(16); // random 16 digit hexadecimal sting

  return `id-${timestamp}-${hexadecimalString}`;
}
// chat stripes
function chatStripe(isAi, value, uniqueId) {
  return `
  <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
     <div className="profile">
       <img 
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}"
        />
      </div>
      <div class="message" id=${uniqueId}>${value}</div>
    </div>
    </div>
  `;
}
// hanle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form) // pulls form data from the input box in index.html
  chatContainer.innerHTML += chatStripe(false, data.get('prompt')); // users chat stripe
  form.reset();// clear text
  //bot chatstripe
  const uniqueID = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId); // true = ai false = user
  chatContainer.scrollTop = chatContainer.scrollHeight; // scrolls the chat down
  const messageDiv = document.getElementById(uniqueID);

  loader(messageDiv);
}
form.addEventListener('submit', handleSubmit); // submit when clicking
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    handleSubmit(e); // submit when hitting the enter key (13)
  }
})