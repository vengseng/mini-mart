GREEN BASKET MINI MART — CUSTOMER STORE DEMO

RUN THE WEBSITE
1. Extract this ZIP into a folder.
2. Open the folder in VS Code.
3. Open index.html in your browser, or use VS Code Live Server.

CUSTOMER FEATURES
- Responsive layout for phones, tablets, and desktop.
- Left-side navigation drawer opened by the ☰ button.
- Light/dark theme switch; the selected theme is saved in this browser.
- Product search, category filters, product photos, and favorites.
- Product prices are visible to customers.
- Shopping cart shows each item price, quantity, line total, and estimated order total.
- Customer receipt includes item photos, item prices, quantities, and the order total; receipts can be printed.
- About Us page with a sample owner story and store description.
- Demo rewards: a sample 120-point balance, plus example rewards. Customers earn 1 point per whole $1 spent in demo orders.

STAFF FEATURES
- Use “Store staff sign in” at the bottom of the page.
- Demo PIN: 1234.
- Staff mode unlocks Clients, Orders, History, and Manage, including product editing and sales totals.

PRODUCT PHOTOS
- Sample product photos use online image URLs. If a photo cannot load, an emoji fallback appears.
- In Manage, the image field accepts a URL or a local path such as images/chips.jpg. For local photos, create an images folder next to index.html.

IMPORTANT LIMITATIONS
This is a front-end learning demo. The staff PIN is not secure authentication. Products, orders, favorites, and reward points are saved in localStorage in this browser and are not synchronized across devices or securely separated by customer. Reward offers are examples only and cannot yet be redeemed. Checkout does not take real payments. A production store needs a secure backend, database, customer accounts, and server-side staff permissions.

CUSTOMIZE THE ABOUT STORY
The About page contains sample marketing copy for the fictional Green Basket brand. Replace the story, owner note, and promises with accurate details about the real shop before publishing it.

CUSTOMER REWARDS DEMO
- On Home, enter a customer name and click Load points.
- New demo reward accounts start with 120 sample points.
- Claim one reward: $1 off (50 points), free drink (100 points; a drink must be in the basket, discount up to $1.50), or $5 off (200 points).
- The points are deducted when a reward is claimed. The customer can cancel the claim to get the points back.
- Use the same customer name at checkout. The cart total and receipt show the discount; earned points are added after checkout.
- Rewards are saved in this browser's localStorage and are only a front-end demo, not secure accounts or real payment processing.
