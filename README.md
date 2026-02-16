#**Demo** : https://ravi-nxttrendz.netlify.app/
# 🛍️ Nxt-Trendz E-Commerce App

> A modern React e-commerce application with product browsing, filtering, cart management, and deployment-ready setup.

## ✨ Features

- 📱 **Responsive Design** - Works on all devices
- 🛒 **Shopping Cart** - Add/remove products, persistent storage
- 🔐 **Authentication** - Secure login/signup with JWT
- 🔍 **Product Filtering** - Filter by price, rating, category
- 📊 **Product Details** - View detailed product information
- 🎨 **Modern UI** - Clean and intuitive interface
- 🐳 **Docker Ready** - Production-optimized containers
- ☁️ **Cloud Deployment** - Deploy to 8+ platforms

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ (Tested with Node 18)
- npm/pnpm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm start
# App runs at: http://localhost:3000
```

## 🐳 Docker Setup

### Build Docker Image

```bash
# Production build
docker build -t nxt-trendz-app .

# Development build with hot reload
docker build -f Dockerfile.dev -t nxt-trendz-dev .
```

### Run with Docker

```bash
# Using Docker Compose (Recommended)
docker-compose up -d
# App runs at: http://localhost:3000

# Using Docker directly
docker run -p 3000:3000 nxt-trendz-app
```



## 📦 Project Structure

```
src/
├── components/
│   ├── Header/           # Navigation header
│   ├── Home/             # Homepage
│   ├── Products/         # Products listing
│   ├── ProductItemDetails/ # Product detail page
│   ├── Cart/             # Shopping cart
│   ├── LoginForm/        # Login/signup
│   ├── FiltersGroup/     # Product filters
│   ├── ProductCard/      # Product card component
│   ├── ProtectedRoute/   # Authentication guard
│   └── NotFound/         # 404 page
├── App.js               # Root component
└── index.js             # Entry point
```

## 🔐 Authentication

### How It Works

1. **Local Storage** - User signup/signin data stored locally
2. **API Authentication** - Auto-login with fixed credentials:
   - Username: `rahul`
   - Password: `rahul@2021`
3. **JWT Token** - API calls include JWT token in cookies

### Login Flow

```
User tries to login
    ↓
Check localStorage for existing user
    ↓
If not found, attempt API login with fixed credentials
    ↓
Store JWT token in cookies
    ↓
Redirect to home page
    ↓
Protected routes check auth before rendering
```

## 🛒 Cart Management

- Products stored in localStorage
- Persistent across browser sessions
- Add/remove products
- Update quantities
- Clear cart option

## 📱 API Integration

### Default API Endpoint
```
https://apis.ccbp.in
```

### Key Endpoints

```
GET  /products                    # Get all products
GET  /products/:id               # Get product details
POST /login                      # Login endpoint
GET  /products/search?search=    # Search products
```


## 📋 Technology Stack

- **Frontend**: React 17.0.2
- **Routing**: react-router-dom v5
- **State Management**: React Hooks (useState, useCallback, useEffect)
- **Build Tool**: webpack 4.44.2 via react-scripts
- **Containerization**: Docker 18-alpine
- **API**: REST API (https://apis.ccbp.in)
- **Storage**: localStorage for persistence
- **Authentication**: JWT + localStorage

## 🐛 Troubleshooting

### Issue: "npm ERR! Code EOPENSSL_X509_V3_EXTENSIONS_BAD"

**Solution**: Use OpenSSL legacy provider
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

### Issue: Docker build fails with OpenSSL error

**Solution**: Already included in Dockerfile. Just rebuild:
```bash
docker-compose up --build
```

### Issue: Login not working

**Solution**: 
- Default credentials: `rahul` / `rahul@2021`
- Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly
- Clear localStorage and try again

### Issue: API calls fail after deployment

**Solution**:
- Verify environment variables are set on platform
- Check `REACT_APP_API_URL` matches API endpoint
- Verify CORS settings if using custom API

## 🛠️ Available Scripts

```bash
npm start          # Run dev server (http://localhost:3000)
npm build          # Build for production
npm test           # Run tests
npm eject          # Eject from create-react-app (irreversible!)
```

## 🎯 Component Overview

### Header
- Navigation menu
- Logout functionality
- Responsive hamburger menu

### Home
- Featured products
- Prime deals section
- Quick navigation

### Products
- Product listing with grid layout
- Filtering and sorting
- Search functionality
- Pagination

### ProductItemDetails
- Product images and details
- Quantity selection
- Add to cart functionality
- Similar products section

### Cart
- View all cart items
- Modify quantities
- Remove items
- Cart total

### Authentication
- Protected routes
- Login/Signup form
- Session persistence

## 📚 Learn More

### React Concepts Used
- Functional components & Hooks
- React Router v5
- State management with useState
- Side effects with useEffect
- Callback optimization with useCallback
- localStorage API

### API Documentation
- Endpoint: `https://apis.ccbp.in`
- Authentication: JWT via cookies
- Response format: JSON

