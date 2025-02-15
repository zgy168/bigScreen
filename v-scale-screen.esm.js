import e from "vue";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(e, t, n, i) {
  return new (n || (n = Promise))((function (r, o) {
    function a(e) {
      try {
        c(i.next(e))
      } catch (e) {
        o(e)
      }
    }

    function s(e) {
      try {
        c(i.throw(e))
      } catch (e) {
        o(e)
      }
    }

    function c(e) {
      var t;
      e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
        e(t)
      }))).then(a, s)
    }

    c((i = i.apply(e, t || [])).next())
  }))
}

function n(e, t) {
  var n, i, r, o, a = {
    label: 0, sent: function () {
      if (1 & r[0]) throw r[1];
      return r[1]
    }, trys: [], ops: []
  };
  return o = {next: s(0), throw: s(1), return: s(2)}, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
    return this
  }), o;

  function s(o) {
    return function (s) {
      return function (o) {
        if (n) throw new TypeError("Generator is already executing.");
        for (; a;) try {
          if (n = 1, i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) return r;
          switch (i = 0, r && (o = [2 & o[0], r.value]), o[0]) {
            case 0:
            case 1:
              r = o;
              break;
            case 4:
              return a.label++, {value: o[1], done: !1};
            case 5:
              a.label++, i = o[1], o = [0];
              continue;
            case 7:
              o = a.ops.pop(), a.trys.pop();
              continue;
            default:
              if (!(r = a.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                a = 0;
                continue
              }
              if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                a.label = o[1];
                break
              }
              if (6 === o[0] && a.label < r[1]) {
                a.label = r[1], r = o;
                break
              }
              if (r && a.label < r[2]) {
                a.label = r[2], a.ops.push(o);
                break
              }
              r[2] && a.ops.pop(), a.trys.pop();
              continue
          }
          o = t.call(e, a)
        } catch (e) {
          o = [6, e], i = 0
        } finally {
          n = r = 0
        }
        if (5 & o[0]) throw o[1];
        return {value: o[0] ? o[1] : void 0, done: !0}
      }([o, s])
    }
  }
}

var i = e.extend({
  name: "VScaleScreen",
  props: {
    width: {type: [String, Number], default: 1920},
    height: {type: [String, Number], default: 1080},
    fullScreen: {type: Boolean, default: !1},
    autoScale: {type: [Object, Boolean], default: !0},
    delay: {type: Number, default: 500},
    boxStyle: {
      type: Object, default: function () {
        return {}
      }
    },
    wrapperStyle: {
      type: Object, default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {currentWidth: 0, currentHeight: 0, originalWidth: 0, originalHeight: 0, onResize: null, observer: null}
  },
  methods: {
    initSize: function () {
      var e = this;
      return new Promise((function (t) {
        e.$nextTick((function () {
          if (e.width && e.height) e.currentWidth = e.width, e.currentHeight = e.height; else {
            var n = e.$refs.screenWrapper;
            e.currentWidth = null == n ? void 0 : n.clientWidth, e.currentHeight = null == n ? void 0 : n.clientHeight
          }
          e.originalHeight && e.originalWidth || (e.originalWidth = window.screen.width, e.originalHeight = window.screen.height), t()
        }))
      }))
    }, updateSize: function () {
      var e = this.$refs.screenWrapper;
      this.currentWidth && this.currentHeight ? (e.style.width = "".concat(this.currentWidth, "px"), e.style.height = "".concat(this.currentHeight, "px")) : (e.style.width = "".concat(this.originalWidth, "px"), e.style.height = "".concat(this.originalHeight, "px"))
    }, handleAutoScale: function (e) {
      if (this.autoScale) {
        var t = this.$refs.screenWrapper, n = t.clientWidth, i = t.clientHeight, r = document.body.clientWidth,
          o = document.body.clientHeight;
        var xScale = document.body.clientWidth / +(this.currentWidth || this.originalWidth)
        t.style.transform = "scale(".concat(xScale, ",").concat(e, ")");
        var a = Math.max((r - n * e) / 2, 0), s = Math.max((o - i * e) / 2, 0);
        "object" == typeof this.autoScale && (!this.autoScale.x && (a = 0), !this.autoScale.y && (s = 0))
      }
    }, updateScale: function () {
      var e = this.$refs.screenWrapper, t = document.body.clientWidth, n = document.body.clientHeight,
        i = t / +(this.currentWidth || this.originalWidth), r = n / +(this.currentHeight || this.originalHeight);
      if (this.fullScreen) return e.style.transform = "scale(".concat(i, ",").concat(r, ")"), !1;
      var o = Math.min(i, r);
      this.handleAutoScale(o)
    }, initMutationObserver: function () {
      var e = this, t = this.$refs.screenWrapper;
      (this.observer = new MutationObserver((function () {
        var t;
        null === (t = e.onResize) || void 0 === t || t.call(e)
      }))).observe(t, {attributes: !0, attributeFilter: ["style"], attributeOldValue: !0})
    }
  },
  mounted: function () {
    var e, i, r, o = this;
    this.onResize = (e = function () {
      return t(o, void 0, void 0, (function () {
        return n(this, (function (e) {
          switch (e.label) {
            case 0:
              return [4, this.initSize()];
            case 1:
              return e.sent(), this.updateSize(), this.updateScale(), [2]
          }
        }))
      }))
    }, i = this.delay, function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      r && clearTimeout(r), r = setTimeout((function () {
        "function" == typeof e && e.apply(null, t), clearTimeout(r)
      }), i > 0 ? i : 100)
    }), this.$nextTick((function () {
      return t(o, void 0, void 0, (function () {
        return n(this, (function (e) {
          switch (e.label) {
            case 0:
              return [4, this.initSize()];
            case 1:
              return e.sent(), this.updateSize(), this.updateScale(), window.addEventListener("resize", this.onResize), this.initMutationObserver(), [2]
          }
        }))
      }))
    }))
  },
  beforeDestroy: function () {
    var e;
    window.removeEventListener("resize", this.onResize), null === (e = this.observer) || void 0 === e || e.disconnect()
  }
});

