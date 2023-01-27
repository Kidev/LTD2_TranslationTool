browser.action.onClicked.addListener((tab) => {
    if (tab.url.includes("https://docs.google.com/spreadsheets/")) {
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"].map((source) => browser.runtime.getURL(source))
        });
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                let prevWinDiv = document.querySelector('#dragDiv');
                if (prevWinDiv.style.display === 'none') {
                    prevWinDiv.style.display = 'block';
                } else {
                    prevWinDiv.style.display = 'none';
                }
            }
        });
    }
});