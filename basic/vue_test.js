// vm 은 ViewModel 을 뜻한다. (관행적인 코딩 컨벤션)
var vm = new Vue({
    // options
});

// ---------------------------------------------------- //

// options : data, template, el, methods, life cycle callback등
var vm2 = new Vue({
    template: '<div>ddd</div>',
    el: '#app2',
    methods: {
    },
    // ...
});

// ---------------------------------------------------- //

// 각 options 으로 미리 정의한 vue 객체를 확장하여 재사용이 가능하다.
var MyComponent = Vue.extend({
    // template, el, methods 와 같은 options 정의
});
// 위에서 정의한 options 를 기본으로 하는 컴포넌트 생성
var myComponentInstance = new MyComponent();

// ---------------------------------------------------- //

// Vue 객체가 생성될 때 아래의 초기화 작업을 수행한다.
// 1.데이터 관찰
// 2.템플릿 컴파일
// 3.DOM 에 객체 연결
// 4.데이터 변경시 DOM 업데이트
// 이 초기화 작업 외에도 개발자가 의도하는 커스텀 로직을 아래와 같이 추가할 수 있다.
var vm3 = new Vue({
    data: {
        a: 1
    },
    created: function () {
        // this 는 vm3 을 가리킴
        console.log('a is: ' + this.a)
    }
})
// 라이프싸이클 단계에 따라 mounted, updated, destroyed 등을 사용할 수 있다. 
// 이 라이프싸이클 초기화 메서드로 커스텀 로직을 수행하기 때문에 Vue 에서는 따로 Controller 를 갖고 있지 않다.

// ---------------------------------------------------- //

// Vue Component
// ! Vue 인스턴스를 생성하기전에 꼭 Component 부터 등록!
// 등록 (Global에 등록)
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
});
// Vue 인스턴스 생성
var vm4 = new Vue({
    el: '#app4'
});

// 컴포넌트의 data 속성은 꼭 함수로 작성해야한다.
// 아래 Vue 컴포넌트는 오류를 발생시킨다.
// Vue.component('my-component', {
//     data: {
//         message: 'hello'
//     }
// })
var data = {
    text: 'hello'
}
Vue.component('my-component', {
    data: function () {
        return data;
    }
    // 모든 컴포넌트가 같은 값을 공유하지 않게 아래와 같이 수정
    // data: function () {
    //   return {
    //     text: 'hello'
    //   }
    // }
})

// local에 Component 등록 
var cmp = {
    data: function () {
        return {
            // ...
        };
    },
    template: '<hr>',
    methods: {}
}
var vm5 = new Vue({
    components: {
        'my-cmp': cmp
    }
})

// ---------------------------------------------------- //
// 부모와 자식 컴포넌트 관계
//  구조상 상-하 관계에 있는 컴포넌트의 통신은
//      부모 -> 자식: props down
//      자식 -> 부모: events up

// Props
// 모든 컴포넌트는 각 컴포넌트 자체의 스코프를 갖는다.
//  예를 들어, 하위 컴포넌트가 상위 컴포넌트의 값을 바로 참조할 수 없는 형식
//  상위에서 하위로 값을 전달하려면 props 속성을 사용한다.
// 하위 컴포넌트 - 아래 상위 컴포넌트의 data 의 message 를 passedData 에 넘겨받음
Vue.component('child-component', {
    props: ['passedData'],
    template: '<p>{{ passedData }}</p>'
});

// 상위 컴포넌트
var app = new Vue({
    el: '#app5',
    data: {
        message: 'Hello Vue! from Parent Component',
    }
});
// 주의 할점 : js 에서 props 변수 명명을 카멜 기법(aBow)으로 하면 html 에서 접근은 케밥 기법(-) 으로 가야한다.

// 같은 레벨의 컴포넌트 간 통신
//  동일한 상위 컴포넌트를 가진 2 개의 하위 컴포넌트 간의 통신은
//      Child(하위) - > Parent(상위) - > 다시 2 개의 Children(하위)
//  순으로 이루어진다.컴포넌트 간의 직접적인 통신은 불가능하도록 되어 있는게 Vue 의 기본 구조

// EventBus
// Non Parent - Child 컴포넌트 간의 통신을 위해 Event Bus 를 활용할 수 있다.
const eventBus = new Vue();
var childVm = new Vue({
    methods: {
        init() {
            debugger;
            eventBus.$emit('refresh', 10);
        }
    },
});
var parentVm = new Vue({
    methods: {
        callAnyMethod() {
            // ...
        }
    },
    created() {
        var self = this;
        eventBus.$on('refresh', function (data) {
            console.log('on : '+this); // this 는 빈 Vue 인스턴스를 접근
            self.callAnyMethod() // self 는 이 created 의 Vue 컴포넌트에 접근, 따라서 이 컴포넌트에 미리 선언된 메서드에 접근 가능
        });
    }
});

