importScripts('config.js'); // GEMINI_API_KEY should be defined there

async function callGeminiAPI(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (response.ok && data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error(data.error?.message || "Failed to generate content.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ANALYZE_REVIEWS_GENAI") {
    const reviews = message.reviews || [];
    const combinedReviews = reviews.join("\n\n");

    const prompt = `
You are an expert product review analyzer. Summarize the reviews provided below.

Instructions:
- Identify the overall sentiment (Positive, Negative, or Mixed).
- List 3-5 Pros based on common praise.
- List 3-5 Cons based on common complaints.
- Return the result as:

Analysis Results:
Pros:
- ...
- ...
Cons:
- ...
- ...
Overall Sentiment: ...

Reviews:
${combinedReviews}
    `;

    callGeminiAPI(prompt)
      .then(analysis => {
        sendResponse({ analysis });
      })
      .catch(error => {
        sendResponse({ analysis: "❌ Error analyzing reviews with Gemini." });
      });

    return true; // Required to indicate asynchronous response
  }
});
