var booton = new Button();
var renderFn = booton.render;

// bind is a method on a function object that return a function
// with "this" bound and (optionally) some argumens replaced

var boundRenderFn = renderFn.bind(booton);

document.body.appendChild(boundRenderFn());
