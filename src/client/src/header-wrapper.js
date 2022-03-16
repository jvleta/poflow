import { css, html, LitElement } from 'https://unpkg.com/lit-element?module';

class HeaderWrapper extends LitElement {
    static styles = css `
    .header {
      text-align: center;
      color: black;
      font-size: 14px;
      border-bottom-style: solid;
      border-bottom-color: black;
      }
    `;

    render() {
        return html `
 <div class="header">
  <h1>PoFlow</h1>
  <p>Potential Flow solutions made easy</p>
</div> 
        `;
    }
}

export default HeaderWrapper;