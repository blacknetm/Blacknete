function check() {
  const answer = document.getElementById("answer").value;
  const error = document.getElementById("error");

  // جواب مخفی (کاربر باید با inspect پیداش کنه)
  const secret = "blacknet_level1";

  if (answer === secret) {
    document.body.innerHTML = `
      <div style="color:#00ffcc; text-align:center; margin-top:150px; font-family:monospace;">
        <h1>ACCESS GRANTED</h1>
        <p>Level 2 coming soon...</p>
      </div>
    `;
  } else {
    error.innerText = "ERROR: Invalid key";
  }
}
