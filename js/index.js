import { getProductos, obtenerProducto } from "./firebase.js";

const tarjeta = []

let totalCompra =0;


// Finalizar compra
const finalizar  = document.querySelector('.finalizar');


const finalizarCompra = () => {

        totalCompra = 0;

        document.querySelector('.totalvisual').textContent = totalCompra;

        tarjeta.length = 0;

        document.querySelector('.innerCart').innerHTML = ' Compra finalizada con exito👌😊';


}


finalizar.addEventListener('click', finalizarCompra);

// Vaciar carrito

const vaciar = document.querySelector('.vaciar');

const vaciarCarrito = () => {

    totalCompra = 0;

    document.querySelector('.totalvisual').textContent = totalCompra;

    tarjeta.length = 0;

    document.querySelector('.innerCart').innerHTML = 'Carrito sin productos 😒';


}

vaciar.addEventListener('click', vaciarCarrito);

// Renderizar Tarjeta
const renderTarjeta = () => {

    const innerCart = document.querySelector('.innerCart');

    innerCart.innerHTML = '';

    tarjeta.forEach(productos =>{

     const tarjeta = document.createElement('div');

        tarjeta.className = 'card mb-3';

        tarjeta.innerHTML = `
            <div class="row g-0 principal">

                <div class="col-md-4">
                    <img src=${productos.data().imagen} class="img-fluid rounded-start" alt=${productos.data().nombre}>
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productos.data().nombre}</h5>
                        <p class="card-text">$ ${productos.data().precio}</p>
                    </div>
                </div>

            </div>
        `;

        innerCart.append(tarjeta);
    });
}


// Para chequear el carrito
// el some devuele true o false 
const chequearCarrito = (id) => tarjeta.some(productos => productos.id === id);

// Actualizar el carrito
const actualizarTotal = (precio) => {

    const totalvisual = document.querySelector('.totalvisual');

         totalCompra += precio;

         totalvisual.textContent = totalCompra;


}


// Para gregar productos al carrito
const agregarAlCarrito = async (e) => {

        const productoId = e.target.id;

        if(chequearCarrito(productoId)) {

            return false;

        }else{

                const proudctoAlCarrito = await obtenerProducto(productoId);

                    actualizarTotal(proudctoAlCarrito.data().precio);

                    tarjeta.push(proudctoAlCarrito);
            
                    // console.log(tarjeta);
            
                    renderTarjeta();

            }

     

}


// Para gregar eventos
const agregarEvento = () => {

            // selecciono todos los botones (comprar)
        const btnsComprar = document.querySelectorAll('.btnComprar');

            //por cada boton, a cada boton agregale el evento click
        btnsComprar.forEach(btn => btn.addEventListener('click', agregarAlCarrito));

}

// Para renderizar las tarjetas
const renderTarjetas = async (productosArr) => {

   const productos = await productosArr;

// del html selecciono la clase tarjetas, y lo guardo 
    const tarjetas = document.querySelector('.tarjetas');

// console.log(productos);

    productos.forEach(productos => { //productos: array

        // creo el elemento div, y lo guardo en tarjeta
    const tarjeta = document.createElement('div');

        tarjeta.className = 'card col-12 col-xl-6';

        // en el html modifico agregando la tarjeta(cards)
        tarjeta.innerHTML = `

            <img src=${productos.data().imagen} class="card-img-top productoImg" alt=${productos.data().nombre}>

                <div class="card-body">
                    <h5 class="card-title">${productos.data().nombre}</h5>
                    <p class="card-text text-success">$ ${productos.data().precio}</p>
                    <a href="#" class="btn btn-dark btnComprar"id=${productos.id}>Comprar</a>
                </div>
        `;

        tarjetas.append(tarjeta);
        
    });

    agregarEvento();
    
}

renderTarjetas(getProductos());




