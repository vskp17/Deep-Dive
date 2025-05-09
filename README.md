
# Deep Dive - Amazon Review Analyzer

This Chrome extension analyzes customer reviews on Amazon product pages using Google's Gemini API.

## Features

- Extracts product reviews directly from Amazon
- Sends them to Gemini AI (Google) for summarization
- Displays pros, cons, and overall sentiment in a user-friendly popup
- Interactive UI with loading spinner and feedback icons

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/deep-dive-extension.git
   cd deep-dive-extension
   ```

2. Add your Gemini API key:
   - Copy the provided `config.sample.js` file to `config.js`
   - Open `config.js` and paste your API key like this:

     ```js
     const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
     ```

3. Load the extension in Chrome:
   - Go to `chrome://extensions`
   - Enable "Developer mode"
   - Click **Load unpacked** and select the project folder

## File Structure

```
deep-dive-extension/
├── background.js
├── content.js
├── popup.js
├── popup.html
├── popup.css
├── config.sample.js  <-- Replace with your actual config.js
├── manifest.json
└── icon.png
```