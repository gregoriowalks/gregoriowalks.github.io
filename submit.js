const webhookURL = "https://hooks.zapier.com/hooks/catch/22363794/2c76u01/"; // <-- your new webhook here

document.addEventListener("DOMContentLoaded", function () {
  // CONTACT FORM
  const contactForm = document.getElementById("contact-form");
  const contactConfirmation = document.getElementById("confirmation");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        email: document.getElementById("email").value,
        message: document.getElementById("msg").value,
        source: "Contact"
      };

      await submitForm(data, contactForm, contactConfirmation);
    });
  }

  // EARLY ACCESS FORM
  const earlyAccessForm = document.getElementById("early-access-form");
  const eaConfirmation = document.getElementById("ea-confirmation");

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        email: document.getElementById("ea-email").value,
        message: "", // no message field in this form
        source: "Early Access"
      };

      await submitForm(data, earlyAccessForm, eaConfirmation);
    });
  }

  // Shared function
  async function submitForm(data, formEl, confirmationEl) {
    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.ok) {
        formEl.style.display = "none";
        confirmationEl.style.display = "block";
      } else {
        confirmationEl.textContent = "Oops! Something went wrong.";
        confirmationEl.style.display = "block";
      }
    } catch (error) {
      confirmationEl.textContent = "Submission failed. Try again.";
      confirmationEl.style.display = "block";
    }
  }
});
