!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react-redux"),require("lodash.set"),require("lodash.get")):"function"==typeof define&&define.amd?define(["exports","react-redux","lodash.set","lodash.get"],t):t((e=e||self).useReduxState={},e.reactRedux,e.set,e._get)}(this,function(e,t,n,r){n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n,r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r,e.asyncMiddleware=function(e){return function(t){return function(n){try{var u=t(n),a=r(n,"meta.async"),o=function(){if(a){var t=e.dispatch,u=e.getState;return Promise.resolve(a({payload:n.payload,set:function(e,n,r){t({type:r||"SET["+e+"]",payload:n,meta:{path:e}})},get:function(e){var t=u();return r(t,e)}})).then(function(){})}}();return Promise.resolve(o&&o.then?o.then(function(){return u}):u)}catch(e){return Promise.reject(e)}}}},e.createReducer=function(e){return function(t,u){void 0===t&&(t=e);var a=r(u,"meta.path");return a?n(t,a,u.payload):t}},e.useAsync=function(e){var n=e.type,r=e.effect,u=t.useDispatch();return function(e){return u({type:n,payload:e,meta:{async:r}})}},e.useRedux=function(e,n){var u=t.useSelector(function(t){return r(t,e)}),a=t.useDispatch(),o=n||"SET["+e+"]";return[u,function(t){return a({type:o,payload:t,meta:{path:e}})}]},e.useReduxSetter=function(e,n){var r=t.useDispatch(),u=n||"SET["+e+"]";return function(t){return r({type:u,payload:t,meta:{path:e}})}},e.useReduxValue=function(e){return t.useSelector(function(t){return r(t,e)})}});
//# sourceMappingURL=use-redux-state.umd.js.map
