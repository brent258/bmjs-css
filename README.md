# bmjs-css
A JavaScript library for generating static CSS.
```javascript
const css = require('bmjs-css');
```
Start a new CSS stylesheet:
```javascript
css.init();
```
Perform a full reset and add a Bootstrap-style grid with an optional breakpoint ('sm','md','lg','xl'):
```javascript
css.reset();
css.grid('md');
```
Add rules with the **css.tag()** object and chain multiple convenience CSS property methods with an optional breakpoint, then use the **css.tag.close()** method to finalize:
```javascript
let h1 = css.tag('h1').c('#fff').m('15px','md').fontSize('2em').close();
```
Use the **css.add()** method to add the tag to the style sheet and media queries for each breakpoint will be added:
```javascript
css.add(h1);
```
Create animations with **css.keys()**, the first argument is the name, and following arguments are **css.tag()** objects:
```javascript
css.keys('myAnimation', css.tag('from, to').w('100%').close(), css.tag('50%').w('0%').close());
```
When you're finished compress and save:
```javascript
css.minify();
css.file('style.css');
```
