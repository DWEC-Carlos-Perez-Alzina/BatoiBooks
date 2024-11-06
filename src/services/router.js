export default class Router {
  constructor() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  handleRouteChange() {
    const currentHash = window.location.hash;

    document.getElementById('list').classList.add('hidden');
    document.getElementById('form').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');

    switch (currentHash) {
      case '#list':
        document.getElementById('list').classList.remove('hidden');
        break;
      case '#form':
        document.getElementById('form').classList.remove('hidden');
        break;
      case '#about':
        document.getElementById('about').classList.remove('hidden');
        break;
      default:
        document.getElementById('list').classList.remove('hidden');
        break;
    }
  }
}