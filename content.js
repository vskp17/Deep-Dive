let reviews = [];

function extractReviews() {
  // Extract the reviews from the Amazon page
  const reviewElements = document.querySelectorAll('.a-section .review-text-content span');
  reviews = Array.from(reviewElements).map(review => review.innerText.trim()).filter(Boolean);
  
  console.log("Extracted reviews:", reviews);  // Log the reviews
  
  // Send extracted reviews to the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "EXTRACT_REVIEWS") {
      sendResponse({ reviews: reviews });
    }
  });
}

extractReviews();
