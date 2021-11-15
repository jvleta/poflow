import { css, html, LitElement } from 'https://unpkg.com/lit-element?module';

class FooterWrapper extends LitElement {
    static styles = css `
    :host {
        flex-shrink: 0;
        text-align: center;
      }
    `;

    render() {
        return html `
          <footer>
            <slot></slot>
          </footer>
        `;
    }
}

export default FooterWrapper;