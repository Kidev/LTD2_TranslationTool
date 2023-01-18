function toggleDiv() {
	var element = document.getElementById("dragDiv");
	if (typeof element !== 'undefined' && element !== null) {
		if (element.style.display === "none") {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	}
}

chrome.action.onClicked.addListener((tab) => {
	console.log('#' + chrome.runtime.getURL('font/Poppins-Regular.ttf') + '#');
	if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: toggleDiv
	});
  }
});
