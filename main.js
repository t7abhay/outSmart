document.getElementById("button").addEventListener("click", () => {
  const userInput = document.getElementById("input_hours").value;

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const tab = tabs[0];

      if (!tab || !tab.url) {
        return;
      }

      const valueInSeconds = hoursToSeconds(userInput);
      const newUrl = modifyUrl(tab.url, valueInSeconds);

      chrome.tabs.update(tab.id, { url: newUrl });
    }
  );
});

function modifyUrl(originalUrl, value) {
  const modUrl = originalUrl.replace(/(f_TPR=r)\d+/, `$1${value}`);
  return modUrl;
}

function hoursToSeconds(hours) {
  return hours * 3600;
}
