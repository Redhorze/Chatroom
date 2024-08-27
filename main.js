// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr6gzZD7BceYf909a7k5KCq-r7Ldrj7ok",
    authDomain: "chatting-room1.firebaseapp.com",
    projectId: "chatting-room1",
    storageBucket: "chatting-room1.appspot.com",
    messagingSenderId: "94236856075",
    appId: "1:94236856075:web:584843116dec13ce6bdc0e",
    measurementId: "G-SRG6DGHDZM"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginButton = document.getElementById('login');
const signupButton = document.getElementById('signup');
const logoutButton = document.getElementById('logout');
const sendButton = document.getElementById('send-message');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

loginButton.addEventListener('click', login);
signupButton.addEventListener('click', signup);
logoutButton.addEventListener('click', logout);
sendButton.addEventListener('click', sendMessage);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
}

function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut();
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        database.ref('messages').push({
            sender: auth.currentUser.email,
            content: message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        loadMessages();
    } else {
        loginContainer.style.display = 'block';
        chatContainer.style.display = 'none';
    }
});

function loadMessages() {
    database.ref('messages').on('child_added', snapshot => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.sender}: ${message.content}`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

