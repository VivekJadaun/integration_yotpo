function EndlessScroll(e) {
    function t(e, t, n, r, s, a) {
        this.page = 1, this.per_page = e, this._controller = t, this.loader = n, this.inviewCallbackFunction = r, this.isButton = s, this.loadIndicator = a, this.isButton ? i.call(this) : o.call(this)
    }

    function i() {
        var t = this;
        e.addEventListener(this.loader, "click", function () {
            t.loadIndicator && (e.addClass(t.loader, "yotpo-hidden"), e.removeClass(t.loadIndicator, "yotpo-hidden")), t.inviewCallbackFunction.call(t)
        })
    }

    function n() {
        this.loadIndicator && (e.addClass(this.loadIndicator, "yotpo-hidden"), e.removeClass(this.loader, "yotpo-hidden"))
    }

    function o() {
        e.currentInview.register(this.loader, this.inviewCallbackFunction)
    }

    function r(e) {
        this.batchCallbackFunction(e), this.isButton ? n.call(this) : o.call(this)
    }
    return t.prototype.getNextPage = function (e, t) {
        this.batchCallbackFunction = t, this.page++, e.params || (e.params = {}), e.params.page = this.page, e.params.per_page = this.per_page, this._controller.getBatch(r.bind(this), [e])
    }, t.prototype.ignoreLoader = function (t) {
        t ? e.addClass(this.loader, "yotpo-ignore-inview") : e.removeClass(this.loader, "yotpo-ignore-inview")
    }, t
}

function Room(e) {
    this.me = e.me, this.signalServer = e.signalServer, this.iceServers = e.iceServers, this.id, this.signal, this.stream, this.peers = {}, this.channels = {}, this.handles = {}
}
Yotpo = function () {
        function e(t, i) {
            if (this.appKey = t, this.userSettings = i, this.widgets = [], this.shouldInitialize = !0, this.initialized = !1, this.allWidgetsReadyCallback = [], !this.userSettings.load_only_widgets_on_page || this.userSettings.load_css_async) {
                var n = y.call(this);
                n || v.call(this)
            }
            w.call(this), "undefined" != typeof yotpoTrackConversionData && (u.call(this), e.Libraries.Tracker.trackConversionOrder(t, yotpoTrackConversionData), this.shouldInitialize = !1)
        }

        function t() {
            var t = this;
            e.forEach(Object.keys(e.widgets), function (e) {
                S.call(t, e), l.call(t, e)
            })
        }

        function i() {
            var t = r(this.userSettings.testimonials),
                i = s.call(this, t, this.userSettings.load_css_async),
                a = this.userSettings.load_css_async;
            a ? e.loadScript(i, document.body, o.bind(this)) : n.call(this, i)
        }

        function n(t) {
            var i = this;
            e.ajax(t, function (t) {
                if (!t) return void e.safeConsole("Missing widgets data");
                var n = JSON.parse(t);
                a.call(i, n.JsContent, n.CssContent), o.call(i)
            })
        }

        function o() {
            t.call(this), this.getWidgets()
                .length > 0 && g.call(this)
        }

        function r(t) {
            var i = t ? ["testimonials"] : [];
            return e.forEach(Object.keys(e.widgets), function (t) {
                var n = e.widgets[t].selector;
                document.querySelector(n) && i.push(t)
            }), i
        }

        function s(t) {
            var i, n = this.userSettings.load_css_async ? ".js" : ".json",
                o = e.getWidgetHost(this.getUserSetting("host")) + "/" + this.getAppKey() + "/widget_loader" + n;
            this.getUserSetting("version") && (o += "?widget_version=" + this.getUserSetting("version"), i = !0);
            var r = t.sort()
                .join(",");
            return o += i ? "&widgets=" + r : "?widgets=" + r, this.userSettings.load_css_async && (o += "&load_only_js=true"), o
        }

        function a(t, i) {
            e.injectScript(t, document.body);
            var n = !y.call(this);
            n && e.injectCSS(i, document.body)
        }

        function l(t) {
            try {
                if (e.Widgets)
                    for (var i = e.Widgets[e.camelize(t)] || e.Widgets.Basic, n = document.querySelectorAll(i.selector || ".yotpo." + t), o = 0; o < n.length; ++o) e.Element.get(n[o])
                        .is("new") && this.addWidget(new i(this, n[o], t));
                !n.length && "undefined" != typeof i.createsElement && i.createsElement(this.getUserSettings()) && this.addWidget(new i(this))
            } catch (r) {
                e.safeConsole(r.message)
            }
        }

        function c() {
            this.pageSku && this.productName && this.getUserSetting("widget_rich_snippet") && this.getBatch(function (e) {
                e = JSON.parse(e);
                var t = e[0].result;
                document.getElementsByTagName("head")[0].insertAdjacentHTML("afterbegin", t)
            }, [{
                method: "rich_snippet",
                params: {
                    pid: this.pageSku,
                    name: this.productName,
                    price: this.productPrice,
                    currency: this.productCurrency
                }
            }])
        }

        function d() {
            var e = document.querySelectorAll(".yotpo-user-reference");
            e.length && (this.userReference = e[0].getAttribute("data-user-reference"))
        }

        function u() {
            this.analytics = new e.Analytics(this), e.currentAnalytics = this.analytics, this.inview = new e.Inview(this), e.currentInview = this.inview, e.hoverAnalytics = new e.HoverIntervalEvent({
                interval: 1e3
            }), e.testingGroupsHandler = new e.TestingGroupsHandler(this), e.currentAnalytics.trackPageView()
        }

        function p() {
            for (var t, i, n, o = document.querySelectorAll(e.widgets.main.selector), r = 0; r < o.length; r++)
                if (n = o[r], i = n.getAttribute("data-product-id"), t = "undefined" == typeof t ? i : t, t !== i) {
                    t = void 0;
                    break
                } t && (this.pageSku = t, this.productName = n.getAttribute("data-name"), this.productPrice = n.getAttribute("data-price"), this.productCurrency = n.getAttribute("data-currency"))
        }

        function g() {
            var t = this,
                i = [];
            e.forEach(t.getWidgets(), function (t) {
                return t.is("initialized") || t.is("processing") ? void e.testingGroupsHandler.setSeoClient(!0) : (t.state("processing"), void i.push({
                    method: t.getMethod(),
                    params: t.getSettings()
                }))
            }), e.testingGroupsHandler.initialize(), t.getBatch(function (i) {
                h.call(t, i), f.call(t), e.addEventListener(window, "resize", function () {
                    m.call(t);
                    for (var e = t.getWidgets(), i = 0; i < e.length; i++) e[i].trigger("resize")
                }), t.trigger("ready")
            }, i, C)
        }

        function h(t) {
            var i = [];
            try {
                i = JSON.parse(t);
                for (var n = -1, o = 0; o < i.length; o++)
                    if ("main_widget" == i[o].method) {
                        n = o;
                        break
                    } if (n >= 0) {
                    var r = document.createElement("div");
                    r.innerHTML = i[n].result, r.getElementsByClassName("yotpo-promoted-product")
                        .length > 0 && (b(r.getElementsByClassName("yotpo-promoted-product")), i[n].result = r.innerHTML)
                }
            } catch (s) {
                e.safeConsole(s.message)
            }
            for (var a = this.getWidgets(), o = 0; o < a.length; o++) {
                var l = a[o];
                if (l.getElement()) {
                    if (!l.is("initialized")) {
                        var c = i.shift();
                        c && (l.getElement()
                            .innerHTML = c.result)
                    }
                    l.is("initialized") && !l.is("ready") && (l.trigger("ready"), l.state("ready"))
                } else e.safeConsole("Div not found in the Dom.")
            }
        }

        function m() {
            e.forEach(this.getWidgets(), function (t) {
                var i, n, o, r, s = "";
                for (n = t.getLayout(), o = r = t.getElement(); r && 0 == (i = r.offsetWidth);) r = r.parentNode;
                if ("old" === n) e.removeClass(o, "yotpo-medium"), e.removeClass(o, "yotpo-small"), 510 >= i ? s = "yotpo-small" : 655 >= i && (s = "yotpo-medium"), "" != s && e.addClass(o, s), t.trigger("sizeCalculated", s);
                else if ("new" === n) {
                    var a = e.Helpers.WidthClass.getWidgetWidthClasses();
                    s = e.Helpers.WidthClass.getWidgetWidthClass(i), e.hasClass(o, s) || (e.removeClassList(o, a), e.addClass(o, s)), t.trigger("sizeCalculated", s)
                }
            })
        }

        function f() {
            var t = this,
                i = document.getElementsByClassName("yotpo-display-wrapper")[0];
            "undefined" == typeof i || "visible" == e.getVisibilityStyle(i) ? m.call(t) : setTimeout(function () {
                f.call(t)
            }, 50)
        }

        function y() {
            var e = this.getUserSetting("css_custom_host");
            if (!e) return !1;
            for (var t = document.styleSheets, i = 0; i < t.length; ++i)
                if (t[i].href) {
                    var n = t[i].href.replace(/https?:\/\//, "");
                    if (n.indexOf(e) > -1) return !0
                } return !1
        }

        function v() {
            var t = this.getUserSetting("demo"),
                i = this.getUserSetting("info"),
                n = this.getUserSetting("css_preview"),
                o = this.getUserSetting("css_version") || this.getUserSetting("version"),
                r = this.getUserSetting("use_final_overrides"),
                s = this.getUserSetting("hard_refresh"),
                a = e.getWidgetHost(this.getUserSettings()
                    .host) + "/" + this.getAppKey() + "/widget.css?widget_version=" + o;
            "undefined" != typeof t && (a += "&demo=true"), "undefined" != typeof i && (a += "&info=" + window.encodeURIComponent(i)), "undefined" != typeof n && (a += "&css_preview=" + n), "undefined" != typeof r && (a += "&use_final_overrides=" + r), "undefined" != typeof s && "true" == s && (a += "&rand=" + (1e6 * Math.random() | 0));
            var l = document.getElementsByTagName("head")[0],
                c = document.createElement("link");
            c.type = "text/css", c.rel = "stylesheet", c.href = a;
            var d = this;
            c.onload = function () {
                k(function () {
                    d.trigger("CssReady")
                }, 1e3, 5)
            }, l.appendChild(c)
        }

        function b(e) {
            for (var t = [], i = 0; i < e.length; i++) "" != e[i].dataset.position && (t[i] = e[i].dataset.position);
            var n = !1,
                o = t.reduce(function (e, t) {
                    return "undefined" == typeof e[t] ? e[t] = 1 : (e[t] += 1, n = !0), e
                }, {});
            if (n) {
                var r = {};
                for (var s in o) r[s] = 1 == o[s] ? 1 : Math.floor(Math.random() * o[s]) + 1;
                for (var a = 0, i = 0; i < e.length; i++) 0 == i || e[i].dataset.position != e[i - 1].dataset.position ? a = 1 : a += 1, r[e[i].dataset.position] != a && (e[i].dataset.to_delete = !0);
                for (var i = e.length - 1; i >= 0; i--) e[i].dataset.to_delete && e[i].parentNode.remove()
            }
        }

        function w() {
            var t = this.getUserSetting("ads"),
                i = this.getUserSetting("facebook_ads");
            if (t && i && parseInt(i.settings.pixel_id) && 1 == i.settings.init_pixel) {
                var n = "undefined" != typeof yotpoTrackConversionData ? yotpoTrackConversionData : null;
                e.Libraries.Tracker.fbTracking(i.settings, n)
            }
        }

        function _() {
            var t = this;
            e.forEach(["ready"], function (e) {
                t.on(e, function () {
                    t.setState(e)
                })
            })
        }

        function S(t) {
            try {
                if (e.Widgets) {
                    var i = e.Widgets[e.camelize(t)] || e.Widgets.Basic;
                    if (i.alwaysShow) {
                        var n = this.userSettings[t] || e.getURLParameter(location.search, t + "_demo") || !1;
                        if (n) {
                            var o = document.createElement("div");
                            o.classList.add("yotpo"), o.classList.add(t), document.body.appendChild(o)
                        }
                    }
                }
            } catch (r) {
                e.safeConsole(r.message)
            }
        }

        function C() {
            for (var e = 0; e < this.allWidgetsReadyCallback.length; e++) this.allWidgetsReadyCallback[e].call()
        }

        function k(e, t, i) {
            for (var n = 0; i > n; n++) setTimeout(e, t * n)
        }
        return e.batchType = "POST", e.isIE10OrLess = -1 != navigator.userAgent.indexOf("MSIE"), e.isIE8 = e.isIE10OrLess && 8 == parseInt(navigator.userAgent.toLowerCase()
            .split("msie")[1]), e.isIEEdge = /Edge\/12./i.test(navigator.userAgent), e.isIE11 = navigator.userAgent.indexOf("Trident/7.0") > 0, e.isIEFamily = e.isIE10OrLess || e.isIE11 || e.isIEEdge, e.dynamicCreateType = "POST", e.globals = {}, e.hosts = {
            widget: {
                dynamic: "w2.yotpo.com",
                "static": "staticw2.yotpo.com"
            },
            api: {
                dynamic: "api.yotpo.com"
            },
            b2b: {
                dynamic: "my.yotpo.com"
            },
            reviews_me: {
                dynamic: "reviews.me"
            },
            base: {
                dynamic: "yotpo.com"
            }
        }, e.getWidgetHost = function (e) {
            return "//" + (this.hosts.widget[e] || this.hosts.widget["static"])
        }, e.getApiHost = function (e) {
            return "//" + (this.hosts.api[e] || this.hosts.api.dynamic)
        }, e.texts = {}, e.filterAndSearch = {
            filters_state_manager: {
                aggregators_types: {}
            },
            analytics: {
                page_types: {}
            }
        }, e.widgets = {
            main: {
                selector: ".yotpo.yotpo-main-widget"
            },
            bottomline: {
                selector: ".yotpo.bottomLine"
            },
            embedded: {
                selector: ".yotpo.embedded-widget"
            },
            badge: {
                selector: ".yotpo.badge,.yotpo.yotpo-badge"
            },
            "questions-bottomline": {
                selector: ".yotpo.QABottomLine"
            },
            carousels: {
                selector: ".yotpo.yotpo-reviews-carousel"
            },
            slider: {
                selector: ".yotpo.yotpo-slider"
            },
            "visual-carousel": {
                selector: ".yotpo.yotpo-visual-carousel"
            },
            "pictures-gallery": {
                selector: ".yotpo.yotpo-pictures-gallery"
            },
            "pictures-widget": {
                selector: ".yotpo.yotpo-pictures-widget"
            },
            "shoppable-gallery": {
                selector: ".yotpo.yotpo-shoppable-gallery"
            },
            testimonials: {
                selector: "#yotpo-testimonials-custom-tab,.yotpo.testimonials"
            },
            "single-video": {
                selector: ".yotpo.yotpo-single-video"
            },
            "shop-advisor": {
                selector: ".yotpo.y-shop-advisor"
            },
            "shoppers-say": {
                selector: ".yotpo.yotpo-shoppers-say"
            },
            ticker: {
                selector: ".yotpo.ticker"
            }
        }, e.getMainWidget = function (t) {
            if (t instanceof e) {
                for (var i, n = t.getWidgetsByName("Main"), o = 0; o < n.length; o++)
                    if (n[o].settings && "questions" != n[o].settings.mode) {
                        i = n[o];
                        break
                    } return i
            }
            return t instanceof e.Widgets.Main ? t : null
        }, e.scrollToReviewsTabInMainWidget = function (t, i) {
            i = i || !1;
            var n = this.getMainWidget(t),
                o = n.get("tabs")
                .getTab("reviews");
            e.simulateClickEvent(o), i ? e.Animations.scrollToElement(n.element, 500) : n.getElement()
                .scrollIntoView()
        }, e.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, e.prototype.onAllWidgetsReady = function (e) {
            this.allWidgetsReadyCallback.push(e)
        }, e.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, e.prototype.setState = function (e) {
            this.state = e
        }, e.prototype.getState = function () {
            return this.state
        }, e.prototype.getWidgetByName = function (t) {
            var i = null;
            return e.forEach(this.getWidgets(), function (n) {
                e.Widgets[t] && n instanceof e.Widgets[t] && (i = n)
            }), i
        }, e.prototype.getWidgetsByName = function (t) {
            var i = [];
            return e.forEach(this.getWidgets(), function (n) {
                n instanceof e.Widgets[t] && i.push(n)
            }), i
        }, e.prototype.getWidgetsByNames = function (t) {
            var i = [];
            return e.forEach(this.getWidgets(), function (n) {
                for (var o = 0; o < t.length; o++) n instanceof e.Widgets[t[o]] && i.push(n)
            }), i
        }, e.prototype.getAppKey = function () {
            return this.appKey
        }, e.prototype.getUserSettings = function () {
            return this.userSettings
        }, e.prototype.getUserSetting = function (e) {
            return this.userSettings[e]
        }, e.prototype.getWidgets = function () {
            return this.widgets
        }, e.prototype.getTrustedVendorsData = function () {
            var e = {},
                t = {
                    "data-user-name": "display_name",
                    "data-user-email": "email",
                    "data-signature": "signature",
                    "data-time-stamp": "time_stamp",
                    "data-reviewer-type": "reviewer_type",
                    "data-reviewer-badge": "reviewer_badge"
                },
                i = document.querySelectorAll(".yotpo-signed-data")[0];
            if (i)
                for (var n in t) {
                    var o = i.getAttribute(n);
                    o && (e[t[n]] = o)
                }
            return e
        }, e.prototype.addWidget = function (t) {
            this.widgets.push(t), e.Element.get(t.getElement())
                .set("state", "initialized")
        }, e.prototype.getUserReference = function () {
            return this.userReference
        }, e.prototype.getBatch = function (t, i, n) {
            function o(e, i) {
                var o = i.page,
                    s = [];
                u += 1, d[o] = e.substring(0, e.length - 1)
                    .substring(1), u == c && (k(function () {
                        r.trigger("BatchReady")
                    }, 1e3, 5), s = "[" + d.join(",") + "]", t(s), n && n.call(r))
            }
            var r = this;
            if (!i) return e.safeConsole("getBatch: no methods provided"), !1;
            if (i.length > 0)
                for (var s, a, l = e.maxBatchMethods, c = Math.ceil(i.length / l), d = [], u = 0, p = 0, g = i.length; g > p; p += l) {
                    var h = e.getWidgetHost(this.getUserSetting("host")) + "/batch";
                    s = i.slice(p, p + l), a = {
                        methods: JSON2.stringify(s),
                        app_key: this.getAppKey(),
                        is_mobile: e.isMobile(),
                        widget_version: this.getUserSetting("version")
                    };
                    var m;
                    e.testingGroupsHandler && (m = e.testingGroupsHandler.getTestingGroupsForServer()), m && (a.features_testing_groups = JSON.stringify(m)), "undefined" != typeof this.getUserSetting("demo") && "undefined" != typeof this.getUserSetting("info") && (a.info = this.getUserSetting("info"), a.demo = !0), a = e.convertHashToQueryStringParams(a), "GET" == e.batchType && (h += "?" + a), e.ajax(h, o, e.batchType, a, {
                        page: p / l
                    })
                } else k(function () {
                    r.trigger("BatchReady")
                }, 1e3, 5), t.call(this, "[]"), n && n.call(this)
        }, e.prototype.init = function () {
            return !this.initialized && this.shouldInitialize && (this.initialized = !0, e.Element.clear(), p.call(this), c.call(this), u.call(this), _.call(this), this.userSettings.load_only_widgets_on_page ? i.call(this) : this.initWidgets(), d.call(this)), this
        }, e.prototype.init_for_async = function () {
            return !this.initialized && this.shouldInitialize && (this.initialized = !0, e.Element.clear(), p.call(this), c.call(this), u.call(this), _.call(this), d.call(this)), this
        }, e.prototype.initWidgets = function () {
            t.call(this), g.call(this)
        }, e.prototype.clean = function () {
            e.forEach(this.getWidgets(), function (e) {
                for (var t = e.getElement(); t.hasChildNodes();) t.removeChild(t.firstChild)
            })
        }, e.prototype.updateContent = function () {
            this.clean(), g.call(this)
        }, e.prototype.refreshWidgets = function () {
            this.inview.unbindEvents(), this.clean(), this.widgets = [], this.allWidgetsReadyCallback = [], this.initialized = !1, this.shouldInitialize = !0, this.init()
        }, e.prototype.trackEvent = function (e, t, i, n) {
            this.analytics.trackEvent(e, t, i, n)
        }, e.prototype.trackPageView = function () {
            this.analytics.trackPageView()
        }, e
    }(), Yotpo.Element = function () {
        function e(e) {
            this.attributes = {
                id: ++t,
                element: e,
                state: "new"
            }, e.setAttribute("data-yotpo-element-id", this.get("id"))
        }
        var t = 0,
            i = {};
        return e.prototype.get = function (e) {
            return this.attributes[e]
        }, e.prototype.set = function (e, t) {
            this.attributes[e] = t
        }, e.prototype.is = function (e) {
            return this.get("state") == e
        }, e.get = function (t) {
            var n = +t.getAttribute("data-yotpo-element-id");
            if (!i[n]) {
                var o = new e(t);
                n = o.get("id"), i[n] = o
            }
            return i[n]
        }, e.clear = function () {
            for (var e in i) i.hasOwnProperty(e) && (i[e].get("element")
                .removeAttribute("data-yotpo-element-id"), delete i[e])
        }, e
    }(Yotpo), Yotpo.escapeHtml = function (e) {
        return e = e.trim(), "" == e ? e : e.replace(/ +(?= )/g, "")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
    }, Yotpo.validateStringMaxLength = function (e, t) {
        return t = t || 150, null == e || e.length > t ? !1 : !0
    }, Yotpo.appendChildElements = function (e, t) {
        for (; e.childNodes.length > 0;) t.appendChild(e.childNodes[0])
    }, Yotpo.validateStringMaxWords = function (e, t) {
        if (t = t || 150, "string" != typeof e) return !1;
        var i = e.match(/\S+/g);
        return i = i ? i.length : 0, t >= i
    }, Yotpo.validateStringMinLength = function (e, t) {
        return t = t || 1, null == e || e.length < t ? !1 : !0
    }, Yotpo.validateEmail = function (e) {
        var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return t.test(e)
    }, Yotpo.capitalize = function (e) {
        return e.charAt(0)
            .toUpperCase() + e.slice(1)
    }, Yotpo.camelize = function (e) {
        for (var t = e.split("-"), i = Yotpo.capitalize(t[0]), n = 1; n < t.length; n++) i += Yotpo.capitalize(t[n]);
        return i
    }, Yotpo.getIEVersion = function () {
        var e = navigator.userAgent,
            t = /MSIE\s?(\d+)(?:\.(\d+))?/i,
            i = e.match(t);
        return null != i ? {
            major: i[1],
            minor: i[2]
        } : {
            major: "-1",
            minor: "-1"
        }
    }, Yotpo.ready = function (e) {
        Yotpo.isIE10OrLess && 10 != Yotpo.getIEVersion()
            .major || "interactive" !== document.readyState ? "complete" === document.readyState ? setTimeout(function () {
                e()
            }, 1) : document.addEventListener ? document.addEventListener("DOMContentLoaded", function () {
                e()
            }, !1) : document.attachEvent("onreadystatechange", function () {
                "complete" === document.readyState && e()
            }) : setTimeout(function () {
                e()
            }, 1)
    }, Yotpo.rotate = function (e) {
        if ("WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "OTransform" in document.body.style || "transform" in document.body.style) {
            var t, i, n, o, r = 2 * Math.PI / 360,
                s = e * r,
                a = Math.cos(s),
                l = Math.sin(s);
            t = parseFloat(a)
                .toFixed(8), i = parseFloat(-l)
                .toFixed(8), n = parseFloat(l)
                .toFixed(8), o = parseFloat(a)
                .toFixed(8);
            var c = "progid:DXImageTransform.Microsoft.Matrix(M11=" + t + ", M12=" + i + ", M21=" + n + ", M22=" + o + ",sizingMethod='auto expand')";
            return {
                filter: c,
                "-moz-transform": "rotate(" + e + "deg)",
                "-webkit-transform": "rotate(" + e + "deg)",
                "-o-transform": "rotate(" + e + "deg)",
                "-ms-transform": "rotate(" + e + "deg)"
            }
        }
        return !1
    }, Yotpo.hasClass = function (e, t) {
        return e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi")
            .test(e.className)
    }, Yotpo.addClass = function (e, t) {
        e.classList ? e.classList.add(t) : e.className += " " + t
    }, Yotpo.removeClass = function (e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ")
            .join("|") + "(\\b|$)", "gi"), " ")
    }, Yotpo.removeClassList = function (e, t) {
        for (var i = 0; i < t.length; i++) Yotpo.removeClass(e, t[i])
    }, Yotpo.toggleClass = function (e, t) {
        Yotpo.hasClass(e, t) ? Yotpo.removeClass(e, t) : Yotpo.addClass(e, t)
    }, Yotpo.addEventListener = function (e, t, i) {
        e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent && e.attachEvent("on" + t, i)
    }, Yotpo.removeEventListener = function (e, t, i) {
        e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i)
    }, Yotpo.copy = function (e, t) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
    }, Yotpo.toggleVisibility = function (e, t) {
        t = t || "inline-block", e.style.display = "none" == Yotpo.getDisplayStyle(e) ? t : "none"
    }, Yotpo.getDisplayStyle = function (e) {
        return e.currentStyle ? e.currentStyle.display : window.getComputedStyle ? window.getComputedStyle(e, null)
            .getPropertyValue("display") : null
    }, Yotpo.getVisibilityStyle = function (e) {
        return e ? e.currentStyle ? e.currentStyle.visibility : window.getComputedStyle ? window.getComputedStyle(e, null)
            .getPropertyValue("visibility") : null : !1
    }, Yotpo.getComputedStyle = function (e, t) {
        return e ? e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null)
            .getPropertyValue(t) : null : null
    }, Yotpo.getComputedMargins = function (e) {
        return {
            top: parseInt(Yotpo.getComputedStyle(e, "margin-top")
                .replace("px", ""), 10),
            left: parseInt(Yotpo.getComputedStyle(e, "margin-left")
                .replace("px", ""), 10),
            right: parseInt(Yotpo.getComputedStyle(e, "margin-right")
                .replace("px", ""), 10),
            bottom: parseInt(Yotpo.getComputedStyle(e, "margin-bottom")
                .replace("px", ""), 10)
        }
    }, Yotpo.show = function (e, t) {
        e.style.display = t ? t : "inline-block", Yotpo.removeClass(e, "yotpo-hidden")
    }, Yotpo.hide = function (e) {
        e.style.display = "none", Yotpo.addClass(e, "yotpo-hidden")
    }, Yotpo.remove = function (e) {
        e.parentNode.removeChild(e)
    }, Yotpo.getStyle = function (e, t) {
        if (e.currentStyle) var i = e.currentStyle[t];
        else if (window.getComputedStyle) var i = document.defaultView.getComputedStyle(e, null)
            .getPropertyValue(t);
        return i
    }, Yotpo.isHidden = function (e) {
        return !Yotpo.isIE10OrLess && e.classList ? null === e.offsetParent && e != document.body : "none" == Yotpo.getStyle(e, "display") || "hidden" == Yotpo.getStyle(e, "visibilty")
    }, Yotpo.localStorage = localStorage || {
        getItem: function (e) {
            return Yotpo.storage = Yotpo.storage || {}, Yotpo.storage[e]
        },
        setItem: function (e, t) {
            Yotpo.storage = Yotpo.storage || {}, Yotpo.storage[e] = t
        },
        removeItem: function (e) {
            Yotpo.storage = Yotpo.storage || {}, delete Yotpo.storage[e]
        }
    }, Yotpo.bindAnimation = function (e, t) {
        var i = t || e.getAttribute("data-type"),
            n = null,
            o = e.getAttribute("data-target-container");
        o && (n = Yotpo.Modules.Helper.findAncestorByClass(e, o)), n || (n = e.parentNode.parentNode.parentNode);
        var r = n.getElementsByClassName(e.getAttribute("data-target"));
        0 == r.length && (r = n.querySelectorAll(e.getAttribute("data-target")));
        for (var s = Math.min(parseInt(e.getAttribute("data-limit") || r.length), r.length), a = 0; s > a; ++a) Yotpo.Animations[i](r[a]);
        parseInt(e.getAttribute("data-limit")) >= r.length && Yotpo.addClass(e, "yotpo-hidden")
    }, Yotpo.supportTouch = function () {
        return "ontouchstart" in document.documentElement
    }, Yotpo.togglePreLoader = function (e) {
        var t = e.querySelectorAll(".yotpo-preloader-wrapper");
        if (t.length > 0) {
            var i = t[0];
            Yotpo.toggleVisibility(i)
        }
        return !1
    }, Yotpo.setSearchInProgressDisplayStatus = function (e, t) {
        var i = e.querySelector(".search-in-progress"),
            n = e.querySelector(".yotpo-reviews");
        i && n && (t ? (Yotpo.show(i), Yotpo.hide(n)) : (Yotpo.hide(i), Yotpo.show(n, "block")))
    }, Yotpo.scrollTo = function (e, t, i, n, o) {
        var r = n ? e.scrollHeight > t && t >= 0 : !0;
        if (r) {
            var s = n ? e.scrollTop : e.scrollLeft,
                a = t - s,
                l = 0,
                c = 20,
                d = function () {
                    l += c;
                    var t = Math.easeInOutQuad(l, s, a, i);
                    n ? e.scrollTop = t : e.scrollLeft = t, i > l ? setTimeout(d, c) : "function" == typeof o && o()
                };
            Math.easeInOutQuad = function (e, t, i, n) {
                return e /= n / 2, 1 > e ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t)
            }, d()
        }
    }, Yotpo.moveTo = function (e, t, i, n, o) {
        var r = 0,
            s = t - r,
            a = 0,
            l = 20,
            c = function () {
                a += l;
                var t = Math.easeInOutQuad(a, r, s, i);
                t = parseInt(t), "right" == n ? e.style.right = t + "px" : e.style.left = t + "px", i > a ? setTimeout(c, l) : "function" == typeof o && o()
            };
        Math.easeInOutQuad = function (e, t, i, n) {
            return e /= n / 2, 1 > e ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t)
        }, c()
    }, Yotpo.scrollToTop = function (e) {
        if (e.offsetParent && e.offsetParent.scrollTop > 0 && e.offsetParent !== document.body) Yotpo.scrollTo(e.offsetParent, 0, 1300, !0);
        else {
            var t = document.documentElement.scrollTop > 0 ? document.documentElement : document.body;
            Yotpo.scrollTo(t, e.getBoundingClientRect()
                .top + t.scrollTop, 1300, !0)
        }
    }, Yotpo.mobileCheck = function () {
        var e = !1;
        return function (t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), e
    }, Yotpo.isMobile = function () {
        if (this.mobileCheck()) return !0;
        var e = /ipad|ipad.*mobile|android.*nexus[\s]+(7|10)|^.*android.*nexus(?:(?!mobile).)*$|samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5105|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|gt-p5210x|sm-t311|sm-t310|sm-t310x|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-p901|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500|sm-t110|gt-p5220|gt-i9200x|gt-n5110x|gt-n5120|sm-p905|sm-t111|sm-t2105|sm-t315|sm-t320|sm-t320x|sm-t321|sm-t520|sm-t525|sm-t530nu|sm-t230nu|sm-t330nu|sm-t900|xe500t1c|sm-p605v|sm-p905v|sm-p600x|sm-p900x|sm-t210x|sm-t230|sm-t230x|sm-t325|gt-p7503|sm-t531|sm-t330|sm-t530|sm-t705c|sm-t535|sm-t331|kindle|silk.*accelerated|android.*\b(kfot|kftt|kfjwi|kfjwa|kfote|kfsowi|kfthwi|kfthwa|kfapwi|kfapwa|wfjwae)\b|windows nt [0-9.]+; arm;|hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch|hp 8|^.*padfone((?!mobile).)*$|transformer|tf101|tf101g|tf300t|tf300tg|tf300tl|tf700t|tf700kl|tf701t|tf810c|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider sl101|\bk00f\b|tx201la|playbook|rim tablet|htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200|xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617|android.*nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2|android.*; \b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810|a1-830)\b|w3-810|\ba3-a10\b|android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio|\bl-06c|lg-v900|lg-v500|lg-v909|lg-v500|lg-v510|lg-vk810\b|android.*\b(f-01d|f-02f|f-05e|f-10d|m532|q572)\b|pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280c3g|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad|ideatab|thinkpad([ ]+)?tablet|lenovo.*(s2109|s2110|s5000|s6000|k3011|a3000|a1000|a2107|a2109|a1107|b6000|b8000|b8080-f)|android.*\b(tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab07-100|tab07-101|tab07-150|tab07-151|tab07-152|tab07-200|tab07-201-3g|tab07-210|tab07-211|tab07-212|tab07-214|tab07-220|tab07-400|tab07-485|tab08-150|tab08-200|tab08-201-3g|tab08-201-30|tab09-100|tab09-211|tab09-410|tab10-150|tab10-201|tab10-211|tab10-400|tab10-410|tab13-201|tab274euk|tab275euk|tab374euk|tab462euk|tab474euk|tab9-200)\b|android.*\boyo\b|life.*(p9212|p9514|p9516|s9512)|lifetab|an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt|inm8002kp|inm1010fp|inm805nd|intenso tab|m702pro|megafon v9|\bzte v9\b|android.*\bmt7a\b|e-boda (supreme|impresspeed|izzycomm|essential)|allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)|\b(101g9|80g9|a101it)\b|qilive 97r|archos 101g10|archos 101 neon|novo7|novo8|novo10|novo7aurora|novo7basic|novo7paladin|novo9-spark|sony.*tablet|xperia tablet|sony tablet s|so-03e|sgpt12|sgpt13|sgpt114|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt131|sgpt132|sgpt133|sgpt211|sgpt212|sgpt213|sgp311|sgp312|sgp321|ebrd1101|ebrd1102|ebrd1201|sgp351|sgp341|sgp511|sgp512|sgp521|sgp541|sgp551|android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt|mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7015|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010|m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733|android.*(\bmid\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)|android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a|iq310|fly vision|bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)|maxwell.*lite|maxwell.*plus|mediapad|mediapad 7 youth|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim|\bn-06d|\bn-08d|pantech.*p4100|broncho.*(n701|n708|n802|a710)|touchpad.*[78910]|\btouchtab\b|z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900|tb07sta|tb10sta|tb07fta|tb10fta|android.*\bnabi|kobo touch|\bk080\b|\bvox\b build|\barc\b build|dslide.*\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\b|navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se|playstation.*(portable|vita)|st10416-1|vt10416-1|st70408-1|st702xx-1|st702xx-2|st80208|st97216|st70104-2|vt10416-2|st10216-2a|\b(ptbl10ceu|ptbl10c|ptbl72bc|ptbl72bceu|ptbl7ceu|ptbl7c|ptbl92bc|ptbl92bceu|ptbl9ceu|ptbl9cuk|ptbl9c)\b|android.* \b(e3a|t3x|t5c|t5b|t3e|t3c|t3b|t1j|t1f|t2a|t1h|t1i|e1c|t1-e|t5-a|t4|e1-b|t2ci|t1-b|t1-d|o1-a|e1-a|t1-a|t3a|t4i)\b |genius tab g3|genius tab s2|genius tab q3|genius tab g4|genius tab q4|genius tab g-ii|genius tab gii|genius tab giii|genius tab s1|android.*\bg1\b|funbook|micromax.*\b(p250|p560|p360|p362|p600|p300|p350|p500|p275)\b|android.*\b(a39|a37|a34|st8|st10|st7|smart tab3|smart tab2)\b|fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide|\b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\b|bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026|tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503|tx-a1301|tx-m9002|q702|kf026|tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10|ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)|hcl.*tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync|dps dream 9|dps dual 7|v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10|ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989|\bmt8125|mt8389|mt8135|mt8377\b|concorde([ ]+)?tab|concorde readman|goclever tab|a7goclever|m1042|m7841|m742|r1042bk|r1041|tab a975|tab a7842|tab a741|tab a741l|tab m723g|tab m721|tab a1021|tab i921|tab r721|tab i720|tab t76|tab r70|tab r76.2|tab r106|tab r83.2|tab m813g|tab i721|gcta722|tab i70|tab i71|tab s73|tab r73|tab r74|tab r93|tab r75|tab r76.1|tab a73|tab a93|tab a93.2|tab t72|tab r83|tab r974|tab r973|tab a101|tab a103|tab a104|tab a104.2|r105bk|m713g|a972bk|tab a971|tab r974.2|tab r104|tab r83.3|tab a1042|freetab 9000|freetab 7.4|freetab 7004|freetab 7800|freetab 2096|freetab 7.5|freetab 1014|freetab 1001 |freetab 8001|freetab 9706|freetab 9702|freetab 7003|freetab 7002|freetab 1002|freetab 7801|freetab 1331|freetab 1004|freetab 8002|freetab 8014|freetab 9704|freetab 1003|\b(argus[ _]?s|diamond[ _]?79hd|emerald[ _]?78e|luna[ _]?70c|onyx[ _]?s|onyx[ _]?z|orin[ _]?hd|orin[ _]?s|otis[ _]?s|speedstar[ _]?s|magnet[ _]?m9|primus[ _]?94[ _]?3g|primus[ _]?94hd|primus[ _]?qs|android.*\bq8\b|sirius[ _]?evo[ _]?qs|sirius[ _]?qs|spirit[ _]?s)\b|v07ot2|tm105a|s10ot1|tr10cs1|ezee[_']?(tab|go)[0-9]+|tablc7|looney tunes tab|smarttab([ ]+)?[0-9]+|smarttabii10|smart[ ']?tab[ ]+?[0-9]+|family[ ']?tab2|rm-790|rm-997|rmd-878g|rmd-974r|rmt-705a|rmt-701|rme-601|rmt-501|rmt-711|i-mobile i-note|tolino tab [0-9.]+|tolino shine|\bc-22q|t7-qc|t-17b|t-17p\b|android.* a78 |android.* (skypad|phoenix|cyclops)|tecno p9|android.*\b(f3000|a3300|jxd5000|jxd3000|jxd2000|jxd300b|jxd300|s5800|s7800|s602b|s5110b|s7300|s5300|s602|s603|s5100|s5110|s601|s7100a|p3000f|p3000s|p101|p200s|p1000m|p200m|p9100|p1000s|s6600b|s908|p1000|p300|s18|s6600|s9100)\b|tablet (spirit 7|essentia|galatea|fusion|onix 7|landa|titan|scooby|deox|stella|themis|argon|unique 7|sygnus|hexen|finity 7|cream|cream x2|jade|neon 7|neron 7|kandy|scape|saphyr 7|rebel|biox|rebel|rebel 8gb|myst|draco 7|myst|tab7-004|myst|tadeo jones|tablet boing|arrow|draco dual cam|aurix|mint|amity|revolution|finity 9|neon 9|t9w|amity 4gb dual cam|stone 4gb|stone 8gb|andromeda|silken|x2|andromeda ii|halley|flame|saphyr 9,7|touch 8|planet|triton|unique 10|hexen 10|memphis 4gb|memphis 8gb|onix 10)|fx2 pad7|fx2 pad10|kidspad 701|pad[ ]?712|pad[ ]?714|pad[ ]?716|pad[ ]?717|pad[ ]?718|pad[ ]?720|pad[ ]?721|pad[ ]?722|pad[ ]?790|pad[ ]?792|pad[ ]?900|pad[ ]?9715d|pad[ ]?9716dr|pad[ ]?9718dr|pad[ ]?9719qr|pad[ ]?9720qr|telepad1030|telepad1032|telepad730|telepad731|telepad732|telepad735q|telepad830|telepad9730|telepad795|megapad 1331|megapad 1851|megapad 2151|viewpad 10pi|viewpad 10e|viewpad 10s|viewpad e72|viewpad7|viewpad e100|viewpad 7e|viewsonic vb733|vb100a|loox|xeno10|odys space|captiva pad|nettab|nt-3702|nt-3702s|nt-3702s|nt-3603p|nt-3603p|nt-0704s|nt-0704s|nt-3805c|nt-3805c|nt-0806c|nt-0806c|nt-0909t|nt-0909t|nt-0907s|nt-0907s|nt-0902s|nt-0902s|hudl ht7s3|t-hub2|android.*\b97d\b|tablet(?!.*pc)|bntv250a|mid-wcdma|logicpd zoom2|\ba7eb\b|catnova8|a1_07|ct704|ct1002|\bm721\b|rk30sdk|\bevotab\b|m758a|et904|alumium10|smartfren tab|endeavour 1010|tablet-pc-4/i,
            t = /\biphone.*(mobile|phonegap)|\bipod|blackberry|\bbb10\b|rim[0-9]+|htc|htc.*(sensation|evo|vision|explorer|6800|8100|8900|a7272|s510e|c110e|legend|desire|t8282)|apx515ckt|qtek9090|apa9292kt|hd_mini|sensation.*z710e|pg86100|z715e|desire.*(a8181|hd)|adr6200|adr6400l|adr6425|001ht|inspire 4g|android.*\bevo\b|t-mobile g1|z520m|nexus one|nexus s|galaxy.*nexus|android.*nexus.*mobile|dell.*streak|dell.*aero|dell.*venue|dell.*venue pro|dell flash|dell smoke|dell mini 3ix|xcd28|xcd35|\b001dl\b|\b101dl\b|\bgs01\b|motorola|droidx|droid bionic|\bdroid\b.*build|android.*xoom|hri39|mot-|a1260|a1680|a555|a853|a855|a953|a955|a956|motorola.*electrify|motorola.*i1|i867|i940|mb200|mb300|mb501|mb502|mb508|mb511|mb520|mb525|mb526|mb611|mb612|mb632|mb810|mb855|mb860|mb861|mb865|mb870|me501|me502|me511|me525|me600|me632|me722|me811|me860|me863|me865|mt620|mt710|mt716|mt720|mt810|mt870|mt917|motorola.*titanium|wx435|wx445|xt300|xt301|xt311|xt316|xt317|xt319|xt320|xt390|xt502|xt530|xt531|xt532|xt535|xt603|xt610|xt611|xt615|xt681|xt701|xt702|xt711|xt720|xt800|xt806|xt860|xt862|xt875|xt882|xt883|xt894|xt901|xt907|xt909|xt910|xt912|xt928|xt926|xt915|xt919|xt925|samsung|sgh-i337|bgt-s5230|gt-b2100|gt-b2700|gt-b2710|gt-b3210|gt-b3310|gt-b3410|gt-b3730|gt-b3740|gt-b5510|gt-b5512|gt-b5722|gt-b6520|gt-b7300|gt-b7320|gt-b7330|gt-b7350|gt-b7510|gt-b7722|gt-b7800|gt-c3010|gt-c3011|gt-c3060|gt-c3200|gt-c3212|gt-c3212i|gt-c3262|gt-c3222|gt-c3300|gt-c3300k|gt-c3303|gt-c3303k|gt-c3310|gt-c3322|gt-c3330|gt-c3350|gt-c3500|gt-c3510|gt-c3530|gt-c3630|gt-c3780|gt-c5010|gt-c5212|gt-c6620|gt-c6625|gt-c6712|gt-e1050|gt-e1070|gt-e1075|gt-e1080|gt-e1081|gt-e1085|gt-e1087|gt-e1100|gt-e1107|gt-e1110|gt-e1120|gt-e1125|gt-e1130|gt-e1160|gt-e1170|gt-e1175|gt-e1180|gt-e1182|gt-e1200|gt-e1210|gt-e1225|gt-e1230|gt-e1390|gt-e2100|gt-e2120|gt-e2121|gt-e2152|gt-e2220|gt-e2222|gt-e2230|gt-e2232|gt-e2250|gt-e2370|gt-e2550|gt-e2652|gt-e3210|gt-e3213|gt-i5500|gt-i5503|gt-i5700|gt-i5800|gt-i5801|gt-i6410|gt-i6420|gt-i7110|gt-i7410|gt-i7500|gt-i8000|gt-i8150|gt-i8160|gt-i8190|gt-i8320|gt-i8330|gt-i8350|gt-i8530|gt-i8700|gt-i8703|gt-i8910|gt-i9000|gt-i9001|gt-i9003|gt-i9010|gt-i9020|gt-i9023|gt-i9070|gt-i9082|gt-i9100|gt-i9103|gt-i9220|gt-i9250|gt-i9300|gt-i9305|gt-i9500|gt-i9505|gt-m3510|gt-m5650|gt-m7500|gt-m7600|gt-m7603|gt-m8800|gt-m8910|gt-n7000|gt-s3110|gt-s3310|gt-s3350|gt-s3353|gt-s3370|gt-s3650|gt-s3653|gt-s3770|gt-s3850|gt-s5210|gt-s5220|gt-s5229|gt-s5230|gt-s5233|gt-s5250|gt-s5253|gt-s5260|gt-s5263|gt-s5270|gt-s5300|gt-s5330|gt-s5350|gt-s5360|gt-s5363|gt-s5369|gt-s5380|gt-s5380d|gt-s5560|gt-s5570|gt-s5600|gt-s5603|gt-s5610|gt-s5620|gt-s5660|gt-s5670|gt-s5690|gt-s5750|gt-s5780|gt-s5830|gt-s5839|gt-s6102|gt-s6500|gt-s7070|gt-s7200|gt-s7220|gt-s7230|gt-s7233|gt-s7250|gt-s7500|gt-s7530|gt-s7550|gt-s7562|gt-s7710|gt-s8000|gt-s8003|gt-s8500|gt-s8530|gt-s8600|sch-a310|sch-a530|sch-a570|sch-a610|sch-a630|sch-a650|sch-a790|sch-a795|sch-a850|sch-a870|sch-a890|sch-a930|sch-a950|sch-a970|sch-a990|sch-i100|sch-i110|sch-i400|sch-i405|sch-i500|sch-i510|sch-i515|sch-i600|sch-i730|sch-i760|sch-i770|sch-i830|sch-i910|sch-i920|sch-i959|sch-lc11|sch-n150|sch-n300|sch-r100|sch-r300|sch-r351|sch-r400|sch-r410|sch-t300|sch-u310|sch-u320|sch-u350|sch-u360|sch-u365|sch-u370|sch-u380|sch-u410|sch-u430|sch-u450|sch-u460|sch-u470|sch-u490|sch-u540|sch-u550|sch-u620|sch-u640|sch-u650|sch-u660|sch-u700|sch-u740|sch-u750|sch-u810|sch-u820|sch-u900|sch-u940|sch-u960|scs-26uc|sgh-a107|sgh-a117|sgh-a127|sgh-a137|sgh-a157|sgh-a167|sgh-a177|sgh-a187|sgh-a197|sgh-a227|sgh-a237|sgh-a257|sgh-a437|sgh-a517|sgh-a597|sgh-a637|sgh-a657|sgh-a667|sgh-a687|sgh-a697|sgh-a707|sgh-a717|sgh-a727|sgh-a737|sgh-a747|sgh-a767|sgh-a777|sgh-a797|sgh-a817|sgh-a827|sgh-a837|sgh-a847|sgh-a867|sgh-a877|sgh-a887|sgh-a897|sgh-a927|sgh-b100|sgh-b130|sgh-b200|sgh-b220|sgh-c100|sgh-c110|sgh-c120|sgh-c130|sgh-c140|sgh-c160|sgh-c170|sgh-c180|sgh-c200|sgh-c207|sgh-c210|sgh-c225|sgh-c230|sgh-c417|sgh-c450|sgh-d307|sgh-d347|sgh-d357|sgh-d407|sgh-d415|sgh-d780|sgh-d807|sgh-d980|sgh-e105|sgh-e200|sgh-e315|sgh-e316|sgh-e317|sgh-e335|sgh-e590|sgh-e635|sgh-e715|sgh-e890|sgh-f300|sgh-f480|sgh-i200|sgh-i300|sgh-i320|sgh-i550|sgh-i577|sgh-i600|sgh-i607|sgh-i617|sgh-i627|sgh-i637|sgh-i677|sgh-i700|sgh-i717|sgh-i727|sgh-i747m|sgh-i777|sgh-i780|sgh-i827|sgh-i847|sgh-i857|sgh-i896|sgh-i897|sgh-i900|sgh-i907|sgh-i917|sgh-i927|sgh-i937|sgh-i997|sgh-j150|sgh-j200|sgh-l170|sgh-l700|sgh-m110|sgh-m150|sgh-m200|sgh-n105|sgh-n500|sgh-n600|sgh-n620|sgh-n625|sgh-n700|sgh-n710|sgh-p107|sgh-p207|sgh-p300|sgh-p310|sgh-p520|sgh-p735|sgh-p777|sgh-q105|sgh-r210|sgh-r220|sgh-r225|sgh-s105|sgh-s307|sgh-t109|sgh-t119|sgh-t139|sgh-t209|sgh-t219|sgh-t229|sgh-t239|sgh-t249|sgh-t259|sgh-t309|sgh-t319|sgh-t329|sgh-t339|sgh-t349|sgh-t359|sgh-t369|sgh-t379|sgh-t409|sgh-t429|sgh-t439|sgh-t459|sgh-t469|sgh-t479|sgh-t499|sgh-t509|sgh-t519|sgh-t539|sgh-t559|sgh-t589|sgh-t609|sgh-t619|sgh-t629|sgh-t639|sgh-t659|sgh-t669|sgh-t679|sgh-t709|sgh-t719|sgh-t729|sgh-t739|sgh-t746|sgh-t749|sgh-t759|sgh-t769|sgh-t809|sgh-t819|sgh-t839|sgh-t919|sgh-t929|sgh-t939|sgh-t959|sgh-t989|sgh-u100|sgh-u200|sgh-u800|sgh-v205|sgh-v206|sgh-x100|sgh-x105|sgh-x120|sgh-x140|sgh-x426|sgh-x427|sgh-x475|sgh-x495|sgh-x497|sgh-x507|sgh-x600|sgh-x610|sgh-x620|sgh-x630|sgh-x700|sgh-x820|sgh-x890|sgh-z130|sgh-z150|sgh-z170|sgh-zx10|sgh-zx20|shw-m110|sph-a120|sph-a400|sph-a420|sph-a460|sph-a500|sph-a560|sph-a600|sph-a620|sph-a660|sph-a700|sph-a740|sph-a760|sph-a790|sph-a800|sph-a820|sph-a840|sph-a880|sph-a900|sph-a940|sph-a960|sph-d600|sph-d700|sph-d710|sph-d720|sph-i300|sph-i325|sph-i330|sph-i350|sph-i500|sph-i600|sph-i700|sph-l700|sph-m100|sph-m220|sph-m240|sph-m300|sph-m305|sph-m320|sph-m330|sph-m350|sph-m360|sph-m370|sph-m380|sph-m510|sph-m540|sph-m550|sph-m560|sph-m570|sph-m580|sph-m610|sph-m620|sph-m630|sph-m800|sph-m810|sph-m850|sph-m900|sph-m910|sph-m920|sph-m930|sph-n100|sph-n200|sph-n240|sph-n300|sph-n400|sph-z400|swc-e100|sch-i909|gt-n7100|gt-n7105|sch-i535|sm-n900a|sgh-i317|sgh-t999l|gt-s5360b|gt-i8262|gt-s6802|gt-s6312|gt-s6310|gt-s5312|gt-s5310|gt-i9105|gt-i8510|gt-s6790n|sm-g7105|sm-n9005|gt-s5301|gt-i9295|gt-i9195|sm-c101|gt-s7392|gt-s7560|gt-b7610|gt-i5510|gt-s7582|gt-s7530e|\blg\b;|lg[- ]?(c800|c900|e400|e610|e900|e-900|f160|f180k|f180l|f180s|730|855|l160|ls840|ls970|lu6200|ms690|ms695|ms770|ms840|ms870|ms910|p500|p700|p705|vm696|as680|as695|ax840|c729|e970|gs505|272|c395|e739bk|e960|l55c|l75c|ls696|ls860|p769bk|p350|p500|p509|p870|un272|us730|vs840|vs950|ln272|ln510|ls670|ls855|lw690|mn270|mn510|p509|p769|p930|un200|un270|un510|un610|us670|us740|us760|ux265|ux840|vn271|vn530|vs660|vs700|vs740|vs750|vs910|vs920|vs930|vx9200|vx11000|ax840a|lw770|p506|p925|p999|e612|d955|d802)|sonyst|sonylt|sonyericsson|sonyericssonlt15iv|lt18i|e10i|lt28h|lt26w|sonyericssonmt27i|asus.*galaxy|padfone.*mobile|micromax.*\b(a210|a92|a88|a72|a111|a110q|a115|a116|a110|a90s|a26|a51|a35|a54|a25|a27|a89|a68|a65|a57|a90)\b|palmsource|palm|vertu|vertu.*ltd|vertu.*ascent|vertu.*ayxta|vertu.*constellation(f|quest)?|vertu.*monika|vertu.*signature|pantech|im-a850s|im-a840s|im-a830l|im-a830k|im-a830s|im-a820l|im-a810k|im-a810s|im-a800s|im-t100k|im-a725l|im-a780l|im-a775c|im-a770k|im-a760s|im-a750k|im-a740s|im-a730s|im-a720l|im-a710k|im-a690l|im-a690s|im-a650s|im-a630k|im-a600s|vega ptl21|pt003|p8010|adr910l|p6030|p6020|p9070|p4100|p9060|p5000|cdm8992|txt8045|adr8995|is11pt|p2030|p6010|p8000|pt002|is06|cdm8999|p9050|pt001|txt8040|p2020|p9020|p2000|p7040|p7000|c790|iq230|iq444|iq450|iq440|iq442|iq441|iq245|iq256|iq236|iq255|iq235|iq245|iq275|iq240|iq285|iq280|iq270|iq260|iq250|i-mobile (iq|i-style|idea|zaa|hitz)|\b(sp-80|xt-930|sx-340|xt-930|sx-310|sp-360|sp60|spt-800|sp-120|spt-800|sp-140|spx-5|spx-8|sp-100|spx-8|spx-12)\b|tapatalk|pda;|sagem|\bmmp\b|pocket|\bpsp\b|symbian|smartphone|smartfon|treo|up.browser|up.link|vodafone|\bwap\b|nokia|series40|series60|s60|sonyericsson|n900|maui.*wap.*browser/i,
            i = navigator.userAgent || navigator.vendor || window.opera;
        return 1 == t.test(i) && 0 == e.test(i)
    }, Yotpo.compact = function (e) {
        for (var t in e) !e.hasOwnProperty(t) || "undefined" != typeof e[t] && null != e[t] || delete e[t];
        return e
    }, Yotpo.forEach = function (e, t) {
        if (Array.prototype.forEach) e.forEach(t);
        else {
            if ("function" != typeof t) throw new TypeError;
            for (var i = arguments.length >= 2 ? arguments[1] : void 0, n = 0; n < e.length; n++) n in e && t.call(i, e[n], n, e)
        }
    }, Yotpo.getElementText = function (e) {
        return e.textContent || e.innerText
    }, Yotpo.origin = function () {
        return window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
    }, Yotpo.isArray = "isArray" in Array ? Array.isArray : function (e) {
        var t = Object.prototype.toString.call(e);
        return "[object Array]" === t
    }, Yotpo.preloadImages = function (e, t, i, n, o, r) {
        var s, a = 0,
            l = [];
        e = Yotpo.isArray(e) ? e : [e];
        for (var c = function () {
                a += 1, a === e.length && t && t(i)
            }, d = 0; d < e.length; d++) e[d].kalturaPlayer ? (s = e[d].kalturaPlayer.kalturaPlayer, s._localPlayer._firstPlay ? (s.addEventListener(s.Event.CAN_PLAY, function () {
            c()
        }), e[d].kalturaPlayer.loadVideo()) : (e[d].current && e[d].kalturaPlayer.replayVideo(), c()), e[d].current || e[d].kalturaPlayer.pauseVideo()) : (l[d] = new Image, l[d].setAttribute("src", "#"), l[d].onload = function (t) {
            return function () {
                r && r(e[t].imageId, this, i), c()
            }
        }(d), l[d].onabort = l[d].onerror = n ? function () {
            try {
                n(o, this.dataImageId)
            } catch (e) {}
            c()
        } : c, e[d].url && (l[d].src = e[d].url), l[d].dataImageId = e[d].imageId)
    }, Yotpo.getDefualtImage = function () {
        return {
            size_180: "https://staticw2.yotpo.com/assets/default_image_180px.jpg",
            size_656: "https://staticw2.yotpo.com/assets/default_image_656px.jpg",
            profile: "https://staticw2.yotpo.com/assets/default_profile.png"
        }
    }, Yotpo.reportBrokenImages = function (e, t, i, n) {
        var o = Yotpo.getApiHost() + "/v1/widget/" + e + "/images/broken",
            r = Yotpo.convertComplexObjectToQueryStringParams({
                image_ids: t,
                type: i,
                should_search_media: n
            });
        Yotpo.ajax(o, function () {}, "POST", r)
    }, Yotpo.emojiRegex = new RegExp("\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]", "g"), Yotpo.getPosition = function (e) {
        for (var t = 0, i = 0; e;) {
            if ("BODY" == e.tagName) {
                var n = e.scrollLeft || document.documentElement.scrollLeft,
                    o = e.scrollTop || document.documentElement.scrollTop;
                t += e.offsetLeft - n + e.clientLeft, i += e.offsetTop - o + e.clientTop
            } else t += e.offsetLeft - e.scrollLeft + e.clientLeft, i += e.offsetTop - e.scrollTop + e.clientTop;
            e = e.offsetParent
        }
        return {
            x: t,
            y: i
        }
    }, Yotpo.simulateClickEvent = function (e) {
        if (e.click) e.click();
        else if (document.createEvent) {
            var t = document.createEvent("MouseEvents");
            t.initEvent("click", !0, !0), e.dispatchEvent(t)
        }
    }, Yotpo.redirectToUrl = function (e) {
        window.location = e
    }, Yotpo.getStars = function (e) {
        e = parseFloat(e);
        for (var t = document.createElement("div"), i = 1; 5 >= i; i++) {
            var n = document.createElement("span");
            n.className = e + .25 >= i ? "yotpo-icon yotpo-icon-star" : e + .75 >= i ? "yotpo-icon yotpo-icon-half-star" : "yotpo-icon yotpo-icon-empty-star", t.appendChild(n)
        }
        return t
    }, Yotpo.debounce = function (e, t, i) {
        var n;
        return function () {
            var o = this,
                r = arguments,
                s = function () {
                    n = null, i || e.apply(o, r)
                },
                a = i && !n;
            clearTimeout(n), n = setTimeout(s, t), a && e.apply(o, r)
        }
    }, Yotpo.injectScript = function (e, t) {
        var i = document.createElement("script");
        i.setAttribute("type", "text/javascript");
        var n = document.createTextNode(e);
        i.appendChild(n), t.appendChild(i)
    }, Yotpo.injectCSS = function (e, t) {
        var i = document.createElement("style"),
            n = document.createTextNode(e);
        i.appendChild(n), t.appendChild(i)
    }, Yotpo.loadScript = function (e, t, i) {
        var n = document.createElement("script");
        n.setAttribute("type", "text/javascript"), n.src = e, n.onload = i, t.appendChild(n)
    }, Yotpo.getURLParameter = function (e, t) {
        return decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)")
            .exec(e) || [null, ""])[1].replace(/\+/g, "%20")) || null
    }, Yotpo.updateQueryStringParameter = function (e, t, i) {
        var n = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
            o = -1 !== e.indexOf("?") ? "&" : "?";
        return e.match(n) ? e.replace(n, "$1" + t + "=" + i + "$2") : e + o + t + "=" + i
    }, Yotpo.safeConsole = function () {}, Yotpo.getDefualtImage = function () {
        return Yotpo.defaultImages || {
            size_180: "",
            size_656: "",
            profile: ""
        }
    }, Yotpo.setHoverEnable = function (e) {
        Yotpo.isMobile() || Yotpo.addClass(e, "yotpo-hover-enable")
    }, Yotpo.isString = function (e) {
        return "string" == typeof e || e instanceof String
    }, Yotpo.isEmptyString = function (e) {
        return Yotpo.isString(e) && (0 === e.length || !e.trim())
    }, Yotpo.generateUUID = function () {
        var e = (new Date)
            .getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
            var i = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" === t ? i : 3 & i | 8)
                .toString(16)
        })
    }, Yotpo.removeUndefinedFields = function (e) {
        return JSON.parse(JSON.stringify(e))
    }, Yotpo.isMethodExists = function (e) {
        return "function" == typeof e
    }, Yotpo.toTitleCase = function (e) {
        return e.replace(/\w\S*/g, function (e) {
            return e.charAt(0)
                .toUpperCase() + e.substr(1)
                .toLowerCase()
        })
    }, Yotpo.ajax = function (e, t, i, n, o, r) {
        function s(e, t, i) {
            var n = a();
            return n && "withCredentials" in n ? (n.open(e, t, !0), n.withCredentials = "withCredentials" in i ? i.withCredentials : !0, n.setRequestHeader("Accept", "application/json", "text/html")) : "undefined" != typeof XDomainRequest ? (n = new XDomainRequest, n.onprogress = function () {}, n.open(e, t)) : n = null, n
        }

        function a() {
            if (window.XMLHttpRequest) return new XMLHttpRequest;
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0")
            } catch (e) {
                return null
            }
        }

        function l(e) {
            var t;
            return t = e.getXhrAsResponse ? d : d.responseText
        }

        function c(e, t) {
            t || (t = {}, t["Content-type"] = "application/x-www-form-urlencoded");
            for (var i in t) e.setRequestHeader(i, t[i])
        }
        r = r || {};
        var d = s(i ? i : "GET", e, r);
        return d ? (d.readyState ? d.onreadystatechange = function () {
            if (4 == d.readyState) {
                var e = l(r);
                o ? t(e, o) : t(e)
            }
        } : d.onload = function () {
            var e = l(r);
            o ? t(e, o) : t(e)
        }, d.onerror = function () {
            Yotpo.safeConsole("There was an error making the request.", "error")
        }, "POST" == i && "withCredentials" in d && c(d, r.requestHeaders), d.send(n), !0) : (Yotpo.safeConsole("CORS not supported", "error"), !1)
    }, Yotpo.successfulResponse = function (e) {
        return e.status >= 200 && e.status < 300
    }, Yotpo.convertHashToQueryStringParams = function (e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
        return t.join("&")
    }, Yotpo.convertComplexObjectToQueryStringParams = function (e, t) {
        var i = [];
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var o;
                o = e instanceof Array ? t ? t + "[]" : "[]" : t ? t + "[" + n + "]" : n;
                var r = e[n];
                i.push(null !== r && "object" == typeof r ? Yotpo.convertComplexObjectToQueryStringParams(r, o) : encodeURIComponent(o) + "=" + encodeURIComponent(r))
            } return i.join("&")
    }, Yotpo.convertArrayToQueryStringParam = function (e, t) {
        for (var i = [], n = 0; n < t.length; n++) i.push(encodeURIComponent(e + "[]") + "=" + encodeURIComponent(t[n]));
        return i.length ? i.join("&") : ""
    }, Yotpo.Animations = function (e) {
        function t() {}

        function i(e) {
            var t = 0;
            do null != e.offsetTop && (t += e.offsetTop); while (e = e.offsetParent);
            return t
        }

        function n(e, t) {
            t = t / 1e3 + "s", e.style["-webkit-transition-duration"] = t, e.style["-webkit-transition-duration"] = t, e.style["-moz-transition-duration"] = t, e.style["-o-transition-duration"] = t, e.style["-ms-transition-duration"] = t, e.style["transition-duration"] = t
        }
        return t.slideDown = function (t) {
            e.removeClass(t, "yotpo-animation-fade");
            var i = t.parentNode.offsetWidth + "px";
            t.style.position = "absolute", t.style.top = "-10000px", t.style.display = "block", t.style.width = i;
            var n = t.offsetHeight + "px";
            t.style.height = 0, t.style.width = "", t.style.overflow = "hidden", t.style.right = "0", t.style.top = "0", t.style.position = "relative", setTimeout(function () {
                e.addClass(t, "yotpo-animation-slide")
            }, 10), setTimeout(function () {
                t.style.height = n
            }, 20), setTimeout(function () {
                t.style.height = "auto", e.removeClass(t, "yotpo-animation-slide")
            }, 1e3)
        }, t.slideUp = function (t) {
            e.removeClass(t, "yotpo-animation-fade");
            var i = t.offsetHeight + "px";
            e.addClass(t, "yotpo-animation-slide"), t.style.height = i, t.style.overflow = "hidden", setTimeout(function () {
                t.style.height = "0px"
            }, 10), setTimeout(function () {
                t.style.height = i, e.removeClass(t, "yotpo-animation-slide"), t.style.display = "none"
            }, 1e3)
        }, t.toggleSlide = function (t) {
            "block" != e.getDisplayStyle(t) ? e.Animations.slideDown(t) : e.Animations.slideUp(t)
        }, t.fadeIn = function (t, i) {
            i = i || "200", e.addClass(t, "yotpo-animation-fade"), e.removeClass(t, "yotpo-hidden"), n(t, i), t.style.opacity = 0, t.style.display = "inherit", setTimeout(function () {
                t.style.opacity = 1, e.removeClass(t, "yotpo-animation-fade")
            }, 1)
        }, t.fadeOut = function (t, i) {
            i = i || "200", e.addClass(t, "yotpo-animation-fade"), n(t, i), setTimeout(function () {
                t.style.opacity = 0
            }, 1), setTimeout(function () {
                t.style.display = "none", e.removeClass(t, "yotpo-animation-fade")
            }, i)
        }, t.toggleFade = function (t, i) {
            "none" == e.getDisplayStyle(t) ? e.Animations.fadeIn(t, i) : e.Animations.fadeOut(t, i)
        }, t.scrollToElement = function (e, t) {
            var n = i(e),
                o = document.scrollingElement || document.documentElement || document.body;
            if (o) {
                var r = "scrollTop",
                    s = o.scrollTop,
                    a = (new Date)
                    .getTime(),
                    l = setInterval(function () {
                        var e = Math.min(1, ((new Date)
                            .getTime() - a) / t);
                        o[r] = s + e * (n - s), 1 === e && clearInterval(l)
                    }, 25);
                o[r] = s
            }
        }, t
    }(Yotpo), Yotpo.Session = function (e) {
        function t() {}
        return t.prototype.get = function (t, i) {
            var n = this,
                o = {
                    token: {
                        route: e.getWidgetHost("dynamic") + "/sessions/login",
                        handler: function (e) {
                            return e.token
                        }
                    },
                    user: {
                        route: e.getApiHost("dynamic") + "/users/me?utoken=" + n.token,
                        handler: function (e) {
                            return e.response.user
                        }
                    }
                };
            n[t] ? i(n[t]) : e.ajax(o[t].route, function (e) {
                try {
                    e = JSON.parse(e), n[t] = o[t].handler(e)
                } catch (r) {}
                i(n[t])
            })
        }, t.prototype.init = function () {
            var t = this;
            e.ajax(e.getWidgetHost("dynamic") + "/sessions/sign_in_url", function (e) {
                e = JSON.parse(e), t.signInUrl = e.url, t.trigger("init")
            })
        }, t.prototype.signInNetwork = function (e) {
            return this.signInUrl + "&network=" + e
        }, t.prototype.checkLogin = function (e) {
            var t = this;
            t.get("token", function () {
                t.trigger("checkLogin", {
                    submit: e || !1
                })
            })
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Review = function (e) {
        function t(t, n) {
            this.params = {}, e.copy(t, this.params), this.analyticCatgeory = n || i
        }
        var i = "reviews";
        return t.load = function (t, i) {
            var n = new e.Review({
                id: +t.getAttribute("data-review-id")
            }, i);
            e.Modules.Handle.action.call(t), e.Modules.Handle.tooltip.call(t), e.Modules.Vote.bind.call(t, n);
            var o = function () {
                e.currentAnalytics.trackEvent(n.analyticCatgeory, "clicked_on", "widget_expand_content")
            };
            e.Modules.CollapsibleElement.bind(t, 350, "content-review", o);
            var r = t.querySelectorAll(".yotpo-multiple-rating-fields  .yotpo-question-field, .yotpo-multiple-rating-fields .yotpo-product-related-fields, .yotpo-multiple-rating-fields .yotpo-user-field", ".product-related-fields");
            e.CustomFields.bind(r, n.get("id"));
            var s = t.querySelectorAll(".aggregated-product-related-fields");
            return e.CustomFields.bindProductRelatedFields(s), n
        }, t.prototype.setOriginalElement = function (e) {
            this.originalElement = e
        }, t.prototype.get = function (e) {
            return this.params[e]
        }, t.prototype.formatUserName = function (e) {
            if (!e.includes(" ")) return e;
            var t = e.split(" ");
            return t[0] + " " + t[t.length - 1].substring(0, 1) + "."
        }, t.prototype.getType = function () {
            return "review"
        }, t.prototype.setUser = function (e) {
            this.user = e
        }, t.prototype.save = function (t) {
            t = t || !1;
            var i = this,
                n = e.convertComplexObjectToQueryStringParams(this.params),
                o = e.getApiHost() + (t ? "/v1/widget/reviews" : "/reviews/dynamic_create.json");
            "GET" == e.dynamicCreateType && (o += "?" + n), e.ajax(o, function (e) {
                i.data = JSON.parse(e);
                var t = i.data.code || i.data.status.code;
                switch (t) {
                case 200:
                    i.trigger("save");
                    break;
                default:
                    i.trigger("error")
                }
            }, e.dynamicCreateType, n)
        }, t.prototype.vote = function (t, i) {
            e.Modules.Vote.perform.call(this, t, i), e.currentAnalytics.trackEvent(this.analyticCatgeory, "clicked_on", "vote_" + t)
        }, t.prototype.updateOriginalVote = function (e, t) {
            if (this.originalElement) {
                var i = this.originalElement.querySelector(".vote-sum[data-type=" + e + "]");
                i && (i.innerHTML = +i.innerHTML + t)
            }
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.render = function (t) {
            var i = this.user ? this.user.display_name : this.formatUserName(this.get("display_name")),
                n = t.cloneNode(!0);
            n.querySelector(".yotpo-user-letter")
                .innerHTML = i.substr(0, 1)
                .toUpperCase(), n.querySelector(".yotpo-user-name")
                .innerHTML = i;
            var o = n.querySelector(".yotpo-header"),
                r = o.querySelector(".label-with-tooltip");
            this.user ? (e.addClass(o, "yotpo-verified-user"), e.removeClass(r, "yotpo-hidden")) : (e.removeClass(o, "yotpo-verified-user"), e.addClass(r, "yotpo-hidden"));
            for (var s = n.querySelectorAll(".yotpo-review-stars .yotpo-icon"), a = +this.get("review_score"), l = 0; l < s.length; ++l) e.removeClass(s[l], a > l ? "yotpo-icon-empty-star" : "yotpo-icon-star"), e.addClass(s[l], l >= a ? "yotpo-icon-empty-star" : "yotpo-icon-star");
            n.querySelector(".content-title")
                .innerHTML = this.get("review_title"), n.querySelector(".content-review")
                .innerHTML = this.get("review_content")
                .replace(/\n/g, "</br>");
            var c = n.querySelector(".product-link");
            c && (c.innerHTML += this.get("product_title"));
            var d = n.querySelector(".product-link-wrapper");
            d && d.setAttribute("href", this.get("product_url"));
            for (var u = n.querySelectorAll(".social-link"), l = 0; l < u.length; ++l) {
                var p = this.shareLink(u[l].getAttribute("data-network")
                        .toLowerCase())
                    .get("link");
                u[l].setAttribute("href", p)
            }
            e.CustomFieldsRenderer.render(n, this.params), e.removeClass(n, "yotpo-template"), e.removeClass(n, "yotpo-hidden");
            var g = document.createElement("div");
            g.appendChild(n), t.insertAdjacentHTML("afterend", g.innerHTML), e.Modules.Handle.action.call(t.nextSibling)
        }, t.prototype.shareLinks = function () {
            var t = this;
            return t._shareLinks || (t._shareLinks = {}, e.forEach(["facebook", "twitter", "google", "linkedin"], function (i) {
                t._shareLinks[i] = new e.ShareLink(i, t.params)
            })), t._shareLinks
        }, t.prototype.shareLink = function (e) {
            return this.shareLinks()[e]
        }, t
    }(Yotpo), Yotpo.InstagramPost = function (e) {
        function t(e, t, i) {
            this.params = {
                id: e
            }, this.originalElement = t, this.analyticsCategory = i
        }
        return t.load = function (t, i, n) {
            var o = new e.InstagramPost(t.getAttribute("data-instagram-id"), i, n);
            return e.Modules.Handle.action.call(t), e.Modules.Vote.bind.call(t, o), o
        }, t.prototype.get = function (e) {
            return this.params[e]
        }, t.prototype.getType = function () {
            return "instagram"
        }, t.prototype.vote = function (t, i) {
            e.Modules.Vote.perform.call(this, t, i), e.currentAnalytics.trackEvent(this.analyticsCategory, "clicked_on", "vote_" + t)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.updateOriginalVote = function (e, t) {
            var i = this.originalElement.querySelector(".vote-sum[data-type=" + e + "]");
            i && (i.innerHTML = +i.innerHTML + t)
        }, t
    }(Yotpo), Yotpo.Question = function (e) {
        function t(t) {
            this.params = {}, e.copy(t, this.params)
        }
        return t.load = function (t) {
            var i = new e.Question({
                id: +t.getAttribute("data-question-id")
            });
            e.Modules.Handle.action.call(t), e.Modules.Handle.tooltip.call(t);
            for (var n, o = t.querySelectorAll(".yotpo-comment"), r = 0; n = o[r]; r++) e.Answer.load(n);
            return i
        }, t.prototype.setUser = function (e) {
            this.user = e
        }, t.prototype.save = function () {
            var t = this,
                i = e.getApiHost() + "/questions/send_confirmation_mail",
                n = e.convertHashToQueryStringParams(this.params);
            "GET" == e.dynamicCreateType && (i += "?" + n), e.ajax(i, function (e) {
                t.data = JSON.parse(e), t.trigger("save")
            }, e.dynamicCreateType, n)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Answer = function (e) {
        function t(t) {
            this.params = {}, e.copy(t, this.params)
        }
        return t.load = function (t) {
            var i = new e.Answer({
                id: +t.getAttribute("data-answer-id")
            });
            return e.Modules.Vote.bind.call(t, i), i
        }, t.prototype.vote = function (t, i) {
            e.Modules.Vote.perform.call(this, t, i), e.currentAnalytics.trackEvent("answers", "clicked_on", "vote_" + t)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.get = function (e) {
            return this.params[e]
        }, t.prototype.getType = function () {
            return "answer"
        }, t
    }(Yotpo), Yotpo.Tabs = function (e) {
        function t(e) {
            var t = this;
            t.element = e, t.tabs = t.element.querySelectorAll("li[data-content]");
            for (var i = 0; i < t.tabs.length; ++i) t.tabs[i].onclick = function (e) {
                return t.activate(this) && t.trigger("changed", {
                    element: this,
                    event: e
                }), !1
            }
        }
        return t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getTabs = function () {
            return this.tabs
        }, t.prototype.getTab = function (e) {
            for (var t = 0; t < this.tabs.length; ++t)
                if (this.tabs[t].getAttribute("data-type") == e) return this.tabs[t];
            return null
        }, t.prototype.getActive = function () {
            for (var t = 0; t < this.tabs.length; ++t)
                if (e.hasClass(this.tabs[t], "yotpo-active")) return this.tabs[t]
        }, t.prototype.activate = function (t) {
            if (e.hasClass(t, "yotpo-active")) return !1;
            for (var i = 0; i < this.tabs.length; ++i) e.removeClass(this.tabs[i], "yotpo-active"), e.forEach(this.tabs[i].getAttribute("data-content")
                .split(" "),
                function (t) {
                    var i = document.getElementById(t);
                    i && e.removeClass(i, "yotpo-active")
                });
            return e.addClass(t, "yotpo-active"), e.forEach(t.getAttribute("data-content")
                .split(" "),
                function (t) {
                    var i = document.getElementById(t);
                    i && e.addClass(i, "yotpo-active")
                }), !0
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Select = function (e) {
        function t(e) {
            this.element = e, this.selected = this.element.getElementsByClassName("selected")[0], this.list = this.element.getElementsByClassName("list-categories")[0];
            for (var t in n) n.hasOwnProperty(t) && this.on(t, n[t]);
            i.call(this)
        }

        function i() {
            function t(e, t) {
                if ("change" == e) {
                    var n = i.selected.getAttribute("data-selected-key"),
                        o = t.getAttribute("sort-name");
                    return n != o
                }
                return !0
            }
            var i = this,
                n = [];
            n.push({
                name: "toggle",
                elements: i.element.querySelectorAll(".yotpo-dropdown-button .selected, .yotpo-dropdown-button .yotpo-icon, .filters-dropdown .yotpo-dropdown-button, .sort-drop-down .yotpo-dropdown-button ")
            }), n.push({
                name: "change",
                elements: i.list.querySelectorAll(".list-category")
            }), n.push({
                name: "click",
                elements: i.list.getElementsByClassName("list-category")
            }), e.forEach(n, function (n) {
                for (var o = 0; o < n.elements.length; ++o) e.addEventListener(n.elements[o], "click", function (e, n) {
                    return function (o) {
                        t(e, n) && i.trigger(e, {
                            element: n
                        }, o)
                    }
                }(n.name, n.elements[o]))
            }), e.addEventListener(window, "click", function () {
                i.list.style.display = "none"
            })
        }
        var n = {};
        return t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getType = function () {
            return this.element.getAttribute("data-type")
        }, t.prototype.getValue = function () {
            return this.element.getAttribute("data-value")
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i, n) {
            e.Modules.Event.trigger.call(this, t, i, n)
        }, n = {
            toggle: function (t, i) {
                e.toggleVisibility(this.list), i ? "undefined" != typeof i.stopPropagation ? i.stopPropagation() : i.cancelBubble = !0 : window.event.cancelBubble = !0;
                var n = this.list,
                    o = document.querySelectorAll(".yotpo-dropdown.list-categories");
                o.forEach(function (t) {
                    n !== t && "none" !== e.getDisplayStyle(t) && e.toggleVisibility(t)
                })
            },
            change: function (t) {
                this.element.setAttribute("data-value", t.element.getAttribute("data-value")), this.selected.setAttribute("data-selected-key", t.element.getAttribute("sort-name")), e.addClass(this.selected, "non-default-item-selected"), this.selected.innerHTML = t.element.children.length > 0 ? e.getElementText(t.element.children[0]) : ""
            },
            click: function (t, i) {
                for (var o = ["property", "label", "category"], r = 0; r < o.length; ++r) attrName = "data-analytic-" + o[r], t.element.getAttribute(attrName) && this.element.setAttribute(attrName, t.element.getAttribute(attrName));
                this.element.getAttribute("data-analytic-category") && e.currentAnalytics.trackEvent(this.element.getAttribute("data-analytic-category"), "clicked_on", this.element.getAttribute("data-analytic-label"), this.element.getAttribute("data-analytic-property")), n.toggle.call(this, t, i)
            }
        }, t
    }(Yotpo), Yotpo.Stars = function (e) {
        function t(e) {
            this.element = e, this.stars = this.element.getElementsByClassName("review-star"), this.score = 0, i.call(this)
        }

        function i() {
            for (var e = this, t = 0; t < e.stars.length; ++t) e.stars[t].onclick = function () {
                e.setScore(+this.getAttribute("data-score")), e.trigger("changed")
            }, e.stars[t].onmouseover = function () {
                n.call(e.stars, +this.getAttribute("data-score"))
            };
            e.element.onmouseout = function () {
                n.call(e.stars, e.getScore())
            }
        }

        function n(e) {
            for (var t = 0; t < this.length; ++t) o.call(this[t], e > t)
        }

        function o(t) {
            var i = t ? "yotpo-icon-star" : "yotpo-icon-empty-star",
                n = t ? "yotpo-icon-empty-star" : "yotpo-icon-star";
            e.hasClass(this, i) || (e.addClass(this, i), e.removeClass(this, n))
        }
        return t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getStars = function () {
            return this.stars
        }, t.prototype.getScore = function () {
            return this.score
        }, t.prototype.setScore = function (e) {
            this.score = e, n.call(this.stars, e)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Messages = function (e) {
        function t(e) {
            this.messages = {};
            for (var t, n = 0; t = e[n]; n++)
                for (var o = t.querySelectorAll(".yotpo-thank-you, .yotpo-thankyou-confirmation"), r = 0; r < o.length; ++r) this.messages[o[r].getAttribute("data-type")] = o[r];
            i.call(this.messages)
        }

        function i() {
            var t = this;
            e.forEach(Object.keys(t), function (i) {
                var n = t[i],
                    o = n.querySelectorAll(".yotpo-icon-cross")[0];
                o && (o.onclick = function () {
                    e.addClass(n, "yotpo-hidden")
                })
            })
        }
        return t.prototype.get = function (e) {
            return this.messages[e]
        }, t.prototype.show = function (t) {
            e.removeClass(this.messages[t], "yotpo-hidden")
        }, t.prototype.hide = function (t) {
            e.addClass(this.messages[t], "yotpo-hidden")
        }, t.prototype.hideAll = function () {
            for (var t in this.messages) {
                var i = this.messages[t];
                this.messages.hasOwnProperty(t) && !e.hasClass(i, "yotpo-hidden") && e.addClass(i, "yotpo-hidden")
            }
        }, t
    }(Yotpo), Yotpo.Form = function (e) {
        function t(t, i) {
            this._controller = t, this.element = i, this.submitButton = this.element.getElementsByClassName("yotpo-submit")[0], this.CustomFieldsForm = new e.CustomFieldsForm(this.getElement()
                    .getElementsByClassName("form-element yotpo-custom-tag-field")), n.call(this), o.call(this), r.call(this), this.getElement()
                .querySelector(".socialize-wrapper") && s.call(this), l.call(this), c.call(this), e.Modules.Handle.popup.call(this)
        }

        function i(t) {
            for (var i in t)
                if (-1 == i.search("custom_fields") && t.hasOwnProperty(i)) {
                    t[i] = e.escapeHtml(t[i]);
                    for (var n in u[i])
                        if (u[i].hasOwnProperty(n) && 0 == u[i][n](t[i])) throw {
                            message: "FieldNotValid:" + i,
                            field: i,
                            type: n
                        }
                }
        }

        function n() {
            var t = this,
                i = this.getElement()
                .getElementsByClassName("stars-wrapper")[0];
            i && (t.stars = new e.Stars(i), t.stars.on("changed", function () {
                e.currentAnalytics.trackEvent(t._controller.analyticsCategory, "clicked_on", t.stars.getScore())
            }))
        }

        function o() {
            var e = this;
            e.error = {}, e.error.box = e.getElement()
                .getElementsByClassName("error-box")[0], e.error.box.getElementsByClassName("yotpo-icon-cross")[0].onclick = function () {
                    e.hideErrorBox()
                }
        }

        function r() {
            var t = this,
                i = t.getElement()
                .querySelector(".write-form > .write-review > .yotpo-icon-btn > .yotpo-icon-cross");
            i && (i.onclick = function () {
                e.removeClass(t.getElement(), "visible"), t.getElement()
                    .style.display = "none"
            })
        }

        function s() {
            var t = this,
                i = new e.Session;
            i.on("checkLogin", function (e) {
                i.token && i.get("user", function (n) {
                    n.token = i.token, a.call(t, n), e.submit && t.submit()
                })
            }), t.on("opened", function () {
                i.checkLogin()
            }), i.on("init", function () {
                for (var n = t.getElement()
                        .querySelectorAll(".socialize .yotpo-icon-btn"), o = 0; o < n.length; ++o) n[o].onclick = function (n) {
                    return function () {
                        e.currentAnalytics.trackEvent(t._controller.analyticsCategory, "clicked_on", "connect_" + n);
                        var o = window.open(i.signInNetwork(n), "", "status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=yes,resizeable=yes,width=" + p[n][0] + ",height=" + p[n][1] + ",top=200,left=400");
                        window.focus && o.focus();
                        var r = setInterval(function () {
                            o.closed && (clearInterval(r), i.checkLogin(!0))
                        }, 200);
                        return !1
                    }
                }(n[o].getAttribute("data-network"))
            }), i.init()
        }

        function a(t) {
            this.user = t;
            var i = this.getElement()
                .querySelector(".socialize-wrapper .username");
            i && (i.innerHTML = this.user.name);
            var n = [];
            n.push({
                elements: this.getElement()
                    .querySelectorAll(".socialize-wrapper .socialize, .socialize-wrapper .yotpo-or, .connect-wrapper .form-element"),
                name: "hide"
            }), n.push({
                elements: this.getElement()
                    .querySelectorAll(".socialize-wrapper .connected, .yotpo-footer"),
                name: "show"
            }), e.forEach(n, function (t) {
                for (var i = 0; i < t.elements.length; ++i) e[t.name](t.elements[i])
            }), this.activate()
        }

        function l() {
            var t = this;
            t.submitButton.onclick = function () {
                e.hasClass(t.submitButton, "yotpo-disabled") || t.submit()
            }
        }

        function c() {
            var t = this,
                i = t.getElement()
                .getElementsByClassName("write-review")[0];
            i.onkeydown = function (i) {
                i = i || event, 13 != i.keyCode || e.hasClass(i.srcElement, "yotpo-text-box") || t.submit()
            }
        }

        function d(t) {
            for (var i = this.getElementsByClassName("social-link"), n = 0; n < i.length; ++n) {
                var o = i[n].getAttribute("data-network");
                i[n].href = t[o].get("link")
            }
            e.Modules.Handle.popup.call(this)
        }
        var u = {},
            p = {};
        return t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getType = function () {
            var e = this._controller.getActiveSource() ? this._controller.getActiveSource()
                .getType() : this._controller.get("settings")
                .mode || "reviews";
            return e = e.substr(0, e.length - 1)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.activate = function () {
            e.removeClass(this.submitButton, "yotpo-disabled")
        }, t.prototype.submit = function () {
            e.addClass(this.submitButton, "yotpo-disabled"), this.cleanErrors();
            var t = {};
            "undefined" != typeof this.stars && (t.review_score = this.stars.getScore()
                .toString());
            for (var i = this.getElement()
                    .getElementsByClassName("form-element"), n = {}, o = 0; o < i.length; ++o) {
                var r = i[o];
                if (!e.isHidden(r)) {
                    var s = r.getElementsByClassName("y-input");
                    if (s.length) {
                        var a = s[0];
                        if (!a.name) continue;
                        n[a.name] = a, t[a.name] = a.value
                    }
                }
            }
            e.copy(this.CustomFieldsForm.getValues(), t);
            var l = this._controller._controller;
            l.getUserReference() && e.hasClass(this.element, "write-review-wrapper") && (t.user_reference = l.getUserReference());
            try {
                this.saveContent(this.getType(), t)
            } catch (c) {
                e.removeClass(this.submitButton, "yotpo-disabled");
                var d = n[c.field] || this.CustomFieldsForm.getFieldElement(c.field);
                d && (e.hasClass(d, "yotpo-custom-tag-field") ? this.CustomFieldsForm.showFieldError(d, c.type) : e.addClass(d, "error")), "empty" == c.type && ("review_title" == c.field ? e.currentAnalytics.trackEvent(this._controller.analyticsCategory, "failure_forgot", "title") : "review_content" == c.field && e.currentAnalytics.trackEvent(this._controller.analyticsCategory, "failure_forgot", "body")), "review_score" == c.field && (d = this.stars.getElement()), this.showError(d, c.type)
            }
        }, t.prototype.visible = function () {
            return e.hasClass(this.getElement(), "visible")
        }, t.prototype.clean = function () {
            function t(t) {
                e.removeClass(t, "visible"), t.style.display = "none"
            }
            t(this.getElement());
            for (var i = this.getElement()
                    .getElementsByClassName("visible"), n = i.length - 1; n >= 0; --n) t(i[n]);
            for (var o = this.getElement()
                    .querySelectorAll(".form-element .y-input[name]"), n = 0; n < o.length; ++n) o[n].value = "";
            this.CustomFieldsForm.reset(), "undefined" != typeof this.stars && this.stars.setScore(0), this.submitButton.style.marginTop = null
        }, t.prototype.showError = function (t, i) {
            for (var n = this.error.box.getElementsByClassName("error-text"), o = 0; o < n.length; o++) e.hasClass(n[o], i) ? e.show(n[o]) : e.hide(n[o]);
            e.removeClass(this.error.box, "yotpo-hidden")
        }, t.prototype.hideErrorBox = function () {
            e.addClass(this.error.box, "yotpo-hidden")
        }, t.prototype.cleanErrors = function () {
            this.hideErrorBox(), this.CustomFieldsForm.cleanErrors();
            for (var t = this.getElement()
                    .querySelectorAll(".y-input.error"), i = 0; i < t.length; ++i) e.removeClass(t[i], "error")
        }, t.prototype.saveContent = function (t, n) {
            var o = this,
                r = o._controller._controller,
                s = 0 != r.getUserSetting("async_create");
            if (i(n), o._controller.tabs && "site" == o._controller.tabs.getActive()
                .getAttribute("data-type") ? n.product_tags && delete n.product_tags : this.CustomFieldsForm.validate(n), n.appkey = o._controller.getAppKey(), window.location.host == e.hosts.b2b.dynamic) {
                var a = window.location.pathname;
                n.review_source = "/facebook_testimonials" == a ? "widget_v2_facebook_tab" : "/site_reviews_landing_page" == a ? "widget_v2_dedicated_page" : "widget_v2"
            } else n.review_source = "widget_v2";
            this.user && (n.utoken = this.user.token), e.copy(o._controller.getProductInfo(), n);
            var l = !1,
                c = o._controller._controller.getUserSetting("vendor_review_creation");
            if (c) {
                var u = o._controller._controller.getTrustedVendorsData();
                if (Object.keys(u)
                    .length > 0 && ("1" == c.settings.show_name_field && delete u.display_name, l = !0, e.copy(u, n), o._controller.tabs && "site" == o._controller.tabs.getActive()
                        .getAttribute("data-type"))) {
                    var p = o._controller._controller.getWidgetByName("Main");
                    p && e.copy({
                        page_pid: p.settings.pid
                    }, n)
                }
            }
            r.getUserSetting("prevent_duplicate_reviews") && (n.prevent_duplicate_review = !0);
            var g = e[e.capitalize(t)];
            if ("undefined" == typeof g) throw "Error resource is undefined - " + g;
            var h = this.getElement();
            e.togglePreLoader(h), e.currentAnalytics.trackEvent(o._controller.analyticsCategory, "shown", "review_posted");
            var m = new g(n);
            m.on("save", function () {
                e.togglePreLoader(h);
                var i = o._controller.getActiveSource(),
                    n = i ? i.getTemplate() : null,
                    s = "undefined" != typeof r.getUserSetting("account_settings")
                    .settings.auto_publish && "review" == t,
                    a = r.getUserSetting("show_social_links"),
                    c = o._controller.get("messages");
                "function" == typeof m.shareLinks && d.call(c.get("share"), m.shareLinks()), n ? (m.render(n), i.trigger("updated")) : (o.clean(), c.show(s || a ? "share" : "pending-for-" + t + "-approval"), "question" != t || l || c.show("question-approval"))
            }), m.on("error", function () {
                e.togglePreLoader(h), 400 == this.data.code && "duplicate_review" == this.data.message && (e.currentAnalytics.trackEvent(o._controller.analyticsCategory, "shown", "duplicate_reviews"), o.showError(h.querySelector("[name=review_content]"), "user-already-reviewed"))
            }), m.setUser(this.user), m.save(s)
        }, t.prototype.setInputField = function (e, t) {
            var i = this.getInputField(e);
            i && (i.value = t)
        }, t.prototype.getInputField = function (e) {
            return this.element.querySelector('input[name="' + e + '"]')
        }, u = {
            appkey: {
                empty: e.validateStringMinLength,
                max_length: e.validateStringMaxLength
            },
            email: {
                email: e.validateEmail
            },
            display_name: {
                display_name_empty: e.validateStringMinLength,
                max_length: function (t) {
                    return e.validateStringMaxLength(t, 40)
                }
            },
            sku: {
                empty: e.validateStringMinLength,
                max_length: e.validateStringMaxLength
            },
            product_title: {
                empty: e.validateStringMinLength,
                max_length: e.validateStringMaxLength
            },
            product_description: {
                max_length: function (t) {
                    return e.validateStringMaxLength(t, 1e3)
                }
            },
            product_url: {
                empty: e.validateStringMinLength,
                max_length: e.validateStringMaxLength
            },
            product_image_url: {
                max_length: e.validateStringMaxLength
            },
            review_score: {
                score: function (e) {
                    return +e > 0
                }
            },
            review_title: {
                empty: e.validateStringMinLength,
                max_length: e.validateStringMaxLength
            },
            review_content: {
                empty: e.validateStringMinLength,
                max_length: function (t) {
                    return e.validateStringMaxWords(t, 5e3)
                }
            },
            content: {
                empty: e.validateStringMinLength,
                max_length: function (t) {
                    return e.validateStringMaxWords(t, 5e3)
                }
            }
        }, p = {
            facebook: [984, 600],
            twitter: [680, 760],
            linkedin: [488, 577],
            google_oauth2: [960, 531]
        }, t
    }(Yotpo), Yotpo.FileUploader = function (e) {
        function t(e, t) {
            this.file = e, this.errors = [], this.validations = t
        }

        function i(t, i) {
            e.successfulResponse(i) || this.errors.push(i.responseText), this.trigger("complete", {
                errors: this.errors,
                file: this.file,
                url: t.url
            })
        }

        function n(t, i, n) {
            var r = new FormData;
            switch (i) {
            case e.FileUploader.TYPE.S3:
                o.call(this, t, r, n);
                break;
            default:
                for (var s in t) r.append(s, t[s])
            }
            return r.append("Content-Type", this.file.type), r.append("file", this.file), r
        }

        function o(t, i, n) {
            var o = s(t, e.FileUploader.TYPE.S3, n);
            i.append("key", o), i.append("acl", "public-read"), i.append("X-Amz-Credential", t.credential), i.append("Policy", t.encoded_policy), i.append("X-Amz-Date", t.date), i.append("X-Amz-Signature", t.signature), i.append("x-amz-meta-uuid", "14365123651274"), i.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256")
        }

        function r() {
            var t = e.generateUUID()
                .substring(0, 8);
            return t + "_" + this.file.name.replace(/[^\w.]/g, "_")
        }

        function s(t, i, n) {
            switch (i) {
            case e.FileUploader.TYPE.S3:
                return a(t.path) + n;
            default:
                return n
            }
        }

        function a(e) {
            return "/" !== e.charAt(e.length - 1) && (e += "/"), e
        }
        return t.TYPE = {
            S3: 1
        }, t.prototype.upload = function (t, o, l) {
            var c = r.call(this),
                d = n.call(this, o, l, c),
                u = {
                    withCredentials: !1,
                    requestHeaders: {},
                    getXhrAsResponse: !0
                },
                p = {
                    url: a(t) + s(o, l, c),
                    type: l
                };
            e.ajax(t, i.bind(this, p), "POST", d, null, u)
        }, t.prototype.validateAndUpload = function (t, i, n) {
            var o = new e.Helpers.FileValidator(this.file, this.validations),
                r = this;
            o.on("validated", function (e) {
                return e.length > 0 ? void r.trigger("complete", {
                    errors: e,
                    file: r.file,
                    url: null
                }) : void r.upload(t, i, n)
            }), o.validate()
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.removeEvent = function (t) {
            e.Modules.Event.removeEvent.call(this, t)
        }, t
    }(Yotpo), Yotpo.Analytics = function (Yotpo) {
        function Analytics(e) {
            this._controller = e, this.pageSku = e.pageSku;
            var t = e.getUserSetting("reporting_end_points");
            t ? initYotpoMultiAnalytics.apply(this, [t]) : initYotpoAnalytics.apply(this), this.trackedObjects = {};
            var i = e.getUserSetting("cookie_path");
            i && _yaq.push(["setCookiePath", i.settings.sub_path])
        }

        function trackYotpoEvent(e, t, i, n, o, r, s, a) {
            _yaq.push(["trackStructEvent", e, t, i, n, o, r, a, s])
        }

        function initYotpoAnalytics() {
            _yaq.push(["setCollectorCf", "d33im0067v833a"]), _yaq.push(["enableActivityTracking", 10, 10]), _yaq.push(["setAppId", yotpo_analytics_version])
        }

        function initYotpoMultiAnalytics(e) {
            _yaq.push(["setCollectorUrl", e]), _yaq.push(["enableActivityTracking", 10, 10]), _yaq.push(["setAppId", yotpo_analytics_version])
        }

        function isTemplateReview(e) {
            return "0" == e
        }
        this.JSON2 || (this.JSON2 = {}),
            function () {
                "use strict";

                function isArray(e) {
                    if ("isArray" in Array) return Array.isArray(e);
                    var t = Object.prototype.toString.call(e);
                    return "[object Array]" === t
                }

                function f(e) {
                    return 10 > e ? "0" + e : e
                }

                function objectToJSON(e, t) {
                    var i = Object.prototype.toString.apply(e);
                    return "[object Date]" === i ? isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null : "[object String]" === i || "[object Number]" === i || "[object Boolean]" === i ? e.valueOf() : isArray(e) || "function" != typeof e.toJSON ? e : e.toJSON(t)
                }

                function quote(e) {
                    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                        var t = meta[e];
                        return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0)
                                .toString(16))
                            .slice(-4)
                    }) + '"' : '"' + e + '"'
                }

                function str(e, t) {
                    var i, n, o, r, s, a = gap,
                        l = t[e];
                    switch (l && "object" == typeof l && (l = objectToJSON(l, e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                    case "string":
                        return quote(l);
                    case "number":
                        return isFinite(l) ? String(l) : "null";
                    case "boolean":
                    case "null":
                        return String(l);
                    case "object":
                        if (!l) return "null";
                        if (gap += indent, s = [], isArray(l)) {
                            for (r = l.length, i = 0; r > i; i += 1) s[i] = str(i, l) || "null";
                            return o = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, o
                        }
                        if (rep && "object" == typeof rep)
                            for (r = rep.length, i = 0; r > i; i += 1) "string" == typeof rep[i] && (n = rep[i], o = str(n, l), o && s.push(quote(n) + (gap ? ": " : ":") + o));
                        else
                            for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (o = str(n, l), o && s.push(quote(n) + (gap ? ": " : ":") + o));
                        return o = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, o
                    }
                }
                var cx = new RegExp("[\x00\xad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]", "g"),
                    pattern = '\\\\\\"\x00--\x9f\xad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]',
                    escapable = new RegExp("[" + pattern, "g"),
                    gap, indent, meta = {
                        "\b": "\\b",
                        " ": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    rep;
                "function" != typeof JSON2.stringify && (JSON2.stringify = function (e, t, i) {
                    var n;
                    if (gap = "", indent = "", "number" == typeof i)
                        for (n = 0; i > n; n += 1) indent += " ";
                    else "string" == typeof i && (indent = i);
                    if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                    return str("", {
                        "": e
                    })
                }), "function" != typeof JSON2.parse && (JSON2.parse = function (text, reviver) {
                    function walk(e, t) {
                        var i, n, o = e[t];
                        if (o && "object" == typeof o)
                            for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (n = walk(o, i), void 0 !== n ? o[i] = n : delete o[i]);
                        return reviver.call(e, t, o)
                    }
                    var j;
                    if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                            return "\\u" + ("0000" + e.charCodeAt(0)
                                    .toString(16))
                                .slice(-4)
                        })), new RegExp("^[\\],:{}\\s]*$")
                        .test(text.replace(new RegExp('\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})', "g"), "@")
                            .replace(new RegExp('"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', "g"), "]")
                            .replace(new RegExp("(?:^|:|,)(?:\\s*\\[)+", "g"), ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                        "": j
                    }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            }(), ! function (e) {
                var t = function () {
                    "use strict";
                    var e = "s",
                        i = function (e) {
                            var t = -e.getTimezoneOffset();
                            return null !== t ? t : 0
                        },
                        n = function () {
                            return i(new Date(2010, 0, 1, 0, 0, 0, 0))
                        },
                        o = function () {
                            return i(new Date(2010, 5, 1, 0, 0, 0, 0))
                        },
                        r = function (e) {
                            var t = e.getMonth() > 5 ? o() : n(),
                                r = i(e);
                            return t - r !== 0
                        },
                        s = function () {
                            var t = n(),
                                i = o(),
                                r = n() - o();
                            return 0 > r ? t + ",1" : r > 0 ? i + ",1," + e : t + ",0"
                        },
                        a = function () {
                            var e = s();
                            return new t.TimeZone(t.olson.timezones[e])
                        };
                    return {
                        determine_timezone: function () {
                            return "undefined" != typeof console && console.log("jstz.determine_timezone() is deprecated and will be removed in an upcoming version. Please use jstz.determine() instead."), a()
                        },
                        determine: a,
                        date_is_dst: r
                    }
                }();
                t.TimeZone = function (e) {
                    "use strict";
                    var i = null,
                        n = function () {
                            return i
                        },
                        o = function () {
                            for (var e = t.olson.ambiguity_list[i], n = e.length, o = 0, r = e[0]; n > o; o += 1)
                                if (r = e[o], t.date_is_dst(t.olson.dst_start_dates[r])) return void(i = r)
                        },
                        r = function () {
                            return "undefined" != typeof t.olson.ambiguity_list[i]
                        };
                    return i = e, r() && o(), {
                        name: n
                    }
                }, t.olson = {}, t.olson.timezones = {
                    "-720,0": "Etc/GMT+12",
                    "-660,0": "Pacific/Pago_Pago",
                    "-600,1": "America/Adak",
                    "-600,0": "Pacific/Honolulu",
                    "-570,0": "Pacific/Marquesas",
                    "-540,0": "Pacific/Gambier",
                    "-540,1": "America/Anchorage",
                    "-480,1": "America/Los_Angeles",
                    "-480,0": "Pacific/Pitcairn",
                    "-420,0": "America/Phoenix",
                    "-420,1": "America/Denver",
                    "-360,0": "America/Guatemala",
                    "-360,1": "America/Chicago",
                    "-360,1,s": "Pacific/Easter",
                    "-300,0": "America/Bogota",
                    "-300,1": "America/New_York",
                    "-270,0": "America/Caracas",
                    "-240,1": "America/Halifax",
                    "-240,0": "America/Santo_Domingo",
                    "-240,1,s": "America/Asuncion",
                    "-210,1": "America/St_Johns",
                    "-180,1": "America/Godthab",
                    "-180,0": "America/Argentina/Buenos_Aires",
                    "-180,1,s": "America/Montevideo",
                    "-120,0": "America/Noronha",
                    "-120,1": "Etc/GMT+2",
                    "-60,1": "Atlantic/Azores",
                    "-60,0": "Atlantic/Cape_Verde",
                    "0,0": "Etc/UTC",
                    "0,1": "Europe/London",
                    "60,1": "Europe/Berlin",
                    "60,0": "Africa/Lagos",
                    "60,1,s": "Africa/Windhoek",
                    "120,1": "Asia/Beirut",
                    "120,0": "Africa/Johannesburg",
                    "180,1": "Europe/Moscow",
                    "180,0": "Asia/Baghdad",
                    "210,1": "Asia/Tehran",
                    "240,0": "Asia/Dubai",
                    "240,1": "Asia/Yerevan",
                    "270,0": "Asia/Kabul",
                    "300,1": "Asia/Yekaterinburg",
                    "300,0": "Asia/Karachi",
                    "330,0": "Asia/Kolkata",
                    "345,0": "Asia/Kathmandu",
                    "360,0": "Asia/Dhaka",
                    "360,1": "Asia/Omsk",
                    "390,0": "Asia/Rangoon",
                    "420,1": "Asia/Krasnoyarsk",
                    "420,0": "Asia/Jakarta",
                    "480,0": "Asia/Shanghai",
                    "480,1": "Asia/Irkutsk",
                    "525,0": "Australia/Eucla",
                    "525,1,s": "Australia/Eucla",
                    "540,1": "Asia/Yakutsk",
                    "540,0": "Asia/Tokyo",
                    "570,0": "Australia/Darwin",
                    "570,1,s": "Australia/Adelaide",
                    "600,0": "Australia/Brisbane",
                    "600,1": "Asia/Vladivostok",
                    "600,1,s": "Australia/Sydney",
                    "630,1,s": "Australia/Lord_Howe",
                    "660,1": "Asia/Kamchatka",
                    "660,0": "Pacific/Noumea",
                    "690,0": "Pacific/Norfolk",
                    "720,1,s": "Pacific/Auckland",
                    "720,0": "Pacific/Tarawa",
                    "765,1,s": "Pacific/Chatham",
                    "780,0": "Pacific/Tongatapu",
                    "780,1,s": "Pacific/Apia",
                    "840,0": "Pacific/Kiritimati"
                }, t.olson.dst_start_dates = {
                    "America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
                    "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
                    "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
                    "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
                    "Atlantic/Stanley": new Date(2011, 8, 4, 7, 0, 0, 0),
                    "America/Asuncion": new Date(2011, 9, 2, 3, 0, 0, 0),
                    "America/Santiago": new Date(2011, 9, 9, 3, 0, 0, 0),
                    "America/Campo_Grande": new Date(2011, 9, 16, 5, 0, 0, 0),
                    "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
                    "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
                    "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
                    "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
                    "America/Havana": new Date(2011, 2, 13, 2, 0, 0, 0),
                    "America/New_York": new Date(2011, 2, 13, 7, 0, 0, 0),
                    "Asia/Gaza": new Date(2011, 2, 26, 23, 0, 0, 0),
                    "Asia/Beirut": new Date(2011, 2, 27, 1, 0, 0, 0),
                    "Europe/Minsk": new Date(2011, 2, 27, 2, 0, 0, 0),
                    "Europe/Helsinki": new Date(2011, 2, 27, 4, 0, 0, 0),
                    "Europe/Istanbul": new Date(2011, 2, 28, 5, 0, 0, 0),
                    "Asia/Damascus": new Date(2011, 3, 1, 2, 0, 0, 0),
                    "Asia/Jerusalem": new Date(2011, 3, 1, 6, 0, 0, 0),
                    "Africa/Cairo": new Date(2010, 3, 30, 4, 0, 0, 0),
                    "Asia/Yerevan": new Date(2011, 2, 27, 4, 0, 0, 0),
                    "Asia/Baku": new Date(2011, 2, 27, 8, 0, 0, 0),
                    "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
                    "Pacific/Fiji": new Date(2010, 11, 29, 23, 0, 0, 0),
                    "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
                    "America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0),
                    "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
                    "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0)
                }, t.olson.ambiguity_list = {
                    "America/Denver": ["America/Denver", "America/Mazatlan"],
                    "America/Chicago": ["America/Chicago", "America/Mexico_City"],
                    "America/Asuncion": ["Atlantic/Stanley", "America/Asuncion", "America/Santiago", "America/Campo_Grande"],
                    "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
                    "Asia/Beirut": ["Asia/Gaza", "Asia/Beirut", "Europe/Minsk", "Europe/Helsinki", "Europe/Istanbul", "Asia/Damascus", "Asia/Jerusalem", "Africa/Cairo"],
                    "Asia/Yerevan": ["Asia/Yerevan", "Asia/Baku"],
                    "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
                    "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
                    "America/New_York": ["America/Havana", "America/New_York"],
                    "America/Halifax": ["America/Goose_Bay", "America/Halifax"],
                    "America/Godthab": ["America/Miquelon", "America/Godthab"]
                }, "undefined" != typeof exports ? exports.jstz = t : e.jstz = t
            }(this);
        var _yaq = _yaq || [],
            SnowPlow = SnowPlow || function () {
                var e = window;
                return {
                    version: "js-0.13.2",
                    expireDateTime: null,
                    plugins: {},
                    hasLoaded: !1,
                    registeredOnLoadHandlers: [],
                    documentAlias: document,
                    windowAlias: e,
                    navigatorAlias: navigator,
                    screenAlias: screen,
                    encodeWrapper: e.encodeURIComponent,
                    decodeWrapper: e.decodeURIComponent,
                    decodeUrl: unescape,
                    asyncTracker: null
                }
            }();
        SnowPlow.isDefined = function (e) {
            return "undefined" != typeof e
        }, SnowPlow.isNotNull = function (e) {
            return null !== e
        }, SnowPlow.isFunction = function (e) {
            return "function" == typeof e
        }, SnowPlow.isArray = "isArray" in Array ? Array.isArray : function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, SnowPlow.isEmptyArray = function (e) {
            return SnowPlow.isArray(e) && e.length < 1
        }, SnowPlow.isObject = function (e) {
            return "object" == typeof e
        }, SnowPlow.isJson = function (e) {
            return SnowPlow.isDefined(e) && SnowPlow.isNotNull(e) && e.constructor === {}.constructor
        }, SnowPlow.isNonEmptyJson = function (e) {
            return SnowPlow.isJson(e) && e !== {}
        }, SnowPlow.isString = function (e) {
            return "string" == typeof e || e instanceof String
        }, SnowPlow.isNonEmptyString = function (e) {
            return SnowPlow.isString(e) && "" !== e
        }, SnowPlow.isDate = function (e) {
            return "[object Date]" === Object.prototype.toString.call(e)
        }, SnowPlow.encodeUtf8 = function (e) {
            return SnowPlow.decodeUrl(SnowPlow.encodeWrapper(e))
        }, SnowPlow.fixupTitle = function (e) {
            if (!SnowPlow.isString(e)) {
                e = e.text || "";
                var t = SnowPlow.documentAlias.getElementsByTagName("title");
                t && SnowPlow.isDefined(t[0]) && (e = t[0].text)
            }
            return e
        }, SnowPlow.getHostName = function (e) {
            var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
                i = t.exec(e);
            return i ? i[1] : e
        }, SnowPlow.hasSessionStorage = function () {
            try {
                return !!SnowPlow.windowAlias.sessionStorage
            } catch (e) {
                return !0
            }
        }, SnowPlow.hasLocalStorage = function () {
            try {
                return !!SnowPlow.windowAlias.localStorage
            } catch (e) {
                return !0
            }
        }, SnowPlow.toTimestamp = function (e, t) {
            return t ? e / 1 : Math.floor(e / 1e3)
        }, SnowPlow.toDatestamp = function (e) {
            return Math.floor(e / 864e5)
        }, SnowPlow.fixupUrl = function (e, t, i) {
            function n(e, t) {
                var i = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)"),
                    n = i.exec(e),
                    o = new RegExp("(?:^|&)" + t + "=([^&]*)"),
                    r = n ? o.exec(n[1]) : 0;
                return r ? SnowPlow.decodeWrapper(r[1]) : ""
            }
            return "translate.googleusercontent.com" === e ? ("" === i && (i = t), t = n(t, "u"), e = SnowPlow.getHostName(t)) : ("cc.bingj.com" === e || "webcache.googleusercontent.com" === e || "74.6." === e.slice(0, 5)) && (t = SnowPlow.documentAlias.links[0].href, e = SnowPlow.getHostName(t)), [e, t, i]
        }, SnowPlow.fixupDomain = function (e) {
            var t = e.length;
            return "." === e.charAt(--t) && (e = e.slice(0, t)), "*." === e.slice(0, 2) && (e = e.slice(1)), e
        }, SnowPlow.getReferrer = function () {
            var e = "";
            try {
                e = SnowPlow.windowAlias.top.document.referrer
            } catch (t) {
                if (SnowPlow.windowAlias.parent) try {
                    e = SnowPlow.windowAlias.parent.document.referrer
                } catch (i) {
                    e = ""
                }
            }
            return "" === e && (e = SnowPlow.documentAlias.referrer), e
        }, SnowPlow.addEventListener = function (e, t, i, n) {
            return e.addEventListener ? (e.addEventListener(t, i, n), !0) : e.attachEvent ? e.attachEvent("on" + t, i) : void(e["on" + t] = i)
        }, SnowPlow.getCookie = function (e) {
            var t = new RegExp("(^|;)[ ]*" + e + "=([^;]*)"),
                i = t.exec(SnowPlow.documentAlias.cookie);
            return i ? SnowPlow.decodeWrapper(i[2]) : 0
        }, SnowPlow.setCookie = function (e, t, i, n, o, r) {
            var s;
            i && (s = new Date, s.setTime(s.getTime() + i)), SnowPlow.documentAlias.cookie = e + "=" + SnowPlow.encodeWrapper(t) + (i ? ";expires=" + s.toGMTString() : "") + ";path=" + (n || "/") + (o ? ";domain=" + o : "") + (r ? ";secure" : "")
        }, SnowPlow.executePluginMethod = function (e, t) {
            var i, n, o = "";
            for (i in SnowPlow.plugins) Object.prototype.hasOwnProperty.call(SnowPlow.plugins, i) && (n = SnowPlow.plugins[i][e], SnowPlow.isFunction(n) && (o += n(t)));
            return o
        }, SnowPlow.sha1 = function (e) {
            var t, i, n, o, r, s, a, l, c, d, u = function (e, t) {
                    return e << t | e >>> 32 - t
                },
                p = function (e) {
                    var t, i, n = "";
                    for (t = 7; t >= 0; t--) i = e >>> 4 * t & 15, n += i.toString(16);
                    return n
                },
                g = [],
                h = 1732584193,
                m = 4023233417,
                f = 2562383102,
                y = 271733878,
                v = 3285377520,
                b = [];
            for (e = SnowPlow.encodeUtf8(e), d = e.length, i = 0; d - 3 > i; i += 4) n = e.charCodeAt(i) << 24 | e.charCodeAt(i + 1) << 16 | e.charCodeAt(i + 2) << 8 | e.charCodeAt(i + 3), b.push(n);
            switch (3 & d) {
            case 0:
                i = 2147483648;
                break;
            case 1:
                i = e.charCodeAt(d - 1) << 24 | 8388608;
                break;
            case 2:
                i = e.charCodeAt(d - 2) << 24 | e.charCodeAt(d - 1) << 16 | 32768;
                break;
            case 3:
                i = e.charCodeAt(d - 3) << 24 | e.charCodeAt(d - 2) << 16 | e.charCodeAt(d - 1) << 8 | 128
            }
            for (b.push(i); 14 !== (15 & b.length);) b.push(0);
            for (b.push(d >>> 29), b.push(d << 3 & 4294967295), t = 0; t < b.length; t += 16) {
                for (i = 0; 16 > i; i++) g[i] = b[t + i];
                for (i = 16; 79 >= i; i++) g[i] = u(g[i - 3] ^ g[i - 8] ^ g[i - 14] ^ g[i - 16], 1);
                for (o = h, r = m, s = f, a = y, l = v, i = 0; 19 >= i; i++) c = u(o, 5) + (r & s | ~r & a) + l + g[i] + 1518500249 & 4294967295, l = a, a = s, s = u(r, 30), r = o, o = c;
                for (i = 20; 39 >= i; i++) c = u(o, 5) + (r ^ s ^ a) + l + g[i] + 1859775393 & 4294967295, l = a, a = s, s = u(r, 30), r = o, o = c;
                for (i = 40; 59 >= i; i++) c = u(o, 5) + (r & s | r & a | s & a) + l + g[i] + 2400959708 & 4294967295, l = a, a = s, s = u(r, 30), r = o, o = c;
                for (i = 60; 79 >= i; i++) c = u(o, 5) + (r ^ s ^ a) + l + g[i] + 3395469782 & 4294967295, l = a, a = s, s = u(r, 30), r = o, o = c;
                h = h + o & 4294967295, m = m + r & 4294967295, f = f + s & 4294967295, y = y + a & 4294967295, v = v + l & 4294967295
            }
            return c = p(h) + p(m) + p(f) + p(y) + p(v), c.toLowerCase()
        }, SnowPlow.murmurhash3_32_gc = function (e, t) {
            var i, n, o, r, s, a, l, c;
            for (i = 3 & e.length, n = e.length - i, o = t, s = 3432918353, a = 461845907, c = 0; n > c;) l = 255 & e.charCodeAt(c) | (255 & e.charCodeAt(++c)) << 8 | (255 & e.charCodeAt(++c)) << 16 | (255 & e.charCodeAt(++c)) << 24, ++c, l = (65535 & l) * s + (((l >>> 16) * s & 65535) << 16) & 4294967295, l = l << 15 | l >>> 17, l = (65535 & l) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295, o ^= l, o = o << 13 | o >>> 19, r = 5 * (65535 & o) + ((5 * (o >>> 16) & 65535) << 16) & 4294967295, o = (65535 & r) + 27492 + (((r >>> 16) + 58964 & 65535) << 16);
            switch (l = 0, i) {
            case 3:
                l ^= (255 & e.charCodeAt(c + 2)) << 16;
            case 2:
                l ^= (255 & e.charCodeAt(c + 1)) << 8;
            case 1:
                l ^= 255 & e.charCodeAt(c), l = (65535 & l) * s + (((l >>> 16) * s & 65535) << 16) & 4294967295, l = l << 15 | l >>> 17, l = (65535 & l) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295, o ^= l
            }
            return o ^= e.length, o ^= o >>> 16, o = 2246822507 * (65535 & o) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295, o ^= o >>> 13, o = 3266489909 * (65535 & o) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295, o ^= o >>> 16, o >>> 0
        }, SnowPlow.base64encode = function (e) {
            if (!e) return e;
            if ("function" == typeof window.btoa) return btoa(e);
            var t, i, n, o, r, s, a, l, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                d = 0,
                u = 0,
                p = "",
                g = [];
            do t = e.charCodeAt(d++), i = e.charCodeAt(d++), n = e.charCodeAt(d++), l = t << 16 | i << 8 | n, o = l >> 18 & 63, r = l >> 12 & 63, s = l >> 6 & 63, a = 63 & l, g[u++] = c.charAt(o) + c.charAt(r) + c.charAt(s) + c.charAt(a); while (d < e.length);
            p = g.join("");
            var h = e.length % 3;
            return (h ? p.slice(0, h - 3) : p) + "===".slice(h || 3)
        }, SnowPlow.base64urlencode = function (e) {
            if (!e) return e;
            var t = SnowPlow.base64encode(e);
            return t.replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
        }, SnowPlow.base64decode = function (e) {
            var t, i, n, o, r, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                a = "",
                l = "",
                c = "",
                d = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do n = s.indexOf(e.charAt(d++)), o = s.indexOf(e.charAt(d++)), r = s.indexOf(e.charAt(d++)), c = s.indexOf(e.charAt(d++)), t = n << 2 | o >> 4, i = (15 & o) << 4 | r >> 2, l = (3 & r) << 6 | c, a += String.fromCharCode(t), 64 != r && (a += String.fromCharCode(i)), 64 != c && (a += String.fromCharCode(l)), t = i = l = "", n = o = r = c = ""; while (d < e.length);
            return unescape(a)
        }, SnowPlow.Tracker = function Tracker(argmap) {
            function constructCollectorUrl(e) {
                return "undefined" == typeof e ? null : "cf" in e ? collectorUrlFromCfDist(e.cf) : "url" in e ? asCollectorUrl(e.url) : void 0
            }

            function ecommerceTransactionTemplate() {
                return {
                    transaction: {},
                    items: []
                }
            }

            function purify(e) {
                var t;
                return configDiscardHashTag ? (t = new RegExp("#.*"), e.replace(t, "")) : e
            }

            function getProtocolScheme(e) {
                var t = new RegExp("^([a-z]+):"),
                    i = t.exec(e);
                return i ? i[1] : null
            }

            function resolveRelativeReference(e, t) {
                var i, n = getProtocolScheme(t);
                return n ? t : "/" === t.slice(0, 1) ? getProtocolScheme(e) + "://" + SnowPlow.getHostName(e) + t : (e = purify(e), (i = e.indexOf("?")) >= 0 && (e = e.slice(0, i)), (i = e.lastIndexOf("/")) !== e.length - 1 && (e = e.slice(0, i + 1)), e + t)
            }

            function isSiteHostName(e) {
                var t, i, n;
                for (t = 0; t < configHostsAlias.length; t++) {
                    if (i = SnowPlow.fixupDomain(configHostsAlias[t].toLowerCase()), e === i) return !0;
                    if ("." === i.slice(0, 1)) {
                        if (e === i.slice(1)) return !0;
                        if (n = e.length - i.length, n > 0 && e.slice(n) === i) return !0
                    }
                }
                return !1
            }

            function getImage(e) {
                if (SnowPlow.isString(configCollectorUrl)) {
                    if (null === configCollectorUrl) throw "No SnowPlow collector configured, cannot track";
                    setImage(configCollectorUrl + e)
                } else if (SnowPlow.isArray(configCollectorUrl))
                    for (var t = 0; t < configCollectorUrl.length; t++) setImage(configCollectorUrl[t] + e)
            }

            function setImage(e) {
                var t = new Image(1, 1);
                t.onload = function () {}, t.src = e
            }

            function sendRequest(e, t) {
                var i = new Date;
                configDoNotTrack || (getImage(e), SnowPlow.expireDateTime = i.getTime() + t)
            }

            function getCookieName(e) {
                return configCookieNamePrefix + e + "." + domainHash
            }

            function getLegacyCookieName(e) {
                return configCookieNamePrefix + e + "." + configTrackerSiteId + "." + domainHash
            }

            function getCookieValue(e) {
                var t = SnowPlow.getCookie(getCookieName(e));
                return t ? t : SnowPlow.getCookie(getLegacyCookieName(e))
            }

            function hasCookies() {
                var e = getCookieName("testcookie");
                return SnowPlow.isDefined(SnowPlow.navigatorAlias.cookieEnabled) ? SnowPlow.navigatorAlias.cookieEnabled ? "1" : "0" : (SnowPlow.setCookie(e, "1"), "1" === SnowPlow.getCookie(e) ? "1" : "0")
            }

            function updateDomainHash() {
                domainHash = hash((configCookieDomain || domainAlias) + (configCookiePath || "/"))
                    .slice(0, 4)
            }

            function activityHandler() {
                var e = new Date;
                lastActivityTime = e.getTime()
            }

            function scrollHandler() {
                updateMaxScrolls(), activityHandler()
            }

            function getPageOffsets() {
                var e = SnowPlow.documentAlias.compatMode && "BackCompat" != SnowPlow.documentAlias.compatMode ? SnowPlow.documentAlias.documentElement : SnowPlow.documentAlias.body;
                return [e.scrollLeft || SnowPlow.windowAlias.pageXOffset, e.scrollTop || SnowPlow.windowAlias.pageYOffset]
            }

            function resetMaxScrolls() {
                var e = getPageOffsets(),
                    t = e[0];
                minXOffset = t, maxXOffset = t;
                var i = e[1];
                minYOffset = i, maxYOffset = i
            }

            function updateMaxScrolls() {
                var e = getPageOffsets(),
                    t = e[0];
                minXOffset > t ? minXOffset = t : t > maxXOffset && (maxXOffset = t);
                var i = e[1];
                minYOffset > i ? minYOffset = i : i > maxYOffset && (maxYOffset = i)
            }

            function setDomainUserIdCookie(e, t, i, n, o) {
                SnowPlow.setCookie(getCookieName("id"), e + "." + t + "." + i + "." + n + "." + o, configVisitorCookieTimeout, configCookiePath, configCookieDomain)
            }

            function loadDomainUserIdCookie() {
                var e, t = new Date,
                    i = Math.round(t.getTime() / 1e3),
                    n = getCookieValue("id");
                return n ? (e = n.split("."), e.unshift("0")) : (domainUserId || (domainUserId = hash((SnowPlow.navigatorAlias.userAgent || "") + (SnowPlow.navigatorAlias.platform || "") + JSON2.stringify(browserFeatures) + i)
                    .slice(0, 16)), e = ["1", domainUserId, i, 0, i, ""]), e
            }

            function getTimestamp() {
                var e = new Date,
                    t = e.getTime();
                return t
            }

            function getRequest(e, t) {
                var i, n, o, r, s, a, l, c, d = new Date,
                    u = Math.round(d.getTime() / 1e3),
                    p = getCookieName("id"),
                    g = getCookieName("ses"),
                    h = loadDomainUserIdCookie(),
                    m = getCookieValue("ses"),
                    f = configCustomUrl || locationHrefAlias;
                if (configDoNotTrack) return SnowPlow.setCookie(p, "", -1, configCookiePath, configCookieDomain), SnowPlow.setCookie(g, "", -1, configCookiePath, configCookieDomain), "";
                n = h[0], o = h[1], s = h[2], r = h[3], a = h[4], l = h[5], m || (r++, l = a), e.addRaw("dtm", getTimestamp()), e.addRaw("tid", String(Math.random())
                    .slice(2, 8)), e.addRaw("vp", detectViewport()), e.addRaw("ds", detectDocumentSize()), e.addRaw("vid", r), e.addRaw("duid", o), e.add("p", configPlatform), e.add("tv", SnowPlow.version), e.add("fp", fingerprint), e.add("aid", configTrackerSiteId), e.add("lang", browserLanguage), e.add("cs", documentCharset), e.add("tz", timezone), e.add("uid", businessUserId), configReferrerUrl.length && e.add("refr", purify(configReferrerUrl));
                for (i in browserFeatures) Object.prototype.hasOwnProperty.call(browserFeatures, i) && (c = "res" === i || "cd" === i || "cookie" === i ? "" : "f_", e.addRaw(c + i, browserFeatures[i]));
                e.add("url", purify(f));
                var y = e.build();
                return setDomainUserIdCookie(o, s, r, u, l), SnowPlow.setCookie(g, "*", configSessionCookieTimeout, configCookiePath, configCookieDomain), y += SnowPlow.executePluginMethod(t)
            }

            function collectorUrlFromCfDist(e) {
                return asCollectorUrl(e + ".cloudfront.net")
            }

            function asCollectorUrl(e) {
                if (SnowPlow.isString(e)) return ("https:" == SnowPlow.documentAlias.location.protocol ? "https" : "http") + "://" + e + "/i";
                if (SnowPlow.isArray(e)) {
                    for (var t = [], i = 0; i < e.length; i++) t.push(("https:" == SnowPlow.documentAlias.location.protocol ? "https" : "http") + "://" + e[i] + "/i");
                    return t
                }
            }

            function requestStringBuilder(e) {
                var t = "",
                    i = function (e, i, n) {
                        if (void 0 !== i && null !== i && "" !== i) {
                            var o = t.length > 0 ? "&" : "?";
                            t += o + e + "=" + (n ? SnowPlow.encodeWrapper(i) : i)
                        }
                    },
                    n = function (e) {
                        var t = new RegExp("\\$(.[^\\$]+)$"),
                            i = t.exec(e);
                        return i ? i[1] : void 0
                    },
                    o = function (e, t) {
                        switch (t) {
                        case "tms":
                            return SnowPlow.toTimestamp(e, !0);
                        case "ts":
                            return SnowPlow.toTimestamp(e, !1);
                        case "dt":
                            return SnowPlow.toDatestamp(e);
                        default:
                            return e
                        }
                    },
                    r = function () {
                        function e(t) {
                            var i = {};
                            for (var r in t) {
                                var s = r,
                                    a = t[r];
                                t.hasOwnProperty(s) && (SnowPlow.isDate(a) && (type = n(s), type || (type = "tms", s += "$" + type), a = o(a, type)), SnowPlow.isJson(a) && (a = e(a))), i[s] = a
                            }
                            return i
                        }
                        return e
                    }(),
                    s = function (e, t) {
                        i(e, t, !0)
                    },
                    a = function (e, t) {
                        i(e, t, !1)
                    },
                    l = function (t, i, n) {
                        if (SnowPlow.isNonEmptyJson(n)) {
                            var o = r(n),
                                l = JSON2.stringify(o);
                            e ? a(t, SnowPlow.base64urlencode(l)) : s(i, l)
                        }
                    };
                return {
                    add: s,
                    addRaw: a,
                    addJson: l,
                    build: function () {
                        return t
                    }
                }
            }

            function logPageView(e, t, i, n, o, r, s, a) {
                var l = SnowPlow.fixupTitle(e || configTitle),
                    c = requestStringBuilder(configEncodeBase64);
                c.add("e", "pv"), c.add("page", l), c.add("se_ca", i), c.add("se_ac", n), c.add("se_la", o), c.add("se_pr", r), c.add("se_psk", s), c.add("se_va", a), c.addJson("cx", "co", t);
                var d = getRequest(c, "pageView");
                sendRequest(d, configTrackerPause);
                var u = new Date;
                configMinimumVisitTime && configHeartBeatTimer && !activityTrackingInstalled && (activityTrackingInstalled = !0, resetMaxScrolls(), SnowPlow.addEventListener(SnowPlow.documentAlias, "click", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "mouseup", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "mousedown", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "mousemove", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "mousewheel", activityHandler, supportsPassive() ? {
                    passive: !0
                } : !1), SnowPlow.addEventListener(SnowPlow.windowAlias, "DOMMouseScroll", activityHandler), SnowPlow.addEventListener(SnowPlow.windowAlias, "scroll", scrollHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "keypress", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "keydown", activityHandler), SnowPlow.addEventListener(SnowPlow.documentAlias, "keyup", activityHandler), SnowPlow.addEventListener(SnowPlow.windowAlias, "resize", activityHandler), SnowPlow.addEventListener(SnowPlow.windowAlias, "focus", activityHandler), SnowPlow.addEventListener(SnowPlow.windowAlias, "blur", activityHandler), lastActivityTime = u.getTime(), setInterval(function () {
                    var e = new Date;
                    lastActivityTime + configHeartBeatTimer > e.getTime() && configMinimumVisitTime < e.getTime() && logPagePing(l, t, i, n, o, r, s, a)
                }, configHeartBeatTimer))
            }

            function logPagePing(e, t, i, n, o, r, s, a) {
                var l = requestStringBuilder(configEncodeBase64);
                l.add("e", "pp"), l.add("page", e), l.add("se_ca", i), l.add("se_ac", n), l.add("se_la", o), l.add("se_pr", r), l.add("se_psk", s), l.add("se_va", a), l.addRaw("pp_mix", parseInt(minXOffset)), l.addRaw("pp_max", parseInt(maxXOffset)), l.addRaw("pp_miy", parseInt(minYOffset)), l.addRaw("pp_may", parseInt(maxYOffset)), l.addJson("cx", "co", t), resetMaxScrolls();
                var c = getRequest(l, "pagePing");
                sendRequest(c, configTrackerPause)
            }

            function logStructEvent(e, t, i, n, o, r, s, a) {
                var l = requestStringBuilder(configEncodeBase64);
                l.add("e", "se"), l.add("se_ca", e), l.add("se_ac", t), l.add("se_la", i), l.add("se_pr", n), l.add("se_psk", o), l.add("se_va", r), l.add("se_tg", a), l.addJson("cx", "co", s);
                var c = getRequest(l, "structEvent");
                sendRequest(c, configTrackerPause)
            }

            function logUnstructEvent(e, t, i) {
                var n = requestStringBuilder(configEncodeBase64);
                n.add("e", "ue"), n.add("ue_na", e), n.addJson("ue_px", "ue_pr", t), n.addJson("cx", "co", i);
                var o = getRequest(n, "unstructEvent");
                sendRequest(o, configTrackerPause)
            }

            function logTransaction(e, t, i, n, o, r, s, a, l, c) {
                var d = requestStringBuilder(configEncodeBase64);
                d.add("e", "tr"), d.add("tr_id", e), d.add("tr_af", t), d.add("tr_tt", i), d.add("tr_tx", n), d.add("tr_sh", o), d.add("tr_ci", r), d.add("tr_st", s), d.add("tr_co", a), d.add("tr_cu", l), d.addJson("cx", "co", c);
                var u = getRequest(d, "transaction");
                sendRequest(u, configTrackerPause)
            }

            function logTransactionItem(e, t, i, n, o, r, s, a) {
                var l = requestStringBuilder(configEncodeBase64);
                l.add("e", "ti"), l.add("ti_id", e), l.add("ti_sk", t), l.add("ti_na", i), l.add("ti_ca", n), l.add("ti_pr", o), l.add("ti_qu", r), l.add("ti_cu", s), l.addJson("cx", "co", a);
                var c = getRequest(l, "transactionItem");
                sendRequest(c, configTrackerPause)
            }

            function logLink(e, t) {
                var i = requestStringBuilder(configEncodeBase64);
                i.add("e", t), i.add("t_url", purify(e));
                var n = getRequest(i, "link");
                sendRequest(n, configTrackerPause)
            }

            function logImpression(e, t, i, n, o) {
                var r = requestStringBuilder(configEncodeBase64);
                r.add("e", "ad"), r.add("ad_ba", e), r.add("ad_ca", t), r.add("ad_ad", i), r.add("ad_uid", n), r.addJson("cx", "co", o);
                var s = getRequest(r, "impression");
                sendRequest(s, configTrackerPause)
            }

            function logConversionEvent(e, t, i, n) {
                var o = requestStringBuilder(configEncodeBase64);
                o.add("e", "tr"), o.add("se_va", e), o.add("tr_id", t), o.add("tr_tt", i), o.add("tr_cu", n);
                var r = getRequest(o, "conversion_tracking");
                sendRequest(r, configTrackerPause)
            }

            function prefixPropertyName(e, t) {
                return "" !== e ? e + t.charAt(0)
                    .toUpperCase() + t.slice(1) : t
            }

            function trackCallback(e) {
                var t, i, n, o = ["", "webkit", "ms", "moz"];
                if (!configCountPreRendered)
                    for (i = 0; i < o.length; i++)
                        if (n = o[i], Object.prototype.hasOwnProperty.call(SnowPlow.documentAlias, prefixPropertyName(n, "hidden"))) {
                            "prerender" === SnowPlow.documentAlias[prefixPropertyName(n, "visibilityState")] && (t = !0);
                            break
                        } return t ? void SnowPlow.addEventListener(SnowPlow.documentAlias, n + "visibilitychange", function r() {
                    SnowPlow.documentAlias.removeEventListener(n + "visibilitychange", r, !1), e()
                }) : void e()
            }

            function getClassesRegExp(e, t) {
                var i, n = "(^| )(piwik[_-]" + t;
                if (e)
                    for (i = 0; i < e.length; i++) n += "|" + e[i];
                return n += ")( |$)", new RegExp(n)
            }

            function getLinkType(e, t, i) {
                if (!i) return "lnk";
                var n = getClassesRegExp(configDownloadClasses, "download"),
                    o = getClassesRegExp(configLinkClasses, "link"),
                    r = new RegExp("\\.(" + configDownloadExtensions + ")([?&#]|$)", "i");
                return o.test(e) ? "lnk" : n.test(e) || r.test(t) ? "dl" : 0
            }

            function processClick(e) {
                for (var t, i, n; null !== (t = e.parentNode) && SnowPlow.isDefined(t) && "A" !== (i = e.tagName.toUpperCase()) && "AREA" !== i;) e = t;
                if (SnowPlow.isDefined(e.href)) {
                    var o = e.hostname || SnowPlow.getHostName(e.href),
                        r = o.toLowerCase(),
                        s = e.href.replace(o, r),
                        a = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):", "i");
                    a.test(s) || (n = getLinkType(e.className, s, isSiteHostName(r)), n && (s = SnowPlow.decodeUrl(s), logLink(s, n)))
                }
            }

            function clickHandler(e) {
                var t, i;
                e = e || SnowPlow.windowAlias.event, t = e.which || e.button, i = e.target || e.srcElement, "click" === e.type ? i && processClick(i) : "mousedown" === e.type ? 1 !== t && 2 !== t || !i ? lastButton = lastTarget = null : (lastButton = t, lastTarget = i) : "mouseup" === e.type && (t === lastButton && i === lastTarget && processClick(i), lastButton = lastTarget = null)
            }

            function addClickListener(e, t) {
                t ? (SnowPlow.addEventListener(e, "mouseup", clickHandler, !1), SnowPlow.addEventListener(e, "mousedown", clickHandler, !1)) : SnowPlow.addEventListener(e, "click", clickHandler, !1)
            }

            function addClickListeners(e) {
                if (!linkTrackingInstalled) {
                    linkTrackingInstalled = !0;
                    var t, i = getClassesRegExp(configIgnoreClasses, "ignore"),
                        n = SnowPlow.documentAlias.links;
                    if (n)
                        for (t = 0; t < n.length; t++) i.test(n[t].className) || addClickListener(n[t], e)
                }
            }

            function generateFingerprint() {
                var e = [navigator.userAgent, [screen.height, screen.width, screen.colorDepth].join("x"), (new Date)
                        .getTimezoneOffset(), SnowPlow.hasSessionStorage(), SnowPlow.hasLocalStorage()],
                    t = [];
                if (navigator.plugins)
                    for (var i = 0; i < navigator.plugins.length; i++) {
                        for (var n = [], o = 0; o < navigator.plugins[i].length; o++) n.push([navigator.plugins[i][o].type, navigator.plugins[i][o].suffixes]);
                        t.push([navigator.plugins[i].name + "::" + navigator.plugins[i].description, n.join("~")])
                    }
                return SnowPlow.murmurhash3_32_gc(e.join("###") + "###" + t.sort()
                    .join(";"), 123412414)
            }

            function detectTimezone() {
                var e = jstz.determine();
                return "undefined" == typeof e ? "" : e.name()
            }

            function detectViewport() {
                var e = SnowPlow.windowAlias,
                    t = "inner";
                return "innerWidth" in SnowPlow.windowAlias || (t = "client", e = SnowPlow.documentAlias.documentElement || SnowPlow.documentAlias.body), e[t + "Width"] + "x" + e[t + "Height"]
            }

            function detectDocumentSize() {
                var e = SnowPlow.documentAlias.documentElement,
                    t = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
                    i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight);
                return t + "x" + i
            }

            function supportsPassive() {
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function () {
                            supportsPassive = !0
                        }
                    });
                    window.addEventListener("test", null, e)
                } catch (t) {}
                return supportsPassive
            }

            function detectBrowserFeatures() {
                var e, t, i = {
                        pdf: "application/pdf",
                        qt: "video/quicktime",
                        realp: "audio/x-pn-realaudio-plugin",
                        wma: "application/x-mplayer2",
                        dir: "application/x-director",
                        fla: "application/x-shockwave-flash",
                        java: "application/x-java-vm",
                        gears: "application/x-googlegears",
                        ag: "application/x-silverlight"
                    },
                    n = {};
                if (SnowPlow.navigatorAlias.mimeTypes && SnowPlow.navigatorAlias.mimeTypes.length)
                    for (e in i) Object.prototype.hasOwnProperty.call(i, e) && (t = SnowPlow.navigatorAlias.mimeTypes[i[e]], n[e] = t && t.enabledPlugin ? "1" : "0");
                return "unknown" != typeof navigator.javaEnabled && SnowPlow.isDefined(SnowPlow.navigatorAlias.javaEnabled) && SnowPlow.navigatorAlias.javaEnabled() && (n.java = "1"), SnowPlow.isFunction(SnowPlow.windowAlias.GearsFactory) && (n.gears = "1"), n.res = SnowPlow.screenAlias.width + "x" + SnowPlow.screenAlias.height, n.cd = screen.colorDepth, n.cookie = hasCookies(), n
            }

            function registerHook(hookName, userHook) {
                var hookObj = null;
                if (SnowPlow.isString(hookName) && !SnowPlow.isDefined(registeredHooks[hookName]) && userHook) {
                    if (SnowPlow.isObject(userHook)) hookObj = userHook;
                    else if (SnowPlow.isString(userHook)) try {
                        eval("hookObj =" + userHook)
                    } catch (e) {}
                    registeredHooks[hookName] = hookObj
                }
                return hookObj
            }
            var registeredHooks = {},
                locationArray = SnowPlow.fixupUrl(SnowPlow.documentAlias.domain, SnowPlow.windowAlias.location.href, SnowPlow.getReferrer()),
                domainAlias = SnowPlow.fixupDomain(locationArray[0]),
                locationHrefAlias = locationArray[1],
                configReferrerUrl = locationArray[2],
                configRequestMethod = "GET",
                configPlatform = "web",
                configCollectorUrl = constructCollectorUrl(argmap),
                configTrackerSiteId = "",
                configCustomUrl, configTitle = SnowPlow.documentAlias.title,
                configDownloadExtensions = "7z|aac|ar[cj]|as[fx]|avi|bin|csv|deb|dmg|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|ms[ip]|od[bfgpst]|og[gv]|pdf|phps|png|ppt|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd||xls|xml|z|zip",
                configHostsAlias = [domainAlias],
                configIgnoreClasses = [],
                configDownloadClasses = [],
                configLinkClasses = [],
                configTrackerPause = 500,
                configMinimumVisitTime, configHeartBeatTimer, configDiscardHashTag, configCookieNamePrefix = "_sp_",
                configCookieDomain, configCookiePath, configDoNotTrack, configCountPreRendered, configVisitorCookieTimeout = 63072e6,
                configSessionCookieTimeout = 18e5,
                configReferralCookieTimeout = 15768e6,
                configEncodeBase64 = !0,
                documentCharset = SnowPlow.documentAlias.characterSet || SnowPlow.documentAlias.charset,
                browserLanguage = SnowPlow.navigatorAlias.userLanguage || SnowPlow.navigatorAlias.language,
                browserFeatures = detectBrowserFeatures(),
                timezone = detectTimezone(),
                fingerprint = generateFingerprint(),
                linkTrackingInstalled = !1,
                activityTrackingInstalled = !1,
                lastActivityTime, minXOffset, maxXOffset, minYOffset, maxYOffset, lastButton, lastTarget, hash = SnowPlow.sha1,
                domainHash, domainUserId, businessUserId, ecommerceTransaction = ecommerceTransactionTemplate();
            return updateDomainHash(), SnowPlow.executePluginMethod("run", registerHook), {
                hook: registeredHooks,
                getHook: function (e) {
                    return registeredHooks[e]
                },
                getUserId: function () {
                    return businessUserId
                },
                getDomainUserId: function () {
                    return loadDomainUserIdCookie()[1]
                },
                getDomainUserInfo: function () {
                    return loadDomainUserIdCookie()
                },
                getVisitorId: function () {
                    return "undefined" != typeof console && console.log("SnowPlow: getVisitorId() is deprecated and will be removed in an upcoming version. Please use getDomainUserId() instead."), loadVisitorIdCookie()[1]
                },
                getVisitorInfo: function () {
                    return "undefined" != typeof console && console.log("SnowPlow: getVisitorInfo() is deprecated and will be removed in an upcoming version. Please use getDomainUserInfo() instead."), loadVisitorIdCookie()
                },
                setSiteId: function (e) {
                    "undefined" != typeof console && console.log("SnowPlow: setSiteId() is deprecated and will be removed in an upcoming version. Please use setAppId() instead."), configTrackerSiteId = e
                },
                setAppId: function (e) {
                    configTrackerSiteId = e
                },
                setLinkTrackingTimer: function (e) {
                    configTrackerPause = e
                },
                setDownloadExtensions: function (e) {
                    configDownloadExtensions = e
                },
                addDownloadExtensions: function (e) {
                    configDownloadExtensions += "|" + e
                },
                setDomains: function (e) {
                    configHostsAlias = SnowPlow.isString(e) ? [e] : e, configHostsAlias.push(domainAlias)
                },
                setIgnoreClasses: function (e) {
                    configIgnoreClasses = SnowPlow.isString(e) ? [e] : e
                },
                setReferrerUrl: function (e) {
                    configReferrerUrl = e
                },
                setCustomUrl: function (e) {
                    configCustomUrl = resolveRelativeReference(locationHrefAlias, e)
                },
                setDocumentTitle: function (e) {
                    configTitle = e
                },
                setDownloadClasses: function (e) {
                    configDownloadClasses = SnowPlow.isString(e) ? [e] : e
                },
                setLinkClasses: function (e) {
                    configLinkClasses = SnowPlow.isString(e) ? [e] : e
                },
                discardHashTag: function (e) {
                    configDiscardHashTag = e
                },
                setCookieNamePrefix: function (e) {
                    configCookieNamePrefix = e
                },
                setCookieDomain: function (e) {
                    configCookieDomain = SnowPlow.fixupDomain(e), updateDomainHash()
                },
                setCookiePath: function (e) {
                    configCookiePath = e, updateDomainHash()
                },
                setVisitorCookieTimeout: function (e) {
                    configVisitorCookieTimeout = 1e3 * e
                },
                setSessionCookieTimeout: function (e) {
                    configSessionCookieTimeout = 1e3 * e
                },
                setReferralCookieTimeout: function (e) {
                    configReferralCookieTimeout = 1e3 * e
                },
                setDoNotTrack: function (e) {
                    var t = SnowPlow.navigatorAlias.doNotTrack || SnowPlow.navigatorAlias.msDoNotTrack;
                    configDoNotTrack = e && ("yes" === t || "1" === t)
                },
                addListener: function (e, t) {
                    addClickListener(e, t)
                },
                enableLinkTracking: function (e) {
                    SnowPlow.hasLoaded ? addClickListeners(e) : SnowPlow.registeredOnLoadHandlers.push(function () {
                        addClickListeners(e)
                    })
                },
                enableActivityTracking: function (e, t) {
                    var i = new Date;
                    configMinimumVisitTime = i.getTime() + 1e3 * e, configHeartBeatTimer = 1e3 * t
                },
                killFrame: function () {
                    SnowPlow.windowAlias.location !== SnowPlow.windowAlias.top.location && (SnowPlow.windowAlias.top.location = SnowPlow.windowAlias.location)
                },
                redirectFile: function (e) {
                    "file:" === SnowPlow.windowAlias.location.protocol && (SnowPlow.windowAlias.location = e)
                },
                setCountPreRendered: function (e) {
                    configCountPreRendered = e
                },
                setUserId: function (e) {
                    businessUserId = e
                },
                attachUserId: function () {
                    "undefined" != typeof console && console.log("SnowPlow: attachUserId() is deprecated and will be removed in an upcoming version. It no longer does anything (because nuid and duid have been separated out).")
                },
                setCollectorCf: function (e) {
                    configCollectorUrl = collectorUrlFromCfDist(e)
                },
                setCollectorUrl: function (e) {
                    configCollectorUrl = asCollectorUrl(e)
                },
                setPlatform: function (e) {
                    configPlatform = e
                },
                encodeBase64: function (e) {
                    configEncodeBase64 = e
                },
                trackPageView: function (e, t, i, n, o, r, s, a) {
                    trackCallback(function () {
                        logPageView(e, t, i, n, o, r, s, a)
                    })
                },
                trackEvent: function (e, t, i, n, o, r) {
                    "undefined" != typeof console && console.log("SnowPlow: trackEvent() is deprecated and will be removed in an upcoming version. Please use trackStructEvent() instead."), logStructEvent(e, t, i, n, o, r)
                },
                trackStructEvent: function (e, t, i, n, o, r, s, a) {
                    logStructEvent(e, t, i, n, o, r, s, a)
                },
                trackUnstructEvent: function (e, t, i) {
                    logUnstructEvent(e, t, i)
                },
                addTrans: function (e, t, i, n, o, r, s, a, l, c) {
                    ecommerceTransaction.transaction = {
                        orderId: e,
                        affiliation: t,
                        total: i,
                        tax: n,
                        shipping: o,
                        city: r,
                        state: s,
                        country: a,
                        currency: l,
                        context: c
                    }
                },
                addItem: function (e, t, i, n, o, r, s, a) {
                    ecommerceTransaction.items.push({
                        orderId: e,
                        sku: t,
                        name: i,
                        category: n,
                        price: o,
                        quantity: r,
                        currency: s,
                        context: a
                    })
                },
                trackTrans: function () {
                    logTransaction(ecommerceTransaction.transaction.orderId, ecommerceTransaction.transaction.affiliation, ecommerceTransaction.transaction.total, ecommerceTransaction.transaction.tax, ecommerceTransaction.transaction.shipping, ecommerceTransaction.transaction.city, ecommerceTransaction.transaction.state, ecommerceTransaction.transaction.country, ecommerceTransaction.transaction.currency, ecommerceTransaction.transaction.context);
                    for (var e = 0; e < ecommerceTransaction.items.length; e++) {
                        var t = ecommerceTransaction.items[e];
                        logTransactionItem(t.orderId, t.sku, t.name, t.category, t.price, t.quantity, t.currency, t.context)
                    }
                    ecommerceTransaction = ecommerceTransactionTemplate()
                },
                trackConversion: function (e, t, i, n) {
                    logConversionEvent(e, t, i, n)
                },
                trackLink: function (e, t, i) {
                    trackCallback(function () {
                        logLink(e, t, i)
                    })
                },
                trackImpression: function (e, t, i, n, o) {
                    logImpression(e, t, i, n, o)
                }
            }
        }, SnowPlow.build = function () {
            "use strict";

            function e() {
                var e, t, i;
                for (e = 0; e < arguments.length; e += 1) i = arguments[e], t = i.shift(), SnowPlow.isString(t) ? SnowPlow.asyncTracker[t].apply(SnowPlow.asyncTracker, i) : t.apply(SnowPlow.asyncTracker, i)
            }

            function t() {
                var e;
                if (SnowPlow.executePluginMethod("unload"), SnowPlow.expireDateTime)
                    do e = new Date; while (e.getTimeAlias() < SnowPlow.expireDateTime)
            }

            function i() {
                var e;
                if (!SnowPlow.hasLoaded)
                    for (SnowPlow.hasLoaded = !0, SnowPlow.executePluginMethod("load"), e = 0; e < SnowPlow.registeredOnLoadHandlers.length; e++) SnowPlow.registeredOnLoadHandlers[e]();
                return !0
            }

            function n() {
                var e;
                SnowPlow.documentAlias.addEventListener ? SnowPlow.addEventListener(SnowPlow.documentAlias, "DOMContentLoaded", function t() {
                        SnowPlow.documentAlias.removeEventListener("DOMContentLoaded", t, !1), i()
                    }) : SnowPlow.documentAlias.attachEvent && (SnowPlow.documentAlias.attachEvent("onreadystatechange", function n() {
                        "complete" === SnowPlow.documentAlias.readyState && (SnowPlow.documentAlias.detachEvent("onreadystatechange", n), i())
                    }), SnowPlow.documentAlias.documentElement.doScroll && SnowPlow.windowAlias === SnowPlow.windowAlias.top && ! function o() {
                        if (!SnowPlow.hasLoaded) {
                            try {
                                SnowPlow.documentAlias.documentElement.doScroll("left")
                            } catch (e) {
                                return void setTimeout(o, 0)
                            }
                            i()
                        }
                    }()), new RegExp("WebKit")
                    .test(SnowPlow.navigatorAlias.userAgent) && (e = setInterval(function () {
                        (SnowPlow.hasLoaded || /loaded|complete/.test(SnowPlow.documentAlias.readyState)) && (clearInterval(e), i())
                    }, 10)), SnowPlow.addEventListener(SnowPlow.windowAlias, "load", i, !1)
            }

            function o() {
                return {
                    push: e
                }
            }
            SnowPlow.addEventListener(SnowPlow.windowAlias, "beforeunload", t, !1), n(), Date.prototype.getTimeAlias = Date.prototype.getTime, SnowPlow.asyncTracker = new SnowPlow.Tracker;
            for (var r = 0; r < _yaq.length; r++) e(_yaq[r]);
            return _yaq = new o, {
                addPlugin: function (e, t) {
                    SnowPlow.plugins[e] = t
                },
                getTrackerCf: function (e) {
                    return new SnowPlow.Tracker({
                        cf: e
                    })
                },
                getTrackerUrl: function (e) {
                    return new SnowPlow.Tracker({
                        url: e
                    })
                },
                getAsyncTracker: function () {
                    return SnowPlow.asyncTracker
                }
            }
        }, ! function () {
            var e = SnowPlow.build();
            for (var t in e) e.hasOwnProperty(t) && void 0 === SnowPlow[t] && (SnowPlow[t] = e[t])
        }();
        var yotpo_analytics_version = "onsite_v2";
        return Yotpo.getCookie = SnowPlow.getCookie, Yotpo.setCookie = SnowPlow.setCookie, Analytics.prototype.trackEvent = function (e, t, i, n, o) {
            1 == this._firstEvent && (this.trackPageView(this), this._firstEvent = !1);
            var r = Yotpo.testingGroupsHandler.getTestingGroupsForAnalytics();
            void 0 != r && (o = Object.assign({
                testing_group_user_allocation: Yotpo.testingGroupsHandler.getUserAllocation()
            }, o)), o = Object.assign({
                pv_uuid: this.getPageUniqueIdPerView()
            }, o), trackYotpoEvent.apply(this, [e, t, i, n, this.pageSku, this._controller.getAppKey(), r, o])
        }, Analytics.prototype.trackUniqueEvent = function (e, t, i, n, o) {
            var r = e + t + (n || "") + (JSON.stringify(o) || "");
            this.trackedObjects[r] || (this.trackEvent(e, t, i, n, o), this.trackedObjects[r] = !0)
        }, Analytics.prototype.trackReview = function (e, t, i, n) {
            var o = e.getAttribute("data-review-id");
            isTemplateReview(o) || this.trackUniqueEvent(t, i, "review", o, n)
        }, Analytics.prototype.getPageUniqueIdPerView = function () {
            return void 0 == this._pv_uuid && (this._pv_uuid = Math.floor(1e9 * Math.random())), this._pv_uuid
        }, Analytics.prototype.trackPageView = function () {
            _yaq.push(["trackPageView", null, {
                pv_uuid: this.getPageUniqueIdPerView()
            }, null, null, null, null, this.pageSku, this._controller.getAppKey()])
        }, Analytics.prototype.trackConversion = function (e, t, i, n) {
            _yaq.push(["trackConversion", e, t, i, n])
        }, Analytics.prototype.getYaq = function () {
            return _yaq
        }, Analytics.prototype.getDomainUserId = function () {
            return SnowPlow.asyncTracker.getDomainUserId()
        }, Analytics
    }(Yotpo), Yotpo.Inview = function (e) {
        function t(e) {
            var t = e || {};
            t.offset = t.offset || 0, this.options = t, this.verifyInviewT = s.apply(this, [this.verifyInview, 25]), this.saveWinOffsetT = s.apply(this, [this.saveWinOffset, 50]), this.objects = [], this.winHeight = 0, this.winWidth = 0, this.modalObjCounter = 0, this.saveWinOffset();
            var i = this;
            i.allWidgetsAreReady = !1, e.onAllWidgetsReady(function () {
                i.allWidgetsAreReady = !0, i.verifyInviewT()
            })
        }

        function i(t) {
            return !(e.isHidden(t) || e.isHidden(t.parentElement) || e.hasClass(t, "yotpo-hidden") || e.hasClass(t, "yotpo-ignore-inview"))
        }

        function n(e, t) {
            var i = o(e),
                n = 0,
                s = this.winHeight + this.options.offset;
            if (t) {
                var a = r(e),
                    l = o(a);
                n = l.top, s = l.bottom, 0 > n && 0 > s && (n += window.scrollY, s += window.scrollY)
            }
            return i.left >= 0 && i.right <= this.winWidth + this.options.offset && (i.top >= n && i.top <= s || i.bottom <= s && i.bottom >= n - this.options.offset)
        }

        function o(t) {
            return e.isIEFamily && null == t.parentElement || t === document ? {
                height: 0,
                width: 0,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            } : t.getBoundingClientRect()
        }

        function r(e) {
            var t = getComputedStyle(e),
                i = "absolute" === t.position,
                n = /(auto|scroll)/;
            if ("fixed" === t.position) return document.body;
            var o = null;
            for (o = e; o = o.parentElement;)
                if (t = getComputedStyle(o), (!i || "static" !== t.position) && n.test(t.overflow + t.overflowY)) return o;
            return document
        }

        function s(e, t) {
            var i = 0,
                n = this;
            return function () {
                var o = +new Date;
                t > o - i || (i = o, e.call(n))
            }
        }
        return t.prototype.register = function (e, t) {
            this.objects.push({
                element: e,
                callback: t,
                modalCalc: !1
            }), 1 == this.objects.length && this.bindEvents(), this.verifyInviewT()
        }, t.prototype.registerinModal = function (e, t) {
            if (null !== e) {
                var i = r(e)
                    .parentNode;
                this.objects.push({
                    element: e,
                    callback: t,
                    modalCalc: i
                }), 1 == this.objects.length && this.bindEvents(), i && (this.modalObjCounter++, 1 == this.modalObjCounter && this.bindEvents(e)), this.verifyInviewT()
            }
        }, t.prototype.bindEvents = function (t) {
            var i = void 0 === t ? window : r(t);
            e.addEventListener(i, "scroll", this.verifyInviewT), e.addEventListener(i, "resize", this.verifyInviewT), e.addEventListener(i, "resize", this.saveWinOffsetT), e.addEventListener(i, "pageshow", this.verifyInviewT)
        }, t.prototype.unbindEvents = function (t) {
            var i = void 0 === t ? window : r(t);
            e.removeEventListener(i, "scroll", this.verifyInviewT), e.removeEventListener(i, "resize", this.verifyInviewT), e.removeEventListener(i, "resize", this.saveWinOffsetT), e.removeEventListener(i, "pageshow", this.verifyInviewT)
        }, t.prototype.verifyInview = function () {
            if (this.allWidgetsAreReady)
                for (var e, t = this.objects.length - 1; e = this.objects[t]; t--) n.apply(this, [e.element, e.modalCalc]) && i.apply(this, [e.element]) && (e.callback.apply(), this.objects.splice(t, 1), e.modalCalc && this.modalObjCounter--, 0 == this.modalObjCounter && this.unbindEvents(e.element), 0 == this.objects.length && this.unbindEvents())
        }, t.prototype.saveWinOffset = function () {
            this.winHeight = window.innerHeight || document.documentElement.clientHeight, this.winWidth = window.innerWidth || document.documentElement.clientWidth
        }, t
    }(Yotpo), document.getElementsByClassName || (document.getElementsByClassName = function (e) {
        return this.querySelectorAll("." + e)
    }, Element.prototype.getElementsByClassName = document.getElementsByClassName), "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Object.keys || (Object.keys = function () {
        "use strict";
        var e = Object.prototype.hasOwnProperty,
            t = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            n = i.length;
        return function (o) {
            if ("object" != typeof o && ("function" != typeof o || null === o)) throw new TypeError("Object.keys called on non-object");
            var r, s, a = [];
            for (r in o) e.call(o, r) && a.push(r);
            if (t)
                for (s = 0; n > s; s++) e.call(o, i[s]) && a.push(i[s]);
            return a
        }
    }()), String.prototype.includes || (String.prototype.includes = function (e, t) {
        return "number" != typeof t && (t = 0), t + e.length > this.length ? !1 : -1 !== this.indexOf(e, t)
    }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (e) {
            "use strict";
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), i = 1; i < arguments.length; i++) {
                var n = arguments[i];
                if (null != n)
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
            }
            return t
        },
        writable: !0,
        configurable: !0
    }), Yotpo.API = function (e) {
        function t(e) {
            this.instance = e
        }
        return t.prototype.changeProductID = function (t, i) {
            var n = !1;
            e.forEach(this.instance.getWidgets(), function (e) {
                e.settings.pid == t && (e.settings.pid = i, n = !0)
            }), n && this.instance.updateContent()
        }, t.prototype.refreshWidgets = function () {
            this.instance.refreshWidgets()
        }, t.prototype.openForm = function (t, i) {
            var n = function () {
                if (i = i || 1300, !t) throw "openForm must be passed a type(such as review|question)";
                var n = this.getWidgetByName("Main");
                if (!n || !n.get("element")
                    .getElementsByClassName("write-" + t + "-button")) throw "openForm must be called on a page with a main widget";
                n.get("element")
                    .getElementsByClassName("write-" + t + "-button")[0].click();
                for (var o = n.get("forms")[t + "s"].getElement()
                        .getBoundingClientRect()
                        .top, r = [document.body, document.documentElement], s = 0; s < r.length; ++s) {
                    var a = r[s],
                        l = a.scrollTop;
                    if (e.scrollTo(a, o + l, i, !0), l !== a.scrollTop) break
                }
            };
            "ready" == this.instance.getState() ? n.call(this.instance) : this.instance.on("ready", n)
        }, t.prototype.setFormOpenCallback = function (t) {
            var i = function () {
                e.forEach(this.getWidgetsByNames(["Testimonials", "Main"]), function (e) {
                    e.writeContentCallback = t;
                    var i = e.forms || {};
                    for (var n in i) {
                        var o = n.substr(0, n.length - 1),
                            r = e.element.getElementsByClassName("write-" + o + "-button");
                        if (r.length > 0)
                            for (var s = 0; s < r.length; s++) r[s].open = function () {
                                this.click()
                            }
                    }
                })
            };
            "ready" == this.instance.getState() && i.call(this.instance), this.instance.on("ready", i)
        }, t.prototype.trackConversion = function (t, i, n) {
            var o = {
                orderId: t,
                orderAmount: i,
                orderCurrency: n
            };
            e.Libraries.Tracker.trackConversionOrder(this.instance.appKey, o)
        }, t
    }(Yotpo), Yotpo.ShareLink = function (e) {
        function t(e, t) {
            if (!i(e)) throw "Type is not valid";
            this.type = e, n.call(this, t)
        }

        function i(t) {
            return l && (c = {
                facebook: {
                    url: a("facebook", "feed_link"),
                    options: function (t) {
                        var i = {
                                app_key: t.appkey,
                                sku: t.sku,
                                user_email: t.email
                            },
                            n = {
                                app_id: a("facebook", "application_id"),
                                display: "popup",
                                link: t.social_link,
                                redirect_uri: "http://" + e.hosts.b2b.dynamic + "/shares?" + e.convertHashToQueryStringParams(i)
                            };
                        return n
                    }
                },
                twitter: {
                    url: a("twitter", "intent_link"),
                    options: function (e) {
                        return {
                            url: e.social_link,
                            text: e.review_content,
                            via: "yotpo"
                        }
                    }
                },
                google: {
                    url: a("google", "share_link"),
                    options: function (e) {
                        return {
                            url: e.social_link
                        }
                    }
                },
                linkedin: {
                    url: a("linkedin", "share_link"),
                    options: function (e) {
                        return {
                            mini: !0,
                            url: e.social_link,
                            title: e.review_title,
                            source: "Yotpo",
                            summary: e.review_content
                        }
                    }
                }
            }, l = !1), c[t]
        }

        function n(t) {
            t.social_link = d[this.type].call(this, t);
            var n = i(this.get("type"));
            this.link = n.url + "?" + e.convertHashToQueryStringParams(e.compact(n.options(t)))
        }

        function o(t) {
            var i = {
                image_url: decodeURIComponent(s(t.product_image_url)),
                product_url: s(t.product_url),
                review: t.review_content ? t.review_content.replace(e.emojiRegex, "") : "",
                social_title: t.review_title ? t.review_title.replace(e.emojiRegex, "") : ""
            };
            return "https://" + e.hosts.reviews_me.dynamic + "/facebook_post?" + e.convertHashToQueryStringParams(i)
        }

        function r(t) {
            var i = {
                reference_name: this.get("type") + "_social_share",
                url: s(t.product_url || document.location.href),
                app_key: t.appkey,
                redirect: !0
            };
            return "https://" + e.hosts.base.dynamic + "/go?" + e.convertHashToQueryStringParams(i)
        }

        function s(e) {
            return e && /^\/\//i.test(e) ? "http:" + e : e && !/^https?:\/\//i.test(e) ? "http://" + e : e
        }

        function a(t, i) {
            return e.socialData[t][i]
        }
        var l = !0,
            c = {},
            d = {
                facebook: o,
                twitter: r,
                google: r,
                linkedin: r
            };
        return e.socialData = {
            facebook: {
                application_id: null,
                feed_link: "https://www.facebook.com/dialog/feed"
            },
            twitter: {
                intent_link: "https://twitter.com/intent/tweet"
            },
            google: {
                share_link: "https://plus.google.com/share"
            },
            linkedin: {
                share_link: "https://www.linkedin.com/shareArticle"
            }
        }, t.prototype.get = function (e) {
            return this[e]
        }, t
    }(Yotpo), Yotpo.CustomFields = function (e) {
        function t(t, i) {
            function n() {
                e.currentAnalytics.trackEvent(l, "clicked_on", "crf_free_text_expanded", i)
            }
            e.Modules.CollapsibleElement.bind(t, c, "yotpo-question-field-answer", n)
        }

        function i(e) {
            var t = e.getElementsByClassName("product-related-fields-footer");
            if (t.length) {
                var i = t[0],
                    o = i.getElementsByClassName("product-related-fields-see-more")[0];
                o.onclick = function () {
                    n.call(self, e)
                };
                var r = i.getElementsByClassName("product-related-fields-see-less")[0];
                r.onclick = function () {
                    a.call(self, e)
                }
            }
        }

        function n(t) {
            for (var i = t, n = i.getElementsByClassName("product-related-fields-column"), o = 0; o < n.length; o++)
                for (var r = n[o], s = r.querySelectorAll(".product-related-fields-item.yotpo-hidden"), a = 0; a < s.length; a++) e.show(s[a], "table-row");
            e.hide(i.getElementsByClassName("product-related-fields-see-more")[0]), e.show(i.getElementsByClassName("product-related-fields-see-less")[0], "block")
        }

        function o(t, i) {
            for (var n = 0; n < t.length; n++)
                for (var o = t[n], r = o.getElementsByClassName("product-related-fields-item"), s = i; s < r.length; s++) e.hide(r[s])
        }

        function r(e) {
            var t = e.getElementsByClassName("product-related-fields-desktop-layout")[0],
                i = t.getElementsByClassName("product-related-fields-column");
            o(i, u)
        }

        function s(e) {
            var t = e.getElementsByClassName("product-related-fields-mobile-layout")[0],
                i = t.getElementsByClassName("product-related-fields-column");
            o(i, p)
        }

        function a(t) {
            var i = t;
            r(i), s(i), e.hide(i.getElementsByClassName("product-related-fields-see-less")[0]), e.show(i.getElementsByClassName("product-related-fields-see-more")[0], "block")
        }
        var l = "reviews",
            c = 349,
            d = {},
            u = 1,
            p = 3;
        return d.bind = function (e, i) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.classList.contains("yotpo-question-field") && t(o, i)
            }
        }, d.bindProductRelatedFields = function (e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                i(n)
            }
        }, d
    }(Yotpo), Yotpo.CustomFieldsForm = function (e) {
        function t(t) {
            e.addClass(t.querySelector(".yotpo-field-title"), "yotpo-custom-field-error")
        }

        function i(t) {
            var i = t.querySelector(".yotpo-custom-field-error");
            i && e.removeClass(i, "yotpo-custom-field-error")
        }

        function n(t) {
            var i = t.querySelector(".error-text");
            i && e.hide(i)
        }

        function o() {
            for (var t = 0; t < this.element.length; t++) {
                var i = this.element[t];
                if (e.hasClass(i, "yotpo-mandatory-custom-field")) {
                    var n = i.querySelector("input, textarea, select")
                        .name,
                        o = this.inputParams["custom_fields[" + n + "]"];
                    if (!o || o.constructor == Array && !o.length) throw {
                        message: "FieldNotValid:" + o,
                        field: n,
                        type: "mandatory_field"
                    }
                }
            }
        }

        function r() {
            for (var t = 0; t < this.element.length; t++) {
                var i = this.element[t];
                if (e.hasClass(i, "yotpo-input-size-limited")) {
                    var n = parseInt(i.getAttribute("data-min-length")),
                        o = parseInt(i.getAttribute("data-max-length")),
                        r = i.querySelector("input, textarea")
                        .name,
                        s = this.inputParams["custom_fields[" + r + "]"];
                    if (s && s.length > 0 && (s.length > o || s.length < n)) throw {
                        message: "FieldNotValid:" + s,
                        field: r,
                        type: "open_question_answer_length",
                        template_vars: {
                            max_length: o
                        }
                    }
                }
            }
        }

        function s(e, t, i) {
            if ("checkbox" === i) {
                for (var n = [], o = e.querySelectorAll('input[name="' + t + '"]:checked'), r = 0; r < o.length; r++) n.push(o[r].value);
                return n
            }
            if ("textarea" === i) {
                var s = e.querySelector('textarea[name="' + t + '"]');
                return s.value
            }
            if ("select-one" === i) {
                var a = e.querySelector('select[name="' + t + '"]');
                return "__default_none" === a.value ? "" : a.value
            }
            var l = e.querySelector('input[name="' + t + '"]' + ("hidden" != i ? ":checked" : ""));
            return l ? l.value : ""
        }

        function a() {
            for (var e = 0; e < this.element.length; e++) {
                var t = this.element[e].getElementsByClassName("yotpo-open-text-field")[0];
                t && l.call(t)
            }
        }

        function l() {
            var e = this.getElementsByClassName("yotpo-text-box")[0],
                t = parseInt(e.getAttribute("maxlength")),
                i = this.getElementsByClassName("current-chars")[0];
            e.onkeyup = function () {
                var n = e.value.length;
                n > t && (e.value = e.value.substring(0, t), n = t), i.innerHTML = n
            }
        }
        var c = function (e) {
            this.element = e, this.inputParams = {}, this.fieldElements = {}, a.call(this)
        };
        return c.prototype.getFieldElement = function (e) {
            return this.fieldElements[e] ? this.fieldElements[e] : null
        }, c.prototype.getValues = function () {
            this.inputParams = {};
            for (var t = 0; t < this.element.length; ++t) {
                var i = this.element[t];
                if (!e.isHidden(i) || e.hasClass(i, "yotpo-product-tag-param")) {
                    var n = i.querySelector("input, textarea, select"),
                        o = n.name,
                        r = n.type,
                        a = s(i, o, r);
                    this.fieldElements[o] = i, "product_tags" == o ? this.inputParams[o] = a : e.isEmptyString(a) || (this.inputParams["custom_fields[" + o + "]"] = a)
                }
            }
            return this.inputParams
        }, c.prototype.reset = function () {
            for (var e = 0; e < this.element.length; ++e) {
                var t = this.element[e].querySelector("input, textarea, select"),
                    i = t.type;
                if ("textarea" === i) t.value = "";
                else if ("select-one" === i) t.value = "__default_none";
                else
                    for (var n = this.element[e].querySelectorAll('input[type="' + i + '"]:checked'), o = 0; o < n.length; ++o) n[o].checked = !1
            }
        }, c.prototype.cleanErrors = function () {
            for (var e = 0; e < this.element.length; ++e) {
                var t = this.element[e];
                i(t), n(t)
            }
        }, c.prototype.validate = function () {
            o.call(this), r.call(this)
        }, c.prototype.showFieldError = function (i, n) {
            t(i);
            var o = i.getElementsByClassName(n)[0];
            o && e.show(o)
        }, c
    }(Yotpo), Yotpo.CustomFieldsRenderer = function (e) {
        function t(e) {
            var t = {};
            for (var i in e) i.indexOf("custom_fields") > -1 && (t[i] = e[i]);
            return t
        }

        function i(t, i, n) {
            if (!i) return !1;
            for (var o = !1, r = 0; r < n.length; r++) {
                var s = n[r],
                    a = s.querySelector(".yotpo-template-field")
                    .cloneNode(!0);
                a.querySelector(".yotpo-field-description")
                    .innerHTML = t + ":", a.querySelector(".yotpo-field-answer")
                    .innerHTML = i, e.removeClass(a, "yotpo-hidden"), e.removeClass(a, "yotpo-template-field"), s.appendChild(a), o = !0
            }
            return o
        }

        function n(e, t, i, n, o) {
            var s = e.querySelector(".yotpo-product-related-fields"),
                l = 2;
            t && (l = t % 2 == 1 ? 0 : 1);
            var c = s.querySelectorAll(".yotpo-product-related-fields-column")[l];
            r(c, n), a(c, i, o)
        }

        function o(t, i, n, o, r, a) {
            var c, d = t.querySelector(".yotpo-product-related-fields");
            if (i) {
                var p = n % u,
                    g = d.querySelector(".product-related-fields-desktop-layout");
                c = g.querySelectorAll(".product-related-fields-column")[p]
            } else {
                var g = d.querySelector(".product-related-fields-mobile-layout");
                c = g.querySelector(".product-related-fields-column")
            }
            var h = c.querySelector(".product-related-fields-item"),
                m = h.cloneNode(!0);
            e.removeClass(m, "yotpo-hidden"), e.removeClass(m, "yotpo-template-field"), s(m, r), l(m, o, a), c.appendChild(m)
        }

        function r(t, i) {
            var n = t.querySelector(".yotpo-product-related-fields-names"),
                o = n.querySelector(".yotpo-product-related-field-name.yotpo-template-field"),
                r = o.cloneNode(!0);
            r.innerHTML = i + ":", e.removeClass(r, "yotpo-hidden"), e.removeClass(r, "yotpo-template-field");
            var s = document.createElement("div");
            s.appendChild(r), n.insertAdjacentHTML("beforeend", s.innerHTML)
        }

        function s(e, t) {
            var i = e.querySelector(".product-related-fields-item-title");
            i.innerHTML = t
        }

        function a(t, i, n) {
            var o = t.querySelector(".yotpo-product-related-fields-bars"),
                r = o.querySelector(".yotpo-" + i.toLowerCase() + "-bars.yotpo-template-field"),
                s = r.cloneNode(!0);
            c(n, s, i), e.removeClass(s, "yotpo-hidden"), e.removeClass(s, "yotpo-template-field");
            var a = document.createElement("div");
            a.appendChild(s);
            var l = document.createElement("div");
            e.addClass(l, "yotpo-clr"), a.appendChild(l), o.insertAdjacentHTML("beforeend", a.innerHTML)
        }

        function l(t, i, n) {
            var o, r = t.querySelector(".product-related-fields-item-value"),
                s = i.toLowerCase();
            if ("rating" == s) {
                var a = t.querySelector(".yotpo-" + s + "-bars.yotpo-template-field");
                o = a.cloneNode(!0), c(n, o, i), e.removeClass(o, "yotpo-hidden"), e.removeClass(o, "yotpo-template-field")
            } else "size" == s && (o = document.createTextNode(n));
            var l = document.createElement("div");
            l.appendChild(o);
            var d = document.createElement("div");
            e.addClass(d, "yotpo-clr"), l.appendChild(d), r.insertAdjacentHTML("beforeend", l.innerHTML)
        }

        function c(t, i, n) {
            var o = parseInt(t),
                r = i.getElementsByClassName("yotpo-product-related-field-score-bar");
            switch (n.toLowerCase()) {
            case "rating":
                for (var s = 0; s < r.length && o >= s + 1; s++) e.addClass(r[s], "yotpo-rating-bar-full");
                break;
            case "size":
                var a = r[2 * (o - 1)],
                    l = 2 == o ? "fit" : "offset";
                e.removeClass(a, "yotpo-size-bar-empty"), e.addClass(a, "yotpo-size-bar-" + l)
            }
        }
        var d = {},
            u = 3;
        return d.render = function (r, s) {
            var a = yotpo.getUserSettings()
                .custom_fields_info,
                l = yotpo.getUserSettings()
                .new_main_widget_layout,
                c = {
                    ".yotpo-product-related-fields": !1,
                    ".yotpo-user-related-fields": !1,
                    ".yotpo-open-question-fields": !1
                },
                d = 1,
                u = t(s);
            for (var p in u) {
                var g = p.match(/\[(.*?)\]/)
                    .pop(),
                    h = a[g].field_type,
                    m = a[g].title,
                    f = u[p];
                if (["Rating", "Size"].indexOf(h) > -1 && f > 0) {
                    if (l) {
                        if ("Size" == h) {
                            var y = parseInt(f);
                            f = a[g].options[y - 1]
                        }
                        o(r, !0, d - 1, h, m, f), o(r, !1, null, h, m, f)
                    } else n(r, d, h, m, f), n(r, null, h, m, f);
                    d++, c[".yotpo-product-related-fields"] = !0
                } else if (["SingleChoice", "MultipleChoice"].indexOf(h) > -1) {
                    if (f instanceof Array) {
                        if (!(f.length > 0)) continue;
                        f = f.join(", ")
                    }
                    var v = r.querySelectorAll(".yotpo-user-related-fields"),
                        b = i(m, f, v);
                    b && (c[".yotpo-user-related-fields"] = !0)
                } else if (["CustomerFreeText", "ProductFreeText"].indexOf(h) > -1) {
                    var w = r.querySelectorAll(".yotpo-open-question-fields");
                    f && (f = f.replace(/\n/g, "</br>"));
                    var b = i(m, f, w);
                    b && (c[".yotpo-open-question-fields"] = !0)
                }
            }
            for (var _ in c)
                if (!c[_]) {
                    var S = r.querySelector(_);
                    S && e.addClass(S, "yotpo-hidden")
                }
        }, d
    }(Yotpo), Yotpo.Libraries = Yotpo.Libraries || {}, Yotpo.Libraries.Tracker = function (e) {
        var t = {};
        return t.trackConversionOrder = function (t, i) {
            var n = i.orderId,
                o = i.orderAmount,
                r = i.orderCurrency;
            t && n && o && r && e.Libraries.YotpoTracker.trackConversionOrder(t, i)
        }, t.fbTracking = function (t, i) {
            var n = new e.Libraries.FacebookAds(t.pixel_id);
            1 == t.page_view && n.trackPageView(), 1 == t.purchase && i && n.trackPurchase(i)
        }, t
    }(Yotpo), Yotpo.Libraries = Yotpo.Libraries || {}, Yotpo.Libraries.YotpoTracker = function (e) {
        var t = 1,
            i = {};
        return i.adaptConversionOrderObject = function (e) {
            var t = [];
            if (e.products)
                for (var i = 0; i < e.products.length; ++i) {
                    var n = e.products[i];
                    t.push({
                        id: n.productId,
                        name: n.productName,
                        url: n.productUrl,
                        image: n.productImage,
                        price: n.productPrice,
                        description: n.productDescription,
                        specs: n.productSpecs
                    })
                }
            var o = {
                order_id: e.orderId,
                order_amount: e.orderAmount,
                order_currency: e.orderCurrency,
                order_date: e.orderDate,
                customer_name: e.customerName,
                customer_email: e.customerEmail,
                products: t
            };
            return o
        }, i.trackConversionOrder = function (i, n) {
            var o = e.getApiHost() + "/conversion_tracking?app_key=" + i + "&v=" + t,
                r = function (t) {
                    t = JSON.parse(t), e.currentAnalytics.trackConversion(t.appKey, t.orderId, t.orderAmount, t.orderCurrency)
                },
                s = this.adaptConversionOrderObject(n),
                a = e.removeUndefinedFields(s);
            e.ajax(o, r, "POST", e.convertComplexObjectToQueryStringParams(a))
        }, i
    }(Yotpo), Yotpo.Libraries = Yotpo.Libraries || {}, Yotpo.Libraries.FacebookAds = function () {
        function e(e) {
            window.fbq && t() || (! function (e, t, i, n, o, r, s) {
                e.fbq || (o = e.fbq = function () {
                    o.callMethod ? o.callMethod.apply(o, arguments) : o.queue.push(arguments)
                }, e._fbq || (e._fbq = o), o.push = o, o.loaded = !0, o.version = "2.0", o.queue = [], r = t.createElement(i), r.async = !0, r.src = n, s = t.getElementsByTagName(i)[0], s.parentNode.insertBefore(r, s))
            }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"), fbq("init", e), fbq.yotpoInited = !0)
        }

        function t() {
            return "undefined" != typeof yotpoTrackConversionData
        }
        var i = .01,
            n = "USD";
        return e.prototype.trackPageView = function () {
            fbq("track", "PageView")
        }, e.prototype.trackPurchase = function (e) {
            var t = {};
            t.value = e.orderAmount ? e.orderAmount : i, t.currency = e.orderCurrency ? e.orderCurrency : n, e.orderSkus && (t.content_ids = e.orderSkus, t.content_type = "product"), fbq.yotpoInited && fbq("track", "Purchase", t)
        }, e
    }(Yotpo), Yotpo.Libraries = Yotpo.Libraries || {}, Yotpo.Libraries.Resumable = function () {
        var e = function (t) {
            function i(e, t, i, n) {
                var r;
                return e.isFile ? e.file(function (e) {
                    e.relativePath = t + e.name, i.push(e), n()
                }) : (e.isDirectory ? r = e : e instanceof File && i.push(e), "function" == typeof e.webkitGetAsEntry && (r = e.webkitGetAsEntry()), r && r.isDirectory ? o(r, t + r.name + "/", i, n) : ("function" == typeof e.getAsFile && (e = e.getAsFile(), e.relativePath = t + e.name, i.push(e)), void n()))
            }

            function n(e, t) {
                return e && 0 !== e.length ? void e[0](function () {
                    n(e.slice(1), t)
                }) : t()
            }

            function o(e, t, o, r) {
                var s = e.createReader();
                s.readEntries(function (e) {
                    return e.length ? void n(e.map(function (e) {
                        return i.bind(null, e, t, o)
                    }), r) : r()
                })
            }

            function r(e, t) {
                if (e.length) {
                    l.fire("beforeAdd");
                    var o = [];
                    n(Array.prototype.map.call(e, function (e) {
                        return i.bind(null, e, "", o)
                    }), function () {
                        o.length && p(o, t)
                    })
                }
            }

            function s(e, t, i) {
                var n = this;
                n.opts = {}, n.getOpt = e.getOpt, n._prevProgress = 0, n.resumableObj = e, n.file = t, n.fileName = t.fileName || t.name, n.size = t.size, n.relativePath = t.relativePath || t.webkitRelativePath || n.fileName, n.uniqueIdentifier = i, n._pause = !1, n.container = "";
                var o = void 0 !== i,
                    r = function (e, t) {
                        switch (e) {
                        case "progress":
                            n.resumableObj.fire("fileProgress", n, t);
                            break;
                        case "error":
                            n.abort(), o = !0, n.chunks = [], n.resumableObj.fire("fileError", n, t);
                            break;
                        case "success":
                            if (o) return;
                            n.resumableObj.fire("fileProgress", n), n.isComplete() && n.resumableObj.fire("fileSuccess", n, t);
                            break;
                        case "retry":
                            n.resumableObj.fire("fileRetry", n)
                        }
                    };
                return n.chunks = [], n.abort = function () {
                    var e = 0;
                    c.each(n.chunks, function (t) {
                        "uploading" == t.status() && (t.abort(), e++)
                    }), e > 0 && n.resumableObj.fire("fileProgress", n)
                }, n.cancel = function () {
                    var e = n.chunks;
                    n.chunks = [], c.each(e, function (e) {
                        "uploading" == e.status() && (e.abort(), n.resumableObj.uploadNextChunk())
                    }), n.resumableObj.removeFile(n), n.resumableObj.fire("fileProgress", n)
                }, n.retry = function () {
                    n.bootstrap();
                    var e = !1;
                    n.resumableObj.on("chunkingComplete", function () {
                        e || n.resumableObj.upload(), e = !0
                    })
                }, n.bootstrap = function () {
                    n.abort(), o = !1, n.chunks = [], n._prevProgress = 0;
                    for (var e = n.getOpt("forceChunkSize") ? Math.ceil : Math.floor, t = Math.max(e(n.file.size / n.getOpt("chunkSize")), 1), i = 0; t > i; i++) ! function (e) {
                        window.setTimeout(function () {
                            n.chunks.push(new a(n.resumableObj, n, e, r)), n.resumableObj.fire("chunkingProgress", n, e / t)
                        }, 0)
                    }(i);
                    window.setTimeout(function () {
                        n.resumableObj.fire("chunkingComplete", n)
                    }, 0)
                }, n.progress = function () {
                    if (o) return 1;
                    var e = 0,
                        t = !1;
                    return c.each(n.chunks, function (i) {
                        "error" == i.status() && (t = !0), e += i.progress(!0)
                    }), e = t ? 1 : e > .99999 ? 1 : e, e = Math.max(n._prevProgress, e), n._prevProgress = e, e
                }, n.isUploading = function () {
                    var e = !1;
                    return c.each(n.chunks, function (t) {
                        return "uploading" == t.status() ? (e = !0, !1) : void 0
                    }), e
                }, n.successfulChunks = function () {
                    var e = 0;
                    return c.each(n.chunks, function (t) {
                        var i = t.status();
                        "success" == i && e++
                    }), e
                }, n.isComplete = function () {
                    var e = !1;
                    return c.each(n.chunks, function (t) {
                        var i = t.status();
                        return "pending" == i || "uploading" == i || 1 === t.preprocessState ? (e = !0, !1) : void 0
                    }), !e
                }, n.pause = function (e) {
                    n._pause = "undefined" == typeof e ? n._pause ? !1 : !0 : e
                }, n.isPaused = function () {
                    return n._pause
                }, n.resumableObj.fire("chunkingStart", n), n.bootstrap(), this
            }

            function a(e, t, i, n) {
                var o = this;
                o.opts = {}, o.getOpt = e.getOpt, o.resumableObj = e, o.fileObj = t, o.fileObjSize = t.size, o.fileObjType = t.file.type, o.offset = i, o.callback = n, o.lastProgressCallback = new Date, o.tested = !1, o.retries = 0, o.pendingRetry = !1, o.preprocessState = 0;
                var r = o.getOpt("chunkSize");
                return o.loaded = 0, o.startByte = o.offset * r, o.endByte = Math.min(o.fileObjSize, (o.offset + 1) * r), o.fileObjSize - o.endByte < r && !o.getOpt("forceChunkSize") && (o.endByte = o.fileObjSize), o.xhr = null, o.test = function () {
                    o.xhr = new XMLHttpRequest;
                    var e = function () {
                        o.tested = !0;
                        var e = o.status();
                        "success" == e ? (o.callback(e, o.message()), o.resumableObj.uploadNextChunk()) : o.send()
                    };
                    o.xhr.addEventListener("load", e, !1), o.xhr.addEventListener("error", e, !1), o.xhr.addEventListener("timeout", e, !1);
                    var t = [],
                        i = o.getOpt("parameterNamespace"),
                        n = o.getOpt("query");
                    "function" == typeof n && (n = n(o.fileObj, o)), c.each(n, function (e, n) {
                        t.push([encodeURIComponent(i + e), encodeURIComponent(n)].join("="))
                    }), t = t.concat([
                        ["chunkNumberParameterName", o.offset + 1],
                        ["chunkSizeParameterName", o.getOpt("chunkSize")],
                        ["currentChunkSizeParameterName", o.endByte - o.startByte],
                        ["totalSizeParameterName", o.fileObjSize],
                        ["typeParameterName", o.fileObjType],
                        ["identifierParameterName", o.fileObj.uniqueIdentifier],
                        ["fileNameParameterName", o.fileObj.fileName],
                        ["relativePathParameterName", o.fileObj.relativePath],
                        ["totalChunksParameterName", o.fileObj.chunks.length]
                    ].filter(function (e) {
                            return o.getOpt(e[0])
                        })
                        .map(function (e) {
                            return [i + o.getOpt(e[0]), encodeURIComponent(e[1])].join("=")
                        })), o.xhr.open(o.getOpt("testMethod"), c.getTarget("test", t)), o.xhr.timeout = o.getOpt("xhrTimeout"), o.xhr.withCredentials = o.getOpt("withCredentials");
                    var r = o.getOpt("headers");
                    "function" == typeof r && (r = r(o.fileObj, o)), c.each(r, function (e, t) {
                        o.xhr.setRequestHeader(e, t)
                    }), o.xhr.send(null)
                }, o.preprocessFinished = function () {
                    o.preprocessState = 2, o.send()
                }, o.send = function () {
                    var e = o.getOpt("preprocess");
                    if ("function" == typeof e) switch (o.preprocessState) {
                    case 0:
                        return o.preprocessState = 1, void e(o);
                    case 1:
                        return;
                    case 2:
                    }
                    if (o.getOpt("testChunks") && !o.tested) return void o.test();
                    o.xhr = new XMLHttpRequest, o.xhr.upload.addEventListener("progress", function (e) {
                        new Date - o.lastProgressCallback > 1e3 * o.getOpt("throttleProgressCallbacks") && (o.callback("progress"), o.lastProgressCallback = new Date), o.loaded = e.loaded || 0
                    }, !1), o.loaded = 0, o.pendingRetry = !1, o.callback("progress");
                    var t = function () {
                        var e = o.status();
                        if ("success" == e || "error" == e) o.callback(e, o.message()), o.resumableObj.uploadNextChunk();
                        else {
                            o.callback("retry", o.message()), o.abort(), o.retries++;
                            var t = o.getOpt("chunkRetryInterval");
                            void 0 !== t ? (o.pendingRetry = !0, setTimeout(o.send, t)) : o.send()
                        }
                    };
                    o.xhr.addEventListener("load", t, !1), o.xhr.addEventListener("error", t, !1), o.xhr.addEventListener("timeout", t, !1);
                    var i = [
                            ["chunkNumberParameterName", o.offset + 1],
                            ["chunkSizeParameterName", o.getOpt("chunkSize")],
                            ["currentChunkSizeParameterName", o.endByte - o.startByte],
                            ["totalSizeParameterName", o.fileObjSize],
                            ["typeParameterName", o.fileObjType],
                            ["identifierParameterName", o.fileObj.uniqueIdentifier],
                            ["fileNameParameterName", o.fileObj.fileName],
                            ["relativePathParameterName", o.fileObj.relativePath],
                            ["totalChunksParameterName", o.fileObj.chunks.length]
                        ].filter(function (e) {
                            return o.getOpt(e[0])
                        })
                        .reduce(function (e, t) {
                            return e[o.getOpt(t[0])] = t[1], e
                        }, {}),
                        n = o.getOpt("query");
                    "function" == typeof n && (n = n(o.fileObj, o)), c.each(n, function (e, t) {
                        i[e] = t
                    });
                    var r = o.fileObj.file.slice ? "slice" : o.fileObj.file.mozSlice ? "mozSlice" : o.fileObj.file.webkitSlice ? "webkitSlice" : "slice",
                        s = o.fileObj.file[r](o.startByte, o.endByte),
                        a = null,
                        l = [],
                        d = o.getOpt("parameterNamespace");
                    if ("octet" === o.getOpt("method")) a = s, c.each(i, function (e, t) {
                        l.push([encodeURIComponent(d + e), encodeURIComponent(t)].join("="))
                    });
                    else if (a = new FormData, c.each(i, function (e, t) {
                            a.append(d + e, t), l.push([encodeURIComponent(d + e), encodeURIComponent(t)].join("="))
                        }), "blob" == o.getOpt("chunkFormat")) a.append(d + o.getOpt("fileParameterName"), s, o.fileObj.fileName);
                    else if ("base64" == o.getOpt("chunkFormat")) {
                        var u = new FileReader;
                        u.onload = function () {
                            a.append(d + o.getOpt("fileParameterName"), u.result), o.xhr.send(a)
                        }, u.readAsDataURL(s)
                    }
                    var p = c.getTarget("upload", l),
                        g = o.getOpt("uploadMethod");
                    o.xhr.open(g, p), "octet" === o.getOpt("method") && o.xhr.setRequestHeader("Content-Type", "application/octet-stream"), o.xhr.timeout = o.getOpt("xhrTimeout"), o.xhr.withCredentials = o.getOpt("withCredentials");
                    var h = o.getOpt("headers");
                    "function" == typeof h && (h = h(o.fileObj, o)), c.each(h, function (e, t) {
                        o.xhr.setRequestHeader(e, t)
                    }), "blob" == o.getOpt("chunkFormat") && o.xhr.send(a)
                }, o.abort = function () {
                    o.xhr && o.xhr.abort(), o.xhr = null
                }, o.status = function () {
                    return o.pendingRetry ? "uploading" : o.xhr ? o.xhr.readyState < 4 ? "uploading" : 200 == o.xhr.status || 201 == o.xhr.status ? "success" : c.contains(o.getOpt("permanentErrors"), o.xhr.status) || o.retries >= o.getOpt("maxChunkRetries") ? "error" : (o.abort(), "pending") : "pending"
                }, o.message = function () {
                    return o.xhr ? o.xhr.responseText : ""
                }, o.progress = function (e) {
                    "undefined" == typeof e && (e = !1);
                    var t = e ? (o.endByte - o.startByte) / o.fileObjSize : 1;
                    if (o.pendingRetry) return 0;
                    o.xhr && o.xhr.status || (t *= .95);
                    var i = o.status();
                    switch (i) {
                    case "success":
                    case "error":
                        return 1 * t;
                    case "pending":
                        return 0 * t;
                    default:
                        return o.loaded / (o.endByte - o.startByte) * t
                    }
                }, this
            }
            if (!(this instanceof e)) return new e(t);
            if (this.version = 1, this.support = !("undefined" == typeof File || "undefined" == typeof Blob || "undefined" == typeof FileList || !Blob.prototype.webkitSlice && !Blob.prototype.mozSlice && !Blob.prototype.slice), !this.support) return !1;
            var l = this;
            l.files = [], l.defaults = {
                chunkSize: 1048576,
                forceChunkSize: !1,
                simultaneousUploads: 3,
                fileParameterName: "file",
                chunkNumberParameterName: "resumableChunkNumber",
                chunkSizeParameterName: "resumableChunkSize",
                currentChunkSizeParameterName: "resumableCurrentChunkSize",
                totalSizeParameterName: "resumableTotalSize",
                typeParameterName: "resumableType",
                identifierParameterName: "resumableIdentifier",
                fileNameParameterName: "resumableFilename",
                relativePathParameterName: "resumableRelativePath",
                totalChunksParameterName: "resumableTotalChunks",
                throttleProgressCallbacks: .5,
                query: {},
                headers: {},
                preprocess: null,
                method: "multipart",
                uploadMethod: "POST",
                testMethod: "GET",
                prioritizeFirstAndLastChunk: !1,
                target: "/",
                testTarget: null,
                parameterNamespace: "",
                testChunks: !0,
                generateUniqueIdentifier: null,
                getTarget: null,
                maxChunkRetries: 100,
                chunkRetryInterval: void 0,
                permanentErrors: [400, 404, 415, 500, 501],
                maxFiles: void 0,
                withCredentials: !1,
                xhrTimeout: 0,
                clearInput: !0,
                chunkFormat: "blob",
                maxFilesErrorCallback: function () {
                    var e = l.getOpt("maxFiles");
                    alert("Please upload no more than " + e + " file" + (1 === e ? "" : "s") + " at a time.")
                },
                minFileSize: 1,
                minFileSizeErrorCallback: function (e) {
                    alert(e.fileName || e.name + " is too small, please upload files larger than " + c.formatSize(l.getOpt("minFileSize")) + ".")
                },
                maxFileSize: void 0,
                maxFileSizeErrorCallback: function (e) {
                    alert(e.fileName || e.name + " is too large, please upload files less than " + c.formatSize(l.getOpt("maxFileSize")) + ".")
                },
                fileType: [],
                fileTypeErrorCallback: function (e) {
                    alert(e.fileName || e.name + " has type not allowed, please upload files of type " + l.getOpt("fileType") + ".")
                }
            }, l.opts = t || {}, l.getOpt = function (t) {
                var i = this;
                if (t instanceof Array) {
                    var n = {};
                    return c.each(t, function (e) {
                        n[e] = i.getOpt(e)
                    }), n
                }
                if (i instanceof a) {
                    if ("undefined" != typeof i.opts[t]) return i.opts[t];
                    i = i.fileObj
                }
                if (i instanceof s) {
                    if ("undefined" != typeof i.opts[t]) return i.opts[t];
                    i = i.resumableObj
                }
                return i instanceof e ? "undefined" != typeof i.opts[t] ? i.opts[t] : i.defaults[t] : void 0
            }, l.events = [], l.on = function (e, t) {
                l.events.push(e.toLowerCase(), t)
            }, l.fire = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
                for (var i = e[0].toLowerCase(), t = 0; t <= l.events.length; t += 2) l.events[t] == i && l.events[t + 1].apply(l, e.slice(1)), "catchall" == l.events[t] && l.events[t + 1].apply(null, e);
                "fileerror" == i && l.fire("error", e[2], e[1]), "fileprogress" == i && l.fire("progress")
            };
            var c = {
                    stopEvent: function (e) {
                        e.stopPropagation(), e.preventDefault()
                    },
                    each: function (e, t) {
                        if ("undefined" != typeof e.length) {
                            for (var i = 0; i < e.length; i++)
                                if (t(e[i]) === !1) return
                        } else
                            for (i in e)
                                if (t(i, e[i]) === !1) return
                    },
                    generateUniqueIdentifier: function (e, t) {
                        var i = l.getOpt("generateUniqueIdentifier");
                        if ("function" == typeof i) return i(e, t);
                        var n = e.webkitRelativePath || e.fileName || e.name,
                            o = e.size;
                        return o + "-" + n.replace(/[^0-9a-zA-Z_-]/gim, "")
                    },
                    contains: function (e, t) {
                        var i = !1;
                        return c.each(e, function (e) {
                            return e == t ? (i = !0, !1) : !0
                        }), i
                    },
                    formatSize: function (e) {
                        return 1024 > e ? e + " bytes" : 1048576 > e ? (e / 1024)
                            .toFixed(0) + " KB" : 1073741824 > e ? (e / 1024 / 1024)
                            .toFixed(1) + " MB" : (e / 1024 / 1024 / 1024)
                            .toFixed(1) + " GB"
                    },
                    getTarget: function (e, t) {
                        var i = l.getOpt("target");
                        if ("test" === e && l.getOpt("testTarget") && (i = l.getOpt("/" === l.getOpt("testTarget") ? "target" : "testTarget")), "function" == typeof i) return i(t);
                        var n = i.indexOf("?") < 0 ? "?" : "&",
                            o = t.join("&");
                        return i + n + o
                    }
                },
                d = function (e) {
                    c.stopEvent(e), e.dataTransfer && e.dataTransfer.items ? r(e.dataTransfer.items, e) : e.dataTransfer && e.dataTransfer.files && r(e.dataTransfer.files, e)
                },
                u = function (e) {
                    e.preventDefault()
                },
                p = function (e, t) {
                    var i = 0,
                        n = l.getOpt(["maxFiles", "minFileSize", "maxFileSize", "maxFilesErrorCallback", "minFileSizeErrorCallback", "maxFileSizeErrorCallback", "fileType", "fileTypeErrorCallback"]);
                    if ("undefined" != typeof n.maxFiles && n.maxFiles < e.length + l.files.length) {
                        if (1 !== n.maxFiles || 1 !== l.files.length || 1 !== e.length) return n.maxFilesErrorCallback(e, i++), !1;
                        l.removeFile(l.files[0])
                    }
                    var o = [],
                        r = [],
                        a = e.length,
                        d = function () {
                            if (!--a) {
                                if (!o.length && !r.length) return;
                                window.setTimeout(function () {
                                    l.fire("filesAdded", o, r)
                                }, 0)
                            }
                        };
                    c.each(e, function (e) {
                        function a(i) {
                            l.getFromUniqueIdentifier(i) ? r.push(e) : ! function () {
                                e.uniqueIdentifier = i;
                                var n = new s(l, e, i);
                                l.files.push(n), o.push(n), n.container = "undefined" != typeof t ? t.srcElement : null, window.setTimeout(function () {
                                    l.fire("fileAdded", n, t)
                                }, 0)
                            }(), d()
                        }
                        var u = e.name;
                        if (n.fileType.length > 0) {
                            var p = !1;
                            for (var g in n.fileType) {
                                var h = "." + n.fileType[g];
                                if (-1 !== u.toLowerCase()
                                    .indexOf(h.toLowerCase(), u.length - h.length)) {
                                    p = !0;
                                    break
                                }
                            }
                            if (!p) return n.fileTypeErrorCallback(e, i++), !1
                        }
                        if ("undefined" != typeof n.minFileSize && e.size < n.minFileSize) return n.minFileSizeErrorCallback(e, i++), !1;
                        if ("undefined" != typeof n.maxFileSize && e.size > n.maxFileSize) return n.maxFileSizeErrorCallback(e, i++), !1;
                        var m = c.generateUniqueIdentifier(e, t);
                        m && "function" == typeof m.then ? m.then(function (e) {
                            a(e)
                        }, function () {
                            d()
                        }) : a(m)
                    })
                };
            return l.uploadNextChunk = function () {
                var e = !1,
                    t = !1;
                if (c.each(l.files, function (e) {
                        return e.chunks.length && "uploading" == e.chunks[0].status() && 2 !== e.chunks[0].preprocessState ? (t = !0, !1) : void 0
                    }), t) return console.log("Waiting for the first chunk to reach the server..."), !0;
                if (c.each(l.files, function (t) {
                        return t.chunks.length && "pending" == t.chunks[0].status() && 0 === t.chunks[0].preprocessState ? (t.chunks[0].send(), e = !0, !1) : void 0
                    }), e) return !0;
                if (c.each(l.files, function (t) {
                        var i = t.chunks.length,
                            n = t.successfulChunks();
                        return t.isComplete() || t.isPaused() !== !1 || c.each(t.chunks, function (t) {
                            t.offset + 1 == i && n != i - 1 || "pending" == t.status() && 0 === t.preprocessState && (t.send(), e = !0)
                        }), e ? !1 : void 0
                    }), e) return !0;
                var i = !1;
                return c.each(l.files, function (e) {
                    return e.isComplete() ? void 0 : (i = !0, !1)
                }), i || l.fire("complete"), !1
            }, l.assignBrowse = function (e, t) {
                "undefined" == typeof e.length && (e = [e]), c.each(e, function (e) {
                    var i;
                    "INPUT" === e.tagName && "file" === e.type ? i = e : (i = document.createElement("input"), i.setAttribute("type", "file"), i.style.display = "none", e.addEventListener("click", function () {
                        i.style.opacity = 0, i.style.display = "block", i.focus(), i.click(), i.style.display = "none"
                    }, !1), e.appendChild(i));
                    var n = l.getOpt("maxFiles");
                    "undefined" == typeof n || 1 != n ? i.setAttribute("multiple", "multiple") : i.removeAttribute("multiple"), t ? i.setAttribute("webkitdirectory", "webkitdirectory") : i.removeAttribute("webkitdirectory"), i.addEventListener("change", function (e) {
                        p(e.target.files, e);
                        var t = l.getOpt("clearInput");
                        t && (e.target.value = "")
                    }, !1)
                })
            }, l.assignDrop = function (e) {
                "undefined" == typeof e.length && (e = [e]), c.each(e, function (e) {
                    e.addEventListener("dragover", u, !1), e.addEventListener("dragenter", u, !1), e.addEventListener("drop", d, !1)
                })
            }, l.unAssignDrop = function (e) {
                "undefined" == typeof e.length && (e = [e]), c.each(e, function (e) {
                    e.removeEventListener("dragover", u), e.removeEventListener("dragenter", u), e.removeEventListener("drop", d)
                })
            }, l.isUploading = function () {
                var e = !1;
                return c.each(l.files, function (t) {
                    return t.isUploading() ? (e = !0, !1) : void 0
                }), e
            }, l.upload = function () {
                if (!l.isUploading()) {
                    l.fire("uploadStart");
                    for (var e = 1; e <= l.getOpt("simultaneousUploads"); e++) l.uploadNextChunk()
                }
            }, l.pause = function () {
                c.each(l.files, function (e) {
                    e.abort()
                }), l.fire("pause")
            }, l.cancel = function () {
                l.fire("beforeCancel");
                for (var e = l.files.length - 1; e >= 0; e--) l.files[e].cancel();
                l.fire("cancel")
            }, l.progress = function () {
                var e = 0,
                    t = 0;
                return c.each(l.files, function (i) {
                    e += i.progress() * i.size, t += i.size
                }), t > 0 ? e / t : 0
            }, l.addFile = function (e, t) {
                p([e], t)
            }, l.removeFile = function (e) {
                for (var t = l.files.length - 1; t >= 0; t--) l.files[t] === e && l.files.splice(t, 1)
            }, l.getFromUniqueIdentifier = function (e) {
                var t = !1;
                return c.each(l.files, function (i) {
                    i.uniqueIdentifier == e && (t = i)
                }), t
            }, l.getSize = function () {
                var e = 0;
                return c.each(l.files, function (t) {
                    e += t.size
                }), e
            }, l.handleDropEvent = function (e) {
                d(e)
            }, l.handleChangeEvent = function (e) {
                p(e.target.files, e), e.target.value = ""
            }, l.updateQuery = function (e) {
                l.opts.query = e
            }, this
        };
        return e
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Lightbox = function (e) {
        function t(e, t, i, n, o, r) {
            this._controller = e, this.element = t, this.contentProvider = i, this.analyticTracker = n || {
                track: function () {}
            }, this.wrapperElement = o, this.lightboxNewDesign = e.getUserSetting("lightbox_new_design"), this.minImageContainers = r ? r + 2 : M, F.call(this), k.call(this)
        }

        function i(e) {
            for (var t = this.lightbox.getElementsByClassName("yotpo-lightbox-mobile-content"), i = 0; i < t.length; i++) {
                var n = t[i];
                if (n.previousElementSibling != e)
                    for (; n.hasChildNodes();) n.removeChild(n.lastChild)
            }
        }

        function n() {
            var e = this.currImageIndex === N ? this.numLightboxImages - 1 : this.currImageIndex - N - 1,
                t = this.currImageIndex - N,
                i = this.currImageIndex === this.numLightboxImages + 1 ? Math.min(N, e) : this.currImageIndex - N + 1;
            return this.singleImage && (e = t = i = this.currImageIndex), {
                prev: this.imagesInfo[e],
                current: Object.assign({
                    current: !0
                }, this.imagesInfo[t]),
                next: this.imagesInfo[i]
            }
        }

        function o() {
            var e = this.lightboxImages[this.currImageIndex].dataset.imageId;
            r.call(this, e) && this.videoPlayers[e].kalturaPlayer.pause()
        }

        function r(e) {
            return this.videoPlayers[e]
        }

        function s(e, t) {
            p.call(this, e, t), v.call(this, t), x.call(this, t)
        }

        function a() {
            for (var e = 0; e < this.numImageContainers; e++) this.lightboxImageContainers[e].style.width = 100 / this.numImageContainers + "%";
            this.lightboxContainer.style.width = 100 * this.numImageContainers + "%"
        }

        function l() {
            for (var t = 0; t < this.lightboxImageContainers.length; t++) {
                var i = this.lightboxImageContainers[t];
                t < this.numImageContainers ? e.removeClass(i, "yotpo-hidden") : e.addClass(i, "yotpo-hidden")
            }
        }

        function c(e, t) {
            "image" == e.dataset.mediaType && (e.src !== t.url && (e.src = t.url), e.setAttribute("data-image-id", t.imageId)), t.externalImageId && e.setAttribute("data-external-image-id", t.externalImageId)
        }

        function d(t, i) {
            var n = t.index;
            x.call(this, this.lightboxImages[n]), e.removeClass(this.lightboxContainer, "yotpo-hidden"), e.addClass(this.loader, "yotpo-hidden"), e.removeClass(this.lightboxImages[n], "yotpo-hidden"), this.lightboxNewDesign && P() && e.removeClass(this.lightboxImages[n].nextElementSibling, "yotpo-hidden"), _.call(this), b.call(this), q.call(this, "shown", i)
        }

        function u() {
            var t = this;
            document.body.style.overflow = "hidden", setTimeout(function () {
                e.addClass(t.modal, "yotpo-modal-active"), e.addClass(t.mask, "yotpo-active-display"), setTimeout(function () {
                    e.addClass(t.modalContainer, "yotpo-active-display")
                }, 100)
            }, 10), t.wrapperElement && document.body.appendChild(t.wrapperElement), w.call(this), C.call(this), e.addClass(t.lightboxContainer, "yotpo-hidden"), e.removeClass(t.loader, "yotpo-hidden")
        }

        function p(t, i) {
            this._controller.appKey;
            this.review = this.contentProvider.getContent(t);
            var n = this.lightboxContentContainer;
            for (this.lightboxNewDesign && P() && (n = i.parentElement.querySelector(".yotpo-lightbox-mobile-content")); n.hasChildNodes();) n.removeChild(n.lastChild);
            this.lightboxNewDesign && P() && e.addClass(n, "yotpo-hidden"), n.appendChild(this.review), this.lightboxNewDesign && T.call(this, n)
        }

        function g(e) {
            var t;
            switch (e) {
            case "prev":
                t = this.currImageIndex - 1, N > t && (t = this.numLightboxImages + N - 1);
                break;
            case "current":
                t = this.currImageIndex;
                break;
            case "next":
                t = this.currImageIndex + 1, t >= this.numLightboxImages + N && (t = N)
            }
            return this.lightboxImages[t]
        }

        function h(e) {
            for (var t, i = Object.keys(e), n = 0; n < i.length; n++) t = i[n], "video" == e[t].mediaType && m.call(this, e[t], t)
        }

        function m(e, t) {
            var i = g.call(this, t);
            this.videoPlayers[i.dataset.imageId] ? f.call(this, e, i) : y.call(this, e, i)
        }

        function f(e, t) {
            var i = t.dataset.imageId;
            e.kalturaPlayer = this.videoPlayers[i]
        }

        function y(t, i) {
            var n = i.dataset.imageId;
            i.id = "lightbox-" + n;
            var o = new e.Modules.KalturaManager(i, this._controller);
            o.initLightboxPlayer(), this.videoPlayers[n] = t.kalturaPlayer = o
        }

        function v(t) {
            e.Modules.Handle.popup.call(this.lightboxNewDesign && P() ? t.parentElement.querySelector(".yotpo-lightbox-mobile-content") : this.lightboxContentContainer)
        }

        function b() {
            this.rightArrow.style.display = this.leftArrow.style.display = 1 === this.numLightboxImages ? "none" : "block", this.lightboxNewDesign && P() && (this.arrows.style.top = this.lightboxImages[this.currImageIndex].clientHeight / 2 + "px")
        }

        function w() {
            this.rightArrow.style.display = this.leftArrow.style.display = "none"
        }

        function _() {
            var e = this;
            this.oldKeyDownFunction = document.onkeydown, document.onkeydown = function (t) {
                switch (t = t || window.event, t.keyCode) {
                case 27:
                    e.close();
                    break;
                case 37:
                    if (1 === e.numLightboxImages) break;
                    e.slide(Y.PREVIOUS_IMAGE);
                    break;
                case 39:
                    if (1 === e.numLightboxImages) break;
                    e.slide(Y.NEXT_IMAGE)
                }
            }
        }

        function S() {
            document.onkeydown = this.oldKeyDownFunction
        }

        function C() {
            var t, i, n = this._controller.getWidgetByName("Testimonials"),
                o = this._controller.getWidgetByName("Main");
            n && o && (t = n.getElement(), i = t.querySelector("#yotpo_testimonials_btn"), e.toggleClass(i, "only-invisible"), e.toggleClass(i, "yotpo-hidden"))
        }

        function k() {
            var e = this;
            this.mask.onclick = this.modalDialog.onclick = this.closeBtn.onclick = function () {
                e.close()
            }, this.leftArrow.onclick = function () {
                e.slide(Y.PREVIOUS_IMAGE)
            }, this.rightArrow.onclick = function () {
                e.slide(Y.NEXT_IMAGE)
            };
            for (var t = 0; t < this.lightboxImageContainers.length; ++t) this.lightboxImageContainers[t].onclick = function (e) {
                e && "undefined" != typeof e.stopPropagation && e.stopPropagation()
            };
            this.lightboxNewDesign && (this.lightbox.addEventListener("touchstart", function (t) {
                A.call(e, t)
            }, !1), this.lightbox.addEventListener("touchmove", function (t) {
                E.call(e, t)
            }, !1))
        }

        function A(e) {
            this.initialX = e.touches[0].clientX, this.initialY = e.touches[0].clientY
        }

        function E(e) {
            if (null !== this.initialX && null !== this.initialY) {
                var t = e.touches[0].clientX,
                    i = e.touches[0].clientY,
                    n = this.initialX - t,
                    o = this.initialY - i;
                Math.abs(n) > 2 * Math.abs(o) && Math.abs(n) > 50 && (this.slide(n > 0 ? Y.NEXT_IMAGE : Y.PREVIOUS_IMAGE), this.initialX = null, this.initialY = null, e.preventDefault())
            }
        }

        function x(e) {
            var t = this.lightboxContentContainer;
            this.lightboxNewDesign && P() && (t = e.parentElement.querySelector(".yotpo-lightbox-mobile-content"));
            var i = t.querySelector('.social-link[data-network="facebook"]');
            if (i) {
                var n, o = i.href.split("&picture")[0];
                n = o + "&picture=" + this.lightboxImages[this.currImageIndex].src, i.href = n
            }
        }

        function I() {
            this.lightboxImages = this.lightboxContainer.querySelectorAll(".yotpo-lightbox-image"), this.lightboxImageContainers = this.lightboxContainer.querySelectorAll(".yotpo-lightbox-image-container")
        }

        function T(t) {
            var i = t.getElementsByClassName("yotpo-instagram");
            if (i.length) {
                var n = i[0].getElementsByClassName("yotpo-loc");
                n.length && setTimeout(function () {
                    if (n[0].scrollHeight > n[0].clientHeight) {
                        var t = i[0].getElementsByClassName("show-more")[0],
                            o = i[0].getElementsByClassName("show-less")[0];
                        e.addClass(i[0], "collapse-text"), e.addEventListener(t, "click", function () {
                            e.addClass(i[0], "open-text")
                        }), e.addEventListener(o, "click", function () {
                            e.removeClass(i[0], "open-text")
                        })
                    }
                }, 10)
            }
        }

        function P() {
            return window.innerWidth < 1e3
        }

        function F() {
            this.currImageIndex = 0, this.lightbox = this.element, this.videoPlayers = {}, this.modalContainer = this.lightbox.getElementsByClassName("yotpo-lightbox-container")[0], this.lightboxContentContainer = this.lightbox.getElementsByClassName("yotpo-lightbox-content-container")[0], this.lightboxSliderContainer = this.lightbox.getElementsByClassName("yotpo-lightbox-slider-container")[0], this.lightboxContainer = this.lightbox.getElementsByClassName("y-slider-container")[0], I.call(this), this.closeBtn = this.lightbox.getElementsByClassName("yotpo-icon-btn-small")[0], this.modal = this.lightbox.getElementsByClassName("yotpo-modal")[0], this.modalDialog = this.modal.getElementsByClassName("yotpo-modal-dialog")[0], this.mask = this.modal.getElementsByClassName("yotpo-modal-mask")[0], this.loader = this.modal.getElementsByClassName("yotpo-image-loader-wrapper")[0], this.arrows = this.lightbox.getElementsByClassName("yotpo-lightbox-arrows")[0], this.leftArrow = this.lightbox.getElementsByClassName("yotpo-icon-left-arrow-thin")[0], this.rightArrow = this.lightbox.getElementsByClassName("yotpo-icon-right-arrow-thin")[0], this.body_overflow_style = document.body.style.overflow
        }

        function q(t, i) {
            var n = this.element.querySelector(".yotpo-lightbox-product-button"),
                o = n ? !e.isHidden(n) : !1,
                r = {
                    source: i.current.mediaSource,
                    media_id: i.current.imageId,
                    has_cta: o
                };
            this.analyticTracker.track(t, i.current.mediaType, null, r)
        }
        var M = 3,
            H = 1,
            L = 1,
            N = 2,
            Y = {
                NEXT_IMAGE: "next",
                PREVIOUS_IMAGE: "previous"
            };
        return t.prototype.open = function (t, i) {
            var o, r, p = [];
            this.isOpen = !0, this.isSliding = !1, r = this.contentProvider.getImages(t), this.numLightboxImages = r.length, this.singleImage = 1 == this.numLightboxImages, this.singleImage ? this.numImageContainers = 1 : (this.numImageContainers = this.numLightboxImages + N, this.numImageContainers < this.minImageContainers && (this.numImageContainers = this.minImageContainers)), this.slider = new e.Modules.Slide(this.lightboxContainer, {
                imageCount: this.numLightboxImages,
                displayWindowCount: H,
                animationDuration: 300
            }), this.slider.start();
            var g = t.getAttribute("data-image-id");
            for (o = 0; o < this.numLightboxImages; o++) {
                var m = r[o].getAttribute("data-original-src"),
                    f = r[o].getAttribute("data-image-id"),
                    y = r[o].getAttribute("data-external-image-id"),
                    v = r[o].getAttribute("data-media-type"),
                    b = r[o].getAttribute("data-source"),
                    w = {
                        url: m,
                        imageId: f,
                        externalImageId: y,
                        mediaType: v,
                        mediaSource: b
                    },
                    _ = r[o].getAttribute("data-entry-id");
                _ && (w.entryId = _), p.push(w), f === g && (this.currImageIndex = this.singleImage ? 0 : o + N, this.slider.setCurrentPosition(this.currImageIndex))
            }
            this.imagesInfo = p, i && l.call(this), this.numImageContainers > 1 && a.call(this), u.call(this);
            var S = n.call(this);
            h.call(this, S);
            var C = this;
            e.preloadImages([S.prev, S.current, S.next], function (e) {
                d.call(C, e, S)
            }, {
                index: C.currImageIndex,
                id: S.current.imageId
            }), currentImage = this.lightboxImages[this.currImageIndex], c.call(this, currentImage, S.current), s.call(this, t, currentImage), q.call(this, "loaded", S)
        }, t.prototype.close = function () {
            var t = this;
            if (this.isOpen) {
                this.isOpen = !1, o.call(this), e.removeClass(t.modalContainer, "yotpo-active-display"), document.body.style.overflow = t.body_overflow_style;
                for (var i = 0; i < t.numImageContainers; i++) t.lightboxImages[i].src = "#";
                setTimeout(function () {
                    e.removeClass(t.mask, "yotpo-active-display"), setTimeout(function () {
                        e.hasClass(t.mask, "yotpo-active-display") || e.hasClass(t.modalContainer, "yotpo-active-display") || (e.removeClass(t.modal, "yotpo-modal-active"), C.call(t), e.Modules.Event.trigger("popupClosed"))
                    }, 300)
                }, 300), S.call(this), t.wrapperElement && document.body.removeChild(t.wrapperElement)
            }
        }, t.prototype.slide = function (t) {
            if (!this.isSliding) {
                o.call(this), this.isSliding = !0, t == Y.NEXT_IMAGE ? (this.currImageIndex += 1, this.currImageIndex >= this.numLightboxImages + N && (this.currImageIndex = N)) : (this.currImageIndex += -1, this.currImageIndex < N && (this.currImageIndex = this.numLightboxImages + N - 1));
                var r;
                if ("image" == this.lightboxImages[this.currImageIndex].dataset.mediaType) {
                    var a = this.lightboxImages[this.currImageIndex].querySelector("source") || this.lightboxImages[this.currImageIndex];
                    currImageSrc = a.attributes.src.value, r = currImageSrc.length <= L
                } else r = !this.videoPlayers[this.lightboxImages[this.currImageIndex].dataset.imageId];
                r && (e.removeClass(this.loader, "yotpo-hidden"), e.addClass(this.lightboxImages[this.currImageIndex], "yotpo-hidden"));
                var l = n.call(this),
                    u = this.lightboxImages[this.currImageIndex];
                c.call(this, u, l.current), s.call(this, u, u), t == Y.NEXT_IMAGE ? (this.slider.right(), this.analyticTracker.track("clicked_on", "popup_next_image", null)) : (this.slider.left(), this.analyticTracker.track("clicked_on", "popup_previous_image", null));
                var p = this;
                h.call(this, l), e.preloadImages([l.prev, l.current, l.next], function (e) {
                    d.call(p, e, l)
                }, {
                    index: p.currImageIndex,
                    id: l.current.imageId
                }), setTimeout(function () {
                    p.isSliding = !1, i.call(p, u)
                }, 500)
            }
        }, t
    }(Yotpo), Yotpo.ReviewContentCreator = function (e) {
        var t = {
            getElement: function (t, i) {
                var n = t.cloneNode(!0);
                elements = n.querySelectorAll(".yotpo-review-images-wrapper, .yotpo-multiple-rating-fields, .yotpo-user-related-fields");
                for (var o = 0; o < elements.length; o++) elements[o].parentNode.removeChild(elements[o]);
                e.removeClass(n, "yotpo-regular-box");
                var r = e.Review.load(n, i);
                return r.setOriginalElement(t), n
            }
        };
        return t
    }(Yotpo), Yotpo.InstagramContentCreator = function (e) {
        var t = {
            getElement: function (t, i) {
                var n = t.cloneNode(!0);
                return e.InstagramPost.load(n, t, i), n
            }
        };
        return t
    }(Yotpo), Yotpo.ProductContentCreator = function (e) {
        function t(e) {
            this.contentCreator = e
        }

        function i(t, i, n) {
            var o = t.parentElement.querySelector(".yotpo-lightbox-products-container");
            if (o) {
                var r = o.cloneNode(!0);
                e.TaggedProducts.load(r, n);
                var s = document.createElement("div");
                return s.appendChild(r), s.appendChild(i), s
            }
            return i
        }
        return t.prototype.getElement = function (e, t) {
            var n = this.contentCreator.getElement(e, t);
            return i(e, n, t)
        }, t
    }(Yotpo), Yotpo.SingleReviewContentProvider = function (e) {
        function t() {
            this.reviewElement = null, this.analyticsCategory = "reviews"
        }
        return t.prototype.clear = function () {
            this.reviewElement = null
        }, t.prototype.getImages = function (e) {
            return e.parentNode.getElementsByClassName("image-review")
        }, t.prototype.getContent = function (t) {
            if (!this.reviewElement) {
                var i = e.Modules.Helper.findAncestorByClass(t, "yotpo-review");
                this.reviewElement = e.ReviewContentCreator.getElement(i, this.analyticsCategory)
            }
            return this.reviewElement
        }, t
    }(Yotpo), Yotpo.SliderContentProvider = function (e) {
        function t(t, i, n, o) {
            this.images = t, this.contents = i, this.analyticsCategory = o, this.reviewContentCreator = n ? new e.ProductContentCreator(e.ReviewContentCreator) : e.ReviewContentCreator, this.instagramContentCreator = n ? new e.ProductContentCreator(e.InstagramContentCreator) : e.InstagramContentCreator
        }

        function i(t, i, n, o, r) {
            var s = this,
                o = o || t.querySelector(i);
            o && e.addEventListener(o, "click", function () {
                e.currentAnalytics.trackEvent(s.analyticsCategory, "clicked_on", n, null, r)
            })
        }

        function n(e, t, n, o) {
            i.call(this, e, ".facebook", "share_facebook"), i.call(this, e, ".twitter", "share_twitter");
            for (var r = ".yotpo-lightbox-product", s = e.querySelectorAll(".yotpo-lightbox-product"), a = 0; a < s.length; a++) {
                var l = s[a],
                    c = l.getAttribute("data-product-id"),
                    d = {
                        product_id: c,
                        media_id: t,
                        source: n,
                        media_type: o
                    };
                i.call(this, null, null, "shop_now", l.querySelector(r + "-main-image"), d), i.call(this, null, null, "shop_now", l.querySelector(r + "-button"), d), i.call(this, null, null, "shop_now", l.querySelector(r + "-name"), d)
            }
        }
        return t.prototype.getImages = function () {
            return this.images
        }, t.prototype.getContent = function (e) {
            var t, i = e.getAttribute("data-image-id"),
                o = this.contents.querySelector(".yotpo-slider-content-" + i),
                r = o.getAttribute("data-source"),
                s = e.getAttribute("data-media-type");
            if ("review" === r) {
                var a = o.querySelector(".yotpo-review");
                t = this.reviewContentCreator.getElement(a, this.analyticsCategory)
            } else if ("instagram" === r) {
                var l = o.querySelector(".yotpo-instagram");
                t = this.instagramContentCreator.getElement(l, this.analyticsCategory)
            } else if ("onsite_upload" === r || "import" === r) {
                var c = o.querySelector(".yotpo-onsite-upload");
                t = this.instagramContentCreator.getElement(c, this.analyticsCategory)
            }
            return n.call(this, t, i, r, s), t
        }, t
    }(Yotpo), Yotpo.TaggedProducts = function (e) {
        function t(e, t) {
            this.element = e, this.analyticsCategory = t, o.call(this), i.call(this), n.call(this)
        }

        function i() {
            for (var t = this, i = 0; i < this.smallProducts.length; i++) e.addEventListener(this.smallProducts[i], "click", function () {
                t.changeProduct(this)
            })
        }

        function n() {
            var t = this;
            this.showMore && e.addEventListener(this.showMore, "click", function () {
                e.addClass(t.productsList, "show-all")
            }), this.showLess && e.addEventListener(this.showLess, "click", function () {
                e.removeClass(t.productsList, "show-all")
            })
        }

        function o() {
            this.smallProducts = this.element.querySelectorAll(".yotpo-lightbox-product-select-image"), this.selectedProduct = this.element.querySelector(".yotpo-lightbox-product-selected"), this.products = this.element.querySelectorAll(".yotpo-lightbox-product"), this.productsList = this.element.querySelector(".yotpo-lightbox-products-footer"), this.showMore = this.element.querySelector(".yotpo-lightbox-more-products .show-more"), this.showLess = this.element.querySelector(".yotpo-lightbox-more-products .show-less")
        }
        return t.load = function (t, i) {
            return new e.TaggedProducts(t, i)
        }, t.prototype.changeProduct = function (t) {
            e.removeClass(this.selectedProduct, "yotpo-lightbox-product-selected"), this.selectedProduct = t, e.addClass(this.selectedProduct, "yotpo-lightbox-product-selected");
            for (var i = this.selectedProduct.getAttribute("data-product-id"), n = 0; n < this.products.length; n++) this.products[n].getAttribute("data-product-id") === i ? e.removeClass(this.products[n], "yotpo-hidden") : e.addClass(this.products[n], "yotpo-hidden")
        }, t
    }(Yotpo), Yotpo.ImagesHandler = function (e) {
        function t(e, t) {
            this.imageWidget = t, this.appKey = e, this.loadedImagesOffest = 0
        }

        function i(e, t) {
            if (t.naturalHeight < y || t.naturalWidth < y) {
                var i = o.bind(this)(e);
                i && (t.naturalHeight < i.height || t.naturalWidth < i.width) && i.setAttribute("src", i.src.replace("low_resolution", "standard_resolution"))
            }
        }

        function n(t) {
            if (e.isIE10OrLess || e.isIE11)
                for (var i = this.imageWidget.element.querySelectorAll(h + "[" + g + "='" + t + "']"), n = 0; n < i.length; n++) {
                    var o = i[n].naturalHeight > i[n].naturalWidth ? "yotpo-image-tall" : "yotpo-image-wide";
                    e.addClass(i[n], o)
                }
        }

        function o(e) {
            return this.imageWidget.element.querySelector(h + "[" + g + "='" + e + "']")
        }

        function r(e) {
            return this.imageWidget.element.querySelector(v + "[" + g + "='" + e + "']")
        }

        function s(t) {
            var i = r.bind(this)(t);
            if (i) {
                var n = new e.Modules.KalturaManager(i, this.imageWidget._controller);
                n.loadThumbRotator()
            }
        }

        function a(t) {
            t.forEach(function (t) {
                e.Modules.KalturaManager.setElementThumbnailPlaceholder(t)
            }, this)
        }

        function l(e) {
            if (e) {
                if (e.querySelector(v)) return "video";
                if (e.querySelector(h)) return "image"
            }
            return -1
        }

        function c(e) {
            if (e) {
                if ("video" == l(e)) return e.querySelector(v);
                if ("image" == l(e)) return e.querySelector(h)
            }
            return null
        }

        function d(e) {
            var t = c(e);
            return t ? t.getAttribute(g) : -1
        }

        function u(t) {
            if (t) {
                if ("video" == l(t)) return e.Modules.KalturaManager.getThumbnailPlaceholderUrl(c(t));
                if ("image" == l(t)) return c(t)
                    .getAttribute("src")
            }
            return null
        }

        function p(e, t) {
            for (var i = 0; i < e.length; i++)
                if (e[i].id === t) return !0;
            return !1
        }
        var g = "data-image-id",
            h = ".yotpo-image",
            m = ".y-image-overlay",
            f = "data-original-src",
            y = 320,
            v = ".yotpo-video";
        return t.prototype.reportInvalidImages = function (t) {
            for (var i = [], n = 0; n < t.length; n++)
                if (t[n].reported !== !0) {
                    t[n].reported = !0;
                    var o = t[n].source;
                    i.indexOf(t[n].id) < 0 && "instagram" === o && i.push(t[n].id)
                } if (i.length > 0) {
                var r = .2,
                    s = t.length > this.imageWidget.getImageElements()
                    .length * r;
                e.reportBrokenImages(this.appKey, i, "media", s)
            }
        }, t.prototype.removeBrokenImages = function (t) {
            for (var i = this.imageWidget.getImageElements(), n = 0; n < i.length; n++) {
                var o = d(i[n]);
                t.indexOf(o) > -1 && e.remove(i[n])
            }
        }, t.prototype.replaceBrokenImages = function (t) {
            for (var i = this.imageWidget.getImageElements(), n = e.getDefualtImage(), o = 0; o < i.length; o++) {
                var r = d(i[o]);
                if (p(t, r)) {
                    var s = i[o].querySelector(v);
                    if (s) s.style.background = "url(" + n.size_180 + ") 0px center", s.style.backgroundSize = "cover";
                    else {
                        var a = i[o].querySelector(h);
                        a && a.setAttribute("src", n.size_180)
                    }
                    var l = i[o].querySelector(m);
                    l.setAttribute(f, n.size_656)
                }
            }
        }, t.prototype.getImageSource = function (e) {
            var t = null,
                i = this.imageWidget.element.querySelector('.yotpo-single-image-container [data-image-id="' + e + '"]');
            if (i) {
                var n = i.parentElement.querySelector(".y-image-overlay");
                t = n.getAttribute("data-source")
            }
            return t
        }, t.prototype.loadImages = function (t, i, n) {
            for (var o, r = this.imageWidget.getImageElements(), s = [], c = [], p = this.loadedImagesOffest; p < r.length; p++) {
                var g = u(r[p]),
                    h = d(r[p]),
                    m = l(r[p]),
                    f = r[p].querySelector(".yotpo-video");
                f && (c.push(f), o = !0), s.push({
                    url: g,
                    imageId: h,
                    mediaType: m
                })
            }
            o && a.call(this, c), this.loadedImagesOffest = r.length, e.preloadImages(s, t, this.imageWidget, i, this.imageWidget, n)
        }, t.prototype.handleMediaAfterLoad = function (e, t) {
            i.call(this, e, t), n.call(this, e, t), s.call(this, e)
        }, t
    }(Yotpo), Yotpo.ImagesAnalyticsHandler = function (e) {
        function t(t, i) {
            this.element = t, this.tracker = i, this.bindedImagesOffest = 0, o.call(this), i.track("loaded"), e.currentInview.register(this.element, function () {
                i.track("shown", null, null)
            }), e.hoverAnalytics.register(self.element, function () {
                e.currentAnalytics.trackUniqueEvent(self.analyticsCategory, "hovered", null, null, self.analyticsContext)
            })
        }

        function i(e) {
            var t = e.querySelector(".y-image-overlay"),
                i = t ? t.getAttribute("data-source") : "unkown",
                n = t ? t.getAttribute("data-image-id") : "unkown";
            return {
                source: i,
                media_id: n
            }
        }

        function n(e) {
            return e.getElementsByClassName("yotpo-image")
                .length > 0 ? "image" : "video"
        }

        function o() {
            this.tracker.eventContext.has_video = this.element.getElementsByClassName("yotpo-video")
                .length > 0
        }
        return t.prototype.bindImageElementAnalytics = function (t) {
            var o = this,
                r = n(t);
            e.currentInview.register(t, function (e) {
                return function () {
                    o.tracker.track("shown", r, null, i(e))
                }
            }(t)), e.addEventListener(t, "click", function () {
                o.tracker.track("clicked_on", r, null, i(t))
            }), e.hoverAnalytics.register(t, function () {
                o.tracker.track("hovered", r, null, i(t))
            })
        }, t.prototype.bindAnalyticsForloadedImages = function (e) {
            o.call(this);
            for (var t = this.bindedImagesOffest; t < e.length; t++) this.bindImageElementAnalytics(e[t]);
            this.bindedImagesOffest = e.length
        }, t
    }(Yotpo), Yotpo.AnalyticsTracker = function (e) {
        function t(e, t) {
            this.category = e, this.eventContext = t
        }
        return t.prototype.track = function (t, i, n, o) {
            var r = o ? Object.assign(o, this.eventContext) : this.eventContext;
            e.currentAnalytics.trackEvent(this.category, t, i, n, r)
        }, t
    }(Yotpo), Yotpo.ShoppableProductsSlider = function (e) {
        function t(t, i, n) {
            this._controller = t, this.element = n, this.titleElement = document.createElement("div"), e.addClass(this.titleElement, "yotpo-shoppable-tagged-products-title"), this.element.appendChild(this.titleElement), this.productsElement = document.createElement("div"), e.addClass(this.productsElement, "yotpo-shoppable-products-elements"), this.element.appendChild(this.productsElement), this.analyticsTracker = i, r.call(this)
        }

        function i(t) {
            this.mobileSlider = new e.Modules.MobileSlide(this.productsElement, t || {})
        }

        function n(t, n, r, a) {
            var l = [{
                method: "promoted_products",
                params: {
                    domain_key: t[0].domainKey,
                    widget: "shoppable_instagram"
                },
                format: "json"
            }];
            this.currentOpenViewImageId = n, this._controller.getBatch(function (l) {
                if (this.currentOpenViewImageId === n) {
                    this.currentOpenViewImageId = null;
                    var c = JSON.parse(l);
                    c = c[0].result;
                    for (var u = [], p = 0; p < c.promoted_products.length; p++) o(t, c.promoted_products[p].products_app_id) || u.push({
                        id: c.promoted_products[p].products_app_id,
                        name: c.promoted_products[p].name,
                        link: c.promoted_products[p].url,
                        imageUrl: c.promoted_products[p].image,
                        score: c.promoted_products[p].average_score,
                        reviewsCount: c.promoted_products[p].total_review
                    });
                    u.length > 0 && (e.removeClass(this.element, "yotpo-hidden"), s.call(this, u, r, a, !0), i.call(this, {
                        separatorSize: 20,
                        separatorClass: d
                    }), t.length > 1 ? this.titleElement.innerHTML += " and related products" : this.titleElement.innerHTML = "Related products")
                }
            }.bind(this), l)
        }

        function o(e, t) {
            for (var i = 0; i < e.length; i++)
                if (t == e[i].id) return !0
        }

        function r() {
            var t = document.createElement("div");
            e.addClass(t, "yotpo-mobile-slides-container"), this.mobileSliderElement = document.createElement("div"), e.addClass(this.mobileSliderElement, "yotpo-mobile-slider"), this.mobileSliderElement.appendChild(t), this.productsElement.appendChild(this.mobileSliderElement)
        }

        function s(t, i, n, o) {
            for (var r = this.mobileSliderElement.querySelector(".yotpo-mobile-slides-container"), s = 0; s < t.length; s++) {
                var l = a.call(this, t[s], i, n);
                r.appendChild(l), o && 0 == s && e.addClass(l, d)
            }
        }

        function a(t, i, n) {
            var o = this,
                r = document.createElement("span");
            e.addClass(r, "yotpo-mobile-slide"), e.addClass(r, "yotpo-shoppable-product");
            var s = document.createElement("a");
            s.href = t.link, e.addEventListener(s, "click", function () {
                o.analyticsTracker.track("clicked_on", "shop_now")
            });
            var a = document.createElement("img");
            a.src = t.imageUrl, e.addClass(a, "yotpo-shoppable-product-image"), s.appendChild(a);
            var d = document.createElement("div");
            if (d.innerHTML = t.name, e.addClass(d, "yotpo-shoppable-product-name"), s.appendChild(d), i) {
                var u = l(t.score, t.reviewsCount);
                s.appendChild(u)
            }
            if (n) {
                var p = c(n);
                s.appendChild(p)
            }
            return r.appendChild(s), r
        }

        function l(t, i) {
            var n = document.createElement("div");
            e.addClass(n, "yotpo-shoppable-gallery-header-reviews-stars");
            var o = e.getStars(t);
            i || (i = 0);
            var r = document.createElement("span");
            return e.addClass(r, "yotpo-shoppable-product-reviews-count"), r.innerHTML = "(" + i + ")", o.appendChild(r), n.appendChild(o), n
        }

        function c(t) {
            var i = document.createElement("button");
            return e.addClass(i, "yotpo-shoppable-product-button"), i.innerHTML = t, i
        }
        var d = "yotpo-shoppable-separator";
        return t.prototype.adjustSize = function () {
            this.mobileSlider.adjustSize()
        }, t.prototype.showElement = function (t, o, r, a, l) {
            return this.titleElement.innerHTML = "", t.length > 1 ? (e.removeClass(this.element, "yotpo-hidden"), this.titleElement.innerHTML = "Tagged products", s.call(this, t, o, r), i.call(this)) : e.addClass(this.element, "yotpo-hidden"), a && n.call(this, t, l, o, r), this.element
        }, t.prototype.destroy = function () {
            for (var e = this.element; e.hasChildNodes();) e.removeChild(e.firstChild);
            this.mobileSlider && this.mobileSlider.destroy()
        }, t
    }(Yotpo), Yotpo.SuggestedTopics = function (e) {
        function t(t, i) {
            for (var n = t.getElementsByClassName("suggested-topic"), o = t.getElementsByClassName("suggested-topics-row"), r = null, s = null, a = null, l = null, c = 0; c < n.length; c++) e.addEventListener(n[c], "click", function () {
                if (r = t.querySelector(".active-topic"), null !== r) {
                    var n = r.querySelector(".suggested-topic-text");
                    n && (s = n.innerHTML.trim()), e.removeClass(r, "active-topic")
                }
                l = this === r, l ? a = null : (a = this.querySelector(".suggested-topic-text")
                    .innerHTML.trim(), e.addClass(this, "active-topic")), i(s, a)
            });
            var d = t.querySelector(".suggested-topic-expand");
            d && e.addEventListener(d, "click", function () {
                for (var t = 0; t < n.length; t++) e.removeClass(n[t], "yotpo-hidden");
                for (var t = 0; t < o.length; t++) e.removeClass(o[t], "yotpo-hidden");
                e.addClass(this, "yotpo-hidden")
            })
        }
        var i = {};
        return i.bind = function (e, i) {
            for (var n = 0; n < e.length; n++) t(e[n], i)
        }, i.resetSelectedTopic = function (t) {
            for (var i = 0; i < t.length; i++) e.removeClass(t[i], "active-topic")
        }, i
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.CollapsibleElement = function (e) {
        function t(e, t, i) {
            var n = e.getAttribute("yotpo-content-collapsed");
            if (null !== n) return !1;
            var o = e.getElementsByClassName(i)[0],
                r = o.innerHTML;
            return r.length > t
        }

        function i(t, i, o) {
            var r = t.getElementsByClassName(o)[0],
                s = r.innerHTML,
                a = s.substr(i - 10, 20),
                l = a.search(/(<[^>]*>)/);
            i = l > 0 ? i - 10 + l : i;
            var c = s.substring(0, i) + "<span class='yotpo-read-more' data-position='closed' aria-expanded=false role='button' tabindex='0' aria-label=" + e.texts.ada_read_more + ">..." + e.texts.read_more + "</span>",
                d = '<p class="rest-content-collapsed">' + s.substring(i) + "<span class='yotpo-read-more' data-position='opened' aria-expanded=true role='button' tabindex='0' aria-label=" + e.texts.ada_read_more + ">" + e.texts.read_less + "</span></p>";
            return r.innerHTML = t.classList.contains("yotpo-review") ? n(s, c, d, i) : c + d, !0
        }

        function n(t, i, n, o) {
            var r = t.substring(0, o),
                s = /<span class="[^"]*?highlight-text[^"]*?">(.*?)/g,
                a = /<\/span>/g,
                l = (r.match(s) || [])
                .length,
                c = (r.match(a) || [])
                .length;
            return l > c && (i = t.substring(0, o) + "</span><span class='yotpo-read-more' data-position='closed' aria-expanded=false role='button' aria-label=" + e.texts.ada_read_more + ">..." + e.texts.read_more + "</span>", n = '<p class="rest-content-collapsed"><span class="highlight-text">' + t.substring(o) + "<span class='yotpo-read-more' data-position='opened' aria-expanded=true role='button'  aria-label=" + e.texts.ada_read_more + ">" + e.texts.read_less + "</span></p>"), i + n
        }

        function o(t, i) {
            var n = t.getElementsByClassName("rest-content-collapsed")[0],
                o = t.getElementsByClassName("yotpo-read-more"),
                r = !1;
            "function" == typeof i && (r = !0);
            for (var s = 0; s < o.length; ++s) o[s].onclick = function () {
                if ("closed" == this.getAttribute("data-position")) this.style.display = "none", e.Animations.fadeIn(n, "1000"), r && i();
                else {
                    var t = this.parentNode.parentNode.querySelector(".yotpo-read-more[data-position=closed]");
                    e.Animations.fadeOut(n, "500"), setTimeout(function () {
                        t.style.display = "inline"
                    }, 500)
                }
            }
        }
        var r = {};
        return r.bind = function (e, n, r, s) {
            t(e, n, r) && (i(e, n, r), o(e, s), e.setAttribute("yotpo-content-collapsed", !0))
        }, r
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.DynamicLayout = function (e) {
        function t(t, r) {
            this.elementsContainer = t, this.settings = r, i.call(this), e.isMobile() ? n.call(this) : o.call(this), r.animation && s.call(this)
        }

        function i() {
            this.clickableElements = this.elementsContainer.querySelectorAll(this.settings.clickable_elements_selector || a), this.expandableElementContainer = this.elementsContainer.querySelector(this.settings.expandable_element_container_selector || l)
        }

        function n() {
            this.mobileSlider = new e.Modules.MobileSlide(this.elementsContainer, {
                slidesSelector: this.settings.clickable_elements_selector || a,
                fixedSlideWidth: this.settings.mobile_slides_fixed_width || d
            })
        }

        function o() {
            this.expandableElementContainer && (this.expandableElementContainer.onclick = r.bind(this))
        }

        function r() {
            for (var t = 0; t < this.clickableElements.length; t++) e.removeClass(this.clickableElements[t], "yotpo-hidden");
            e.addClass(this.expandableElementContainer, "yotpo-hidden")
        }

        function s() {
            for (var e = 0; e < this.clickableElements.length; e++) this.clickableElements[e].complete ? (this.clickableElements[e].style.transition = "opacity 1s", this.clickableElements[e].style.opacity = "1") : this.clickableElements[e].onload = function () {
                this.style.transition = "opacity 1s", this.style.opacity = "1"
            };
            if (this.expandableElementContainer) {
                var t = this.expandableElementContainer.querySelector(this.settings.expandable_element_selector || c);
                t.onload = function () {
                    this.style.transition = "opacity 1s", this.style.opacity = "0.8"
                }
            }
        }
        var a = ".image-review",
            l = ".expandable-image-container",
            c = ".expandable-image",
            d = 80;
        return t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.ButtonEndlessScroll = function (e) {
        function t(t, i, n, o, r) {
            var s = EndlessScroll(e);
            return new s(t, i, n, o, !0, r)
        }
        return t
    }(Yotpo), Yotpo.Modules.InviewEndlessScroll = function (e) {
        function t(t, i, n, o) {
            var r = EndlessScroll(e);
            return new r(t, i, n, o, !1)
        }
        return t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Event = function (e) {
        var t = {};
        return t.on = function (e, t) {
            this.callbacks = this.callbacks || {}, this.callbacks[e] = this.callbacks[e] || [], this.callbacks[e].push(t)
        }, t.trigger = function (t, i, n) {
            var o = this;
            e.forEach(o.callbacks && o.callbacks[t] || [], function (e) {
                e.call(o, i, n)
            })
        }, t.removeEvent = function (e) {
            var t = this;
            t.callbacks[e] && delete t.callbacks[e]
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.GallerySettings = function (e) {
        function t() {}

        function i(e, t) {
            t.use_div_settings = e.hasAttribute("data-source") || e.classList.contains("yotpo-pictures-widget")
        }

        function n(e, t) {
            var i = e.getAttribute("data-album-id");
            i && (t.album_id = i, t.sorting_enabled = !1)
        }

        function o(e, t) {
            t.source = e.getAttribute("data-source") || t.source, "all" === t.source && (t.source = ["yotpo_reviews", "instagram", "onsite_upload", "import"]), t.sort = e.getAttribute("data-sort") || t.sort
        }

        function r(e, t) {
            t.title = t.title || {}, t.title.show_title = e.getAttribute("data-title") ? "1" === e.getAttribute("data-title") : t.title.show_title, t.title.text = e.getAttribute("data-title-text") || t.title.text, t.title.color = e.getAttribute("data-title-color") || t.title.color, t.title.alignment = e.getAttribute("data-title-alignment") || t.title.alignment, t.title.font_size = (e.getAttribute("data-title-font-size") || t.title.font_size) + "px", t.title.mobile_font_size = (e.getAttribute("data-title-mobile-font-size") || t.title.mobile_font_size) + "px"
        }

        function s(e, t) {
            t.button = {}, t.button.show_button = e.getAttribute("data-upload-button") ? "1" === e.getAttribute("data-upload-button") : !1, t.button.button_text = e.getAttribute("data-upload-button-text"), t.button.text_color = e.getAttribute("data-upload-button-text-color"), t.button.background_color = e.getAttribute("data-upload-button-background-color"), t.button.font_family = e.getAttribute("data-upload-button-font-family"), t.title.alignment = !t.title.alignment || !t.title.show_title && t.button.show_button ? "left" : t.title.alignment, t.button.alignment = "right" === t.title.alignment.toLowerCase() ? "left" : "left" === t.title.alignment.toLowerCase() ? "right" : "center"
        }

        function a(e, t) {
            t.hover = t.hover || {}, t.hover.background_color = e.getAttribute("data-hover-color") || t.hover.background_color, t.hover.opacity = e.getAttribute("data-hover-opacity") || t.hover.opacity, t.hover.show_icon = e.getAttribute("data-hover-icon") ? "true" === e.getAttribute("data-hover-icon") : t.hover.show_icon
        }

        function l(e, t) {
            t.cta = e.getAttribute("data-cta") || t.cta || "1", t.cta_text = e.getAttribute("data-cta-text") || t.cta_text, t.cta_color = e.getAttribute("data-cta-color") || t.cta_color
        }

        function c(e, t) {
            t.use_full_width = e.getAttribute("data-full-width") ? "1" === e.getAttribute("data-full-width") : t.use_full_width, t.auto_play = e.getAttribute("data-auto-slide") ? "1" === e.getAttribute("data-auto-slide") : t.auto_play, t.per_page = e.getAttribute("data-number-of-images") || t.per_page, t.spacing = e.getAttribute("data-spacing") || t.spacing, t.rounded_corners = "1" === String(t.spacing) ? "3px" : "0", t.layout_settings = t.layout_settings || {}, t.layout_settings.mode = e.getAttribute("data-layout") || t.layout_settings.mode, e.getAttribute("data-layout-rows") && (t.layout_settings.rows = e.getAttribute("data-layout-rows"), t.layout_settings.mode = "num_of_rows"), e.getAttribute("data-layout-scroll") && (t.layout_settings.load_more_button = "1" === e.getAttribute("data-layout-scroll") ? 0 : 1)
        }

        function d(e, t) {
            t.load_lightbox_sync = e.getAttribute("data-preview") ? "true" === e.getAttribute("data-preview") : !1, t.is_preview = "true" === e.getAttribute("data-preview"), t.is_css_editor = "true" === e.getAttribute("data-css-editor"), t.is_preview && (t.timestamp = Date.now())
        }
        return t.prototype.overrideSettingsFromDiv = function (e, t) {
            i(e, t), o(e, t), r(e, t), a(e, t), l(e, t), c(e, t), d(e, t), n(e, t), s(e, t)
        }, t.prototype.getDivSettings = function (e) {
            var t = {};
            return t.album_id = e.getAttribute("data-album-id"), t.layout_type = e.getAttribute("data-layout-type"), t.lightbox = {
                cta_text: e.getAttribute("data-cta-text"),
                cta_color: e.getAttribute("data-cta-color")
            }, t.title = {
                text: e.getAttribute("data-title-text"),
                color: e.getAttribute("data-title-color"),
                alignment: e.getAttribute("data-title-alignment"),
                font_size: e.getAttribute("data-title-font-size"),
                mobile_font_size: e.getAttribute("data-title-mobile-font-size")
            }, t.title.show_title = e.getAttribute("data-title") && "1" === e.getAttribute("data-title"), t.upload_button = {
                show_button: e.getAttribute("data-upload-button") && "true" === e.getAttribute("data-upload-button"),
                button_text: e.getAttribute("data-upload-button-text"),
                text_color: e.getAttribute("data-upload-button-text-color"),
                background_color: e.getAttribute("data-upload-button-background-color"),
                font_family: e.getAttribute("data-upload-button-font-family")
            }, t.title.alignment && (t.button = {
                alignment: "right" === t.title.alignment.toLowerCase() ? "left" : "left" === t.title.alignment.toLowerCase() ? "right" : "center"
            }), t.hover = {
                background_color: e.getAttribute("data-hover-color"),
                opacity: e.getAttribute("data-hover-opacity"),
                show_icon: e.getAttribute("data-hover-icon") ? "true" === e.getAttribute("data-hover-icon") : void 0
            }, t.use_full_width = e.getAttribute("data-full-width") ? "1" === e.getAttribute("data-full-width") : t.use_full_width, t.layout = {
                show_more: e.getAttribute("data-layout-show-more"),
                spacing: e.getAttribute("data-spacing")
            }, e.getAttribute("data-auto-slide") && (t.layout.auto_slide = "1" === e.getAttribute("data-auto-slide")), e.getAttribute("data-layout-rows") && (t.layout.rows = e.getAttribute("data-layout-rows")), e.getAttribute("data-images-per-row") && (t.layout.images_per_row = e.getAttribute("data-images-per-row")), t.rounded_corners = "1" === String(t.spacing) ? "3px" : "0", d(e, t), t
        }, t.prototype.getGallerySettings = function (t) {
            var i = t.querySelector("#generic_gallery_settings");
            if (!i) return null;
            try {
                var n = JSON.parse(i.innerHTML);
                return n.gallery_id = i.dataset.galleryId, n
            } catch (o) {
                return e.safeConsole("Failed to parse gallery settings: " + o, "error"), null
            }
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Handle = function (e) {
        var t = {};
        return t.write = function (t) {
            function i(t, i, n, o, r, s, a, l, c) {
                t.push({
                    type: n,
                    initiators: t[0].affected.querySelectorAll(i),
                    action: function () {
                        if (("function" != typeof l || l()) && (e.currentAnalytics.trackEvent(o, r, s, c), 1 == a))
                            for (var t, i = 0; t = this.initiators[i]; ++i) e.removeEventListener(t, this.type, this.handler)
                    }
                })
            }

            function n(e) {
                for (var t = 0; t < r.length; t++)
                    if (r[t].name == e) return r[t]
            }
            var o = this,
                r = [],
                s = o.element.getElementsByClassName("write-" + t + "-wrapper")[0];
            if (s) {
                var a = t + "s";
                "reviews" == a && (a = o.analyticsCategory);
                var l = o._controller.getUserSetting("vendor_review_creation") ? o._controller.getUserSetting("vendor_review_creation")
                    .settings : null,
                    c = !1;
                if (l && (c = function () {
                        return 0 != Object.keys(o._controller.getTrustedVendorsData())
                            .length
                    }), o.forms = o.forms || {}, o.forms[t + "s"] = new e.Form(o, s), r.push({
                        name: "show_resource_content_field",
                        type: "click",
                        initiators: o.element.getElementsByClassName("write-" + t + "-button"),
                        affected: s,
                        validate: null != l,
                        skipAnimation: function () {
                            return l && "1" == l.require_external_sign_in && "review" == t && 0 == Object.keys(o._controller.getTrustedVendorsData())
                                .length
                        },
                        effect: "slideDown",
                        action: function () {
                            o.get("messages")
                                .hideAll();
                            var i = o.get("tabs")
                                .getTab(t + "s");
                            i && e.simulateClickEvent(i);
                            var n = o.forms[t + "s"];
                            if (!n.visible()) {
                                n.trigger("opened"), e.currentAnalytics.trackEvent(a, "clicked_on", "write");
                                var r = this.affected.querySelector(".form-group")
                                    .getAttribute("data-custom-form-id");
                                r && e.currentAnalytics.trackEvent(a, "shown", "custom_form", r)
                            }
                        }
                    }), r[0].affected) {
                    r.push({
                        name: "show_name_input_field",
                        type: ["keyup", "paste"],
                        initiators: r[0].affected.querySelectorAll(".write-" + t + "-content .form-element .y-input"),
                        affected: r[0].affected.getElementsByClassName("yotpo-footer")[0],
                        skipAnimation: function () {
                            return l && !("1" == l.show_name_field)
                        },
                        effect: "fadeIn",
                        action: function () {
                            if (l) {
                                var e = o._controller.getTrustedVendorsData(),
                                    i = o.forms[t + "s"],
                                    r = i.getInputField("display_name");
                                if (e.display_name && "" == r.value && i.setInputField("display_name", e.display_name), Object.keys(e)
                                    .length > 0 || "function" == typeof i.writeContentCallback) {
                                    var s = n("enable_form_submit");
                                    s && s.handler()
                                }
                            }
                        }
                    }), r.push({
                        name: "show_social_sign_in",
                        type: ["keyup", "paste"],
                        initiators: r[1].initiators,
                        affected: r[1].affected.getElementsByClassName("socialize-wrapper")[0],
                        skipAnimation: c,
                        effect: "fadeIn"
                    }), r.push({
                        name: "show_email_input_field",
                        type: ["keyup", "paste"],
                        initiators: r[1].affected ? r[1].affected.getElementsByClassName("name-input") : [],
                        affected: r[1].affected ? r[1].affected.getElementsByClassName("email-input")[0] : [],
                        effect: "fadeIn",
                        skipAnimation: c,
                        action: function () {
                            o.forms[t + "s"].submitButton.style.marginTop = "15px"
                        }
                    });
                    var d = r.length - 1,
                        u = o._controller.getUserSetting("css_preview");
                    "undefined" != typeof u && u || r.push({
                        name: "enable_form_submit",
                        type: ["keyup", "paste"],
                        initiators: [r[d].affected],
                        affected: null,
                        action: function () {
                            o.forms[t + "s"].activate()
                        }
                    }), i(r, ".write-review .y-input[name=review_title]", "click", a, "clicked_on", "title_field", !1), i(r, ".write-review .y-input[name=review_title]", "keydown", a, "typed", "title_field", !0), i(r, ".write-review .y-input[name=review_content]", "click", a, "clicked_on", "body_field", !1), i(r, ".write-review .y-input[name=review_content]", "keydown", a, "typed", "body_field", !0), i(r, ".write-review .y-input[name=display_name]", "click", a, "clicked_on", "name_field", !1), i(r, ".write-review .y-input[name=display_name]", "keydown", a, "typed", "name_field", !0), i(r, ".write-review .y-input[name=email]", "click", a, "clicked_on", "email_field", !1), i(r, ".write-review .y-input[name=email]", "keydown", a, "typed", "email_field", !0), i(r, ".yotpo-submit", "click", a, "clicked_on", "post_button", !0), i(r, ".write-review .y-input[name=content]", "click", a, "clicked_on", "name_field", !1);
                    var p = function () {
                        return l && Object.keys(o._controller.getTrustedVendorsData())
                            .length > 0
                    };
                    i(r, ".yotpo-submit", "click", a, "clicked_on", "post_button", !0, p, "verified")
                }
                e.forEach(r, function (t) {
                    for (var i = 0; i < t.initiators.length; ++i) t.handler = function (i) {
                        return function () {
                            if (t.validate && "function" == typeof o.writeContentCallback && 0 === Object.keys(o._controller.getTrustedVendorsData())
                                .length) return void o.writeContentCallback(this);
                            "function" == typeof t.action && t.action.call(t, this);
                            var n = t.skipAnimation ? t.skipAnimation() : !1;
                            n || !i || e.hasClass(i, "visible") && "toggleSlide" != t.effect || (e.toggleClass(i, "visible"), t.effect && (e.Animations[t.effect](i), e.hasClass(o.getElement(), "testimonials") && e.scrollTo(o.getElement()
                                .querySelectorAll(".yotpo-modal-body")[0], 0, 1300)))
                        }
                    }(t.affected), t.type instanceof Array || (t.type = [t.type]), e.forEach(t.type, function (n) {
                        e.addEventListener(t.initiators[i], n, t.handler)
                    })
                })
            }
        }, t.action = function () {
            for (var t = this.querySelectorAll(".yotpo-action[data-type]"), i = 0; i < t.length; ++i) t[i].onclick = function () {
                e.bindAnimation(this)
            }
        }, t.tooltip = function () {
            for (var t = this.querySelectorAll(".yotpo-action-hover[data-type]"), i = 0; i < t.length; ++i) t[i].onmouseover = function () {
                e.bindAnimation(this, "fadeIn")
            }, t[i].onmouseout = function () {
                e.bindAnimation(this, "fadeOut")
            }
        }, t.sources = function () {
            var t = this,
                i = t.get("sources");
            for (var n in i) i.hasOwnProperty(n) && "function" == typeof i[n].getType && i[n].on("updated", function (i) {
                return function () {
                    var n = i.getType(),
                        o = t.get("messages");
                    if (i.getTemplate()) {
                        t.get("forms")[n].clean(), o.show("share");
                        var r = n.substring(0, n.length - 1),
                            s = t.getElement()
                            .querySelector(".write-" + r + "-button"),
                            a = t.getElement()
                            .querySelector(".yotpo-first-" + r);
                        a && (e.removeClass(s, "yotpo-hidden"), e.addClass(a, "yotpo-hidden"))
                    }
                    e.Modules.Handle.popup.call(i)
                }
            }(i[n]));
            for (var o, r = t.element.querySelectorAll(".yotpo-icon-yotpo-logo"), s = 0; o = r[s]; s++) e.addEventListener(o, "click", function () {
                e.currentAnalytics.trackEvent(t.analyticsCategory, "clicked_on", "widget_branding_link")
            })
        }, t.desktopDropDown = function (t, i, n) {
            var o = this;
            void 0 === o.filtersDropDowns && (o.filtersDropDowns = []);
            for (var r = i.getElementsByClassName(n), s = 0; s < r.length; ++s) {
                var a = new e.Select(r[s]);
                a.defaultAnswerItem = a.element.querySelector("[data-is-default-answer=true]"), a.currentSelectedItem = a.element.querySelector('li[data-value="' + a.element.getAttribute("data-value") + '"]'), o.filtersDropDowns.push(a), a.on("change", function (e) {
                    if (this.previousSelectedItem = this.currentSelectedItem, !this.previousSelectedItem) {
                        var i = this.getElement()
                            .querySelector(".selected-item");
                        i && (this.previousSelectedItem = i.parentElement)
                    }
                    this.currentSelectedItem = e.element, t.call(o, this.element, this.currentSelectedItem, this.previousSelectedItem)
                })
            }
        }, t.select = function () {
            for (var t = this, i = t.getElement()
                    .getElementsByClassName("yotpo-nav-dropdown"), n = 0; n < i.length; ++n) {
                var o = new e.Select(i[n]);
                o.on("change", function (i) {
                    return function () {
                        for (var n = t.getActiveSource(), o = i.getType()
                                .split(" "), r = i.getValue()
                                .split(" "), s = 0; s < o.length; ++s) n.settings[o[s]] = r[s];
                        n.settings[i.getType()] = i.getValue()
                            .split(","), n.settings.page = 1, n.refresh(), e.togglePreLoader(n.getElement())
                    }
                }(o))
            }
        }, t.mobileMenu = function () {
            var t = this.getElement()
                .getElementsByClassName("yotpo-visible-mobile")[0];
            if (t) {
                var i = t.parentNode.getElementsByClassName("yotpo-menu-mobile-collapse");
                e.addEventListener(t, "click", function () {
                    for (var t = 0; t < i.length; ++t) e.Animations.toggleSlide(i[t])
                })
            }
        }, t.popup = function () {
            for (var t = this, i = "function" == typeof t.getElement ? t.getElement() : t, n = i.getElementsByClassName("popup-link"), o = 0; o < n.length; ++o) {
                var r = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                    s = void 0 != window.screenTop ? window.screenTop : screen.top,
                    a = {
                        height: parseInt(n[o].getAttribute("data_height") || 400),
                        width: parseInt(n[o].getAttribute("data_width") || 580),
                        top: parseInt(n[o].getAttribute("data_top") || 200),
                        left: parseInt(n[o].getAttribute("data_left") || 400)
                    },
                    l = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    c = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
                a.left = l / 2 - a.width / 2 + r, a.top = c / 2 - a.height / 2 + s, n[o].onclick = function (t) {
                    return function () {
                        for (var i = "", n = this.className.split(" "), o = 0; o < n.length; o++)("yotpo-custom-badge-link" === n[o] || "yotpo-toa-link" === n[o]) && (i += n[o]);
                        if (i) {
                            var r = e.globals[i];
                            (!r || r.closed) && (r = e.globals[i] = window.open(this.href, "", "status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=yes,resizeable=yes,height=" + t.height + ",width=" + t.width + ",top=" + t.top + ",left=" + t.left)), window.focus && r.focus()
                        } else window.open(this.href, "", "status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=yes,resizeable=yes,height=" + t.height + ",width=" + t.width + ",top=" + t.top + ",left=" + t.left);
                        return !1
                    }
                }(a)
            }
        }, t.semiWhiteLabel = function () {
            var e = this.getElement()
                .querySelector(".yotpo-semi-label");
            e && t.tooltip.call(e)
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Helper = function (e) {
        var t = {},
            i = {
                initialized: function () {
                    return this.getElement()
                        .getElementsByClassName("yotpo-display-wrapper")
                        .length > 0
                }
            };
        return t.state = function (e) {
            return "undefined" != typeof e && (this._state = e), this._state
        }, t.is = function (e) {
            return i[e] ? i[e].call(this) : this.state() == e
        }, t.findAncestorByClass = function (t, i) {
            do
                if (t = t.parentElement, !t) break; while (!e.hasClass(t, i));
            return t
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.KalturaManager = function (e) {
        function t(e, t) {
            this.element = e, this.videoCredentials = t.userSettings.video_support.settings
        }

        function i(t) {
            var i, n;
            t ? (i = "lightbox-" + this.element.dataset.imageId, n = !0) : (i = this.element.dataset.imageId, n = !1);
            try {
                this.kalturaPlayer = KalturaPlayer.setup({
                    targetId: i,
                    disableUserCache: !0,
                    provider: {
                        partnerId: this.videoCredentials.partner_id,
                        uiConfId: this.videoCredentials.player_id
                    },
                    player: {
                        playback: {
                            preload: "auto",
                            autoplay: n,
                            pictureInPicture: !1,
                            muted: !0
                        }
                    }
                })
            } catch (o) {
                e.safeConsole(o.message)
            }
        }

        function n(e) {
            return {
                thumbWidth: Math.floor(e.offsetWidth),
                sliceTime: 230,
                element: e,
                bindEvents: function () {
                    var e = this;
                    this.element.setAttribute("data-kframe", 0), this.element.setAttribute("data-ktimer", 0), this.element.addEventListener("mouseover", function (t) {
                        e.mouseOver.call(e, t)
                    }), this.element.addEventListener("touchstart", function (t) {
                        e.mouseOver.call(e, t)
                    }), this.element.addEventListener("mouseout", function (t) {
                        e.mouseOut.call(e, t)
                    }), this.element.addEventListener("touchend", function (t) {
                        e.mouseOut.call(e, t)
                    }), this.element.addEventListener("mouseup", function (t) {
                        e.mouseOut.call(e, t)
                    })
                },
                mouseOver: function (e) {
                    var t = e.target;
                    t.setAttribute("data-loop", 1), this.loopthumb(t)
                },
                loopthumb: function (e) {
                    var t = parseInt(e.getAttribute("data-loop"));
                    if (t > 0) {
                        var i = parseInt(e.getAttribute("data-kframe")) - this.thumbWidth;
                        e.style.backgroundPosition = i + "px", e.setAttribute("data-kframe", i);
                        var n = this,
                            o = setTimeout(function () {
                                n.loopthumb(e)
                            }, n.sliceTime);
                        e.setAttribute("data-ktimer", o)
                    }
                },
                mouseOut: function (e) {
                    var t = e.target;
                    t.setAttribute("data-loop", 0), t.style.backgroundPosition = "0px", t.setAttribute("data-kframe", 0), t.setAttribute("data-ktimer", 0)
                }
            }
        }

        function o(e) {
            function t(t) {
                var i = t.currentTarget.getBoundingClientRect(),
                    n = t.clientX,
                    o = window.getComputedStyle(t.currentTarget, null),
                    s = parseInt(o.blockSize, 10),
                    a = parseInt(o.paddingBlockStart, 10),
                    l = n - i.left - a,
                    c = l / s;
                c = parseFloat(c.toFixed(2)), 1 >= c && c >= 0 && (e.muted && c > 0 && (e.muted = !1), c || (e.muted = !0), e.volume = c, r.style.height = 100 * c + "%")
            }
            var i = document.getElementsByClassName("playkit-volume-control-bar")[0],
                n = i.cloneNode(!0),
                o = i.parentNode;
            o.appendChild(n), o.removeChild(i);
            var r = n.getElementsByClassName("playkit-progress")[0];
            o.addEventListener("mouseleave", function () {
                n.onmousemove = null
            }), n.addEventListener("mouseup", function (e) {
                t(e), n.onmousemove = null
            }), n.addEventListener("mousedown", function () {
                n.onmousemove = function (e) {
                    t(e)
                }
            }), e.addEventListener(e.Event.VOLUME_CHANGE, function () {
                e.muted || (r.style.height = 100 * e.volume + "%")
            }), e.addEventListener(e.Event.MUTE_CHANGE, function () {
                r.style.height = e.muted ? "0px" : 100 * e.volume + "%"
            })
        }
        return t.prototype.loadThumbRotator = function () {
            this.KalturaThumbRotator = n(this.element);
            var e = "url(" + t.getThumbnailUrl(this.element) + ") ",
                i = "0px center",
                o = new Image,
                r = this;
            o.onload = function () {
                r.element.style.background = e + i, r.element.style.filter = "none", r.KalturaThumbRotator.bindEvents(r)
            }, o.setAttribute("src", t.getThumbnailUrl(this.element))
        }, t.prototype.initLightboxPlayer = function () {
            i.call(this, !0)
        }, t.prototype.loadVideo = function () {
            this.kalturaPlayer.loadMedia({
                entryId: this.element.dataset.entryId
            }), o(this.kalturaPlayer)
        }, t.prototype.replayVideo = function () {
            this.kalturaPlayer._localPlayer.currentTime = 0, this.kalturaPlayer.muted = !0, this.kalturaPlayer.play()
        }, t.prototype.pauseVideo = function () {
            this.kalturaPlayer.pause()
        }, t.getThumbnailUrl = function (e) {
            return e.dataset.srcUrl + "/type/3/start_sec/0/end_sec/3/width/" + Math.floor(e.offsetWidth) + "/height/" + Math.floor(e.offsetHeight) + "/vid_slices/12/file_name/thumbnail.jpg"
        }, t.setElementThumbnailPlaceholder = function (e) {
            var i = "url(" + t.getThumbnailPlaceholderUrl(e) + ") ";
            e.style.background = i, e.style.backgroundSize = "cover"
        }, t.getThumbnailPlaceholderUrl = function (e) {
            return e.dataset.srcUrl + "/type/3/width/" + Math.floor(e.offsetWidth) + "/height/" + Math.floor(e.offsetHeight)
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.MobileSlide = function (e) {
        function t(e, t) {
            this.touchStartX = void 0, this.touchMoveX = void 0, this.moveX = 0, this.eventListeneres = [], this.element = e, this.slider = this.element.querySelector(t.sliderSelector || b), this.slidesContainer = this.element.querySelector(t.slidesContainerSelector || w), this.slides = this.element.querySelectorAll(t.slidesSelector || _), this.settings = i(t), n.call(this), this.slides.length > this.settings.visibleSlidesCount && a.call(this)
        }

        function i(e) {
            return {
                debug: e.debug || !1,
                slideMargin: e.slideMargin || f,
                visibleSlidesCount: e.visibleSlidesCount || y,
                animateClass: e.animateClass || v,
                separatorSize: e.separatorSize || 0,
                separatorClass: e.separatorClass,
                fixedSlideWidth: e.fixedSlideWidth
            }
        }

        function n() {
            this.slidesContainer.style.margin = 0, this.slider.style.margin = 0, o.call(this)
        }

        function o() {
            r.call(this), s.call(this)
        }

        function r() {
            var e = this.slider.offsetWidth,
                t = this.slides.length,
                i = this.settings.fixedSlideWidth || Math.min(parseInt(e / (this.settings.visibleSlidesCount + .4)), S),
                n = (t + 1) * this.settings.slideMargin,
                o = t * i + n,
                r = o - e;
            this.slideWidth = i, this.sliderWidth = e, this.slidesContainerWidth = o + this.settings.separatorSize, this.slidesContainerOffset = r + this.settings.separatorSize
        }

        function s() {
            for (var t = 0; t < this.slides.length; t++) {
                var i = this.slides[t];
                i.style.width = this.slideWidth + "px", i.style.marginRight = this.settings.slideMargin + "px", this.settings.separatorClass && !e.hasClass(i, this.settings.separatorClass) && (i.style.marginLeft = 0)
            }
            this.slides[0].style.marginLeft = this.settings.slideMargin + "px", this.slidesContainer.style.width = this.slidesContainerWidth + "px"
        }

        function a() {
            var e = this;
            l.call(this, this.slidesContainer, "touchstart", function (t) {
                d.call(e, t)
            }), l.call(this, this.slidesContainer, "touchmove", function (t) {
                g.call(e, t)
            }), l.call(this, this.slidesContainer, "touchend", function (t) {
                p.call(e, t)
            }), l.call(this, this.slidesContainer, "mousedown", function (t) {
                c.call(e, t)
            }), l.call(this, this.slidesContainer, "mousemove", function (t) {
                g.call(e, t)
            }), l.call(this, this.slidesContainer, "mouseup", function (t) {
                u.call(e, t)
            })
        }

        function l(t, i, n) {
            e.addEventListener(t, i, n), this.eventListeneres.push({
                element: t,
                type: i,
                func: n
            })
        }

        function c(e) {
            this.mousedown = !0, d.call(this, e)
        }

        function d(t) {
            this.touchStartX = t.touches ? t.touches[0].pageX : t.pageX, this.touchMoveX = void 0, e.removeClass(this.slidesContainer, this.settings.animateClass)
        }

        function u(e) {
            p.call(this, e), this.mousedown = !1
        }

        function p(t) {
            var i = this.moveX / this.slideWidth,
                n = this.slidesContainerWidth - this.moveX - this.settings.slideMargin <= this.sliderWidth,
                o = i % 1;
            if (0 != o) {
                var r = i * this.settings.slideMargin,
                    s = this.moveX;
                if (!n && .4 > o) {
                    var a = Math.round(this.slideWidth * o - r);
                    this.moveX = h.call(this, this.moveX - a)
                } else {
                    var a = Math.round(this.slideWidth * (1 - o) + r);
                    this.moveX = h.call(this, this.moveX + a)
                }
                e.addClass(this.slidesContainer, this.settings.animateClass), m.call(this), Math.abs(s - this.moveX) > 1 && t.preventDefault()
            }
        }

        function g(e) {
            if (!(e instanceof MouseEvent) || this.mousedown) {
                var t = this.touchMoveX || this.touchStartX;
                this.touchMoveX = e.touches ? e.touches[0].pageX : e.pageX;
                var i = this.moveX + t - this.touchMoveX;
                this.moveX = h.call(this, i), m.call(this), e.preventDefault()
            }
        }

        function h(e) {
            return 0 > e ? 0 : e >= this.slidesContainerOffset ? this.slidesContainerOffset : e
        }

        function m() {
            this.slidesContainer.style.transform = "translate3d(-" + this.moveX + "px,0,0)"
        }
        var f = 5,
            y = 2,
            v = "yotpo-mobile-slide-animation",
            b = ".yotpo-mobile-slider",
            w = ".yotpo-mobile-slides-container",
            _ = ".yotpo-mobile-slide",
            S = 150;
        return t.prototype.adjustSize = function () {
            o.call(this), this.moveX > this.slidesContainerOffset && (this.moveX = this.slidesContainerOffset, m.call(this))
        }, t.prototype.destroy = function () {
            for (var t = 0; t < this.eventListeneres.length; t++) {
                var i = this.eventListeneres[t];
                e.removeEventListener(i.element, i.type, i.func)
            }
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Pagination = function (e) {
        var t = {};
        return t.init = function () {
            for (var i = this, n = function (e) {
                    for (var i in t.actions)
                        if (e.classList.contains(i)) return i;
                    return null
                }, o = function (e, t) {
                    var i = "prev" == e ? "yoReviewsPrev" : "yoReviewsNext",
                        n = document.getElementById(i);
                    if (n) n.href = t;
                    else {
                        var o = document.getElementsByTagName("head")[0];
                        n = document.createElement("link"), n.rel = e, n.href = t, n.id = i, o.appendChild(n)
                    }
                }, r = function (e) {
                    var t = "prev" == e ? "yoReviewsPrev" : "yoReviewsNext",
                        i = document.getElementById(t);
                    if (i) {
                        var n = document.getElementsByTagName("head")[0];
                        n.removeChild(i)
                    }
                }, s = function (t, i, n) {
                    if (!e.hasClass(t, "yotpo-disabled") && n) {
                        if ("prev" == i && 1 == n) return;
                        var s = "next" == i ? n + 1 : n - 1,
                            a = e.updateQueryStringParameter(window.location.href, "yoReviewsPage", s);
                        t.href = a, o(i, a)
                    } else t.removeAttribute("href"), r(i)
                }, a = i.element.getElementsByClassName("yotpo-pager"), l = 0; l < a.length; ++l)
                for (var c = a[l].children, d = 0; d < c.length; ++d) {
                    var u = c[d],
                        p = n(u),
                        g = null;
                    "goTo" == p ? g = +u.getAttribute("data-page") : "yotpo_next" == p ? this instanceof e.Widgets.Basic && this.supportsPagination() && s(u, "next", this.settings.page) : "yotpo_previous" == p && this instanceof e.Widgets.Basic && this.supportsPagination() && s(u, "prev", this.settings.page), u.onclick = function (n, o, r) {
                        return function () {
                            if (!e.hasClass(this, "yotpo-disabled")) {
                                e.togglePreLoader(i.getElement());
                                var s = t.actions[o].call(n, r);
                                return s && "function" == typeof n.trigger && n.trigger("pageChanged", o), e.currentAnalytics.trackEvent("reviews", "clicked_on", "widget_next_page"), !1
                            }
                        }
                    }(i, p, g)
                }
        }, t.actions = {
            yotpo_next: function () {
                return ++this.settings.page, !0
            },
            yotpo_previous: function () {
                return 1 == this.settings.page ? !1 : (--this.settings.page, !0)
            },
            goTo: function (e) {
                return e = +e, 1 > e ? !1 : (this.settings.page = e, !0)
            }
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.PopupWindow = function (e) {
        function t(e, t) {
            i.call(this, e), n.call(this, t)
        }

        function i(e) {
            this.element = e, this.modal = this.element.getElementsByClassName("yotpo-modal-base")[0]
        }

        function n(e) {
            if (e.closeWhenPressedOutside) {
                var t = this.element.getElementsByClassName("yotpo-modal-mask")[0];
                if (t) {
                    var i = this;
                    t.onclick = function () {
                        i.close()
                    }
                }
            }
        }
        return t.prototype.open = function () {
            e.addClass(this.modal, "yotpo-modal-active"), this.body_overflow_style = document.body.style.overflow, document.body.style.overflow = "hidden", document.body.appendChild(this.element), this.trigger("open")
        }, t.prototype.close = function (t) {
            e.removeClass(this.modal, "yotpo-modal-active"), document.body.style.overflow = this.body_overflow_style;
            var i = document.body.getElementsByClassName("yotpo-image-upload-container")[0];
            i && i.appendChild(this.element), this.trigger("close", t)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Refresh = function (e) {
        var t = {};
        return t.perform = function () {
            var t = this;
            t._controller.getBatch(function (i) {
                var n = [];
                try {
                    n = JSON.parse(i), n = n.shift()
                        .result, "undefined" != typeof t.getElement() && (t.getElement()
                            .innerHTML = n), "function" == typeof t.trigger && (t.trigger("refreshed"), t.trigger("ready"))
                } catch (o) {
                    e.safeConsole(o.message)
                }
            }, [{
                method: t.getMethod(),
                params: t.getSettings()
            }])
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Slide = function (e) {
        function t(e, t) {
            this.element = e, this.imageCount = t.imageCount, this.displayWindowCount = t.displayWindowCount, this.position = t.initialPosition || r(t.imageCount, t.displayWindowCount), this.offset = t.useOffset ? o(this.displayWindowCount) : u, this.autoSlide = !!t.autoSlide && t.imageCount > t.displayWindowCount, this.interval = t.delayInterval || a, this.direction = t.slideDirection || l, this.percentage = 100 / parseFloat(this.displayWindowCount), this.isSliding = !1, this.animationDuration = t.animationDuration || d, this.displayDirection = t.rtl ? "right" : "left", this.directionVector = this.displayDirection == l ? -1 : 1, this.onSlideCallbacks = []
        }

        function i(t) {
            var i = this,
                o = 0;
            this.isSliding || (this.isSliding = !0, this.position += t, s.call(this), 1 === this.position ? o = this.imageCount : this.position === this.imageCount + 2 && (o = -this.imageCount), setTimeout(function () {
                0 !== o && (e.removeClass(i.element, c), i.position += o, s.call(i)), setTimeout(function () {
                    e.addClass(i.element, c), i.isSliding = !1, n.call(i)
                }, 50)
            }, this.animationDuration))
        }

        function n() {
            for (var e = 0; e < this.onSlideCallbacks.length; e++) this.onSlideCallbacks[e].call(this.position)
        }

        function o(e) {
            return 100 / e / 2
        }

        function r(e, t) {
            return t >= e ? 0 : t
        }

        function s() {
            this.element.style[this.displayDirection] = -(this.position * this.percentage + this.offset) + "%"
        }
        var a = 3e3,
            l = "left",
            c = "y-slide-left-animations",
            d = 450,
            u = 0;
        return t.prototype.left = function () {
            i.call(this, this.directionVector)
        }, t.prototype.right = function () {
            i.call(this, -this.directionVector)
        }, t.prototype.setCurrentPosition = function (e) {
            this.position = e, s.call(this)
        }, t.prototype.start = function () {
            s.call(this), this.autoSlide && this.play()
        }, t.prototype.play = function () {
            var e = this;
            !this.timerID && this.autoSlide && (this.timerID = setInterval(function () {
                e[e.direction]()
            }, this.interval))
        }, t.prototype.pause = function () {
            this.timerID && this.autoSlide && (clearInterval(this.timerID), delete this.timerID)
        }, t.prototype.onSlide = function (e) {
            this.onSlideCallbacks.push(e)
        }, t
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.UserAllocation = function (e) {
        var t = parseInt("FFFFFFFFFFFFFFFF", 16),
            i = {};
        return i.getUserAllocation = function () {
            var i = e.currentAnalytics.getDomainUserId();
            return parseInt(i, 16) / t * 99 + 1
        }, i
    }(Yotpo), Yotpo.Modules = Yotpo.Modules || {}, Yotpo.Modules.Vote = function (e) {
        function t(t) {
            for (var i = 0; i < t.length; i++) e.removeClass(t[i], "yotpo-disabled")
        }

        function i(t) {
            for (var i = 0; i < t.length; i++) e.addClass(t[i], "yotpo-disabled")
        }
        var n = {};
        return n.perform = function (i, n) {
            var o = this,
                r = o.params.id,
                s = o.getType(),
                a = e.getApiHost() + "/" + s + "s/" + r + "/vote/" + i;
            n = n || !1, n && (a += "/true"),
                function (i) {
                    e.ajax(a, function (e) {
                        var n, r;
                        o.data = JSON.parse(e), o.trigger("vote"), r = document.querySelectorAll("[data-" + i + '-id="' + o.params.id + '"]');
                        for (var s = 0; s < r.length; s++) n = r[s].getElementsByClassName("vote-btn"), t(n)
                    })
                }(s)
        }, n.bind = function (t) {
            var n = e.localStorage.getItem(t.getType() + "-" + t.get("id")),
                o = this.getElementsByClassName("yotpo-footer")[0],
                r = o.getElementsByClassName("vote-btn");
            if ("undefined" != typeof yotpo && yotpo.getUserSetting("css_preview"))
                for (var s = 0; s < r.length; s++) e.addClass(r[s], "yotpo-disabled");
            for (var a = 0; a < r.length; ++a) r[a].getAttribute("data-type") == n && e.addClass(r[a], "voted"), r[a].onclick = function () {
                function n() {
                    var i = this.getAttribute("data-type"),
                        n = e.hasClass(this, "voted"),
                        o = this.parentNode.querySelector(".vote-sum[data-type=" + i + "]");
                    return n ? (o.innerHTML = +o.innerHTML - 1, e.localStorage.removeItem(t.getType() + "-" + t.get("id"))) : (o.innerHTML = +o.innerHTML + 1, e.localStorage.setItem(t.getType() + "-" + t.get("id"), i)), t.updateOriginalVote && t.updateOriginalVote(i, n ? -1 : 1), e.toggleClass(this, "voted"), t.vote(i, n), !0
                }
                if (e.hasClass(this, "yotpo-disabled")) return !1;
                var o = this.parentNode.getElementsByClassName("vote-btn");
                i(o);
                var r = this.parentNode.getElementsByClassName("voted")[0],
                    s = !0;
                r && r != this && (s = n.call(r)), s && n.call(this)
            }
        }, n
    }(Yotpo), Yotpo.Helpers = Yotpo.Helpers || {}, Yotpo.Helpers.FileValidator = function (e) {
        function t(e, t) {
            this.file = e, this.validations = t, this.validated = !1, this.errors = []
        }

        function i(e) {
            for (var t = !1, i = this.file.type, n = 0; n < e.length; n++)
                if (e[n] === i) {
                    t = !0;
                    break
                } return t
        }

        function n(e, i) {
            var n = new FileReader,
                r = new Image,
                s = this;
            n.onload = function (n) {
                var a;
                a = n.target.result, r.src = a, r.onload = function () {
                    (e && this.width < e || i && this.height < i) && s.errors.push(t.ERROR_TYPES.INVALID_IMAGE_DIMENSIONS), o.call(s)
                }, r.onerror = function () {
                    s.errors.push(t.ERROR_TYPES.INVALID_IMAGE_FILE), o.call(s)
                }
            }, n.readAsDataURL(this.file)
        }

        function o() {
            this.validated = !0, this.trigger("validated", this.errors)
        }
        return t.ERROR_TYPES = {
            INVALID_TYPE: 1,
            INVALID_SIZE: 2,
            INVALID_IMAGE_DIMENSIONS: 3,
            INVALID_IMAGE_FILE: 4
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.validate = function () {
            if (this.validated) return void this.trigger("validated", this.errors);
            var e, r;
            for (var s in this.validations) switch (s) {
            case "maxFileSize":
                var a = this.validations[s];
                this.file.size > a && this.errors.push(t.ERROR_TYPES.INVALID_SIZE);
                break;
            case "fileTypes":
                i.call(this, this.validations[s]) || this.errors.push(t.ERROR_TYPES.INVALID_TYPE);
                break;
            case "minImageWidth":
                e = this.validations[s];
                break;
            case "minImageHeight":
                r = this.validations[s]
            }
            e || r ? n.call(this, e, r) : o.call(this)
        }, t
    }(Yotpo), Yotpo.Helpers = Yotpo.Helpers || {}, Yotpo.Helpers.ImageUtils = function () {
        var e = Object.create(null);
        return e.ROTATION_TYPES = {
            1: "rotate(0deg)",
            3: "rotate(180deg)",
            6: "rotate(90deg)",
            8: "rotate(270deg)"
        }, e.getImageOrientation = function (t, i) {
            new FileReader;
            EXIF.getData(t, function () {
                var n = t.exifdata || {},
                    o = n.Orientation || 1;
                i(e.ROTATION_TYPES[o])
            })
        }, e
    }(Yotpo),
    function () {
        function e(e) {
            return !!e.exifdata
        }

        function t(e, t) {
            t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
            for (var i = atob(e), n = i.length, o = new ArrayBuffer(n), r = new Uint8Array(o), s = 0; n > s; s++) r[s] = i.charCodeAt(s);
            return o
        }

        function i(e, t) {
            var i = new XMLHttpRequest;
            i.open("GET", e, !0), i.responseType = "blob", i.onload = function () {
                (200 == this.status || 0 === this.status) && t(this.response)
            }, i.send()
        }

        function n(e, n) {
            function r(t) {
                var i = o(t);
                e.exifdata = i || {}, n && n.call(e)
            }
            if (e.src)
                if (/^data\:/i.test(e.src)) {
                    var s = t(e.src);
                    r(s)
                } else if (/^blob\:/i.test(e.src)) {
                var a = new FileReader;
                a.onload = function (e) {
                    r(e.target.result)
                }, i(e.src, function (e) {
                    a.readAsArrayBuffer(e)
                })
            } else {
                var l = new XMLHttpRequest;
                l.onload = function () {
                    if (200 != this.status && 0 !== this.status) throw "Could not load image";
                    r(l.response), l = null
                }, l.open("GET", e.src, !0), l.responseType = "arraybuffer", l.send(null)
            } else if (self.FileReader && (e instanceof self.Blob || e instanceof self.File)) {
                var a = new FileReader;
                a.onload = function (e) {
                    c && console.log("Got file of length " + e.target.result.byteLength), r(e.target.result)
                }, a.readAsArrayBuffer(e)
            }
        }

        function o(e) {
            var t = new DataView(e);
            if (c && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return c && console.log("Not a valid JPEG"), !1;
            for (var i, n = 2, o = e.byteLength; o > n;) {
                if (255 != t.getUint8(n)) return c && console.log("Not a valid marker at offset " + n + ", found: " + t.getUint8(n)), !1;
                if (i = t.getUint8(n + 1), c && console.log(i), 225 == i) return c && console.log("Found 0xFFE1 marker"), l(t, n + 4, t.getUint16(n + 2) - 2);
                n += 2 + t.getUint16(n + 2)
            }
        }

        function r(e, t, i, n, o) {
            var r, a, l, d = e.getUint16(i, !o),
                u = {};
            for (l = 0; d > l; l++) r = i + 12 * l + 2, a = n[e.getUint16(r, !o)], !a && c && console.log("Unknown tag: " + e.getUint16(r, !o)), u[a] = s(e, r, t, i, o);
            return u
        }

        function s(e, t, i, n, o) {
            var r, s, l, c, d, u, p = e.getUint16(t + 2, !o),
                g = e.getUint32(t + 4, !o),
                h = e.getUint32(t + 8, !o) + i;
            switch (p) {
            case 1:
            case 7:
                if (1 == g) return e.getUint8(t + 8, !o);
                for (r = g > 4 ? h : t + 8, s = [], c = 0; g > c; c++) s[c] = e.getUint8(r + c);
                return s;
            case 2:
                return r = g > 4 ? h : t + 8, a(e, r, g - 1);
            case 3:
                if (1 == g) return e.getUint16(t + 8, !o);
                for (r = g > 2 ? h : t + 8, s = [], c = 0; g > c; c++) s[c] = e.getUint16(r + 2 * c, !o);
                return s;
            case 4:
                if (1 == g) return e.getUint32(t + 8, !o);
                for (s = [], c = 0; g > c; c++) s[c] = e.getUint32(h + 4 * c, !o);
                return s;
            case 5:
                if (1 == g) return d = e.getUint32(h, !o), u = e.getUint32(h + 4, !o), l = new Number(d / u), l.numerator = d, l.denominator = u, l;
                for (s = [], c = 0; g > c; c++) d = e.getUint32(h + 8 * c, !o), u = e.getUint32(h + 4 + 8 * c, !o), s[c] = new Number(d / u), s[c].numerator = d, s[c].denominator = u;
                return s;
            case 9:
                if (1 == g) return e.getInt32(t + 8, !o);
                for (s = [], c = 0; g > c; c++) s[c] = e.getInt32(h + 4 * c, !o);
                return s;
            case 10:
                if (1 == g) return e.getInt32(h, !o) / e.getInt32(h + 4, !o);
                for (s = [], c = 0; g > c; c++) s[c] = e.getInt32(h + 8 * c, !o) / e.getInt32(h + 4 + 8 * c, !o);
                return s
            }
        }

        function a(e, t, i) {
            for (var n = "", o = t; t + i > o; o++) n += String.fromCharCode(e.getUint8(o));
            return n
        }

        function l(e, t) {
            if ("Exif" != a(e, t, 4)) return c && console.log("Not valid EXIF data! " + a(e, t, 4)), !1;
            var i, n, o, s, l, d = t + 6;
            if (18761 == e.getUint16(d)) i = !1;
            else {
                if (19789 != e.getUint16(d)) return c && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
                i = !0
            }
            if (42 != e.getUint16(d + 2, !i)) return c && console.log("Not valid TIFF data! (no 0x002A)"), !1;
            var u = e.getUint32(d + 4, !i);
            if (8 > u) return c && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(d + 4, !i)), !1;
            if (n = r(e, d, d + u, g, i), n.ExifIFDPointer) {
                s = r(e, d, d + n.ExifIFDPointer, p, i);
                for (o in s) {
                    switch (o) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        s[o] = m[o][s[o]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        s[o] = String.fromCharCode(s[o][0], s[o][1], s[o][2], s[o][3]);
                        break;
                    case "ComponentsConfiguration":
                        s[o] = m.Components[s[o][0]] + m.Components[s[o][1]] + m.Components[s[o][2]] + m.Components[s[o][3]]
                    }
                    n[o] = s[o]
                }
            }
            if (n.GPSInfoIFDPointer) {
                l = r(e, d, d + n.GPSInfoIFDPointer, h, i);
                for (o in l) {
                    switch (o) {
                    case "GPSVersionID":
                        l[o] = l[o][0] + "." + l[o][1] + "." + l[o][2] + "." + l[o][3]
                    }
                    n[o] = l[o]
                }
            }
            return n
        }
        var c = !1,
            d = this,
            u = function (e) {
                return e instanceof u ? e : this instanceof u ? void(this.EXIFwrapped = e) : new u(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = u), exports.EXIF = u) : d.EXIF = u;
        var p = u.Tags = {
                36864: "ExifVersion"
            },
            g = u.TiffTags = {
                274: "Orientation"
            },
            h = u.GPSTags = {},
            m = (u.IFD1Tags = {}, u.StringValues = {
                ExposureProgram: {},
                MeteringMode: {},
                LightSource: {},
                Flash: {},
                SensingMethod: {},
                SceneCaptureType: {},
                SceneType: {},
                CustomRendered: {},
                WhiteBalance: {},
                GainControl: {},
                Contrast: {},
                Saturation: {},
                Sharpness: {},
                SubjectDistanceRange: {},
                FileSource: {},
                Components: {}
            });
        u.getData = function (t, i) {
            return (self.Image && t instanceof self.Image || self.HTMLImageElement && t instanceof self.HTMLImageElement) && !t.complete ? !1 : (e(t) ? i && i.call(t) : n(t, i), !0)
        }, u.readFromBinaryFile = function (e) {
            return o(e)
        }, "function" == typeof define && define.amd && define("exif-js", [], function () {
            return u
        })
    }.call(this), Yotpo.Helpers = Yotpo.Helpers || {}, Yotpo.Helpers.KalturaUploader = function (e) {
        function t(t, n, o, r, s) {
            this.file = t, this.analyticsTracker = r, this.trustedVendorsData = s, this.appKey = o, this.kalturaSessionKey = n.settings.ks, this.kalturaPartnerId = n.settings.partner_id, this.kalturaMetadataProfileId = n.settings.metadata_profile_id, this.uploadToken = null, this.kalturaServerBase = g, this.resumeable = new e.Libraries.Resumable({
                chunkSize: 1048576,
                simultaneousUploads: 3,
                testChunks: !1,
                throttleProgressCallbacks: 1,
                target: this.kalturaServerBase + "/service/uploadToken/action/upload",
                fileParameterName: "fileData"
            }), i.call(this, this.resumeable)
        }

        function i(e) {
            e.on("fileAdded", n.bind(this)), e.on("fileProgress", o.bind(this)), e.on("fileSuccess", r.bind(this)), e.on("fileError", s.bind(this))
        }

        function n(e) {
            e.bootstrap(), c.call(this, e.fileName, e.size), this.trigger("fileAdded", {
                file: e
            })
        }

        function o(e) {
            this.trigger("progress", {
                percentage: Math.floor(100 * e.progress()) + "%",
                file: e
            })
        }

        function r(e) {
            this.trigger("complete", {
                file: e,
                submitCallback: d.bind(this, e.fileName)
            })
        }

        function s(e, t) {
            a.call(this, t), this.trigger("error", {
                error: t,
                file: e
            })
        }

        function a(e, t, i, n) {
            this.trustedVendorsData && (t = this.trustedVendorsData.display_name, i = this.trustedVendorsData.email);
            var o = {
                userName: t,
                userEmail: i,
                error: e,
                fileName: this.file.name,
                domainKey: n
            };
            this.analyticsTracker.track("video_upload", "error", null, o)
        }

        function l(e, t, i, n) {
            var o = this.kalturaServerBase + e + "?clientTag=yotpo-upload-media&format=1&ks=" + this.kalturaSessionKey + "&" + t,
                r = new XMLHttpRequest;
            r.responseType = "json", r.onload = function (e) {
                var t = e.target.response;
                i(t)
            }, r.open("POST", o, !0), n ? (r.setRequestHeader("Content-Type", "application/json"), r.send(JSON.stringify(n))) : r.send()
        }

        function c(e, t) {
            var i = this,
                n = "/service/uploadToken/action/add",
                o = "uploadToken:objectType=KalturaUploadToken&uploadToken:fileName=" + encodeURIComponent(e) + "&uploadToken:fileSize=" + t;
            l.call(i, n, o, function (e) {
                return e.id ? (i.uploadToken = e.id, i.resumeable.opts.query = function (e, t) {
                    return {
                        format: 1,
                        ks: i.kalturaSessionKey,
                        uploadTokenId: i.uploadToken,
                        resume: t.offset > 0 ? 1 : 0,
                        resumeAt: t.startByte,
                        finalChunk: t.offset + 1 === e.chunks.length ? 1 : 0
                    }
                }, void i.resumeable.upload()) : (s.call(i, i.file, e.message), !1)
            })
        }

        function d(e, t, i, n, o, r) {
            var s = this,
                c = "/service/media/action/addFromUploadedFile",
                d = "mediaEntry:name=" + encodeURIComponent(e) + "&mediaEntry:mediaType=1&uploadTokenId=" + s.uploadToken;
            d += "&mediaEntry:description=" + t + "&mediaEntry:userId=" + n + "&mediaEntry:referenceId=" + s.appKey, l.call(s, c, d, function (e) {
                e.id ? (e.status = {
                    code: 200
                }, u.call(s, e.id, i, n, o)) : (e.status = {
                    code: 500
                }, a.call(s, e.message, i, n, o)), r(e)
            })
        }

        function u(e, t, i, n) {
            var o = this,
                r = "/service/metadata_metadata/action/add",
                s = "partnerId=" + this.kalturaPartnerId,
                c = {
                    metadataProfileId: this.kalturaMetadataProfileId,
                    objectId: e,
                    objectType: "1",
                    xmlData: p(t, i, n)
                };
            l.call(o, r, s, function (e) {
                e.id || a.call(o, e.message, t, i, n)
            }, c)
        }

        function p(e, t, i) {
            var n = "<metadata><User_name>" + e + "</User_name><User_email>" + t + "</User_email>";
            return i && (n += "<Domain_keys>" + i + "</Domain_keys>"), n += "<Source>onsite_upload</Source></metadata>"
        }
        var g = "//upload.kaltura.com/api_v3";
        return t.prototype.Cancel = function () {
            this.resumeable.cancel()
        }, t.prototype.Upload = function () {
            this.resumeable.addFile(this.file)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t
    }(Yotpo), Yotpo.Helpers = Yotpo.Helpers || {}, Yotpo.Helpers.WidthClass = function () {
        var e, t = {},
            i = [];
        e = [{
            name: "yotpo-size-7",
            fit: function (e) {
                return e >= 1280
            }
        }, {
            name: "yotpo-size-6",
            fit: function (e) {
                return 1280 > e && e >= 960
            }
        }, {
            name: "yotpo-size-5",
            fit: function (e) {
                return 960 > e && e >= 768
            }
        }, {
            name: "yotpo-size-4",
            fit: function (e) {
                return 768 > e && e >= 600
            }
        }, {
            name: "yotpo-size-3",
            fit: function (e) {
                return 600 > e && e >= 480
            }
        }, {
            name: "yotpo-size-2",
            fit: function (e) {
                return 480 > e && e >= 320
            }
        }, {
            name: "yotpo-size-1",
            fit: function (e) {
                return 320 > e
            }
        }];
        for (var n = 0; n < e.length; n++) i.push(e[n].name);
        return t.getWidgetWidthClass = function (t) {
            for (var i, n, o = 0; o < e.length; o++)
                if (n = e[o], n.fit(t)) {
                    i = n.name;
                    break
                } return i
        }, t.getWidgetWidthClasses = function () {
            return i
        }, t
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.ImageUpload = function (e) {
        function t(e, t, n, o, r, s, a, l) {
            this.flowSteps = {}, this.source_widget = r, this.product_id = s, this.trustedVendorsData = a, this.appKey = o, this.analyticsTracker = l, i.call(this, e, t, n, o)
        }

        function i(t, i, a, l) {
            function c(e) {
                e && (d.analyticsTracker.track("clicked_on", "exit"), o.call(d))
            }
            var d = this,
                p = {};
            e.forEach(u, function (e) {
                p[e] = t.getElementsByClassName(e)[0]
            }), this.flowSteps.thankYou = new e.Flows.ImageUpload.ThankYou(p.thank_you), this.flowSteps.uploadError = new e.Flows.ImageUpload.UploadError(p.upload_error), this.flowSteps.uploadImages = new e.Flows.ImageUpload.UploadImages(p.upload_images, i, a, l, r.bind(this), this.trustedVendorsData, this.analyticsTracker), this.flowSteps.userDetails = new e.Flows.ImageUpload.UserDetails(p.user_details, s.bind(this), n.bind(this)), this.flowSteps.uploadImages.on("close", c), this.flowSteps.userDetails.on("close", c)
        }

        function n() {
            this.flowSteps.userDetails.close(), this.flowSteps.uploadImages.open()
        }

        function o() {
            this.flowSteps.userDetails.resetModalContent(), this.flowSteps.uploadImages.resetModalContent()
        }

        function r(e, t) {
            this.imagesData = e, this.videosData = t, null === this.trustedVendorsData ? (this.analyticsTracker.track("clicked_on", "next"), this.flowSteps.uploadImages.close(), this.flowSteps.userDetails.open()) : s.call(this, this.trustedVendorsData.display_name, this.trustedVendorsData.email)
        }

        function s(t, i) {
            a.call(this);
            var n = this.product_id ? [this.product_id] : null;
            e.forEach(this.imagesData.concat(this.videosData), function (e) {
                e.user_name = t, e.user_email = i, n && (e.tagged_products = n, e.domain_key = n[0])
            }), this.callsRemaining = 0, this.callsErrors = !1, this.imagesData.length > 0 && (this.callsRemaining++, l.call(this)), this.videosData.length > 0 && (this.callsRemaining += this.videosData.length, c.call(this))
        }

        function a() {
            var e = {
                images_count: this.imagesData.length,
                video_count: this.videosData.length
            };
            this.analyticsTracker.track("clicked_on", "submit", null, e)
        }

        function l() {
            var t = {
                    images: this.imagesData,
                    source_widget: this.source_widget
                },
                i = e.getApiHost() + "/v1/widget/" + this.appKey + "/images/create_batch",
                n = JSON.stringify(t);
            e.ajax(i, d.bind(this), "POST", n, void 0, {
                requestHeaders: {
                    "Content-type": "application/json"
                }
            })
        }

        function c() {
            var t = this;
            e.forEach(t.videosData, function (e) {
                e.videoSubmit(e.caption, e.user_name, e.user_email, e.domain_key, d.bind(t))
            })
        }

        function d(t) {
            this.callsRemaining--, e.isString(t) && t.length > 0 && (t = JSON.parse(t)), 200 !== t.status.code && (this.callsErrors = !0), 0 === this.callsRemaining && (this.flowSteps.uploadImages.close(), this.flowSteps.userDetails.close(), this.callsErrors ? this.flowSteps.uploadError.open() : (o.call(this), this.flowSteps.thankYou.open()))
        }
        var u = ["thank_you", "upload_error", "upload_images", "user_details"];
        return t.prototype.start = function (e) {
            this.flowSteps.uploadImages.upload(e)
        }, t
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.ImageUpload = Yotpo.Flows.ImageUpload || {}, Yotpo.Flows.ImageUpload.ThankYou = function (e) {
        function t(t) {
            this.modalElement = t, e.Modules.PopupWindow.call(this, t, {
                closeWhenPressedOutside: !1
            }), i.call(this)
        }

        function i() {
            var e = this,
                t = this.modalElement.querySelector(".close-button");
            t.onclick = function () {
                e.close(!0)
            }
        }
        return t.prototype = Object.create(e.Modules.PopupWindow.prototype), t
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.UploadButton = function (e) {
        function t() {
            var e = this.controller.getUserSetting("vendor_review_creation");
            if (e) {
                var t = this.controller.getTrustedVendorsData();
                if (Object.keys(t)
                    .length > 0) return t
            }
            return null
        }

        function i(t, i, n) {
            var o = new e.AnalyticsTracker("upload_media", i);
            return o.eventContext.is_trusted_vendor = null !== n, o.track("loaded"), e.currentInview.register(t, function () {
                o.track("shown")
            }), this.uploadPhotosButton.onclick = function () {
                o.track("clicked_on", "add_your_media")
            }, o
        }
        var n = {};
        return n.initUploadButton = function (n, o, r, s) {
            var a = n.getUserSetting("upload_photos"),
                l = n.getUserSetting("video_support");
            if (n.getUserSetting("upload_videos") && (l.uploadEnabled = !0), this.uploadPhotosButton = o.querySelector(".yotpo-pictures-gallery-upload-button"), this.controller = n, this.fileInput = o.querySelector(".yotpo-file-image-upload"), a && this.fileInput && this.uploadPhotosButton) {
                var c = o.querySelector(".yotpo-image-upload-container"),
                    d = this.controller.getAppKey(),
                    u = t.call(this),
                    p = i.call(this, o, s, u);
                this.fileInput.onchange = function () {
                    if (this.files.length > 0) {
                        var t = new e.Flows.ImageUpload(c, a, l, d, r.widget_name, r.product_id, u, p);
                        t.start(this.files)
                    }
                }
            }
        }, n
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.ImageUpload = Yotpo.Flows.ImageUpload || {}, Yotpo.Flows.ImageUpload.UploadError = function (e) {
        function t(t) {
            this.modalElement = t, e.Modules.PopupWindow.call(this, t, {
                closeWhenPressedOutside: !1
            }), i.call(this)
        }

        function i() {
            var e = this,
                t = this.modalElement.querySelector(".close-button");
            t.onclick = function () {
                e.close(!1)
            }
        }
        return t.prototype = Object.create(e.Modules.PopupWindow.prototype), t
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.ImageUpload = Yotpo.Flows.ImageUpload || {}, Yotpo.Flows.ImageUpload.UploadImages = function (e) {
        function t(t, i, n, o, r, s, a) {
            var l = i.settings || {};
            A = l.max_photos || E, this.videoSupportSettings = n || {}, this.modalElement = t, this.successCallback = r, this.trustedVendorsData = s, this.analyticsTracker = a, this.uuid = e.generateUUID(), this.appKey = o, e.Modules.PopupWindow.call(this, t, {
                closeWhenPressedOutside: !1
            })
        }

        function i() {
            var t = this,
                i = this.modalElement.querySelector(".yotpo-icon-cross"),
                n = t.modalElement.querySelector(".submit-label"),
                o = t.modalElement.querySelector(".yotpo-submit-loader");
            this.nextOrSubmitButton = this.modalElement.querySelector(".yotpo-next-button"), this.addMoreInput = this.modalElement.querySelector(".upload-more-photos"), this.addMorePhotos = this.modalElement.querySelector(".yotpo-add-more"), this.nextOrSubmitButton.onclick = function () {
                null !== t.trustedVendorsData && (e.addClass(n, "yotpo-hidden"), e.removeClass(o, "yotpo-hidden")), t.successCallback(a.call(t), l.call(t))
            }, i.onclick = function () {
                t.close(!0)
            }, this.addMoreInput.onchange = function () {
                p.call(t, this.files)
            }
        }

        function n() {
            this.itemsArray = [];
            for (var e = this, t = this.modalElement.querySelectorAll(".yotpo-upload-photos"), i = 0; i < t.length; i++) {
                var n = t[i],
                    o = n.querySelector(".yotpo-file-input"),
                    r = n.querySelector(".yotpo-circle");
                o.setAttribute("index", i.toString()), r.setAttribute("index", i.toString());
                var s = {
                    itemElement: n,
                    crossElement: r,
                    captionElement: n.querySelector(".yotpo-caption-modal-textarea"),
                    uploadLabel: n.querySelector(".uploaded-background-image"),
                    progressBar: n.querySelector(".yotpo-upload-progress"),
                    loadedBar: n.querySelector(".yotpo-upload-progress-loaded"),
                    fileInput: o,
                    active: !1
                };
                o.onchange = function () {
                    var t = parseInt(this.getAttribute("index"));
                    this.files.length > 0 && g.call(e, this.files[0], e.itemsArray[t])
                }, r.onclick = function (t) {
                    var i = parseInt(this.getAttribute("index"));
                    C.call(e, e.itemsArray[i]), t.preventDefault()
                }, this.itemsArray.push(s)
            }
        }

        function o(t) {
            function i(e) {
                P = JSON.parse(e), P.originalPath = P.path, t()
            }
            var n = e.getApiHost("dynamic") + "/s3_signature",
                o = e.convertHashToQueryStringParams({
                    policy_name: "OnsiteUploadedImages",
                    app_key: this.appKey
                }),
                r = {
                    withCredentials: !1
                };
            e.ajax(n, i, "POST", o, null, r)
        }

        function r() {
            var e = P.originalPath;
            "/" !== e.charAt(e.length - 1) && (e += "/"), e += this.uuid + "/", P.path = e
        }

        function s() {
            null === this.trustedVendorsData ? e.addClass(this.modalElement, "display-next-button") : e.addClass(this.modalElement, "display-submit-button")
        }

        function a() {
            for (var e = [], t = 0; A > t; t++) {
                var i = this.itemsArray[t];
                if (i.active && !i.isVideo) {
                    var n = i.image_url;
                    n.startsWith("http") || (n = "https:" + n), e.push({
                        image_url: n,
                        caption: i.captionElement.value
                    })
                }
            }
            return e
        }

        function l() {
            for (var e = [], t = 0; A > t; t++) {
                var i = this.itemsArray[t];
                i.active && i.isVideo && e.push({
                    isVideo: !0,
                    videoSubmit: i.videoSubmit,
                    caption: i.captionElement.value
                })
            }
            return e
        }

        function c() {
            for (var t = [], i = 0; A > i; i++) this.itemsArray[i].active || e.hasClass(this.itemsArray[i].itemElement, "image-loader") || t.push(this.itemsArray[i]);
            return t
        }

        function d() {
            for (var t = !1, i = !1, n = 0; A > n; n++) this.itemsArray[n].active && (t = !0), e.hasClass(this.itemsArray[n].itemElement, "image-loader") && (i = !0);
            return t && !i
        }

        function u() {
            0 === c.call(this)
                .length ? (e.addClass(this.addMorePhotos, "yotpo-add-more-disabled"), this.addMoreInput.disabled = !0) : (e.removeClass(this.addMorePhotos, "yotpo-add-more-disabled"), this.addMoreInput.disabled = !1), d.call(this) ? (e.removeClass(this.nextOrSubmitButton, "yotpo-next-submit-disabled"), this.nextOrSubmitButton.disabled = !1) : (e.addClass(this.nextOrSubmitButton, "yotpo-next-submit-disabled"), this.nextOrSubmitButton.disabled = !0)
        }

        function p(e) {
            for (var t = c.call(this), i = Array.prototype.slice.call(e, 0, t.length), n = i.length > t.length ? t.length : i.length, o = 0; n > o; o++) g.call(this, i[o], t[o])
        }

        function g(e, t) {
            y.call(this, t), u.call(this);
            var i = "video" === e.type.split("/")[0];
            i && this.videoSupportSettings.uploadEnabled ? (t.isVideo = !0, h.call(this, e, t)) : f.call(this, e, t)
        }

        function h(t, i) {
            var n = this,
                o = new e.Helpers.KalturaUploader(t, n.videoSupportSettings, n.appKey, n.analyticsTracker, n.trustedVendorsData);
            o.on("fileAdded", v.bind(n, t, i)), o.on("progress", function (e) {
                i.loadedBar.style.width = e.percentage
            }), o.on("complete", function (t) {
                i.videoSubmit = t.submitCallback, i.active = !0, m.call(n, i), e.addClass(i.itemElement, "active-video"), u.call(n)
            }), o.on("error", function (e) {
                m.call(n, i), _.call(n, i, [T], e.file)
            }), o.Upload(), i.cancelVideoUpload = function () {
                o.Cancel(), m.call(n, i)
            }
        }

        function m(t) {
            t.loadedBar.style.width = 0, e.removeClass(t.uploadLabel, "upload-overlay"), e.removeClass(t.itemElement, "image-loader"), e.removeClass(t.itemElement, "active-video"), e.hide(t.progressBar)
        }

        function f(t, i) {
            var n = this,
                o = new e.FileUploader(t, I);
            o.on("complete", function (o) {
                null !== o.url && 0 === o.errors.length ? (i.active = !0, e.Helpers.ImageUtils.getImageOrientation(t, b.bind(n, i, o))) : (n.analyticsTracker.track("picture_upload", "error", null, {
                    error: o.errors
                }), _.call(n, i, o.errors, o.file))
            }), i.cancelImageUpload = function () {
                o.removeEvent("complete")
            };
            var r = "//" + P.bucket + "." + e.awsS3Domain;
            o.validateAndUpload(r, P, e.FileUploader.TYPE.S3)
        }

        function y(t) {
            t.fileInput.disabled = !0, t.captionElement.disabled = !1, this.nextOrSubmitButton.disabled = !0, w(t), e.removeClass(t.itemElement, "image-empty"), e.addClass(t.itemElement, "image-loader"), e.addClass(this.nextOrSubmitButton, "yotpo-next-submit-disabled")
        }

        function v(t, i) {
            e.show(i.progressBar), e.addClass(i.uploadLabel, "upload-overlay"), e.addClass(i.itemElement, "active-placeholder");
            var n = document.createElement("video");
            n.addEventListener("timeupdate", function () {
                if (!(n.currentTime < 1)) {
                    var e = document.createElement("canvas");
                    e.width = n.videoWidth, e.height = n.videoHeight, e.getContext("2d")
                        .drawImage(n, 0, 0, e.width, e.height), n.pause();
                    var t = e.toDataURL();
                    i.uploadLabel.setAttribute("style", "background-image: url(" + t + ") !important;")
                }
            }), n.src = URL.createObjectURL(t), n.muted = !0, n.playsInline = !0, n.play()
        }

        function b(t, i, n) {
            var o = this;
            k(i.file, function (r) {
                t.image_url = i.url, t.uploadLabel.setAttribute("style", "background-image: url(" + r + ") !important;transform: " + n), e.removeClass(t.itemElement, "image-loader"), e.addClass(t.itemElement, "active-placeholder"), u.call(o)
            })
        }

        function w(t) {
            e.hasClass(t.itemElement, "image-error") && (e.removeClass(t.itemElement, "image-error"), t.captionElement.value = "")
        }

        function _(t, i, n) {
            e.removeClass(t.itemElement, "image-loader"), t.active = !1, e.addClass(t.itemElement, "image-error"), e.removeClass(t.itemElement, "active-placeholder");
            var o = n.name.length > x ? "\u2026" + n.name.slice(n.name.length - x, n.name.length) : n.name;
            t.captionElement.disabled = !0, t.captionElement.value = o + "\r\n" + S.call(this, i), u.call(this)
        }

        function S(t) {
            switch (t[0]) {
            case e.Helpers.FileValidator.ERROR_TYPES.INVALID_TYPE:
                return this.videoSupportSettings.uploadEnabled ? e.texts.upload_video_invalid_type : e.texts.upload_photos_invalid_type;
            case e.Helpers.FileValidator.ERROR_TYPES.INVALID_SIZE:
                return e.texts.upload_photos_invalid_size;
            case e.Helpers.FileValidator.ERROR_TYPES.INVALID_IMAGE_DIMENSIONS:
                return e.texts.upload_photos_invalid_image_dimensions;
            case e.Helpers.FileValidator.ERROR_TYPES.INVALID_IMAGE_FILE:
                return e.texts.upload_photos_invalid_image_file;
            case T:
                return e.texts.upload_video_error;
            default:
                return e.texts.upload_photos_invalid_image_file
            }
        }

        function C(t) {
            t.isVideo ? (t.cancelVideoUpload(), t.isVideo = !1) : "function" == typeof t.cancelImageUpload && t.cancelImageUpload(), t.active = !1, t.captionElement.disabled = !0, t.fileInput.disabled = !1, t.uploadLabel.setAttribute("style", "background-image: none !important"), w(t), e.removeClass(t.itemElement, "active-placeholder"), e.addClass(t.itemElement, "image-empty"), e.removeClass(t.itemElement, "image-loader"), u.call(this)
        }

        function k(e, t) {
            var i = new FileReader;
            i.onload = function (e) {
                t(e.target.result)
            }, i.readAsDataURL(e)
        }
        var A, E = 3,
            x = 19,
            I = {
                maxFileSize: 15728640,
                fileTypes: ["image/png", "image/gif", "image/jpg", "image/jpeg"],
                minImageWidth: 400,
                minImageHeight: 400
            },
            T = "video_upload_error",
            P = null;
        return t.prototype = Object.create(e.Modules.PopupWindow.prototype), t.prototype.upload = function (e) {
            function t() {
                r.call(this), this.open(), n.call(this), i.call(this), s.call(this), p.call(this, a)
            }
            var a = Array.prototype.slice.call(e, 0, A);
            null === P ? o.call(this, t.bind(this)) : t.call(this)
        }, t.prototype.resetModalContent = function () {
            s.call(this);
            for (var e = 0; A > e; e++) C.call(this, this.itemsArray[e]), this.itemsArray[e].captionElement.value = ""
        }, t
    }(Yotpo), Yotpo.Flows = Yotpo.Flows || {}, Yotpo.Flows.ImageUpload = Yotpo.Flows.ImageUpload || {}, Yotpo.Flows.ImageUpload.UserDetails = function (e) {
        function t(t, n, o) {
            this.modalElement = t, this.successCallback = n, this.backCallback = o, this.validUserName = !1, this.validUserEmail = !1, e.Modules.PopupWindow.call(this, t, {
                closeWhenPressedOutside: !1
            }), i.call(this)
        }

        function i() {
            var t = this,
                i = this.modalElement.querySelector(".yotpo-icon-cross"),
                s = this.modalElement.querySelector(".user_details_back");
            this.submitLabel = this.modalElement.querySelector(".yotpo-modal-submit-label"), this.loader = this.modalElement.querySelector(".yotpo-submit-loader"), this.userName = this.modalElement.querySelector("#user-name"), this.userEmail = this.modalElement.querySelector("#user-email"), this.submitButton = this.modalElement.querySelector(".yotpo-modal-submit-button"), this.userName.onblur = o.bind(this), this.userEmail.onblur = r.bind(this), i.onclick = function () {
                t.close(!0)
            }, s.onclick = this.backCallback, this.userName.onkeyup = function () {
                t.validUserName = 0 !== t.userName.value.trim()
                    .length, n.call(t), o.call(t)
            }, this.userEmail.onkeyup = function () {
                t.validUserEmail = 0 !== t.userEmail.value.trim()
                    .length && e.validateEmail(t.userEmail.value) ? !0 : !1, n.call(t), r.call(t)
            }, this.submitButton.onclick = function () {
                e.removeClass(t.loader, "yotpo-hidden"), e.addClass(t.submitLabel, "yotpo-hidden"), t.successCallback(t.userName.value, t.userEmail.value)
            }
        }

        function n() {
            this.validUserName && this.validUserEmail ? (this.submitButton.disabled = !1, e.removeClass(this.submitButton, "yotpo-next-submit-disabled")) : (this.submitButton.disabled = !0, e.addClass(this.submitButton, "yotpo-next-submit-disabled"))
        }

        function o() {
            this.validUserName ? e.removeClass(this.userName, "yotpo-input-invalid") : e.addClass(this.userName, "yotpo-input-invalid")
        }

        function r() {
            this.validUserEmail ? e.removeClass(this.userEmail, "yotpo-input-invalid") : e.addClass(this.userEmail, "yotpo-input-invalid")
        }
        return t.prototype = Object.create(e.Modules.PopupWindow.prototype), t.prototype.resetModalContent = function () {
            e.addClass(this.loader, "yotpo-hidden"), e.removeClass(this.submitLabel, "yotpo-hidden"), e.removeClass(this.userName, "yotpo-input-invalid"), e.removeClass(this.userEmail, "yotpo-input-invalid"), this.userName.value = "", this.userEmail.value = "", this.validUserName = !1, this.validEmail = !1, n.call(this)
        }, t
    }(Yotpo), Yotpo.BaseAggregator = function () {
        function e() {
            this.baseObject = null
        }
        return e.prototype.addFilter = function (e) {
            this.baseObject = e
        }, e.prototype.removeFilter = function () {
            this.baseObject = null
        }, e.prototype.deepCopy = function () {
            return this.baseObject
        }, e.prototype.setFilters = function (e) {
            this.baseObject = e
        }, e.prototype.toJson = function () {
            return this.baseObject
        }, e.prototype.isFilterExists = function () {
            return null != this.baseObject
        }, e.prototype.initAggregator = function () {
            this.baseObject = null
        }, e
    }(Yotpo), Yotpo.CrfsAggregator = function (e) {
        function t() {
            this.crfFilters = {}
        }
        return t.prototype.addFilter = function (t) {
            var i = new e.CrfFilter(t.id, t.value, t.displayValue);
            this.crfFilters[t.id] = i
        }, t.prototype.removeFilter = function (e) {
            delete this.crfFilters[e.id]
        }, t.prototype.deepCopy = function () {
            var e = {};
            for (var t in this.crfFilters) {
                var i = this.crfFilters[t].deepCopy();
                e[t] = i
            }
            return e
        }, t.prototype.setFilters = function (e) {
            this.crfFilters = e
        }, t.prototype.toJson = function () {
            var e = [];
            for (var t in this.crfFilters) {
                var i = this.crfFilters[t];
                e.push(i.toJson())
            }
            return 0 !== e.length ? e : null
        }, t.prototype.isFilterExists = function () {
            return 0 !== Object.keys(this.crfFilters)
                .length
        }, t.prototype.initAggregator = function () {
            this.crfFilters = {}
        }, t
    }(Yotpo), Yotpo.OrdersAggregator = function (e) {
        function t() {
            this.orderFilters = {}
        }
        return t.prototype.addFilter = function (t) {
            var i = new e.OrderFilter(t.id, t.sub_type, t.question, [t.value]);
            this.orderFilters[t.id] = i
        }, t.prototype.removeFilter = function (e) {
            delete this.orderFilters[e.id]
        }, t.prototype.deepCopy = function () {
            var e = {};
            for (var t in this.orderFilters) {
                var i = this.orderFilters[t].deepCopy();
                e[t] = i
            }
            return e
        }, t.prototype.setFilters = function (e) {
            this.orderFilters = e
        }, t.prototype.toJson = function () {
            var e = [];
            for (var t in this.orderFilters) {
                var i = this.orderFilters[t];
                e.push(i.toJson())
            }
            return 0 !== e.length ? e : null
        }, t.prototype.isFilterExists = function () {
            return 0 !== Object.keys(this.orderFilters)
                .length
        }, t.prototype.initAggregator = function () {
            this.orderFilters = {}
        }, t
    }(Yotpo), Yotpo.ScoresAggregator = function (e) {
        function t() {
            e.BaseAggregator.call(this)
        }
        return t.prototype = Object.create(e.BaseAggregator.prototype), t.prototype.toJson = function () {
            return this.baseObject ? [this.baseObject] : null
        }, t
    }(Yotpo), Yotpo.SortsAggregator = function (e) {
        function t() {
            this.sortByFilters = {}
        }
        return t.prototype.addFilter = function (t) {
            var i = new e.SortByFilter(t.value.fieldName, t.value.isAscending);
            this.sortByFilters[t.id] = i
        }, t.prototype.removeFilter = function (e) {
            delete this.sortByFilters[e.id]
        }, t.prototype.deepCopy = function () {
            var e = {};
            for (var t in this.sortByFilters) {
                var i = this.sortByFilters[t].deepCopy();
                e[t] = i
            }
            return e
        }, t.prototype.setFilters = function (e) {
            this.sortByFilters = e
        }, t.prototype.toJson = function () {
            var e = [];
            for (var t in this.sortByFilters) {
                var i = this.sortByFilters[t];
                e.push(i.toJson())
            }
            return 0 !== e.length ? e : null
        }, t.prototype.isFilterExists = function () {
            return 0 !== Object.keys(this.sortByFilters)
                .length
        }, t.prototype.initAggregator = function () {
            this.sortByFilters = {}
        }, t
    }(Yotpo), Yotpo.TopicsAggregator = function (e) {
        function t() {
            e.BaseAggregator.call(this)
        }
        return t.prototype = Object.create(e.BaseAggregator.prototype), t.prototype.toJson = function () {
            return this.baseObject ? [this.baseObject] : null
        }, t
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.Analytics = Yotpo.FilterAndSearch.Analytics || {}, Yotpo.FilterAndSearch.Analytics.AnalyticsNotifier = function (e) {
        function t(t, n, o) {
            var r = this._controller.getAppKey(),
                s = e.getApiHost("dynamic") + "/v1/topic/" + r + "/related_topics.json",
                a = e.convertComplexObjectToQueryStringParams({
                    app_key: r,
                    domain_key: t,
                    query: n
                }),
                l = this,
                c = function (e) {
                    var n = JSON.parse(e);
                    200 === n.status.code && (l.freeTextRelatedTopics = n.response.related_topics, i.call(l, o.ctaName, t, o.eventValue, o.extraEventAttributes))
                };
            e.ajax(s, c, "POST", a)
        }

        function i(t, i, n, o) {
            var r = e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(this),
                s = {
                    cta: t,
                    page_type: r,
                    sku: i
                };
            e.copy(o, s);
            var a = e.FilterAndSearch.Analytics.Filtering.Params.getFiltersState.call(this);
            e.copy(a, s), this.settings && e.copy(this.settings, s);
            try {
                e.currentAnalytics.trackEvent("filter_reviews", "clicked_on", i, n, s)
            } catch (l) {
                e.safeConsole(l.message)
            }
        }
        var n, o = {};
        return o.init = function () {
            n = e.filterAndSearch.analytics.page_types, e.FilterAndSearch.Analytics.Filtering.Params.init(), this.analyticsFilterId = 0, this.freeTextRelatedTopics = []
        }, o.notifyMobileFiltersSubmitted = function (e) {
            i.call(this, "apply_button", e, "show_reviews", {})
        }, o.notifyFreeTextSearched = function (n, o, r) {
            var s = e.FilterAndSearch.Analytics.Filtering.Params.getEventParams(n, o);
            o ? t.call(this, r, o, s) : (this.freeTextRelatedTopics = [], i.call(this, s.ctaName, r, s.eventValue, s.extraEventAttributes))
        }, o.notifyClearAllEvent = function (t) {
            this.freeTextRelatedTopics = [];
            var n = e.FilterAndSearch.Analytics.Filtering.Params.getClearAllEventParams();
            i.call(this, n.ctaName, t, n.eventValue, n.extraEventAttributes)
        }, o.notifyEvent = function (t, n, o) {
            var r = e.FilterAndSearch.Analytics.Filtering.Params.getEventParams(t, n);
            i.call(this, r.ctaName, o, r.eventValue, r.extraEventAttributes)
        }, o.getPageType = function () {
            var e = n.main_widget,
                t = this.settings["host-widget"];
            return t && "testimonials" === t && (e = "testimonials" === this.settings.type ? n.testimonials_tab : n.dedicated_page), e
        }, o
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.Analytics = Yotpo.FilterAndSearch.Analytics || {}, Yotpo.FilterAndSearch.Analytics.Filtering = Yotpo.FilterAndSearch.Analytics.Filtering || {}, Yotpo.FilterAndSearch.Analytics.Filtering.Params = function (e) {
        function t(e, t) {
            var i = "NaN",
                n = "NaN",
                o = {};
            switch (e) {
            case d.scores:
                n = "filter_star_rating", i = t.value, t.is_default_answer && (i = u);
                break;
            case d.images:
                n = "filter_reviews_images", i = "all", t.value === !0 && (i = "only_with_images");
                break;
            case d.crfs:
                n = "filter_field", i = t.value.value, o.filter_field_type = "crf";
                break;
            case d.orders:
                n = t.value.question, i = t.value.value, o.filter_field_type = "metadata", o.filter_field_sub_type = t.value.sub_type
            }
            return {
                eventValue: i,
                ctaName: n,
                extraEventAttributes: o
            }
        }

        function i(e) {
            var t = e[d.topics];
            return t ? t[0] : ""
        }

        function n(t, i, n) {
            switch (aggregatorType = void 0, n) {
            case "orders":
                aggregatorType = d.orders;
                break;
            case "crfs":
            default:
                aggregatorType = d.crfs
            }
            var s = t[aggregatorType],
                a = [],
                l = [];
            s && e.forEach(s, function (e) {
                var t = i.querySelector('.filters-dropdown[data-type="' + n + '"][data-question-id="' + e.question_id + '"]');
                if (t) {
                    l.push(e.question_id);
                    var o = t.querySelector('.list-category[data-value="' + e.answers[0] + '"]');
                    o && a.push({
                        question: t.getAttribute("data-default-button-display-value"),
                        answer: o.getAttribute("data-analytic-property")
                    })
                }
            });
            var c = r(i, o(l), n);
            return a.concat(c)
        }

        function o(t) {
            var i = [];
            return e.forEach(t, function (e) {
                i.push(e.toString())
            }), i
        }

        function r(t, i, n) {
            var o = [],
                r = t.querySelectorAll('.filters-dropdown[data-type="' + n + '"]');
            return e.forEach(r, function (e) {
                var t = i.indexOf(e.getAttribute("data-question-id")); - 1 === t && o.push({
                    question: e.getAttribute("data-default-button-display-value"),
                    answer: e.getAttribute("data-value")
                })
            }), o
        }

        function s(e) {
            var t = e[d.scores];
            return void 0 === t ? u : t[0].toString()
        }

        function a(e) {
            var t = e[d.sorts];
            return t ? t[0].sort_by : ""
        }

        function l(e) {
            var t = e[d.free_text_search];
            return t ? t : ""
        }

        function c(e, t) {
            return t ? void 0 !== e[d.images] : null
        }
        var d, u, p = {};
        return p.init = function () {
            d = e.filterAndSearch.filters_state_manager.aggregators_types, u = e.filterAndSearch.filters_drop_down_default_answer
        }, p.getFiltersState = function () {
            var e = this.filtersManager.getCurrentSubmittedFilters();
            return this.analyticsFilterId++, {
                filters_state_id: this.analyticsFilterId,
                selected_topic: i(e),
                selected_crfs: n(e, this.reviewsContainerElement, "crfs"),
                selected_stars: s(e),
                selected_sort: a(e),
                selected_orders_metadata: n(e, this.reviewsContainerElement, "orders"),
                free_text_search: l(e),
                reviews_with_images: c(e, this.reviewsWithPicturesEnabled),
                related_topics: this.freeTextRelatedTopics,
                desktop_suggested_topics: this.desktopSuggestedTopics,
                mobile_suggested_topics: this.mobileSuggestedTopics
            }
        }, p.getClearAllEventParams = function () {
            return {
                eventValue: "clear_all",
                ctaName: "clear_all",
                extraEventAttributes: {}
            }
        }, p.getEventParams = function (e, i) {
            var n = "",
                o = "",
                r = {};
            switch (e) {
            case d.free_text_search:
                i && (n = i), o = "free_text_search";
                break;
            case d.sorts:
                n = i.value.value.fieldName, o = "sort";
                break;
            case d.topics:
                n = i, o = "topic";
                break;
            case d.images:
            case d.scores:
            case d.crfs:
            case d.orders:
                var s = t(e, i);
                n = s.eventValue, o = s.ctaName, r = s.extraEventAttributes
            }
            return {
                eventValue: n,
                ctaName: o,
                extraEventAttributes: r
            }
        }, p
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.ContainersHandlers = Yotpo.FilterAndSearch.ContainersHandlers || {}, Yotpo.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler = function (e) {
        var t, i, n, o = {};
        return o.init = function () {
            t = e.filterAndSearch.filters_state_manager.aggregators_types, i = e.filterAndSearch.sort_drop_down_most_relevant_value, n = e.filterAndSearch.sorts_drop_down_default_answer
        }, o.onMobileFiltersSubmitted = function () {
            var t = this;
            e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(t);
            var i = this.filtersManager.getCurrentSubmittedFilters(),
                n = Object.keys(i);
            if (e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.removeFiltersTags(this.reviewsContainerElement), n.length > 0) {
                var o = this.reviewsContainerElement.querySelector(".yotpo-filter-tag"),
                    r = e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.getFilterTagElements(o, i, n),
                    s = o.parentElement;
                e.forEach(r, function (i) {
                    e.addEventListener(i, "click", function () {
                        e.SearchInProgress.switchMode(t.reviewsContainerElement, !0);
                        var i = e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.parseChosenFilter(this);
                        t.filtersManager.removeFilter(!0, i.type, i.value);
                        var n = this.parentElement.querySelector(".pre-selected:checked");
                        n && (n.removeAttribute("checked"), n.classList.remove("pre-selected")), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(t), this.remove(), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyEvent.call(t, i.type, i, t.settings.pid)
                    });
                    var n = s.querySelector(".mobile-filters-modal");
                    s.insertBefore(i, n)
                })
            }
        }, o.onFreeTextSearchedCallBack = function (o) {
            this.previousTextSearched && (e.SearchInProgress.switchMode(this.reviewsContainerElement, !0), this.filtersManager.removeFilter(!0, t.free_text_search, this.previousTextSearched)), this.filtersManager.initAggregator(t.sorts);
            var r;
            o ? (e.SearchInProgress.switchMode(this.reviewsContainerElement, !0), this.filtersManager.addFilter(!0, t.free_text_search, o), this.previousTextSearched = o, r = i) : (this.previousTextSearched = null, r = n);
            var s = this.reviewsContainerElement.querySelector(".sorting");
            s && (e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.setDropDownButtonValue(s, i, i), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.unmarkAnswer(s)), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyFreeTextSearched.call(this, t.free_text_search, o, this.settings.pid), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(this)
        }, o.onClearTextSearchedCallBack = function () {
            if (this.previousTextSearched) {
                e.SearchInProgress.switchMode(this.reviewsContainerElement, !0), this.filtersManager.removeFilter(!0, t.free_text_search, this.previousTextSearched), this.previousTextSearched = null;
                var i = this.reviewsContainerElement.querySelector(".sorting");
                if (i) {
                    var n = i.querySelector("[data-is-default-answer=true]");
                    n && e.simulateClickEvent(n)
                }
                e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyFreeTextSearched.call(this, t.free_text_search, "", this.settings.pid), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(this)
            }
        }, o.clearAllFilters = function () {
            e.SearchInProgress.switchMode(this.reviewsContainerElement, !0), this.filtersManager.clearAllFilters(), e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.removeFiltersTags(this.reviewsContainerElement), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.resetAllDropDowns(this.filtersDropDowns);
            var t = this.reviewsContainerElement.querySelector(".suggested-topics");
            if (t) {
                var i = t.querySelectorAll(".active-topic");
                e.SuggestedTopics.resetSelectedTopic(i)
            }
            e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(this), e.FreeTextSearch.clearSearchedText.call(this), this.previousTextSearched = null, e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyClearAllEvent.call(this, this.settings.pid)
        }, o.onSelectFilter = function (i, n, o) {
            e.SearchInProgress.switchMode(this.reviewsContainerElement, !0);
            var r = e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.parseChosenFilter(i, o),
                s = e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.parseChosenFilter(i, n);
            e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.unmarkAnswer(o), this.filtersManager.removeFilter(!0, r.type, r.value), s.is_default_answer ? (e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.resetDefaultDropDownButtonValue(i), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.markTextualAnswer(n)) : (this.filtersManager.addFilter(!0, s.type, s.value), s.type === t.scores ? (e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.markStarsAnswer(n), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.setDropDownButtonStars(i, n)) : e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.markTextualAnswer(n)), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyEvent.call(this, s.type, s, this.settings.pid), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(this)
        }, o.onSelectSort = function (i, n, o) {
            if (e.SearchInProgress.switchMode(this.reviewsContainerElement, !0), o) {
                e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.unmarkAnswer(o);
                var r = e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.parseChosenFilter(i, o);
                this.filtersManager.removeFilter(!0, r.type, r.value)
            }
            var s = e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.parseChosenFilter(i, n);
            s.is_default_answer ? e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.resetDefaultDropDownButtonValue(i) : (this.filtersManager.addFilter(!0, s.type, s.value), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.markTextualAnswer(n)), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyEvent.call(this, t.sorts, s, this.settings.pid), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(this)
        }, o.onSubmittedFiltersChange = function (t, i, n, o, r) {
            if (t.settings.page = r.page, t.isFilteredReviews = !0, t.getElement()
                .innerHTML = o, i) {
                var s = new DOMParser,
                    a = s.parseFromString(o, "text/html"),
                    l = a.querySelector(".total-reviews-search")
                    .getAttribute("total-reviews-search");
                i.querySelector(".reviews-amount")
                    .innerHTML = l + " " + e.filterAndSearch.filtered_reviews_title
            }
            var c = n.querySelector(".empty-search-results-clear-all-btn");
            if (c) {
                var d = this;
                e.addEventListener(c, "click", function () {
                    e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.clearAllFilters.call(d)
                })
            }
            "function" == typeof t.trigger && (t.trigger("refreshed"), t.trigger("ready"));
            try {
                e.currentAnalytics.trackEvent("filter_reviews", "filter_results", t.settings.pid, "filter_results", {
                    cta: "filter_results",
                    results_count: parseInt(l),
                    applied_filters: this.filtersManager.states.submitted.toJson(),
                    page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(this),
                    filters_state_id: this.analyticsFilterId
                })
            } catch (u) {
                e.safeConsole(u.message)
            }
        }, o.setClearAllButtonsState = function () {
            for (var t = this.filtersManager.isFiltersExists(), i = 0; i < this.clearAllButtons.length; i++) t ? e.removeClass(this.clearAllButtons[i], "yotpo-hidden") : e.addClass(this.clearAllButtons[i], "yotpo-hidden")
        }, o
    }(Yotpo), Yotpo.CrfFilter = function (e) {
        function t(e, t, i) {
            this.questionId = e, this.value = t, this.displayValue = i
        }
        return t.prototype.toJson = function () {
            return {
                question_id: this.questionId,
                answers: [this.value],
                display_answers: [this.displayValue]
            }
        }, t.prototype.deepCopy = function () {
            return new e.CrfFilter(this.questionId, this.value, this.displayValue)
        }, t
    }(Yotpo), Yotpo.OrderFilter = function (e) {
        function t(e, t, i, n) {
            this.questionId = e, this.subType = t, this.question = i, this.answers = n
        }
        return t.prototype.toJson = function () {
            return {
                question_id: this.questionId,
                subType: this.subType,
                question: this.question,
                answers: this.answers
            }
        }, t.prototype.deepCopy = function () {
            return new e.OrderFilter(this.questionId, this.subType, this.question, this.answers)
        }, t
    }(Yotpo), Yotpo.SortByFilter = function (e) {
        function t(e, t) {
            this.fieldName = e, this.isAscending = t
        }
        return t.prototype.toJson = function () {
            return {
                sort_by: this.fieldName,
                ascending: this.isAscending
            }
        }, t.prototype.deepCopy = function () {
            return new e.SortByFilter(this.fieldName, this.isAscending)
        }, t
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.FiltersHandlers = Yotpo.FilterAndSearch.FiltersHandlers || {}, Yotpo.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler = function (e) {
        function t(t) {
            e.addClass(t, "non-selected-item"), e.removeClass(t, "selected-item")
        }

        function i(t) {
            for (var i = t.querySelectorAll(".yotpo-filter-stars > .rating-star"), n = 0; n < i.length; n++) e.addClass(i[n], "non-selected-star"), e.removeClass(i[n], "selected-stars")
        }

        function n(e) {
            var t = e.querySelector(".yotpo-filter-stars");
            t && t.remove()
        }
        var o, r, s, a, l = {};
        return l.init = function () {
            o = e.filterAndSearch.filters_state_manager.aggregators_types, r = e.filterAndSearch.filters_drop_down_default_answer, s = e.filterAndSearch.sorts_drop_down_default_answer, a = e.filterAndSearch.images_drop_down_answer, e.FilterAndSearch.FiltersHandlers.FiltersParser.init()
        }, l.parseChosenFilter = function (t, i) {
            var n = i.getAttribute("data-type"),
                r = i.getAttribute("data-value");
            switch (n) {
            case o.images:
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseImagesFilter(r);
            case o.scores:
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseScoresFilter(r);
            case o.crfs:
                var s = t.getAttribute("data-question-id");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseCrfFilter(s, r);
            case o.orders:
                var s = t.getAttribute("data-question-id");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseOrdersFilter(s, t, r);
            case o.sorts:
                var a = i.getAttribute("sort-name"),
                    l = "true" === i.getAttribute("data-ascending");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseSorts(a, r, l)
            }
        }, l.resetAllDropDowns = function (t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.currentSelectedItem && (e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.unmarkAnswer(n.currentSelectedItem), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.markTextualAnswer(n.defaultAnswerItem), n.previousSelectedItem = void 0, n.currentSelectedItem = void 0), e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.resetDefaultDropDownButtonValue(n.element)
            }
        }, l.resetDefaultDropDownButtonValue = function (e) {
            this.setDropDownButtonValue(e, e.getAttribute("data-default-button-display-value"), e.getAttribute("data-default-sort-name"))
        }, l.setDropDownButtonValue = function (t, i, o) {
            var r = t.querySelector(".yotpo-dropdown-button"),
                s = r.querySelector(".selected"),
                a = r.querySelector(".non-default-item-selected");
            a && e.removeClass(a, "yotpo-hidden"), e.removeClass(s, "non-default-item-selected"), s.innerText = i, s.setAttribute("data-selected-key", o), n(r)
        }, l.setDropDownButtonStars = function (t, i) {
            var o = t.querySelector(".yotpo-dropdown-button");
            o.querySelector(".non-default-item-selected")
                .classList.add("yotpo-hidden"), n(o);
            var r = i.getElementsByClassName("yotpo-filter-stars")[0],
                s = r.cloneNode(!0);
            e.addClass(s, "selected"), o.appendChild(s)
        }, l.unmarkAnswer = function (e) {
            var n = e.querySelector(".selected-item");
            n ? t(n) : i(e)
        }, l.markTextualAnswer = function (t) {
            var i = t.querySelector(".non-selected-item");
            i && (e.addClass(i, "selected-item"), e.removeClass(i, "non-selected-item"))
        }, l.markStarsAnswer = function (t) {
            for (var i = t.querySelectorAll(".yotpo-filter-stars > .rating-star"), n = 0; n < i.length; n++) e.addClass(i[n], "selected-stars"), e.removeClass(i[n], "non-selected-star")
        }, l
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.FiltersHandlers = Yotpo.FilterAndSearch.FiltersHandlers || {}, Yotpo.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler = function (e) {
        function t(t) {
            for (var i = t.length, n = 0; i > n; n++) e.addClass(t[0], "radio-non-selected-color"), e.removeClass(t[0], "radio-selected-star-color")
        }

        function i(t) {
            for (var i = 0; i < t.length; i++) e.addClass(t[i], "radio-selected-star-color"), e.removeClass(t[i], "radio-non-selected-color")
        }
        var n, o, r = {};
        return r.init = function () {
            n = e.filterAndSearch.filters_state_manager.aggregators_types, o = e.filterAndSearch.filters_drop_down_default_answer, e.FilterAndSearch.FiltersHandlers.FiltersParser.init()
        }, r.parseChosenFilter = function (t, i) {
            var o = i ? t.selected : t.prevSelected,
                r = o.getAttribute("data-value"),
                s = t.containerElement || t.element,
                a = s.getAttribute("data-type");
            if (a === n.scores) return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseScoresFilter(r);
            if (a === n.images) return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseImagesFilter(r);
            if (a === n.crfs) {
                var l = o.getAttribute("data-question-id"),
                    c = o.getAttribute("data-display-value");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseCrfFilter(l, r, c)
            }
            if (a === n.orders) {
                var l = o.getAttribute("data-question-id");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseOrdersFilter(l, s, r)
            }
        }, r.resetSelectedToDefault = function (e, i) {
            if (i === n.scores) {
                var o = e.containerElement.getElementsByClassName("radio-selected-star-color");
                t(o)
            } else this.unmarkTextualAnswer(e.prevSelected)
        }, r.unmarkTextualAnswer = function (e) {
            var t = e.parentElement.querySelector(".radio-label");
            t.classList.add("radio-non-selected-color"), t.classList.remove("radio-selected-color")
        }, r.markTextualAnswer = function (e) {
            var t = e.parentElement.querySelector(".radio-label");
            t.classList.add("radio-selected-color"), t.classList.remove("radio-non-selected-color")
        }, r.setSelectedStarsUI = function (e, n) {
            var r = e.selected.parentElement.querySelector(".yotpo-filter-stars"),
                s = e.containerElement.getElementsByClassName("radio-selected-star-color");
            if (s.length > 0 && t(s), n.value !== o) {
                var a = r.getElementsByClassName("yotpo-icon");
                i(a)
            }
        }, r.loadWithCurrentFilters = function (t, i) {
            var o, r;
            o = t.querySelector(i[n.scores] ? "#radio-score-" + i.scores : "#radio-score-all"), o.click(), r = t.querySelector(i[n.images] ? "#radio-images-only" : "#radio-images-all-reviews"), r && r.click();
            var s = t.querySelectorAll('div.mobile-single-filter[name^="radio-question-"]'),
                a = Array.from(s),
                l = [];
            l = e.compact(l.concat(i[n.crfs])
                .concat(i[n.orders])), e.forEach(l, function (e) {
                if (e.answers.length > 0) {
                    var i = "radio-question-" + e.question_id,
                        n = t.querySelector('[id="' + i + '"]'),
                        o = e.display_answers ? e.display_answers[0] : e.answers[0],
                        r = n.querySelector('[id="radio-question-answer-' + o + '"]');
                    r.click();
                    var s = t.querySelector('div.mobile-single-filter[name="' + r.name + '"]'),
                        l = a.indexOf(s);
                    l > -1 && a.splice(l, 1)
                }
            });
            for (var c = 0; c < a.length; c++) {
                var d = a[c].querySelector(".mobile-filter-radio-button");
                d.getElementsByTagName("input")[0].click()
            }
        }, r
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.FiltersHandlers = Yotpo.FilterAndSearch.FiltersHandlers || {}, Yotpo.FilterAndSearch.FiltersHandlers.FilterTagsHandler = function (e) {
        function t(t, i) {
            var n = t.cloneNode(!0);
            return n.classList.remove("yotpo-hidden"), n.setAttribute("data-type", i.type), n.setAttribute("data-value", i.value), n.setAttribute("data-question-id", i.question_id), n.querySelector(".filter-tag-text")
                .innerText = e.toTitleCase(i.displayText), n
        }
        var i, n, o = {};
        return o.init = function () {
            i = i || e.filterAndSearch.filters_state_manager.aggregators_types, n = e.filterAndSearch.rating_tag_title, e.FilterAndSearch.FiltersHandlers.FiltersParser.init()
        }, o.removeFiltersTags = function (e) {
            for (var t = Array.from(e.querySelectorAll(".yotpo-filter-tag")), i = t.length, n = 0; i > n; n++) {
                var o = t.pop();
                o.classList.contains("yotpo-hidden") || o.remove()
            }
        }, o.parseChosenFilter = function (t) {
            var n = t.getAttribute("data-value"),
                o = t.getAttribute("data-type");
            if (o === i.scores) return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseScoresFilter(r, n);
            if (o === i.images) return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseImagesFilter(r, n);
            if (o === i.crfs) {
                var r = t.getAttribute("data-question-id");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseCrfFilter(r, n)
            }
            if (o === i.orders) {
                var r = t.getAttribute("data-question-id");
                return e.FilterAndSearch.FiltersHandlers.FiltersParser.parseOrdersFilter(r, t, n)
            }
        }, o.getFilterTagElements = function (o, r, s) {
            for (var a = [], l = {}, c = this, d = 0; d < s.length; d++) {
                var u = s[d];
                switch (u) {
                case i.scores:
                    l.type = i.scores, l.value = r[u][0], l.question_id = r.question_id, l.displayText = n + ": " + l.value, a.push(t.call(c, o, l));
                    break;
                case i.images:
                    l.type = i.images, l.value = r[u][0], l.question_id = r.question_id, l.displayText = e.filterAndSearch.withImagesOnly, a.push(t.call(c, o, l));
                    break;
                case i.crfs:
                case i.orders:
                    e.forEach(r[u], function (e) {
                        l.type = u, l.value = e.display_answers ? e.display_answers[0] : e.answers[0], l.question_id = e.question_id;
                        var i = document.querySelector('[id="radio-question-' + e.question_id + '"]'),
                            n = i.getAttribute("data-question-title");
                        l.displayText = n + ": " + l.value, a.push(t.call(c, o, l))
                    })
                }
            }
            return a
        }, o
    }(Yotpo), Yotpo.FilterAndSearch = Yotpo.FilterAndSearch || {}, Yotpo.FilterAndSearch.FiltersHandlers = Yotpo.FilterAndSearch.FiltersHandlers || {}, Yotpo.FilterAndSearch.FiltersHandlers.FiltersParser = function (e) {
        var t, i, n, o, r = {};
        return r.init = function () {
            t = t || e.filterAndSearch.filters_state_manager.aggregators_types, i = i || e.filterAndSearch.filters_drop_down_default_answer, n = n || e.filterAndSearch.sorts_drop_down_default_answer, o = o || e.filterAndSearch.imagesMobileFilterDefaultAnswer
        }, r.parseSorts = function (e, i, o) {
            var r = {
                type: t.sorts,
                is_default_answer: !0,
                value: {}
            };
            return i !== n && (r.is_default_answer = !1, r.value.id = e, r.value.value = {
                fieldName: i,
                isAscending: o
            }), r
        }, r.parseCrfFilter = function (e, n, o) {
            var r = {
                type: t.crfs,
                is_default_answer: !0,
                value: {}
            };
            return n !== i && (r.is_default_answer = !1, r.value.id = parseInt(e), r.value.value = n, r.value.displayValue = o), r
        }, r.parseImagesFilter = function (e) {
            var n = {
                type: t.images,
                is_default_answer: !0,
                value: !1
            };
            return e !== o && e !== i && (n.is_default_answer = !1, n.value = !0), n
        }, r.parseScoresFilter = function (e) {
            var n = {
                type: t.scores,
                is_default_answer: !0,
                value: 0
            };
            return e !== i && (n.is_default_answer = !1, n.value = parseInt(e)), n
        }, r.parseOrdersFilter = function (e, n, o) {
            var r = {
                type: t.orders,
                is_default_answer: !0,
                value: {}
            };
            return o !== i && (r.is_default_answer = !1, r.value.id = e, r.value.sub_type = n.getAttribute("data-sub-type"), r.value.question = n.getAttribute("data-question"), r.value.value = o), r
        }, r
    }(Yotpo), Yotpo.FiltersState = function (e) {
        function t() {
            this.aggregatorItems = {}, this.filtersExists = !1, o = e.filterAndSearch.filters_state_manager.aggregators_types, i.call(this)
        }

        function i() {
            this.aggregatorItems[o.crfs] = {
                aggregator: new e.CrfsAggregator,
                requestKey: "crfs",
                type: o.crfs
            }, this.aggregatorItems[o.scores] = {
                aggregator: new e.ScoresAggregator,
                requestKey: "scores",
                type: o.scores
            }, this.aggregatorItems[o.topics] = {
                aggregator: new e.TopicsAggregator,
                requestKey: "topic_names",
                type: o.topics
            }, this.aggregatorItems[o.images] = {
                aggregator: new e.BaseAggregator,
                requestKey: "pictured",
                type: o.images
            }, this.aggregatorItems[o.sorts] = {
                aggregator: new e.SortsAggregator,
                requestKey: "sortings",
                type: o.sorts
            }, this.aggregatorItems[o.free_text_search] = {
                aggregator: new e.BaseAggregator,
                requestKey: "free_text_search",
                type: o.free_text_search
            }, this.aggregatorItems[o.orders] = {
                aggregator: new e.OrdersAggregator,
                requestKey: "orders",
                type: o.orders
            }
        }

        function n() {
            var e = !1;
            for (var t in this.aggregatorItems) {
                var i = this.aggregatorItems[t];
                if (i.aggregator.isFilterExists()) {
                    e = !0;
                    break
                }
            }
            this.filtersExists = e
        }
        var o;
        return t.prototype.addFilter = function (e, t) {
            this.aggregatorItems[e].aggregator.addFilter(t), this.filtersExists = !0
        }, t.prototype.removeFilter = function (e, t) {
            this.aggregatorItems[e].aggregator.removeFilter(t), n.call(this)
        }, t.prototype.deepCopy = function () {
            var e = {};
            for (var t in this.aggregatorItems) e[t] = this.aggregatorItems[t].aggregator.deepCopy();
            return e
        }, t.prototype.setAggregators = function (e) {
            for (var t in e) this.aggregatorItems[t].aggregator.setFilters(e[t]);
            n.call(this)
        }, t.prototype.toJson = function () {
            var e = {};
            for (var t in this.aggregatorItems) {
                var i = this.aggregatorItems[t],
                    n = i.aggregator.toJson();
                null !== n && (e[i.requestKey] = n)
            }
            return e
        }, t.prototype.getFilters = function () {
            var e = {};
            for (var t in this.aggregatorItems) {
                var i = this.aggregatorItems[t],
                    n = i.aggregator.toJson();
                null !== n && (e[i.type] = n)
            }
            return e
        }, t.prototype.initAggregator = function (e) {
            this.aggregatorItems[e].aggregator.initAggregator()
        }, t.prototype.isFiltersExists = function () {
            return this.filtersExists
        }, t
    }(Yotpo), Yotpo.FiltersStateManager = function (e) {
        function t(t, i, n) {
            this.coreContoller = t, this.widget = i, this.widgetSettings = {}, e.copy(n, this.widgetSettings), this.states = {}, this.observers = [], s.call(this)
        }

        function i(t, i) {
            var n = {};
            n.method = "filtered_reviews", n.params = {}, e.copy(this.widgetSettings, n.params), i = i || 1, n.params.page = i;
            var o;
            return o = t ? this.states[a].toJson() : this.states[l].toJson(), e.copy(o, n.params), n
        }

        function n(t, n) {
            var r = this,
                s = i.call(this, t, n);
            this.coreContoller.getBatch(function (i) {
                var n = o(i);
                r.observers.forEach(function (i) {
                    t ? e.isMethodExists(i.OnSubmittedFiltersChange) && i.OnSubmittedFiltersChange(n, s.params) : e.isMethodExists(i.OnPendingFiltersChange) && i.OnPendingFiltersChange(n)
                })
            }, [s])
        }

        function o(e) {
            var t = JSON.parse(e);
            return t.shift()
                .result
        }

        function r(e) {
            return e ? a : l
        }

        function s() {
            this.states[a] = new e.FiltersState, this.states[l] = new e.FiltersState
        }
        var a = "submitted",
            l = "pending",
            c = e.debounce(n, 400, !1);
        return t.prototype.addFilter = function (e, t, i) {
            var n = r(e);
            this.states[n].addFilter(t, i), c.call(this, e)
        }, t.prototype.removeFilter = function (e, t, i) {
            var n = r(e);
            this.states[n].removeFilter(t, i), c.call(this, e)
        }, t.prototype.approvePendingFilters = function () {
            var e = this.states[l].deepCopy();
            this.states[a].setAggregators(e), c.call(this, !0)
        }, t.prototype.resetAllPendingToSubmitted = function () {
            var e = this.states[a].deepCopy();
            this.states[l].setAggregators(e)
        }, t.prototype.resetAllPendingToDefault = function () {
            this.states[l] = new e.FiltersState
        }, t.prototype.clearAllFilters = function () {
            s.call(this), c.call(this, !0)
        }, t.prototype.subscribeToFiltersUpdate = function (e) {
            this.observers.push(e)
        }, t.prototype.fetchPage = function (e) {
            c.call(this, !0, e)
        }, t.prototype.getCurrentSubmittedFilters = function () {
            return this.states[a].getFilters()
        }, t.prototype.getCurrentPendingFilters = function () {
            return this.states[l].getFilters()
        }, t.prototype.isFiltersExists = function () {
            return this.states[a].isFiltersExists()
        }, t.prototype.initAggregator = function (e) {
            return this.states[a].initAggregator(e)
        }, t.prototype.AddSetting = function (e, t) {
            this.widgetSettings[e] = t
        }, t
    }(Yotpo), Yotpo.FreeTextSearch = function (e) {
        var t = {};
        return t.bind = function (t, i, n, o) {
            var r = this,
                s = t.querySelector(".free-text-search-input");
            if (s) {
                r.freeTextSearchInput = s;
                var a = t.querySelector(".clear-text-icon");
                a && (r.clearTextSearchInput = a, e.addEventListener(s, "input", function () {
                    this.value ? e.show(a) : e.hide(a)
                }), e.addEventListener(a, "click", function () {
                    s.placeholder = i, s.value = "", o.call(r), e.hide(this)
                })), e.addEventListener(s, "focus", function () {
                    this.placeholder = ""
                }), e.addEventListener(s, "blur", function () {
                    "" == this.placeholder && (this.placeholder = i)
                }), r.previousTextSearched = null, e.addEventListener(s, "keyup", function (e) {
                    var t = e.which || e.keyCode;
                    13 === t && n.call(r, s.value)
                })
            }
        }, t.clearSearchedText = function () {
            this.freeTextSearchInput && this.clearTextSearchInput && (this.freeTextSearchInput.value = "", e.hide(this.clearTextSearchInput))
        }, t
    }(Yotpo), Yotpo.MobileFilterModal = function (e) {
        function t(t, r, a) {
            this.context = t, this.filtersManager = t.filtersManager, this.filtersManager.subscribeToFiltersUpdate(this), this.radioBtnFiltersRadio = [], e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.init(), s = e.filterAndSearch.filters_state_manager.aggregators_types, i.call(this, r, o), n.call(this, r, a)
        }

        function i(t, i) {
            for (var n = this, o = t.querySelectorAll(".mobile-single-filter"), r = 0; r < o.length; ++r) {
                var s = new e.MobileFiltersRadio(o[r]);
                s.on("change", function (e) {
                    i.call(n, e)
                }), n.radioBtnFiltersRadio.push(s)
            }
        }

        function n(t, i) {
            var n = this,
                o = t.querySelector(".more-filters-btn"),
                s = t.querySelector(".mobile-filters-modal"),
                a = s.querySelector(".mobile-clear-all-btn"),
                l = s.querySelector(".yotpo-icon-cross");
            this.submitAllBtn = s.querySelector(".mobile-filters-footer-btn");
            var c = new e.Modules.PopupWindow(s, {
                closeWhenPressedOutside: !1
            });
            e.addEventListener(l, "click", function () {
                n.filtersManager.resetAllPendingToSubmitted(), c.close(!0)
            }), e.addEventListener(o, "click", function () {
                var i = {
                    cta: "filters_button",
                    page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(n.context)
                };
                e.currentAnalytics.trackEvent("filter_reviews", "clicked_on", n.context.settings.pid, "filters", i);
                var o = n.filtersManager.getCurrentSubmittedFilters();
                n.filtersManager.resetAllPendingToSubmitted(), e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.loadWithCurrentFilters(s, o), r.call(n, t), c.open()
            }), e.addEventListener(a, "click", function () {
                n.filtersManager.resetAllPendingToDefault();
                var t = n.filtersManager.getCurrentPendingFilters();
                e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.loadWithCurrentFilters(s, t)
            }), e.addEventListener(this.submitAllBtn, "click", function () {
                e.SearchInProgress.switchMode(t, !0), n.filtersManager.approvePendingFilters(), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyMobileFiltersSubmitted.call(n.context, n.context.settings.pid), i.call(n.context), c.close()
            })
        }

        function o(t) {
            var i = e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.parseChosenFilter(t, !0),
                n = e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.parseChosenFilter(t, !1);
            this.filtersManager.removeFilter(!1, n.type, n.value), i.is_default_answer ? (e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.resetSelectedToDefault(t, i.type), e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.markTextualAnswer(t.selected)) : (this.filtersManager.addFilter(!1, i.type, i.value), e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.unmarkTextualAnswer(t.prevSelected), i.type === s.scores ? e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.setSelectedStarsUI(t, i) : e.FilterAndSearch.FiltersHandlers.FilterRadioButtonsHandler.markTextualAnswer(t.selected))
        }

        function r(t) {
            var i = t.querySelector(".total-reviews-search");
            if (i) {
                var n = i.getAttribute("total-reviews-search");
                this.submitAllBtn.querySelector(".footer-text")
                    .textContent = e.filterAndSearch.show + " " + n + " " + e.filterAndSearch.filtered_reviews_title
            }
        }
        var s;
        return t.prototype.OnPendingFiltersChange = function (t) {
            if (t) {
                var i = new DOMParser,
                    n = i.parseFromString(t, "text/html"),
                    o = n.querySelector(".total-reviews-search")
                    .getAttribute("total-reviews-search");
                this.submitAllBtn.getElementsByClassName("footer-text")[0].innerText = e.filterAndSearch.show + " " + o + " " + e.filterAndSearch.filtered_reviews_title
            }
        }, t
    }(Yotpo), Yotpo.MobileFiltersRadio = function (e) {
        function t(e) {
            this.element = e, this.elementName = this.element.getAttribute("name"), this.btns = this.element.getElementsByClassName("mobile-filter-radio-buttons")[0].getElementsByClassName("mobile-filter-radio-button"), this.selected = this.element.querySelector("input[name=" + this.elementName + "]:checked"), this.selectedValue = this.selected.parentElement.getElementsByTagName("span")[0].innerHTML, i.call(this)
        }

        function i() {
            for (var t = this, i = 0; i < t.btns.length; i++) e.addEventListener(t.btns[i], "change", function () {
                var e = this,
                    i = e.getElementsByTagName("input")[0];
                if (i.id !== t.selected.id) {
                    t.updateSelected(e);
                    var n = {
                        selected: t.selected,
                        selectedValue: t.selectedValue,
                        containerElement: t.element,
                        prevSelected: t.prevSelected
                    };
                    t.trigger("change", n)
                }
            })
        }
        return t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.updateSelected = function (e) {
            e.getElementsByTagName("input")[0].setAttribute("checked", "checked"), this.prevSelected = this.selected, this.selected.removeAttribute("checked"), this.selected.classList.remove("pre-selected"), this.selected = this.element.querySelector("input[name=" + this.elementName + "]:checked"), this.selectedValue = this.selected.parentElement.getElementsByTagName("span")[0].innerHTML
        }, t
    }(Yotpo), Yotpo.SearchInProgress = function (e) {
        var t = {};
        return t.switchMode = function (t, i) {
            var n = t.querySelector(".search-in-progress"),
                o = t.querySelector(".yotpo-reviews");
            n && o && (i ? (e.show(n), o.classList.remove("yotpo-active")) : (e.hide(n), o.classList.add("yotpo-active")))
        }, t.hideSearchInProgress = function (t) {
            var i = t.querySelector(".search-in-progress");
            e.hide(i)
        }, t
    }(Yotpo), Yotpo.HoverIntervalEvent = function (e) {
        function t(e) {
            this.interval = e.interval, this.objects = []
        }

        function i(e) {
            var t = this;
            return function () {
                var i = this,
                    n = t.mouseenterTimeStamp;
                if (n) {
                    var o = new Date - n;
                    o >= e && t.callback.call(i)
                }
            }
        }
        return t.prototype.register = function (t, n) {
            if (t) {
                var o = {
                    callback: n
                };
                e.addEventListener(t, "mouseenter", function () {
                    o.mouseenterTimeStamp = new Date
                }), e.addEventListener(t, "mouseleave", i.call(o, this.interval))
            }
        }, t
    }(Yotpo), Yotpo.TestingGroupsHandler = function (e) {
        function t(e) {
            this.settings = e || {}, this.seoClient = !1, this.initialized = !1
        }
        t.prototype.getUserAllocation = function () {
            return this.userAllocation = this.userAllocation || s(this.settings), this.userAllocation
        }, t.prototype.setSeoClient = function (e) {
            this.seoClient = e
        }, t.prototype.initialize = function () {
            this.initialized = !0
        }, t.prototype.getTestingGroupsForAnalytics = function () {
            return a.call(this) ? (this.testingGroupParams = this.testingGroupParams || o(e.feature_testing_groups, this.getUserAllocation()), this.testingGroupParams) : void 0
        }, t.prototype.getTestingGroupsForServer = function () {
            return a.call(this) ? (this.featureTestingGroups = this.featureTestingGroups || n(e.feature_testing_groups, this.getUserAllocation()), this.featureTestingGroups) : void 0
        };
        var i = function (e, t) {
                var i = {};
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var o = r(e[n], t);
                        o && (i[o.feature_id] = o.group_id)
                    } return i
            },
            n = function (e, t) {
                var n = {},
                    o = !1,
                    r = i(e, t);
                for (var s in r) r.hasOwnProperty(s) && (o = !0, n["ftg_fi_" + s] = r[s]);
                return o ? n : void 0
            },
            o = function (e, t) {
                var n = "",
                    o = i(e, t);
                for (var r in o) o.hasOwnProperty(r) && (n += "f" + r + "_g" + o[r] + ":");
                return "" != n ? "ftg_" + n.substring(0, n.length - 1) : void 0
            },
            r = function (e, t) {
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var n = i.split(".."),
                            o = n[0],
                            r = n[1];
                        if (t > o && r >= t) return e[i]
                    } return null
            },
            s = function (t) {
                var i;
                return t.userSettings.ab_testing && (i = e.Modules.UserAllocation.getUserAllocation()), i
            },
            a = function () {
                return this.initialized ? this.seoClient ? !1 : !0 : (e.safeConsole("TestingGroupsHandler had not yet initialized", "error"), !1)
            };
        return t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Badge = function (e) {
        function t(e, t) {
            var i = this;
            i._controller = e, i.element = t, i.settings = {
                pid: i.element.getAttribute("data-product-id")
            };
            for (var o in n) n.hasOwnProperty(o) && i.on(o, n[o])
        }

        function i() {
            var t = this,
                i = this.getElement()
                .getElementsByClassName("y-badge")[0];
            i && (i.onclick = function () {
                var e = t._controller.getWidgetByName("Testimonials");
                e && e.open()
            });
            var n = t.element.querySelector(".yotpo-display-wrapper"),
                o = this.settings.pid,
                r = null === o ? "Reviews_Badge" : "Product_Badge";
            e.currentAnalytics.trackUniqueEvent(r, "loaded", "productId", o), e.currentInview.register(t.element, function () {
                e.currentAnalytics.trackUniqueEvent(r, "shown", "productId", o)
            }), e.addEventListener(n, "click", function () {
                e.currentAnalytics.trackUniqueEvent(r, "clicked_on", "productId", o)
            }), e.hoverAnalytics.register(n, function () {
                e.currentAnalytics.trackUniqueEvent(r, "hovered", "productId", o)
            })
        }
        var n = {};
        return t.prototype.getMethod = function () {
            return "badge"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.selector = e.widgets.badge.selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "old"
        }, n = {
            ready: function () {
                i.call(this)
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Basic = function (e) {
        function t(t, i, n, o) {
            var r = this;
            r._controller = t, r.element = i, r.type = (n || "reviews")
                .toLowerCase(), r.settings = {
                    page: o || 1
                }, r.query_mode = !1;
            var s = i.getAttribute("data-host-widget");
            s && (r.settings["host-widget"] = s);
            var a = i.getAttribute("data-product-id");
            a && (r.settings.pid = a);
            var l = r._controller.userSettings.review_with_pictures;
            if (l)
                if (r.settings.is_mobile = e.isMobile(), l.settings.number_of_pictures_per_review) {
                    var p = parseInt(l.settings.number_of_pictures_per_review);
                    r.settings.pictures_per_review = Math.min(p, u)
                } else r.settings.pictures_per_review = d;
            "undefined" != typeof r._controller.userSettings.css_preview && (r.settings.css_preview = r._controller.userSettings.css_preview);
            for (var g in c) c.hasOwnProperty(g) && r.on(g, c[g])
        }

        function i() {
            var t = this.getType()
                .substring(0, this.type.length - 1),
                i = e[e.capitalize(t)];
            if (i && "function" == typeof i.load) {
                this.content = [];
                for (var n = this.getElement()
                        .getElementsByClassName("yotpo-" + t), o = 0; o < n.length; ++o) {
                    var r = i.load(n[o]);
                    this.content.push(r)
                }
            }
        }

        function n() {
            var t, i, n = this,
                r = this._controller.getAppKey(),
                s = n.element.querySelectorAll(".yotpo-review .social-link");
            for (t = 0, i; i = s[t]; t++) e.addEventListener(i, "click", function () {
                var t = this.getAttribute("data-network");
                e.currentAnalytics.trackEvent(n.analyticsCategory, "clicked_on", "share_published_" + t)
            });
            var a, l = n.element.querySelectorAll(".yotpo-review .yotpo-footer .yotpo-syndication-reference .syndication-reference-link");
            for (t = 0, a; a = l[t]; t++) e.addEventListener(a, "click", function () {
                e.currentAnalytics.trackEvent("reviews", "clicked_on", "syndication_link", "onsite_v2", r)
            });
            o.call(this);
            var c, d, u, p, g;
            for (c = this.getElement()
                .getElementsByClassName("yotpo-review-images-wrapper"), d = this.getElement()
                .getElementsByClassName("image-review"), t = 0; p = c[t]; t++) g = p.getElementsByClassName("image-review"), e.currentAnalytics.trackEvent("reviews", "loaded", "review_image", g.length), e.currentInview.register(p, function () {
                e.currentAnalytics.trackEvent("reviews", "shown", "review_image", "onsite_v2", r)
            });
            for (t = 0; u = d[t]; t++) {
                var h = d[t].getAttribute("data-image-id");
                ! function (t) {
                    e.currentAnalytics.trackUniqueEvent("pictures_in_reviews", "loaded", "image", t), e.currentInview.registerinModal(u, function () {
                        e.currentAnalytics.trackUniqueEvent("pictures_in_reviews", "shown", "image", t)
                    }, !0), e.hoverAnalytics.register(u, function () {
                        e.currentAnalytics.trackUniqueEvent("pictures_in_reviews", "hovered", "image", this.getAttribute("data-image-id"))
                    }), e.addEventListener(u, "click", function () {
                        e.currentAnalytics.trackUniqueEvent("pictures_in_reviews", "clicked_on", "image", t)
                    })
                }(h)
            }
        }

        function o() {
            for (var t, i = ["review", "question"], n = this._controller.getAppKey(), o = 0; t = i[o]; o++)
                for (var r, s = this.getElement()
                        .getElementsByClassName("write-first-" + t + "-button"), a = 0; r = s[a]; a++) e.currentInview.register(r, function (t) {
                    return function () {
                        e.currentAnalytics.trackEvent(t + "s", "shown", "be_the_first_button", "onsite_v2", n)
                    }
                }(t)), e.addEventListener(r, "click", function (t) {
                    return function () {
                        e.currentAnalytics.trackEvent(t + "s", "clicked_on", "be_the_first_button", "onsite_v2", n)
                    }
                }(t))
        }

        function r() {
            this.reviewImageWrappers = this.element.getElementsByClassName("yotpo-review-images-wrapper");
            var t = this.element.querySelector(".yotpo-lightbox");
            t && (this.contentProvider = new e.SingleReviewContentProvider, this.lightbox = new e.Widgets.Lightbox(this._controller, t, this.contentProvider, p, t, this.settings.pictures_per_review));
            for (var i = 0; i < this.reviewImageWrappers.length; i++) s.call(this, this.reviewImageWrappers[i])
        }

        function s(e) {
            if (a(e), this.lightbox) {
                var t = e.getElementsByClassName("image-review");
                l.call(this, t)
            }
        }

        function a(t) {
            new e.Modules.DynamicLayout(t, {
                animation: !0
            })
        }

        function l(e) {
            for (var t = this, i = 0; i < e.length; i++) e[i].onclick = function () {
                t.contentProvider.clear(), t.lightbox.open(this)
            }
        }
        var c = {},
            d = 3,
            u = 15;
        t.prototype.getMethod = function () {
            return "reviews" === this.type && this.query_mode ? "queried_reviews" : this.type
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getType = function () {
            return this.type
        }, t.prototype.getContent = function () {
            return this.content || []
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.refresh = function () {
            e.Modules.Refresh.perform.call(this)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getTemplate = function () {
            return this.template = this.template || (this.getElement()
                .getElementsByClassName("yotpo-template") || [])[0], this.template
        }, t.prototype.supportsPagination = function () {
            return !isNaN(this.settings.page) && "main_widget" == this.settings["host-widget"] && "reviews" == this.type
        }, c = {
            ready: function () {
                e.Modules.Pagination.init.call(this), n.call(this), r.call(this), i.call(this), e.Modules.Handle.popup.call(this)
            },
            pageChanged: function () {
                this.isFilteredReviews || this.refresh()
            }
        };
        var p = {
            track: function (t, i, n) {
                "loaded" == t && e.currentAnalytics.trackEvent("reviews", "loaded", "review_image_gallery", n)
            },
            category: "pictures_in_reviews_popup"
        };
        return t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Bottomline = function (e) {
        function t(t, i) {
            var n = this;
            n.analyticsCategory = "star_rating", n._controller = t, n.element = i, n.settings = {
                pid: i.getAttribute("data-product-id"),
                link: i.getAttribute("data-url"),
                skip_average_score: i.getAttribute("data-skip-average-score") || !e.getMainWidget(n._controller)
            }, e.getMainWidget(n._controller) && (n.settings.main_widget_pid = e.getMainWidget(n._controller)
                .settings.pid);
            var o = {
                lang: "locale",
                demo: "demo",
                "product-readonly": "product-readonly"
            };
            for (var s in o) n.element.getAttribute("data-" + s) && (n.settings[o[s]] = n.element.getAttribute("data-" + s));
            for (var a in r) r.hasOwnProperty(a) && n.on(a, r[a]);
            var l = n.element.querySelectorAll(".aggregated-product-related-fields");
            e.CustomFields.bindProductRelatedFields(l), e.hoverAnalytics.register(n.element, function () {
                e.currentAnalytics.trackUniqueEvent(n.analyticsCategory, "hovered")
            })
        }

        function i() {
            for (var t, i = this, n = i.element.querySelectorAll(".standalone-bottomline"), o = 0; t = n[o]; o++) e.addEventListener(t, "click", function () {
                e.currentAnalytics.trackEvent(i.analyticsCategory, "clicked_on", null, i.settings.pid)
            });
            var r = i.element.getElementsByClassName("yotpo-star-distribution");
            if (r.length) {
                for (var s = e.getMainWidget(i._controller)
                        .getActiveSource(), a = s.getSettings()
                        .pid, l = ["review-stars", "yotpo-sum-reviews", "yotpo-star-distribution-graph"], o = 0; o < l.length; o++)
                    for (var c = r[0].getElementsByClassName(l[o]), d = 0; d < c.length; d++) {
                        var u = c[d];
                        if (e.hasClass(u, "yotpo-distribution-clickable")) {
                            var p = parseInt(u.getAttribute("data-score-distribution"));
                            e.addEventListener(u, "click", function (t) {
                                return function () {
                                    e.currentAnalytics.trackEvent("reviews", "clicked_on", "star_distribution", a + ":" + t)
                                }
                            }(p))
                        }
                    }
                var g = r[0].getElementsByClassName("yotpo-star-distribution-footer")[0].getElementsByTagName("span")[0];
                e.addEventListener(g, "click", function () {
                    e.currentAnalytics.trackEvent("reviews", "clicked_on", "star_distribution_show_all", a)
                })
            }
        }

        function n() {
            var t = this,
                i = t.element.getElementsByClassName("yotpo-star-distribution");
            if (i.length) {
                for (var n = 0, o = ["review-stars", "yotpo-sum-reviews", "yotpo-star-distribution-graph"], r = 0; r < o.length; r++)
                    for (var s = i[0].getElementsByClassName(o[r]), a = 0; a < s.length; a++) {
                        var l = s[a];
                        e.hasClass(l, "yotpo-distribution-clickable") && (l.onclick = function () {
                            e.show(i[0].getElementsByClassName("yotpo-star-distribution-footer")[0]), t.trigger("starDistributionClicked", this)
                        }, "yotpo-sum-reviews" == o[r] && (n += parseInt(l.innerHTML.replace(/[()]/g, ""))))
                    }
                i[0].getElementsByClassName("yotpo-star-distribution-show-all")[0].onclick = function () {
                    t.trigger("showAllReviews", n)
                }
            }
        }

        function o() {
            var e = this,
                t = e.element.getElementsByClassName("yotpo-product-related-fields");
            if (t.length) {
                var i = t[0].getElementsByClassName("yotpo-product-related-show-all")[0];
                i.onclick = function () {
                    e.trigger("showCustomdFields")
                };
                var i = t[0].getElementsByClassName("yotpo-product-related-show-less")[0];
                i.onclick = function () {
                    e.trigger("hideCustomdFields")
                }
            }
        }
        var r = {};
        return t.selector = e.widgets.bottomline.selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getMethod = function () {
            return "bottomline"
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.refresh = function () {
            e.Modules.Refresh.perform.call(this)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "old"
        }, r = {
            ready: function () {
                var t = this;
                n.call(t), o.call(t), i.call(t);
                var r = e.getMainWidget(t._controller);
                if (t.settings.pid && this.element.querySelectorAll(".standalone-bottomline")
                    .length > 0) {
                    var s = this.settings.pid;
                    r ? e.currentAnalytics.trackEvent("star_rating", "loaded", "product_page", s) : e.currentAnalytics.trackEvent("star_rating", "loaded", "category_page", s), e.currentInview.register(t.element, function () {
                        e.currentAnalytics.trackEvent("star_rating", "shown", null, s)
                    })
                }
                t.getElement()
                    .querySelectorAll(".star-clickable")
                    .length > 0 && e.addEventListener(t.getElement(), "click", function () {
                        e.scrollToReviewsTabInMainWidget(t._controller)
                    })
            },
            starDistributionClicked: function (t) {
                var i = this;
                e.scrollToReviewsTabInMainWidget(i._controller);
                var n = parseInt(t.getAttribute("data-score-distribution")),
                    o = (e.getMainWidget(i._controller), e.getMainWidget(i._controller)
                        .getActiveSource());
                o.getSettings()
                    .star = n, this.getElement()
                    .getAttribute("data-demo") && (o.getSettings()
                        .demo = !0), o.getSettings()
                    .page = 1, e.togglePreLoader(o.getElement()), o.refresh();
                for (var r = ["review-stars", "yotpo-sum-reviews", "yotpo-star-distribution-graph"], s = 0; s < r.length; s++)
                    for (var a = this.getElement()
                            .getElementsByClassName(r[s]), l = 0; l < a.length; l++) {
                        var t = a[l];
                        if (parseInt(t.getAttribute("data-score-distribution")) != n) e.addClass(t, "yotpo-distribution-unactive");
                        else if (e.removeClass(t, "yotpo-distribution-unactive"), "yotpo-sum-reviews" == r[s]) {
                            var c = t.innerHTML;
                            document.getElementsByClassName("yotpo-reviews-nav-tab-sum")[0].innerHTML = c
                        }
                    }
            },
            showAllReviews: function (t) {
                var i = this;
                e.scrollToReviewsTabInMainWidget(i._controller);
                var n = e.getMainWidget(i._controller);
                e.hide(document.getElementsByClassName("yotpo-star-distribution-footer")[0]);
                var o = n.getActiveSource();
                delete o.getSettings()
                    .star, o.getSettings()
                    .page = 1, this.getElement()
                    .getAttribute("data-demo") && (o.getSettings()
                        .demo = !0), e.togglePreLoader(o.getElement()), o.refresh(), document.getElementsByClassName("yotpo-reviews-nav-tab-sum")[0].innerHTML = "(" + t + ")";
                for (var r = this.getElement()
                        .getElementsByClassName("yotpo-star-distribution-graph"), s = 0; s < r.length; s++) {
                    var a = r[s];
                    e.removeClass(a, "yotpo-distribution-unactive")
                }
            },
            showCustomdFields: function () {
                for (var t = this.getElement(), i = t.getElementsByClassName("yotpo-product-related-fields-column")[0], n = i.querySelectorAll(".yotpo-product-related-field-name.yotpo-hidden"), o = 0; o < n.length; o++) e.show(n[o], "block");
                for (var r = i.querySelectorAll(".yotpo-rating-bars.yotpo-hidden, .yotpo-size-bars.yotpo-hidden"), o = 0; o < r.length; o++) e.show(r[o], "block");
                e.hide(t.getElementsByClassName("yotpo-product-related-show-all")[0]), e.show(t.getElementsByClassName("yotpo-product-related-show-less")[0], "block")
            },
            hideCustomdFields: function () {
                for (var t = this.getElement(), i = t.getElementsByClassName("yotpo-product-related-fields-column")[0], n = i.getElementsByClassName("yotpo-product-related-field-name"), o = 5; o < n.length; o++) e.hide(n[o]);
                for (var r = i.querySelectorAll(".yotpo-product-related-fields-bars > .yotpo-field-bars-container > .yotpo-rating-bars, .yotpo-product-related-fields-bars > .yotpo-field-bars-container > .yotpo-size-bars"), o = 5; o < r.length; o++) e.hide(r[o]);
                e.hide(t.getElementsByClassName("yotpo-product-related-show-less")[0]), e.show(t.getElementsByClassName("yotpo-product-related-show-all")[0], "block")
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Carousels = function (e) {
        function t(t, i) {
            var n = this;
            n._controller = t, n.element = i, n.autoplay_enabled = n.element.getAttribute("data-autoplay-enabled"), n.settings = {
                images_to_display: u(n.element.clientWidth)
            };
            for (var o in F) {
                var r = F[o],
                    s = n.element.getAttribute(r);
                "undefined" != typeof s && (n.settings[o] = s)
            }
            "site" == n.element.getAttribute("data-type") ? n.settings.pid = "yotpo_site_reviews" : "both" == n.element.getAttribute("data-type") && (n.settings.include_site_reviews = !0), "top_rated" == n.element.getAttribute("data-mode") && (n.settings.best = !0), "manual" == n.element.getAttribute("data-mode") && (n.settings.manual = !0), n.element.getAttribute("data-review-ids") && (n.settings.id = n.element.getAttribute("data-review-ids")
                .split(",")), n.element.getAttribute("data-count") && (n.settings.per_page = parseInt(n.element.getAttribute("data-count")), n.settings.per_page > 9 && (n.settings.per_page = 9)), n.carouselSpeed = parseInt(n.settings.autoplay_speed || I), n.carouselSpeed < T && (n.carouselSpeed = T);
            for (var a in q) q.hasOwnProperty(a) && n.on(a, q[a]);
            e.hoverAnalytics.register(n.element, function () {
                e.currentAnalytics.trackUniqueEvent("carousel", "hovered")
            })
        }

        function i() {
            function e(e) {
                if (i.autoplay_enabled) {
                    var n, o = "visible",
                        r = "hidden",
                        s = {
                            focus: o,
                            focusin: o,
                            pageshow: o,
                            blur: r,
                            focusout: r,
                            pagehide: r
                        };
                    e = e || window.event, n = e.type in s ? s[e.type] : this[t] ? "hidden" : "visible", "hidden" == n ? i.slider.pause() : i.slider.play()
                }
            }
            var t = "hidden",
                i = this;
            t in document ? document.addEventListener("visibilitychange", e) : (t = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", e) : (t = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", e) : (t = "msHidden") in document ? document.addEventListener("msvisibilitychange", e) : "onfocusin" in document ? document.onfocusin = document.onfocusout = e : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = e, void 0 !== document[t] && e({
                type: document[t] ? "blur" : "focus"
            })
        }

        function n() {
            this.settings.data_show_navigation && (u(this.getCarouselContainerWidth()) >= this.carouselReviewsCount ? e.hide(this.getElement()
                .querySelector(".carousel-arrows")) : e.show(this.getElement()
                .querySelector(".carousel-arrows")))
        }

        function o() {
            return this.autoplay_enabled && u(this.getCarouselContainerWidth()) < this.carouselReviewsCount
        }

        function r() {
            var t = this.getElement(),
                i = this,
                n = 0,
                o = 0;
            t.querySelector(".yotpo-icon-left-arrow-thin")
                .onclick = function () {
                    new Date - n < x || (n = new Date, i.slider.left(), e.currentAnalytics.trackEvent("carousel", "clicked_on", "previous"))
                }, t.querySelector(".yotpo-icon-right-arrow-thin")
                .onclick = function () {
                    new Date - o < x || (o = new Date, i.slider.right(), e.currentAnalytics.trackEvent("carousel", "clicked_on", "next"))
                }
        }

        function s() {
            var t = this.getElement(),
                i = this;
            t.onmouseover = function () {
                i.slider.pause()
            }, t.onmouseout = function () {
                i.slider.play()
            };
            for (var n = function (t, i) {
                    for (var n = t.querySelectorAll(".product-link-container"), o = 0; o < n.length; o++) n[o].querySelector(".carousel-review-product-text") && (n[o].onmouseover = function () {
                        this.querySelector(".carousel-review-product-text")
                            .style.textDecoration = "underline"
                    }, n[o].onmouseout = function () {
                        this.querySelector(".carousel-review-product-text")
                            .style.textDecoration = "none"
                    }), n[o].onclick = function () {
                        return e.currentAnalytics.trackEvent("carousel", "clicked_on", "review", i), !0
                    }
                }, o = t.querySelectorAll(".single-carousel.review"), r = 0; r < o.length; r++) {
                var s = o[r];
                n(s, s.getAttribute("data-review-id")), e.currentAnalytics.trackReview(s, "carousel", "loaded"), e.hoverAnalytics.register(s, function () {
                    e.currentAnalytics.trackReview(this, "carousel", "hovered")
                }), e.currentInview.register(s, function (t) {
                    return function () {
                        e.currentAnalytics.trackReview(t, "carousel", "shown")
                    }
                }(s))
            }
        }

        function a(e) {
            for (var t = e.querySelectorAll(".carousel-review-title"), i = 0; i < t.length; i++) t[i].setAttribute("full-headline", t[i].innerHTML.trim()), t[i].innerHTML.trim()
                .length > y && (t[i].innerHTML = t[i].innerHTML.trim()
                    .substring(0, y - 3) + "...")
        }

        function l(t) {
            function i(i, n, o, r) {
                "icon-yotpo-top-corner" == r ? (o -= k, n += f / 2) : "icon-yotpo-right-corner" == r ? (o += S, n += f) : (o += S, n -= A), i.style.left = n + "px", i.style.top = o + "px", e.removeClassList(i, ["icon-yotpo-top-corner", "icon-yotpo-right-corner", "icon-yotpo-left-corner"]), e.addClass(i, r), e.show(t.querySelector(".yotpo-corner"))
            }
            var n, o, r = t.querySelector(".carousel-tool-tip");
            r.querySelector(".tool-tip-header-span")
                .innerHTML = this.reviewTitle, r.querySelector(".tool-tip-content")
                .innerHTML = this.reviewBody;
            var s = e.getPosition(this),
                a = e.getPosition(t),
                l = s.x - a.x,
                c = s.y - a.y,
                d = u(t.clientWidth);
            3 == d ? (t.querySelector(".yotpo .scroller")
                .getBoundingClientRect()
                .right - this.getBoundingClientRect()
                .right < f ? (l -= f + _, n = "icon-yotpo-right-corner") : (l += b, n = "icon-yotpo-left-corner"), o = -w) : (o = w, l -= f / 2 - b, n = "icon-yotpo-top-corner"), 0 > l && (l = 0), c += o;
            var p = t.querySelector(".carousel-tool-tip .yotpo-tool-tip");
            p.style.left = l + "px", p.style.top = c + "px", i(t.querySelector(".yotpo-corner"), l, c, n), p.style.display = "block"
        }

        function c(t) {
            var i = this,
                n = document.createElement("div"),
                o = this.getElement();
            return n.className = "carousel-read-more", n.innerHTML = o.querySelector(".carousel-read-more-text")
                .getAttribute("data-text"), n.reviewTitle = t.querySelector(".carousel-review-title")
                .getAttribute("full-headline"), n.reviewBody = t.querySelector(".carousel-review-body")
                .fullReview.substring(0, h), n.onmouseover = function () {
                    i.slider.pause(), l.call(this, o)
                }, n.onmouseout = function () {
                    o.querySelector(".carousel-tool-tip .yotpo-tool-tip")
                        .style.display = "none", e.hide(o.querySelector(".yotpo-corner"))
                }, n.onclick = function (e) {
                    e.stopPropagation()
                }, n
        }

        function d(t) {
            for (var i = 0; i < t.length; i++)
                for (var n = t[i].querySelectorAll(".carousel-review-body"), o = 0; o < n.length; o++) n[o].innerHTML = n[o].innerHTML.trim(), n[o].fullReview = n[o].innerHTML, n[o].innerHTML.length >= v && (n[o].innerHTML = n[o].innerHTML.substring(0, v) + "...", n[o].appendChild(c.call(this, t[i])), e.show(this.getElement()
                    .querySelector(".yotpo-reviews-carousel .carousel-tool-tip")))
        }

        function u(e) {
            var t;
            return e >= 960 ? t = 3 : e >= 600 && 960 > e ? t = 2 : 600 > e && (t = 1), t
        }

        function p() {
            "undefined" != typeof this.slider && delete this.slider;
            var t = this.element.getElementsByClassName("yotpo-carousel")[0],
                i = this.settings.images_to_display + 1,
                n = this.carouselReviewsCount < i ? 0 : i;
            this.slider = new e.Modules.Slide(t, {
                imageCount: this.settings.per_page || this.carouselReviewsCount,
                displayWindowCount: u(this.getCarouselContainerWidth()),
                initialPosition: n,
                slideDirection: E,
                delayInterval: this.carouselSpeed,
                autoSlide: o.call(this),
                rtl: "rtl" == this._controller.userSettings.direction,
                animationDuration: P
            }), this.slider.onSlide(function () {
                e.currentInview.verifyInview()
            })
        }
        var g = 403,
            h = 400,
            m = 300,
            f = 298,
            y = 57,
            v = 130,
            b = 90,
            w = 20,
            _ = 15,
            S = 20,
            C = 30,
            k = 10,
            A = 9,
            E = "right",
            x = 1e3,
            I = 3e3,
            T = 1500,
            P = 1450,
            F = {
                autoplay_speed: "data-autoplay-speed",
                data_show_navigation: "data-show-navigation",
                data_show_bottomline: "data-show-bottomline",
                data_header_customisation_enabled: "data-header-customisation-enabled",
                data_header_customisation_text: "data-header-customisation-text",
                data_header_customisation_font_size: "data-header-customisation-font-size",
                data_header_customisation_color: "data-header-customisation-color",
                data_header_customisation_alignment: "data-header-customisation-alignment",
                data_background_color: "data-background-color",
                data_testimonials_page_enabled: "data-testimonials-page-enabled",
                data_testimonials_page_link: "data-testimonials-page-link",
                data_testimonials_page_text: "data-testimonials-page-text",
                demo: "data-demo",
                pid: "data-product-id"
            },
            q = {};
        return t.prototype.getCarouselContainerWidth = function () {
            return this.getElement()
                .clientWidth
        }, t.prototype.getMethod = function () {
            return "carousels"
        }, t.selector = e.widgets.carousels.selector, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.refresh = function () {
            e.Modules.Refresh.perform.call(this)
        }, t.prototype.getLayout = function () {
            return "new"
        }, q = {
            ready: function () {
                if (this.is("initialized")) {
                    var t = this,
                        n = this.getElement();
                    this.carouselReviewsCount = parseInt(n.querySelector(".carousel-display-wrapper")
                        .getAttribute("data-attr-total-reviews")), p.call(this), this.slider.start(), i.call(t), e.currentInview.register(t.element, function () {
                        e.currentAnalytics.trackEvent("carousel", "shown", null, null)
                    }), n.querySelector(".all-reviews") && (n.querySelector(".all-reviews")
                        .onclick = function () {
                            e.currentAnalytics.trackEvent("carousel", "clicked_on", "read_more", null)
                        }), t.settings.direction = e.getComputedStyle(t.element, "direction"), this.settings.data_show_navigation && r.call(this), s.call(this);
                    for (var o = n.querySelectorAll(".single-carousel"), l = 0; l < o.length; l++) a(o[l]);
                    d.call(this, o)
                }
            },
            pageChanged: function () {
                var e = this;
                e.refresh()
            },
            sizeCalculated: function (t) {
                if (this.is("initialized")) {
                    var i, o, r, s = this.getCarouselContainerWidth(),
                        a = u(s),
                        l = this.getElement();
                    if ("undefined" != typeof this.slider) {
                        this.slider.pause(), p.call(this), this.slider.start(), l.style.maxWidth = window.innerWidth - C + "px", "yotpo-size-7" === t || "yotpo-size-3" === t ? (i = "big-version", o = "small-version", r = g) : (i = "small-version", o = "big-version", r = m);
                        var c = (s - a * r) / a,
                            d = l.querySelector(".carousel-display-wrapper"),
                            h = l.querySelectorAll(".single-carousel");
                        !this.settings.data_testimonials_page_enabled || "yotpo-size-1" !== t && "yotpo-size-2" !== t && "yotpo-size-3" !== t || e.addClass(d, "has-testimonials-link");
                        for (var f = 0; f < h.length; f++) e.show(h[f].querySelector("." + i)), e.hide(h[f].querySelector("." + o)), h[f].style.marginRight = c + "px";
                        this.slider.play(), n.call(this), this.getElement()
                            .querySelector(".scroller")
                            .style.width = s + "px";
                        var y = this.carouselReviewsCount - 1,
                            v = y > 0 ? "has_reviews" : "no_reviews";
                        e.currentAnalytics.trackUniqueEvent("carousel", "loaded", v)
                    }
                }
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Embedded = function (e) {
        function t(t, i) {
            var o = this;
            o.analyticsCategory = "embed", o._controller = t, o.element = i, o.sources = {}, o.settings = {
                per_page: o.element.getAttribute("data-reviews"),
                view: {
                    type: o.element.getAttribute("data-product-id"),
                    layout: o.element.getAttribute("data-layout"),
                    width: o.element.getAttribute("data-width"),
                    headerText: o.element.getAttribute("data-header-text"),
                    transparency: o.element.getAttribute("data-transparency"),
                    headerBackgroundColor: o.element.getAttribute("data-header-background-color"),
                    bodyBackgroundColor: o.element.getAttribute("data-body-background-color"),
                    fontSize: o.element.getAttribute("data-font-size"),
                    fontColor: o.element.getAttribute("data-font-color")
                }
            };
            for (var r in n) n.hasOwnProperty(r) && o.on(r, n[r]);
            e.hoverAnalytics.register(o.element, function () {
                e.currentAnalytics.trackUniqueEvent(o.analyticsCategory, "hovered")
            })
        }

        function i() {
            for (var t, i = this, n = i.element.querySelectorAll(".embedded-item-link"), o = 0; t = n[o]; o++) {
                var r = t.getAttribute("data-widget-type"),
                    s = t.getAttribute("data-product-id");
                e.addEventListener(t, "click", function () {
                    e.currentAnalytics.trackEvent(i.analyticsCategory, "clicked_on", r, s)
                })
            }
        }
        var n = {};
        return t.selector = e.widgets.embedded.selector, t.prototype.getMethod = function () {
            var e = null;
            return "yotpo_global_reviews" == this.settings.view.type ? e = "reviews" : "top_rated_products" == this.settings.view.type && (e = "products"), "embedded_widget_" + e
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "old"
        }, n = {
            ready: function () {
                var t = this,
                    n = this.getMethod();
                t.sources[n] = new e.Widgets.Basic(t._controller, t.getElement(), n), e.copy(t.settings, t.sources[n]), i.call(this), e.Modules.Handle.tooltip.call(this.getElement());
                var o;
                "embedded_widget_reviews" == n ? o = "recent_reviews" : "embedded_widget_products" == n && (o = "top_products"), e.currentAnalytics.trackEvent("embed", "loaded", o), e.currentInview.register(t.element, function () {
                    e.currentAnalytics.trackEvent("embed", "shown", o)
                })
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Main = function (e) {
        function t(t, i) {
            var n = this;
            n._controller = t, n.element = i, n.sources = {}, n.query, n.settings = {
                pid: n.element.getAttribute("data-product-id")
            };
            var o = e.getURLParameter(location.search, "yoReviewsPage");
            o && Number.isInteger(Number(o)) && (n.settings.page = parseInt(o)), e.getURLParameter(location.search, "yo_intentions") && (n.settings.force_intentions = e.getURLParameter(location.search, "yo_intentions")), n.element.getAttribute("data-product-tags") && (n.settings.tags = n.element.getAttribute("data-product-tags"));
            var r = n._controller.getUserSettings(),
                s = {
                    lang: "locale",
                    demo: "demo",
                    mode: "mode",
                    "product-readonly": "product-readonly",
                    "write-only": "write-only"
                };
            "undefined" !== n.element.getAttribute("data-per_page") && (s.per_page = "per_page");
            for (var a in s) n.element.getAttribute("data-" + a) && (n.settings[s[a]] = n.element.getAttribute("data-" + a));
            var l = "undefined" != typeof r.questions_and_answers_standalone && r.questions_and_answers_standalone !== !1;
            if (l || delete n.settings.mode, n.analyticsCategory = "reviews", n.isWriteOnly() && (n.analyticsCategory += "_write_only"), "undefined" != typeof r.widget_v2 && "undefined" !== r.widget_v2.settings.display_names) {
                var c = e.compact(r.widget_v2.settings.display_names);
                n.settings.order_metadata_fields = {};
                for (var d in c) n.settings.order_metadata_fields[d] = Object.keys(c[d])
            }
            "undefined" != typeof r.css_preview && (n.settings.css_preview = r.css_preview);
            for (var u in T) T.hasOwnProperty(u) && n.on(u, T[u]);
            e.hoverAnalytics.register(n.element, function () {
                e.currentAnalytics.trackUniqueEvent(n.analyticsCategory, "hovered")
            });
            var p = n.element.getAttribute("data-prefilter");
            if (p) try {
                var g = JSON.parse(p);
                void 0 != g.product_properties && (g.order_product_properties = g.product_properties, delete g.product_properties), void 0 != g.product_custom_properties && (g.order_product_custom_properties = g.product_custom_properties, delete g.product_custom_properties);
                var h = [];
                for (var m in g)
                    for (var f in g[m]) h.push({
                        subType: m,
                        question: f,
                        answers: g[m][f]
                    });
                n.settings.prefilter_fields = JSON.stringify(h)
            } catch (y) {
                e.safeConsole("Failed to parse prefilter fields settings: " + y, "error")
            }
            var b = n.element.getAttribute("data-presorting");
            if (b) try {
                var w = JSON.parse(b);
                w.forEach(function (e) {
                    "product_custom_property" == e.type && (e.type = "order_product_custom_property"), "product_property" == e.type && (e.type = "order_product_property")
                }), n.settings.presorting_fields = JSON.stringify(w)
            } catch (y) {
                e.safeConsole("Failed to parse presorting fields settings: " + y, "error")
            }
            if (e.getURLParameter(location.search, "yo_link_code")) {
                var _ = e.getURLParameter(location.search, "yo_link_code");
                e.ajax("http://api.yotpo.com/go/" + _, function () {
                    e.safeConsole("Called a link")
                })
            }
            v.call(n)
        }

        function i() {
            if ("true" === this.element.getAttribute("data-open-submit-review")) {
                var t = this.element.getElementsByClassName("write-review-wrapper")[0];
                t && (e.addClass(t, "visible"), t.style.display = "block")
            }
        }

        function n(t, i, n) {
            var o = this.element.querySelectorAll('div[data-type="crfs"], mobile-single-filter')
                .length,
                r = this.element.querySelectorAll('div[data-type="orders"], mobile-single-filter')
                .length,
                s = this.element.querySelector(".reviews-amount")
                .innerHTML.trim()
                .split(" ")[0],
                a = {
                    met_requirements: !0,
                    desktop_topics_count: t.length,
                    desktop_suggested_topics: n ? t : [],
                    mobile_topics_count: i.length,
                    mobile_suggested_topics: n ? i : [],
                    custom_fields_count: o,
                    reviews_count: parseInt(s),
                    metadata_fields_count: r,
                    free_text_included: this._controller.userSettings.widget_v2.settings.display_free_text_filters,
                    page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(this)
                };
            if (n) {
                var l = this.element.getAttribute("data-prefilter"),
                    c = this.element.getAttribute("data-presorting");
                l && (a.prefilter = l), c && (a.presorting = c)
            }
            return a
        }

        function o() {
            function t(t, n) {
                i.switchSearchInProgressView(!0), t && i.filtersManager.removeFilter(!0, A.topics, t.toLowerCase()), n && i.filtersManager.addFilter(!0, A.topics, n.toLowerCase()), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.setClearAllButtonsState.call(i), e.FilterAndSearch.Analytics.AnalyticsNotifier.notifyEvent.call(i, A.topics, n, i.settings.pid)
            }
            var i = this;
            i.reviewsContainerElement = i.element.querySelector(".yotpo-nav-content"), i.desktopSuggestedTopics = [], i.mobileSuggestedTopics = [];
            var o = i._controller.userSettings.review_with_pictures;
            if (i.reviewsWithPicturesEnabled = o && "1" === o.settings.main_widget_visible, void 0 != i.sources.reviews && null != i.reviewsContainerElement && null != i.reviewsContainerElement.querySelector(".yotpo-reviews-header")) {
                i.filtersManager = new e.FiltersStateManager(i._controller, "Main", i.sources.reviews.settings), i.settings.presorting_fields && i.filtersManager.AddSetting("presorting_fields", i.settings.presorting_fields), i.filtersManager.subscribeToFiltersUpdate(i), e.Modules.Handle.desktopDropDown.call(this, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSelectSort, i.reviewsContainerElement, "sorting"), i.clearAllButtons = i.getElement()
                    .querySelectorAll(".desktop-clear-all-btn, .mobile-clear-filters-btn");
                for (var r = 0; r < i.clearAllButtons.length; r++) e.addEventListener(i.clearAllButtons[r], "click", function () {
                    e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.clearAllFilters.call(i)
                });
                if (null !== i.reviewsContainerElement.querySelector(".yotpo-reviews-filters")) {
                    e.Modules.Handle.desktopDropDown.call(this, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSelectFilter, i.reviewsContainerElement, "filters-dropdown"), i.mobileFiltersModal = new e.MobileFilterModal(i, i.reviewsContainerElement, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onMobileFiltersSubmitted);
                    var s = Array.prototype.slice.call(i.getElement()
                            .querySelectorAll(".mobile-single-filter")),
                        a = Array.prototype.filter.call(s, function (e) {
                            var t = e.querySelector(".mobile-filter-radio-button input");
                            return t != e.querySelector(".mobile-filter-radio-button input:checked")
                        });
                    if (a.length > 0) {
                        for (var l = 0; l < a.length; l++) i.filtersManager.addFilter(!0, a[l].getAttribute("data-type"), {
                            id: a[l].getAttribute("id")
                                .replace("radio-question-", ""),
                            sub_type: a[l].getAttribute("data-sub-type"),
                            question: a[l].getAttribute("data-question"),
                            value: a[l].querySelector("input:checked")
                                .getAttribute("data-value")
                        });
                        e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onMobileFiltersSubmitted.call(i)
                    }
                    var c = i.getElement()
                        .querySelector(".suggested-topics");
                    if (c) {
                        var d = c.querySelector("#suggested-topics-desktop-layout")
                            .querySelectorAll(".suggested-topic .suggested-topic-text"),
                            u = c.querySelector("#suggested-topics-mobile-layout")
                            .querySelectorAll(".suggested-topic .suggested-topic-text");
                        if (d)
                            for (var p = 0; p < d.length; p++) i.desktopSuggestedTopics.push(d[p].innerHTML.trim());
                        if (u)
                            for (var g = 0; g < u.length; g++) i.mobileSuggestedTopics.push(u[g].innerHTML.trim())
                    }
                    e.currentInview.register(i.reviewsContainerElement, function () {
                        try {
                            e.currentAnalytics.trackEvent("filter_reviews", "shown", i.settings.pid, null, n.call(i, i.desktopSuggestedTopics, i.mobileSuggestedTopics, !0))
                        } catch (t) {
                            e.safeConsole(t.message), e.currentAnalytics.trackEvent("filter_reviews", "shown", i.settings.pid, null, n.call(i, i.desktopSuggestedTopics, i.mobileSuggestedTopics))
                        }
                    });
                    try {
                        e.currentAnalytics.trackEvent("filter_reviews", "loaded", i.settings.pid, null, n.call(this, this.desktopSuggestedTopics, this.mobileSuggestedTopics, !0))
                    } catch (h) {
                        e.safeConsole(h.message), e.currentAnalytics.trackEvent("filter_reviews", "loaded", i.settings.pid, null, n.call(this, this.desktopSuggestedTopics, this.mobileSuggestedTopics))
                    }
                    if (c) {
                        var m = c.querySelectorAll("#suggested-topics-desktop-layout, #suggested-topics-mobile-layout");
                        e.SuggestedTopics.bind(m, t)
                    }
                    e.FreeTextSearch.bind.call(i, i.reviewsContainerElement, x, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onFreeTextSearchedCallBack, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onClearTextSearchedCallBack)
                }
            }
        }

        function r() {
            var t = this,
                i = t.getElement()
                .getElementsByClassName("yotpo-searchable-widget");
            if (i && i[0]) {
                var n = i[0],
                    o = n.getElementsByClassName("search-input")[0],
                    r = n.getElementsByClassName("suggested-topic-expand"),
                    a = n.getElementsByClassName("clear-topic")[0];
                t.searchLoader = n.getElementsByClassName("yotpo-search-loader")[0], t.searchRelatedTopics = n.getElementsByClassName("yotpo-related-topics-container")[0], t.suggestedTopicElements = n.getElementsByClassName("suggested-topic");
                for (var l = 0; l < t.suggestedTopicElements.length; l++) e.addEventListener(t.suggestedTopicElements[l], "click", function () {
                    for (var i = 0; i < t.suggestedTopicElements.length; i++) e.removeClass(t.suggestedTopicElements[i], "active-topic");
                    e.addClass(this, "active-topic"), e.removeClass(a, "yotpo-hidden"), e.addClass(t.searchRelatedTopics, "yotpo-hidden"), o.value = this.getElementsByClassName("suggested-topic-text")[0].innerHTML, t.query = o.value;
                    var n = "clicked_on";
                    s.call(t, n)
                });
                if (r && r[0]) {
                    var c = r[0];
                    e.addEventListener(c, "click", function () {
                        for (var i = 0; i < t.suggestedTopicElements.length; i++) e.removeClass(t.suggestedTopicElements[i], "yotpo-hidden");
                        e.addClass(this, "yotpo-hidden")
                    })
                }
                a && e.addEventListener(a, "click", function () {
                    o.value = "", e.addClass(this, "yotpo-hidden"), t.query = o.value;
                    for (var i = 0; i < t.suggestedTopicElements.length; i++) e.removeClass(t.suggestedTopicElements[i], "active-topic");
                    e.addClass(t.searchRelatedTopics, "yotpo-hidden"), s.call(t)
                }), o && e.addEventListener(o, "keydown", function (i) {
                    var n = i.which || i.keyCode;
                    if (e.removeClass(a, "yotpo-hidden"), ("" == o.value || 1 == o.value.length && (8 === n || 46 === n)) && e.addClass(a, "yotpo-hidden"), 13 === n) {
                        t.query = o.value, e.addClass(t.searchRelatedTopics, "yotpo-hidden");
                        for (var r = 0; r < t.suggestedTopicElements.length; r++) e.removeClass(t.suggestedTopicElements[r], "active-topic");
                        var l = "searched";
                        s.call(t, l)
                    }
                });
                var d = "true" === n.getAttribute("data-met-requirements"),
                    u = !d || "true" === n.getAttribute("data-is-dummy");
                e.currentAnalytics.trackEvent("searchable_widget", u ? "loaded_dummy" : "loaded", null, t.query, {
                    tags_count: t.suggestedTopicElements.length,
                    requirements_met: d
                }), e.currentInview.register(n, function () {
                    e.currentAnalytics.trackEvent("searchable_widget", u ? "shown_dummy" : "shown", null, t.query, {
                        tags_count: t.suggestedTopicElements.length,
                        requirements_met: d
                    })
                })
            }
        }

        function s(t) {
            var i = this,
                n = {};
            n.params = i.sources.reviews.getSettings(), "" == i.query ? (i.sources.reviews.query_mode = !1, n.method = "reviews") : (i.sources.reviews.query_mode = !0, n.method = "queried_reviews", n.params.query = i.query), e.removeClass(i.searchLoader, "yotpo-hidden"), i.sources.reviews.settings.page = 1, n.params.page = i.sources.reviews.settings.page, n.params.query_mode = i.sources.reviews.query_mode, i._controller.getBatch(function (n) {
                var o = [];
                try {
                    o = JSON.parse(n), o = o.shift()
                        .result;
                    var r = new DOMParser,
                        s = r.parseFromString(o, "text/html"),
                        l = s.querySelector(".total-reviews-search")
                        .getAttribute("total-reviews-search");
                    "undefined" != typeof i.sources.reviews.getElement() && (i.sources.reviews.getElement()
                        .innerHTML = o, i.tabs.element.getElementsByClassName("nav-tab-sum")[0].innerHTML = " (" + l + ")"), "function" == typeof i.sources.reviews.trigger && (i.sources.reviews.trigger("refreshed"), i.sources.reviews.trigger("ready")), "" != i.query && e.currentAnalytics.trackEvent("searchable_widget", t, null, i.query, {
                        results_count: l
                    }), a.call(i, s), e.addClass(i.searchLoader, "yotpo-hidden"), e.removeClass(i.searchRelatedTopics, "yotpo-hidden")
                } catch (c) {
                    e.safeConsole(c.message)
                }
            }, [n])
        }

        function a(e) {
            for (var t = [], i = e.querySelectorAll(".yotpo-data-related-topic"), n = 0; n < i.length; n++) t[n] = i[n].dataset.topic;
            if (t = t.slice(0, 5), this.searchRelatedTopics.textContent = "", 0 != t.length) {
                var o = document.createElement("span");
                o.setAttribute("class", "yotpo-related-topics-label"), o.textContent = "Also showing result for ", this.searchRelatedTopics.appendChild(o);
                var r, s;
                for (n = 0; n < t.length; n++) r = document.createElement("span"), r.setAttribute("class", "yotpo-related-topic"), r.textContent = t[n], this.searchRelatedTopics.appendChild(r), s = document.createElement("span"), s.setAttribute("class", "yotpo-related-topic-separator"), n < t.length - 2 ? (s.textContent = ", ", this.searchRelatedTopics.appendChild(s)) : n == t.length - 2 && (s.textContent = " and ", this.searchRelatedTopics.appendChild(s))
            }
        }

        function l() {
            var t = this,
                i = {
                    reviews: t.analyticsCategory,
                    questions: "questions" == t.get("settings")
                        .mode ? "questions_widget" : "questions"
                };
            e.forEach(["yotpo-reviews", "yotpo-questions"], function (n) {
                var o = t.getElement()
                    .getElementsByClassName(n)[0];
                if ("undefined" != typeof o) {
                    n = n.split("-")[1], t.sources[n] = new e.Widgets.Basic(t._controller, o, n, t.settings.page), t.sources[n].settings.pid = t.settings.pid, t.settings.demo && (t.sources[n].settings.demo = t.settings.demo), e.forEach(["locale", "mode"], function (e) {
                        t.settings[e] && (t.sources[n].settings[e] = t.settings[e])
                    }), t.sources[n].on("ready", function () {
                        w.call(t)
                    }), t.sources[n].trigger("ready");
                    var r = k(t.sources[n].content) ? "has_reviews" : "no_reviews";
                    e.currentAnalytics.trackUniqueEvent(i[n], "loaded", r, t._controller.getUserSetting("version")), t.sources[n].on("pageChanged", function () {
                        t.sources[n].isFilteredReviews && (t.switchSearchInProgressView(!0), t.filtersManager.fetchPage(t.sources[n].settings.page)), setTimeout(function () {
                            e.scrollToTop((t.get("tabs") || t.sources[n])
                                .getElement())
                        }, 300)
                    })
                }
            })
        }

        function c() {
            var t = this,
                i = t.getElement()
                .getElementsByClassName("promoted-products-box")[0];
            "undefined" != typeof i && (t.promotedProducts = new e.Widgets.PromotedProducts(t._controller, i), t.promotedProducts.trigger("ready"))
        }

        function d() {
            var t = this,
                i = t.getElement()
                .getElementsByClassName("yotpo-nav-primary")[0];
            i && (t.tabs = new e.Tabs(i), t.tabs.on("changed", function (e) {
                u.call(t, e)
            }))
        }

        function u(t) {
            var i = this,
                n = i.getActiveSource();
            e.SearchInProgress.hideSearchInProgress(this.element), n.getElement()
                .innerHTML.trim() || n.refresh();
            for (var o in i.forms) o != n.getType() && i.forms[o].clean();
            (0 != t.event.clientX || 0 != t.event.clientY) && e.currentAnalytics.trackEvent(n.getType(), "clicked_on", "tab")
        }

        function p() {
            var t = this.getElement()
                .getElementsByClassName("yotpo-messages");
            t.length > 0 && (this.messages = new e.Messages(t))
        }

        function g() {
            for (var t, i = this, n = i.element.querySelectorAll(".yotpo-thank-you .social-link"), o = 0; t = n[o]; o++) e.addEventListener(t, "click", function () {
                var t = this.getAttribute("data-network");
                e.currentAnalytics.trackEvent(i.analyticsCategory, "clicked_on", "share_" + t)
            });
            for (var r, s = i.element.querySelectorAll(".yotpo-thank-you .yotpo-icon-cross"), o = 0; r = s[o]; o++) e.addEventListener(r, "click", function () {
                e.currentAnalytics.trackEvent(i.analyticsCategory, "clicked_on", "close_review_posted")
            })
        }

        function h() {
            var e = this._controller,
                t = e.getUserSetting("ads"),
                i = e.getUserSetting("facebook_ads");
            t && i && "0" != i.settings.pixel_id && "0" != i.settings.init_pixel && this.settings.pid && fbq("track", "ViewContent", {
                content_ids: [this.settings.pid],
                content_type: "product"
            })
        }

        function m() {
            var t = this.getElement()
                .querySelector(".yotpo-bottomline");
            t && (e.Modules.Handle.tooltip.call(t), this.bottomline = new e.Widgets.Bottomline(this, t), this.bottomline.trigger("ready"))
        }

        function f() {
            var t = this.getElement()
                .querySelector(".questions");
            t && (this.questionsBottomline = new e.Widgets.QuestionsBottomline(this._controller, t), this.questionsBottomline.trigger("ready"))
        }

        function y() {
            window.setInterval(function () {
                e.currentInview.verifyInview()
            }, 1e3)
        }

        function v() {
            var t = this,
                i = "questions" == t.get("settings")
                .mode ? "questions_widget" : t.analyticsCategory;
            e.currentInview.register(t.element, function () {
                e.currentAnalytics.trackEvent(i, "shown"), t.trigger("sizeCalculated")
            })
        }

        function b() {
            var e = this,
                t = e.getElement()
                .querySelector(".yotpo-nav .status-bar .current");
            if (t) {
                var i = e.getActiveSource(),
                    n = i.getElement()
                    .querySelector(".yotpo-pager"),
                    o = n ? +n.getAttribute("data-per-page") : I;
                i.on("ready", function () {
                    var e = +(i.settings.page || 1),
                        n = (e - 1) * o + 1,
                        r = n - 1 + i.getContent()
                        .length;
                    i.getTemplate() && --r, t.innerHTML = n + " - " + r
                })
            }
        }

        function w() {
            for (var t = this, i = t.getElement()
                    .getElementsByClassName("yotpo-review"), n = 0; n < i.length; n++) {
                var o = i[n];
                e.currentAnalytics.trackReview(o, "reviews", "loaded"), e.hoverAnalytics.register(o, function () {
                    e.currentAnalytics.trackReview(this, "reviews", "hovered")
                }), e.currentInview.register(o, function (i) {
                    return function () {
                        if (_(t)) e.currentAnalytics.trackReview(i, "reviews", "shown", {
                            source: "shoppers_say"
                        });
                        else if (S(t)) e.currentAnalytics.trackReview(i, "reviews", "shown", {
                            source: "ticker"
                        });
                        else if (t.query) e.currentAnalytics.trackReview(i, "reviews", "shown", {
                            source: "searchable_widget"
                        });
                        else if (void 0 !== t.analyticsFilterId && 0 !== t.analyticsFilterId) {
                            var n = {
                                source: "filter_reviews",
                                filter_state_id: t.analyticsFilterId,
                                page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(t)
                            };
                            e.currentAnalytics.trackReview(i, "reviews", "shown", n)
                        } else e.currentAnalytics.trackReview(i, "reviews", "shown", {
                            source: "reviews"
                        })
                    }
                }(o))
            }
        }

        function _(e) {
            var t = C(e, "yotpo-shoppers-say");
            return t ? t.moreReviewsClicked : !1
        }

        function S(e) {
            var t = C(e, "ticker");
            return t ? t.moreReviewsClicked : !1
        }

        function C(e, t) {
            for (var i = e._controller.widgets, n = 0; n < i.length; n++)
                if (i[n].element.classList.contains(t)) return i[n];
            return null
        }

        function k(e) {
            return e && e.length > 1
        }
        var A, E, x, I = 10,
            T = {};
        return t.selector = e.widgets.main.selector, t.prototype.getMethod = function () {
            return "main_widget"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getSource = function (e) {
            return this.sources[e]
        }, t.prototype.getActiveSource = function () {
            return this.get("tabs") ? this.sources[this.get("tabs")
                .getActive()
                .getAttribute("data-type")] : null
        }, t.prototype.getAppKey = function () {
            return this._controller.getAppKey()
        }, t.prototype.get = function (e) {
            return this[e]
        }, t.prototype.getProductInfo = function () {
            if ("undefined" == typeof this.productInfo) {
                this.productInfo = {
                    sku: this.get("settings")
                        .pid,
                    product_title: this.getElement()
                        .getAttribute("data-name"),
                    product_description: this.getElement()
                        .getAttribute("data-description"),
                    product_url: this.getElement()
                        .getAttribute("data-url"),
                    product_image_url: this.getElement()
                        .getAttribute("data-image-url"),
                    product_specs: this.getProductSpecs()
                };
                var e = this.get("settings")
                    .demo;
                "undefined" != typeof e && (this.productInfo.demo = e);
                for (var t in this.productInfo) this.productInfo.hasOwnProperty(t) && !this.productInfo[t] && delete this.productInfo[t]
            }
            return this.productInfo
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.isWriteOnly = function () {
            return "undefined" != typeof (this.getSettings() || {})["write-only"]
        }, t.prototype.getLayout = function () {
            return "old"
        }, t.prototype.getProductSpecs = function () {
            var e, t = this,
                i = ["brand", "isbn", "mpn", "upc"],
                n = {};
            for (var o in i) e = i[o], t.element.getAttribute("data-product-spec-" + e) && (n["product_specs[" + e + "]"] = t.element.getAttribute("data-product-spec-" + e));
            var r = [];
            for (var s in n) r.push(s);
            return r.length > 0 ? n : null
        }, T = {
            ready: function () {
                A = e.filterAndSearch.filters_state_manager.aggregators_types, E = e.filterAndSearch.filters_drop_down_default_answer, x = e.filterAndSearch.free_text_search_input_placeholder, e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.init(), e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.init(), e.FilterAndSearch.Analytics.AnalyticsNotifier.init.call(this), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.init(), l.call(this), d.call(this), p.call(this), c.call(this), m.call(this), f.call(this), y.call(this), b.call(this), r.call(this), i.call(this), e.Modules.Handle.write.call(this, "review"), e.Modules.Handle.write.call(this, "question"), e.Modules.Handle.sources.call(this), this._controller.userSettings.new_main_widget_layout ? o.call(this) : e.Modules.Handle.select.call(this), e.Modules.Handle.mobileMenu.call(this), e.Modules.Handle.semiWhiteLabel.call(this), g.call(this), h.call(this)
            },
            resize: function () {
                this.promotedProducts && this.promotedProducts.trigger("resize")
            },
            sizeCalculated: function (e) {
                this.promotedProducts && this.promotedProducts.trigger("sizeCalculated", {
                    className: e
                })
            }
        }, t.prototype.switchSearchInProgressView = function (t) {
            var i = this.element;
            e.SearchInProgress.switchMode(i, t)
        }, t.prototype.OnSubmittedFiltersChange = function (t, i) {
            try {
                if ("undefined" != typeof this.sources.reviews.getElement()) {
                    var n = this.element.querySelector(".reviews-header");
                    e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSubmittedFiltersChange.call(this, this.sources.reviews, n, this.reviewsContainerElement, t, i), "reviews" === this.getActiveSource()
                        .type && this.switchSearchInProgressView(!1)
                }
            } catch (o) {
                e.safeConsole(o.message)
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.PicturesCollage = function (e) {
        function t(t, i) {
            var n = this;
            n._controller = t, n.element = i, n.analyticsContext = {
                layout: "collage"
            }, this.imagesHandler = new e.ImagesHandler(t.appKey, this), n.settings = {
                demo: i.getAttribute("data-demo"),
                album_name: _,
                widget_name: "pictures-collage"
            }, n.pagination = {
                currentPageCursor: {
                    images_offset: 0,
                    enlarge_images_offset: 0
                },
                nextPageCursor: {}
            };
            var o = new e.Modules.GallerySettings,
                r = o.getGallerySettings(i);
            Object.assign(n.settings, r), n.pagination.nextPageCursor.images_offset = n.settings.images_offset, n.pagination.nextPageCursor.enlarge_images_offset = n.settings.enlarge_images_offset, o.overrideSettingsFromDiv(n.element, n.settings), n.analyticsContext.gallery_id = n.settings.gallery_id || "none", n.analyticsContext.album_type = n.settings.product_id ? "product" : "custom", n.analyticsCategory = n.settings.is_product ? "pictures_widget" : "dedicated_page";
            for (var s in w) w.hasOwnProperty(s) && n.on(s, w[s])
        }

        function i() {
            this.wrapper = this.element.querySelector(".yotpo-pictures-collage-wrapper"), e.setHoverEnable(this.wrapper), this.container = this.element.querySelector(".yotpo-pictures-gallery-images-wrapper"), this.isLoadMoreButton = "button" === this.settings.load_more, n.call(this), y.call(this), this.analyticsTracker = new e.AnalyticsTracker(this.analyticsCategory, this.analyticsContext), this.imagesAnalyticsHandler = new e.ImagesAnalyticsHandler(this.element, this.analyticsTracker), this.brokenImageDescriptors = [], p.call(this), o.call(this), this.imagesHandler.loadImages(s, c, l), e.Modules.Event.on("popupClosed", function () {
                this.endlessScroller && this.endlessScroller.ignoreLoader(!1)
            }.bind(this)), e.Flows.UploadButton.initUploadButton(this._controller, this.element, this.settings, this.analyticsContext)
        }

        function n() {
            this.isLoadMoreButton ? (this.loader = this.element.querySelector(".yotpo-load-more-button"), this.loadIndicator = this.element.querySelector(".yotpo-image-loader.yotpo-pictures-gallery-fullpage-loader")) : this.loader = this.element.querySelector(".yotpo-image-loader.yotpo-pictures-gallery-fullpage-loader")
        }

        function o() {
            var e = this.settings.layout.rows;
            if (e % 2 !== 0) {
                var t = this.settings.layout.orientation;
                this.settings.layout.orientation = "rtl" === t ? "ltr" : "rtl"
            }
        }

        function r(e) {
            e.imagesHandler.reportInvalidImages(e.brokenImageDescriptors)
        }

        function s(t) {
            "none" !== t.settings.load_more && b.call(t) && (t.endlessScroller = v.call(t), e.removeClass(t.loader, "yotpo-hidden")), a(t)
        }

        function a(e) {
            r(e), e.imagesHandler.replaceBrokenImages(e.brokenImageDescriptors), e.imagesAnalyticsHandler.bindAnalyticsForloadedImages(e.imageContainers)
        }

        function l(e, t, i) {
            i.imagesHandler.handleMediaAfterLoad(e, t)
        }

        function c(e, t) {
            var i = {
                id: t,
                source: e.imagesHandler.getImageSource(t),
                reported: !1
            };
            e.brokenImageDescriptors.push(i), y.call(e)
        }

        function d() {
            for (var t = [], i = 0; i < this.imageContainers.length; ++i)
                if (!e.hasClass(this.imageContainers[i], "yotpo-hidden")) {
                    var n = this.imageContainers[i].querySelector(".y-image-overlay");
                    t.push(n)
                } return t
        }

        function u() {
            return this.imageContainers.length
        }

        function p() {
            if (this.settings.load_lightbox_sync) {
                var e = this.element.querySelector(".yotpo-lightbox-contents");
                this.initLightbox(e)
            } else {
                var t = Object.assign({}, this.getSettings(), this.pagination.currentPageCursor),
                    i = {
                        method: "generic_lightbox_container",
                        params: t
                    };
                this._controller.getBatch(g.bind(this), [i], null)
            }
        }

        function g(e) {
            var t = JSON.parse(e)[0];
            if (t) {
                this.element.insertAdjacentHTML("afterbegin", t.result);
                var i = this.element.querySelector(".yotpo-lightbox-contents");
                this.initLightbox(i)
            }
        }

        function h(t) {
            this.lightbox && this.lightbox.isOpen ? e.Modules.Event.on("lightboxClosed", function () {
                e.Modules.Event.removeEvent("lightboxClosed"), m.call(this, t)
            }.bind(this)) : m.call(this, t)
        }

        function m(t) {
            var i = this.element.querySelector(".y-slider-container"),
                n = JSON.parse(t)[0].result,
                r = document.createElement("div");
            r.insertAdjacentHTML("beforeend", n);
            var s = r.querySelector(".yotpo-pictures-gallery-images-wrapper"),
                d = r.querySelector(".yotpo-lightbox-contents"),
                u = r.querySelector(".y-slider-container"),
                p = (s.querySelectorAll(".yotpo-single-image-container")
                    .length, this.element.querySelector(".yotpo-lightbox-contents")),
                g = r.querySelector("#next_page_cursor_" + this.endlessScroller.page);
            e.appendChildElements(s, this.container), e.appendChildElements(u, i), e.appendChildElements(d, p), y.call(this), this.imagesHandler.loadImages(a, c, l), this.initLightbox(p), o.call(this), b.call(this) || (e.addClass(this.loader, "yotpo-hidden"), this.isLoadMoreButton && (e.addClass(this.loadIndicator, "yotpo-hidden"), e.remove(this.loader))), this.pagination.currentPageCursor = this.pagination.nextPageCursor, this.pagination.nextPageCursor = JSON.parse(g.innerHTML)
        }

        function f() {
            var e = Object.assign({}, this.getSettings(), this.pagination.nextPageCursor),
                t = {
                    method: "partial_generic_gallery",
                    params: e
                };
            this.endlessScroller && this.endlessScroller.getNextPage(t, h.bind(this))
        }

        function y() {
            this.imageContainers = this.container.querySelectorAll(".yotpo-single-image-container")
        }

        function v() {
            return this.isLoadMoreButton ? new e.Modules.ButtonEndlessScroll(this.settings.per_page, this._controller, this.loader, f.bind(this), this.loadIndicator) : new e.Modules.InviewEndlessScroll(this.settings.per_page, this._controller, this.loader, f.bind(this))
        }

        function b() {
            var e = u.call(this),
                t = this.settings.total_number_of_images - e,
                i = t / S[this.settings.layout_size];
            return i >= 1
        }
        var w = {},
            _ = "UGC Gallery",
            S = {
                small: 3,
                medium: 5,
                large: 7
            };
        return t.prototype.getMethod = function () {
            return "PicturesCollage"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, t.prototype.getActiveSource = function () {
            return this
        }, t.prototype.refresh = function () {
            var t = document.getElementsByClassName("yotpo-pictures-gallery-wrapper");
            t[0].style.opacity = .3, e.Modules.Refresh.perform.call(this)
        }, t.prototype.getImageElements = function () {
            return this.imageContainers
        }, t.prototype.initLightbox = function (t) {
            var i = this;
            this.lightboxWrapper = this.element.querySelector(".yotpo-lightbox-wrapper");
            var n = this.lightboxWrapper.querySelector(".yotpo-lightbox");
            if (n)
                for (var o = 0; o < i.imageContainers.length; ++o) {
                    var r = i.imageContainers[o].querySelector(".y-image-overlay.yotpo-new-image");
                    if (r) {
                        e.removeClass(r, "yotpo-new-image");
                        var s = i.imageContainers[o].querySelector(".y-image-wrapper");
                        e.addEventListener(s, "click", function () {
                            var n = d.call(i),
                                o = new e.SliderContentProvider(n, t, !0, i.analyticsCategory + "_popup"),
                                r = new e.AnalyticsTracker(i.analyticsCategory + "_popup", i.analyticsContext),
                                s = i.lightboxWrapper.cloneNode(!0);
                            i.lightbox = new e.Widgets.Lightbox(i._controller, s.querySelector(".yotpo-lightbox"), o, r, s), i.lightbox.open(this.querySelector(".y-image-overlay"), !0), this.endlessScroller && i.endlessScroller.ignoreLoader(!0)
                        })
                    }
                }
        }, w = {
            ready: function () {
                i.call(this), e.Modules.Handle.select.call(this)
            },
            refreshed: function () {
                this.sizeClass && adjustImages.call(this, this.sizeClass)
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.PicturesGallery = function (e) {
        function t(t, i) {
            var n, o, r = this;
            r._controller = t, r.element = i, r.analyticsContext = {
                layout: "grid"
            }, this.imagesHandler = new e.ImagesHandler(t.appKey, this);
            var s = t.getUserSetting("review_with_pictures"),
                a = t.getUserSetting("instagram_curation"),
                l = r.element.getAttribute("data-product-id") || r.element.getAttribute("product-id");
            r.settings = {
                demo: i.getAttribute("data-demo"),
                album_name: P
            }, l ? (o = "gallery", n = t.getUserSetting("product_gallery"), r.settings.product_id = l, r.analyticsCategory = "pictures_widget", r.settings.css_settings_class = "yotpo-product-gallery", r.settings.widget_ref_name = "product_gallery_shop_now", r.settings.cta = "0", r.analyticsContext.album_type = "product") : (o = "dedicated_page", n = t.getUserSetting("pictures_dedicated_page"), r.analyticsCategory = "dedicated_page", r.settings.css_settings_class = "yotpo-pictures-gallery", r.settings.widget_ref_name = "picture_gallery_shop_now", r.analyticsContext.album_type = "custom");
            var c = t.getUserSetting("generic_gallery"),
                d = new e.Modules.GallerySettings;
            if (n) {
                var u = d.getGallerySettings(r.element);
                r.settings.widget_name = "pictures-gallery", c && u ? Object.assign(r.settings, u) : (r.settings.cta = n.settings[o + "_cta"], r.settings.cta_color = n.settings[o + "_cta_color"], r.settings.cta_text = n.settings[o + "_cta_text"], r.settings.hover = n.settings[o + "_hover"], r.settings.title = n.settings[o + "_title"], r.settings.spacing = n.settings[o + "_spacing"], r.settings.layout_settings = n.settings[o + "_layout"], r.settings.source = n.settings[o + "_source"], r.settings.sort = r.settings.sort_setting = n.settings.sort, r.settings.sorting_enabled = "1" === String(n.settings[o + "_sorting"]))
            }
            d.overrideSettingsFromDiv(r.element, r.settings), r.analyticsContext.album_id = r.settings.album_id || "none", r.analyticsContext.gallery_id = r.settings.gallery_id || "none", r.settings.sorting_enabled = !i.hasAttribute("data-source") && r.settings.sorting_enabled && r.settings.source.length > 1 && s && a, r.settings.per_page = r.settings.layout_settings.mode === I ? E * x : r.settings.layout_settings.rows * E;
            for (var p in k) k.hasOwnProperty(p) && r.on(p, k[p])
        }

        function i() {
            this.settings.gid || (this._controller.userSettings.generic_gallery = !1), this.wrapper = this.element.querySelector(".yotpo-pictures-gallery-wrapper"), this.uploadPhotosButton = this.element.querySelector(".yotpo-pictures-gallery-upload-button"), e.setHoverEnable(this.wrapper), this.container = this.element.querySelector(".yotpo-pictures-gallery-images-wrapper"), this.isLoadMoreButton = this._controller.userSettings.generic_gallery ? "button" === this.settings.load_more : 1 === this.settings.layout_settings.load_more_button, n.call(this), w.call(this), this.analyticsTracker = new e.AnalyticsTracker(this.analyticsCategory, this.analyticsContext), this.imagesAnalyticsHandler = new e.ImagesAnalyticsHandler(this.element, this.analyticsTracker), this.brokenImageDescriptors = [], d.call(this), this.imagesHandler.loadImages(r, a, h), e.Modules.Event.on("popupClosed", function () {
                this.endlessScroller && this.endlessScroller.ignoreLoader(!1)
            }.bind(this)), e.Flows.UploadButton.initUploadButton(this._controller, this.element, this.settings, this.analyticsContext)
        }

        function n() {
            this.isLoadMoreButton ? (this.loader = this.element.querySelector(".yotpo-load-more-button"), this.loadIndicator = this.element.querySelector(".yotpo-image-loader.yotpo-pictures-gallery-fullpage-loader")) : this.loader = this.element.querySelector(".yotpo-image-loader.yotpo-pictures-gallery-fullpage-loader")
        }

        function o(e) {
            e.imagesHandler.reportInvalidImages(e.brokenImageDescriptors)
        }

        function r(t) {
            t._controller.userSettings.generic_gallery ? "none" !== t.settings.load_more && _.call(t) && (t.endlessScroller = C.call(t), e.removeClass(t.loader, "yotpo-hidden")) : t.settings.layout_settings.mode === I && c.call(t) === t.settings.per_page && (t.endlessScroller = C.call(t), e.removeClass(t.loader, "yotpo-hidden")), s(t)
        }

        function s(e) {
            o(e), e.imagesHandler.replaceBrokenImages(e.brokenImageDescriptors), e.imagesAnalyticsHandler.bindAnalyticsForloadedImages(e.imageContainers)
        }

        function a(e, t) {
            var i = {
                id: t,
                source: e.imagesHandler.getImageSource(t),
                reported: !1
            };
            e.brokenImageDescriptors.push(i), e.imagesHandler.removeBrokenImages([t]), w.call(e)
        }

        function l() {
            for (var t = [], i = 0; i < this.imageContainers.length; ++i)
                if (!e.hasClass(this.imageContainers[i], "yotpo-hidden")) {
                    var n = this.imageContainers[i].querySelector(".y-image-overlay");
                    t.push(n)
                } return t
        }

        function c() {
            return this.imageContainers.length + this.brokenImageDescriptors.length
        }

        function d() {
            if (this.settings.load_lightbox_sync) {
                var e = this.element.querySelector(".yotpo-lightbox-contents");
                this.initLightbox(e)
            } else {
                var t = {};
                t = this._controller.userSettings.generic_gallery ? {
                    method: "generic_lightbox_container",
                    params: this.getSettings()
                } : {
                    method: "lightbox_container",
                    params: this.getSettings()
                }, this._controller.getBatch(u.bind(this), [t], null)
            }
        }

        function u(e) {
            var t = JSON.parse(e)[0];
            if (t) {
                this.element.insertAdjacentHTML("afterbegin", t.result);
                var i = this.element.querySelector(".yotpo-lightbox-contents");
                this.initLightbox(i)
            }
        }

        function p(t) {
            this.lightbox && this.lightbox.isOpen ? e.Modules.Event.on("lightboxClosed", function () {
                e.Modules.Event.removeEvent("lightboxClosed"), g.call(this, t)
            }.bind(this)) : g.call(this, t)
        }

        function g(t) {
            var i = this.element.querySelector(".y-slider-container"),
                n = JSON.parse(t)[0].result,
                o = document.createElement("div");
            o.insertAdjacentHTML("beforeend", n);
            var r = o.querySelector(".yotpo-pictures-gallery-images-wrapper"),
                l = o.querySelector(".yotpo-lightbox-contents"),
                c = o.querySelector(".y-slider-container"),
                d = r.childElementCount,
                u = this.element.querySelector(".yotpo-lightbox-contents");
            e.appendChildElements(r, this.container), e.appendChildElements(c, i), e.appendChildElements(l, u), w.call(this), this.imagesHandler.loadImages(s, a, h), this.initLightbox(u), (this._controller.userSettings.generic_gallery && !_.call(this) || d < this.settings.per_page) && (e.addClass(this.loader, "yotpo-hidden"), this.isLoadMoreButton && (e.addClass(this.loadIndicator, "yotpo-hidden"), e.remove(this.loader)))
        }

        function h(e, t, i) {
            i.imagesHandler.handleMediaAfterLoad(e, t)
        }

        function m() {
            var e = this.getElement()
                .getElementsByClassName("selected")[0],
                t = f.call(this);
            e && this.settings.sorting_enabled && (t.sorting_enabled = !0, t.sort = e.getAttribute("data-selected-key")), t.offset = y.call(this);
            var i = {};
            i = this._controller.userSettings.generic_gallery ? {
                method: "partial_generic_gallery",
                params: this.settings
            } : {
                method: "partial_pictures_gallery",
                params: t
            }, this.endlessScroller && this.endlessScroller.getNextPage(i, p.bind(this))
        }

        function f() {
            return {
                hover: this.settings.hover,
                cta: this.settings.cta,
                cta_text: this.settings.cta_text,
                cta_color: this.settings.cta_color,
                source: this.settings.source,
                product_id: this.settings.product_id,
                album_id: this.settings.album_id,
                album_name: P,
                widget_ref_name: this.settings.widget_ref_name,
                sort: this.settings.sort
            }
        }

        function y() {
            var e = v.call(this),
                t = b.call(this);
            return {
                review: e.review + t.review,
                instagram: e.instagram + t.instagram,
                onsite_upload: e.onsite_upload + t.onsite_upload,
                "import": e["import"] + t["import"]
            }
        }

        function v() {
            for (var e = {
                    review: 0,
                    instagram: 0,
                    onsite_upload: 0,
                    "import": 0
                }, t = 0; t < this.brokenImageDescriptors.length; t++) e[this.brokenImageDescriptors[t].source]++;
            return e
        }

        function b() {
            for (var e = {
                    review: 0,
                    instagram: 0,
                    onsite_upload: 0,
                    "import": 0
                }, t = 0; t < this.imageContainers.length; ++t) {
                var i = this.imageContainers[t].querySelector(".y-image-overlay");
                i && (source = i.getAttribute("data-source"), e[source]++)
            }
            return e
        }

        function w() {
            this.imageContainers = this.container.querySelectorAll(".yotpo-single-image-container")
        }

        function _() {
            var e = c.call(this),
                t = this.settings.total_number_of_images - e;
            return t >= this.settings.images_per_row
        }

        function S(t) {
            if (this.settings.layout_settings.mode === T) {
                var i = this.element.querySelectorAll(".yotpo-single-image-container"),
                    n = this.element.querySelectorAll(".yotpo-single-image-container.yotpo-hidden"),
                    o = i.length,
                    r = this.settings.layout_settings.rows * A[t],
                    s = o - n.length,
                    a = s > r,
                    l = !a && o > s;
                if (a)
                    for (var c = r; s > c; c++) e.addClass(i[c], "yotpo-hidden");
                else if (l)
                    for (var c = s; r > c && o > c; c++) e.removeClass(i[c], "yotpo-hidden")
            }
        }

        function C() {
            return this.isLoadMoreButton ? new e.Modules.ButtonEndlessScroll(this.settings.per_page, this._controller, this.loader, m.bind(this), this.loadIndicator) : new e.Modules.InviewEndlessScroll(this.settings.per_page, this._controller, this.loader, m.bind(this))
        }
        var k = {},
            A = {
                "yotpo-size-7": 7,
                "yotpo-size-6": 6,
                "yotpo-size-5": 5,
                "yotpo-size-4": 4,
                "yotpo-size-3": 3,
                "yotpo-size-2": 3,
                "yotpo-size-1": 3
            },
            E = 7,
            x = 8,
            I = "full_page",
            T = "num_of_rows",
            P = "UGC Gallery";
        return t.selector = e.widgets["pictures-gallery"].selector, t.prototype.getMethod = function () {
            return "PicturesGallery"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, t.prototype.getActiveSource = function () {
            return this
        }, t.prototype.refresh = function () {
            var t = document.getElementsByClassName("yotpo-pictures-gallery-wrapper");
            t[0].style.opacity = .3, e.Modules.Refresh.perform.call(this)
        }, t.prototype.getImageElements = function () {
            return this.imageContainers
        }, t.prototype.initLightbox = function (t) {
            var i = this;
            this.lightboxWrapper = this.element.querySelector(".yotpo-lightbox-wrapper");
            var n = this.lightboxWrapper.querySelector(".yotpo-lightbox");
            if (n)
                for (var o = 0; o < i.imageContainers.length; ++o) {
                    var r = i.imageContainers[o].querySelector(".y-image-overlay.yotpo-new-image");
                    if (r) {
                        e.removeClass(r, "yotpo-new-image");
                        var s = i.imageContainers[o].querySelector(".y-image-wrapper");
                        e.addEventListener(s, "click", function () {
                            var n = l.call(i),
                                o = new e.SliderContentProvider(n, t, !0, i.analyticsCategory + "_popup"),
                                r = new e.AnalyticsTracker(i.analyticsCategory + "_popup", i.analyticsContext),
                                s = i.lightboxWrapper.cloneNode(!0);
                            i.lightbox = new e.Widgets.Lightbox(i._controller, s.querySelector(".yotpo-lightbox"), o, r, s), i.lightbox.open(this.querySelector(".y-image-overlay"), !0), this.endlessScroller && i.endlessScroller.ignoreLoader(!0)
                        })
                    }
                }
        }, k = {
            ready: function () {
                i.call(this), e.Modules.Handle.select.call(this)
            },
            sizeCalculated: function (e) {
                this.sizeClass = e, S.call(this, e)
            },
            refreshed: function () {
                this.sizeClass && S.call(this, this.sizeClass)
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.GenericGallery = function (e) {
        function t(e, t) {
            var i = this;
            this.element = t, this.controller = e, this.settings = {
                gid: t.dataset.galleryId,
                page: 1,
                max_images_in_view: r.call(this),
                element_width: t.offsetWidth,
                product_id: i.element.getAttribute("data-product-id"),
                demo: i.element.getAttribute("data-demo") || !1
            }, this.settings.div_settings = p.getDivSettings(i.element), this.settings.layout_size = this.settings.div_settings.is_preview ? o.call(this) : n.call(this);
            for (var s in a) a.hasOwnProperty(s) && i.on(s, a[s])
        }

        function i() {
            var e = p.getGallerySettings(this.element),
                t = c[e.layout_name].constructWidget(this.controller, this.element);
            Object.assign(t.getSettings(), this.settings), t.trigger("ready")
        }

        function n() {
            var e = this.element.offsetWidth;
            return 415 >= e ? l.small : e > 415 && 1280 >= e ? l.medium : l.large
        }

        function o() {
            var e = this.element.offsetWidth;
            return 415 >= e ? l.small : l.large
        }

        function r() {
            var e = s.call(this),
                t = this.element.offsetWidth / d,
                i = e ? Math.ceil(t) : Math.floor(t);
            return Math.max(i, u)
        }

        function s() {
            return this.controller.userSettings && this.controller.userSettings.pictures_slider && "1" === String(this.controller.userSettings.pictures_slider.settings.full_width)
        }
        var a = {},
            l = Object.freeze({
                small: "small",
                medium: "medium",
                large: "large"
            }),
            c = {
                CAROUSEL_1: {
                    constructWidget: function (t, i) {
                        return new e.Widgets.Slider(t, i)
                    }
                },
                GRID_1: {
                    constructWidget: function (t, i) {
                        return new e.Widgets.PicturesGallery(t, i)
                    }
                },
                COLLAGE_1: {
                    constructWidget: function (t, i) {
                        return new e.Widgets.PicturesCollage(t, i)
                    }
                }
            },
            d = 180,
            u = 3,
            p = new e.Modules.GallerySettings;
        return a = {
            ready: function () {
                i.call(this), e.Modules.Handle.select.call(this)
            }
        }, t.prototype.getLayout = function () {
            return "new"
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.getMethod = function () {
            return "GenericGallery"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t
    }(Yotpo), Yotpo.Widgets.PicturesWidget = function (e) {
        function t(e, t) {
            var o;
            return o = e.userSettings && e.userSettings.generic_gallery ? t.getAttribute("data-layout") || "generic" : t.getAttribute("data-layout"), e.userSettings && e.userSettings.video_support && i(e.userSettings.video_support.settings), n[o].constructWidget(e, t)
        }

        function i(e) {
            var t = document.createElement("script");
            t.type = "text/javascript", t.src = "https://cdnapisec.kaltura.com/p/" + e.partner_id + "/embedPlaykitJs/uiconf_id/" + e.player_id, document.body.appendChild(t)
        }
        var n = {
            carousel: {
                constructWidget: function (t, i) {
                    return new e.Widgets.Slider(t, i)
                }
            },
            full_page: {
                constructWidget: function (t, i) {
                    return new e.Widgets.PicturesGallery(t, i)
                }
            },
            num_of_rows: {
                constructWidget: function (t, i) {
                    return new e.Widgets.PicturesGallery(t, i)
                }
            },
            collage: {
                constructWidget: function (t, i) {
                    return new e.Widgets.PicturesCollage(t, i)
                }
            },
            generic: {
                constructWidget: function (t, i) {
                    return new e.Widgets.GenericGallery(t, i)
                }
            }
        };
        return t.selector = e.widgets["pictures-widget"].selector, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.PromotedProducts = function (e) {
        function t(t, i) {
            var o = this;
            o.analyticsCategory = "promoted_products", o._controller = t, o.element = i, o.settings = {
                    promoted: !0
                }, o.currentItem = 0, o.totalItems = i.getElementsByTagName("li")
                .length, o.scrollBase = i.getElementsByClassName("promoted-products")[0].scrollLeft, o.css_preview = t.userSettings.css_preview, e.supportTouch() && (e.hide(i.getElementsByClassName("yotpo-pager")[0]), delete n.pageChanged, i.getElementsByClassName("promoted-products")[0].style.overflowX = "auto");
            for (var r in n) n.hasOwnProperty(r) && o.on(r, n[r])
        }

        function i() {
            var t = this;
            e.currentAnalytics.trackUniqueEvent("promoted_products", "loaded"), e.currentInview.register(t.element, function () {
                e.currentAnalytics.trackUniqueEvent("promoted_products", "shown")
            }), e.hoverAnalytics.register(t.element, function () {
                e.currentAnalytics.trackUniqueEvent("promoted_products", "hovered")
            });
            for (var i = t.getElement()
                    .getElementsByClassName("yotpo-promoted-product"), n = 0; n < i.length; ++n) {
                var o = i[n],
                    r = (o.getAttribute("data-type"), o.getAttribute("data-product-id")),
                    s = (o.getAttribute("data-position"), function (t, i) {
                        return function () {
                            e.currentAnalytics.trackUniqueEvent("promoted_products", t, "product", void 0, i)
                        }
                    });
                e.currentAnalytics.trackUniqueEvent("promoted_products", "loaded", "product", void 0, {
                    lppid: r
                }), e.currentInview.register(o, s("shown", {
                    sppid: r
                })), e.hoverAnalytics.register(o, s("hovered", {
                    hppid: r
                })), o.getElementsByClassName("yotpo-product-link")[0].onclick = s("clicked_on", {
                    cppid: r
                })
            }
        }
        var n = {},
            o = !1;
        return t.selector = ".promoted-products-box", t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getMethod = function () {
            return "promoted_products"
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.perPage = 3, t.prototype.getLayout = function () {
            return "old"
        }, n = {
            ready: function () {
                var t = this;
                e.Modules.Pagination.init.call(t), t.trigger("resize")
            },
            pageChanged: function (i) {
                t.perPage = Math.min(this.getElement()
                    .getElementsByClassName("yotpo-promoted-product")
                    .length - 1, t.perPage);
                var n = this._controller.getUserSetting("direction"),
                    o = Math.min(Math.max(0, this.currentItem + ("yotpo_next" == i ? t.perPage : -t.perPage)), this.totalItems - 1),
                    r = this.getElement()
                    .getElementsByClassName("promoted-products")[0],
                    s = r.getElementsByTagName("li")[o],
                    a = s.clientWidth * o;
                "rtl" == n && (a = this.scrollBase - s.clientWidth * o), e.scrollTo(r, a, 500, !1), this.currentItem = o
            },
            resize: function () {
                if (!e.supportTouch()) {
                    var t = this.element.getElementsByClassName("promoted-products")[0];
                    t.scrollWidth <= t.offsetWidth ? e.hide(this.element.getElementsByClassName("yotpo-pager")[0]) : e.show(this.element.getElementsByClassName("yotpo-pager")[0])
                }
            },
            sizeCalculated: function (t) {
                for (var n = this, r = 0, s = document.getElementsByTagName("body")[0], a = n.getElement(); a && a != s && 0 == a.offsetWidth;) a = a.parentNode;
                var l = 0;
                l += 2 * parseInt(e.getStyle(a, "margin-left")), l += 2 * parseInt(e.getStyle(a, "padding-left"));
                var c = n.getElement()
                    .getElementsByClassName("yotpo-promoted-products")[0];
                r += 2 * parseInt(e.getStyle(c, "margin-left"));
                var d = n.getElement()
                    .getElementsByClassName("promoted-products")[0],
                    u = d.getElementsByTagName("li")
                    .length,
                    p = n.getElement()
                    .getElementsByClassName("yotpo-promoted-product");
                if (0 == p.length) return void e.hide(this.getElement());
                r += u * parseInt(e.getStyle(p[0], "margin-left")) * 2;
                var g = 160;
                "yotpo-small" == t.className && (g = 110);
                var h = g * u;
                !n.css_preview && a.offsetWidth >= h + r + l ? e.hide(this.getElement()) : (e.show(this.getElement(), "block"), o || (o = !0, i.call(n))), n.trigger("resize")
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.QuestionsBottomline = function (e) {
        function t(e, t) {
            var n = this;
            n._controller = e, n.element = t, n.settings = {
                pid: t.getAttribute("data-product-id")
            };
            for (var o in i) i.hasOwnProperty(o) && n.on(o, i[o])
        }
        var i = {};
        return t.selector = e.widgets["questions-bottomline"].selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getMethod = function () {
            return "questions_bottomline"
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.refresh = function () {
            e.Modules.Refresh.perform.call(this)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "old"
        }, i = {
            ready: function () {
                var t, i = this,
                    n = i._controller.getWidgetsByName("Main"),
                    o = i.getElement()
                    .getElementsByClassName("ask-question")[0];
                if (1 == n.length) t = n[0];
                else
                    for (var r = 0; r < n.length; r++)
                        if (n[r].settings && "questions" == n[r].settings.mode) {
                            t = n[r];
                            break
                        } t && o && (o.onclick = function () {
                    var i = t.getElement(),
                        n = i.getElementsByClassName("write-question-button")[0];
                    return e.simulateClickEvent(n), i.scrollIntoView(), t.get("forms")
                        .questions.getElement()
                        .scrollIntoView(), !1
                })
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.ShopAdvisor = function (e) {
        function t(e, t) {
            var n = this;
            n._controller = e, n.element = t, n.settings = {};
            for (var o in i) i.hasOwnProperty(o) && n.on(o, i[o])
        }
        var i = {};
        return t.prototype.getMethod = function () {
            return "ShopAdvisor"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.selector = e.widgets["shop-advisor"].selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, i = {
            ready: function () {}
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.ShoppableGallery = function (e) {
        function t(t, i) {
            var n = this;
            n._controller = t, n.element = i, n.analyticsCategory = "shoppable_instagram";
            var o = t.getUserSetting("shoppable_instagram"),
                r = {};
            o && (r = o.settings.settings), sessionStorage.getItem("yotpoPresetShoppableState") === R && (r.preset_shoppable_state = R, n.shoppableState = R, n.imageId = sessionStorage.getItem("yotpoPresetImageId")), r.demo = i.getAttribute("data-demo"), r.only_tagged_images = !0, r.source = ["instagram"], r.album_name = U;
            var s = n.element.getAttribute("data-no-shoppable-header");
            r.header = {
                enabled: "" === s ? !1 : null === s || !JSON.parse(s)
            }, r.shop_owner_details = !0, r.per_page = 30, r.product_scores = !0, r.yotpo_hosted_page = "" === n.element.getAttribute("data-yotpo-hosted-page") ? !0 : !1, r.css_settings_class = "yotpo-shoppable-instagram", n.settings = r, this.imagesHandler = new e.ImagesHandler(t.appKey, this);
            for (var a in B) B.hasOwnProperty(a) && n.on(a, B[a])
        }

        function i() {
            var t = this.element.querySelector(".yotpo-redirect");
            if (t) {
                var i = this.element.getAttribute("data-empty-redirect-url");
                return void(i && e.redirectToUrl(i))
            }
            history.pushState({}, {}, null), this.container = this.element.querySelector(".yotpo-shoppable-gallery-images-wrapper"), this.imageDimensions = {}, this.fullScreenImageID = void 0, this.fullScreenImagesDimensions = {}, this.displayWrapper = this.element.querySelector(".yotpo-display-wrapper"), this.headerElement = this.element.querySelector(".yotpo-shoppable-header"), this.shopImageElement = this.headerElement.querySelector("img.shop-image"), this.shopImagePlaceholderElement = this.headerElement.querySelector(".shop-image-placeholder"), this.currentShopImageElement = this.shopImageElement, this.headerWrapperElement = this.element.querySelector(".yotpo-shoppable-gallery-header-wrapper"), this.backArrow = this.element.querySelector(".yotpo-icon-left-arrow-thin"), n.call(this), this.singleViewContainer = this.element.querySelector(".yotpo-shoppable-single-view-container"), this.singleViewWrapper = this.element.querySelector(".yotpo-shoppable-single-image-wrapper"), this.galleryContainer = this.element.querySelector(".yotpo-shoppable-gallery-wrapper"), L.call(this), this.loader = this.element.querySelector(".yotpo-image-loader.yotpo-pictures-gallery-fullpage-loader"), this.imageStatsContainer = this.element.querySelector(".yotpo-shoppable-stats"), this.imageSalesTextElement = this.element.querySelector(".yotpo-shoppable-sales"), this.imageSalesElement = this.element.querySelector(".yotpo-shoppable-sales-count"), this.imageLikesElement = this.element.querySelector(".yotpo-shoppable-likes-count"), this.taggedProductsContainer = this.element.querySelector(".yotpo-shoppable-tagged-products-container"), this.analyticsTracker = new e.AnalyticsTracker(this.analyticsCategory, {}), this.imagesAnalyticsHandler = new e.ImagesAnalyticsHandler(this.element, this.analyticsTracker), this.brokenImageDescriptors = [], this.imagesHandler.loadImages(l.bind(this), m, r.bind(this)), f(this)
        }

        function n() {
            this.settings.header.enabled ? this.galleryHeader = !0 : (e.addClass(this.headerElement, "yotpo-hidden"), M.call(this), this.galleryHeader = !1), this.shopImageElement.onerror = h.bind(this), o.call(this)
        }

        function o() {
            var e = window.getComputedStyle(document.body, null)
                .getPropertyValue("margin");
            this.headerElement.style.marginTop = "-" + e, this.headerElement.style.marginRight = "-" + e, this.headerElement.style.marginLeft = "-" + e
        }

        function r(e, t) {
            s.call(this, e, t), a.call(this, e) && A.call(this, e)
        }

        function s(e, t) {
            this.imageDimensions[e] = {
                width: t.width,
                height: t.height
            }, this.fullScreenImagesDimensions[e] = p.call(this, e)
        }

        function a(e) {
            var t = this.fullScreenImageID === e;
            return this.imageId === e && this.shoppableState === R && !t
        }

        function l() {
            c.call(this), d.call(this)
        }

        function c() {
            this.shoppableState === R && this.fullScreenImageID !== this.imageId && history.back()
        }

        function d() {
            this.imagesHandler.reportInvalidImages(this.brokenImageDescriptors)
        }

        function u() {
            for (var e in this.imageDimensions) this.fullScreenImagesDimensions[e] = p.call(this, e);
            g.call(this)
        }

        function p(e) {
            var t = this.imageDimensions[e],
                i = window.innerWidth || screen.width,
                n = Math.min(i, D);
            return {
                width: n,
                height: Math.ceil(t.height * n / t.width)
            }
        }

        function g() {
            var e = this.singleViewContainer.querySelector(".yotpo-shoppable-image-container");
            if (this.fullScreenImageID && this.fullScreenImagesDimensions) {
                var t = this.fullScreenImagesDimensions[this.fullScreenImageID].height;
                e.style.height = t + "px"
            }
        }

        function h() {
            e.reportBrokenImages(this._controller.appKey, [""], "account", !1), e.hide(this.shopImageElement), e.show(this.shopImagePlaceholderElement), this.currentShopImageElement = this.shopImagePlaceholderElement
        }

        function m(e, t) {
            var i = {
                id: t,
                source: "instagram",
                reported: !1
            };
            e.brokenImageDescriptors.push(i)
        }

        function f(t) {
            b.call(t), t.endlessScroller = new e.Modules.InviewEndlessScroll(t.settings.per_page, t._controller, t.loader, y.bind(t), t.loadIndicator), t.imageContainers.length >= t.settings.per_page && e.removeClass(t.loader, "yotpo-hidden")
        }

        function y() {
            var e = this.settings;
            e.offset = {
                instagram: this.endlessScroller.per_page * this.endlessScroller.page
            }, e.widget = "shoppable_gallery", this.endlessScroller.getNextPage({
                method: "partial_shoppable_gallery",
                params: e
            }, v.bind(this))
        }

        function v(t) {
            var i = this.element.querySelector(".yotpo-shoppable-single-image-contents"),
                n = JSON.parse(t)[0].result,
                o = document.createElement("div");
            o.insertAdjacentHTML("beforeend", n);
            var s = o.querySelector(".yotpo-pictures-gallery-images-wrapper"),
                a = o.querySelector(".yotpo-shoppable-single-image-contents"),
                l = s.childElementCount;
            e.appendChildElements(s, this.container), e.appendChildElements(a, i), L.call(this), this.imagesHandler.loadImages(d.bind(this), m, r.bind(this)), k.call(this), l < this.settings.per_page && e.addClass(this.loader, "yotpo-hidden")
        }

        function b() {
            this.shoppableState = this.settings.preset_shoppable_state || O, w.call(this), N.call(this)
        }

        function w() {
            var t = this;
            this.backArrow && (e.addEventListener(this.backArrow, "click", _.bind(this)), e.addEventListener(this.headerElement.querySelector(".yotpo-icon-grid"), "click", _.bind(this))), k.call(this), e.addEventListener(window, "scroll", function () {
                window.innerHeight < t.element.clientHeight - 10 && (document.body.scrollTop - 1 >= t.headerElement.offsetTop ? (0 === t.headerWrapperElement.offsetTop && (e.addClass(t.galleryContainer, "yotpo-relative-wrapper"), e.addClass(t.singleViewWrapper, "yotpo-relative-wrapper")), e.addClass(t.headerWrapperElement, "yotpo-fixed-header")) : document.body.scrollTop - 1 < t.headerElement.offsetTop && (e.removeClass(t.galleryContainer, "yotpo-relative-wrapper"), e.removeClass(t.singleViewWrapper, "yotpo-relative-wrapper"), e.removeClass(t.headerWrapperElement, "yotpo-fixed-header")))
            }), e.addEventListener(window, "unload", function () {
                sessionStorage.setItem("yotpoPresetShoppableState", t.shoppableState), sessionStorage.setItem("yotpoPresetImageId", t.imageId)
            }), e.addEventListener(window, "popstate", S.bind(t))
        }

        function _() {
            history.back()
        }

        function S() {
            this.shoppableState === R && (C.call(this), T.call(this), window.scrollTo(0, this.imageOffset), this.productsSlider && this.productsSlider.destroy())
        }

        function C() {
            var t = this.element.querySelector(".yotpo-shoppable-image");
            t.removeAttribute("src"), e.removeEventListener(t, "click", this.imageClickCallback)
        }

        function k() {
            for (var t = this, i = this.imageContainers, n = 0; n < i.length; n++) {
                var o = i[n].querySelector(".y-image-overlay.yotpo-new-image");
                o && (e.removeClass(o, "yotpo-new-image"), e.addEventListener(o, "click", function () {
                    t.imageOffset = document.body.scrollTop, t.imageId = this.getAttribute("data-external-image-id"), history.pushState({}, {}, null), A.call(t, t.imageId)
                }))
            }
        }

        function A(t) {
            this.fullScreenImageID = t;
            var i = H.call(this),
                n = i.taggedProducts.length > 1;
            P.call(this), E.call(this, i.imageUrl), this.productsSlider = new e.ShoppableProductsSlider(this._controller, this.analyticsTracker, this.taggedProductsContainer), x.call(this, i.taggedProducts), n || I.call(this, i.taggedProducts[0]), this.displayWrapper.scrollIntoView(), Y.call(this, i.taggedProducts, i.imageId)
        }

        function E(e) {
            g.call(this);
            var t = this.singleViewContainer.querySelector(".yotpo-shoppable-image");
            t.style.opacity = "0", t.src = e, t.onload = function () {
                this.style.opacity = "1"
            }
        }

        function x(t) {
            var i = this.singleViewContainer.querySelector(".yotpo-shoppable-title"),
                n = i.querySelector(".yotpo-clickable-title"),
                o = this.singleViewContainer.querySelector(".yotpo-shoppable-image"),
                r = this.settings.star_rating.enabled,
                s = this.settings.cta.enabled ? this.settings.cta.text : {},
                a = this.settings.promoted_products.enabled;
            this.productsSlider.showElement(t, r, s, a, this.imageId), n.removeAttribute("href"), e.removeClass(o, "yotpo-clickable"), e.addClass(i, "yotpo-hidden")
        }

        function I(t) {
            var i = this,
                n = this.singleViewContainer.querySelector(".yotpo-shoppable-title"),
                o = n.querySelector(".yotpo-clickable-title"),
                r = this.singleViewContainer.querySelector(".yotpo-shoppable-image"),
                s = t.link;
            n.querySelector(".yotpo-shoppable-product-image")
                .src = t.imageUrl, n.querySelector(".yotpo-shoppable-product-name")
                .innerHTML = t.name, o.href = s, e.addEventListener(o, "click", function () {
                    i.analyticsTracker.track("clicked_on", "shop_now")
                }), e.addEventListener(r, "click", function () {
                    i.analyticsTracker.track("clicked_on", "single_image")
                }), this.imageClickCallback = e.redirectToUrl.bind(null, s), e.addEventListener(r, "click", this.imageClickCallback), e.addClass(r, "yotpo-clickable"), e.removeClass(n, "yotpo-hidden")
        }

        function T() {
            this.shoppableState = O, this.galleryHeader || e.addClass(this.headerElement, "yotpo-hidden"), F.call(this), this.imageStatsContainer.style.opacity = "0", e.addClass(this.singleViewContainer, "yotpo-hidden"), e.removeClass(this.galleryContainer, "yotpo-hidden"), e.hasClass(this.loader, "display-on-gallery-view") && e.removeClass(this.loader, "yotpo-hidden")
        }

        function P() {
            this.shoppableState = R, this.galleryHeader || e.removeClass(this.headerElement, "yotpo-hidden"), F.call(this), e.hasClass(this.loader, "yotpo-hidden") || (e.addClass(this.loader, "display-on-gallery-view"), e.addClass(this.loader, "yotpo-hidden")), e.addClass(this.galleryContainer, "yotpo-hidden"), e.removeClass(this.singleViewContainer, "yotpo-hidden")
        }

        function F() {
            this.galleryHeader && (this.shoppableState === O ? q.call(this) : this.shoppableState === R && M.call(this))
        }

        function q() {
            var t = this.headerElement.querySelector(".yotpo-shoppable-gallery-header-reviews-wrapper");
            t && e.removeClass(t, "yotpo-hidden"), e.show(this.currentShopImageElement), e.removeClass(this.headerElement.querySelector(".yotpo-shoppable-gallery-title"), "yotpo-hidden"), e.addClass(this.backArrow, "yotpo-hidden"), e.addClass(this.headerElement.querySelector(".yotpo-icon-grid"), "yotpo-hidden")
        }

        function M() {
            var t = this.headerElement.querySelector(".yotpo-shoppable-gallery-header-reviews-wrapper");
            t && e.addClass(t, "yotpo-hidden"), e.hide(this.currentShopImageElement), e.addClass(this.headerElement.querySelector(".yotpo-shoppable-gallery-title"), "yotpo-hidden"), e.removeClass(this.backArrow, "yotpo-hidden"), e.removeClass(this.headerElement.querySelector(".yotpo-icon-grid"), "yotpo-hidden")
        }

        function H() {
            var e = this.element.querySelector(".yotpo-shoppable-content-" + this.fullScreenImageID),
                t = e.querySelector(".yotpo-image"),
                i = {};
            i.imageUrl = t.getAttribute("data-image-url"), i.imageId = t.getAttribute("data-image-id"), i.taggedProducts = [];
            for (var n = e.querySelectorAll(".yotpo-tagged-product"), o = 0; o < n.length; o++) i.taggedProducts[o] = {
                id: n[o].getAttribute("data-tagged-product-id"),
                domainKey: n[o].getAttribute("data-tagged-product-domain-key"),
                name: n[o].getAttribute("data-tagged-product-name"),
                link: n[o].getAttribute("data-tagged-product-link"),
                imageUrl: n[o].getAttribute("data-tagged-product-image-url"),
                score: n[o].getAttribute("data-tagged-product-score"),
                reviewsCount: n[o].getAttribute("data-tagged-product-reviews-count")
            };
            return i
        }

        function L() {
            this.imageContainers = this.container.querySelectorAll(".yotpo-single-image-container")
        }

        function N() {
            this.imagesAnalyticsHandler.bindAnalyticsForloadedImages(this.imageContainers)
        }

        function Y(t, i) {
            for (var n = [], o = 0; o < t.length; o++) n.push(t[o].id);
            var r = [{
                method: "shoppable_image_stats",
                params: {
                    product_ids: n,
                    image_id: i
                },
                format: "json"
            }];
            this._controller.getBatch(function (t) {
                var i = JSON.parse(t);
                i = i[0].result, i.sales > 10 && !this.settings.hide_sales ? (e.removeClass(this.imageSalesTextElement, "yotpo-hidden"), e.removeClass(this.imageSalesElement, "yotpo-hidden"), this.imageSalesElement.innerHTML = i.sales) : (e.addClass(this.imageSalesTextElement, "yotpo-hidden"), e.addClass(this.imageSalesElement, "yotpo-hidden")), this.imageLikesElement.innerHTML = i.likes, this.imageStatsContainer.style.opacity = "1"
            }.bind(this), r)
        }
        var B = {},
            D = 768,
            O = "gallery",
            R = "single_image",
            U = "Shoppable Instagram";
        return t.selector = e.widgets["shoppable-gallery"].selector, t.prototype.getMethod = function () {
            return "shoppable_gallery"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, t.prototype.getImageElements = function () {
            return this.imageContainers
        }, B = {
            ready: function () {
                i.call(this)
            },
            resize: function () {
                u.call(this), this.productsSlider && this.productsSlider.adjustSize()
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.ShoppersSay = function (e) {
        function t(t, i) {
            var n = this;
            n._controller = t, n.element = i, n.settings = {}, n.moreReviewsClicked = !1;
            var o, r = n._controller.getUserSetting("shoppers_say");
            r && (o = r.settings), n.settings.title = l(n, "data-title", o, "title", !0), n.settings.product_id = l(n, "data-product-id"), n.settings.demo = l(n, "data-demo"), e.isMobile() ? n.settings.maximum_reviews_mobile = l(n, "data-maximum-reviews-mobile", o, "max_sentences_mobile", !0) : n.settings.maximum_reviews_desktop = l(n, "data-maximum-reviews-desktop", o, "max_sentences_desktop", !0);
            for (var s in c) c.hasOwnProperty(s) && n.on(s, c[s])
        }

        function i(e) {
            return '"' == e.charAt(0) && (e = e.substring(1, e.length)), '"' == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), "..." == e.substring(e.length - 3, e.length) && (e = e.substring(0, e.length - 3)), e
        }

        function n() {
            var e = this,
                t = e._controller.getUserSetting("shoppers_say");
            if (t !== !1) {
                var i = e.element.getElementsByClassName("shoppers-say-display-wrapper");
                if (i.length) {
                    var n = i[0],
                        l = n.getElementsByClassName("more-reviews");
                    s(e, l);
                    var c = n.getElementsByClassName("sentence-wrapper");
                    a(e, c), r(n);
                    var d = n.getElementsByClassName("sentence-collapsed");
                    o(e.settings.demo, d)
                }
            }
        }

        function o(e, t) {
            e && "true" === e && t.length > 1 && t[1].click()
        }

        function r(t) {
            var i = t.getElementsByClassName("single-best-sentence")
                .length,
                n = "true" === t.getAttribute("data-met-requirements"),
                o = !n || "true" === t.getAttribute("data-is-dummy");
            e.currentAnalytics.trackEvent("shoppers_say", o ? "loaded_dummy" : "loaded", null, null, {
                met_requirements: n,
                quotes_count: o ? "y" : i
            }), e.currentInview.register(t, function () {
                e.currentAnalytics.trackEvent("shoppers_say", o ? "shown_dummy" : "shown", null, null, {
                    met_requirements: n,
                    quotes_count: o ? "y" : i
                })
            })
        }

        function s(t, i) {
            for (var n = 0; n < i.length; n++) i[n].onclick = function (i) {
                t.moreReviewsClicked = !0, i.stopPropagation(), e.scrollToReviewsTabInMainWidget(t._controller, !0)
            }
        }

        function a(e, t) {
            for (var i = 0; i < t.length; i++) t[i].onclick = function (t) {
                e.trigger("toggleFullReview", t)
            }
        }

        function l(e, t, i, n, o) {
            var r = e.element.getAttribute(t);
            return r ? r : o && i ? i[n] : void 0
        }
        var c = {};
        return t.prototype.getMethod = function () {
            return "shoppers_say"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.selector = e.widgets["shoppers-say"].selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, c = {
            ready: function () {
                var e = this;
                n.call(e)
            },
            toggleFullReview: function (t) {
                var n = t.currentTarget,
                    o = e.Modules.Helper.findAncestorByClass(n, "single-best-sentence"),
                    r = o.getElementsByClassName("sentence-expanded")[0],
                    s = o.getElementsByClassName("sentence-collapsed")[0],
                    a = n.classList.contains("sentence-collapsed") ? !0 : !1;
                if (a) {
                    var l = s.getElementsByClassName("sentence");
                    if (l.length > 0) {
                        var c = i(l[0].textContent);
                        e.currentAnalytics.trackEvent("shoppers_say", "clicked_on", null, c)
                    }
                }
                var d = a ? r : s;
                e.addClass(n, "yotpo-hidden"), e.Animations.fadeIn(d, 1e3)
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.SingleVideo = function (e) {
        function t(e, t) {
            var i = this;
            i._controller = e, i.element = t, i.settings = {};
            for (var o in n) n.hasOwnProperty(o) && i.on(o, n[o])
        }

        function i() {
            var e = this.getElement(),
                t = e.querySelector(".yotpo-video-container"),
                i = this._controller.appKey;
            t.onclick = function () {
                o.playing || o.ready(i, e)
            }
        }
        var n = {};
        t.prototype.getMethod = function () {
            return "Video"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.selector = e.widgets["single-video"].selector, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, n = {
            ready: function () {
                var e = this.getElement()
                    .querySelector("#video");
                e && i.call(this)
            }
        };
        var o = {
            ready: function (e, t) {
                this.container = t, this.appKey = e, this.playing = !1, this.me = "_" + Math.random()
                    .toString(36)
                    .substr(2, 9), this.room = new Room({
                        signalServer: "wss://live.yotpo.com/signal/_/",
                        me: this.me,
                        iceServers: [{
                            urls: ["stun:stun.lawsroom.com:3478"]
                    }, {
                            urls: "turn:stun.lawsroom.com:3478",
                            username: "yiquganchangduan",
                            credential: "tianyahechumizhiyin"
                    }, {
                            urls: "turn:stun.lawsroom.com:3478?transport=tcp",
                            username: "yiquganchangduan",
                            credential: "tianyahechumizhiyin"
                    }, {
                            urls: "turn:stun.lawsroom.com:3478?transport=udp",
                            username: "yiquganchangduan",
                            credential: "tianyahechumizhiyin"
                    }]
                    }), this.room.on("signal_open", this.signal_open.bind(this)), this.room.on("signal_close", this.signal_close.bind(this)), this.room.on("signal_error", this.signal_error.bind(this)), this.room.on("peer_open", this.peer_open.bind(this)), this.room.on("peer_close", this.peer_close.bind(this)), this.room.on("channel_open", this.channel_open.bind(this)), this.room.on("channel_message", this.channel_message.bind(this)), this.room.on("channel_close", this.channel_close.bind(this)), this.room.on("message_create", this.message_create.bind(this)), this.room.on("message_join", this.message_join.bind(this)), this.room.on("message_leave", this.message_leave.bind(this)), this.room.on("message_notice", this.message_notice.bind(this)), this.room.on("stream_add", this.stream_add.bind(this)), this.room.on("stream_remove", this.stream_remove.bind(this)), this.room["in"]()
            },
            signal_open: function () {
                o.join(this.appKey)
            },
            signal_close: function () {},
            signal_error: function () {},
            peer_open: function () {},
            peer_close: function (e) {
                this.removeVideo(e)
            },
            channel_open: function () {},
            channel_message: function () {},
            channel_close: function () {},
            message_create: function () {},
            message_join: function () {},
            message_leave: function () {
                this.removeVideos()
            },
            message_notice: function (e) {
                "string" == typeof e.Data && ("room_exists" === e.Data && this.room.join(this.roomId), "room_full" === e.Data)
            },
            stream_add: function (e, t) {
                this.addVideo(e, t)
            },
            stream_remove: function (e) {
                this.removeVideo(e)
            },
            addVideo: function (e, t) {
                var i = this.container.querySelector("#video");
                i.src = URL.createObjectURL(t), i.play(), this.playing = !0, i.ontimeupdate = function () {
                    var e = parseInt(i.currentTime, 10),
                        t = Math.floor(e / 3600),
                        n = Math.floor((e - 3600 * t) / 60),
                        o = e - 3600 * t - 60 * n;
                    10 > t && (t = "0" + t), 10 > n && (n = "0" + n), 10 > o && (o = "0" + o), document.querySelector(".live-duration")
                        .innerHTML = t + ":" + n + ":" + o
                }
            },
            removeVideo: function () {
                var e = this.container.querySelector("#video");
                e.stop()
            },
            join: function (e) {
                this.playing || (this.roomId = e, this.room.create(e))
            },
            leave: function () {
                this.room.leave()
            },
            send: function () {}
        };
        return t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Slider = function (e) {
        function t(t, i) {
            var n = this;
            n.analyticsContext = {
                layout: "carousel"
            }, n._controller = t, this.imageHandler = new e.ImagesHandler(t.appKey, this), n.isRTL = "rtl" == t.userSettings.direction, n.element = i;
            var o = t.getUserSetting("pictures_slider");
            n.settings = {
                widget_name: "slider",
                product_id: i.getAttribute("data-product-id"),
                demo: i.getAttribute("data-demo")
            };
            var r = new e.Modules.GallerySettings,
                s = t.getUserSetting("generic_gallery"),
                a = r.getGallerySettings(n.element);
            n.settings.widget_name = "pictures-gallery", s && a && Object.assign(n.settings, a), o && (n.settings.use_full_width = "1" === String(o.settings.full_width), n.settings.auto_play = "1" === String(o.settings.auto_slide), n.settings.widget_ref_name = "visual_carousel_shop_now", n.settings.title = o.settings.slider_title, n.settings.source = o.settings.slider_source, n.settings.hover = o.settings.slider_hover, n.settings.per_page = o.settings.number_of_images || k, n.settings.sort = o.settings.sort), n.settings.product_id ? (n.show_tagged_products = !1, n.analyticsCategory = "pictures_widget", n.analyticsContext.album_type = "product") : (n.show_tagged_products = !0, n.analyticsCategory = "dedicated_page", n.analyticsContext.album_type = "custom"), this.gallerySettings = new e.Modules.GallerySettings, this.gallerySettings.overrideSettingsFromDiv(n.element, n.settings), n.analyticsContext.album_id = n.settings.album_id || "none", n.analyticsContext.gallery_id = n.settings.gallery_id || "none", n.settings.images_to_display = this.calcDisplaySize(i, n.settings.use_full_width);
            for (var l in A) A.hasOwnProperty(l) && n.on(l, A[l])
        }

        function i(e, t) {
            for (var i = 0; i < e.length; i++)
                if (e[i].getAttribute(C) == t.getAttribute(C)) return !0;
            return !1
        }

        function n() {
            for (var e = [], t = o.call(this); t < this.elements.length; ++t) {
                var n = this.elements[t].querySelector(".y-image-overlay");
                i(e, n) || e.push(n)
            }
            return e
        }

        function o() {
            return this.displaySize >= this.originalNumOfImages ? 0 : this.displaySize + 1
        }

        function r() {
            var t = this,
                i = this.element.querySelector(".yotpo-lightbox-wrapper"),
                o = this.element.querySelector(".yotpo-lightbox-contents"),
                r = i.querySelector(".yotpo-lightbox");
            if (r) {
                var s = n.call(this),
                    a = new e.SliderContentProvider(s, o, this.show_tagged_products, t.analyticsCategory + "_popup"),
                    l = new e.AnalyticsTracker(this.analyticsCategory + "_popup", this.analyticsContext);
                this.lightbox = new e.Widgets.Lightbox(this._controller, r, a, l, i);
                for (var c = 0; c < this.elements.length; ++c) {
                    var d = this.elements[c].querySelector(".y-image-wrapper");
                    e.addEventListener(d, "click", function () {
                        t.lightbox.open(this.querySelector(".y-image-overlay"))
                    })
                }
            }
        }

        function s() {
            this.settings.gid || (this._controller.userSettings.generic_gallery = !1), this.sliderWrapper = this.element.querySelector(".yotpo-slider-wrapper"), e.setHoverEnable(this.sliderWrapper), this.displayWrapper = this.element.querySelector(".yotpo-display-wrapper.yotpo-slider"), this.container = this.element.querySelector(".y-slider-container"), this.container && (e.Flows.UploadButton.initUploadButton(this._controller, this.element, this.settings, this.analyticsContext), this.elements = this.container.querySelectorAll(".yotpo-single-image-container"), this.elements.length <= 0 || (this.leftArrow = this.displayWrapper.querySelector(".yotpo-icon-left-arrow-thin"), this.rightArrow = this.displayWrapper.querySelector(".yotpo-icon-right-arrow-thin"), this.originalNumOfImages = parseInt(this.displayWrapper.getAttribute("data-images"), 10), this.displaySize = this.calcDisplaySize(this.displayWrapper, this.settings.use_full_width), this.analyticsTracker = new e.AnalyticsTracker(this.analyticsCategory, this.analyticsContext), this.imagesAnalyticsHandler = new e.ImagesAnalyticsHandler(this.element, this.analyticsTracker), this.brokenImageDescriptors = [], u.call(this), d.call(this), this.imageHandler.loadImages(c, l, a)))
        }

        function a(e, t, i) {
            i.imageHandler.handleMediaAfterLoad(e, t)
        }

        function l(e, t) {
            var i = {
                id: t,
                source: e.imageHandler.getImageSource(t),
                reported: !1
            };
            e.brokenImageDescriptors.push(i)
        }

        function c(e) {
            e.brokenImageDescriptors.length > 0 && (e.imageHandler.reportInvalidImages(e.brokenImageDescriptors), e.imageHandler.replaceBrokenImages(e.brokenImageDescriptors)), y.call(e)
        }

        function d() {
            g.call(this), this.sliderWrapper.style.maxWidth = h.call(this);
            var t = this.settings.auto_play;
            this._controller.userSettings.generic_gallery && (t = this.gallerySettings.getGallerySettings(this.element)
                .layout.auto_slide), this.slide = new e.Modules.Slide(this.container, {
                imageCount: this.originalNumOfImages,
                displayWindowCount: this.displaySize,
                useOffset: this.displaySize < this.elements.length,
                delayInterval: _,
                autoSlide: t,
                slideDirection: this.isRTL ? "left" : "right",
                rtl: this.isRTL
            }), this.slide.start(), f.call(this)
        }

        function u() {
            if (this.settings.load_lightbox_sync) r.call(this);
            else {
                var e = {};
                e = this._controller.userSettings.generic_gallery ? {
                    method: "generic_lightbox_container",
                    params: this.getSettings()
                } : {
                    method: "lightbox_container",
                    params: this.getSettings()
                }, this._controller.getBatch(p.bind(this), [e], null)
            }
        }

        function p(e) {
            var t = JSON.parse(e)[0];
            t && (this.element.insertAdjacentHTML("afterbegin", t.result), r.call(this))
        }

        function g() {
            var t = this.elements.length;
            this.displaySize <= t && (this.container.style.width = 100 / this.displaySize * t + "%");
            for (var i = 100 / t + "%", n = e.getComputedMargins(this.elements[0]), o = n.left + n.right, r = 0; t > r; ++r) this.elements[r].style.width = "calc(" + i + " - " + o + "px)"
        }

        function h() {
            var t = w;
            if (!e.isIE8) {
                var i = this.elements[0],
                    n = e.getComputedMargins(i);
                t = parseInt(e.getComputedStyle(i, "max-width")
                    .replace("px", ""), 10) + n.left + n.right
            }
            return t * this.displaySize + "px"
        }

        function m(t) {
            var i = this;
            e.addEventListener(t, "mouseover", function () {
                i.slide.pause()
            }), e.addEventListener(t, "mouseout", function () {
                i.slide.play()
            })
        }

        function f() {
            var e = this;
            this.leftArrow && (this.leftArrow.onclick = function () {
                e.slide.left()
            }, m.call(this, this.leftArrow)), this.rightArrow && (this.rightArrow.onclick = function () {
                e.slide.right()
            }, m.call(this, this.rightArrow));
            for (var t = 0; t < this.elements.length; ++t) m.call(this, this.elements[t])
        }

        function y() {
            this.imagesAnalyticsHandler.bindAnalyticsForloadedImages(this.elements), v.call(this)
        }

        function v() {
            var t = this;
            this.rightArrow && e.addEventListener(this.rightArrow, "click", function () {
                t.analyticsTracker.track("clicked_on", t.isRTL ? "widget_previous_image" : "widget_next_image", null)
            }), this.leftArrow && e.addEventListener(this.leftArrow, "click", function () {
                t.analyticsTracker.track("clicked_on", t.isRTL ? "widget_next_image" : "widget_previous_image", null)
            })
        }
        var b = 180,
            w = 185,
            _ = 5e3,
            S = 3,
            C = "data-image-id",
            k = 56,
            A = {};
        return t.selector = e.widgets.slider.selector, t.prototype.getMethod = function () {
            return "Slider"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, t.prototype.getImageElements = function () {
            return this.elements
        }, t.prototype.calcDisplaySize = function (e, t) {
            var i = e.offsetWidth / b,
                n = t ? Math.ceil(i) : Math.floor(i);
            return Math.max(n, S)
        }, A = {
            ready: function () {
                s.call(this)
            }
        }, t
    }(Yotpo), Yotpo.Widgets.VisualCarousel = function (e) {
        function t(t, i) {
            var n = 56,
                o = "UGC Gallery";
            e.Widgets.Slider.call(this, t, i), this.getMethod = function () {
                return "VisualCarousel"
            }, this.analyticsCategory = "dedicated_page", self.analyticsContext = {
                layout: "carousel"
            };
            var r = t.getUserSetting("visual_carousel");
            this.settings.widget_name = "visual_carousel", this.settings.album_name = o, r && (this.settings.auto_play = "1" === String(r.settings.auto_slide), this.settings.title = r.settings.slider_title, this.settings.cta_text = r.settings.cta_text, this.settings.cta_color = r.settings.cta_color, this.settings.source = r.settings.slider_source, this.settings.css_settings_class = "yotpo-visual-carousel", this.settings.widget_ref_name = "visual_carousel_shop_now", this.settings.use_full_width = "1" === String(r.settings.full_width), this.settings.per_page = r.settings.number_of_images || n, this.settings.sort = r.settings.sort);
            var s = new e.Modules.GallerySettings;
            s.overrideSettingsFromDiv(this.element, this.settings), self.analyticsContext.album_id = this.settings.album_id || "none", self.analyticsContext.album_type = "custom", this.show_tagged_products = !0, this.settings.images_to_display = this.calcDisplaySize(i, this.settings.use_full_width)
        }
        return t.prototype = e.Widgets.Slider.prototype, t.selector = ".yotpo.yotpo-visual-carousel", t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Testimonials = function (e) {
        function t(e, t) {
            var n = this;
            n.analyticsCategory = "tab", n._controller = e, n.element = t || i(), n.sources = {}, n.settings = {}, "yotpo-testimonials-custom-tab" == n.element.id ? (n.settings.per_page = 10, n.settings.type = "testimonials_custom_tab", delete v.resize, n.analyticsCategory = "reviews_dedicated_page") : n.settings.type = "testimonials", e.getWidgetByName("Main") && e.getWidgetByName("Main")
                .getSettings()
                .tags && (n.settings.tags = e.getWidgetByName("Main")
                    .getSettings()
                    .tags), n.element.getAttribute("data-product-readonly") ? n.settings["data-product-readonly"] = !0 : e.getWidgetByName("Main") && e.getWidgetByName("Main")
                .getSettings()["product-readonly"] && (n.settings["data-product-readonly"] = !0), e.getWidgetByName("ShoppableGallery") && e.getWidgetByName("ShoppableGallery")
                .getSettings()
                .yotpo_hosted_page && (n.settings["hidden-widget"] = !0);
            var o = "undefined" != typeof e.getUserSetting("testimonials") ? e.getUserSetting("testimonials")
                .settings : null,
                r = o && ("both" == o.show_tab ? o.default_tab : o.show_tab);
            if ("product_tab" == r) {
                var s = e.getWidgetByName("Main");
                null != s && (n.settings.pid = s.getSettings()
                    .pid)
            }
            for (var a in v) v.hasOwnProperty(a) && n.on(a, v[a])
        }

        function i() {
            var e = document.createElement("div");
            return e.className = "yotpo testimonials", document.body.appendChild(e), e
        }

        function n() {
            var t = this,
                i = t.getElement()
                .getElementsByClassName("yotpo-testimonials-btn")[0],
                n = t.getElement()
                .getElementsByClassName("close")[0];
            t.button = i, t.content = document.getElementById(i.getAttribute("href")
                .substring(1)), i.onclick = function () {
                return e.currentAnalytics.trackUniqueEvent("tab", "clicked_on"), t.open(), !1
            }, n.onclick = function () {
                return t.close(), "undefined" != typeof t.get("form") && t.get("form")
                    .clean(), !1
            };
            var o = t.content.getElementsByClassName("yotpo-modal-mask")[0];
            o && (o.onclick = n.onclick)
        }

        function o() {
            var t = this;
            t.tabs = new e.Tabs(t.getElement()
                .getElementsByClassName("yotpo-nav")[0]), t.tabs.on("changed", function (e) {
                a.call(t, e)
            })
        }

        function r() {
            for (var t = this, i = t._controller.getWidgetByName("Main"), n = t.tabs.getTabs(), o = 0; o < n.length; ++o) {
                var r = n[o].getAttribute("data-content"),
                    a = n[o].getAttribute("data-type"),
                    l = n[o] == t.tabs.getActive();
                e.forEach(r.split(" "), function (n) {
                    var o = s(n);
                    if (o) {
                        var r = document.getElementById(n),
                            c = e.hasClass(r, "yotpo-reviews") ? "basic" : "bottomline",
                            d = a + "-" + c;
                        t.sources[d] = new(e.Widgets[e.capitalize(c)])(t._controller, r), "site" == a && (t.sources[d].settings.pid = "yotpo_site_reviews", t.sources[d].settings.include_site_reviews = !0), "product" == a && i && (t.sources[d].settings.pid = i.getSettings()
                            .pid), t.sources[d].sourceType = a;
                        var p, m;
                        "site-basic" == d ? (p = document.querySelector("#yotpo-site-reviews-tab"), m = document.querySelector("#yotpo-site-mobile-clear-filters")) : "product-basic" == d && (p = document.querySelector("#yotpo-product-reviews-tab"), m = document.querySelector("#yotpo-product-mobile-clear-filters")), p && (t.sources[d].reviewsContainerElement = p), m && (t.sources[d].mobileClearFiltersBtnElem = m);
                        var f = t._controller.userSettings.review_with_pictures;
                        t.sources[d].reviewsWithPicturesEnabled = f && "1" === f.settings.testimonials_visible, t.sources[d].settings.reference = "testimonials_widget_internal", t.sources[d].settings.hide_custom_fields = !0, t.sources[d].settings.per_page = t.getSettings()
                            .per_page, t.sources[d].settings.type = t.getSettings()
                            .type, t.sources[d].on("ready", function () {
                                u.call(t, t.sources[d])
                            }), l && !t.sources[d].initialized && h.call(t.sources[d], a), t.sources[d].trigger("ready"), t.sources[d].on("pageChanged", function () {
                                this.isFilteredReviews && (g.call(this, !0), this.filtersManager.fetchPage(this.settings.page)), setTimeout(function () {
                                    e.scrollToTop(t.sources[d].getElement())
                                }, 300)
                            })
                    }
                })
            }
        }

        function s(e) {
            return -1 !== e.search("yotpo-testimonials-site-reviews") || -1 !== e.search("yotpo-testimonials-product-reviews") || -1 !== e.search("yotpo-testimonials-site-bottomline") || -1 !== e.search("yotpo-testimonials-product-bottomline")
        }

        function a(t) {
            var i = this,
                n = t.element.getAttribute("data-type"),
                o = t.element.getAttribute("data-content");
            e.forEach(o.split(" "), function (t) {
                var o = s(t);
                if (o) {
                    var r = document.getElementById(t);
                    if (!r.innerHTML.trim() || 0 == r.innerHTML.trim()
                        .length) {
                        var a = e.hasClass(r, "yotpo-reviews") ? "basic" : "bottomline",
                            l = n + "-" + a;
                        i.sources[l].settings.is_bottomline_summary = !1, i._controller.getUserSettings()
                            .new_testimonials_widget_layout && (i.sources[l].settings.is_bottomline_summary = !0), i.sources[l].refresh(), i.sources[l].on("ready", function () {
                                this.initialized || (e.Modules.Handle.write.call(i, "review"), h.call(this, n));
                                var t = this.getElement()
                                    .querySelector(".write-first-review-button");
                                return t ? void e.addEventListener(t, "click", function () {
                                    var t = i.getElement()
                                        .querySelector(".yotpo-modal-bottom-line .write-review-button");
                                    e.simulateClickEvent(t)
                                }) : void d.call(this)
                            })
                    }
                }
            });
            var r = i.getElement()
                .querySelector("input[type=button]");
            "product" == n && "undefined" == typeof i.getActiveSource()
                .getSettings()
                .pid ? e.hide(r) : e.show(r);
            var a = i.getElement()
                .querySelector(".write-review-wrapper");
            e.removeClass(a, "visible"), a.style.display = "none";
            for (var l = i.getElement()
                    .querySelectorAll(".yotpo-custom-tag-field"), c = 0; c < l.length; c++) "site" == n ? e.addClass(l[c], "yotpo-hidden") : e.removeClass(l[c], "yotpo-hidden")
        }

        function l() {
            var t = this,
                i = t.button.getAttribute("data-position"),
                n = function (e, t) {
                    var i = {};
                    if ("horizontal" == t) {
                        var n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        i.left = n / 2 - e.offsetWidth / 2 + "px"
                    } else {
                        var o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                        i.top = o / 2 - e.offsetHeight / 2 + "px"
                    }
                    i["z-index"] = 799;
                    for (var r in i) i.hasOwnProperty(r) && (e.style[r] = i[r])
                };
            if (/MSIE/.test(navigator.userAgent)) {
                var o = parseInt(navigator.userAgent.toLowerCase()
                    .split("msie")[1].split(";")[0]);
                (o != document.documentMode || 9 > o && "horizontal" != i) && e.addClass(t.button, "use-image")
            }
            n(t.button, i), e.addEventListener(window, "resize", function () {
                n(t.button, i)
            })
        }

        function c() {
            var t = this.getElement()
                .getElementsByClassName("yotpo-messages");
            t.length > 0 && (this.messages = new e.Messages(t))
        }

        function d() {
            for (var t, i = this, n = i.getElement()
                    .getElementsByClassName("product-link"), o = 0; t = n[o]; o++) e.addEventListener(t, "click", function () {
                var t = this.getAttribute("data-product-id");
                e.currentAnalytics.trackEvent("reviews", "clicked_on", "product_name", t)
            })
        }

        function u(t) {
            var i, n = this;
            i = "tab" == n.analyticsCategory ? n.analyticsCategory + "_popup" : n.analyticsCategory;
            var o = [];
            t.reviewsContainerElement && (o = t.reviewsContainerElement.querySelectorAll(".yotpo-review"));
            for (var r = 0; r < o.length; r++) {
                var s = o[r];
                e.currentAnalytics.trackReview(s, i, "loaded"), e.hoverAnalytics.register(s, function () {
                    e.currentAnalytics.trackReview(this, i, "hovered")
                });
                var a = function (n) {
                    return function () {
                        if (void 0 !== t.analyticsFilterId && 0 !== t.analyticsFilterId) {
                            var o = {
                                source: "filter_reviews",
                                filter_state_id: t.analyticsFilterId,
                                page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(t),
                                reviews_tab_type: t.sourceType
                            };
                            e.currentAnalytics.trackReview(n, i, "shown", o)
                        } else e.currentAnalytics.trackReview(n, i, "shown", {
                            source: "reviews"
                        })
                    }
                }(s);
                "reviews_dedicated_page" == i ? e.currentInview.register(s, a) : e.currentInview.registerinModal(s, a)
            }
            var l = o.length - 1,
                c = l > 0 ? "has_reviews" : "no_reviews";
            e.currentAnalytics.trackUniqueEvent(n.analyticsCategory, "loaded", c), e.currentAnalytics.trackUniqueEvent(n.analyticsCategory, "shown"), e.hoverAnalytics.register(n.element, function () {
                e.currentAnalytics.trackUniqueEvent(n.analyticsCategory, "hovered")
            })
        }

        function p() {
            var t = this;
            for (var i in t.sources)
                if (-1 !== i.search("basic")) {
                    var n = t.sources[i];
                    e.Modules.Handle.desktopDropDown.call(n, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSelectSort, n.reviewsContainerElement, "sorting"), e.Modules.Handle.desktopDropDown.call(n, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSelectFilter, n.reviewsContainerElement, "filters-dropdown"), n.filtersManager = new e.FiltersStateManager(t._controller, "Testimonials", n.settings), n.filtersManager.subscribeToFiltersUpdate(t), n.mobileFiltersModal = new e.MobileFilterModal(n, n.reviewsContainerElement, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onMobileFiltersSubmitted);
                    var o = Array.from(n.reviewsContainerElement.querySelectorAll(".desktop-clear-all-btn"));
                    n.mobileClearFiltersBtnElem && o.push(n.mobileClearFiltersBtnElem), n.clearAllButtons = o;
                    for (var r = 0; r < n.clearAllButtons.length; r++) ! function (t) {
                        e.addEventListener(t.clearAllButtons[r], "click", function () {
                            e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.clearAllFilters.call(t)
                        })
                    }(n);
                    e.FreeTextSearch.bind.call(n, n.reviewsContainerElement, f, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onFreeTextSearchedCallBack, e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onClearTextSearchedCallBack)
                }
        }

        function g(t) {
            var i = this.element;
            e.SearchInProgress.switchMode(i.parentElement, t)
        }

        function h(t) {
            var i = this.getElement()
                .querySelector(".total-reviews-search");
            if (i) {
                var n = i.getAttribute("total-reviews-search"),
                    o = !1,
                    r = !1;
                0 == n ? (o = !0, r = !0) : n < e.filterAndSearch.min_reviews_for_filters_container && (r = !0);
                var s = this.getElement()
                    .parentElement.querySelector("#yotpo-" + t + "-reviews-header");
                if (s)
                    if (o) e.hide(s);
                    else {
                        var a = s.querySelector(".reviews-amount");
                        a && (a.innerHTML = n + " " + e.filterAndSearch.filtered_reviews_title)
                    } if (r) {
                    var l = this.getElement()
                        .parentElement.querySelector("#yotpo-" + t + "-reviews-filters");
                    l && e.hide(l)
                } else m.call(this, n)
            }
            this.initialized = !0
        }

        function m(t) {
            e.FilterAndSearch.Analytics.AnalyticsNotifier.init.call(this);
            var i = {
                    met_requirements: !0,
                    desktop_topics_count: 0,
                    desktop_suggested_topics: [],
                    mobile_topics_count: 0,
                    mobile_suggested_topics: [],
                    custom_fields_count: 0,
                    reviews_count: parseInt(t),
                    metadata_fields_count: 0,
                    free_text_included: this._controller.userSettings.testimonials.settings.display_free_text_filters,
                    page_type: e.FilterAndSearch.Analytics.AnalyticsNotifier.getPageType.call(this)
                },
                n = this;
            e.currentInview.register(this.reviewsContainerElement, function () {
                e.currentAnalytics.trackEvent("filter_reviews", "shown", n.settings.pid, null, i)
            }), e.currentAnalytics.trackEvent("filter_reviews", "loaded", this.settings.pid, null, i)
        }
        var f, y, v = {};
        return t.selector = e.widgets.testimonials.selector, t.createsElement = function (t) {
            return e.isMobile() ? !1 : "undefined" != typeof t.testimonials_tab && t.testimonials_tab !== !1
        }, t.prototype.getMethod = function () {
            return "testimonials"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.getTabs = function () {
            return this.tabs
        }, t.prototype.getAppKey = function () {
            return this._controller.getAppKey()
        }, t.prototype.get = function (e) {
            return this[e]
        }, t.prototype.getActiveSource = function () {
            return this.sources[this.tabs.getActive()
                .getAttribute("data-type") + "-basic"]
        }, t.prototype.getProductInfo = function () {
            var t = this.tabs.getActive()
                .getAttribute("data-type");
            if ("product" == t && "undefined" != typeof this.getActiveSource()
                .getSettings()
                .pid)
                for (var i = this._controller.getWidgets(), n = 0; n < i.length; ++n)
                    if (i[n] instanceof e.Widgets.Main) return i[n].getProductInfo();
            var o = this._controller.getUserSettings()
                .account_settings.settings.name,
                r = this._controller.getUserSettings()
                .account_settings.settings.domain,
                s = "my.yotpo.com" === window.location.host ? r : e.origin();
            return {
                sku: "yotpo_site_reviews",
                product_title: o,
                product_url: s,
                domain: s
            }
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.open = function () {
            var t = this;
            t.content.style.display = "block", setTimeout(function () {
                e.addClass(t.content, "yotpo-modal-active"), t.trigger("resize"), e.currentInview.verifyInviewT()
            }, 10), e.currentAnalytics.trackUniqueEvent("tab_popup", "loaded"), e.currentAnalytics.trackUniqueEvent("tab_popup", "shown");
            var i = t.content.querySelector(".yotpo-modal-dialog");
            e.addEventListener(i, "click", function () {
                e.currentAnalytics.trackUniqueEvent("tab_popup", "clicked_on")
            }), e.hoverAnalytics.register(i, function () {
                e.currentAnalytics.trackUniqueEvent(t.analyticsCategory + "_popup", "hovered")
            })
        }, t.prototype.close = function () {
            var t = this;
            e.removeClass(t.content, "yotpo-modal-active"), setTimeout(function () {
                t.content.style.display = "none"
            }, 500)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "old"
        }, t.prototype.OnSubmittedFiltersChange = function (t, i) {
            try {
                var n, o;
                "yotpo_site_reviews" === i.pid ? (n = this.sources["site-basic"], o = this.element.querySelector("#yotpo-site-reviews-header")) : (n = this.sources["product-basic"], o = this.element.querySelector("#yotpo-product-reviews-header")), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.onSubmittedFiltersChange.call(n, n, o, n.reviewsContainerElement, t, i), g.call(n, !1)
            } catch (r) {
                e.safeConsole(r.message)
            }
        }, v = {
            ready: function () {
                y = e.filterAndSearch.filters_state_manager.aggregators_types, f = e.filterAndSearch.free_text_search_input_placeholder, e.FilterAndSearch.FiltersHandlers.FilterDropDownsHandler.init(), e.FilterAndSearch.FiltersHandlers.FilterTagsHandler.init(), e.FilterAndSearch.ContainersHandlers.ReviewsFiltersHandler.init(), n.call(this), l.call(this), o.call(this), r.call(this), c.call(this), this._controller.userSettings.new_testimonials_widget_layout && p.call(this), e.Modules.Handle.write.call(this, "review"), e.Modules.Handle.sources.call(this), e.Modules.Handle.semiWhiteLabel.call(this), d.call(this)
            },
            resize: function () {
                var e = this.element,
                    t = e.getElementsByClassName("yotpo-modal-dialog")[0].offsetHeight,
                    i = +(e.getElementsByClassName("yotpo-label")[0] || {})
                    .offsetHeight,
                    n = e.getElementsByClassName("yotpo-modal-header")[0].offsetHeight,
                    o = e.getElementsByClassName("yotpo-modal-bottom-line")[0];
                o || (o = e.querySelector(".yotpo-bottomline-container-box"));
                var r = e.getElementsByClassName("yotpo-nav-primary")[0].offsetHeight,
                    s = t - i - n - o.offsetHeight - r;
                s > 0 && (e.getElementsByClassName("yotpo-modal-body")[0].style.height = s + "px")
            }
        }, t
    }(Yotpo), Yotpo.Widgets = Yotpo.Widgets || {}, Yotpo.Widgets.Ticker = function (e) {
        function t(t, i) {
            var o = this;
            o._controller = t;
            var s = t.getUserSetting("ticker"),
                a = t.getUserSetting("demo") || !1;
            o.tickerSettings = s ? s.settings : {
                delay_between_notifications: 5,
                display_time: 7,
                initial_delay: 1,
                position: "top_right",
                types: ["likeable_topics", "products_in_top_topics", "product_page_views", "live_orders", "best_sentences"]
            }, o.element = i;
            var l = e.getURLParameter(location.search, "ticker_demo") || !1;
            o.settings = {
                ticker_demo: l,
                types: o.tickerSettings.types,
                demo: a
            }, n.call(o), o.totalTickerMessages = 0, o.tickerMessageIndex = 0;
            for (var c in r) r.hasOwnProperty(c) && o.on(c, r[c])
        }

        function i() {
            var t = this;
            t.moreReviewsClicked = !1;
            var i = t.element.querySelector(".yotpo-icon-cross");
            i && (i.onclick = function (i) {
                    t.trigger("toggle", !1), clearInterval(t.delayIntervalId), e.currentAnalytics.trackEvent("ticker", "clicked_on", t.tickerType, null, {
                        index: t.tickerMessageIndex.toString(),
                        clicked_x: !0
                    }), i.stopPropagation()
                }), setTimeout(function () {
                    s.call(t), t.delayIntervalId = setInterval(function () {
                        s.call(t)
                    }, 1e3 * (parseInt(t.tickerSettings.delay_between_notifications) + parseInt(t.tickerSettings.display_time)))
                }, 1e3 * parseInt(t.tickerSettings.initial_delay)), o.call(t), t.totalTickerMessages = t.element.querySelectorAll(".yotpo-hidden-ticker-message")
                .length, t.tickerSettings.icon_color && a.call(t), t.containerElement = t.element.querySelector(".yotpo-ticker-container"), t.isDummy = "true" === t.containerElement.getAttribute("data-is-dummy"), t.metRequirements = "true" === t.containerElement.getAttribute("data-met-requirements"), e.currentAnalytics.trackEvent("ticker", t.isDummy ? "loaded_dummy" : "loaded", null, null, {
                    met_requirements: t.metRequirements
                })
        }

        function n() {
            var e = this,
                t = document.querySelector("div.yotpo.yotpo-main-widget");
            if (t) {
                var i = t.getAttribute("data-product-id");
                i && (e.settings.pid = i)
            }
        }

        function o() {
            var t = this,
                i = t.element.querySelector(".yotpo-ticker-container");
            e.addClass(i, t.tickerSettings.position)
        }
        var r = {};
        t.prototype.getMethod = function () {
            return "ticker"
        }, t.prototype.getSettings = function () {
            return this.settings
        }, t.selector = ".yotpo.ticker", t.alwaysShow = !0, t.prototype.getElement = function () {
            return this.element
        }, t.prototype.trigger = function (t, i) {
            e.Modules.Event.trigger.call(this, t, i)
        }, t.prototype.on = function (t, i) {
            e.Modules.Event.on.call(this, t, i)
        }, t.prototype.state = function (t) {
            return e.Modules.Helper.state.call(this, t)
        }, t.prototype.is = function (t) {
            return e.Modules.Helper.is.call(this, t)
        }, t.prototype.getLayout = function () {
            return "new"
        }, r = {
            ready: function () {
                var e = this;
                i.call(e)
            },
            toggle: function (t) {
                var i = this,
                    n = i.element.querySelector(".yotpo-ticker-container");
                1 == t ? e.addClass(n, "show") : 0 == t && e.removeClass(n, "show")
            }
        };
        var s = function () {
                var t = this;
                if (t.tickerMessageIndex == t.totalTickerMessages) {
                    if (!t.settings.demo) return void clearInterval(t.delayIntervalId);
                    t.tickerMessageIndex = t.totalTickerMessages = 0
                }
                t.trigger("toggle", !0);
                var i = t.element.querySelector("#yotpo-ticker-messages-" + t.tickerMessageIndex),
                    n = t.element.querySelector("#yotpo-ticker-subtitle-" + t.tickerMessageIndex);
                t.tickerIconElm && e.addClass(t.tickerIconElm, "yotpo-hidden");
                var o = t.element.querySelector("#yotpo-ticker-type-" + t.tickerMessageIndex);
                t.tickerType = o.textContent;
                var r = t.element.querySelector(".yotpo-ticker-message"),
                    s = t.element.querySelector(".yotpo-ticker-grey-bottom");
                t.tickerIconElm = t.element.querySelector("#yotpo-ticker-type-" + o.textContent), e.removeClass(t.tickerIconElm, "yotpo-hidden"), r.innerHTML = i.textContent, s.innerHTML = "&nbsp;" + n.textContent;
                var a = setTimeout(function () {
                    t.trigger("toggle", !1)
                }, 1e3 * parseInt(t.tickerSettings.display_time));
                t.containerElement.onmouseenter = function () {
                    clearInterval(a), e.currentAnalytics.trackEvent("ticker", "hovered", t.tickerType, null, {
                        index: t.tickerMessageIndex.toString()
                    })
                }, t.containerElement.onmouseleave = function () {
                    a = setTimeout(function () {
                        t.trigger("toggle", !1)
                    }, 2e3)
                }, "best_sentences" == t.tickerType || "likeable_topics" == t.tickerType || "products_in_top_topics" == t.tickerType ? (e.addClass(t.containerElement, "yotpo-ticker-cursor-pointer"), t.containerElement.onclick = function () {
                    t.moreReviewsClicked = !0, e.scrollToReviewsTabInMainWidget(t._controller, !0), e.currentAnalytics.trackEvent("ticker", "clicked_on", t.tickerType, null, {
                        index: t.tickerMessageIndex.toString(),
                        clicked_x: !1
                    })
                }) : (e.removeClass(t.containerElement, "yotpo-ticker-cursor-pointer"), t.containerElement.onclick = void 0), e.addClass(t.containerElement.querySelector(".yotpo-ticker-review-stars"), "yotpo-hidden"), e.addClass(t.containerElement.querySelector(".yotpo-ticker-product-stars"), "yotpo-hidden"), "best_sentences" == t.tickerType && e.removeClass(t.containerElement.querySelector(".yotpo-ticker-review-stars"), "yotpo-hidden"), ("likeable_topics" == t.tickerType || "products_in_top_topics" == t.tickerType) && e.removeClass(t.containerElement.querySelector(".yotpo-ticker-product-stars"), "yotpo-hidden"), e.currentAnalytics.trackEvent("ticker", t.isDummy ? "shown_dummy" : "shown", t.tickerType, null, {
                    met_requirements: t.metRequirements,
                    index: t.tickerMessageIndex.toString()
                }), t.tickerMessageIndex++
            },
            a = function () {
                for (var e = this, t = e.element.querySelectorAll(".yotpo-ticker-icon"), i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.style.color = e.tickerSettings.icon_color
                }
            };
        return t
    }(Yotpo);
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia,
    RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription,
    RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
    RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
Room.prototype.on = function (e, t) {
    this.handles[e] = t
}, Room.prototype["in"] = function () {
    this.signal = new WebSocket(this.signalServer + encodeURIComponent(this.me)), this.signal.onopen = this._signal_open.bind(this), this.signal.onclose = this._signal_close.bind(this), this.signal.onerror = this._signal_error.bind(this), this.signal.onmessage = this._signal_message.bind(this)
}, Room.prototype._signal_open = function (e) {
    "function" == typeof this.handles.signal_open && this.handles.signal_open(e)
}, Room.prototype._signal_close = function (e) {
    this._clean(), "function" == typeof this.handles.signal_close && this.handles.signal_close(e)
}, Room.prototype._signal_error = function (e) {
    this._clean(), "function" == typeof this.handles.signal_error && this.handles.signal_error(e)
}, Room.prototype._signalSend = function (e) {
    this.signal.send(JSON.stringify(e))
}, Room.prototype._clean = function () {
    this.id = void 0, this.stream = void 0;
    for (var e in this.peers) this.peers[e].c.close(), delete this.peers[e];
    for (var e in this.channels) "open" === this.channels[e].readyState && this.channels[e].close(), delete this.channels[e]
}, Room.prototype._newPeerConnection = function () {
    return new RTCPeerConnection({
        iceServers: this.iceServers
    })
}, Room.prototype.setStream = function (e) {
    this.stream = e
}, Room.prototype.create = function (e) {
    this._signalSend({
        For: "create",
        Room: e
    })
}, Room.prototype.join = function (e) {
    this._signalSend({
        For: "join",
        Room: e
    })
}, Room.prototype.leave = function () {
    this._signalSend({
        For: "leave",
        Room: this.id
    })
}, Room.prototype.send = function (e) {
    for (var t in this.channels) "open" === this.channels[t].readyState && this.channels[t].send(e)
}, Room.prototype.peersCount = function () {
    var e = 0;
    for (var t in this.peers)("connected" === this.peers[t].readyState || "completed" === this.peers[t].iceConnectionState) && e++;
    return e
}, Room.prototype.channelsCount = function () {
    var e = 0;
    for (var t in this.channels) "open" === this.channels[t].readyState && e++;
    return e
}, Room.prototype._signal_message = function (e) {
    var t = JSON.parse(e.data);
    switch (t.For) {
    case "create":
        this.id = t.Room, "function" == typeof this.handles.message_create && this.handles.message_create(t);
        break;
    case "join":
        this.id = t.Room, "function" == typeof this.handles.message_join && this.handles.message_join(t);
        break;
    case "join_older":
        this._join_older(t);
        break;
    case "join_newer":
        this._join_newer(t);
        break;
    case "leave":
        this._clean(), "function" == typeof this.handles.message_leave && this.handles.message_leave(t);
        break;
    case "icecandidate":
        this.peers[t.From].hasRSDP ? this.peers[t.From].c.addIceCandidate(new RTCIceCandidate(t.Data)) : this.peers[t.From].candidates.push(t.Data);
        break;
    case "offer":
        var i = this;
        i.peers[t.From].c.setRemoteDescription(new RTCSessionDescription(t.Data), function () {
            for (i.peers[t.From].hasRSDP = !0;;) {
                var e = i.peers[t.From].candidates.shift();
                if (!e) break;
                i.peers[t.From].c.addIceCandidate(new RTCIceCandidate(e))
            }
            i.peers[t.From].c.createAnswer(function (e) {
                i.peers[t.From].c.setLocalDescription(e, function () {
                    i._signalSend({
                        Room: i.id,
                        From: i.me,
                        To: t.From,
                        For: "answer",
                        Data: e
                    })
                }, function () {})
            }, function () {})
        }, function () {});
        break;
    case "answer":
        var i = this;
        i.peers[t.From].c.setRemoteDescription(new RTCSessionDescription(t.Data), function () {
            for (i.peers[t.From].hasRSDP = !0;;) {
                var e = i.peers[t.From].candidates.shift();
                if (!e) break;
                i.peers[t.From].c.addIceCandidate(new RTCIceCandidate(e))
            }
        }, function () {});
        break;
    case "notice":
        "function" == typeof this.handles.message_notice && this.handles.message_notice(t)
    }
}, Room.prototype._join_older = function (e) {
    var t = this,
        i = t._newPeerConnection();
    t.peers[e.Data] = {
        c: void 0,
        hasRSDP: !1,
        candidates: []
    }, t.peers[e.Data].c = i, t.stream && i.addStream(t.stream), i.onaddstream = function (i) {
        "function" == typeof t.handles.stream_add && t.handles.stream_add(e.Data, i.stream, i)
    }, i.onremovestream = function (i) {
        "function" == typeof t.handles.stream_remove && t.handles.stream_remove(e.Data, i)
    }, i.onicecandidate = function (i) {
        i.candidate && t._signalSend({
            Room: t.id,
            From: t.me,
            To: e.Data,
            For: "icecandidate",
            Data: i.candidate
        })
    };
    var n = i.createDataChannel(e.Data);
    n.onopen = function (i) {
        t.channels[e.Data] = n, "function" == typeof t.handles.channel_open && t.handles.channel_open(e.Data, i)
    }, n.onmessage = function (i) {
        "function" == typeof t.handles.channel_message && t.handles.channel_message(e.Data, i.data, i)
    }, n.onclose = function (i) {
        "function" == typeof t.handles.channel_close && t.handles.channel_close(e.Data, i)
    }
}, Room.prototype._join_newer = function (e) {
    var t = this,
        i = t._newPeerConnection();
    t.peers[e.Data] = {
        c: void 0,
        hasRSDP: !1,
        candidates: []
    }, t.peers[e.Data].c = i, t.stream && i.addStream(t.stream), i.onaddstream = function (i) {
        "function" == typeof t.handles.stream_add && t.handles.stream_add(e.Data, i.stream, i)
    }, i.onremovestream = function (i) {
        "function" == typeof t.handles.stream_remove && t.handles.stream_remove(e.Data, i)
    }, i.onicecandidate = function (i) {
        i.candidate && t._signalSend({
            Room: t.id,
            From: t.me,
            To: e.Data,
            For: "icecandidate",
            Data: i.candidate
        })
    }, i.oniceconnectionstatechange = function (n) {
        "connected" === i.iceConnectionState && "function" == typeof t.handles.peer_open && t.handles.peer_open(e.Data, n), "completed" === i.iceConnectionState && "function" == typeof t.handles.peer_open && t.handles.peer_open(e.Data, n), "disconnected" === i.iceConnectionState && "function" == typeof t.handles.peer_close && t.handles.peer_close(e.Data, n), "closed" === i.iceConnectionState && "function" == typeof t.handles.peer_close && t.handles.peer_close(e.Data, n), "failed" === i.iceConnectionState && "function" == typeof t.handles.peer_close && t.handles.peer_close(e.Data, n)
    }, i.onsignalingstatechange = function () {}, i.ondatachannel = function (i) {
        var n = i.channel;
        n.onopen = function (i) {
            t.channels[e.Data] = n, "function" == typeof t.handles.channel_open && t.handles.channel_open(e.Data, i)
        }, n.onmessage = function (i) {
            "function" == typeof t.handles.channel_message && t.handles.channel_message(e.Data, i.data, i)
        }, n.onclose = function (i) {
            "function" == typeof t.handles.channel_close && t.handles.channel_close(e.Data, i)
        }
    }
};
/**
 * Widget Version
 *
 * @type {String}
 */
Yotpo.version = '2019-03-03_14-34-56';
/**
 * Yotpo hosts
 */
Yotpo.hosts = {
    "widget": {
        "dynamic": "w2.yotpo.com",
        "static": "staticw2.yotpo.com"
    },
    "api": {
        "dynamic": "api.yotpo.com"
    },
    "b2b": {
        "dynamic": "my.yotpo.com"
    },
    "reviews_me": {
        "dynamic": "reviews.me"
    },
    "base": {
        "dynamic": "yotpo.com"
    }
};

/**
 * Max batch methods per request
 */
Yotpo.maxBatchMethods = 50;

/**
 * All available Yotpo texts and thier translations
 *
 * @type {object} - Object of texts and translations
 */
Yotpo.texts = {
    read_more: 'Read More',
    read_less: 'Read Less',
    ada_read_more: 'read_more',
    upload_photos_invalid_type: 'Files must be in JPG, PNG, or GIF formats',
    upload_photos_invalid_size: 'File size over 15MB',
    upload_photos_invalid_image_dimensions: 'Photos must be at least 400 x 400 px',
    upload_photos_invalid_image_file: 'Sorry, we weren’t able to upload your photo',
    upload_video_error: 'Upload failed, please try again',
    upload_video_invalid_type: 'Files must be in JPG, PNG, GIF, MP4, MOV or FLV formats'
}

Yotpo.filterAndSearch = {
    min_reviews_for_filters_container: 3,
    filtered_reviews_title: 'Reviews',
    free_text_search_input_placeholder: 'Search Reviews',
    filters_drop_down_default_answer: 'All',
    sorts_drop_down_default_answer: 'Select',
    sort_drop_down_most_relevant_value: 'Most Relevant',
    imagesMobileFilterDefaultAnswer: 'All Reviews',
    images_drop_down_answer: 'Reviews With Images',
    rating_tag_title: 'Rating',
    show: 'Show',
    withImagesOnly: 'Images Only',
    filters_state_manager: {
        aggregators_types: {
            crfs: 'crfs',
            scores: 'scores',
            topics: 'topics',
            images: 'images',
            sorts: 'sorts',
            free_text_search: 'free_text_search',
            orders: 'orders'
        }
    },
    analytics: {
        page_types: {
            main_widget: 1,
            dedicated_page: 2,
            testimonials_tab: 3
        }
    }
}

Yotpo.defaultImages = {
    size_180: "https://staticw2.yotpo.com/assets/default_image_180px.jpg",
    size_656: "https://staticw2.yotpo.com/assets/default_image_656px.jpg",
    profile: "https://staticw2.yotpo.com/assets/default_profile.png"
}

/**
 * Share links for all social networks
 */
Yotpo.socialData = {
    facebook: {
        application_id: "226132034107547",
        feed_link: "https://www.facebook.com/dialog/feed"
    },
    twitter: {
        intent_link: "https://twitter.com/intent/tweet"
    },
    google: {
        share_link: "https://plus.google.com/share"
    },
    linkedin: {
        share_link: "https://www.linkedin.com/shareArticle"
    }
}

Yotpo.feature_testing_groups = {}


Yotpo.awsS3Domain = "s3.amazonaws.com"
/**
 * Print a message to the console
 *
 * @param message - message to print to log (string)
 * @param logType - Type of logging to use
 */
Yotpo.safeConsole = function (message, logType) {};

//////////////////////////////////////////////////
/////////////// Yotpo Initiation /////////////////
//////////////////////////////////////////////////

// NOTE!
// Don't declare any functions after this line of code
// this is the initialization of the Yotpo instance
if (typeof yotpo == 'undefined') {
    var yotpo = new Yotpo("I08vTeXT51b8IMaYInD4eS0BWUDlojcKU8DX9vQ0", {
        "account_settings": {
            "settings": {
                "customer_language": "en",
                "domain": "google.com",
                "name": "https://www.google.com",
                "auto_publish": true
            }
        },
        "reviews": false,
        "testimonials": {
            "settings": {
                "default_tab": "product_tab",
                "show_tab": "both",
                "display_free_text_filters": false
            }
        },
        "testimonials_tab": false,
        "questions_and_answers": false,
        "questions_and_answers_standalone": false,
        "vendor_review_creation": false,
        "language": "en",
        "comments": {
            "settings": {
                "comments_visibility": "1"
            }
        },
        "async_create": {
            "settings": {}
        },
        "ads": false,
        "facebook_ads": false,
        "show_social_links": false,
        "host": "dynamic",
        "css_custom_host": null,
        "direction": "ltr",
        "reporting_end_points": ["p.yotpo.com"],
        "close_button": false,
        "version": "2019-03-03_14-34-56",
        "prevent_duplicate_reviews": false,
        "custom_fields_info": {},
        "widget_rich_snippet": false,
        "carousel_settings": false,
        "review_with_pictures": false,
        "instagram_curation": false,
        "visual_carousel": false,
        "pictures_slider": false,
        "pictures_dedicated_page": false,
        "generic_gallery": false,
        "product_gallery": false,
        "shoppable_instagram": false,
        "load_only_widgets_on_page": false,
        "load_css_async": false,
        "ab_testing": false,
        "cookie_path": false,
        "upload_photos": false,
        "upload_videos": false,
        "video_support": false,
        "new_main_widget_layout": false,
        "new_testimonials_widget_layout": false,
        "shoppers_say": false,
        "widget_v2": {
            "settings": {
                "read_only": "0",
                "redis_cache_expires_in": "300",
                "http_cache_expires_in": "3000",
                "review_per_page": "5",
                "date_format": "%m/%d/%y",
                "reporting_domains": ["p.yotpo.com"],
                "close_button": "0",
                "version": null,
                "css_custom_host": null,
                "show_average_rating_digits": false,
                "display_vote_text": "0",
                "disable_yotpo_logo_hyperlink": "0",
                "display_crf_filters": false,
                "display_topic_filters": false,
                "better_performance_effective_date": "2019-03-30",
                "display_free_text_filters": false,
                "reviews_display_names": {
                    "order_properties": null,
                    "order_custom_properties": null,
                    "order_product_properties": null,
                    "order_product_custom_properties": null,
                    "product_properties": null,
                    "product_specs_properties": null,
                    "customer_properties": null,
                    "customer_custom_properties": null
                },
                "display_orders_filters": false,
                "display_names": {
                    "order_properties": null,
                    "order_custom_properties": null,
                    "order_product_properties": null,
                    "order_product_custom_properties": null,
                    "product_properties": null,
                    "product_specs_properties": null,
                    "customer_properties": null,
                    "customer_custom_properties": null
                },
                "fetch_from_elastic": false,
                "disable_performance_section": false
            }
        },
        "ticker": false,
        "lightbox_new_design": false
    });
    Yotpo.ready(function () {
        yotpo.init();
    });
}
