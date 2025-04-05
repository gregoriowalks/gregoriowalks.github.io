const webhookURL = "https://hooks.zapier.com/hooks/catch/22363794/2c76u01/"; // <-- your new webhook here

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      message: document.getElementById("msg").value
    };

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.ok) {
        form.style.display = "none";
        confirmation.style.display = "block";
      } else {
        confirmation.innerText = "Oops! Something went wrong.";
        confirmation.style.display = "block";
      }
    } catch (error) {
      confirmation.innerText = "Submission failed. Try again.";
      confirmation.style.display = "block";
    }
  });
});
