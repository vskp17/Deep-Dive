document.addEventListener('DOMContentLoaded', function () {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const thumbsUp = document.getElementById('thumbs-up');
    const thumbsDown = document.getElementById('thumbs-down');

    analyzeBtn.addEventListener('click', () => {
        resultDiv.innerHTML = "";
        loadingDiv.style.display = 'block';
        progressBarContainer.style.display = 'block';
        progressBar.style.width = '0%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "EXTRACT_REVIEWS" }, response => {
                if (!response || !response.reviews || response.reviews.length === 0) {
                    loadingDiv.style.display = 'none';
                    progressBarContainer.style.display = 'none';
                    resultDiv.innerHTML = "No reviews found on this page.";
                    resultDiv.style.display = 'block';
                    return;
                }

                // 👇 Send reviews to Gemini via background script
                chrome.runtime.sendMessage(
                    { type: "ANALYZE_REVIEWS_GENAI", reviews: response.reviews },
                    aiResponse => {
                        loadingDiv.style.display = 'none';
                        progressBarContainer.style.display = 'none';

                        if (!aiResponse || !aiResponse.analysis) {
                            resultDiv.innerHTML = "❌ Error analyzing reviews with AI.";
                        } else {
                            resultDiv.innerText = aiResponse.analysis;
                        }

                        resultDiv.style.display = 'block';
                    }
                );
            });
        });
    });

    thumbsUp.addEventListener('click', () => {
        alert('Thank you for the thumbs up!');
    });

    thumbsDown.addEventListener('click', () => {
        alert('Sorry you didn’t like the results!');
    });
});
