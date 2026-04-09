// Sidebar Cart Elements
const cartSidebar = document.getElementById('cart-sidebar');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartBadge = document.getElementById('cart-badge');
const cartItemsList = document.getElementById('cart-items-list');
const totalPriceEl = document.getElementById('cart-total-price');

let cartData = [];
let totalAmount = 0;

// Toggle Cart
openCartBtn.addEventListener('click', () => cartSidebar.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('active'));

// Add to Cart Logic
const addButtons = document.querySelectorAll('.btn-add-cart');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.item-card');
        const name = card.querySelector('h4').innerText;
        const price = parseInt(card.querySelector('.item-price').getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cartData.push({ name, price });
    updateCartUI();
    
    // Feedback visual
    cartSidebar.classList.add('active');
}

function updateCartUI() {
    // Update Badge
    cartBadge.innerText = cartData.length;

    // Clear and Redraw Cart Items
    cartItemsList.innerHTML = '';
    totalAmount = 0;

    if (cartData.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-msg">Keranjang masih kosong.</p>';
    } else {
        cartData.forEach((item, index) => {
            totalAmount += item.price;
            const itemEl = document.createElement('div');
            itemEl.style.display = 'flex';
            itemEl.style.justifyContent = 'space-between';
            itemEl.style.marginBottom = '10px';
            itemEl.style.borderBottom = '1px solid #eee';
            itemEl.style.paddingBottom = '5px';
            
            itemEl.innerHTML = `
                <div>
                    <p style="font-size: 0.9rem; font-weight: 600;">${item.name}</p>
                    <small>Rp ${item.price.toLocaleString()}</small>
                </div>
                <i class="fas fa-trash" style="color: #ef4444; cursor: pointer;" onclick="removeFromCart(${index})"></i>
            `;
            cartItemsList.appendChild(itemEl);
        });
    }

    totalPriceEl.innerText = `Rp ${totalAmount.toLocaleString()}`;
}

function removeFromCart(index) {
    cartData.splice(index, 1);
    updateCartUI();
}