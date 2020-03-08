---
[![npm version](https://badge.fury.io/js/malta-css-uglify.svg)](http://badge.fury.io/js/malta-css-uglify)
[![npm downloads](https://img.shields.io/npm/dt/malta-css-uglify.svg)](https://npmjs.org/package/malta-css-uglify)
[![npm downloads](https://img.shields.io/npm/dm/malta-css-uglify.svg)](https://npmjs.org/package/malta-css-uglify)  
---  

This plugin can be used on: **.css** files and on **.less** and **.scss** files after using the right plugin  

Options : all options of the [uglifycss package](https://www.npmjs.com/package/uglifycss)

Sample usage:  
```
malta app/source/style.css public/css -plugins=malta-css-uglify[maxLineLen:100,uglyComments:true]
```
or in the .json file :
```
"app/source/style.css" : "public/css -plugins=malta-css-uglify",
"app/source/hi.less" : "public/css -plugins=malta-less...malta-css-uglify",
"app/source/app.scss" : "public/css -plugins=malta-sass...malta-css-uglify"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/style.css',
    'public/css',
    '-plugins=malta-coffeescript',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```