## 🤝 Contributing

Feel free to use this project as a learning resource or template.

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Coding! 🎉**

For deployment questions, refer to the sections above or check the deployment guide included with this project.

### Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>

The app must have the following functionalities

- When an unauthenticated user, tries to access the Product Item Details Route, then the page should be navigated to Login Route
- When an authenticated user clicks on a product in the Products Route, then the page should be navigated to Product Item Details route
- When an authenticated user opens the Product Item Details Route,
  - An HTTP GET request should be made to **productDetailsApiUrl** with `jwt_token` in the Cookies and product `id` as path parameter
  - **_loader_** should be displayed while fetching the data
  - After the data is fetched successfully, display the product details and similar products received in the response
  - Initially, the quantity of the product should be `1`
  - The quantity of the product should be incremented by one when the plus icon is clicked
  - The quantity of the product should be decremented by one when the minus icon is clicked
  - If the HTTP GET request made is unsuccessful, then the [Failure view](https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-product-details-error-lg-output.png) should be displayed
    - When the **Continue Shopping** button in the [Failure view](https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-product-details-error-lg-output.png) is clicked, then the page should be navigated to Products Route

</details>

<details>

<summary>API Requests & Responses</summary>
<br/>

**productDetailsApiUrl**

#### API: `https://apis.ccbp.in/products/:id`

#### Example: `http://localhost:3000/products/16`

#### Method: `GET`

#### Description:

Returns a response containing the Product details

#### Sample Success Response

```json
{
  "id":16,
  "image_url":"https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-long-fork.png",
  "title":"Embroidered Net Gown","price":62990,"description":"An Embroidered Net Gown is the clothing worn by a bride during a wedding ceremony. It enhances your beauty wearing this vibrant, gorgeous, and beautiful Wedding Gown. Find your dream wedding dress today. It features foldable, one hoop steel, two layers of tulles, and is elastic in the waist part. ",
  "brand":"Manyavar",
  "total_reviews":879,
  "rating":3,
  "availability":"In Stock",
  "similar_products":[
    {
      "id":1,
      "image_url":"https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-cap.png",
      "title":"Wide Bowknot Hat",
      "style":"Wide Bowknot Hat for Women and Girls (Multicolor)",
      "price":288,
      "description":"This Summer's perfect White Wide Brim Straw Beach hat is perfect for a hot day. It has the Floppy Style which gives you good coverage from the sun's hot rays and is sure to make the right style statement. It is made of high-quality & skin-friendly paper straw material and lightweight. ",
      "brand":"MAJIK",
      "total_reviews":245,
      "rating":3.6,
      "availability":"In Stock"
    },
      ...
  ]
}
```

#### Sample Failure Response

```json
{
  "status_code": 404,
  "error_msg": "Product Not Found"
}
```

</details>

<details>
<summary>Components Structure</summary>
<br/>
<div style="text-align: center;">
    <img src="https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-specific-product-details-component-breakdown-structure.png" alt="component breakdown structure" style="max-width:100%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

</details>

<details>
<summary>Implementation Files</summary>
<br/>

Use these files to complete the implementation:

- `src/components/ProductCard/index.js`
- `src/components/ProductCard/index.css`
- `src/components/ProductItemDetails/index.js`
- `src/components/ProductItemDetails/index.css`
- `src/components/SimilarProductItem/index.js`
- `src/components/SimilarProductItem/index.css`

</details>
<br/>

**The following instructions are required for the tests to pass**

- `Home` Route should consist of `/` in the URL path
- `Login` Route should consist of `/login` in the URL path
- `Products` Route should consist of `/products` in the URL path
- `Product Item Details` Route should consist of `/products/:id` in the URL path
- `Cart` Route should consist of `/cart` in the URL path
- No need to use the `BrowserRouter` in `App.js` as we have already included in `index.js`

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
