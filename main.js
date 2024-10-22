import './style.css'
import batoiLogo from '/logoBatoi.png'
import Modules from './src/model/modules.class'
import Users from './src/model/users.class'
import Books from './src/model/books.class'
import Controller from './src/controller/controller.class'

document.querySelector('#app').innerHTML = `
  <header>
    <img src="${batoiLogo}" alt="Logo Batoi" />
    <h1>BatoiBooks</h1>
    <h3>Control de libros</h3>
  </header>
  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>
  <div>
    <div id="list"></div>
    <div id="messages"></div>
    <div id="form">
      <div>
        <label for="id-remove">ID:</label>
        <input type="number" id="id-remove">
        <button id="remove">Borrar libro</button>
      </div>
      <form id="bookForm">
        <div>
          <label for="id-module">Módulo:</label>
          <select id="id-module" required>
            <option value="" disabled selected>- Selecciona un módulo -</option>
          </select>
        </div>

        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" id="publisher" required>
        </div>

        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" required min="0">
        </div>

        <div>
          <label for="pages">Páginas:</label>
          <input type="number" id="pages" required min="0">
        </div>

        <div>
          <label>Estado:</label>
          <label>
            <input type="radio" id="status" name="status" value="good" required> Good
          </label>
          <label>
            <input type="radio" id="status" name="status" value="new" required> New
          </label>
          <label>
            <input type="radio" id="status" name="status" value="old" required> Old
          </label>
        </div>

        <div>
          <label for="comments">Comentarios:</label>
          <textarea id="comments" required></textarea>
        </div>

        <button type="submit">Añadir</button>
        <button type="reset">Reset</button>
      </form>

      </div>
    </div>
    <div id="about">
      <footer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloremque dolores!
      </footer>
    </div>
  </div>
`
document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
});