// 왼쪽 영역 컴포넌트들 
var tabComponent = {
  template: `
  <div class="tabs is-centered">
      <ul>
          <li class="is-active">
              <a>조직</a>
          </li>
          <li>
              <a>커뮤니티</a>
          </li>
          <li>
              <a>대화방</a>
          </li>
      </ul>
  </div>
  `
}

var tabContentListComponent = {
  template: `
    <div>
      <ul style="">
          <li style="padding: .30rem .60rem;">
              <figure class="image is-32x32" style="display:inline-block;">
                  <img style="border-radius:50%;" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <p style="display: inline-block;vertical-align: top;height: 32px;font-size: 1.2rem;padding-top: 3px;width:80%;">타이거컴퍼니</p>
          </li>
          <li style="padding: .30rem .60rem;">
              <figure class="image is-32x32" style="display:inline-block;">
                  <img style="border-radius:50%;" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <p style="display: inline-block;vertical-align: top;height: 32px;font-size: 1.2rem;padding-top: 3px;width:80%;">티그리스사업부</p>
          </li>
          <li style="padding: .30rem .60rem;">
              <figure class="image is-32x32" style="display:inline-block;">
                  <img style="border-radius:50%;" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <p style="display: inline-block;vertical-align: top;height: 32px;font-size: 1.2rem;padding-top: 3px;width:80%;">TS팀</p>
          </li>
          <li style="padding: .30rem .60rem;">
              <figure class="image is-32x32" style="display:inline-block;">
                  <img style="border-radius:50%;" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <p style="display: inline-block;vertical-align: top;height: 32px;font-size: 1.2rem;padding-top: 3px;width:80%;">알앤디</p>
          </li>
      </ul>    
    </div>
  `
}

var leftAreaComponent = {
  template: `
  <div class="column is-3 left-area">
    <tab-component />
    <list-component />
  </div>
  `,
  components: {
    'tabComponent': tabComponent,
    'listComponent': tabContentListComponent
  }
}