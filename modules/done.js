class done extends HTMLElement {
    props;
    constructor() {
        super();
        this.visible = this.hasAttribute('visible');
    }

    static get observedAttributes() {
        return ['visible'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.visible = this.hasAttribute('visible');
        this.render();
    }

    render() {
        this.innerHTML = null;

        if (this.visible) {
            const done = document.createElement('button');
            done.className = 'border border-primary px-4 py-2 backdrop-blur-md bg-primary-transparent rounded-lg items-center justify-center flex';

            const h6 = document.createElement('h6');
            h6.className = 'text-center';
            h6.innerText = 'Finish';
            this.append(done);
        }
    }
}
customElements.define("done-button", done);