//inicializa labase de datos
var db = firebase.firestore();

//mostrar formulario
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
			document.getElementById('formproducto').style.display = "block";
			break;
		case 5:
			document.getElementById('formproducto').style.display = "none";
			arregloproducto = [];
			document.getElementById('producto').value = "";
			document.getElementById('cantidad').value = "";
			break;
	}
}
//selecccionar producto
function selectpro() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("producto").onSnapshot((querySnapshot) => {
	
	document.getElementById('producto').innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('producto').innerHTML += `
					<option value="${doc.data().Nombre},${doc.data().V_compra}" label="${doc.data().Nombre}">${doc.data().Nombre}</option>				
		        `;  
        
    });
});

}   

selectpro();


//agrega el producto en un arreglo

var arregloproducto = [];

function agregarproducto() {
	
	var producto = document.getElementById('producto').value;
	//console.log(producto);
	var cantidad = document.getElementById('cantidad').value;
	
	var sproducto = producto.split(",");
	var subtotal = parseFloat(cantidad) * parseFloat(sproducto[1]);
	
	sproducto.push(cantidad);
	sproducto.push(subtotal);
	
	arregloproducto.push(sproducto[0]);
	arregloproducto.push(sproducto[1]);
	arregloproducto.push(sproducto[2]);
	arregloproducto.push(sproducto[3]);
	
	
	//alert(sproducto[0] + ' - ' + sproducto[1])
	}


//guardar compra
function guardarcompra() {
	
	var fecha = new Date();
	
	db.collection("compra").add({
    Fecha: fecha.toString(),
    Producto: arregloproducto
	})
	.then((docRef) => {
	    console.log("El documento fue guardado con el id: ", docRef.id);
	    arregloproducto = [];	
		//https://www.hogarmania.com/archivos/202010/articulos-mascotas-felices-7-juguetes-perro-XxXx80.jpg
		console.log("Información Guardada Satisfactoriamente");
		Swal.fire({
		title: 'Perfecto!',
		text: 'Compra Registrada Satisfactoriamente',
		imageUrl: 'https://www.hogarmania.com/archivos/202010/articulos-mascotas-felices-7-juguetes-perro-XxXx80.jpg',
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: 'Custom image',
		})
	
		document.getElementById('cantidad').value = '';
	})
	.catch((error) => {
	    console.error("Error no guardo: ", error);
	});
	
	
	
	
}

function leercompra() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("compra").onSnapshot((querySnapshot) => {
	
	document.getElementById("leercompra").innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leercompra').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Fecha}</td>
						<td>${doc.data().Producto}</td>
						<td><button onclick="eliminarcompra('${doc.id}')"class="btn btn-secondary">Anular</button></td>
					</tr> 
		        `;  
        
    });
});

}

leercompra();

function eliminarcompra(id) {

	swal({
		title: "Estas seguro?",
		text: "una vez eliminada, no podras recuperar la informacion!",
		icon: "warning",
		imageWidth: 100,
		imageAlt: 'Custom image',
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			db.collection("compra").doc(id).delete().then(function() {
			    console.log("Document successfully deleted!");
				console.log("Información eliminada Satisfactoriamente");
                Swal.fire({
                title: 'Completado!',
                text: 'Compra eliminada Satisfactoriamente',
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
	  
	//pregunto si voy a borrar

	/*
	if(confirm("Esta seguro de eliminar el registro")){
			
			db.collection("compra").doc(id).delete().then(function() {
			    console.log("Document successfully deleted!");
				console.log("Información eliminada Satisfactoriamente");
                Swal.fire({
                title: 'Completado!',
                text: 'Compra eliminada Satisfactoriamente',
                imageUrl: 'https://i.pinimg.com/originals/6f/34/9b/6f349be07b9943d804115e98e8c033c2.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                })
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});

	}else {
		console.log("no se borro");
	}
	*/









	
}