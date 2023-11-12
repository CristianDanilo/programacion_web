const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
// evento para los botenes del filtro
const btnTodos = document.querySelector('.todos');
const btnTenis_hombres = document.querySelector('.Tenis_hombres');
const btnzapatosdehombre = document.querySelector('.zapatosdehombre');
const btntenisdemujer = document.querySelector('.tenisdemujer');
const btntaconesdemujer = document.querySelector('.taconesdemujer');
const contenedorPlatillos = document.querySelector('.closet');
// este evento hace que lo primero que cargue  el archivo html y despues el javascrip
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    closet();
})

const eventos= ()=>{
    menu.addEventListener('click',abrirMenu);

}
//hoisting contexto de ejecucion de javascrip la manera en la que se escanea el documento y como va creando cada cos
//arrow function o function expression
const abrirMenu= () =>{
    navegacion.classList.remove('ocultar'); /*remueve el ocultar de la navegacion en el html para que se muestre el menu */
    botonCerrar();
}
const botonCerrar =() =>{
    const btnCerrar = document.createElement('p');/* se crea el elemento en el que vamos agregar el texto  en este caso p un parrafo*/
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body'); /**seleccionamos el body para poder aplicar el filtro de la pantalla completa */
    if(document.querySelectorAll('.pantalla-completa').length > 0) return; /** esto se hace para que el usuario no genere mas overlay */
    body.appendChild(overlay);
    btnCerrar.textContent = 'x'; /* agreaga texto al elemento que se puso en este caso p el parrafo*/
    btnCerrar.classList.add('btn-cerrar'); /** se le añade al parrafo la clase */
    // console.log(navegacion.children); //para saber los hijos que tiene el padre 
    // while(navegacion.children[5]){ // se utiliza este while para que no se generen parrafos de btncerrar inecesariamente
    //     navegacion.removeChild(navegacion.children[5])
    // }
    navegacion.appendChild(btnCerrar);
    cerrarmenu(btnCerrar,overlay);

}
// con el siguiente las imagenes van cargando de forma asincrona a medida que se va haciendo escrol para que las imagenes no se descarguen de golpe en el servidor
const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

// con este codigo las fotos se iran cargando de forma automatica
imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarmenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    /** para hacer un evento se hace lo siguiente en este caso es un evento para el overlay */
    overlay.onclick =function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}
const closet = () =>{
    let closetArreglo= [];
    const closet = document.querySelectorAll('.prenda');
    // recorremos el arreglo  para ingresarlos en el nuevo arreglo closetArreglo
    closet.forEach(prenda=> closetArreglo= [...closetArreglo,prenda]);
    // filtrar los arreglo
    //vamos a recorrer el nuevo arreglo para buscar el tipo de producto que necesitamos
    const Tenis_hombres =closetArreglo.filter(Tenisdehombre=> Tenisdehombre.getAttribute('data-prenda') === 'Tenisdehombre');
    const zapatosdehombres=closetArreglo.filter(zapatosdehombre=> zapatosdehombre.getAttribute('data-prenda') === 'zapatosdehombre');
    const tenisdemujers=closetArreglo.filter(tenisdemujer=> tenisdemujer.getAttribute('data-prenda') === 'tenisdemujer');
    const taconesdemujers=closetArreglo.filter(taconesdemujer=> taconesdemujer.getAttribute('data-prenda') === 'taconesdemujer');

    mostrarPlatillos(Tenis_hombres, zapatosdehombres, tenisdemujers, taconesdemujers, closetArreglo);
}
// este arreglo recibe el nuevo arreglo de las Tenis_hombres patas tenisdemujers y taconesdemujers
 
const mostrarPlatillos = (Tenis_hombres, zapatosdehombre, tenisdemujers, taconesdemujers, todos) =>{
    btnTenis_hombres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos)
        Tenis_hombres.forEach(Tenisdehombre=> contenedorPlatillos.appendChild(Tenisdehombre));
    });
    btnzapatosdehombre.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos)
        zapatosdehombre.forEach(zapatosdehombres=> contenedorPlatillos.appendChild(zapatosdehombres));
    });
    btntenisdemujer.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos)
        tenisdemujers.forEach(tenisdemujer=> contenedorPlatillos.appendChild(tenisdemujer));
    });
    btntaconesdemujer.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos)
        taconesdemujers.forEach(taconesdemujer=> contenedorPlatillos.appendChild(taconesdemujer));
    });
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=>contenedorPlatillos.appendChild(todo));
    })
}

const limpiarHtml =(contendor =>{
    while(contendor.firstChild){
        contendor.removeChild(contendor.firstChild);
    }
})