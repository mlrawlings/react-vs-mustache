const fs = require("fs");
const benchmark = require("benchmark");
const mustache = require("mustache");
const react = require("react-dom/server");

const html = fs.readFileSync("./content.html", "utf8");
const vdom = require("./content.js");

var suite = new benchmark.Suite;

// add tests
suite.add('React VDOM', function() {
  react.renderToString(vdom);
})
.add('Mustache', function() {
  mustache.render(html, {});
})
.add('Mustache no template cache', function() {
  mustache.templateCache = undefined;
  mustache.render(html, {});
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();