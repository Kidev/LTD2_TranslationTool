browser.action.onClicked.addListener(async (tab) => {
    if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
        try {
            await browser.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["inject.js"]
            });
        } catch (err) {
            console.error(`Failed to inject script (${err})`);
        }
    }
}, {});