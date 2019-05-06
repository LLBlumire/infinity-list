class Select {
  constructor(selector) {
    this.element = document.getElementById(selector)
    this.listener = undefined;
  }
  setMcu(n) {
    this.element.className = `mcu${n}`
  }
  setCallback(f) {
    if (this.listener !== undefined) {
      this.element.removeEventListener('click', this.listener)
    }
    this.listener = f;
    this.element.addEventListener('click', f)
  }
}