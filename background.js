chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["inject.js"]
		});
  	}
});
