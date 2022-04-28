class DomElement{
    constructor(children) {
        this.children = children;
    }
}

class DivElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('div constructor',this.children)
    }
    draw(){
        console.log('DivElement Class')
        const div = document.createElement('div')
        for (let key in this.attrs) {
            div.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                div.appendChild(document.createTextNode(child));
            }else{
                console.log('div child',child)
                div.appendChild(child);
            }
        }
        return div;
    }
}

class SpanElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('span constructor',this.children)
    }
    draw(){
        console.log('SpanElement Class')
        const span = document.createElement('span')
        for (let key in this.attrs) {
            span.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('span child',child)
                span.appendChild(document.createTextNode(child));
            }else{
                console.log('span child',child)
                span.appendChild(child);
            }
        }
        return span;
    }
}

class UlElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('ul constructor',this.children)
    }
    draw(){
        console.log('UlElement Class')
        const ul = document.createElement('ul')
        for (let key in this.attrs) {
            ul.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('ul child',child)
                ul.appendChild(document.createTextNode(child));
            }else{
                console.log('ul child',child)
                ul.appendChild(child);
            }
        }
        return ul;
    }
}

class InputElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('input constructor',this.children)
    }
    draw(){
        console.log('InputElement Class')
        const input = document.createElement('input')
        for (let key in this.attrs) {
            input.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('input child',child)
                input.appendChild(document.createTextNode(child));
            }else{
                console.log('input child',child)
                input.appendChild(child);
            }
        }
        return input;
    }
}

class LiElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('li constructor',this.children)
    }
    draw(){
        console.log('LiElement Class')
        const li = document.createElement('li')
        for (let key in this.attrs) {
            li.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('li child',child)
                li.appendChild(document.createTextNode(child));
            }else{
                console.log('li child',child)
                li.appendChild(child);
            }
        }
        return li;
    }
}

class BrElement extends DomElement {
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('br constructor',this.children)
    }
    draw(){
        console.log('BrElement Class')
        const br = document.createElement('br')
        for (let key in this.attrs) {
            br.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('br child',child)
                br.appendChild(document.createTextNode(child));
            }else{
                console.log('br child',child)
                br.appendChild(child);
            }
        }
        return br;
    }
}

class LabelElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('label constructor',this.children)
    }
    draw(){
        console.log('LabelElement Class')
        const label = document.createElement('label')
        for (let key in this.attrs) {
            label.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                console.log('label child',child)
                label.appendChild(document.createTextNode(child));
            }else{
                console.log('label child',child)
                label.appendChild(child);
            }
        }
        return label;
    }
}

class FormElement extends DomElement{
    constructor(children,attrs) {
        super();
        this.attrs = attrs;
        this.children = children;
        console.log('form constructor')
    }
    draw(){
        console.log('LabelElement Class')
        const form = document.createElement('label')
        for (let key in this.attrs) {
            form.setAttribute(key,this.attrs[key])
        }
        for (const child of this.children) {
            if(typeof child === 'string'){
                form.appendChild(document.createTextNode(child));
            }else{
                console.log('form child',child)
                form.appendChild(child);
            }
        }
        return form;
    }
}

let element;
function el(tag='',attrs={},...children){
    switch (tag) {
        case 'div':{
            console.log('div switch case')
            return new DivElement(children,attrs).draw()
        }
        case 'span':{
            console.log('span switch case')
            return new SpanElement(children,attrs).draw()
        }
        case 'input':{
            console.log('input switch case')
            return  new InputElement(children,attrs).draw();
        }
        case 'label':{
            console.log('label switch case')
            return new LabelElement(children,attrs).draw()
        }
        case 'li':{
            console.log('li switch case')
            return new LiElement(children,attrs).draw()
        }
        case 'ul':{
            console.log('ul switch case')
            return new UlElement(children,attrs).draw()
        }
        case 'br':{
            console.log('br switch case')
            return new BrElement(children,attrs).draw()
        }
        case 'form':{
            console.log('form switch case')
            return new FormElement(children,attrs).draw()
        }
        default:{
            console.log('Error in switch case')
            break;
        }
    }

}


/*
const tree =
    el("form", {action: '/some_action'}, [
        el("label", {for: 'name'}, "First name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
        el("br", {}, null),
        el("label", {for: 'last_name'}, "Last name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
        el("br", {}, null),
        el("input", {type: 'submit', value: Submit}, null),
    ]);*/
/*const tree =

el("div", {"class": "some_classname", "id": "some_id"},
    el("span", {}, 'hello')
);
 */

const tree =
    el("div", {},
        el("ul", {}, [
            el("li", {}, "Item 1"),
            el("li", {}, "Item 2"),
            el("li", {}, "Item 3")
        ])
    );
document.getElementById("root").appendChild(tree);

/*const tree =
    el("div", {"class": "some_classname", "id": "some_id"},[]);
*/
/*   Renders:
   <div id='root'>
     <div class="some_classname" id="some_id">
       <span>hello</span>
     </div>
   </div>







    Renders:
    <div id='root'>
      <div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
    Test case 3.
    const tree =
      el("form", {action: '/some_action'}, [
        el("label", {for: 'name'}, "First name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
        el("br", {}, null),
        el("label", {for: 'last_name'}, "Last name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
        el("br", {}, null),
        el("input", {type: 'submit', value: Submit}, null),
      ]);
    document.getElementById("root").appendChild(tree.draw());
    Renders:
    <div id='root'>
      <form action='/some_action'>
        <label for='name'>First name:</label><br>
        <input type="text" id="name" name="name" value="My name"><br>
        <label for='name'>Last name:</label><br>
        <input type="last_name" id="last_name" name="last_name" value="My second name"><br>
        <input type="submit" value="Submit">
      </div>
    </div>
   */
