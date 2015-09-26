!function (a) {
    function d() {
        a(b).each(function () {
            e(a(this)).removeClass("open")
        })
    }

    function e(b) {
        var c = b.attr("data-target"), d;
        return c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")), d = a(c), d.length || (d = b.parent()), d
    }

    "use strict";
    var b = "[data-toggle=dropdown]", c = function (b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function () {
            c.parent().removeClass("open")
        })
    };
    c.prototype = {constructor:c, toggle:function (b) {
        var c = a(this), f, g;
        if (c.is(".disabled, :disabled"))return;
        return f = e(c), g = f.hasClass("open"), d(), g || f.toggleClass("open"), c.focus(), !1
    }, keydown:function (b) {
        var c, d, f, g, h, i;
        if (!/(38|40|27)/.test(b.keyCode))return;
        c = a(this), b.preventDefault(), b.stopPropagation();
        if (c.is(".disabled, :disabled"))return;
        g = e(c), h = g.hasClass("open");
        if (!h || h && b.keyCode == 27)return c.click();
        d = a("[role=menu] li:not(.divider):visible a", g);
        if (!d.length)return;
        i = d.index(d.filter(":focus")), b.keyCode == 38 && i > 0 && i--, b.keyCode == 40 && i < d.length - 1 && i++, ~i || (i = 0), d.eq(i).focus()
    }};
    var f = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("dropdown");
            e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.dropdown.Constructor = c, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = f, this
    }, a(document).on("click.dropdown.data-api touchstart.dropdown.data-api", d).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form",function (a) {
        a.stopPropagation()
    }).on("touchstart.dropdown.data-api", ".dropdown-menu",function (a) {
        a.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", b, c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", b + ", [role=menu]", c.prototype.keydown)
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    b.prototype = {constructor:b, toggle:function () {
        return this[this.isShown ? "hide" : "show"]()
    }, show:function () {
        var b = this, c = a.Event("show");
        this.$element.trigger(c);
        if (this.isShown || c.isDefaultPrevented())return;
        this.isShown = !0, this.escape(), this.backdrop(function () {
            var c = a.support.transition && b.$element.hasClass("fade");
            b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
                b.$element.focus().trigger("shown")
                $(".modal-thumbs").jCarouselLite({
                    btnNext: ".thumbs-next",
                    btnPrev: ".thumbs-prev",
                    visible: 4
                });
            }) : b.$element.focus().trigger("shown")
        })
    }, hide:function (b) {
        b && b.preventDefault();
        var c = this;
        b = a.Event("hide"), this.$element.trigger(b);
        if (!this.isShown || b.isDefaultPrevented())return;
        this.isShown = !1, this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
    }, enforceFocus:function () {
        var b = this;
        a(document).on("focusin.modal", function (a) {
            b.$element[0] !== a.target && !b.$element.has(a.target).length && b.$element.focus()
        })
    }, escape:function () {
        var a = this;
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) {
            b.which == 27 && a.hide()
        }) : this.isShown || this.$element.off("keyup.dismiss.modal")
    }, hideWithTransition:function () {
        var b = this, c = setTimeout(function () {
            b.$element.off(a.support.transition.end), b.hideModal()
        }, 500);
        this.$element.one(a.support.transition.end, function () {
            clearTimeout(c), b.hideModal()
        })
    }, hideModal:function (a) {
        this.$element.hide().trigger("hidden"), this.backdrop()
    }, removeBackdrop:function () {
        this.$backdrop.remove(), this.$backdrop = null
    }, backdrop:function (b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), e ? this.$backdrop.one(a.support.transition.end, b) : b()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : b && b()
    }};
    var c = a.fn.modal;
    a.fn.modal = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), typeof c == "object" && c);
            e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : f.show && e.show()
        })
    }, a.fn.modal.defaults = {backdrop:!0, keyboard:!0, show:!0}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote:!/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f).one("hide", function () {
            c.focus()
        })
    })
}(window.jQuery), !function (a) {
    "use strict", a(function () {
        a.support.transition = function () {
            var a = function () {
                var a = document.createElement("bootstrap"), b = {WebkitTransition:"webkitTransitionEnd", MozTransition:"transitionend", OTransition:"oTransitionEnd otransitionend", transition:"transitionend"}, c;
                for (c in b)if (a.style[c] !== undefined)return b[c]
            }();
            return a && {end:a}
        }()
    })
}(window.jQuery), !function (a) {
    function b() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function c() {
        var a = new Date;
        return b(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())
    }

    var d = function (b, c) {
        var d = this;
        this.element = a(b), this.language = c.language || this.element.data("date-language") || "en", this.language = this.language in e ? this.language : this.language.split("-")[0], this.language = this.language in e ? this.language : "en", this.isRTL = e[this.language].rtl || !1, this.format = f.parseFormat(c.format || this.element.data("date-format") || e[this.language].format || "mm/dd/yyyy"), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && this.component.length === 0 && (this.component = !1), this._attachEvents(), this.forceParse = !0, "forceParse"in c ? this.forceParse = c.forceParse : "dateForceParse"in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = a(f.template).appendTo(this.isInline ? this.element : "body").on({click:a.proxy(this.click, this), mousedown:a.proxy(this.mousedown, this)}), this.isInline ? this.picker.addClass("datepicker-inline") : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.isRTL && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), a(document).on("mousedown", function (b) {
            a(b.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length === 0 && d.hide()
        }), this.autoclose = !1, "autoclose"in c ? this.autoclose = c.autoclose : "dateAutoclose"in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation"in c ? this.keyboardNavigation = c.keyboardNavigation : "dateKeyboardNavigation"in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.viewMode = this.startViewMode = 0;
        switch (c.startView || this.element.data("date-start-view")) {
            case 2:
            case"decade":
                this.viewMode = this.startViewMode = 2;
                break;
            case 1:
            case"year":
                this.viewMode = this.startViewMode = 1
        }
        this.minViewMode = c.minViewMode || this.element.data("date-min-view-mode") || 0;
        if (typeof this.minViewMode == "string")switch (this.minViewMode) {
            case"months":
                this.minViewMode = 1;
                break;
            case"years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
        }
        this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode), this.todayBtn = c.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = c.todayHighlight || this.element.data("date-today-highlight") || !1, this.calendarWeeks = !1, "calendarWeeks"in c ? this.calendarWeeks = c.calendarWeeks : "dateCalendarWeeks"in this.element.data() && (this.calendarWeeks = this.element.data("date-calendar-weeks")), this.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (a, b) {
            return parseInt(b) + 1
        }), this.weekStart = (c.weekStart || this.element.data("date-weekstart") || e[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -Infinity, this.endDate = Infinity, this.daysOfWeekDisabled = [], this.setStartDate(c.startDate || this.element.data("date-startdate")), this.setEndDate(c.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(c.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
    };
    d.prototype = {constructor:d, _events:[], _attachEvents:function () {
        this._detachEvents(), this.isInput ? this._events = [
            [this.element, {focus:a.proxy(this.show, this), keyup:a.proxy(this.update, this), keydown:a.proxy(this.keydown, this)}]
        ] : this.component && this.hasInput ? this._events = [
            [this.element.find("input"), {focus:a.proxy(this.show, this), keyup:a.proxy(this.update, this), keydown:a.proxy(this.keydown, this)}],
            [this.component, {click:a.proxy(this.show, this)}]
        ] : this.element.is("div") ? this.isInline = !0 : this._events = [
            [this.element, {click:a.proxy(this.show, this)}]
        ];
        for (var b = 0, c, d; b < this._events.length; b++)c = this._events[b][0], d = this._events[b][1], c.on(d)
    }, _detachEvents:function () {
        for (var a = 0, b, c; a < this._events.length; a++)b = this._events[a][0], c = this._events[a][1], b.off(c);
        this._events = []
    }, show:function (b) {
        this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.update(), this.place(), a(window).on("resize", a.proxy(this.place, this)), b && (b.stopPropagation(), b.preventDefault()), this.element.trigger({type:"show", date:this.date})
    }, hide:function (b) {
        if (this.isInline)return;
        if (!this.picker.is(":visible"))return;
        this.picker.hide(), a(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || a(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.element.trigger({type:"hide", date:this.date})
    }, remove:function () {
        this._detachEvents(), this.picker.remove(), delete this.element.data().datepicker
    }, getDate:function () {
        var a = this.getUTCDate();
        return new Date(a.getTime() + a.getTimezoneOffset() * 6e4)
    }, getUTCDate:function () {
        return this.date
    }, setDate:function (a) {
        this.setUTCDate(new Date(a.getTime() - a.getTimezoneOffset() * 6e4))
    }, setUTCDate:function (a) {
        this.date = a, this.setValue()
    }, setValue:function () {
        var a = this.getFormattedDate();
        this.isInput ? this.element.val(a) : (this.component && this.element.find("input").val(a), this.element.data("date", a))
    }, getFormattedDate:function (a) {
        return a === undefined && (a = this.format), f.formatDate(this.date, a, this.language)
    }, setStartDate:function (a) {
        this.startDate = a || -Infinity, this.startDate !== -Infinity && (this.startDate = f.parseDate(this.startDate, this.format, this.language)), this.update(), this.updateNavArrows()
    }, setEndDate:function (a) {
        this.endDate = a || Infinity, this.endDate !== Infinity && (this.endDate = f.parseDate(this.endDate, this.format, this.language)), this.update(), this.updateNavArrows()
    }, setDaysOfWeekDisabled:function (b) {
        this.daysOfWeekDisabled = b || [], a.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = a.map(this.daysOfWeekDisabled, function (a) {
            return parseInt(a, 10)
        }), this.update(), this.updateNavArrows()
    }, place:function () {
        if (this.isInline)return;
        var b = parseInt(this.element.parents().filter(function () {
            return a(this).css("z-index") != "auto"
        }).first().css("z-index")) + 10, c = this.component ? this.component.offset() : this.element.offset(), d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!0);
        this.picker.css({top:c.top + d, left:c.left, zIndex:b})
    }, update:function () {
        var a, b = !1;
        arguments && arguments.length && (typeof arguments[0] == "string" || arguments[0]instanceof Date) ? (a = arguments[0], b = !0) : a = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), this.date = f.parseDate(a, this.format, this.language), b && this.setValue(), this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date), this.fill()
    }, fillDow:function () {
        var a = this.weekStart, b = "<tr>";
        if (this.calendarWeeks) {
            var c = '<th class="cw">&nbsp;</th>';
            b += c, this.picker.find(".datepicker-days thead tr:first-child").prepend(c)
        }
        while (a < this.weekStart + 7)b += '<th class="dow">' + e[this.language].daysMin[a++ % 7] + "</th>";
        b += "</tr>", this.picker.find(".datepicker-days thead").append(b)
    }, fillMonths:function () {
        var a = "", b = 0;
        while (b < 12)a += '<span class="month">' + e[this.language].monthsShort[b++] + "</span>";
        this.picker.find(".datepicker-months td").html(a)
    }, fill:function () {
        var c = new Date(this.viewDate), d = c.getUTCFullYear(), g = c.getUTCMonth(), h = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity, i = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity, j = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity, k = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity, l = this.date && this.date.valueOf(), m = new Date;
        this.picker.find(".datepicker-days thead th.switch").text(e[this.language].months[g] + " " + d), this.picker.find("tfoot th.today").text(e[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
        var n = b(d, g - 1, 28, 0, 0, 0, 0), o = f.getDaysInMonth(n.getUTCFullYear(), n.getUTCMonth());
        n.setUTCDate(o), n.setUTCDate(o - (n.getUTCDay() - this.weekStart + 7) % 7);
        var p = new Date(n);
        p.setUTCDate(p.getUTCDate() + 42), p = p.valueOf();
        var q = [], r;
        while (n.valueOf() < p) {
            if (n.getUTCDay() == this.weekStart) {
                q.push("<tr>");
                if (this.calendarWeeks) {
                    var s = new Date(+n + (this.weekStart - n.getUTCDay() - 7) % 7 * 864e5), t = new Date(+s + (11 - s.getUTCDay()) % 7 * 864e5), u = new Date(+(u = b(t.getUTCFullYear(), 0, 1)) + (11 - u.getUTCDay()) % 7 * 864e5), v = (t - u) / 864e5 / 7 + 1;
                    q.push('<td class="cw">' + v + "</td>")
                }
            }
            r = "";
            if (n.getUTCFullYear() < d || n.getUTCFullYear() == d && n.getUTCMonth() < g)r += " old"; else if (n.getUTCFullYear() > d || n.getUTCFullYear() == d && n.getUTCMonth() > g)r += " new";
            this.todayHighlight && n.getUTCFullYear() == m.getFullYear() && n.getUTCMonth() == m.getMonth() && n.getUTCDate() == m.getDate() && (r += " today"), l && n.valueOf() == l && (r += " active");
            if (n.valueOf() < this.startDate || n.valueOf() > this.endDate || a.inArray(n.getUTCDay(), this.daysOfWeekDisabled) !== -1)r += " disabled";
            q.push('<td class="day' + r + '">' + n.getUTCDate() + "</td>"), n.getUTCDay() == this.weekEnd && q.push("</tr>"), n.setUTCDate(n.getUTCDate() + 1)
        }
        this.picker.find(".datepicker-days tbody").empty().append(q.join(""));
        var w = this.date && this.date.getUTCFullYear(), x = this.picker.find(".datepicker-months").find("th:eq(1)").text(d).end().find("span").removeClass("active");
        w && w == d && x.eq(this.date.getUTCMonth()).addClass("active"), (d < h || d > j) && x.addClass("disabled"), d == h && x.slice(0, i).addClass("disabled"), d == j && x.slice(k + 1).addClass("disabled"), q = "", d = parseInt(d / 10, 10) * 10;
        var y = this.picker.find(".datepicker-years").find("th:eq(1)").text(d + "-" + (d + 9)).end().find("td");
        d -= 1;
        for (var z = -1; z < 11; z++)q += '<span class="year' + (z == -1 || z == 10 ? " old" : "") + (w == d ? " active" : "") + (d < h || d > j ? " disabled" : "") + '">' + d + "</span>", d += 1;
        y.html(q)
    }, updateNavArrows:function () {
        var a = new Date(this.viewDate), b = a.getUTCFullYear(), c = a.getUTCMonth();
        switch (this.viewMode) {
            case 0:
                this.startDate !== -Infinity && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility:"hidden"}) : this.picker.find(".prev").css({visibility:"visible"}), this.endDate !== Infinity && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility:"hidden"}) : this.picker.find(".next").css({visibility:"visible"});
                break;
            case 1:
            case 2:
                this.startDate !== -Infinity && b <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility:"hidden"}) : this.picker.find(".prev").css({visibility:"visible"}), this.endDate !== Infinity && b >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility:"hidden"}) : this.picker.find(".next").css({visibility:"visible"})
        }
    }, click:function (c) {
        c.stopPropagation(), c.preventDefault();
        var d = a(c.target).closest("span, td, th");
        if (d.length == 1)switch (d[0].nodeName.toLowerCase()) {
            case"th":
                switch (d[0].className) {
                    case"switch":
                        this.showMode(1);
                        break;
                    case"prev":
                    case"next":
                        var e = f.modes[this.viewMode].navStep * (d[0].className == "prev" ? -1 : 1);
                        switch (this.viewMode) {
                            case 0:
                                this.viewDate = this.moveMonth(this.viewDate, e);
                                break;
                            case 1:
                            case 2:
                                this.viewDate = this.moveYear(this.viewDate, e)
                        }
                        this.fill();
                        break;
                    case"today":
                        var g = new Date;
                        g = b(g.getFullYear(), g.getMonth(), g.getDate(), 0, 0, 0), this.showMode(-2);
                        var h = this.todayBtn == "linked" ? null : "view";
                        this._setDate(g, h)
                }
                break;
            case"span":
                if (!d.is(".disabled")) {
                    this.viewDate.setUTCDate(1);
                    if (d.is(".month")) {
                        var i = 1, j = d.parent().find("span").index(d), k = this.viewDate.getUTCFullYear();
                        this.viewDate.setUTCMonth(j), this.element.trigger({type:"changeMonth", date:this.viewDate}), this.minViewMode == 1 && this._setDate(b(k, j, i, 0, 0, 0, 0))
                    } else {
                        var k = parseInt(d.text(), 10) || 0, i = 1, j = 0;
                        this.viewDate.setUTCFullYear(k), this.element.trigger({type:"changeYear", date:this.viewDate}), this.minViewMode == 2 && this._setDate(b(k, j, i, 0, 0, 0, 0))
                    }
                    this.showMode(-1), this.fill()
                }
                break;
            case"td":
                if (d.is(".day") && !d.is(".disabled")) {
                    var i = parseInt(d.text(), 10) || 1, k = this.viewDate.getUTCFullYear(), j = this.viewDate.getUTCMonth();
                    d.is(".old") ? j === 0 ? (j = 11, k -= 1) : j -= 1 : d.is(".new") && (j == 11 ? (j = 0, k += 1) : j += 1), this._setDate(b(k, j, i, 0, 0, 0, 0))
                }
        }
    }, _setDate:function (a, b) {
        if (!b || b == "date")this.date = a;
        if (!b || b == "view")this.viewDate = a;
        this.fill(), this.setValue(), this.element.trigger({type:"changeDate", date:this.date});
        var c;
        this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && (c.change(), this.autoclose && (!b || b == "date") && this.hide())
    }, moveMonth:function (a, b) {
        if (!b)return a;
        var c = new Date(a.valueOf()), d = c.getUTCDate(), e = c.getUTCMonth(), f = Math.abs(b), g, h;
        b = b > 0 ? 1 : -1;
        if (f == 1) {
            h = b == -1 ? function () {
                return c.getUTCMonth() == e
            } : function () {
                return c.getUTCMonth() != g
            }, g = e + b, c.setUTCMonth(g);
            if (g < 0 || g > 11)g = (g + 12) % 12
        } else {
            for (var i = 0; i < f; i++)c = this.moveMonth(c, b);
            g = c.getUTCMonth(), c.setUTCDate(d), h = function () {
                return g != c.getUTCMonth()
            }
        }
        while (h())c.setUTCDate(--d), c.setUTCMonth(g);
        return c
    }, moveYear:function (a, b) {
        return this.moveMonth(a, b * 12)
    }, dateWithinRange:function (a) {
        return a >= this.startDate && a <= this.endDate
    }, keydown:function (a) {
        if (this.picker.is(":not(:visible)")) {
            a.keyCode == 27 && this.show();
            return
        }
        var b = !1, c, d, e, f, g;
        switch (a.keyCode) {
            case 27:
                this.hide(), a.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.keyboardNavigation)break;
                c = a.keyCode == 37 ? -1 : 1, a.ctrlKey ? (f = this.moveYear(this.date, c), g = this.moveYear(this.viewDate, c)) : a.shiftKey ? (f = this.moveMonth(this.date, c), g = this.moveMonth(this.viewDate, c)) : (f = new Date(this.date), f.setUTCDate(this.date.getUTCDate() + c), g = new Date(this.viewDate), g.setUTCDate(this.viewDate.getUTCDate() + c)), this.dateWithinRange(f) && (this.date = f, this.viewDate = g, this.setValue(), this.update(), a.preventDefault(), b = !0);
                break;
            case 38:
            case 40:
                if (!this.keyboardNavigation)break;
                c = a.keyCode == 38 ? -1 : 1, a.ctrlKey ? (f = this.moveYear(this.date, c), g = this.moveYear(this.viewDate, c)) : a.shiftKey ? (f = this.moveMonth(this.date, c), g = this.moveMonth(this.viewDate, c)) : (f = new Date(this.date), f.setUTCDate(this.date.getUTCDate() + c * 7), g = new Date(this.viewDate), g.setUTCDate(this.viewDate.getUTCDate() + c * 7)), this.dateWithinRange(f) && (this.date = f, this.viewDate = g, this.setValue(), this.update(), a.preventDefault(), b = !0);
                break;
            case 13:
                this.hide(), a.preventDefault();
                break;
            case 9:
                this.hide()
        }
        if (b) {
            this.element.trigger({type:"changeDate", date:this.date});
            var h;
            this.isInput ? h = this.element : this.component && (h = this.element.find("input")), h && h.change()
        }
    }, showMode:function (a) {
        a && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + f.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
    }}, a.fn.datepicker = function (b) {
        var c = Array.apply(null, arguments);
        return c.shift(), this.each(function () {
            var e = a(this), f = e.data("datepicker"), g = typeof b == "object" && b;
            f || e.data("datepicker", f = new d(this, a.extend({}, a.fn.datepicker.defaults, g))), typeof b == "string" && typeof f[b] == "function" && f[b].apply(f, c)
        })
    }, a.fn.datepicker.defaults = {}, a.fn.datepicker.Constructor = d;
    var e = a.fn.datepicker.dates = {en:{days:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], daysShort:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysMin:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], today:"Today"}}, f = {modes:[
        {clsName:"days", navFnc:"Month", navStep:1},
        {clsName:"months", navFnc:"FullYear", navStep:1},
        {clsName:"years", navFnc:"FullYear", navStep:10}
    ], isLeapYear:function (a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }, getDaysInMonth:function (a, b) {
        return[31, f.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
    }, validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g, nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g, parseFormat:function (a) {
        var b = a.replace(this.validParts, "\0").split("\0"), c = a.match(this.validParts);
        if (!b || !b.length || !c || c.length === 0)throw new Error("Invalid date format.");
        return{separators:b, parts:c}
    }, parseDate:function (c, f, g) {
        if (c instanceof Date)return c;
        if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(c)) {
            var h = /([\-+]\d+)([dmwy])/, i = c.match(/([\-+]\d+)([dmwy])/g), j, k;
            c = new Date;
            for (var l = 0; l < i.length; l++) {
                j = h.exec(i[l]), k = parseInt(j[1]);
                switch (j[2]) {
                    case"d":
                        c.setUTCDate(c.getUTCDate() + k);
                        break;
                    case"m":
                        c = d.prototype.moveMonth.call(d.prototype, c, k);
                        break;
                    case"w":
                        c.setUTCDate(c.getUTCDate() + k * 7);
                        break;
                    case"y":
                        c = d.prototype.moveYear.call(d.prototype, c, k)
                }
            }
            return b(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate(), 0, 0, 0)
        }
        var i = c && c.match(this.nonpunctuation) || [], c = new Date, m = {}, n = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], o = {yyyy:function (a, b) {
            return a.setUTCFullYear(b)
        }, yy:function (a, b) {
            return a.setUTCFullYear(2e3 + b)
        }, m:function (a, b) {
            b -= 1;
            while (b < 0)b += 12;
            b %= 12, a.setUTCMonth(b);
            while (a.getUTCMonth() != b)a.setUTCDate(a.getUTCDate() - 1);
            return a
        }, d:function (a, b) {
            return a.setUTCDate(b)
        }}, p, q, j;
        o.M = o.MM = o.mm = o.m, o.dd = o.d, c = b(c.getFullYear(), c.getMonth(), c.getDate(), 0, 0, 0);
        var r = f.parts.slice();
        i.length != r.length && (r = a(r).filter(function (b, c) {
            return a.inArray(c, n) !== -1
        }).toArray());
        if (i.length == r.length) {
            for (var l = 0, s = r.length; l < s; l++) {
                p = parseInt(i[l], 10), j = r[l];
                if (isNaN(p))switch (j) {
                    case"MM":
                        q = a(e[g].months).filter(function () {
                            var a = this.slice(0, i[l].length), b = i[l].slice(0, a.length);
                            return a == b
                        }), p = a.inArray(q[0], e[g].months) + 1;
                        break;
                    case"M":
                        q = a(e[g].monthsShort).filter(function () {
                            var a = this.slice(0, i[l].length), b = i[l].slice(0, a.length);
                            return a == b
                        }), p = a.inArray(q[0], e[g].monthsShort) + 1
                }
                m[j] = p
            }
            for (var l = 0, t; l < n.length; l++)t = n[l], t in m && !isNaN(m[t]) && o[t](c, m[t])
        }
        return c
    }, formatDate:function (b, c, d) {
        var f = {d:b.getUTCDate(), D:e[d].daysShort[b.getUTCDay()], DD:e[d].days[b.getUTCDay()], m:b.getUTCMonth() + 1, M:e[d].monthsShort[b.getUTCMonth()], MM:e[d].months[b.getUTCMonth()], yy:b.getUTCFullYear().toString().substring(2), yyyy:b.getUTCFullYear()};
        f.dd = (f.d < 10 ? "0" : "") + f.d, f.mm = (f.m < 10 ? "0" : "") + f.m;
        var b = [], g = a.extend([], c.separators);
        for (var h = 0, i = c.parts.length; h < i; h++)g.length && b.push(g.shift()), b.push(f[c.parts[h]]);
        return b.join("")
    }, headTemplate:'<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>', contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>', footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};
    f.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + f.headTemplate + "<tbody></tbody>" + f.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + "</table>" + "</div>" + "</div>", a.fn.datepicker.DPGlobal = f
}(window.jQuery), function (a) {
    var b = 0, c = 0, d = 0, e = 0, f = 10, g = 0, h = "ontouchstart"in window, i = "onorientationchange"in window, j = !1, k = !1, l = !1, m = !1, n = !1, o = !1, p = "pointer", q = "pointer", r = new Array, s = new Array, t = new Array, u = new Array, v = new Array, w = new Array, x = new Array, y = new Array, z = {showScrollbar:function (b, c) {
        b.scrollbarHide && a("." + c).css({opacity:b.scrollbarOpacity, filter:"alpha(opacity:" + b.scrollbarOpacity * 100 + ")"})
    }, hideScrollbar:function (a, b, c, d, e, g, h, i, j, k) {
        if (a.scrollbar && a.scrollbarHide)for (var l = c; l < c + 25; l++)b[b.length] = z.hideScrollbarIntervalTimer(f * l, d[c], (c + 24 - l) / 24, e, g, h, i, j, k, a)
    }, hideScrollbarInterval:function (b, c, d, e, f, h, i, j, k) {
        g = b * -1 / d * (h - i - j - f), z.setSliderOffset("." + e, g), a("." + e).css({opacity:k.scrollbarOpacity * c, filter:"alpha(opacity:" + k.scrollbarOpacity * c * 100 + ")"})
    }, slowScrollHorizontalInterval:function (b, d, e, f, h, i, j, k, l, m, n, o, p, q, r, s) {
        newChildOffset = z.calcActiveOffset(s, d, 0, n, e, i, p, m), newChildOffset != x[r] && s.onSlideChange != "" && s.onSlideChange(new z.args(s, b, a(b).children(":eq(" + m + ")"), m % p)), x[r] = newChildOffset, d = Math.floor(d), z.setSliderOffset(b, d);
        if (s.scrollbar) {
            g = Math.floor(d * -1 / e * (j - k - h));
            var t = h - l;
            d >= c ? (t = h - l - g * -1, z.setSliderOffset(a("." + f), 0), a("." + f).css({width:t + "px"})) : d <= e * -1 + 1 ? (t = j - k - l - g, z.setSliderOffset(a("." + f), g), a("." + f).css({width:t + "px"})) : (z.setSliderOffset(a("." + f), g), a("." + f).css({width:t + "px"}))
        }
    }, slowScrollHorizontal:function (b, d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
        var v = new Array, y = z.getSliderOffset(b, "x"), A = 0, B = 25 / 1024 * k, C = !1;
        frictionCoefficient = u.frictionCoefficient, elasticFrictionCoefficient = u.elasticFrictionCoefficient, snapFrictionCoefficient = u.snapFrictionCoefficient, snapToChildren = u.snapToChildren, h > 5 && snapToChildren ? A = 1 : h < -5 && snapToChildren && (A = -1), h < B * -1 ? h = B * -1 : h > B && (h = B), a(b)[0] !== a(t)[0] && (A *= -1, h *= -2);
        var D = z.getAnimationSteps(u, h, y, e, c, o), E = z.calcActiveOffset(u, D[D.length - 1], A, o, e, k, q, x[p]);
        u.infiniteSlider && (o[E] > o[s + 1] + k && (E += s), o[E] < o[s * 2 - 1] - k && (E -= s));
        if (D[D.length - 1] < o[E] && A < 0 || D[D.length - 1] > o[E] && A > 0 || !snapToChildren)while (h > 1 || h < -1) {
            h *= frictionCoefficient, y += h;
            if (y > c || y < e * -1)h *= elasticFrictionCoefficient, y += h;
            v[v.length] = y
        }
        if (snapToChildren || y > c || y < e * -1) {
            while (y < o[E] - .5 || y > o[E] + .5)y = (y - o[E]) * snapFrictionCoefficient + o[E], v[v.length] = y;
            v[v.length] = o[E]
        }
        var F = 1;
        v.length % 2 != 0 && (F = 0);
        var G = 0, H = 0;
        u.infiniteSlider && (E = E % s + s);
        for (var I = 0; I < d.length; I++)clearTimeout(d[I]);
        var J = 0;
        for (var I = F; I < v.length; I += 2) {
            u.infiniteSlider && v[I] < o[s * 2] + k && (v[I] = v[I] - o[s]);
            if (I == F || Math.abs(v[I] - J) > 1 || I >= v.length - 2)J = v[I], d[d.length] = z.slowScrollHorizontalIntervalTimer(f * I, b, v[I], e, g, j, k, l, m, n, E, o, r, q, s, p, u)
        }
        d[d.length] = z.onSlideCompleteTimer(f * (I + 1), u, b, a(b).children(":eq(" + E + ")"), E % q, p), w[p] = d, z.hideScrollbar(u, d, I, v, e, g, j, k, m, n)
    }, onSlideComplete:function (b, c, d, e, f) {
        r[f] != e && b.onSlideComplete != "" && b.onSlideComplete(new z.args(b, a(c), d, e)), r[f] = e
    }, getSliderOffset:function (b, c) {
        var d = 0;
        c == "x" ? c = 4 : c = 5;
        if (h && j) {
            var e = a(b).css("-webkit-transform").split(",");
            d = parseInt(e[c], 10)
        } else d = parseInt(a(b).css("left"), 10);
        return d
    }, setSliderOffset:function (b, c) {
        h && j ? a(b).css({webkitTransform:"matrix(1,0,0,1," + c + ",0)"}) : a(b).css({left:c + "px"})
    }, setBrowserInfo:function () {
        navigator.userAgent.match("WebKit") != null ? (j = !0, p = "-webkit-grab", q = "-webkit-grabbing") : navigator.userAgent.match("Gecko") != null ? (o = !0, p = "move", q = "-moz-grabbing") : navigator.userAgent.match("MSIE 7") != null ? (k = !0, n = !0) : navigator.userAgent.match("MSIE 8") != null ? (l = !0, n = !0) : navigator.userAgent.match("MSIE 9") != null && (m = !0, n = !0)
    }, getAnimationSteps:function (a, b, c, d, e, f) {
        var g = new Array;
        b <= 1 && b >= 0 ? b = -2 : b >= -1 && b <= 0 && (b = 2);
        while (b > 1 || b < -1) {
            b *= a.frictionCoefficient, c += b;
            if (c > e || c < d * -1)b *= a.elasticFrictionCoefficient, c += b;
            g[g.length] = c
        }
        return activeChildOffset = 0, g
    }, calcActiveOffset:function (a, b, c, d, e, f, g, h) {
        var i = !1, j = new Array, k;
        for (var l = 0; l < d.length; l++)d[l] <= b && d[l] > b - f && (!i && d[l] != b && (j[j.length] = d[l - 1]), j[j.length] = d[l], i = !0);
        j.length == 0 && (j[0] = d[d.length - 1]);
        var m = f, n = 0;
        for (var l = 0; l < j.length; l++) {
            var o = Math.abs(b - j[l]);
            o < m && (n = j[l], m = o)
        }
        for (var l = 0; l < d.length; l++)n == d[l] && (k = l);
        return c < 0 && k % g == h % g ? (k = h + 1, k >= d.length && (k = d.length - 1)) : c > 0 && k % g == h % g && (k = h - 1, k < 0 && (k = 0)), k
    }, changeSlide:function (b, c, d, e, g, h, i, j, k, l, m, n, o, p, q, r) {
        z.autoSlidePause(n);
        for (var s = 0; s < d.length; s++)clearTimeout(d[s]);
        var t = Math.ceil(r.autoSlideTransTimer / 10) + 1, u = z.getSliderOffset(c, "x");
        r.infiniteSlider && u > m[q + 1] + i && b == q * 2 - 2 && (u -= p);
        var v = m[b], x = v - u, y = new Array, A, B;
        z.showScrollbar(r, g);
        for (var C = 0; C <= t; C++)A = C, A /= t, A--, B = u + x * (Math.pow(A, 5) + 1), r.infiniteSlider && (B > m[q + 1] + i && (B -= p), B < m[q * 2 - 1] - i && (B += p)), y[y.length] = B;
        r.infiniteSlider && (b = b % q + q);
        var D = 0;
        for (var C = 0; C < y.length; C++) {
            r.infiniteSlider && y[C] < m[q * 2] + i && (y[C] = y[C] - m[q]);
            if (C == 0 || Math.abs(y[C] - D) > 1 || C >= y.length - 2)D = y[C], d[C] = z.slowScrollHorizontalIntervalTimer(f * (C + 1), c, y[C], e, g, h, i, j, k, l, b, m, p, o, q, n, r);
            C == 0 && r.onSlideStart != "" && r.onSlideStart(new z.args(r, c, a(c).children(":eq(" + b + ")"), b % o))
        }
        x != 0 && (d[d.length] = z.onSlideCompleteTimer(f * (C + 1), r, c, a(c).children(":eq(" + b + ")"), b % o, n)), w[n] = d, z.hideScrollbar(r, d, C, y, e, g, h, i, k, l), z.autoSlide(c, d, e, g, h, i, j, k, l, m, n, o, p, q, r)
    }, autoSlide:function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
        if (!o.autoSlide)return!1;
        z.autoSlidePause(k), s[k] = setTimeout(function () {
            !o.infiniteSlider && x[k] > j.length - 1 && (x[k] = x[k] - n);
            var p = o.infiniteSlider ? x[k] + 1 : (x[k] + 1) % n;
            z.changeSlide(p, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o), z.autoSlide(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
        }, o.autoSlideTimer + o.autoSlideTransTimer)
    }, autoSlidePause:function (a) {
        clearTimeout(s[a])
    }, isUnselectable:function (b, c) {
        return c.unselectableSelector != "" && a(b).closest(c.unselectableSelector).size() == 1 ? !0 : !1
    }, slowScrollHorizontalIntervalTimer:function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
        var r = setTimeout(function () {
            z.slowScrollHorizontalInterval(b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
        }, a);
        return r
    }, onSlideCompleteTimer:function (a, b, c, d, e, f) {
        var g = setTimeout(function () {
            z.onSlideComplete(b, c, d, e, f)
        }, a);
        return g
    }, hideScrollbarIntervalTimer:function (a, b, c, d, e, f, g, h, i, j) {
        var k = setTimeout(function () {
            z.hideScrollbarInterval(b, c, d, e, f, g, h, i, j)
        }, a);
        return k
    }, args:function (b, c, d, e) {
        this.settings = b, this.sliderObject = c, this.sliderContainerObject = a(c).parent(), this.currentSlideObject = d, this.currentSlideNumber = e, this.numberOfSlides = a(c).parent().data("iosslider").numberOfSlides
    }, preventDrag:function (a) {
        a.preventDefault()
    }, preventClick:function (a) {
        return a.stopImmediatePropagation(), !1
    }, enableClick:function () {
        return!0
    }};
    z.setBrowserInfo();
    var A = {init:function (f, j) {
        var m = a.extend(!0, {elasticPullResistance:.6, frictionCoefficient:.92, elasticFrictionCoefficient:.6, snapFrictionCoefficient:.95, snapToChildren:!1, startAtSlide:1, scrollbar:!1, scrollbarDrag:!1, scrollbarHide:!0, scrollbarLocation:"top", scrollbarContainer:"", scrollbarOpacity:.4, scrollbarHeight:"4px", scrollbarBorder:"0", scrollbarMargin:"5px", scrollbarBackground:"#000", scrollbarBorderRadius:"100px", scrollbarShadow:"0 0 0 #000", scrollbarElasticPullResistance:.9, desktopClickDrag:!1, responsiveSlideContainer:!0, responsiveSlides:!0, navSlideSelector:"", navPrevSelector:"", navNextSelector:"", autoSlideToggleSelector:"", autoSlide:!1, autoSlideTimer:5e3, autoSlideTransTimer:750, infiniteSlider:!1, stageCSS:{position:"relative", top:"0", left:"0", overflow:"hidden", zIndex:1}, sliderCSS:{overflow:"hidden"}, unselectableSelector:"", onSliderLoaded:"", onSlideStart:"", onSlideChange:"", onSlideComplete:""}, f);
        return j == undefined && (j = this), a(j).each(function (f) {
            function ob() {
                z.autoSlidePause(j), a(K).css("width", ""), a(K).css("height", ""), a(Y).css("width", ""), Z = a(Y).children(), a(Z).css("width", ""), o = 0, T = new Array, I = a(K).parent().width(), L = a(K).outerWidth(!0), m.responsiveSlideContainer && (L = a(K).outerWidth(!0) > I ? I : a(K).outerWidth(!0)), a(K).css({position:m.stageCSS.position, top:m.stageCSS.top, left:m.stageCSS.left, overflow:m.stageCSS.overflow, zIndex:m.stageCSS.zIndex, webkitPerspective:1e3, webkitBackfaceVisibility:"hidden", width:L}), a(m.unselectableSelector).css({cursor:"default"}), m.responsiveSlides && a(Z).each(function (b) {
                    var c = a(this).outerWidth(!0);
                    c > L ? c = L + (a(this).outerWidth(!0) - a(this).width()) * -1 : c = a(this).width(), a(this).css({width:c})
                }), a(Y).children().each(function (b) {
                    a(this).css({"float":"left"}), T[b] = o * -1, o += a(this).outerWidth(!0)
                });
                for (var b = 0; b < T.length; b++) {
                    if (T[b] <= (o - L) * -1)break;
                    bb = b
                }
                return T.splice(bb + 1, T.length), T[T.length] = (o - L) * -1, o -= L, a(Y).css({position:"relative", overflow:m.sliderCSS.overflow, cursor:p, webkitPerspective:1e3, webkitBackfaceVisibility:"hidden", width:o + L + "px"}), J = a(K).parent().height(), M = a(K).height(), m.responsiveSlideContainer && (M = a(K).height() > J ? J : a(K).height()), a(K).css({height:M}), z.setSliderOffset(Y, T[x[j]]), o <= 0 ? (a(Y).css({cursor:"default"}), !1) : (!h && !m.desktopClickDrag && a(Y).css({cursor:"default"}), m.scrollbar && (a("." + C).css({margin:m.scrollbarMargin, overflow:"hidden", display:"none"}), a("." + C + " ." + D).css({border:m.scrollbarBorder}), O = parseInt(a("." + C).css("marginLeft")) + parseInt(a("." + C).css("marginRight")), P = parseInt(a("." + C + " ." + D).css("borderLeftWidth"), 10) + parseInt(a("." + C + " ." + D).css("borderRightWidth"), 10), G = m.scrollbarContainer != "" ? a(m.scrollbarContainer).width() : L, H = (G - O) / _, m.scrollbarHide || (U = m.scrollbarOpacity), a("." + C).css({position:"absolute", left:0, width:G - O + "px", margin:m.scrollbarMargin}), m.scrollbarLocation == "top" ? a("." + C).css("top", "0") : a("." + C).css("bottom", "0"), a("." + C + " ." + D).css({borderRadius:m.scrollbarBorderRadius, background:m.scrollbarBackground, height:m.scrollbarHeight, width:H - P + "px", minWidth:m.scrollbarHeight, border:m.scrollbarBorder, webkitPerspective:1e3, webkitBackfaceVisibility:"hidden", position:"relative", opacity:U, filter:"alpha(opacity:" + U * 100 + ")", boxShadow:m.scrollbarShadow}), z.setSliderOffset(a("." + C + " ." + D), Math.floor(T[x[j]] * -1 / o * (G - O - H))), a("." + C).css({display:"block"}), E = a("." + C + " ." + D), F = a("." + C)), m.scrollbarDrag && a("." + C + " ." + D).css({cursor:p}), m.infiniteSlider && (fb = (o + L) / 3), m.navSlideSelector != "" && a(m.navSlideSelector).each(function (b) {
                    a(this).css({cursor:"pointer"}), a(this).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function () {
                        var a = b;
                        m.infiniteSlider && (a = b + gb), z.changeSlide(a, Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m)
                    })
                }), m.navPrevSelector != "" && (a(m.navPrevSelector).css({cursor:"pointer"}), a(m.navPrevSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function () {
                    (x[j] > 0 || m.infiniteSlider) && z.changeSlide(x[j] - 1, Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m)
                })), m.navNextSelector != "" && (a(m.navNextSelector).css({cursor:"pointer"}), a(m.navNextSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function () {
                    (x[j] < T.length - 1 || m.infiniteSlider) && z.changeSlide(x[j] + 1, Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m)
                })), m.autoSlide && (m.autoSlideToggleSelector != "" && (a(m.autoSlideToggleSelector).css({cursor:"pointer"}), a(m.autoSlideToggleSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function () {
                    ib ? (z.autoSlide(Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m), ib = !1, a(m.autoSlideToggleSelector).removeClass("on")) : (z.autoSlidePause(j), ib = !0, a(m.autoSlideToggleSelector).addClass("on"))
                })), ib || z.autoSlide(Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m), h ? a(K).bind("touchend.iosSliderEvent", function () {
                    ib || z.autoSlide(Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m)
                }) : (a(K).bind("mouseenter.iosSliderEvent", function () {
                    z.autoSlidePause(j)
                }), a(K).bind("mouseleave.iosSliderEvent", function () {
                    ib || z.autoSlide(Y, n, o, D, H, L, G, O, P, T, j, gb, fb, _, m)
                }))), a(K).data("iosslider", {obj:mb, settings:m, scrollerNode:Y, numberOfSlides:_, sliderNumber:j, childrenOffsets:T, sliderMax:o, scrollbarClass:D, scrollbarWidth:H, scrollbarStageWidth:G, stageWidth:L, scrollMargin:O, scrollBorder:P, infiniteSliderOffset:gb, infiniteSliderWidth:fb}), hb = !1, !0)
            }

            b++;
            var j = b, n = new Array;
            u[j] = m;
            var o, s = 0, A = new Array(0, 0), B = new Array(0, 0), C = "scrollbarBlock" + b, D = "scrollbar" + b, E, F, G, H, I, J, K = a(this), L, M, N, O, P, Q;
            x[j] = m.startAtSlide - 1;
            var R = -1, S = new Array, T, U = 0, V = 0, W = 0, X = 0, Y = a(this).children(":first-child"), Z, _ = a(Y).children().size(), ab = !1, bb = 0, cb = !1, db = undefined, eb = 0, fb, gb = _, hb = !0;
            r[j] = -1;
            var ib = !1;
            t[j] = K, v[j] = !1;
            var jb, kb = -1, lb = !1;
            y[j] = !1, w[j] = new Array, m.scrollbarDrag && (m.scrollbar = !0, m.scrollbarHide = !1);
            var mb = a(this), nb = mb.data("iosslider");
            if (nb != undefined)return!0;
            a(this).find("img").bind("dragstart.iosSliderEvent", function (a) {
                a.preventDefault()
            }), m.infiniteSlider && (m.scrollbar = !1, a(Y).children().clone(!0, !0).prependTo(Y).clone(!0, !0).appendTo(Y), gb = _), m.scrollbar && (m.scrollbarContainer != "" ? a(m.scrollbarContainer).append("<div class = '" + C + "'><div class = '" + D + "'></div></div>") : a(Y).parent().append("<div class = '" + C + "'><div class = '" + D + "'></div></div>"));
            if (!ob())return!0;
            m.infiniteSlider && (x[j] = x[j] + gb, z.setSliderOffset(Y, T[x[j]])), a(this).find("a").bind("mousedown", z.preventDrag), a(this).find("[onclick]").bind("click", z.preventDrag).each(function () {
                a(this).data("onclick", this.onclick)
            }), m.onSliderLoaded != "" && m.onSliderLoaded(new z.args(m, Y, a(Y).children(":eq(" + x[j] + ")"), x[j] % gb)), r[j] = x[j] % gb;
            if (u[j].responsiveSlides || u[j].responsiveSlideContainer) {
                var pb = i ? "orientationchange" : "resize";
                a(window).bind(pb + ".iosSliderEvent", function () {
                    if (!ob())return!0
                })
            }
            if (h || m.desktopClickDrag) {
                var qb = h ? "touchstart.iosSliderEvent" : "mousedown.iosSliderEvent", rb = a(Y), sb = a(Y), tb = null, ub = !1;
                m.scrollbarDrag && (rb = rb.add(E), sb = sb.add(F)), a(rb).bind(qb, function (b) {
                    if (y[j])return!0;
                    ub = z.isUnselectable(b.target, m);
                    if (ub)return!0;
                    jb = a(this)[0] === a(E)[0] ? E : Y;
                    if (!k && !l)var b = b.originalEvent;
                    z.autoSlidePause(j), h ? (eventX = b.touches[0].pageX, eventY = b.touches[0].pageY) : (window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty(), eventX = b.pageX, eventY = b.pageY, cb = !0, db = Y, a(this).css({cursor:q})), A = new Array(0, 0), B = new Array(0, 0), d = 0, ab = !1;
                    for (var e = 0; e < n.length; e++)clearTimeout(n[e]);
                    var f = z.getSliderOffset(Y, "x");
                    kb = x[j], m.infiniteSlider && x[j] % _ == 0 && a(Y).children().each(function (b) {
                        b % _ == 0 && b != x[j] && a(this).replaceWith(function () {
                            return a(Y).children(":eq(" + x[j] + ")").clone(!0)
                        })
                    }), f > c ? (f = c, z.setSliderOffset(a("." + D), f), a("." + D).css({width:H - P + "px"})) : f < o * -1 && (f = o * -1, z.setSliderOffset(Y, f), z.setSliderOffset(a("." + D), G - O - H), a("." + D).css({width:H - P + "px"})), V = (z.getSliderOffset(this, "x") - eventX) * -1, W = (z.getSliderOffset(this, "y") - eventY) * -1, A[1] = eventX, B[1] = eventY
                });
                var vb = h ? "touchmove.iosSliderEvent" : "mousemove.iosSliderEvent";
                a(sb).bind(vb, function (b) {
                    if (!k && !l)var b = b.originalEvent;
                    if (ub)return!0;
                    var f = 0;
                    h || (window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty());
                    if (h)eventX = b.touches[0].pageX, eventY = b.touches[0].pageY; else {
                        eventX = b.pageX, eventY = b.pageY;
                        if (!cb)return!1
                    }
                    m.infiniteSlider && (z.getSliderOffset(Y, "x") > T[_ + 1] + L && (V += fb), z.getSliderOffset(Y, "x") < T[_ * 2 - 1] - L && (V -= fb)), A[0] = A[1], A[1] = eventX, d = (A[1] - A[0]) / 2, B[0] = B[1], B[1] = eventY, e = (B[1] - B[0]) / 2, ab || m.onSlideStart != "" && m.onSlideStart(new z.args(m, Y, a(Y).children(":eq(" + x[j] + ")"), x[j] % gb)), (e > 3 || e < -3) && h && !ab && (lb = !0), (d > 5 || d < -5) && h ? (b.preventDefault(), ab = !0) : h || (ab = !0);
                    if (ab && !lb) {
                        var i = z.getSliderOffset(Y, "x"), n = a(this)[0] === a(F)[0] ? -1 * o / (G - O - H) : 1, p = a(this)[0] === a(F)[0] ? m.scrollbarElasticPullResistance : m.elasticPullResistance;
                        h && (X != b.touches.length && (V = i * -1 + eventX), X = b.touches.length), i > c && (f = (V - eventX) * n * p / n), i < o * -1 && (f = (o + (V - eventX) * -1 * n) * p * -1 / n), z.setSliderOffset(Y, (V - eventX - f) * -1 * n);
                        if (m.scrollbar) {
                            z.showScrollbar(m, D), g = Math.floor((V - eventX - f) / o * (G - O - H) * n);
                            var q = H;
                            i >= c ? (q = H - P - g * -1, z.setSliderOffset(a("." + D), 0), a("." + D).css({width:q + "px"})) : i <= o * -1 + 1 ? (q = G - O - P - g, z.setSliderOffset(a("." + D), g), a("." + D).css({width:q + "px"})) : z.setSliderOffset(a("." + D), g)
                        }
                        h && (Q = b.touches[0].pageX)
                    }
                    R = z.calcActiveOffset(m, (V - eventX - f) * -1, 0, T, o, L, gb, undefined), R != x[j] && m.onSlideChange != "" && (x[j] = R, m.onSlideChange(new z.args(m, Y, a(Y).children(":eq(" + R + ")"), R % gb)))
                }), a(rb).bind("touchend.iosSliderEvent", function (a) {
                    var a = a.originalEvent;
                    if (ub)return!0;
                    if (a.touches.length != 0)for (var b = 0; b < sizeof(a.touches.length); b++)a.touches[b].pageX == Q && z.slowScrollHorizontal(Y, n, o, D, d, e, H, L, G, O, P, T, j, gb, fb, _, jb, m); else z.slowScrollHorizontal(Y, n, o, D, d, e, H, L, G, O, P, T, j, gb, fb, _, jb, m);
                    lb = !1
                });
                if (!h) {
                    var wb = a(window);
                    if (l || k)var wb = a(document);
                    a(wb).bind("mouseup.iosSliderEvent", function (b) {
                        ab ? a(Y).children(":eq(" + x[j] + ")").find("a").unbind("click.disableClick").bind("click.disableClick", z.preventClick) : a(Y).children(":eq(" + x[j] + ")").find("a").unbind("click.disableClick").bind("click.disableClick", z.enableClick), a(Y).children(":eq(" + x[j] + ")").find("[onclick]").each(function () {
                            this.onclick = function (b) {
                                if (ab)return!1;
                                a(this).data("onclick").call(this, b || window.event)
                            }
                        }), parseFloat(a().jquery) >= 1.6 && a(Y).children(":eq(" + x[j] + ")").find("*").each(function () {
                            var b = a(this).data("events");
                            if (b != undefined && b.click != undefined && b.click[0].namespace != "iosSliderEvent") {
                                if (!ab)return!1;
                                a(this).one("click.disableClick", z.preventClick);
                                var c = a(this).data("events").click, d = c.pop();
                                c.splice(0, 0, d)
                            }
                        });
                        if (!v[j]) {
                            a(rb).css({cursor:p}), cb = !1;
                            if (db == undefined)return!1;
                            z.slowScrollHorizontal(db, n, o, D, d, e, H, L, G, O, P, T, j, gb, fb, _, jb, m), db = undefined
                        }
                        lb = !1
                    })
                }
            }
        })
    }, destroy:function (b, c) {
        return c == undefined && (c = this), a(c).each(function () {
            var c = a(this), d = c.data("iosslider");
            if (d == undefined)return!1;
            b == undefined && (b = !0), z.autoSlidePause(d.sliderNumber), v[d.sliderNumber] = !0, a(this).unbind(".iosSliderEvent"), a(this).children(":first-child").unbind(".iosSliderEvent"), a(this).children(":first-child").children().unbind(".iosSliderEvent"), b && (a(this).attr("style", ""), a(this).children(":first-child").attr("style", ""), a(this).children(":first-child").children().attr("style", ""), a(d.settings.navSlideSelector).attr("style", ""), a(d.settings.navPrevSelector).attr("style", ""), a(d.settings.navNextSelector).attr("style", ""), a(d.settings.autoSlideToggleSelector).attr("style", ""), a(d.settings.unselectableSelector).attr("style", "")), d.settings.infiniteSlider && (a(this).children(":first-child").html(), a(this).children(":first-child").html(a(this).children(":first-child").children(":nth-child(-n+" + d.numberOfSlides + ")").clone(!0))), d.settings.scrollbar && a(".scrollbarBlock" + d.sliderNumber).remove();
            var e = w[d.sliderNumber];
            for (var f = 0; f < e.length; f++)clearTimeout(e[f]);
            c.removeData("iosslider")
        })
    }, update:function (b) {
        return b == undefined && (b = this), a(b).each(function () {
            var b = a(this), c = b.data("iosslider");
            if (c == undefined)return!1;
            A.destroy(!1, this), c.settings.startAtSlide = x[c.sliderNumber] + 1, A.init(c.settings, this)
        })
    }, addSlide:function (b, c) {
        return this.each(function () {
            var d = a(this), e = d.data("iosslider");
            if (e == undefined)return!1;
            e.numberOfSlides = e.numberOfSlides + 1, c <= e.numberOfSlides ? a(e.scrollerNode).children(":eq(" + (c - 1) + ")").before(b) : a(e.scrollerNode).children(":eq(" + (c - 2) + ")").after(b), x[e.sliderNumber] > c - 2 && x[e.sliderNumber]++, A.update(this)
        })
    }, removeSlide:function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("iosslider");
            if (d == undefined)return!1;
            d.numberOfSlides = d.numberOfSlides - 1, a(d.scrollerNode).children(":eq(" + (b - 1) + ")").remove(), x[d.sliderNumber] > b - 1 && x[d.sliderNumber]--, A.update(this)
        })
    }, goToSlide:function (b, c) {
        return c == undefined && (c = this), a(c).each(function () {
            var c = a(this), d = c.data("iosslider");
            if (d == undefined)return!1;
            b = (b - 1) % d.numberOfSlides;
            if (d.settings.infiniteSlider) {
                var e = d.numberOfSlides * .5, f = (e + x[d.sliderNumber]) % d.numberOfSlides, g = b < f ? 1 : -1;
                b += d.infiniteSliderOffset, g < 0 && x[d.sliderNumber] % d.numberOfSlides < e && (b -= d.infiniteSliderOffset), g > 0 && x[d.sliderNumber] % d.numberOfSlides > e && (b += d.infiniteSliderOffset)
            }
            z.changeSlide(b, a(d.scrollerNode), w[d.sliderNumber], d.sliderMax, d.scrollbarClass, d.scrollbarWidth, d.stageWidth, d.scrollbarStageWidth, d.scrollMargin, d.scrollBorder, d.childrenOffsets, d.sliderNumber, d.infiniteSliderOffset, d.infiniteSliderWidth, d.numberOfSlides, d.settings), x[d.sliderNumber] = b
        })
    }, lock:function () {
        return this.each(function () {
            var b = a(this), c = b.data("iosslider");
            if (c == undefined)return!1;
            y[c.sliderNumber] = !0
        })
    }, unlock:function () {
        return this.each(function () {
            var b = a(this), c = b.data("iosslider");
            if (c == undefined)return!1;
            y[c.sliderNumber] = !1
        })
    }};
    a.fn.iosSlider = function (b) {
        if (A[b])return A[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof b == "object" || !b)return A.init.apply(this, arguments);
        a.error("invalid method call!")
    }
}(jQuery), function (a) {
    "use strict";
    var b = function (a, c, d) {
        var e = document.createElement("img"), f, g;
        return e.onerror = c, e.onload = function () {
            g && (!d || !d.noRevoke) && b.revokeObjectURL(g), c(b.scale(e, d))
        }, window.Blob && a instanceof Blob || window.File && a instanceof File ? (f = g = b.createObjectURL(a), e._type = a.type) : f = a, f ? (e.src = f, e) : b.readFile(a, function (a) {
            var b = a.target;
            b && b.result ? e.src = b.result : c(a)
        })
    }, c = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    b.detectSubsampling = function (a) {
        var b = a.width, c = a.height, d, e;
        return b * c > 1048576 ? (d = document.createElement("canvas"), d.width = d.height = 1, e = d.getContext("2d"), e.drawImage(a, -b + 1, 0), e.getImageData(0, 0, 1, 1).data[3] === 0) : !1
    }, b.detectVerticalSquash = function (a, b) {
        var c = document.createElement("canvas"), d = c.getContext("2d"), e, f, g, h, i;
        c.width = 1, c.height = b, d.drawImage(a, 0, 0), e = d.getImageData(0, 0, 1, b).data, f = 0, g = b, h = b;
        while (h > f)i = e[(h - 1) * 4 + 3], i === 0 ? g = h : f = h, h = g + f >> 1;
        return h / b
    }, b.renderImageToCanvas = function (a, c, d, e) {
        var f = a.width, g = a.height, h = c.getContext("2d"), i, j = 1024, k = document.createElement("canvas"), l, m, n, o, p;
        h.save(), b.detectSubsampling(a) && (f /= 2, g /= 2), i = b.detectVerticalSquash(a, g), k.width = k.height = j, l = k.getContext("2d"), m = 0;
        while (m < g) {
            n = m + j > g ? g - m : j, o = 0;
            while (o < f)p = o + j > f ? f - o : j, l.clearRect(0, 0, j, j), l.drawImage(a, -o, -m), h.drawImage(k, 0, 0, p, n, Math.floor(o * d / f), Math.floor(m * e / g / i), Math.ceil(p * d / f), Math.ceil(n * e / g / i)), o += j;
            m += j
        }
        h.restore(), k = l = null
    }, b.scale = function (a, c) {
        c = c || {};
        var d = document.createElement("canvas"), e = a.width, f = a.height, g = Math.max((c.minWidth || e) / e, (c.minHeight || f) / f);
        return g > 1 && (e = parseInt(e * g, 10), f = parseInt(f * g, 10)), g = Math.min((c.maxWidth || e) / e, (c.maxHeight || f) / f), g < 1 && (e = parseInt(e * g, 10), f = parseInt(f * g, 10)), a.getContext || c.canvas && d.getContext ? (d.width = e, d.height = f, a._type === "image/jpeg" ? b.renderImageToCanvas(a, d, e, f) : d.getContext("2d").drawImage(a, 0, 0, e, f), d) : (a.width = e, a.height = f, a)
    }, b.createObjectURL = function (a) {
        return c ? c.createObjectURL(a) : !1
    }, b.revokeObjectURL = function (a) {
        return c ? c.revokeObjectURL(a) : !1
    }, b.readFile = function (a, b) {
        if (window.FileReader && FileReader.prototype.readAsDataURL) {
            var c = new FileReader;
            return c.onload = c.onerror = b, c.readAsDataURL(a), c
        }
        return!1
    }, typeof define == "function" && define.amd ? define(function () {
        return b
    }) : a.loadImage = b
}(this), function (a) {
    "use strict", typeof define == "function" && define.amd ? define(["jquery", "load-image", "bootstrap"], a) : a(window.jQuery, window.loadImage)
}(function (a, b) {
    "use strict", a.extend(a.fn.modal.defaults, {delegate:document, selector:null, filter:"*", index:0, href:null, preloadRange:2, offsetWidth:100, offsetHeight:200, canvas:!1, slideshow:0, imageClickDivision:.5, wheelHandler:1, wide:0});
    var c = a.fn.modal.Constructor.prototype.show, d = a.fn.modal.Constructor.prototype.hide;
    a.extend(a.fn.modal.Constructor.prototype, {initLinks:function () {
        var b = this, c = this.options, d = c.selector || "a[data-target=" + c.target + "]";
        this.$links = a(c.delegate).find(d).filter(c.filter).each(function (a) {
            b.getUrl(this) === c.href && (c.index = a)
        }), this.$links[c.index] || (c.index = 0);
        a('.thumbs-arrow').hide();
        this.$element.find(".modal-thumbs ul").html("");
        if ((b.$links.length > 1) && (c.thumbs)) {
            a('.thumbs-arrow').show();
            var e = this.$element.find(".modal-thumbs ul");
            b.$links.each(function (c) {
                var d = a(this).attr("href"),
                    f = a("<li />");
                    f.append('<img />').find('img').attr("src", d).bind("click", function () {
                        b.goTo(c)
                    });

                e.append(f);
            })
        }
    }, getUrl:function (b) {
        return b.href || a(b).data("href")
    }, startSlideShow:function () {
        var a = this;
        this.options.slideshow && (this._slideShow = window.setTimeout(function () {
            a.next()
        }, this.options.slideshow))
    }, stopSlideShow:function () {
        window.clearTimeout(this._slideShow)
    }, toggleSlideShow:function () {
        var a = this.$element.find(".modal-slideshow");
        this.options.slideshow ? (this.options.slideshow = 0, this.stopSlideShow()) : (this.options.slideshow = a.data("slideshow") || 5e3, this.startSlideShow()), a.find("i").toggleClass("icon-play icon-pause")
    }, preloadImages:function () {
        var b = this.options, c = b.index + b.preloadRange + 1, d, e;
        for (e = b.index - b.preloadRange; e < c; e += 1)d = this.$links[e], d && e !== b.index && a("<img>").prop("src", this.getUrl(d))
    }, loadImage:function () {
        var a = this, c = this.$element, d = this.options.index, e = this.getUrl(this.$links[d]), f;
        this.abortLoad(), this.stopSlideShow(), c.trigger("beforeLoad"), this._loadingTimeout = window.setTimeout(function () {
            c.addClass("modal-loading")
        }, 100), f = c.find(".modal-image").children().removeClass("in"), window.setTimeout(function () {
            f.remove()
        }, 3e3), c.find(".modal-title").text(this.$links[d].title), c.find(".modal-download").prop("href", e), this._loadingImage = b(e, function (b) {
            a.img = b, window.clearTimeout(a._loadingTimeout), c.removeClass("modal-loading"), c.trigger("load"), a.showImage(b), a.startSlideShow()
        }, this._loadImageOptions), this.preloadImages()
    }, showImage:function (b) {
        var c = this.$element, d = a.support.transition && c.hasClass("fade"), e = d ? c.animate : c.css, f = c.find(".modal-image"), g, h;
        f.css({width:b.width, height:b.height}), c.find(".modal-title").css({width:Math.max(b.width, 380)}), d && (g = c.clone().hide().appendTo(document.body)), this.options.wide == 1 && a(window).width() > 767 ? e.call(c.stop(), {"margin-left":-((g || c).outerWidth() / 2), "margin-top":"0", "padding-top":(a(window).height() - b.height) / 2, width:a(window).width()}) : a(window).width() > 767 ? e.call(c.stop(), {"margin-top":-((g || c).outerHeight() / 2), "margin-left":-((g || c).outerWidth() / 2), "padding-top":"0", width:"auto"}) : c.css({"padding-top":"0", top:(a(window).height() - (g || c).outerHeight()) / 2, width:"auto"}), g && g.remove(), f.append(b), h = b.offsetWidth, c.trigger("display"), d ? c.is(":visible") ? a(b).on(a.support.transition.end,function (d) {
            d.target === b && (a(b).off(a.support.transition.end), c.trigger("displayed"))
        }).addClass("in") : (a(b).addClass("in"), c.one("shown", function () {
            c.trigger("displayed")
        })) : (a(b).addClass("in"), c.trigger("displayed"))
    }, abortLoad:function () {
        this._loadingImage && (this._loadingImage.onload = this._loadingImage.onerror = null), window.clearTimeout(this._loadingTimeout)
    }, prev:function () {
        var a = this.options;
        a.index -= 1, a.index < 0 && (a.index = this.$links.length - 1), this.loadImage()
    }, next:function () {
        var a = this.options;
        a.index += 1, a.index > this.$links.length - 1 && (a.index = 0), this.loadImage()
    }, goTo:function (a) {
        var b = this.options;
        b.index = a, this.loadImage()
    }, keyHandler:function (a) {
        switch (a.which) {
            case 37:
            case 38:
                a.preventDefault(), this.prev();
                break;
            case 39:
            case 40:
                a.preventDefault(), this.next()
        }
    }, wheelHandler:function (a) {
        a.preventDefault(), a = a.originalEvent, this._wheelCounter = this._wheelCounter || 0, this._wheelCounter += a.wheelDelta || a.detail || 0;
        if (a.wheelDelta && this._wheelCounter >= 120 || !a.wheelDelta && this._wheelCounter < 0)this.prev(), this._wheelCounter = 0; else if (a.wheelDelta && this._wheelCounter <= -120 || !a.wheelDelta && this._wheelCounter > 0)this.next(), this._wheelCounter = 0
    }, initGalleryEvents:function () {
        var b = this, c = this.$element;
        c.find(".modal-image").on("click.modal-gallery", function (c) {
            var d = a(this);
            b.$links.length === 1 ? b.hide() : (c.pageX - d.offset().left) / d.width() < b.options.imageClickDivision ? b.prev(c) : b.next(c)
        }), c.find(".modal-prev").on("click.modal-gallery", function (a) {
            b.prev(a)
        }), c.find(".modal-next").on("click.modal-gallery", function (a) {
            b.next(a)
        }), c.find(".modal-slideshow").on("click.modal-gallery", function (a) {
            b.toggleSlideShow(a)
        }), a(document).on("keydown.modal-gallery", function (a) {
            b.keyHandler(a)
        }), this.options.wheelhandler == 1 && a(document).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery", function (a) {
            b.wheelHandler(a)
        })
    }, destroyGalleryEvents:function () {
        var b = this.$element;
        this.abortLoad(), this.stopSlideShow(), b.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery"), a(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery")
    }, show:function () {
        if (!this.isShown && this.$element.hasClass("modal-gallery")) {
            var b = this.$element, d = this.options, e = a(window).width(), f = a(window).height();
            b.hasClass("modal-fullscreen") ? (this._loadImageOptions = {maxWidth:e, maxHeight:f, canvas:d.canvas}, b.hasClass("modal-fullscreen-stretch") ? (this._loadImageOptions.minWidth = e, this._loadImageOptions.minHeight = f) : b.hasClass("modal-fullscreen-wide") ? this.options.wide = 1 : this.options.wide = 0) : (this._loadImageOptions = {maxWidth:e - d.offsetWidth, maxHeight:f - d.offsetHeight, canvas:d.canvas}, this.options.wide = 0), this.options.wide == 1 && e > 767 ? b.css({"margin-left":-(b.outerWidth() / 2), "margin-top":"0", "padding-top":(f - b.outerHeight()) / 2, width:e}) : e > 767 ? b.css({"margin-top":-(b.outerHeight() / 2), "margin-left":-(b.outerWidth() / 2), "padding-top":"0", width:"auto"}) : b.css({"padding-top":"0", top:(a(window).height() - b.outerHeight()) / 2, width:"auto"}), this.initGalleryEvents(), this.initLinks(), this.$links.length && (b.find(".modal-slideshow, .modal-prev, .modal-next").toggle(this.$links.length !== 1), b.toggleClass("modal-single", this.$links.length === 1), this.loadImage())
        }
        c.apply(this, arguments);

    }, hide:function () {
        this.isShown && this.$element.hasClass("modal-gallery") && (this.options.delegate = document, this.options.href = null, this.destroyGalleryEvents()), d.apply(this, arguments)
    }}), a(function () {
        a(document.body).on("click.modal-gallery.data-api", '[data-toggle="modal-gallery"]', function (b) {
            var c = a(this), d = c.data(), e = a(d.target), f = e.data("modal"), g;
            f || (d = a.extend(e.data(), d)), d.selector || (d.selector = "a[rel=gallery]"), g = a(b.target).closest(d.selector), g.length && e.length && (b.preventDefault(), d.href = g.prop("href") || g.data("href"), d.delegate = g[0] !== this ? this : document, f && a.extend(f.options, d), e.modal(d))
        })
    })
});