const productos = [
    { id: 1, nombre: 'Arroz', cantidad: '1 Lb', precio: 1000 },
    { id: 2, nombre: 'Aceite', cantidad: '1 Lt', precio: 2000 },
    { id: 3, nombre: 'Azúcar', cantidad: '1 Lb', precio: 3000 },
    { id: 4, nombre: 'Harina', cantidad: '1 Lb', precio: 4000 },
    { id: 5, nombre: 'Leche', cantidad: '1 Lt', precio: 5000 },
    { id: 6, nombre: 'Carne', cantidad: '1 Kg', precio: 15000 },
];

let carrito = [];

const productosDisponiblesDiv = document.getElementById('productos-disponibles');
const itemsCarritoUl = document.getElementById('items-carrito');
const totalCarritoSpan = document.getElementById('total-carrito');
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

// Formatear como moneda colombiana
const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    }).format(valor);
};

// Mostrar productos disponibles
function mostrarProductos() {
    productosDisponiblesDiv.innerHTML = '';
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('col-md-4', 'mb-4');

        productoCard.innerHTML = `
            <div class="card h-100" style="border-radius:15px">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>                    
                    <p class="card-text">${producto.cantidad}</p>
                    <p class="card-text">${formatearPrecio(producto.precio)}</p>
                    <button class="btn btn-primary btn-agregar-carrito" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        productosDisponiblesDiv.appendChild(productoCard);
    });

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
    itemsCarritoUl.innerHTML = "";

    if (carrito.length === 0) {
        itemsCarritoUl.innerHTML = '<li class="list-group-item">El carrito está vacío.</li>';
    } else {
        carrito.forEach(item => {
            const listaItem = document.createElement("li");
            listaItem.classList.add("list-group-item");

            const subtotal = item.precio * item.cantidad;

            listaItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <div>
                        ${item.nombre} - ${formatearPrecio(item.precio)} - Cantidad: ${item.cantidad}
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="me-2">${formatearPrecio(subtotal)}</span>
                        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;

            itemsCarritoUl.appendChild(listaItem);
        });
    }

    mostrarTotal();
}

// Eliminar un producto del carrito por su ID
function eliminarDelCarrito(productoId) {
    const item = carrito.find(item => item.id === productoId);

    if (item) {
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== productoId);
        }
    }

    mostrarCarrito();
}

// Calcular y mostrar total
function mostrarTotal() {
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalCarritoSpan.textContent = formatearPrecio(total);
}

// Vaciar el carrito
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
});

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', mostrarProductos);
