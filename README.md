# ASH LAP MART 💻🛒

Welcome to **ASH LAP MART** - Sri Lanka's premier destination for high-quality new and pre-owned laptops. 

This is a fully-functional, responsive, front-end e-commerce website built without any back-end or Node.js dependencies, designed to deliver a premium user experience with modern UI/UX principles.

---

## 🚀 Features

- **PWA-Like Fast Navigation:** Smooth, multi-page layout including Home, Products, Details, About, Contact, and Cart.
- **Dynamic Product Rendering:** Products are injected via JavaScript to create a modular experience.
- **Advanced Filtering & Sorting:** Users can filter laptops by condition (Brand New / Used) and Category (Gaming, Business, Student). 
- **Functional Shopping Cart:** Uses `localStorage` to persist cart items across page reloads. Includes quantity updates and dynamic total cost calculation.
- **Toast Notifications:** Beautiful, non-intrusive popups to inform the user when actions are taken (e.g., adding to cart).
- **Responsive Design:** 100% mobile, tablet, and desktop friendly layouts.
- **Modern Aesthetics:** Features glassmorphism, animated hover effects, gradient text, and real-world high-quality Unsplash image placeholders.

---

## 🛠️ Technologies Used

- **HTML5:** Semantic architecture.
- **CSS3:** Custom animations, custom scrollbars, and tweaks.
- **JavaScript (Vanilla JS):** Core logic for interacting with DOM, routing dynamically, managing state, and `localStorage`.
- **Tailwind CSS (via CDN):** For rapid and beautiful utility-first styling without requiring Node.js.
- **FontAwesome:** For all the vector icons.

---

## 📂 Directory Structure

```text
e-commerce website/
│
├── index.html           # Landing / Home Page
├── products.html        # Shop Page with category and condition filters
├── product-detail.html  # Single Laptop Detail Page with specs
├── about.html           # About Us Page detailing the company's story
├── contact.html         # Contact Page with form and Google Maps embed
├── cart.html            # Shopping Cart Page
├── README.md            # Project Documentation
│
├── css/
│   └── style.css        # Custom CSS for Tailwind extensions
│
└── js/
    └── script.js        # Main JavaScript logic, dummy data, and logic controllers
```

---

## 🏃 Build & Run

Since this application utilizes Tailwind CSS via a CDN and relies completely on client-side web technologies, there are **no installation steps** required.

1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser (Google Chrome, Firefox, Safari, Edge).
3. Enjoy the shopping experience!

---

## 🧑‍💻 Contributing

If you wish to contribute to the UI logic, product data, or style tweaks:
1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📝 License

Distributed under the MIT License.

---

> **Note:** This is a front-end UI prototype build utilizing mock JavaScript application state to demonstrate an e-commerce flow. Payment gateways and heavy backend integration are not included. 
