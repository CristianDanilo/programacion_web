// variables
const Compras = document.getElementById("Compras"),
  listaprendas = document.getElementById("lista_compras"),
  contenedorCarrito = document.querySelector('.buy-card .lista_de_compras'),
  vaciarCarritoBtn = document.querySelector('#vaciar_carrito');


let artuculosCarrito=[];

registrarEventsListeners();

function registrarEventsListeners(){
  // cuando yo le de click a "agregar al carrito de compras"
  listaprendas.addEventListener('click', agregarcompra);
  // eleminar curso del carrito
  Compras.addEventListener('click', eliminarcompra);
  // Muestra los cursos del carrito
  document.addEventListener("DOMContentLoaded", () => {
    artuculosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  })
  // vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', e =>{
    artuculosCarrito = [];
    limpiarHTML();
  })
}

function agregarcompra(e){
  if(e.target.classList.contains("agregar-Carrito")){
    const compraSeleccionado = e.target.parentElement.parentElement;
    LeerInfo(compraSeleccionado)
  }
}

// elimina un curso del carrito
function eliminarcompra(e){
  if(e.target.classList.contains("borrar-compra")){
    const compraId = e.target.getAttribute('data-id');
    // eliminar del arreglo del articulocarrito por el data_id
    artuculosCarrito = artuculosCarrito.filter(compra => compra.id !== compraId)

    carritoHTML();
  }
}
// leer el contenido de nuestro HTML al que le dimos click y extrae la ingo del compra
function LeerInfo(compra){
  // crear un objeto con el contenido del compra actual
    const infocompra = {
     imagen : compra.querySelector('img').src,
     titulo: compra.querySelector('h2').textContent,
     precio: compra.querySelector('.precio').textContent,
     id : compra.querySelector('button').getAttribute('data-id'),
     cantidad :1
    }
    // Revisa si un elemento ya existe en el carrito 
    const existe = artuculosCarrito.some(compra => compra.id === infocompra.id)
  
    if(existe){
      // vamos actualizar la cantidad
      const compra = artuculosCarrito.map(compra =>{
        if(compra.id === infocompra.id){
          compra.cantidad++;
          return compra;
        }else{
          return compra;
        }
      });
        [...artuculosCarrito,infocompra]
    }else{
          // agregamos elementos al carrito de compras
          artuculosCarrito = [...artuculosCarrito,infocompra]
    }
    carritoHTML()
  
  }

// Muestra el carrito en HTML
function carritoHTML(){
  limpiarHTML()
  // recorre el carrito de compras y genera el HTML
  artuculosCarrito.forEach(compra => {
    const fila = document.createElement('div');
    fila.innerHTML =`
      <img src="${compra.imagen}"/>
      <p>${compra.titulo}></p>
      <p>${compra.precio}</p>
      <p>${compra.cantidad}</p>
      <p><span class="borrar-compra" data-id=${compra.id}>X</span></p>
    `;
    contenedorCarrito.appendChild(fila)
  });
  // sincronizar con LocalStorage
  sincronizarStorage()
}

function sincronizarStorage(){
  localStorage.setItem("carrito",JSON.stringify(artuculosCarrito))
}

// elimina las compras de la lista de compras
function limpiarHTML() {
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
  sincronizarStorage()
}