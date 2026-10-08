// ==========================================
// MoodSpace - suggest.js
// Sends the suggestion form to your email using Web3Forms (free).
// ==========================================

// 1. Get a free access key at https://web3forms.com (you enter your email,
//    they send the key to it). Then paste it between the quotes below.
const ACCESS_KEY = "b5bba95f-60b1-4f5f-a09e-6a9843248f7f";

const form = document.getElementById("suggest-form");
const statusEl = document.getElementById("form-status");
const sendBtn = document.getElementById("send-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();   // stops the page from reloading

  // Safety check so you don't forget to add your key
  if (ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
    statusEl.textContent = "The form isn't connected yet. Add your Web3Forms key in suggest.js.";
    return;
  }

  const data = new FormData(form);
  if (data.get("botcheck")) return;   // bots tick the hidden box, people don't

  // The information we send
  const payload = {
    access_key: ACCESS_KEY,
    subject: "MoodSpace suggestion: " + data.get("type"),
    from_name: "MoodSpace",
    type: data.get("type"),
    message: data.get("message"),
  };
  if (data.get("email")) payload.email = data.get("email");   // only if they gave one

  sendBtn.disabled = true;
  statusEl.textContent = "Sending...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (result.success) {
      form.reset();
      statusEl.textContent = "Thank you! Your idea was sent. 💌";
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    statusEl.textContent = "Sorry, that didn't send. Please try again in a moment.";
  }

  sendBtn.disabled = false;
});