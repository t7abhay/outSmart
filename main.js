document.getElementById("form_1").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent popup refresh

  const userInput = document.getElementById("input_hours").value;

  if (!userInput || isNaN(userInput) || userInput <= 0) {
    alert("Please enter a valid number of hours");
    return;
  }

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const tab = tabs[0];

      if (!tab || !tab.url) {
        console.error("Could not get the current tab or URL.");
        return;
      }

      const valueInSeconds = hoursToSeconds(userInput);
      const newUrl = modifyUrl(tab.url, valueInSeconds);

      chrome.tabs.update(tab.id, { url: newUrl });
    }
  );
});

function modifyUrl(originalUrl, value) {
  if (!originalUrl.includes("f_TPR=r")) {
    console.warn("No matching 'f_TPR=r' param found in URL.");
    return originalUrl;
  }
  return originalUrl.replace(/f_TPR=r\d+/, `f_TPR=r${value}`);
}

function hoursToSeconds(hours) {
  return parseFloat(hours) * 3600;
}
