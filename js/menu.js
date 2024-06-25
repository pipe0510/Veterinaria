function heart(numero) {
  switch(numero) {
      case 1:
        document.getElementById('r').className="animate__animated animate__heartBeat animate__infinite";
        break;
      case 2:
        document.getElementById('r').className="";
        break;
        case 3:
        document.getElementById('t').className="animate__animated animate__heartBeat animate__infinite";
        break;
      case 4:
        document.getElementById('t').className="";
        break;
        case 5:
        document.getElementById('y').className="animate__animated animate__heartBeat animate__infinite";
        break;
      case 6:
        document.getElementById('y').className="";
        break;

        case 7:
          document.getElementById('u').className="animate__animated animate__heartBeat animate__infinite";
          break;
        case 8:
          document.getElementById('u').className="";
          break;
          case 9:
            document.getElementById('q').className="animate__animated animate__heartBeat animate__infinite";
            break;
          case 10:
            document.getElementById('q').className="";
            break;
            case 11:
            document.getElementById('o').className="animate__animated animate__heartBeat animate__infinite";
            break;
          case 12:
            document.getElementById('o').className="";
            break;
  }}

document.getElementById('menu').innerHTML = `
<ul class="nav flex-column">
<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="mascota.html" onmouseover="heart(1)" onmouseout="heart(2)">
    <svg class="bi"><use xlink:href="#house-fill"/></svg>
    Registrar mascota
    <img src="img/nueva_mascota.png" width="25"  id="r"  onmouseover="heart(1)" onmouseout="heart(2)" >
  </a>
</li>
<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2" href="citas.html" onmouseover="heart(3)" onmouseout="heart(4)">
    <svg class="bi"><use xlink:href="#file-earmark"/></svg>
    Registrar Cita
    <img src="img/informe-medico.png" width="25"  id="t"  onmouseover="heart(3)" onmouseout="heart(4)">
  </a>
</li>
<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2" href="productos.html" onmouseover="heart(5)" onmouseout="heart(6)">
    <svg class="bi"><use xlink:href="#cart"/></svg>
    Registrar producto
    <img src="img/medicina.png" width="25" id="y"  onmouseover="heart(5)" onmouseout="heart(6)">
  </a>
</li>
<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2" href="usuarios.html" onmouseover="heart(7)" onmouseout="heart(8)">
    <svg class="bi"><use xlink:href="#cart"/></svg>
    Usuarios
    <img src="img/usuario.png" width="25" id="u"  onmouseover="heart(7)" onmouseout="heart(8)">
  </a>
 
</li>
<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2" href="compras.html"  onmouseover="heart(9)" onmouseout="heart(10)">
    <svg class="bi"><use xlink:href="#cart"/></svg>
    Compras
    <img src="img/factura.png" width="25" id="q"  onmouseover="heart(9)" onmouseout="heart(10)">
  </a>
 
</li>

<li class="nav-item">
  <a class="nav-link d-flex align-items-center gap-2" href="pedidos.html"  onmouseover="heart(11)" onmouseout="heart(12)">
    <svg class="bi"><use xlink:href="#cart"/></svg>
    Pedidos
    <img src="img/orden.png" width="25" id="o"  onmouseover="heart(11)" onmouseout="heart(12)">
  </a>
 
</li>

</ul>
`;

  