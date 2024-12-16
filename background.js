function normalizeUrl(url) {
    try {
        let normalizedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);

        if (!normalizedUrl.hostname.startsWith('www.')) {
            normalizedUrl.hostname = `www.${normalizedUrl.hostname}`;
        }

        return normalizedUrl.toString();
    } catch (err) {
        console.error("Error normalizing URL:", err.message);
        return null; 
    }
}

// Phishing detection logic
async function detectPhishing(url) {
    try {
        console.log("Sending request to external server...");

        const response = await fetch('https://phishing-detection-server-175f2c296ec7.herokuapp.com/detect-phishing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            throw new Error(`Failed to detect phishing: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Server response:", data);

        const phishingProbability = data.probability; 
        return phishingProbability;
    } catch (err) {
        console.error("Error detecting phishing:", err.message);
        return null; // Default to null on error
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message); 

    if (message.type === "CHECK_PHISHING") {
        const rawUrl = message.url;
        console.log("Received URL:", rawUrl);

        const url = normalizeUrl(rawUrl);
        if (!url) {
            console.error("Invalid URL format. Cannot proceed.");
            sendResponse({ error: "Invalid URL format" });
            return;
        }

        console.log("Normalized URL:", url); 

        detectPhishing(url).then((phishingProbability) => {
            console.log("Phishing probability:", phishingProbability); 

            const isPhishing = phishingProbability > 50; 

            if (isPhishing) {
                chrome.tabs.create({
                    url: chrome.runtime.getURL("popup.html"), 
                    active: true
                });

                chrome.runtime.onMessage.addListener((popupMessage, sender, popupResponse) => {
                    if (popupMessage.type === "OPEN_DETECTED_URL") {
                        popupResponse({ url: url, probability: phishingProbability }); 
                    }
                });

            } else {
                sendResponse({ isPhishing, probability: phishingProbability });
            }
        }).catch((error) => {
            console.error("Error detecting phishing:", error);
            sendResponse({ error: "Error detecting phishing" });
        });

        return true; 
    }
});
