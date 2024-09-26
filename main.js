import './style.css'
import batoiLogo from '/logoBatoi.png'
import * as functions from './src/functions'
import data from './src/services/datos'

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
console.log('Todos los libros del usuario 4', functions.booksFromUser(data.books, 1))
console.log('Todos los libros del modulo 5021 en buen estado', functions.booksWithStatus(functions.booksFromModule(data.books, '5021'), 'good'))
console.log('Libros con el precio incrementado un 10%', functions.incrementPriceOfbooks(data.books, 0.1))