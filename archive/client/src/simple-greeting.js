import { css, html, LitElement } from 'https://unpkg.com/lit-element?module';

class SimpleGreeting extends LitElement {
    static styles = css `p { color: blue }`;
    static properties = {
        name: { type: String },
    };

    constructor() {
        super();
        this.name = 'Somebody';
    }

    render() {
        return html `<p>Hello, ${this.name}!</p>`;
    }
}

export default SimpleGreeting;