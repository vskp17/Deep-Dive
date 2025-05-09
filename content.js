let reviews = [];

function extractReviews() {
  const reviewElements = document.querySelectorAll('.a-section .review-text-content span');
  reviews = Array.from(reviewElements).map(review => review.innerText.trim()).filter(Boolean);
  
  console.log("Extracted reviews:", reviews); 
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "EXTRACT_REVIEWS") {
      sendResponse({ reviews: reviews });
    }
  });
}

extractReviews();
