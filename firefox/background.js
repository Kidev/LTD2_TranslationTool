browser.action.onClicked.addListener(async (tab) => {
    if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
        /*
        try {
            await browser.scripting.insertCSS({
                target: { tabId: tab.id },
                files: [
                    "inject.css",
                    "css/btf.css",
                    "css/black-dashboard.css",
                    "css/flag-icon.css",
                    "css/style.css",
                    "css/theme.css"
                ].map(source => browser.runtime.getURL(source))
            });
        } catch (err) {
            console.error(`Failed to inject CSS (${err})`);
        }
        */
        try {
            await browser.scripting.executeScript({
                target: { tabId: tab.id },
                files: [browser.runtime.getURL("inject.js")]
            });
        } catch (err) {
            console.error(`Failed to inject SCRIPT (${err})`);
        }
    }
});