class FrameworkSizeGuide extends HTMLElement {
  connectedCallback() {
    this.controller?.abort();
    this.controller = new AbortController();
    const trigger = this.querySelector('[data-guide-open]');
    const dialog = this.querySelector('dialog');
    if (!trigger || !dialog) return;
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.showModal();
    }, { signal: this.controller.signal });
    dialog.addEventListener('close', () => trigger.focus(), { signal: this.controller.signal });
  }
  disconnectedCallback() { this.controller?.abort(); }
}
if (!customElements.get('framework-size-guide')) customElements.define('framework-size-guide', FrameworkSizeGuide);
