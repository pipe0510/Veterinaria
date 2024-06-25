//inicializa labase de datos
var db = firebase.firestore();

function mostrar_formulario(dato) {
	switch(dato) {
		case 1:
			document.getElementById('insertar').style.display = "block";
			document.getElementById('guardar').style.display = "block";
			document.getElementById('editar').style.display = "none";
			break;
		case 2:
			document.getElementById('insertar').style.display = "none";
			break;
		case 3:
			document.getElementById('insertar').style.display = "block";
			document.getElementById('guardar').style.display = "none";
			document.getElementById('editar').style.display = "block";
			break;
		case 4:
			document.getElementById('formproducto').style.display = "none";
			break;
	}
}


//inserta el producto
function insertar_producto() {
	
	var codigo = document.getElementById('codigo').value;	
	var nombre = document.getElementById('nombre').value;
	var marca = document.getElementById('marca').value;
	var v_compra = document.getElementById('v_compra').value;
	var v_venta = document.getElementById('v_venta').value;
	var stock = document.getElementById('stock').value;
	
	db.collection("producto").add({
    Nombre: nombre,
    Codigo: codigo,
    Marca: marca,
    V_compra: v_compra,
    V_venta: v_venta,
    Stock: stock
	})
	.then((docRef) => {
		console.log("El documento fue guardado con el id: ", docRef.id);

		console.log("Información Guardada Satisfactoriamente");
		Swal.fire({
		title: 'Perfecto!',
		text: 'Produto Registrado Satisfactoriamente',
		imageUrl: 'https://www.eltiempo.com/files/article_main_1200/uploads/2017/06/02/5931e30f25537.jpeg',
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: 'Custom image',
		})

	})
	.catch((error) => {
	    console.error("Error no guardo: ", error);
		Swal.fire({
			title: 'Perfecto!',
			text: 'Mascota Registrada Satisfactoriamente',
			icon:"warning" ,
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'Custom image',
			})
	});
	
	document.getElementById('codigo').value = "";	
	document.getElementById('nombre').value = "";
	document.getElementById('marca').value = "";
	document.getElementById('v_compra').value = "";
	document.getElementById('v_venta').value = "";
	document.getElementById('stock').value = "";	
	
}


//consulta los productos
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
						<td><button onclick=""class="btn btn-link">Ver</button></td>
						<td><button onclick="recibirdatos('${doc.id}', '${doc.data().Codigo}', '${doc.data().Nombre}', '${doc.data().Marca}', '${doc.data().Proveedor}', '${doc.data().Stock}', '${doc.data().V_compra}', '${doc.data().V_venta}')"class="btn btn-primary">Editar</button></td>
						<td><button onclick="eliminarproducto('${doc.id}')"class="btn btn-secondary">Borrar</button></td>
					</tr> 
		        `;  
        
    });
});

}

leerproducto();


//elimina productos
function eliminarproducto(id) {
	//pregunto si voy a borrar
	swal({
		title: "Estas seguro?",
		text: "una vez eliminada, no podras recuperar la informacion!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			db.collection("producto").doc(id).delete().then(function() {
			    console.log("Document successfully deleted!");
				console.log("Información eliminada Satisfactoriamente");
                Swal.fire({
                title: 'Completado!',
                text: 'Producto eliminado Satisfactoriamente',
                imageUrl: 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001701/ahasoft2000170105725/69883758-redondeada-anular-marca-de-agua-sello-de-goma-del-sello-s%C3%ADmbolo-del-icono-dentro-del-c%C3%ADrculo-con.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                })
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});

		} else {
		  swal("Se ha cancelado la eliminacion");
		  console.log("no se borro");
		}
	  });   
	}


//editar producto

function recibirdatos(id, codigo,nombre, marca, proveedor,stock,v_compra, v_venta) {
	document.getElementById('llave').value = id;
	document.getElementById('codigo').value = codigo;
	document.getElementById('nombre').value = nombre;
	document.getElementById('marca').value = marca;
	document.getElementById('stock').value = stock;
	document.getElementById('v_compra').value = v_compra;
	document.getElementById('v_venta').value = v_venta;
	
	mostrar_formulario(3);	
}

function editarproducto() {
	
	var id = document.getElementById('llave').value;
	var codigo = document.getElementById('codigo').value;
	var nombre = document.getElementById('nombre').value;
	var marca = document.getElementById('marca').value;
	var stock = document.getElementById('stock').value;
	var v_compra = document.getElementById('v_compra').value;
	var v_venta = document.getElementById('v_venta').value;
	
	//edita la información
	var productoRef = db.collection("producto").doc(id);

	// Set the "capital" field of the city 'DC'
	return productoRef.update({
	    Codigo: codigo,
	    Nombre: nombre,
	    Marca: marca,
	    Stock: stock,
	    V_compra: v_compra,
	    V_venta: v_venta
	})
	.then(() => {
	    console.log("El registro se guardo");
	    Swal.fire({
			title: 'Genial!',
			text: 'El producto se editó satisfactoriamente',
			imageUrl: 'https://www.eltiempo.com/files/article_main_1200/uploads/2017/06/02/5931e30f25537.jpeg',
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'Custom image',
			})
	    document.getElementById('llave').value = "";
		 document.getElementById('codigo').value = "";	
		 document.getElementById('nombre').value = "";
		 document.getElementById('marca').value = "";
		 document.getElementById('v_compra').value = "";
		 document.getElementById('v_venta').value = "";
		 document.getElementById('stock').value = "";		
	
	    mostrar_formulario(2);
	})
	.catch((error) => {
	    // The document probably doesn't exist.
	    console.error("Error editando el documento: ", error);
	    Swal.fire({
			title: 'Error!',
			text: 'No se ha podido guardar los cambios',
			icon:"warning" ,
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'Custom image',
			})
	});
	
	
}