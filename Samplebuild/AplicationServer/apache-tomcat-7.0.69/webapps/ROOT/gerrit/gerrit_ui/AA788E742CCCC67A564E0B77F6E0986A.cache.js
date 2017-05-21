/*

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("stex",function(){function e(a){a=a.cmdState;for(var b=a.length-1;0<=b;b--){var c=a[b];if("DEFAULT"!=c.name)return c}return{styleIdentifier:function(){return null}}}function h(a,b,c){return function(){this.name=a;this.bracketNo=0;this.style=b;this.styles=c;this.argument=null;this.styleIdentifier=
function(){return this.styles[this.bracketNo-1]||null};this.openBracket=function(){this.bracketNo++;return"bracket"};this.closeBracket=function(){}}}function k(a,b){a.f=b}function g(a,b){var c;if(a.match(/^\\[a-zA-Z@]+/))return c=a.current().slice(1),c=f[c]||f.DEFAULT,c=new c,b.cmdState.push(c),b.f=m,c.style;if(a.match(/^\\[$&%#{}_]/)||a.match(/^\\[,;!\/\\]/))return"tag";if(a.match("\\["))return k(b,function(a,b){return l(a,b,"\\]")}),"keyword";if(a.match("$$"))return k(b,function(a,b){return l(a,
b,"$$")}),"keyword";if(a.match("$"))return k(b,function(a,b){return l(a,b,"$")}),"keyword";var d=a.next();if("%"==d)return a.skipToEnd(),"comment";if("}"==d||"]"==d){if(c=0<b.cmdState.length?b.cmdState[b.cmdState.length-1]:null)c.closeBracket(d),b.f=m;else return"error";return"bracket"}if("{"==d||"["==d)return c=f.DEFAULT,c=new c,b.cmdState.push(c),"bracket";if(/\d/.test(d))return a.eatWhile(/[\w.%]/),"atom";a.eatWhile(/[\w\-_]/);c=e(b);"begin"==c.name&&(c.argument=a.current());return c.styleIdentifier()}
function l(a,b,c){if(a.eatSpace())return null;if(a.match(c))return b.f=g,"keyword";if(a.match(/^\\[a-zA-Z@]+/))return"tag";if(a.match(/^[a-zA-Z]+/))return"variable-2";if(a.match(/^\\[$&%#{}_]/)||a.match(/^\\[,;!\/]/)||a.match(/^[\^_&]/))return"tag";if(a.match(/^[+\-<>|=,\/@!*:;'"`~#?]/))return null;if(a.match(/^(\d+\.\d*|\d*\.\d+|\d+)/))return"number";b=a.next();return"{"==b||"}"==b||"["==b||"]"==b||"("==b||")"==b?"bracket":"%"==b?(a.skipToEnd(),"comment"):"error"}function m(a,b){var c=a.peek(),d;
if("{"==c||"["==c)return d=0<b.cmdState.length?b.cmdState[b.cmdState.length-1]:null,d.openBracket(c),a.eat(c),b.f=g,"bracket";if(/[ \t\r]/.test(c))return a.eat(c),null;b.f=g;(c=b.cmdState.pop())&&c.closeBracket();return g(a,b)}var f={};f.importmodule=h("importmodule","tag",["string","builtin"]);f.documentclass=h("documentclass","tag",["","atom"]);f.usepackage=h("usepackage","tag",["atom"]);f.begin=h("begin","tag",["atom"]);f.end=h("end","tag",["atom"]);f.DEFAULT=function(){this.name="DEFAULT";this.style=
"tag";this.styleIdentifier=this.openBracket=this.closeBracket=function(){}};return{startState:function(){return{cmdState:[],f:g}},copyState:function(a){return{cmdState:a.cmdState.slice(),f:a.f}},token:function(a,b){return b.f(a,b)},blankLine:function(a){a.f=g;a.cmdState.length=0},lineComment:"%"}});e.defineMIME("text/x-stex","stex");e.defineMIME("text/x-latex","stex")});
