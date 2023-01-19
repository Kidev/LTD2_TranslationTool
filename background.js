/* function toggleDiv(tab) {

	var element = document.getElementById("dragDiv");

	if (element === null || typeof element === 'undefined') {

		const cssFiles = [
			"inject.css",
			"css/btf.css",
			"css/black-dashboard.css",
			"css/flag-icon.css",
			"css/style.css",
			"css/theme.css",
			"css/empty.css"
		];

		cssFiles.forEach((source) => {
			var linkElement = document.createElement("link");
			linkElement.rel = "stylesheet";
			linkElement.href = source;
			document.head.appendChild(linkElement);
		});

		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: [chrome.runtime.getURL("inject.js")]
		});

	} else {

		if (element.style.display === "block") {
			element.style.display = "none";
		} else {
			element.style.display = "block";
		}

	}
}

chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: toggleDiv,
			args: [tab]
		});
	}
});
*/

chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: [ "inject.js" ]
		});
	}
});
