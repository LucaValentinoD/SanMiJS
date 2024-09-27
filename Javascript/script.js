fetch("../info.json")
    .then(response => response.json())
    .then(productos => principal(productos))
    .catch(error => console.log(error));

function principal(productos) {
    tarjetaspr(productos);
    let carrito = obtenerCarrito();
    renderizarCarrito(carrito, productos); // Pasar productos para poder usar en renderizarCarrito
}

function obtenerCarrito() {
    let carrito = [];
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    return carrito;
}

function setearCarrito(carrito) {
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}

function tarjetaspr(productos) {
    let contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div");
        let clase = "producto";

        tarjetaProducto.className = clase;

        tarjetaProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="../assets/${producto.imagen}" alt="${producto.nombre}">
            <p>$${producto.precio}</p>
            <p>Quedan ${producto.stock} u.</p>
            <button id="${producto.id}">Añadir al carrito</button>
        `;

        contenedorProductos.appendChild(tarjetaProducto);

        let botonAgregarAlCarrito = document.getElementById(producto.id);
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, productos));
    });
}

let botonVerCatalago = document.getElementById("contacton2");
let botonVolverinit = document.getElementById("init");
let botoncarrito = document.getElementById("Carrito");
let bproductos = document.getElementById("contacton3");
let finalizarCompra = document.getElementById("finalizarCompra");

botonVolverinit.addEventListener("click", mostrarEsconder2);
botonVerCatalago.addEventListener("click", mostrarEsconder);
botoncarrito.addEventListener("click", mostrarEsconder3);
bproductos.addEventListener("click", mostrarEsconder);
finalizarCompra.addEventListener("click", finalizar);

function finalizar() {
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarAlert('Tu carrito está vacío.', '', 'error', '1000');
    } else {
        let total = carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0);
        mostrarAlert('Gracias por la Compra!!!', 'El total sería: ' + total + ' usd. Cualquier cosa contáctese con nosotros.', 'success', '', '6900');
        localStorage.removeItem("carrito");
        renderizarCarrito([], []); // Limpiar el carrito
    }
}

function mostrarEsconder() {
    let contenedorinicio = document.getElementById("inicio");
    let contenedorProductos = document.getElementById("productos");
    let botonInit = document.getElementById("init");
    let botonCarrito = document.getElementById("Carrito");
    let bbuscador = document.getElementById("buscador");
    let bbuscar = document.getElementById("buscar");
    let lupita = document.getElementById("lupita");
    let x = document.getElementById("x");
    let finalizarCompra = document.getElementById("finalizarCompra");

    lupita.className = "mostrar2";
    contenedorinicio.className = "esconder";
    contenedorProductos.className = "mostrar";
    botonInit.className = "mostrar2";
    botonCarrito.className = "mostrar2";
    bbuscador.className = "mostrar2";
    bbuscar.className = "mostrar2";
    x.className = "esconder";
    finalizarCompra.className = "esconder";
}

function mostrarEsconder2() {
    let contenedorinicio = document.getElementById("inicio");
    let contenedorProductos = document.getElementById("productos");
    let botonInit = document.getElementById("init");
    let botonCarrito = document.getElementById("Carrito");
    let bbuscador = document.getElementById("buscador");
    let bbuscar = document.getElementById("buscar");
    let lupita = document.getElementById("lupita");
    let x = document.getElementById("x");
    let finalizarCompra = document.getElementById("finalizarCompra");

    contenedorinicio.className = "mostrar2";
    contenedorProductos.className = "esconder";
    lupita.className = "esconder";
    botonInit.className = "esconder";
    botonCarrito.className = "esconder";
    bbuscador.className = "esconder";
    bbuscar.className = "esconder";
    x.className = "esconder";
    finalizarCompra.className = "esconder";
}

function mostrarEsconder3() {
    let contenedorinicio = document.getElementById("inicio");
    let contenedorProductos = document.getElementById("productos");
    let botonInit = document.getElementById("init");
    let botonCarrito = document.getElementById("Carrito");
    let bbuscador = document.getElementById("buscador");
    let bbuscar = document.getElementById("buscar");
    let x = document.getElementById("x");
    let finalizarCompra = document.getElementById("finalizarCompra");

    contenedorinicio.className = "esconder";
    contenedorProductos.className = "esconder";
    botonInit.className = "mostrar2";
    botonCarrito.className = "esconder";
    bbuscador.className = "esconder";
    bbuscar.className = "esconder";
    x.className = "mostrar2";
    finalizarCompra.className = "mostrar2";
}

function mostrarAlert(title, text, icon, timer) {
    Swal.fire({
        title,
        text,
        icon,
        timer,
        showConfirmButton: false
    });
}

function mostrarAlert2(icon, title) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: title
    });
}

function tostadora(text) {
    Toastify({
        text,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "info",
        style: {
            background: "linear-gradient(to right, #4F1787, #180161)",
        },
    }).showToast();
}

function agregarAlCarrito(e, productos) {
    let carrito = obtenerCarrito();
    let idProducto = Number(e.target.id);
    let productoBuscado = productos.find(producto => producto.id === idProducto);
    
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        if (productoBuscado.stock > productoEnCarrito.unidades) {
            productoEnCarrito.unidades += 1;
            productoEnCarrito.subtotal = productoEnCarrito.precioUnitario * productoEnCarrito.unidades;
            tostadora('Agregaste al Carrito');
        } else {
            tostadora('Ya no hay unidades disponibles.');
        }
    } else {
        carrito.push({
            imagen: productoBuscado.imagen,
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio,
        });
        tostadora('Agregaste al Carrito');
    }
    setearCarrito(carrito);
    renderizarCarrito(carrito, productos); // Actualizar el carrito mostrado
}

function renderizarCarrito(carrito, productos) {
    let contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";
    carrito.forEach(productoBuscado => {
        let productcarr = document.createElement("div");
        productcarr.className = "productcarr";
        productcarr.innerHTML = `
            <p>Producto elegido: <h5>${productoBuscado.nombre}</h5></p>
            <p>Precio Unitario: $${productoBuscado.precioUnitario}</p>
            <p>Unidades seleccionadas: ${productoBuscado.unidades}</p>
            <p>Subtotal: $${productoBuscado.subtotal}</p>
            <div>
                <button class="agregarcarr">Agregar 1u.</button>
                <button class="eliminarcarr">Borrar 1u.</button>
            </div>
        `;
        contenedorCarrito.appendChild(productcarr);
        productcarr.querySelector(".agregarcarr").addEventListener("click", () => modificarCantidad(productoBuscado.id, true, productos));
        productcarr.querySelector(".eliminarcarr").addEventListener("click", () => modificarCantidad(productoBuscado.id, false, productos));            
    });

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<h5>No hay productos en el carrito.</h5>`;
    }
}

function modificarCantidad(idProducto, agregar, productos) {
    let carrito = obtenerCarrito();
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto);
    let productoBuscado = productos.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        if (agregar) {
            if (productoBuscado.stock > productoEnCarrito.unidades) {
                productoEnCarrito.unidades += 1;
                mostrarAlert2('success', 'Ahora tienes ' + productoEnCarrito.unidades + ' unidades.');
            } else {
                mostrarAlert2('error', 'No hay suficiente stock.');
            }
        } else {
            productoEnCarrito.unidades -= 1;
            if (productoEnCarrito.unidades <= 0) {
                carrito = carrito.filter(producto => producto.id !== idProducto);
                mostrarAlert('Eliminaste del carrito.', '', 'success', '1000');
            } else {
                mostrarAlert2('success', 'Eliminaste una unidad.');
            }
        }
        productoEnCarrito.subtotal = productoEnCarrito.precioUnitario * productoEnCarrito.unidades;
        setearCarrito(carrito);
        renderizarCarrito(carrito, productos); // Actualizar el carrito después de modificar
    }
}
