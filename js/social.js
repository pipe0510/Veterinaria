document.getElementById('social').innerHTML =`
<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
.menu3{
  position:relative;
 width:280px;
  height:280px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.menu3 .toggle{
  position:relative;
  height:60px;
  width:60px;
  background:#fff;
  border-radius:50%;
  box-shadow:0 3px 4px rgba(0,0,0,0.15);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#333;
  font-size:2rem;
  cursor:pointer;
  transition:1.25s;
  z-index:5;
}
.menu3.active .toggle{
  transform:rotate(360deg);
  box-shadow: 0 6px 8px rgba(0,0,0,0.15),
    0 0 0 2px #333,
    0 0 0 8px #fff;
}
.menu3 li{
  position:absolute;
  left:0;
  list-style:none;
  transition:0.5s;
  transform:rotate(calc(360deg/8 * var(--i)));
  transform-origin:140px;
  scale:0;
  transition-delay: calc(0.05s * var(--i));
}
.menu3.active li{
  scale:1;
}
.menu3 li a{
  position:relative;
  display:flex;
 transform:rotate(calc(360deg/-8 * var(--i)));
  width:60px;
  height:60px;
  background-color:#FFF;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  font-size:1.75rem;
  color:var(--clr);
   box-shadow:0 3px 4px rgba(0,0,0,0.15);
  transition:0.5s;
}
.menu3 li:hover a{
  font-size:2.5rem;
  box-shadow:0 0 0 2px var(--clr),
    0 0 0 6px #fff;
}
</style>

<div class="menu3">
  <div class="toggle">
    <ion-icon name="share-social"></ion-icon>
    </div>
  
    <li style="--i:0;--clr:#1877f2">
    <a href="https://www.facebook.com"><ion-icon name="logo-facebook"></ion-icon></a>
  </li>
  <li style="--i:1;--clr:#25d366">
    <a href="https://www.whatsapp.com"><ion-icon name="logo-whatsapp"></ion-icon></a>
  </li>
  <li style="--i:2;--clr:#1da1f2">
    <a href="https://www.twitter.com"><ion-icon name="logo-twitter"></ion-icon></a>
  </li>
   <li style="--i:3;--clr:#FF5733">
    <a href="https://www.reddit.com"><ion-icon name="logo-reddit"></ion-icon></a>
  </li>
  <li style="--i:4;--clr:#0a66c2">
    <a href="https://www.linkedin.com/"><ion-icon name="logo-linkedin"></ion-icon></a>
  </li>
  <li style="--i:5;--clr:#c32aa3">
    <a href="https://www.instagram.com/"><ion-icon name="logo-instagram"></ion-icon></a>
  </li>
  <li style="--i:6;--clr:#1b1e21">
    <a href="https://www.github.com"><ion-icon name="logo-github"></ion-icon></a>
  </li>
  <li style="--i:7;--clr:#ff0000">
    <a href="https://www.youtube.com"><ion-icon name="logo-youtube"></ion-icon></a>
</div>
<!-- partial -->
  <script src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'></script>
<script src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'></script><script  > </script>`
const menu3=document.querySelector(".menu3");
  const toggle=document.querySelector(".toggle");
  toggle.addEventListener("click",()=>{
    menu3.classList.toggle("active");
  })