// ---------------------------------------------------- //

// Vue Routers : Vue 를 이용한 SPA 를 제작할 때 유용한 라우팅 라이브러리
// Vue Resource : Vue 에서 HTTP 통신을 위해 제공하는 플러그인
// https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/ 참고


// Vue Templates
//  Vue 는 DOM 의 요소와 Vue 인스턴스를 매핑할 수 있는 HTML Template 을 사용. 
//  Vue 는 template 으로 렌더링 할 때 Virtual DOM 을 사용하여 DOM 조작을 최소화 하고 렌더링을 꼭 다시 해야만 하는 요소를 계산하여 성능 부하를 최소화. 
//  원하면 render function 을 직접 구현하여 사용할 수 있음

// Attributes: HTML Attirubtes를 Vue 의 변수와 연결할 때는 v-bind 를 이용
//  <div v-bind:id="dynamicId"></div>

// JS Expressions : “{{ }}” 안에 다음과 같이 javascript 표현식도 가능하다.
// <div>{{ number + 1 }}</div>
// <div>{{ message.split('').reverse().join('') }}</div>

// Directives : v- 접두사를 붙인 attributes 로, javascript 표현식으로 값을 나타내는게 일반적이다. : 을 붙여 인자를 받아 취급할 수 있다
//  <p v-if="seen">Now you see me</p>
//  <!-- : 뒤에 선언한 href 인자를 받아 url 값이랑 매핑-- >
//  <a v-bind:href="url"></a>
//  <!--click 이라는 이벤트를 받아 Vue 에 넘겨준다. -- >
//  <a v-on:click="doSomething">

// Filters : 화면에 표시되는 텍스트의 형식을 편하게 바꿀 수 있도록 고안된 기능이며, | 을 이용하여 여러 개의 필터를 적용할 수 있다.

// <!-- message 에 표시될 문자에 capitalize 필터를 적용하여 첫 글자를 대문자로 변경한다. -->
// { { message | capitalize } }
var tempVm = new Vue({
    // ...
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})


// ---------------------------------------------------- //
// Data Binding
//  Vue 가 DOM 기반 HTMl Template 에 Vue 데이터를 바인딩 하는 방법은 아래와 같이 크게 3가지가 있다.
//      1.Interpolation (값 대입) : Vue 의 가장 기본적인 데이터 바인딩 체계는 Mustache {{ }} 를 따른다.
//      2.Binding Expressions(값 연결) 
//          : ”{{ }}” 를 이용한 데이터 바인딩을 할 때 자바스크립트 표현식을 사용할 수 있다.
//          : Vue 에 내장된 Filter 를 `` 안에 사용할 수 있다. 여러개 필터 체인 가능
//      3.Directives(디렉티브 사용) 
//          : Vue 에서 제공하는 특별한 Attributes 이며 -v 의 prefix (접두사) 를 갖는다.
//          : 자바스크립트 표현식, filter 모두 적용된다.

// Class Binding
// CSS 스타일링을 위해서 class 를 아래 2가지 방법으로 추가가 가능하다.
//  1.class = "{{ className }}"
//    2.v - bind: class
// 주의할 점은 위의 두 방법을 함께 사용하지 않고 한 가지만 적용해야 에러를 미연에 방지할 수 있다.
// 아래와 같이 class 속성과 v - bind: class 속성을 동시에 사용해도 된다. : <div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
// Array 구문도 사용할 수 있다. : <div v-bind:class="[classA, classB]">


// ---------------------------------------------------- //
// Single File Components with JSX(ES6)
//  앱의 복잡도가 증가할 때, .vue 라는 파일 단위 안에 html, js, css 를 관리할 수 있는 방법
//  .vue 파일을 브라우저가 렌더할 수 있는 파일들로 변환하려면 webpack 의 vue-loader 또는 browserify 필요
// Vue Loader
//  Vue Loader 로 인해 얻게 되는 장점
//      1. ES6 지원
//      2. <style> 과 <template> 에 대한 각각의 webpack loader 지원. ex) sass, jade
//      3. 각 .vue 컴포넌트의 스코프로 좁힌 css 스타일링 지원
//      4. webpack 의 모듈 번들링에 대한 지원과 의존성 관리가 제공
//      5. 개발 시 hot reloading 지원

// ---------------------------------------------------- //
// Vue Development Workflow
//  - vue cli 로 간단한 webpack 설정이 되어 있는 프로젝트 생성이 가능하다.
/*
    npm install -global vue-cli
    vue init webpack-simple
    npm install
    npm run dev
*/
