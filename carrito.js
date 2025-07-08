const productos = [
    { id: 1, nombre: 'Arroz', cantidad: '1 Lb', precio: 1000 },
    { id: 2, nombre: 'Aceite', cantidad: '1 Lt', precio: 2000 },
    { id: 3, nombre: 'Azucar', cantidad: '1 Lb', precio: 3000 },
    { id: 4, nombre: 'Harina', cantidad: '1 Lb', precio: 4000 },
    { id: 5, nombre: 'Leche', cantidad: '1 Lt', precio: 5000 },
    { id: 6, nombre: 'carne', cantidad: '1 Kg', precio: 15000 },
];

// Carrito vacío al inicio
let carrito = [];

// Referencias al DOM
const productosDisponiblesDiv = document.getElementById('productos-disponibles');
const itemsCarritoUl = document.getElementById('items-carrito');
const totalCarritoSpan = document.getElementById('total-carrito');

// Mostrar productos disponibles
function mostrarProductos() {
    productosDisponiblesDiv.innerHTML = '';
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('col-md-4', 'mb-4');

        productoCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>                    
                    <p class="card-text">${producto.cantidad}</p>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary btn-agregar-carrito" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        productosDisponiblesDiv.appendChild(productoCard);
    });

    // Asignar eventos a los botones
    document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Agregar productos al carrito
function agregarAlCarrito(event) {
    const productoId = parseInt(event.target.dataset.id);
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
    }

    mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    itemsCarritoUl.innerHTML = '';

    if (carrito.length === 0) {
        itemsCarritoUl.innerHTML = '<li class="list-group-item">El carrito está vacío.</li>';
    } else {
        carrito.forEach(item => {
            const listaItem = document.createElement('li');
            listaItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            listaItem.innerHTML = `
                ${item.nombre} - Cantidad: ${item.cantidad}
                <span>$${item.precio * item.cantidad}</span>
            `;

            itemsCarritoUl.appendChild(listaItem);
        });
    }

    mostrarTotal();
}

// Calcular y mostrar total
function mostrarTotal() {
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalCarritoSpan.textContent = `$${total}`;
}

// Vaciar el carrito al hacer clic en el botón
document.getElementById('btn-vaciar-carrito').addEventListener('click', () => {
    carrito = []; // Vaciar el array
    mostrarCarrito(); // Actualizar la vista
});

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', mostrarProductos);

