let losProductos = [
    { id: 1, nombre: "Iphone 11", categoria: "Model-Old", stock: 2, precio: 700, rutaImagen: "iphone11b.png" },
    { id: 2, nombre: "Iphone 12", categoria: "Model-Old", stock: 4, precio: 750, rutaImagen: "iphone12.png" },
    { id: 3, nombre: "Iphone 13", categoria: "Model-Old", stock: 2, precio: 800, rutaImagen: "Iphone13.png" },
    { id: 4, nombre: "Iphone 14", categoria: "Model-Normal", stock: 1, precio: 950, rutaImagen: "Iphone14.png" },
    { id: 5, nombre: "Iphone 14 Pro", categoria: "Model-Normal", stock: 5, precio: 1100, rutaImagen: "Iphone14Pro.png" },
    { id: 6, nombre: "Iphone 15", categoria: "Model-New", stock: 8, precio: 1500, rutaImagen: "Iphone15.png" },
    { id: 7, nombre: "Iphone 15 Pro", categoria: "Model-New", stock: 8, precio: 1800, rutaImagen: "Iphone15prob.png" }]

principal(losProductos)

function principal(productos) {
    let carrito= []
    tarjetaspr(productos, carrito)

}
function tarjetaspr(productos, carrito) {
    let contenedorProductos = document.getElementById("productos")
    contenedorProductos.innerHTML = ""
    productos.forEach(({ nombre, precio, stock, rutaImagen, id }) => {
        let tarjetaProducto = document.createElement("div")
        let clase = "producto"

        tarjetaProducto.className = clase
        tarjetaProducto.innerHTML = `
                <h3>${nombre}</h3>
                <img src=../assets/${rutaImagen}>
                <p>$${precio}</p>
                <p>Quedan ${stock} u.</p>
                <button id=${id}>Añadir al carrito</button>
            `
        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById(id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, productos, carrito))
    })
}
let botonVerCatalago = document.getElementById("contacton2")
let main5 = document.getElementById("main5")
let contenedorinicio = document.getElementById("inicio")
let botonVolverinit = document.getElementById("init")
let botoncarrito = document.getElementById("Carrito")


botonVolverinit.addEventListener("click", mostrarEsconder2)
botonVerCatalago.addEventListener("click", mostrarEsconder)

function mostrarEsconder() {
    let contenedorinicio = document.getElementById("inicio")
    let contenedorProductos = document.getElementById("productos")
    let botonInit = document.getElementById("init")
    let botonCarrito = document.getElementById("Carrito")
    let bbuscador = document.getElementById("buscador")
    let bbuscar = document.getElementById("buscar")
    let lupita = document.getElementById("lupita")
    lupita.className = "mostrar2"
    contenedorinicio.className = "esconder"
    contenedorProductos.className = "mostrar"
    botonInit.className = "mostrar2"
    botonCarrito.className = "mostrar2"
    bbuscador.className = "mostrar2"
    bbuscar.className = "mostrar2"
}

function mostrarEsconder2() {
    let contenedorinicio = document.getElementById("inicio")
    let contenedorProductos = document.getElementById("productos")
    let botonInit = document.getElementById("init")
    let botonCarrito = document.getElementById("Carrito")
    let bbuscador = document.getElementById("buscador")
    let bbuscar = document.getElementById("buscar")
    contenedorinicio.className = "mostrar2"
    contenedorProductos.className = "esconder"
        lupita.className = "esconder"
    botonInit.className = "esconder"
    botonCarrito.className = "esconder"
    bbuscador.className = "esconder"
    bbuscar.className = "esconder"

}






function agregarAlCarrito(e, productos, carrito){
    let idProducto= e.target.id
    let productoBuscados = productos.find(producto => producto.id === idProducto)
    carrito.push({
        id: productoBuscados.id,
        nombre: productoBuscados.nombre,
        precioUnitario: productoBuscados.precio,
        unidades: 1,
        subtotal: productoBuscados.precio
    })

}

    let input = document.getElementById("buscador")
    let botonbuscar = document.getElementById("buscar")

    botonbuscar.addEventListener("click",() => filtrarPorNombre(losProductos, input.value))

    function filtrarPorNombre(productos, valor) {
        let valorStr = valor.toString();

        let productosFiltrados = productos.filter(producto => producto.nombre.includes(valorStr) || producto.precio.toString().includes(valorStr))
        tarjetaspr(productosFiltrados)
    }