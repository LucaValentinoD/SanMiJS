let productos = [
    { id: 1, nombre: "Iphone 11", categoria: "Model-Old", stock: 2, precio: 700, rutaImagen: "iphone11b.png" },
    { id: 2, nombre: "Iphone 12", categoria: "Model-Old", stock: 4, precio: 750, rutaImagen: "iphone12.png" },
    { id: 3, nombre: "Iphone 13", categoria: "Model-Old", stock: 2, precio: 800, rutaImagen: "ip13usado.png" },
    { id: 4, nombre: "Iphone 14", categoria: "Model-Normal", stock: 1, precio: 950, rutaImagen: "Iphone14.png" },
    { id: 5, nombre: "Iphone 14 Pro", categoria: "Model-Normal", stock: 5, precio: 1100, rutaImagen: "Iphone14Pro.png" },
    { id: 6, nombre: "Iphone 15", categoria: "Model-New", stock: 8, precio: 1500, rutaImagen: "Iphone15.png" },
    { id: 7, nombre: "Iphone 15 Pro", categoria: "Model-New", stock: 8, precio: 1800, rutaImagen: "Iphone15pro.png" }]

    let botonVerCatalago = document.getElementById("contacton2")
    let main5 = document.getElementById("main5")
    let contenedorinicio = document.getElementById("inicio")

    botonVerCatalago.addEventListener("click", mostrarEsconder)
    function mostrarEsconder(){
        let contenedorinicio = document.getElementById("inicio")
        let contenedorProductos = document.getElementById("productos")
        contenedorinicio.className = "esconder"
        contenedorProductos.className = "mostrar"
    }

    crearTarjetasProductos(productos)
    function crearTarjetasProductos(productos) {
        let contenedorProductos = document.getElementById("productos")
        contenedorProductos.innerHTML = ""
        productos.forEach(({ nombre, precio, stock, rutaImagen, id }) => {
            let tarjetaProducto = document.createElement("div")
            let clase = "producto"
    
            tarjetaProducto.className = clase
            tarjetaProducto.innerHTML = `
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <p>Quedan ${stock} u.</p>
                <img src=../assets/${rutaImagen}>
                <button id=${id}>Añadir al carrito</button>
            `
            contenedorProductos.appendChild(tarjetaProducto)
    
            let botonAgregarAlCarrito = document.getElementById(id)
            botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, productos))
        })
    }
