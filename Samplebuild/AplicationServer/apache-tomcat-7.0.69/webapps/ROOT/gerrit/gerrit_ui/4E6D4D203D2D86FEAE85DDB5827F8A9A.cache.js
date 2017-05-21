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
(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],g):g(CodeMirror)})(function(g){function n(f){return new RegExp("^(("+f.join(")|(")+"))\\b")}function f(f){return f.scopes[f.scopes.length-1]}var x=n(["and","or","not","is"]),r="as assert break class continue def del elif else except finally for from global if import lambda pass raise return try while with yield in".split(" "),s="abs all any bin bool bytearray callable chr classmethod compile complex delattr dict dir divmod enumerate eval filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip __import__ NotImplemented Ellipsis __debug__".split(" "),
y="apply basestring buffer cmp coerce execfile file intern long raw_input reduce reload unichr unicode xrange False True None".split(" "),z=["exec","print"],A=["ascii","bytes","exec","print"],B="nonlocal False True None async await".split(" ");g.registerHelper("hintWords","python",r.concat(s));g.defineMode("python",function(q,e){function m(a,b){if(a.sol()&&"py"==f(b).type){var c=f(b).offset;if(a.eatSpace()){var d=a.indentation();d>c?p(a,b,"py"):d<c&&t(a,b)&&(b.errorToken=!0);return null}d=u(a,b);
0<c&&t(a,b)&&(d+=" error");return d}return u(a,b)}function u(a,b){if(a.eatSpace())return null;if("#"==a.peek())return a.skipToEnd(),"comment";if(a.match(/^[0-9\.]/,!1)){var c=!1;a.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)&&(c=!0);a.match(/^\d+\.\d*/)&&(c=!0);a.match(/^\.\d+/)&&(c=!0);if(c)return a.eat(/J/i),"number";c=!1;a.match(/^0x[0-9a-f]+/i)&&(c=!0);a.match(/^0b[01]+/i)&&(c=!0);a.match(/^0o[0-7]+/i)&&(c=!0);a.match(/^[1-9]\d*(e[\+\-]?\d+)?/)&&(a.eat(/J/i),c=!0);a.match(/^0(?![\dx])/i)&&(c=!0);if(c)return a.eat(/L/i),
"number"}if(a.match(v))return b.tokenize=C(a.current()),b.tokenize(a,b);if(a.match(D)||a.match(E))return null;if(a.match(F)||a.match(w))return"operator";if(a.match(G))return null;if(a.match(H)||a.match(x))return"keyword";if(a.match(I))return"builtin";if(a.match(/^(self|cls)\b/))return"variable-2";if(a.match(l))return"def"==b.lastToken||"class"==b.lastToken?"def":"variable";a.next();return"error"}function C(a){function b(b,f){for(;!b.eol();)if(b.eatWhile(/[^'"\\]/),b.eat("\\")){if(b.next(),c&&b.eol())return"string"}else{if(b.match(a))return f.tokenize=
m,"string";b.eat(/['"]/)}if(c){if(e.singleLineStringErrors)return"error";f.tokenize=m}return"string"}for(;0<="rub".indexOf(a.charAt(0).toLowerCase());)a=a.substr(1);var c=1==a.length;b.isString=!0;return b}function p(a,b,c){var d=0,e=null;if("py"==c)for(;"py"!=f(b).type;)b.scopes.pop();d=f(b).offset+("py"==c?q.indentUnit:J);"py"==c||a.match(/^(\s|#.*)*$/,!1)||(e=a.column()+1);b.scopes.push({offset:d,type:c,align:e})}function t(a,b){for(var c=a.indentation();f(b).offset>c;){if("py"!=f(b).type)return!0;
b.scopes.pop()}return f(b).offset!=c}function K(a,b){var c=b.tokenize(a,b),d=a.current();if("."==d)return c=a.match(l,!1)?null:"error",null==c&&"meta"==b.lastStyle&&(c="meta"),c;if("@"==d)return e.version&&3==parseInt(e.version,10)?a.match(l,!1)?"meta":"operator":a.match(l,!1)?"meta":"error";"variable"!=c&&"builtin"!=c||"meta"!=b.lastStyle||(c="meta");if("pass"==d||"return"==d)b.dedent+=1;"lambda"==d&&(b.lambda=!0);":"!=d||b.lambda||"py"!=f(b).type||p(a,b,"py");var g=1==d.length?"[({".indexOf(d):
-1;-1!=g&&p(a,b,"])}".slice(g,g+1));g="])}".indexOf(d);if(-1!=g)if(f(b).type==d)b.scopes.pop();else return"error";0<b.dedent&&a.eol()&&"py"==f(b).type&&(1<b.scopes.length&&b.scopes.pop(),--b.dedent);return c}var G=e.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.]/,F=e.doubleOperators||/^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(\/\/)|(\*\*))/,E=e.doubleDelimiters||/^((\+=)|(\-=)|(\*=)|(%=)|(\/=)|(&=)|(\|=)|(\^=))/,D=e.tripleDelimiters||/^((\/\/=)|(>>=)|(<<=)|(\*\*=))/;if(e.version&&3==parseInt(e.version,10))var w=
e.singleOperators||/^[\+\-\*/%&|\^~<>!@]/,l=e.identifiers||RegExp("^[_A-Za-z\u00a1-\uffff][_A-Za-z0-9\u00a1-\uffff]*");else w=e.singleOperators||/^[\+\-\*/%&|\^~<>!]/,l=e.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;var J=e.hangingIndent||q.indentUnit,h=r,k=s;void 0!=e.extra_keywords&&(h=h.concat(e.extra_keywords));void 0!=e.extra_builtins&&(k=k.concat(e.extra_builtins));if(e.version&&3==parseInt(e.version,10))var h=h.concat(B),k=k.concat(A),v=/^(([rb]|(br))?('{3}|"{3}|['"]))/i;else h=h.concat(z),k=k.concat(y),
v=/^(([rub]|(ur)|(br))?('{3}|"{3}|['"]))/i;var H=n(h),I=n(k);return{startState:function(a){return{tokenize:m,scopes:[{offset:a||0,type:"py",align:null}],lastStyle:null,lastToken:null,lambda:!1,dedent:0}},token:function(a,b){var c=b.errorToken;c&&(b.errorToken=!1);var d=K(a,b);b.lastStyle=d;var e=a.current();e&&d&&(b.lastToken=e);a.eol()&&b.lambda&&(b.lambda=!1);return c?d+" error":d},indent:function(a,b){if(a.tokenize!=m)return a.tokenize.isString?g.Pass:0;var c=f(a),d=b&&b.charAt(0)==c.type;return null!=
c.align?c.align-(d?1:0):d&&1<a.scopes.length?a.scopes[a.scopes.length-2].offset:c.offset},closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"}});g.defineMIME("text/x-python","python");g.defineMIME("text/x-cython",{name:"python",extra_keywords:"by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE".split(" ")})});