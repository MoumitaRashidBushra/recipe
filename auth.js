const handleRegistration = (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const name = getValue("name");
  const username = getValue("username");
  const email = getValue("email");
  const bio = getValue("bio");
  const password = getValue("password");

  const info = {
    name,
    username,
    email,
    bio,
    password,
  };

  if (
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    console.log(info);

    fetch("https://recipenest.onrender.com/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          showToast(); // Display toast notification upon successful registration
          window.location.href = "login.html"; // Redirect to login page
        } else {
          displayError(
            data.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        displayError(
          "An error occurred during registration. Please try again."
        );
      });
  } else {
    displayError(
      "Password must contain eight characters, at least one letter, one number, and one special character."
    );
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};
