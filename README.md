# fashion1
Setup Instructions
Prerequisites:

Install Node.js (v14 or above).
Install a code editor (e.g., VSCode) for development.
Steps:

Clone the repository:

npm install
Configure environment variables:
Create a .env file in the root directory.
npm start
Open index.html in any modern browser.
Ensure the API endpoint is correctly defined in index.js and hosted locally or via a mock server.

Endpoint: /api/items/filter

Brief Explanation of Design 
Frontend:

Modular components for filtering, displaying items, and pagination for clarity.
Local storage is used for retaining filter preferences during navigation.
Backend:

Simulated data for filtering and pagination, bypassing database usage.
API adheres to RESTful design principles for easier integration.
Assumptions Made
The data is served directly via an API or mock responses.
Pagination and filters are handled dynamically on the frontend.
Ratings are included in the response as a numeric value.
Potential Improvements
Frontend:

Add "Sort By" options (e.g., price, rating).
Implement loading animations during API requests.
Backend:

Use a database or API mock tool for real-time filtering and scalability.
Testing:

Add automated tests for API endpoints and frontend functionality.

