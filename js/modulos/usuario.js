function mostrar_form(dato){
    switch(dato){
        case 1:
            document.getElementById("form_u").style.display="block";
        break;
        case 2:
            limpiar();
            document.getElementById("form_u").style.display="none";
        break;    
    }
}

function limpiar(){
    document.getElementById("nombre").value="";
    document.getElementById("email").value="";
    document.getElementById("clave").value="";
    document.getElementById("rol").value="";
}

///Agregar usuario

var form = document.querySelector("#form_u");
var nombre, email, clave, rol;

form.addEventListener("submit", (ev)=>{
     ev.preventDefault();
     
    nombre= form.querySelector("#nombre").value;
    email= form.querySelector("#email").value;
    clave= form.querySelector("#clave").value;
    rol= form.querySelector("#rol").value;

    agregar();
    limpiar();

});

function agregar(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.clave)
        .then((userCredential) => {
            var user = userCredential.user;
            var uid = user.$.W;
            // Add a new document in collection "cities"
            db.collection("usuarios").doc(uid).set({
                nombre: this.nombre,
                email: this.email,
                rol: this.rol
            })
            .then(() => {
                console.log("Información Guardada Satisfactoriamente");
                Swal.fire({
                title: 'Perfecto!',
                text: 'Usuario Registrado Satisfactoriamente',
                icon: 'success',
                })
            })
            .catch((error) => {
                console.error("Error al Guardar: ", error);
            });
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
}


/// Mostrar usuario

function mostrar(){

    db.collection("usuarios")
        .orderBy("nombre", "asc")
        .onSnapshot((querySnapshot) => { 
        //.get().then((querySnapshot) => {
        document.getElementById('tbody').innerHTML = "";
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            document.getElementById("tbody").innerHTML += `
                <tr>
                    <td>${doc.data().nombre}</td>
                    <td>${doc.data().email}</td>
                    <td>${doc.data().rol}</td>                
                    <td>
                        <span onclick="recibirdatos('${doc.id}', '${doc.data().nombre}', '${doc.data().email}','${doc.data().rol}',)" class="btn btn-primary">Editar</span>
                        <span onclick="eliminarusuario('${doc.id}')" class="btn btn-danger">Eliminar</span>
                    </td>
                </tr>                
            `;
        });
    });    
}

mostrar();
function eliminarusuario(uid) {
	//pregunto si voy a borrar
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
			db.collection("usuarios").doc(uid).delete().then(() =>{
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
}

function recibirdatos(id,nombre,email,rol) {
    document.getElementById('llave').value = id;
	document.getElementById('nombre').value = nombre;
	document.getElementById('email').value = email;
	document.getElementById('rol').value = rol;
	mostrar_form(1);
}

//editar
