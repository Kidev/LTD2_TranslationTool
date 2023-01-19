function injectCSSFile(path) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = path;
	document.head.appendChild(link);
}

function toggleDiv() {

	var element = document.getElementById("dragDiv");

	if (element === null || typeof element === 'undefined') {
		for (var cssPath in [ "inject.css",
			                  "css/btf.css",
							  "css/black-dashboard.css",
							  "css/flag-icon.css",
							  "css/style.css",
							  "css/theme.css",
							  "css/empty.css" ]) {
			injectCSSFile(cssPath);
		}

		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["inject.js"]
		});
	} else {
		if (element.style.display === "none") {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	}
}

chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: toggleDiv
		});
	}
});
