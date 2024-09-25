import './style.css'
import batoiLogo from '/logoBatoi.png'

document.querySelector('#app').innerHTML = `
  <div>
    <img src="${batoiLogo}" class="logo" alt="logo Batoi" />
    <h1>BatoiBooks</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
`