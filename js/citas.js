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
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('dni').value = "";
            document.getElementById('fechas').value = "";
            document.getElementById('telefono').value = "";
            document.getElementById('n_mascota').value = "";
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

function Registrar_cita() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dni = document.getElementById('dni').value;
    var fechas = document.getElementById('fechas').value;
    var telefono = document.getElementById('telefono').value;
    var n_mascota = document.getElementById('n_mascota').value;

    db.collection("citas").add({
        Nombre: nombre,
        Apellido: apellido,
        Dni: dni,
        Fechas: fechas,
        Telefono: telefono,
        N_mascota: n_mascota,
    })
        .then((docRef) => {
            console.log("El documento fue guardado con el id: ", docRef.id);
        })
        .catch((error) => {
            console.error("No se ha podido guardar, intentelo de nuevo: ", error);
        });

    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('fechas').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('n_mascota').value = "";

}

//mostrar citas
function leercitas() {


    db.collection("citas").onSnapshot((querySnapshot) => {

        document.getElementById('leercitas').innerHTML = '';

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            document.getElementById('leercitas').innerHTML += `
		       	 <tr>
                        <td>${doc.data().Nombre}</td>
                        <td>${doc.data().Apellido}</td>
		       	 	    <td>${doc.data().Dni}</td>
                        <td>${doc.data().Fechas}</td>
						<td>${doc.data().Telefono}</td>
						<td>${doc.data().N_mascota}</td>
						
						<td><button onclick="recibircitas('${doc.id}', '${doc.data().Nombre}', '${doc.data().Apellido}', '${doc.data().Dni}', '${doc.data().Fechas}', '${doc.data().Telefono}', '${doc.data().N_mascota}', )"class="btn btn-primary">Editar</button></td>
						<td><button onclick="eliminarcitas('${doc.id}')"class="btn btn-secondary">Borrar</button></td>
					</tr> 
		        `;

        });
    });

}
leercitas();

//elimina citas
function eliminarcitas(id) {
    //Confirmación de borrado
    if (confirm("¿Desea eliminar la cita registrada?")) {

        db.collection("citas").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
            alert('la cita fue borrada satisfactoriamente');
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    } else {
        console.log("No se ha podido eliminar la cita, intentelo de nuevo");
    }
}

//editar citas

function recibircitas(id, nombre, apellido, dni, fechas, telefono, n_mascota) {
    document.getElementById('llave').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('dni').value = dni;
    document.getElementById('fechas').value = fechas;
    document.getElementById('telefono').value = telefono;
    document.getElementById('n_mascota').value = n_mascota;
    mostrar_formulario(3);
}

function editarcitas() {

    var id = document.getElementById('llave').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dni = document.getElementById('dni').value;
    var fechas = document.getElementById('fechas').value;
    var telefono = document.getElementById('telefono').value;
    var n_mascota = document.getElementById('n_mascota').value;

    //editar la información
    var citareferencia = db.collection("citas").doc(id);

    return citareferencia.update({
        Nombre: nombre,
        Apellido: apellido,
        Dni: dni,
        Fechas: fechas,
        Telefono: telefono,
        N_mascota: n_mascota,
    })
        .then(() => {
            console.log("El registro se guardó satisfactoriamente");
            alert("El registro se guardó satisfactoriamente");
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('dni').value = "";
            document.getElementById('fechas').value = "";
            document.getElementById('telefono').value = "";
            document.getElementById('n_mascota').value = "";
            mostrar_formulario(2);
        })
        .catch((error) => {
            console.error("Error editando el documento: ", error);
            alert("Error editando el documento: ", error)
        });
}