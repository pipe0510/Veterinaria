/*var db = firebase.firestore();

function leerproducto() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("producto").onSnapshot((querySnapshot) => {
	
	document.getElementById('leerprod').innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerprod').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Codigo}</td>
						<td>${doc.data().Nombre}</td>
						<td>${doc.data().Marca}</td>
						<td>$ ${doc.data().V_compra}.oo</td>
						<td>$ ${doc.data().V_venta}.oo</td>
					
					</tr> 
		        `;  
        
    });
});

}

leerproducto();

var productosRef = db.collection('producto');

function leerproducto() {
    productosRef.onSnapshot((querySnapshot) => {
        document.getElementById('leerprod').innerHTML = '';		
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            document.getElementById('leerprod').innerHTML += `
                    <div class="product">
                        <img src="imagen_del_producto.jpg" alt="Imagen del producto">
                        <h2>${doc.data().Nombre}</h2>
                        <p>${doc.data().Descripcion}</p>
                        <p>Precio: $${doc.data().Precio}</p>
                        <button onclick="agregarAlCarrito(${doc.data().Precio})">Añadir al carrito</button>
                    </div>
                `;  
        });
    });
}

leerproducto();

let totalProductos = 0;
let totalPagar = 0;

function agregarAlCarrito(precio) {
    totalProductos++;
    totalPagar += precio;

    document.getElementById('totalProductos').innerText = totalProductos;
    document.getElementById('totalPagar').innerText = totalPagar;
}*/

var db = firebase.firestore();
var arregloproducto = [];


    


function leerproducto() {
    //var prueba = Number(prompt("Ingrese cantidad"));
    //document.getElementById("leerprod").innerHTML = '';
    db.collection("producto").onSnapshot((querySnapshot) => {
        document.getElementById('leerprod').innerHTML = '';		
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            document.getElementById('leerprod').innerHTML += `
                    
            <div class ="product">
                        <img src="imagen_del_producto.jpg" alt="Imagen del producto">
                        <h2>${doc.data().Nombre}</h2>
                        <p>${doc.data().Marca}</p>
                        <p>Precio: $${doc.data().V_venta}</p>
                        <button onclick="agregarAlCarrito(${doc.data().V_venta}, '${doc.data().Nombre}', '${doc.data().Marca}')">Añadir al carrito</button>
                    </div>
                `;  
        });
    });
}

leerproducto();

let totalProductos = 0;
let totalPagar = 0;
var carrito=[];

function agregarAlCarrito(precio,Nombre,Marca) {
    totalProductos++;
    totalPagar += precio;
    nombre=Nombre;
    marca=Marca;
    carrito.push("Producto:  "+nombre);
    carrito.push("Marca:  "+marca);
    console.log(carrito);
    //console.log(nombre+"         "+marca);
  
    document.getElementById('totalProductos').innerText = totalProductos;
    document.getElementById('totalPagar').innerText = totalPagar;
    aux=totalPagar;
    console.log(totalPagar);
}


function confirmar(){
 usuario=document.getElementById('usuario').innerText;
 var fecha = new Date();
    db.collection("pedido").add({
		Productos: carrito,
		Total: totalPagar,
        Usuario: usuario,
        Fecha: fecha.toString(),
        Finalizado: false
	})
		.then((docRef) => {
			console.log("El documento fue guardado con el id: ", docRef.id);

			console.log("Información Guardada Satisfactoriamente");
			Swal.fire({
				title: 'Perfecto!',
				text: 'Pedido guardado Satisfactoriamente',
				imageUrl: 'https://www.vanguardia.com/binrepository/716x477/0c0/0d0/none/12204/QQOC/web_mascotas_big_ce_VL309310_MG19807356.jpg',
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})

		})
		.catch((error) => {
			console.error("Error no guardo: ", error);
			Swal.fire({
				title: 'Perfecto!',
				text: 'Pedido registrado Satisfactoriamente',
				icon: "warning",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})
		});

carrito=[];
totalProductos=0;
totalPagar=0;
document.getElementById('totalProductos').innerText = 0;
document.getElementById('totalPagar').innerText = 0;



}


function limpiar(){
    carrito=[];
    totalPagar=0;
    totalProductos=0;
    document.getElementById('totalProductos').innerText = 0;
document.getElementById('totalPagar').innerText = 0;
    
}


