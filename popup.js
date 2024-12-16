document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log("Fetching the latest phishing data...");

        const response = await fetch('https://phishing-detection-server-175f2c296ec7.herokuapp.com/fetch-latest');

        if (!response.ok) {
            throw new Error(`Failed to fetch the latest data: ${response.statusText}`);
        }

        const latestData = await response.json();
        console.log("Latest phishing data:", latestData);

        if (latestData && latestData.url) {
            document.getElementById('url-value').textContent = latestData.url;
            document.getElementById('probability-value').textContent = `${latestData.probability.toFixed(2)}%`;

            const proceedLink = document.getElementById('proceed-link');
            proceedLink.href = latestData.url;
            proceedLink.style.display = 'inline-block';

            const analysisResponse = await fetch('https://phishing-detection-server-175f2c296ec7.herokuapp.com/gpt-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: `Please analyze why this website is considered a phishing site. URL: ${latestData.url}, Phishing Probability: ${latestData.probability.toFixed(2)}%`
                })
            });

            if (!analysisResponse.ok) {
                throw new Error(`Failed to get analysis: ${analysisResponse.statusText}`);
            }

            const analysisData = await analysisResponse.json();
            console.log("Analysis response:", analysisData);

            const analysisText = analysisData.reply || 'No analysis available.';
            const analysisContainer = document.getElementById('analysis-container');

            analysisContainer.innerHTML = '';

            const points = analysisText.split('\n').map(point => point.trim()).filter(point => point);
            
            points.forEach((point) => {
                const pointDiv = document.createElement('div'); 
                pointDiv.classList.add('analysis-point'); 

                const pointText = document.createElement('p');
                pointText.textContent = point; 
                pointDiv.appendChild(pointText); 

                analysisContainer.appendChild(pointDiv);
            });

            proceedLink.addEventListener('click', (event) => {
                event.preventDefault(); 
                console.log("Proceed link clicked. Opening URL:", latestData.url);
                window.open(latestData.url, '_blank'); 
            });
        } else {
            document.getElementById('url-value').textContent = "No data found.";
            document.getElementById('probability-value').textContent = "N/A";
            document.getElementById('caution-text').textContent = "";
        }
    } catch (err) {
        console.error("Error fetching the latest phishing data:", err.message);
        document.getElementById('url-value').textContent = "An error occurred.";
        document.getElementById('probability-value').textContent = "N/A";
        document.getElementById('caution-text').textContent = "";
    }
});
