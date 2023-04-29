export default class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.button = this.getButton(selector);
  }

  getButton(selector) {
    return document.querySelector(selector);
    isHidden && this.hide();
  }
  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }
  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load More';
  }
  hide() {
    this.button.classList.add('hidden');
  }
  show() {
    this.button.classList.remove('hidden');
  }
}
