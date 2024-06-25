//inicializa la base de datos
var db = firebase.firestore();

//mostrar formulario
function mostrar_formulario(dato) {
	switch (dato) {
		case 1:
			document.getElementById('insertar').style.display = "block";
			document.getElementById('guardar').style.display = "block";
			document.getElementById('editar').style.display = "none";
			break;
		case 2:
			document.getElementById('insertar').style.display = "none";
			document.getElementById('dni').value = "";
			document.getElementById('nombre').value = "";
			document.getElementById('apellido').value = "";
			document.getElementById('telefono').value = "";
			document.getElementById('t_mascota').value = "";
			document.getElementById('n_mascota').value = "";
			document.getElementById('descripcion').value = "";
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

function Registrar_mascota() {

	var dni = document.getElementById('dni').value;
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var telefono = document.getElementById('telefono').value;
	var t_mascota = document.getElementById('t_mascota').value;
	var n_mascota = document.getElementById('n_mascota').value;
	var descripcion = document.getElementById('descripcion').value;

	db.collection("mascota").add({
		Dni: dni,
		Nombre: nombre,
		Apellido: apellido,
		Telefono: telefono,
		T_mascota: t_mascota,
		N_mascota: n_mascota,
		Descripcion: descripcion
	})
		.then((docRef) => {
			console.log("El documento fue guardado con el id: ", docRef.id);

			console.log("Información Guardada Satisfactoriamente");
			Swal.fire({
				title: 'Perfecto!',
				text: 'Mascota Registrada Satisfactoriamente',
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
				text: 'Mascota Registrada Satisfactoriamente',
				icon: "warning",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})
		});

	document.getElementById('dni').value = "";
	document.getElementById('nombre').value = "";
	document.getElementById('apellido').value = "";
	document.getElementById('telefono').value = "";
	document.getElementById('t_mascota').value = "";
	document.getElementById('n_mascota').value = "";
	document.getElementById('descripcion').value = "";

}

//mostrar mascotas
function leermascota() {


	db.collection("mascota").onSnapshot((querySnapshot) => {

		document.getElementById('leermascota').innerHTML = '';

		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			document.getElementById('leermascota').innerHTML += `
		       	 <tr>
		       	 	    <td>${doc.data().Dni}</td>
						<td>${doc.data().Nombre}</td>
						<td>${doc.data().Apellido}</td>
						<td>${doc.data().Telefono}</td>
						<td>${doc.data().T_mascota}</td>
						<td>${doc.data().N_mascota}</td>
                        <td>${doc.data().Descripcion}</td>
						
						<td><button onclick="recibirdatos('${doc.id}', '${doc.data().Dni}', '${doc.data().Nombre}', '${doc.data().Apellido}', '${doc.data().Telefono}', '${doc.data().T_mascota}', '${doc.data().N_mascota}','${doc.data().Descripcion}',)" class="btn btn-primary">Editar</button></td>
						<td><button onclick="eliminarcliente('${doc.id}')" class="btn btn-danger">Borrar</button></td>
					</tr> 
		        `;

		});
	});

}
leermascota();

//elimina mascota
function eliminarcliente(id) {
	//pregunto si voy a borrar
	swal({
		title: "Estas seguro?",
		text: "una vez eliminada, no podras recuperar la informacion!",
		icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx_ihExc_zIFkIqN97gYfXO64uxiVbH_jiYWjEyJlxF5du3C5sTQthMdpDeejTx_8egY&usqp=CAU",
		imageWidth: 100,
		imageAlt: 'Custom image',
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				db.collection("mascota").doc(id).delete().then(function () {
					console.log("Document successfully deleted!");


					Swal.fire({
						title: 'Completado!',
						text: 'Mascota eliminada Satisfactoriamente',
						imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1xKfdQtVZJ0cmicbKKslinrkfjGR66ZmNuy8j78MRs0DeRzWAhszZhUsvrzwqjv2E40&usqp=CAU',
						imageWidth: 400,
						imageHeight: 200,
						imageAlt: 'Custom image',
					})
				}).catch(function (error) {
					console.error("Error removing document: ", error);
				});

			} else {
				swal("Se ha cancelado la eliminacion");
				console.log("no se borro");
			}
		});
}

//editar mascota

function recibirdatos(id, dni, nombre, apellido, telefono, t_mascota, n_mascota, descripcion) {
	document.getElementById('llave').value = id;
	document.getElementById('dni').value = dni;
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('telefono').value = telefono;
	document.getElementById('t_mascota').value = t_mascota;
	document.getElementById('n_mascota').value = n_mascota;
	document.getElementById('descripcion').value = descripcion;
	mostrar_formulario(3);
}

function editarmascota() {

	var id = document.getElementById('llave').value;
	var dni = document.getElementById('dni').value;
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var telefono = document.getElementById('telefono').value;
	var t_mascota = document.getElementById('t_mascota').value;
	var n_mascota = document.getElementById('n_mascota').value;
	var descripcion = document.getElementById('descripcion').value;

	//edita la información
	var mascotaRef = db.collection("mascota").doc(id);

	// Set the "capital" field of the city 'DC'
	return mascotaRef.update({
		Dni: dni,
		Nombre: nombre,
		Apellido: apellido,
		Telefono: telefono,
		T_mascota: t_mascota,
		N_mascota: n_mascota,
		Descripcion: descripcion
	})
		.then(() => {
			console.log("El registro se guardo");
			Swal.fire({
				title: 'Listo!',
				text: 'Registro de mascota editado satisfactoriamente',
				imageUrl: 'https://cdn.forbes.com.mx/2023/03/perros-mascota-640x360.webp',
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})
			document.getElementById('dni').value = "";
			document.getElementById('nombre').value = "";
			document.getElementById('apellido').value = "";
			document.getElementById('telefono').value = "";
			document.getElementById('t_mascota').value = "";
			document.getElementById('n_mascota').value = "";
			document.getElementById('descripcion').value = "";
			mostrar_formulario(2);
		})
		.catch((error) => {
			// The document probably doesn't exist.
			console.error("Error editando el documento: ", error);
			Swal.fire({
				title: 'Error!',
				text: 'No se ha podido guardar los cambios',
				icon: "warning",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})
		});
}