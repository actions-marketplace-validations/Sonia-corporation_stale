parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Vcky":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LoggerFormatService=void 0;const t=require("tslib"),r=(0,t.__importDefault)(require("ansi-styles"));class e{static whiteBright(t){return this._format(t,"whiteBright")}static yellowBright(t){return this._format(t,"yellowBright")}static magenta(t){return this._format(t,"magenta")}static cyan(t){return this._format(t,"cyan")}static yellow(t){return this._format(t,"yellow")}static white(t){return this._format(t,"white")}static green(t){return this._format(t,"green")}static red(t){return this._format(t,"red")}static blue(t){return this._format(t,"blue")}static bold(t){return this._format(t,"bold")}static _format(t,e){return`${r.default[e].open}${t}${r.default[e].close}`}}exports.LoggerFormatService=e;
},{}],"AHx2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createLink=void 0;const e=require("tslib"),t=(0,e.__importDefault)(require("terminal-link"));function r(e,r){return(0,t.default)(e,r)}exports.createLink=r;
},{}],"Lg13":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createInputLink=void 0;const e=require("./create-link");function t(t){return(0,e.createLink)(t,`https://github.com/@sonia-corporation/stale#${t}`)}exports.createInputLink=t;
},{"./create-link":"AHx2"}],"egcv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LoggerService=void 0;const e=require("tslib"),r=require("./logger-format.service"),t=require("../link/create-input-link"),i=(0,e.__importDefault)(require("@actions/core"));class o{static debug(...e){return i.default.debug(r.LoggerFormatService.whiteBright(e.join(" "))),this}static notice(...e){return i.default.notice(r.LoggerFormatService.whiteBright(e.join(" "))),this}static warning(...e){return i.default.warning(r.LoggerFormatService.whiteBright(e.join(" "))),this}static error(...e){return i.default.error(r.LoggerFormatService.whiteBright(e.join(" "))),this}static group(t,o){return(0,e.__awaiter)(this,void 0,void 0,function*(){return i.default.group(r.LoggerFormatService.whiteBright(t),o)})}static startGroup(e){return i.default.startGroup(r.LoggerFormatService.whiteBright(e)),this}static endGroup(){return i.default.endGroup(),this}static input(e){return r.LoggerFormatService.magenta((0,t.createInputLink)(e))}}exports.LoggerService=o;
},{"./logger-format.service":"Vcky","../link/create-input-link":"Lg13"}],"whzF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InputsService=void 0;const e=require("tslib"),t=require("../../utils/logger/logger-format.service"),r=require("../../utils/logger/logger.service"),i=(0,e.__importDefault)(require("@actions/core")),u=(0,e.__importDefault)(require("lodash"));class s{static initialize(){return s.setInputs(),this}static setInputs(){return s.inputs={githubToken:i.default.getInput("github-token",{required:!0})},s.inputs}static logInputs(){return r.LoggerService.startGroup("Inputs"),u.default.forEach(this.inputs,(e,i)=>{r.LoggerService.debug(t.LoggerFormatService.white("├──"),r.LoggerService.input(u.default.kebabCase(i)),t.LoggerFormatService.cyan(e))}),r.LoggerService.endGroup(),s}}exports.InputsService=s,s.inputs=void 0;
},{"../../utils/logger/logger-format.service":"Vcky","../../utils/logger/logger.service":"egcv"}],"T7j8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.StaleService=void 0;const e=require("./inputs/inputs.service");class i{static initialize(){return e.InputsService.initialize(),this}}exports.StaleService=i;
},{"./inputs/inputs.service":"whzF"}],"ZCfc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./core/stale.service");function i(){e.StaleService.initialize()}i();
},{"./core/stale.service":"T7j8"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.js.map