function r(e, t, n, i, r, o, a, s, c, l) {
  "boolean" != typeof a && (c = s, s = a, a = !1);
  const u = "function" == typeof n ? n.options : n;
  let d;
  if (e && e.render && (u.render = e.render, u.staticRenderFns = e.staticRenderFns, u._compiled = !0, r && (u.functional = !0)), i && (u._scopeId = i), o ? (d = function (e) {
    (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), t && t.call(this, c(e)), e && e._registeredComponents && e._registeredComponents.add(o)
  }, u._ssrRegister = d) : t && (d = a ? function (e) {
    t.call(this, l(e, this.$root.$options.shadowRoot))
  } : function (e) {
    t.call(this, s(e))
  }), d) if (u.functional) {
    const e = u.render;
    u.render = function (t, n) {
      return d.call(n), e(t, n)
    }
  } else {
    const e = u.beforeCreate;
    u.beforeCreate = e ? [].concat(e, d) : [d]
  }
  return n
}

const o = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function a(e) {
  return (e, t) => function (e, t) {
    const n = o ? t.media || "default" : e, i = c[n] || (c[n] = {ids: new Set, styles: []});
    if (!i.ids.has(e)) {
      i.ids.add(e);
      let n = t.source;
      if (t.map && (n += "\n/*# sourceURL=" + t.map.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) + " */"), i.element || (i.element = document.createElement("style"), i.element.type = "text/css", t.media && i.element.setAttribute("media", t.media), void 0 === s && (s = document.head || document.getElementsByTagName("head")[0]), s.appendChild(i.element)), "styleSheet" in i.element) i.styles.push(n), i.element.styleSheet.cssText = i.styles.filter(Boolean).join("\n"); else {
        const e = i.ids.size - 1, t = document.createTextNode(n), r = i.element.childNodes;
        r[e] && i.element.removeChild(r[e]), r.length ? i.element.insertBefore(t, r[e]) : i.element.appendChild(t)
      }
    }
  }(e, t)
}

let s;
const c = {};
var l = r({
  render: function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("section", {staticClass: "screen-box", style: e.boxStyle}, [n("div", {
      ref: "screenWrapper",
      staticClass: "screen-wrapper",
      style: e.wrapperStyle
    }, [e._t("default")], 2)])
  }, staticRenderFns: []
}, (function (e) {
  e && e("data-v-6889bdc7_0", {
    source: ".screen-box[data-v-6889bdc7]{overflow:hidden;background-size:100% 100%;background:#000;width:100vw;height:100vh}.screen-box .screen-wrapper[data-v-6889bdc7]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.5s;position:relative;overflow:hidden;z-index:100;transform-origin:left top}",
    map: void 0,
    media: void 0
  })
}), i, "data-v-6889bdc7", false, undefined, !1, a, void 0, void 0);
console.log("-> component", l);
var u = function () {
  var e = l;
  return e.install = function (t) {
    t.component("VScaleScreen", e)
  }, e
}();
export {u as default};
