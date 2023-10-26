class back extends HTMLElement {
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
        this.setAttribute('id', 'back');
    }

    attributeChangedCallback() {
        this.visible = this.hasAttribute('visible');
        this.render();
    }

    render() {
        this.innerHTML = null;

        if (this.visible) {
            const btn = document.createElement('button');
            btn.className = 'hover:scale-[105%] transition-transform backdrop-blur-md w-10 h-10 rounded-full bg-primary-transparent flex items-center justify-center text-3xl border border-primary hover:scale-[105%] transition-transform fixed top-6 left-6';
            btn.addEventListener('click', () => {
                const current = this.props.pages.findIndex((e) => e === this.props.page);
                this.props.setPage(this.props.pages[current - 1]);
                this.props.setPlaying(false);
            })

            const i = document.createElement('i');
            i.className = 'ri-arrow-go-back-line';
            btn.append(i);
            this.append(btn);
        }
    }
}
customElements.define("back-button", back);