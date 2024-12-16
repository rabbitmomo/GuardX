async function handleLinkClick(event) {
    const link = event.target.closest("a");
    if (link && link.href) {
        event.preventDefault(); 
        const clickedURL = link.href;
        console.log(`Clicked URL: ${clickedURL}`); 
        console.log("Checking if the URL is phishing..."); 

        chrome.runtime.sendMessage(
            { type: "CHECK_PHISHING", url: clickedURL },
            (response) => {
                console.log("Phishing check response:", response); 

                if (response && response.error) {
                    console.error(response.error);
                    alert("Error checking the website. Navigation allowed.");
                    window.location.href = clickedURL;
                    return;
                }

                if (response && typeof response.isPhishing !== 'undefined') {
                    const { isPhishing, probability } = response;

                    if (isPhishing) {
                        alert(
                            `Blocked! This website is likely a phishing site with ${probability.toFixed(2)}% probability.`
                        );
                    } else {
                        alert(
                            `This website is not a phishing site. Probability: ${probability}%.`
                        );
                        window.location.href = clickedURL; // Allow navigation
                    }
                } else {
                    console.error("Unexpected response format:", response);
                }
            }
        );
    }
}

document.addEventListener("click", handleLinkClick);
