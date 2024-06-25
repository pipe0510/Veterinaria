var db = firebase.firestore();

function leerpedidos() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("pedido")
    .where("Finalizado", "==", false)
    .onSnapshot((querySnapshot) => {
	
	document.getElementById("leerpedidos").innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerpedidos').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Fecha}</td>
						<td>${doc.data().Productos}</td>
                        <td>${doc.data().Usuario}</td>
                        <td>${doc.data().Total}</td>
                        <td>${doc.data().Finalizado}</td>
						<td><button onclick="finalizar('${doc.id}')"class="btn btn-secondary">finalizar</button></td>
					</tr> 
		        `;  
        
    });
});

}

leerpedidos();

function finalizar(id){
    var pedidoref = db.collection("pedido").doc(id);

	return pedidoref.update({
		Finalizado: true 
    })
    .then(() => {
        console.log("El registro se guardo");
        Swal.fire({
            title: 'Listo!',
            text: 'pedido finalizado satisfactoriamente',
            icon: 'success',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
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