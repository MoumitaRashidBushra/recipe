const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  console.log(username, password);
  if ((username, password)) {
    fetch("https://brainwave-zc9o.onrender.com/student/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "index.html";
        }
      });
  }
};

// --------------------------------------------------------------------------------//

// Check if the user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null; // Assuming you store a token in localStorage when the user is logged in
};

// Function to toggle visibility of login/logout buttons
const toggleNavbarButtons = () => {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  if (isLoggedIn()) {
    // If user is logged in, show logout button and hide login button
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
  } else {
    // If user is not logged in, show login button and hide logout button
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
  }
};

// Call the toggleNavbarButtons function when the page loads
document.addEventListener("DOMContentLoaded", toggleNavbarButtons);
