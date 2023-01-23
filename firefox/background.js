browser.action.onClicked.addListener((tab) => {
    if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
        console.log("LTD2: CLICK ON GOOD TAB");
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"].map((source) => browser.runtime.getURL(source))
        });
    }
});