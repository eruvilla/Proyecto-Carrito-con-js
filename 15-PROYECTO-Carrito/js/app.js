//variable 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando agregar al carrito 
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];// reseteamos el arreglo

        limpiarHTML();//limpiamos todo el HTML
    })
}

//Funciones
function agregarCurso(e){ 
    e.preventDefault(); // Evita que al dar click en agregar al carrito te lleve al inicio de la pagina
    
    if (e.target.classList.contains('agregar-carrito')){ // Muestra la informacion de la tarjeta al dar click
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina el arreglo de articuloCarrito por el data-id 
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //Itera sobre el carrito  y muestra su HTML
    }
}

//Lee el contenido del HTML al que le damos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    // crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{

        // Agrega elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    } 
    
    console.log(articulosCarrito);
    
    carritoHTML();
}

// Muestra el carrito de compras en HTML
function carritoHTML(){
    //Limpia el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, nombre, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML =  `
            <td>
                <img src="${imagen}" width='100'>
            </td>  
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </>
            </td>
        `;

        //agrega el HTML en el body del carrito de compras
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del body
function limpiarHTML(){
    //Forma lenta de eliminar 
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}