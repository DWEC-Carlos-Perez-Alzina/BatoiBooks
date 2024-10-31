import './style.css'
import batoiLogo from '/logoBatoi.png'
import Controller from './src/controller/controller.class'

document.querySelector('#app').innerHTML = `
  <header>
    <img src="${batoiLogo}" alt="Logo Batoi" />
    <h1>BatoiBooks</h1>
    <h3>Control de libros</h3>
  </header>
  <nav>
    <ul>
      <li><a id="list-link" href="#list">Ver Libros</a></li>
      <li><a id="form-link" href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>
  <div>
    <div id="list"></div>
    <div id="messages"></div>
    <div id="form">
      <h2>Añadir libro</h2>
      <form id="bookForm" novalidate>
        <div>
          <label for="id" id="id-label" class="hidden">ID:</label>
          <input type="text" id="id" name="id" class="hidden" readonly disabled>
          </br>
        </div>
        <div>
          <label for="id-module">Módulo:</label>
          <select id="id-module" required>
            <option value="" disabled selected>- Selecciona un módulo -</option>
          </select>
          <span id="id-module-error" class="error"></span>
        </div>

        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" id="publisher" required>
          <span id="publisher-error" class="error"></span>

        </div>

        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" required min="0" step="0.01">
          <span id="price-error" class="error"></span>

        </div>

        <div>
          <label for="pages">Páginas:</label>
          <input type="number" id="pages" required min="0" step="1">
          <span id="pages-error" class="error"></span>

        </div>

        <div>
          <label>Estado:</label>
          <label>
            <input type="radio" id="good" name="status" value="good" required> Good
          </label>
          <label>
            <input type="radio" id="new" name="status" value="new" required> New
          </label>
          <label>
            <input type="radio" id="old" name="status" value="old" required> Old
          </label>
          <span id="status-error" class="error"></span>
        </div>

        <div>
          <label for="comments">Comentarios:</label>
          <textarea id="comments"></textarea>
          <span class="error"></span>

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