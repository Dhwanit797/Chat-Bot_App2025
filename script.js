const users = [
  {
    name: "Dhwanit",
    avatar: "https://w0.peakpx.com/wallpaper/961/507/HD-wallpaper-sung-jin-woo-solo-leveling-thumbnail.jpg",
    messages: [
      { from: "received", content: "Hey! 👋" },
      { from: "sent", content: "Hello Dhwanit, how are you?" },
      { from: "received", content: "I'm good! Working on my portfolio. 😎" },
    ]
  },
  {
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      { from: "received", content: "Yo what's up!" },
      { from: "sent", content: "All good, John! 🚀" },
      { from: "received", content: "Want to play some Valorant tonight?" }
    ]
  },
  {
    name: "Chloe",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    messages: [
      { from: "received", content: "Hi! Can you help me with the assignment?" },
      { from: "sent", content: "Sure Chloe! Send me the details." },
    ]
  }
];

let activeUserIndex = 0;

const userList = document.getElementById("userList");
const chatHeader = document.getElementById("chat-header");
const chatArea = document.getElementById("chat-area");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("sendBtn");
const activeAvatar = document.getElementById("active-avatar");
const activeUser = document.getElementById("active-user");

// Display chat for the current user
function renderChat(userIndex) {
  chatArea.innerHTML = "";
  users[userIndex].messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + msg.from;
    div.textContent = msg.content;
    chatArea.appendChild(div);
  });
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Change chat when sidebar user is clicked
userList.querySelectorAll("li").forEach((li, idx) => {
  li.onclick = function() {
    if (activeUserIndex !== idx) {
      userList.querySelectorAll('li').forEach(li2=>li2.classList.remove("selected"));
      this.classList.add("selected");
      activeUserIndex = idx;
      activeAvatar.src = users[idx].avatar;
      activeAvatar.alt = users[idx].name;
      activeUser.textContent = users[idx].name;
      renderChat(idx);
      messageInput.focus();
    }
  };
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  // Chat command: /switch name
  if(text.match(/^\/switch\s+([a-zA-Z]+)/)) {
    const uname = text.match(/^\/switch\s+([a-zA-Z]+)/)[1].toLowerCase();
    const idx = users.findIndex(u=>u.name.toLowerCase() === uname);
    if(idx >= 0){
      userList.children[idx].click();
      messageInput.value = "";
      return;
    }
  }

  users[activeUserIndex].messages.push({from: "sent", content: text});
  renderChat(activeUserIndex);
  messageInput.value = "";
  // Optionally, fake a received reply after a while for demo
  setTimeout(()=>{
    if(users[activeUserIndex].name !== "Dhwanit")
      users[activeUserIndex].messages.push(
        {from:"received", content: "👍"}
      );
    else
      users[activeUserIndex].messages.push(
        {from:"received", content: "That's cool!"}
      );
    renderChat(activeUserIndex);
  },700+Math.random()*800);
}

sendBtn.onclick = sendMessage;
messageInput.addEventListener('keydown', function(e){
  if(e.key === 'Enter') sendMessage();
});
window.onload = ()=>renderChat(activeUserIndex);

// Dark mode button functionality
document.getElementById('darkModeBtn').onclick = function() {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    localStorage.setItem('chatapp-theme', 'dark');
  } else {
    localStorage.setItem('chatapp-theme', 'light');
  }
};
if(localStorage.getItem('chatapp-theme')==='dark'){
  document.body.classList.add('dark-mode');
}