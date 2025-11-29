const books = [
    { id: 1, title: "Django Design Patterns and Best Practice", author: "Robert C. Marting", price: 350, category: "fiction", imageUrl: "https://media.istockphoto.com/id/507911724/photo/vintage-green-book.jpg?s=612x612&w=0&k=20&c=YmDQKpgwH6scgRkusdARqvRHJqQOFMB6uGQAQkAVkM4=" },
    { id: 2, title: "Python Object-Oriented Programming", author: "Steven F.Lott", price: 470, category: "scifi", imageUrl: "" },
    { id: 3, title: "Python", author: "Alex Michaelides", price: 170, category: "mystery", imageUrl: "" },
    { id: 4, title: "The Pragmetic Programmer", author: "Tara Westover", price: 200, category: "biography", imageUrl: "" },
    { id: 5, title: "PHP language", author: "James Clear", price: 250, category: "selfhelp", imageUrl: "" },
    { id: 6, title: "C++ Programming language", author: "Morgan Housel", price: 420, category: "business", imageUrl: "" },
    { id: 7, title: "HTML ", author: "Delia Owens", price: 320, category: "fiction", imageUrl: "" },
    { id: 8, title: "The Art of Network ", author: "Frank Herbert", price: 900, category: "scifi", imageUrl: "" },
    { id: 9, title: "Data structure ", author: "Gillian Flynn", price: 70, category: "mystery", imageUrl: "" },
    { id: 10, title: "Algorithms", author: "Walter Isaacson", price: 320, category: "biography", imageUrl: "" },
    { id: 11, title: "Learn C ", author: "Napoleon Hill", price: 1290, category: "selfhelp", imageUrl: "" },
    { id: 12, title: "Design patterns", author: "Robert Kiyosaki", price:120, category: "business", imageUrl: "" },
    { id: 13, title: "Java Script ", author: "Sally Rooney", price: 520, category: "fiction", imageUrl: "" },
    { id: 14, title: "Bash", author: "Liu Cixin", price: 230, category: "scifi", imageUrl: "" },
    { id: 15, title: "Go For dummies", author: "Dan Brown", price: 740, category: "mystery", imageUrl: "" },
    { id: 16, title: "The IOT", author: "Michelle Obama", price: 400, category: "biography", imageUrl: "" },
    { id: 17, title: "making workshop", author: "Eckhart Tolle", price: 530, category: "selfhelp", imageUrl: "" },
    { id: 18, title: "Engineering", author: "../book Store/blank book.jfif" },
];

    let cart = [];
    let currentFilter = 'all';

function displayBooks(booksToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    booksToDisplay.forEach(book => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${book.imageUrl}" alt="Cover of ${book.title}" class="book-cover">
            </div>
            <div class="product-info">
                <div class="product-title">${book.title}</div>
                <div class="product-author">by ${book.author}</div>
                <div class="product-price">$${book.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

    function filterCategory(category) {
        currentFilter = category;
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        const filtered = category === 'all' ? books : books.filter(b => b.category === category);
        displayBooks(filtered);
    }

    function searchBooks() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtered = books.filter(b => 
            b.title.toLowerCase().includes(query) || 
            b.author.toLowerCase().includes(query)
        );
        displayBooks(filtered);
    }

    function addToCart(bookId) {
        const book = books.find(b => b.id === bookId);
        const existingItem = cart.find(item => item.id === bookId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        
        updateCart();
    }

    function removeFromCart(bookId) {
        cart = cart.filter(item => item.id !== bookId);
        updateCart();
    }

    function updateCart() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <strong>${item.title}</strong><br>
                    <small>Qty: ${item.quantity} × $${item.price.toFixed(2)}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #ff6b6b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function toggleCart() {
        const modal = document.getElementById('cartModal');
        modal.classList.toggle('active');
    }

    function closeCartOnOutside(event) {
        if (event.target.id === 'cartModal') {
            toggleCart();
        }
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase! Total:' ) 
        cart = [];
        updateCart();
        toggleCart();
    }

    function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    }

    function closeMenu() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
    }

    // Initialize
    displayBooks(books);
