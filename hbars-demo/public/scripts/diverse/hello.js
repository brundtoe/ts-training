"use strict";
class MyClass {
    render(divId, text) {
        const el = document.getElementById(divId);
        if (el) {
            el.innerText = text;
        }
    }
}
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    const myClass = new MyClass();
    myClass.render('content', "Hello Jackie");
});
