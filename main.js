import './style.css'
import batoiLogo from '/logoBatoi.png'
import Modules from './src/model/modules.class'
import Users from './src/model/users.class'
import Books from './src/model/books.class'

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


const mods = new Modules()
await mods.populate()

const usrs = new Users()
await usrs.populate()

const bks = new Books()
await bks.populate()

console.log('Todos los libros del modulo 5021', bks.booksFromModule('5021'))
console.log('Mostrando los libros con el estado new', bks.booksWithStatus('new'))
// console.log('Libros con el precio incrementado un 10%', bks.incrementPriceOfbooks(0.1))
