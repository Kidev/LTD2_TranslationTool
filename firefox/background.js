browser.action.onClicked.addListener((tab) => {
    if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"].map((source) => browser.runtime.getURL(source))
        });
    }
});