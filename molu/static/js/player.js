$("#music")
	.append('<div id="xplayer" style=""><div class="player"><div class="cover"></div><div class="info"><div class="songstyle"><span class="song"><span title=""></span><span></div><div class="artiststyle"><span class="artist"><span title=""></span></span></div></div><div id="pdyf1" class="note" style="color: #ff1eba96;"><i class="fa fa-music" aria-hidden="true"></i></div><div id="pdyf2" class="note" style="color: #6d5dfc;"><i class="fa fa-music" aria-hidden="true"></i></div><div id="pdyf3" class="note" style="color: #00adff85;"><i class="fa fa-music" aria-hidden="true"></i></div><div class="control"><i class="aprev fa fa-fast-backward" title="上一专辑"></i><i class="prev fa fa-backward" title="上一首" style="margin-right: 30px;"></i><div class="status"><i class="play fa fa-play" title="播放"></i><i class="pause fa fa-pause" title="暂停"></i></div><i class="next fa fa-forward" title="下一首"></i><i  class="anext fa fa-fast-forward" title="下一专辑"></i><div class="switch-playlist" style="display: inline-block; margin-left: 18px;"><i class="fa fa-list-ul" title="播放列表"></i></div></div><div class="foot"><div class="volumecontrol"><div class="volume fa fa-volume-up"></div><div class="volumeprogress"><div class="progressbg"><div class="progressbg1"></div><div class="ts"></div></div></div></div><div class="playprogress" title="00:00 / 00:00"><div class="progressbg"><div class="progressbg1"></div><div class="progressbg2"></div><div class="ts"></div></div></div><div class="switch-ksclrc"><i class=\"random fa fa-toggle-on\" title="关闭歌词"></i></div><div class="qhms"><i class="random fa fa-retweet" title="专辑循环"></i></div></div></div><div class="playlist"><div class="playlist-bd"><div class="album-list"><div class="musicheader"></div><div class="list"></div></div><div class="song-list"><div class="musicheader"><i class="fa fa-angle-right"></i><span></span></div><div class="list"><span></span></div></div></div></div><div class="switch-player" style="background: #6d5dfc"><i class="fa fa-angle-right" style="margin-top: 200%;"></i></div></div><div id="Tips" class=""></div><div id="Ksc" class=""></div><div id="Lrc" class=""></div>');
if (typeof jQuery === 'undefined') {
	if (confirm("网站没有加载jQuery插件，是否查看如何添加jquery.min.js？\n找到【jquery.min.js】，复制<script>标签，添加到播放器代码上方即可")) {
		window.location = "http://staticfile.org/"
	} else {
		throw new Error('请先加载jQuery插件');
	}
}
window.timer = new Array();
jQuery.fn.extend({
	DragClose: function () {
		if (this.length) {
			for (var a in $(this)
				.data("options")) {
				"dragObj" == a && $(this)
					.data("options")
					.dragObj.dostop()
			}
		}
	},
	Drag: function () {
		var a = {
			dragObj: $(this),
			parentObj: $(document),
			callback: null,
			isPhone: !1,
			lockX: !1,
			lockY: !1,
			maxWidth: 0,
			maxHeight: 0
		};
		arguments.length && (a = $.extend({}, a, arguments[0]));
		a.dragObj.data("options", a);
		var c = $(this)[0],
			b = a.dragObj,
			e = 0,
			d = 0,
			g = a.callback;
		"static" == $(this)
			.css("position") && $(this)
				.css("position", "relative");
		var m = 0,
			n = 0;
		a.isPhone ? (b.__start = function (f) {
			m = Math.max(a.parentObj.width(), a.maxWidth);
			n = Math.max(a.parentObj.height(), a.maxHeight);
			f = event.targetTouches[0];
			e = f.clientX - c.offsetLeft;
			d = f.clientY - c.offsetTop;
			b.on("touchmove", b.__move);
			b.on("touchend", b.__end);
			return !1
		}, b.__move = function (f) {
			touch = event.targetTouches[0];
			f = touch.clientX - e;
			var h = touch.clientX - d,
				k = c.offsetWidth,
				l = c.offsetHeight;
			0 > f ? f = 0 : f + k > m && (f = m - k);
			0 > h ? h = 0 : h + l > n && (h = n - l);
			a.lockX || (c.style.top = h + "px");
			a.lockY || (c.style.left = f + "px");
			g && g(b[0], f, h, k, l);
			return !1
		}, b.__end = function (a) {
			b.off("touchmove");
			b.off("touchend");
			_flag = !1;
			d = e = 0;
			g && g(b[0]);
			return !1
		}, b.dostart = function () {
			b.on("touchstart", b.__start)
		}, b.dostop = function () {
			b.off("touchstart");
			b.off("touchmove");
			b.off("touchend")
		}) : (b.__start = function (f) {
			m = Math.max(a.parentObj.width(), a.maxWidth);
			n = Math.max(a.parentObj.height(), a.maxHeight);
			e = f.clientX - c.offsetLeft;
			d = f.clientY - c.offsetTop;
			$(document)
				.on("mousemove", b.__move);
			$(document)
				.on("mouseup", b.__end);
			b[0].setCapture ? b[0].setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			f.stopPropagation();
			f.preventDefault()
		}, b.__move = function (f) {
			var h = f.clientX - e,
				k = f.clientY - d,
				l = c.offsetWidth,
				p = c.offsetHeight;
			0 > h ? h = 0 : h + l > m && (h = m - l);
			0 > k ? k = 0 : k + p > n && (k = n - p);
			a.lockX || (c.style.top = k + "px");
			a.lockY || (c.style.left = h + "px");
			g && g(b[0], h, k, l, p);
			f.stopPropagation();
			f.preventDefault()
		}, b.__end = function (a) {
			b[0].releaseCapture ? b[0].releaseCapture() : window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			$(document)
				.off("mousemove");
			$(document)
				.off("mouseup");
			d = e = 0;
			g && g(b[0]);
			a.stopPropagation();
			a.preventDefault()
		}, b.dostart = function () {
			b.on("mousedown", b.__start)
		}, b.dostop = function () {
			b.off("mousedown");
			$(document)
				.off("mousemove");
			$(document)
				.off("mouseup")
		});
		b.dostart()
	}
});
(function (a) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], a)
	} else {
		if (typeof exports === "object") {
			module.exports = a
		} else {
			a(jQuery)
		}
	}
}(function (c) {
	var d = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		k = ("onwheel" in document || document.documentMode >= 9) ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		h = Array.prototype.slice,
		j, b;
	if (c.event.fixHooks) {
		for (var e = d.length; e;) {
			c.event.fixHooks[d[--e]] = c.event.mouseHooks
		}
	}
	var f = c.event.special.mousewheel = {
		version: "3.1.9",
		setup: function () {
			if (this.addEventListener) {
				for (var m = k.length; m;) {
					this.addEventListener(k[--m], l, false)
				}
			} else {
				this.onmousewheel = l
			}
			c.data(this, "mousewheel-line-height", f.getLineHeight(this));
			c.data(this, "mousewheel-page-height", f.getPageHeight(this))
		},
		teardown: function () {
			if (this.removeEventListener) {
				for (var m = k.length; m;) {
					this.removeEventListener(k[--m], l, false)
				}
			} else {
				this.onmousewheel = null
			}
		},
		getLineHeight: function (i) {
			return parseInt(c(i)["offsetParent" in c.fn ? "offsetParent" : "parent"]()
				.css("fontSize"), 10)
		},
		getPageHeight: function (i) {
			return c(i)
				.height()
		},
		settings: {
			adjustOldDeltas: true
		}
	};
	c.fn.extend({
		mousewheel: function (i) {
			return i ? this.bind("mousewheel", i) : this.trigger("mousewheel")
		},
		unmousewheel: function (i) {
			return this.unbind("mousewheel", i)
		}
	});

	function l(i) {
		var n = i || window.event,
			r = h.call(arguments, 1),
			t = 0,
			p = 0,
			o = 0,
			q = 0;
		i = c.event.fix(n);
		i.type = "mousewheel";
		if ("detail" in n) {
			o = n.detail * -1
		}
		if ("wheelDelta" in n) {
			o = n.wheelDelta
		}
		if ("wheelDeltaY" in n) {
			o = n.wheelDeltaY
		}
		if ("wheelDeltaX" in n) {
			p = n.wheelDeltaX * -1
		}
		if ("axis" in n && n.axis === n.HORIZONTAL_AXIS) {
			p = o * -1;
			o = 0
		}
		t = o === 0 ? p : o;
		if ("deltaY" in n) {
			o = n.deltaY * -1;
			t = o
		}
		if ("deltaX" in n) {
			p = n.deltaX;
			if (o === 0) {
				t = p * -1
			}
		}
		if (o === 0 && p === 0) {
			return
		}
		if (n.deltaMode === 1) {
			var s = c.data(this, "mousewheel-line-height");
			t *= s;
			o *= s;
			p *= s
		} else {
			if (n.deltaMode === 2) {
				var m = c.data(this, "mousewheel-page-height");
				t *= m;
				o *= m;
				p *= m
			}
		}
		q = Math.max(Math.abs(o), Math.abs(p));
		if (!b || q < b) {
			b = q;
			if (a(n, q)) {
				b /= 40
			}
		}
		if (a(n, q)) {
			t /= 40;
			p /= 40;
			o /= 40
		}
		t = Math[t >= 1 ? "floor" : "ceil"](t / b);
		p = Math[p >= 1 ? "floor" : "ceil"](p / b);
		o = Math[o >= 1 ? "floor" : "ceil"](o / b);
		i.deltaX = p;
		i.deltaY = o;
		i.deltaFactor = b;
		i.deltaMode = 0;
		r.unshift(i, t, p, o);
		if (j) {
			clearTimeout(j)
		}
		j = setTimeout(g, 200);
		return (c.event.dispatch || c.event.handle)
			.apply(this, r)
	}

	function g() {
		b = null
	}

	function a(m, i) {
		return f.settings.adjustOldDeltas && m.type === "mousewheel" && i % 120 === 0
	}
}));
(function (c) {
	var b = {
		init: function (e) {
			var f = {
				set_width: false,
				set_height: false,
				horizontalScroll: false,
				scrollInertia: 950,
				mouseWheel: true,
				mouseWheelPixels: "auto",
				autoDraggerLength: true,
				autoHideScrollbar: false,
				alwaysShowScrollbar: false,
				snapAmount: null,
				snapOffset: 0,
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: "auto",
					scrollAmount: 40
				},
				advanced: {
					updateOnBrowserResize: true,
					updateOnContentResize: false,
					autoExpandHorizontalScroll: false,
					autoScrollOnFocus: true,
					normalizeMouseWheelDelta: false
				},
				contentTouchScroll: true,
				callbacks: {
					onScrollStart: function () { },
					onScroll: function () { },
					onTotalScroll: function () { },
					onTotalScrollBack: function () { },
					onTotalScrollOffset: 0,
					onTotalScrollBackOffset: 0,
					whileScrolling: function () { }
				},
				theme: "light"
			},
				e = c.extend(true, f, e);
			return this.each(function () {
				var m = c(this);
				if (e.set_width) {
					m.css("width", e.set_width)
				}
				if (e.set_height) {
					m.css("height", e.set_height)
				}
				if (!c(document)
					.data("mCustomScrollbar-index")) {
					c(document)
						.data("mCustomScrollbar-index", "1")
				} else {
					var t = parseInt(c(document)
						.data("mCustomScrollbar-index"));
					c(document)
						.data("mCustomScrollbar-index", t + 1)
				}
				m.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + c(document)
					.data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:87%;' />")
					.addClass("mCustomScrollbar _mCS_" + c(document)
						.data("mCustomScrollbar-index"));
				var g = m.children(".mCustomScrollBox");
				if (e.horizontalScroll) {
					g.addClass("mCSB_horizontal")
						.wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
					var k = g.children(".mCSB_h_wrapper");
					k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />")
						.children(".mCSB_container")
						.css({
							width: k.children()
								.outerWidth(),
							position: "relative"
						})
						.unwrap()
				} else {
					g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
				}
				var o = g.children(".mCSB_container");
				if (c.support.touch) {
					o.addClass("mCS_touch")
				}
				o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
				var l = g.children(".mCSB_scrollTools"),
					h = l.children(".mCSB_draggerContainer"),
					q = h.children(".mCSB_dragger");
				if (e.horizontalScroll) {
					q.data("minDraggerWidth", q.width())
				} else {
					q.data("minDraggerHeight", q.height())
				}
				if (e.scrollButtons.enable) {
					if (e.horizontalScroll) {
						l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>")
							.append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")
					} else {
						l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>")
							.append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")
					}
				}
				g.bind("scroll", function () {
					if (!m.is(".mCS_disabled")) {
						g.scrollTop(0)
							.scrollLeft(0)
					}
				});
				m.data({
					mCS_Init: true,
					mCustomScrollbarIndex: c(document)
						.data("mCustomScrollbar-index"),
					horizontalScroll: e.horizontalScroll,
					scrollInertia: e.scrollInertia,
					scrollEasing: "mcsEaseOut",
					mouseWheel: e.mouseWheel,
					mouseWheelPixels: e.mouseWheelPixels,
					autoDraggerLength: e.autoDraggerLength,
					autoHideScrollbar: e.autoHideScrollbar,
					alwaysShowScrollbar: e.alwaysShowScrollbar,
					snapAmount: e.snapAmount,
					snapOffset: e.snapOffset,
					scrollButtons_enable: e.scrollButtons.enable,
					scrollButtons_scrollType: e.scrollButtons.scrollType,
					scrollButtons_scrollSpeed: e.scrollButtons.scrollSpeed,
					scrollButtons_scrollAmount: e.scrollButtons.scrollAmount,
					autoExpandHorizontalScroll: e.advanced.autoExpandHorizontalScroll,
					autoScrollOnFocus: e.advanced.autoScrollOnFocus,
					normalizeMouseWheelDelta: e.advanced.normalizeMouseWheelDelta,
					contentTouchScroll: e.contentTouchScroll,
					onScrollStart_Callback: e.callbacks.onScrollStart,
					onScroll_Callback: e.callbacks.onScroll,
					onTotalScroll_Callback: e.callbacks.onTotalScroll,
					onTotalScrollBack_Callback: e.callbacks.onTotalScrollBack,
					onTotalScroll_Offset: e.callbacks.onTotalScrollOffset,
					onTotalScrollBack_Offset: e.callbacks.onTotalScrollBackOffset,
					whileScrolling_Callback: e.callbacks.whileScrolling,
					bindEvent_scrollbar_drag: false,
					bindEvent_content_touch: false,
					bindEvent_scrollbar_click: false,
					bindEvent_mousewheel: false,
					bindEvent_buttonsContinuous_y: false,
					bindEvent_buttonsContinuous_x: false,
					bindEvent_buttonsPixels_y: false,
					bindEvent_buttonsPixels_x: false,
					bindEvent_focusin: false,
					bindEvent_autoHideScrollbar: false,
					mCSB_buttonScrollRight: false,
					mCSB_buttonScrollLeft: false,
					mCSB_buttonScrollDown: false,
					mCSB_buttonScrollUp: false
				});
				if (e.horizontalScroll) {
					if (m.css("max-width") !== "none") {
						if (!e.advanced.updateOnContentResize) {
							e.advanced.updateOnContentResize = true
						}
					}
				} else {
					if (m.css("max-height") !== "none") {
						var s = false,
							r = parseInt(m.css("max-height"));
						if (m.css("max-height")
							.indexOf("%") >= 0) {
							s = r, r = m.parent()
								.height() * s / 100
						}
						m.css("overflow", "hidden");
						g.css("max-height", r)
					}
				}
				m.mCustomScrollbar("update");
				if (e.advanced.updateOnBrowserResize) {
					var i, j = c(window)
						.width(),
						u = c(window)
							.height();
					c(window)
						.bind("resize." + m.data("mCustomScrollbarIndex"), function () {
							if (i) {
								clearTimeout(i)
							}
							i = setTimeout(function () {
								if (!m.is(".mCS_disabled") && !m.is(".mCS_destroyed")) {
									var w = c(window)
										.width(),
										v = c(window)
											.height();
									if (j !== w || u !== v) {
										if (m.css("max-height") !== "none" && s) {
											g.css("max-height", m.parent()
												.height() * s / 100)
										}
										m.mCustomScrollbar("update");
										j = w;
										u = v
									}
								}
							}, 150)
						})
				}
				if (e.advanced.updateOnContentResize) {
					var p;
					if (e.horizontalScroll) {
						var n = o.outerWidth()
					} else {
						var n = o.outerHeight()
					}
					p = setInterval(function () {
						if (e.horizontalScroll) {
							if (e.advanced.autoExpandHorizontalScroll) {
								o.css({
									position: "absolute",
									width: "auto"
								})
									.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
									.css({
										width: o.outerWidth(),
										position: "relative"
									})
									.unwrap()
							}
							var v = o.outerWidth()
						} else {
							var v = o.outerHeight()
						}
						if (v != n) {
							m.mCustomScrollbar("update");
							n = v
						}
					}, 300)
				}
			})
		},
		update: function () {
			var n = c(this),
				k = n.children(".mCustomScrollBox"),
				q = k.children(".mCSB_container");
			q.removeClass("mCS_no_scrollbar");
			n.removeClass("mCS_disabled mCS_destroyed");
			k.scrollTop(0)
				.scrollLeft(0);
			var y = k.children(".mCSB_scrollTools"),
				o = y.children(".mCSB_draggerContainer"),
				m = o.children(".mCSB_dragger");
			if (n.data("horizontalScroll")) {
				var A = y.children(".mCSB_buttonLeft"),
					t = y.children(".mCSB_buttonRight"),
					f = k.width();
				if (n.data("autoExpandHorizontalScroll")) {
					q.css({
						position: "absolute",
						width: "auto"
					})
						.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
						.css({
							width: q.outerWidth(),
							position: "relative"
						})
						.unwrap()
				}
				var z = q.outerWidth()
			} else {
				var w = y.children(".mCSB_buttonUp"),
					g = y.children(".mCSB_buttonDown"),
					r = k.height(),
					i = q.outerHeight()
			}
			if (i > r && !n.data("horizontalScroll")) {
				y.css("display", "block");
				var s = o.height();
				if (n.data("autoDraggerLength")) {
					var u = Math.round(r / i * s),
						l = m.data("minDraggerHeight");
					if (u <= l) {
						m.css({
							height: l
						})
					} else {
						if (u >= s - 10) {
							var p = s - 10;
							m.css({
								height: p
							})
						} else {
							m.css({
								height: u
							})
						}
					}
					m.children(".mCSB_dragger_bar")
						.css({
							"line-height": m.height() + "px"
						})
				}
				var B = m.height(),
					x = (i - r) / (s - B);
				n.data("scrollAmount", x)
					.mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
				var D = Math.abs(q.position()
					.top);
				n.mCustomScrollbar("scrollTo", D, {
					scrollInertia: 0,
					trigger: "internal"
				})
			} else {
				if (z > f && n.data("horizontalScroll")) {
					y.css("display", "block");
					var h = o.width();
					if (n.data("autoDraggerLength")) {
						var j = Math.round(f / z * h),
							C = m.data("minDraggerWidth");
						if (j <= C) {
							m.css({
								width: C
							})
						} else {
							if (j >= h - 10) {
								var e = h - 10;
								m.css({
									width: e
								})
							} else {
								m.css({
									width: j
								})
							}
						}
					}
					var v = m.width(),
						x = (z - f) / (h - v);
					n.data("scrollAmount", x)
						.mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
					var D = Math.abs(q.position()
						.left);
					n.mCustomScrollbar("scrollTo", D, {
						scrollInertia: 0,
						trigger: "internal"
					})
				} else {
					k.unbind("mousewheel focusin");
					if (n.data("horizontalScroll")) {
						m.add(q)
							.css("left", 0)
					} else {
						m.add(q)
							.css("top", 0)
					}
					if (n.data("alwaysShowScrollbar")) {
						if (!n.data("horizontalScroll")) {
							m.css({
								height: o.height()
							})
						} else {
							if (n.data("horizontalScroll")) {
								m.css({
									width: o.width()
								})
							}
						}
					} else {
						y.css("display", "none");
						q.addClass("mCS_no_scrollbar")
					}
					n.data({
						bindEvent_mousewheel: false,
						bindEvent_focusin: false
					})
				}
			}
		},
		scrolling: function (i, q, n, k, A, f, D, w) {
			var l = c(this);
			if (!l.data("bindEvent_scrollbar_drag")) {
				var o, p, C, z, e;
				if (c.support.pointer) {
					C = "pointerdown";
					z = "pointermove";
					e = "pointerup"
				} else {
					if (c.support.msPointer) {
						C = "MSPointerDown";
						z = "MSPointerMove";
						e = "MSPointerUp"
					}
				}
				if (c.support.pointer || c.support.msPointer) {
					k.bind(C, function (K) {
						K.preventDefault();
						l.data({
							on_drag: true
						});
						k.addClass("mCSB_dragger_onDrag");
						var J = c(this),
							M = J.offset(),
							I = K.originalEvent.pageX - M.left,
							L = K.originalEvent.pageY - M.top;
						if (I < J.width() && I > 0 && L < J.height() && L > 0) {
							o = L;
							p = I
						}
					});
					c(document)
						.bind(z + "." + l.data("mCustomScrollbarIndex"), function (K) {
							K.preventDefault();
							if (l.data("on_drag")) {
								var J = k,
									M = J.offset(),
									I = K.originalEvent.pageX - M.left,
									L = K.originalEvent.pageY - M.top;
								G(o, p, L, I)
							}
						})
						.bind(e + "." + l.data("mCustomScrollbarIndex"), function (x) {
							l.data({
								on_drag: false
							});
							k.removeClass("mCSB_dragger_onDrag")
						})
				} else {
					k.bind("mousedown touchstart", function (K) {
						K.preventDefault();
						K.stopImmediatePropagation();
						var J = c(this),
							N = J.offset(),
							I, M;
						if (K.type === "touchstart") {
							var L = K.originalEvent.touches[0] || K.originalEvent.changedTouches[0];
							I = L.pageX - N.left;
							M = L.pageY - N.top
						} else {
							l.data({
								on_drag: true
							});
							k.addClass("mCSB_dragger_onDrag");
							I = K.pageX - N.left;
							M = K.pageY - N.top
						}
						if (I < J.width() && I > 0 && M < J.height() && M > 0) {
							o = M;
							p = I
						}
					})
						.bind("touchmove", function (K) {
							K.preventDefault();
							K.stopImmediatePropagation();
							var N = K.originalEvent.touches[0] || K.originalEvent.changedTouches[0],
								J = c(this),
								M = J.offset(),
								I = N.pageX - M.left,
								L = N.pageY - M.top;
							G(o, p, L, I)
						});
					c(document)
						.bind("mousemove." + l.data("mCustomScrollbarIndex"), function (K) {
							if (l.data("on_drag")) {
								var J = k,
									M = J.offset(),
									I = K.pageX - M.left,
									L = K.pageY - M.top;
								G(o, p, L, I)
							}
						})
						.bind("mouseup." + l.data("mCustomScrollbarIndex"), function (x) {
							l.data({
								on_drag: false
							});
							k.removeClass("mCSB_dragger_onDrag")
						})
				}
				l.data({
					bindEvent_scrollbar_drag: true
				})
			}

			function G(J, K, L, I) {
				if (l.data("horizontalScroll")) {
					l.mCustomScrollbar("scrollTo", (k.position()
						.left - (K)) + I, {
						moveDragger: true,
						trigger: "internal"
					})
				} else {
					l.mCustomScrollbar("scrollTo", (k.position()
						.top - (J)) + L, {
						moveDragger: true,
						trigger: "internal"
					})
				}
			}
			if (c.support.touch && l.data("contentTouchScroll")) {
				if (!l.data("bindEvent_content_touch")) {
					var m, E, s, t, v, F, H;
					q.bind("touchstart", function (x) {
						x.stopImmediatePropagation();
						m = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
						E = c(this);
						s = E.offset();
						v = m.pageX - s.left;
						t = m.pageY - s.top;
						F = t;
						H = v
					});
					q.bind("touchmove", function (x) {
						x.preventDefault();
						x.stopImmediatePropagation();
						m = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
						E = c(this)
							.parent();
						s = E.offset();
						v = m.pageX - s.left;
						t = m.pageY - s.top;
						if (l.data("horizontalScroll")) {
							l.mCustomScrollbar("scrollTo", H - v, {
								trigger: "internal"
							})
						} else {
							l.mCustomScrollbar("scrollTo", F - t, {
								trigger: "internal"
							})
						}
					})
				}
			}
			if (!l.data("bindEvent_scrollbar_click")) {
				n.bind("click", function (I) {
					var x = (I.pageY - n.offset()
						.top) * l.data("scrollAmount"),
						y = c(I.target);
					if (l.data("horizontalScroll")) {
						x = (I.pageX - n.offset()
							.left) * l.data("scrollAmount")
					}
					if (y.hasClass("mCSB_draggerContainer") || y.hasClass("mCSB_draggerRail")) {
						l.mCustomScrollbar("scrollTo", x, {
							trigger: "internal",
							scrollEasing: "draggerRailEase"
						})
					}
				});
				l.data({
					bindEvent_scrollbar_click: true
				})
			}
			if (l.data("mouseWheel")) {
				if (!l.data("bindEvent_mousewheel")) {
					i.bind("mousewheel", function (K, M) {
						var J, I = l.data("mouseWheelPixels"),
							x = Math.abs(q.position()
								.top),
							L = k.position()
								.top,
							y = n.height() - k.height();
						if (l.data("normalizeMouseWheelDelta")) {
							if (M < 0) {
								M = -1
							} else {
								M = 1
							}
						}
						if (I === "auto") {
							I = 100 + Math.round(l.data("scrollAmount") / 2)
						}
						if (l.data("horizontalScroll")) {
							L = k.position()
								.left;
							y = n.width() - k.width();
							x = Math.abs(q.position()
								.left)
						}
						if ((M > 0 && L !== 0) || (M < 0 && L !== y)) {
							K.preventDefault();
							K.stopImmediatePropagation()
						}
						J = x - (M * I);
						l.mCustomScrollbar("scrollTo", J, {
							trigger: "internal"
						})
					});
					l.data({
						bindEvent_mousewheel: true
					})
				}
			}
			if (l.data("scrollButtons_enable")) {
				if (l.data("scrollButtons_scrollType") === "pixels") {
					if (l.data("horizontalScroll")) {
						w.add(D)
							.unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", j, h);
						l.data({
							bindEvent_buttonsContinuous_x: false
						});
						if (!l.data("bindEvent_buttonsPixels_x")) {
							w.bind("click", function (x) {
								x.preventDefault();
								r(Math.abs(q.position()
									.left) + l.data("scrollButtons_scrollAmount"))
							});
							D.bind("click", function (x) {
								x.preventDefault();
								r(Math.abs(q.position()
									.left) - l.data("scrollButtons_scrollAmount"))
							});
							l.data({
								bindEvent_buttonsPixels_x: true
							})
						}
					} else {
						f.add(A)
							.unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", j, h);
						l.data({
							bindEvent_buttonsContinuous_y: false
						});
						if (!l.data("bindEvent_buttonsPixels_y")) {
							f.bind("click", function (x) {
								x.preventDefault();
								r(Math.abs(q.position()
									.top) + l.data("scrollButtons_scrollAmount"))
							});
							A.bind("click", function (x) {
								x.preventDefault();
								r(Math.abs(q.position()
									.top) - l.data("scrollButtons_scrollAmount"))
							});
							l.data({
								bindEvent_buttonsPixels_y: true
							})
						}
					}

					function r(x) {
						if (!k.data("preventAction")) {
							k.data("preventAction", true);
							l.mCustomScrollbar("scrollTo", x, {
								trigger: "internal"
							})
						}
					}
				} else {
					if (l.data("horizontalScroll")) {
						w.add(D)
							.unbind("click");
						l.data({
							bindEvent_buttonsPixels_x: false
						});
						if (!l.data("bindEvent_buttonsContinuous_x")) {
							w.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
								y.preventDefault();
								var x = B();
								l.data({
									mCSB_buttonScrollRight: setInterval(function () {
										l.mCustomScrollbar("scrollTo", Math.abs(q.position()
											.left) + x, {
											trigger: "internal",
											scrollEasing: "easeOutCirc"
										})
									}, 17)
								})
							});
							var j = function (x) {
								x.preventDefault();
								clearInterval(l.data("mCSB_buttonScrollRight"))
							};
							w.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", j);
							D.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
								y.preventDefault();
								var x = B();
								l.data({
									mCSB_buttonScrollLeft: setInterval(function () {
										l.mCustomScrollbar("scrollTo", Math.abs(q.position()
											.left) - x, {
											trigger: "internal",
											scrollEasing: "easeOutCirc"
										})
									}, 17)
								})
							});
							var h = function (x) {
								x.preventDefault();
								clearInterval(l.data("mCSB_buttonScrollLeft"))
							};
							D.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", h);
							l.data({
								bindEvent_buttonsContinuous_x: true
							})
						}
					} else {
						f.add(A)
							.unbind("click");
						l.data({
							bindEvent_buttonsPixels_y: false
						});
						if (!l.data("bindEvent_buttonsContinuous_y")) {
							f.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
								y.preventDefault();
								var x = B();
								l.data({
									mCSB_buttonScrollDown: setInterval(function () {
										l.mCustomScrollbar("scrollTo", Math.abs(q.position()
											.top) + x, {
											trigger: "internal",
											scrollEasing: "easeOutCirc"
										})
									}, 17)
								})
							});
							var u = function (x) {
								x.preventDefault();
								clearInterval(l.data("mCSB_buttonScrollDown"))
							};
							f.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", u);
							A.bind("mousedown touchstart MSPointerDown pointerdown", function (y) {
								y.preventDefault();
								var x = B();
								l.data({
									mCSB_buttonScrollUp: setInterval(function () {
										l.mCustomScrollbar("scrollTo", Math.abs(q.position()
											.top) - x, {
											trigger: "internal",
											scrollEasing: "easeOutCirc"
										})
									}, 17)
								})
							});
							var g = function (x) {
								x.preventDefault();
								clearInterval(l.data("mCSB_buttonScrollUp"))
							};
							A.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", g);
							l.data({
								bindEvent_buttonsContinuous_y: true
							})
						}
					}

					function B() {
						var x = l.data("scrollButtons_scrollSpeed");
						if (l.data("scrollButtons_scrollSpeed") === "auto") {
							x = Math.round((l.data("scrollInertia") + 100) / 40)
						}
						return x
					}
				}
			}
			if (l.data("autoScrollOnFocus")) {
				if (!l.data("bindEvent_focusin")) {
					i.bind("focusin", function () {
						i.scrollTop(0)
							.scrollLeft(0);
						var x = c(document.activeElement);
						if (x.is("input,textarea,select,button,a[tabindex],area,object")) {
							var J = q.position()
								.top,
								y = x.position()
									.top,
								I = i.height() - x.outerHeight();
							if (l.data("horizontalScroll")) {
								J = q.position()
									.left;
								y = x.position()
									.left;
								I = i.width() - x.outerWidth()
							}
							if (J + y < 0 || J + y > I) {
								l.mCustomScrollbar("scrollTo", y, {
									trigger: "internal"
								})
							}
						}
					});
					l.data({
						bindEvent_focusin: true
					})
				}
			}
			if (l.data("autoHideScrollbar") && !l.data("alwaysShowScrollbar")) {
				if (!l.data("bindEvent_autoHideScrollbar")) {
					i.bind("mouseenter", function (x) {
						i.addClass("mCS-mouse-over");
						d.showScrollbar.call(i.children(".mCSB_scrollTools"))
					})
						.bind("mouseleave touchend", function (x) {
							i.removeClass("mCS-mouse-over");
							if (x.type === "mouseleave") {
								d.hideScrollbar.call(i.children(".mCSB_scrollTools"))
							}
						});
					l.data({
						bindEvent_autoHideScrollbar: true
					})
				}
			}
		},
		scrollTo: function (e, f) {
			var i = c(this),
				o = {
					moveDragger: false,
					trigger: "external",
					callbacks: true,
					scrollInertia: i.data("scrollInertia"),
					scrollEasing: i.data("scrollEasing")
				},
				f = c.extend(o, f),
				p, g = i.children(".mCustomScrollBox"),
				k = g.children(".mCSB_container"),
				r = g.children(".mCSB_scrollTools"),
				j = r.children(".mCSB_draggerContainer"),
				h = j.children(".mCSB_dragger"),
				t = draggerSpeed = f.scrollInertia,
				q, s, m, l;
			if (!k.hasClass("mCS_no_scrollbar")) {
				i.data({
					mCS_trigger: f.trigger
				});
				if (i.data("mCS_Init")) {
					f.callbacks = false
				}
				if (e || e === 0) {
					if (typeof (e) === "number") {
						if (f.moveDragger) {
							p = e;
							if (i.data("horizontalScroll")) {
								e = h.position()
									.left * i.data("scrollAmount")
							} else {
								e = h.position()
									.top * i.data("scrollAmount")
							}
							draggerSpeed = 0
						} else {
							p = e / i.data("scrollAmount")
						}
					} else {
						if (typeof (e) === "string") {
							var v;
							if (e === "top") {
								v = 0
							} else {
								if (e === "bottom" && !i.data("horizontalScroll")) {
									v = k.outerHeight() - g.height()
								} else {
									if (e === "left") {
										v = 0
									} else {
										if (e === "right" && i.data("horizontalScroll")) {
											v = k.outerWidth() - g.width()
										} else {
											if (e === "first") {
												v = i.find(".mCSB_container")
													.find(":first")
											} else {
												if (e === "last") {
													v = i.find(".mCSB_container")
														.find(":last")
												} else {
													v = i.find(e)
												}
											}
										}
									}
								}
							}
							if (v.length === 1) {
								if (i.data("horizontalScroll")) {
									e = v.position()
										.left
								} else {
									e = v.position()
										.top
								}
								p = e / i.data("scrollAmount")
							} else {
								p = e = v
							}
						}
					}
					if (i.data("horizontalScroll")) {
						if (i.data("onTotalScrollBack_Offset")) {
							s = -i.data("onTotalScrollBack_Offset")
						}
						if (i.data("onTotalScroll_Offset")) {
							l = g.width() - k.outerWidth() + i.data("onTotalScroll_Offset")
						}
						if (p < 0) {
							p = e = 0;
							clearInterval(i.data("mCSB_buttonScrollLeft"));
							if (!s) {
								q = true
							}
						} else {
							if (p >= j.width() - h.width()) {
								p = j.width() - h.width();
								e = g.width() - k.outerWidth();
								clearInterval(i.data("mCSB_buttonScrollRight"));
								if (!l) {
									m = true
								}
							} else {
								e = -e
							}
						}
						var n = i.data("snapAmount");
						if (n) {
							e = Math.round(e / n) * n - i.data("snapOffset")
						}
						d.mTweenAxis.call(this, h[0], "left", Math.round(p), draggerSpeed, f.scrollEasing);
						d.mTweenAxis.call(this, k[0], "left", Math.round(e), t, f.scrollEasing, {
							onStart: function () {
								if (f.callbacks && !i.data("mCS_tweenRunning")) {
									u("onScrollStart")
								}
								if (i.data("autoHideScrollbar") && !i.data("alwaysShowScrollbar")) {
									d.showScrollbar.call(r)
								}
							},
							onUpdate: function () {
								if (f.callbacks) {
									u("whileScrolling")
								}
							},
							onComplete: function () {
								if (f.callbacks) {
									u("onScroll");
									if (q || (s && k.position()
										.left >= s)) {
										u("onTotalScrollBack")
									}
									if (m || (l && k.position()
										.left <= l)) {
										u("onTotalScroll")
									}
								}
								h.data("preventAction", false);
								i.data("mCS_tweenRunning", false);
								if (i.data("autoHideScrollbar") && !i.data("alwaysShowScrollbar")) {
									if (!g.hasClass("mCS-mouse-over")) {
										d.hideScrollbar.call(r)
									}
								}
							}
						})
					} else {
						if (i.data("onTotalScrollBack_Offset")) {
							s = -i.data("onTotalScrollBack_Offset")
						}
						if (i.data("onTotalScroll_Offset")) {
							l = g.height() - k.outerHeight() + i.data("onTotalScroll_Offset")
						}
						if (p < 0) {
							p = e = 0;
							clearInterval(i.data("mCSB_buttonScrollUp"));
							if (!s) {
								q = true
							}
						} else {
							if (p >= j.height() - h.height()) {
								p = j.height() - h.height();
								e = g.height() - k.outerHeight();
								clearInterval(i.data("mCSB_buttonScrollDown"));
								if (!l) {
									m = true
								}
							} else {
								e = -e
							}
						}
						var n = i.data("snapAmount");
						if (n) {
							e = Math.round(e / n) * n - i.data("snapOffset")
						}
						d.mTweenAxis.call(this, h[0], "top", Math.round(p), draggerSpeed, f.scrollEasing);
						d.mTweenAxis.call(this, k[0], "top", Math.round(e), t, f.scrollEasing, {
							onStart: function () {
								if (f.callbacks && !i.data("mCS_tweenRunning")) {
									u("onScrollStart")
								}
								if (i.data("autoHideScrollbar") && !i.data("alwaysShowScrollbar")) {
									d.showScrollbar.call(r)
								}
							},
							onUpdate: function () {
								if (f.callbacks) {
									u("whileScrolling")
								}
							},
							onComplete: function () {
								if (f.callbacks) {
									u("onScroll");
									if (q || (s && k.position()
										.top >= s)) {
										u("onTotalScrollBack")
									}
									if (m || (l && k.position()
										.top <= l)) {
										u("onTotalScroll")
									}
								}
								h.data("preventAction", false);
								i.data("mCS_tweenRunning", false);
								if (i.data("autoHideScrollbar") && !i.data("alwaysShowScrollbar")) {
									if (!g.hasClass("mCS-mouse-over")) {
										d.hideScrollbar.call(r)
									}
								}
							}
						})
					}
					if (i.data("mCS_Init")) {
						i.data({
							mCS_Init: false
						})
					}
				}
			}

			function u(w) {
				if (i.data("mCustomScrollbarIndex")) {
					this.mcs = {
						top: k.position()
							.top,
						left: k.position()
							.left,
						draggerTop: h.position()
							.top,
						draggerLeft: h.position()
							.left,
						topPct: Math.round((100 * Math.abs(k.position()
							.top)) / Math.abs(k.outerHeight() - g.height())),
						leftPct: Math.round((100 * Math.abs(k.position()
							.left)) / Math.abs(k.outerWidth() - g.width()))
					};
					switch (w) {
						case "onScrollStart":
							i.data("mCS_tweenRunning", true)
								.data("onScrollStart_Callback")
								.call(i, this.mcs);
							break;
						case "whileScrolling":
							i.data("whileScrolling_Callback")
								.call(i, this.mcs);
							break;
						case "onScroll":
							i.data("onScroll_Callback")
								.call(i, this.mcs);
							break;
						case "onTotalScrollBack":
							i.data("onTotalScrollBack_Callback")
								.call(i, this.mcs);
							break;
						case "onTotalScroll":
							i.data("onTotalScroll_Callback")
								.call(i, this.mcs);
							break
					}
				}
			}
		},
		stop: function () {
			var g = c(this),
				e = g.children()
					.children(".mCSB_container"),
				f = g.children()
					.children()
					.children()
					.children(".mCSB_dragger");
			d.mTweenAxisStop.call(this, e[0]);
			d.mTweenAxisStop.call(this, f[0])
		},
		disable: function (e) {
			var j = c(this),
				f = j.children(".mCustomScrollBox"),
				h = f.children(".mCSB_container"),
				g = f.children(".mCSB_scrollTools"),
				i = g.children()
					.children(".mCSB_dragger");
			f.unbind("mousewheel focusin mouseenter mouseleave touchend");
			h.unbind("touchstart touchmove");
			if (e) {
				if (j.data("horizontalScroll")) {
					i.add(h)
						.css("left", 0)
				} else {
					i.add(h)
						.css("top", 0)
				}
			}
			g.css("display", "none");
			h.addClass("mCS_no_scrollbar");
			j.data({
				bindEvent_mousewheel: false,
				bindEvent_focusin: false,
				bindEvent_content_touch: false,
				bindEvent_autoHideScrollbar: false
			})
				.addClass("mCS_disabled")
		},
		destroy: function () {
			var e = c(this);
			e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex"))
				.addClass("mCS_destroyed")
				.children()
				.children(".mCSB_container")
				.unwrap()
				.children()
				.unwrap()
				.siblings(".mCSB_scrollTools")
				.remove();
			c(document)
				.unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex"));
			c(window)
				.unbind("resize." + e.data("mCustomScrollbarIndex"))
		}
	},
		d = {
			showScrollbar: function () {
				this.stop()
					.animate({
						opacity: 1
					}, "fast")
			},
			hideScrollbar: function () {
				this.stop()
					.animate({
						opacity: 0
					}, "fast")
			},
			mTweenAxis: function (g, i, h, f, o, y) {
				var y = y || {},
					v = y.onStart || function () { },
					p = y.onUpdate || function () { },
					w = y.onComplete || function () { };
				var n = t(),
					l, j = 0,
					r = g.offsetTop,
					s = g.style;
				if (i === "left") {
					r = g.offsetLeft
				}
				var m = h - r;
				q();
				e();

				function t() {
					if (window.performance && window.performance.now) {
						return window.performance.now()
					} else {
						if (window.performance && window.performance.webkitNow) {
							return window.performance.webkitNow()
						} else {
							if (Date.now) {
								return Date.now()
							} else {
								return new Date()
									.getTime()
							}
						}
					}
				}

				function x() {
					if (!j) {
						v.call()
					}
					j = t() - n;
					u();
					if (j >= g._time) {
						g._time = (j > g._time) ? j + l - (j - g._time) : j + l - 1;
						if (g._time < j + 1) {
							g._time = j + 1
						}
					}
					if (g._time < f) {
						g._id = _request(x)
					} else {
						w.call()
					}
				}

				function u() {
					if (f > 0) {
						g.currVal = k(g._time, r, m, f, o);
						s[i] = Math.round(g.currVal) + "px"
					} else {
						s[i] = h + "px"
					}
					p.call()
				}

				function e() {
					l = 1000 / 60;
					g._time = j + l;
					_request = (!window.requestAnimationFrame) ? function (z) {
						u();
						return setTimeout(z, 0.01)
					} : window.requestAnimationFrame;
					g._id = _request(x)
				}

				function q() {
					if (g._id == null) {
						return
					}
					if (!window.requestAnimationFrame) {
						clearTimeout(g._id)
					} else {
						window.cancelAnimationFrame(g._id)
					}
					g._id = null
				}

				function k(B, A, F, E, C) {
					switch (C) {
						case "linear":
							return F * B / E + A;
							break;
						case "easeOutQuad":
							B /= E;
							return -F * B * (B - 2) + A;
							break;
						case "easeInOutQuad":
							B /= E / 2;
							if (B < 1) {
								return F / 2 * B * B + A
							}
							B--;
							return -F / 2 * (B * (B - 2) - 1) + A;
							break;
						case "easeOutCubic":
							B /= E;
							B--;
							return F * (B * B * B + 1) + A;
							break;
						case "easeOutQuart":
							B /= E;
							B--;
							return -F * (B * B * B * B - 1) + A;
							break;
						case "easeOutQuint":
							B /= E;
							B--;
							return F * (B * B * B * B * B + 1) + A;
							break;
						case "easeOutCirc":
							B /= E;
							B--;
							return F * Math.sqrt(1 - B * B) + A;
							break;
						case "easeOutSine":
							return F * Math.sin(B / E * (Math.PI / 2)) + A;
							break;
						case "easeOutExpo":
							return F * (-Math.pow(2, -10 * B / E) + 1) + A;
							break;
						case "mcsEaseOut":
							var D = (B /= E) * B,
								z = D * B;
							return A + F * (0.499999999999997 * z * D + -2.5 * D * D + 5.5 * z + -6.5 * D + 4 * B);
							break;
						case "draggerRailEase":
							B /= E / 2;
							if (B < 1) {
								return F / 2 * B * B * B + A
							}
							B -= 2;
							return F / 2 * (B * B * B + 2) + A;
							break
					}
				}
			},
			mTweenAxisStop: function (e) {
				if (e._id == null) {
					return
				}
				if (!window.requestAnimationFrame) {
					clearTimeout(e._id)
				} else {
					window.cancelAnimationFrame(e._id)
				}
				e._id = null
			},
			rafPolyfill: function () {
				var f = ["ms", "moz", "webkit", "o"],
					e = f.length;
				while (--e > -1 && !window.requestAnimationFrame) {
					window.requestAnimationFrame = window[f[e] + "RequestAnimationFrame"];
					window.cancelAnimationFrame = window[f[e] + "CancelAnimationFrame"] || window[f[e] + "CancelRequestAnimationFrame"]
				}
			}
		};
	d.rafPolyfill.call();
	c.support.touch = !!("ontouchstart" in window);
	c.support.pointer = window.navigator.pointerEnabled;
	c.support.msPointer = window.navigator.msPointerEnabled;
	var a = ("https:" == document.location.protocol) ? "https:" : "http:";
	c.event.special.mousewheel || document.write('<script src="' + a + 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"><\/script>');
	c.fn.mCustomScrollbar = function (e) {
		if (b[e]) {
			return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
		} else {
			if (typeof e === "object" || !e) {
				return b.init.apply(this, arguments)
			} else {
				c.error("Method " + e + " does not exist")
			}
		}
	}
})(jQuery);
jQuery.cookie = function (b, j, m) {
	if (typeof j != "undefined") {
		m = m || {};
		if (j === null) {
			j = "";
			m.expires = -1
		}
		var e = "";
		if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
			var f;
			if (typeof m.expires == "number") {
				f = new Date();
				f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
			} else {
				f = m.expires
			}
			e = "; expires=" + f.toUTCString()
		}
		var l = m.path ? "; path=" + (m.path) : "";
		var g = m.domain ? "; domain=" + (m.domain) : "";
		var a = m.secure ? "; secure" : "";
		document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
	} else {
		var d = null;
		if (document.cookie && document.cookie != "") {
			var k = document.cookie.split(";");
			for (var h = 0; h < k.length; h++) {
				var c = jQuery.trim(k[h]);
				if (c.substring(0, b.length + 1) == (b + "=")) {
					d = decodeURIComponent(c.substring(b.length + 1));
					break
				}
			}
		}
		return d
	}
};
/*cookie plugin*/
jQuery.cookie = function (b, j, m) {
	if (typeof j != "undefined") {
		m = m || {};
		if (j === null) {
			j = "";
			m.expires = -1
		}
		var e = "";
		if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
			var f;
			if (typeof m.expires == "number") {
				f = new Date();
				f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
			} else {
				f = m.expires
			}
			e = "; expires=" + f.toUTCString()
		}
		var l = m.path ? "; path=" + (m.path) : "";
		var g = m.domain ? "; domain=" + (m.domain) : "";
		var a = m.secure ? "; secure" : "";
		document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
	} else {
		var d = null;
		if (document.cookie && document.cookie != "") {
			var k = document.cookie.split(";");
			for (var h = 0; h < k.length; h++) {
				var c = jQuery.trim(k[h]);
				if (c.substring(0, b.length + 1) == (b + "=")) {
					d = decodeURIComponent(c.substring(b.length + 1));
					break
				}
			}
		}
		return d
	}
};

var api = $("#music")
	.attr("api"); //api地址
var key = $("#music")
	.attr("key"); //key密钥
consolelog('小枫音乐播放器插件', api);
var span = document.createElement("span");
span.className = "fa";
span.style.display = "none";
document.body.insertBefore(span, document.body.firstChild);

function css(a, b) {
	return window.getComputedStyle(a, null)
		.getPropertyValue(b)
}
if (css(span, "font-family") === "FontAwesome") {
	consolelog("FontAwesome", "本站已存在FontAwesome，播放器取消加载")
} else {
	consolelog("FontAwesome", "本站未找到FontAwesome，播放器将加载");
	$("head")
		.append("<link rel='stylesheet' id='font-awesome-css'  href='https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css' type='text/css' media='all' />")
};
document.body.removeChild(span);
document.addEventListener('DOMContentLoaded', function () {
	function audioAutoPlay() {
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			audio.play();
		}, false);
	}
	audioAutoPlay();
});
$('html').one('touchstart', function () {
	audio.play();
});
function audioAutoPlay(audio) {
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio.play();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function () {
		audio.play();
	}, false);
}
/*音乐 plugin*/
var audio = new Audio(),
	$player = $("#xplayer"),
	$tips = $("#Tips"),
	$lk = $("#Lrc"),
	$kk = $("#Ksc"),
	$switchPlayer = $(".switch-player", $player),
	$switchplaylist = $(".switch-playlist", $player),
	$songName = $(".song", $player),
	$artist = $(".artist", $player),
	$songTime = $(".playprogress", $player),
	$songAlbum = $(".album", $player),
	$cover = $(".cover", $player),
	$info = $(".info", $player),
	$coverbg = $(".coverbg", $player),
	$songList = $(".song-list .list", $player),
	$albumList = $(".album-list", $player),
	$songFrom4 = $(".switch-ksclrc", $player),
	cur = "current";
ycgeci = true,
	first = 1;
errCount = 0;
localStorage.setItem("XPlrc", "null");
localStorage.setItem("XPksc", "null");
localStorage.setItem("XPLrcHeight", "null");
songTotal = 0, visTsMoving = !1, random = true, loop = false, pass = true, errjc = true, hasLrc = true, hasKsc = true, currentFrameId = 0, playisTsMoving = !1, zdyc = true, hasgeci = false;
var $Volumeprogress = $(".volumeprogress .progressbg .ts", $player);
$Volumeprogress.Drag({
	parentObj: $(".volumeprogress .progressbg", $player),
	lockY: !0,
	callback: function (a, b, c, e, g) {
		if (5 == arguments.length) {
			visTsMoving = !0;
			var d;
			d = ((84 - c) / 84)
				.toFixed(2);
			1 < Number(d) ? d = 1 : 0 > Number(d) && (d = 0, $(a)
				.css("top", "84%"));
			$(".volumeprogress .progressbg .progressbg1", $player)
				.height(100 * d);
			audio.volume = d, volume = d, $.cookie("player_volume", d, {
				path: "/",
				expires: 30
			});
			setTimeout(function () {
				Tips.show("音量：" + parseInt(d * 100))
			}, 500)
		} else {
			visTsMoving = !1
		}
	}
});
var $playprogress = $(".playprogress .progressbg .ts", $player);
$playprogress.Drag({
	parentObj: $(".playprogress .progressbg", $player),
	lockX: !0,
	callback: function (a, b, c, e, g) {
		if (5 == arguments.length) {
			playisTsMoving = !0;
			var d = $(".playprogress .progressbg", $player)
				.width(),
				d = b / (d - $(a)
					.width()),
				d = d.toFixed(2);
			$(".playprogress .progressbg .progressbg1", $player)
				.width(b);
			audio.currentTime = audio.duration * d
		} else {
			playisTsMoving = !1
		}
	}
});
$(".playprogress .progressbg", $player)
	.click(function (a) {
		$("#Lrc")
			.removeClass("show");
		$("#Ksc")
			.removeClass("showPlayer");
		playisTsMoving = !1;
		a = a.pageX - $(this)
			.offset()
			.left;
		var b = $(this)
			.width();
		a = (a / b)
			.toFixed(2);
		audio.currentTime = audio.duration * a
	});
$(".volumeprogress .progressbg", $player)
	.click(function (a) {
		a = ((100 - (a.pageY - $(this)
			.offset()
			.top - 6)) / 100)
			.toFixed(2);
		if (Number(a) > 1) {
			a = 1
		};
		if (Number(a) < 0) {
			a = 0
		};
		$(".volumeprogress .progressbg .ts", $player)
			.css("top", 100 * (1 - a) + "%");
		$(".volumeprogress .progressbg .progressbg1", $player)
			.height(100 * a);
		$.cookie("player_volume", a, {
			path: "/",
			expires: 30
		});
		audio.volume = a, volume = a;
		setTimeout(function () {
			Tips.show("音量：" + parseInt(a * 100))
		}, 500)
	});
$switchPlayer.click(function () {
	$player.toggleClass("show")
});
$switchplaylist.click(function () {
	$player.toggleClass("showAlbumList")
});
$(".switch-ksclrc")
	.click(function () {
		$("#Lrc")
			.toggleClass("hide");
		$("#Ksc")
			.toggleClass("hidePlayer");
		if (!$("#Lrc")
			.hasClass("hide") || !$("#Ksc")
				.hasClass("hidePlayer")) {
			ycgeci = true;
			Tips.show("开启歌词显示");
			$songFrom4.html("<i class=\"fa fa-toggle-on\" title=\"关闭歌词\"></i>")
		} else {
			ycgeci = false;
			Tips.show("歌词显示已关闭");
			$songFrom4.html("<i class=\"fa fa-toggle-off\" title=\"打开歌词\"></i>")
		};
	});
$(".pause", $player)
	.click(function () {
		$("li", $albumList)
			.eq(albumId)
			.addClass(cur)
			.find(".artist")
			.html("暂停播放 > ")
			.parent()
			.siblings()
			.removeClass(cur)
			.find(".artist")
			.html("")
			.parent();
		Tips.show(playerinfo.Sheetlist[albumId].songs[songId].name + " - 暂停播放");
		audio.pause();
		$.cookie("auto_playre", "no")
	});
$(".play", $player)
	.click(function () {
		$("li", $albumList)
			.eq(albumId)
			.addClass(cur)
			.find(".artist")
			.html("当前播放 > ")
			.parent()
			.siblings()
			.removeClass(cur)
			.find(".artist")
			.html("")
			.parent();
		startPlay();
		$.cookie("auto_playre", "yes")
	});
$(".prev", $player)
	.click(function () {
		if (pass) {
			hasgeci = true;
			Media.prev();
			$.cookie("auto_playre", "yes")
		}
	});
$(".next", $player)
	.click(function () {
		if (pass) {
			hasgeci = true;
			Media.next();
			$.cookie("auto_playre", "yes")
		}
	});
$(".aprev", $player)
	.click(function () {
		if (pass) {
			hasgeci = true;
			Media.aprev();
			$.cookie("auto_playre", "yes")
		}
	});
$(".anext", $player)
	.click(function () {
		if (pass) {
			hasgeci = true;
			Media.anext();
			$.cookie("auto_playre", "yes")
		}
	});
$(".qhms", $player)
	.click(function () {
		random ? (random = false, Tips.show("专辑循环"), $(this)
			.html("<i class = \"random fa fa-retweet\" title=\"专辑循环\"></i>")) : (loop ? (random = true, loop = false, Tips.show("随机播放"), $(this)
				.html("<i class = \"random fa fa-random\" title=\"随机播放\"></i>")) : (random = false, loop = true, Tips.show("单曲循环"), $(this)
					.html("<i class = \"random fa fa-refresh\" title=\"单曲循环\"></i>")));
	});
$(".random", $player)
	.click(function () {
		$(this)
			.addClass(cur);
		$(".loop", $player)
			.removeClass(cur);
		random = true;
		Tips.show("随机播放");
		$songFrom2.html("<i class=\"fa fa-random current\"></i> 随机播放");
		$.cookie("random_play", true)
	});
$(".loop", $player)
	.click(function () {
		$(this)
			.addClass(cur);
		$(".random", $player)
			.removeClass(cur);
		random = false;
		Tips.show("顺序播放");
		$songFrom2.html("<i class=\"fa fa-retweet\"></i> 顺序播放");
		$.cookie("random_play", false)
	});
var TipsTime = null;
var Media = {
	play: function () {
		$player.addClass("playing");
		$cover.addClass("coverplay");
		currentFrameId = GetCurrentFrame();
		cicleTime = setInterval(xpCicle, 800);
		if (hasLrc) {
			lrcTime = setInterval(Lrc.lrc.play, 500);
			$("#Lrc")
				.addClass("show");
			if (zdyc) {
				$(".switch-ksclrc")
					.show()
			}
		};
		if (hasKsc) {
			kscTime = setInterval(Lrc.ksc.play, 80);
			$("#Ksc")
				.addClass("showPlayer");
			if (zdyc) {
				$(".switch-ksclrc")
					.show()
			}
		}
	},
	pause: function () {
		clearInterval(cicleTime);
		$player.removeClass("playing");
		$cover.removeClass("coverplay");
		if (hasLrc) {
			$(".switch-ksclrc")
				.hide();
			Lrc.lrc.hide()
		};
		if (hasKsc) {
			$(".switch-ksclrc")
				.hide();
			Lrc.ksc.hide()
		}
	},
	error: function () {
		clearInterval(cicleTime);
		$player.removeClass("playing");
		$cover.removeClass("coverplay");
		if (errCount > 2) {
			Tips.show("连续播放失败超过3次，已停止播放");
			errCount = 0;
			errjc = true
		} else {
			errCount++;
			errjc = false;
			Tips.show(playerinfo.Sheetlist[albumId].songs[songId].name + " - 资源获取失败,尝试获取下一首...");
			consolelog('播放失败', errCount + '次');
			setTimeout(function () {
				$cover.removeClass("coverplay");
				$.cookie("player", "no", {
					path: "/",
					expires: -1
				});
				hasgeci = true;
				auto = "";
				Media.next()
			}, 1500)
		}
	},
	seeking: function () {
		if (audio.paused === true) {
			audio.play();
		};
		$player.addClass("playing");
		$cover.addClass("coverplay");
		Lrc.load();
		Tips.show("加载中...")
	},
	seeked: function () {
		currentFrameId = GetCurrentFrame()
	},
	volumechange: function () {
		var a = audio.volume;
		0 == a ? $(".player .musicbottom .volume", $player)
			.addClass("fa-volume-off")
			.removeClass("fa-volume-up fa-volume-down") : 0.5 > a ? $(".player .musicbottom .volume", $player)
				.addClass("fa-volume-down")
				.removeClass("fa-volume-up fa-volume-off") : $(".player .musicbottom .volume", $player)
					.addClass("fa-volume-up")
					.removeClass("fa-volume-off fa-volume-down")
	},
	getInfos: function (a, b) {
		currentFrameId = 0;
		songId = a;
		albumId = b;
		allmusic();
		musictype = playerinfo.Sheetlist[albumId].songs[songId].type;
		if ($.cookie("player_album") != b && $.cookie("player_song") != a) {
			$.cookie("xfwl", 0);
		}
		$.cookie("player_album", albumId, {
			path: "/",
			expires: 30
		});
		$.cookie("player_song", songId, {
			path: "/",
			expires: 30
		});
		netmusic();
	},
	next: function () {
		pass = false;
		songTotal = playerinfo.Sheetlist[albumId].songs.length;
		if (random) {
			rid = parseInt(Math.random() * songTotal);
			if (songTotal > 1) {
				if (rid != songId) {
					Media.getInfos(rid, albumId)
				} else {
					if (rid + 1 >= songTotal) {
						Media.getInfos(0, albumId)
					} else {
						Media.getInfos(rid + 1, albumId)
					}
				}
			} else {
				Media.getInfos(0, albumId)
			}
		} else {
			if (loop) {
				Media.getInfos(songId, albumId)
			} else {
				if (parseInt(songId) + 1 >= songTotal) {
					Media.getInfos(0, albumId)
				} else {
					Media.getInfos(parseInt(songId) + 1, albumId)
				}
			}
		};
		setTimeout(function () {
			pass = true
		}, 1500)
	},
	prev: function () {
		pass = false;
		songTotal = playerinfo.Sheetlist[albumId].songs.length;
		if (random) {
			rid = parseInt(Math.random() * songTotal);
			if (songTotal > 1) {
				if (rid != songId) {
					Media.getInfos(rid, albumId)
				} else {
					if (rid + 1 >= songTotal) {
						Media.getInfos(0, albumId)
					} else {
						Media.getInfos(rid + 1, albumId)
					}
				}
			} else {
				Media.getInfos(0, albumId)
			}
		} else {
			if (loop) {
				Media.getInfos(songId, albumId)
			} else {
				if (parseInt(songId) - 1 < 0) {
					Media.getInfos(songTotal - 1, albumId)
				} else {
					Media.getInfos(parseInt(songId) - 1, albumId)
				}
			}
		};
		setTimeout(function () {
			pass = true
		}, 1500)
	},
	anext: function () {
		pass = false;
		albumTotal = playerinfo.Sheetlist[albumId].songs.length;
		if (random || loop) {
			rid = parseInt(Math.random() * albumTotal);
			if (albumTotal > 1) {
				if (rid != albumId) {
					songTotals = playerinfo.Sheetlist[rid].songs.length;
					rids = parseInt(Math.random() * songTotals);
					Media.getInfos(rids - 1, rid)
				} else {
					if (rid + 1 >= albumTotal) {
						songTotals = playerinfo.Sheetlist[0].songs.length;
						rids = parseInt(Math.random() * songTotals);
						Media.getInfos(rids - 1, 0)
					} else {
						songTotals = playerinfo.Sheetlist[rid + 1].songs.length;
						rids = parseInt(Math.random() * songTotals);
						Media.getInfos(rids - 1, rid + 1)
					}
				}
			} else {
				songTotals = playerinfo.Sheetlist[0].songs.length;
				rids = parseInt(Math.random() * songTotals);
				Media.getInfos(rids, 0)
			}
		} else {
			if (albumTotal > 1) {
				if (parseInt(albumId) + 1 >= albumTotal) {
					Media.getInfos(0, 0)
				} else {
					Media.getInfos(0, parseInt(albumId) + 1)
				}
			} else {
				songTotals = playerinfo.Sheetlist[0].songs.length;
				rids = parseInt(Math.random() * songTotals);
				Media.getInfos(rids, 0)
			}
		};
		$player.removeClass("showSongList");
		setTimeout(function () {
			pass = true
		}, 1500)
	},
	aprev: function () {
		pass = false;
		albumTotal = playerinfo.Sheetlist[albumId].songs.length;
		if (random || loop) {
			rid = parseInt(Math.random() * albumTotal);
			if (albumTotal > 1) {
				if (rid != albumId) {
					songTotals = playerinfo.Sheetlist[rid].songs.length;
					rids = parseInt(Math.random() * songTotals);
					Media.getInfos(rids - 1, rid)
				} else {
					if (rid + 1 >= albumTotal) {
						songTotals = playerinfo.Sheetlist[0].songs.length;
						rids = parseInt(Math.random() * songTotals);
						Media.getInfos(rids - 1, 0)
					} else {
						songTotals = playerinfo.Sheetlist[rid + 1].songs.length;
						rids = parseInt(Math.random() * songTotals);
						Media.getInfos(rids - 1, rid + 1)
					}
				}
			} else {
				songTotals = playerinfo.Sheetlist[0].songs.length;
				rids = parseInt(Math.random() * songTotals);
				Media.getInfos(rids, 0)
			}
		} else {
			if (albumTotal > 1) {
				if (parseInt(albumId) - 1 < 0) {
					Media.getInfos(0, albumTotal - 1)
				} else {
					Media.getInfos(0, parseInt(albumId) - 1)
				}
			} else {
				songTotals = playerinfo.Sheetlist[0].songs.length;
				rids = parseInt(Math.random() * songTotals);
				Media.getInfos(rids, 0)
			}
		};
		$player.removeClass("showSongList");
		setTimeout(function () {
			pass = true
		}, 1500)
	},
	timeupdate: function () {
		if (audio.buffered.length) {
			if (!errjc) {
				errCount = 0;
				errjc = true
			};
			var a = 100 * audio.buffered.start(currentFrameId) / audio.duration,
				b = 100 * audio.buffered.end(currentFrameId) / audio.duration;
			$(".playprogress .progressbg .progressbg2", $player)
				.css({
					left: a + "%",
					width: b - a + "%"
				})
		};
		$.cookie("xfwl", audio.currentTime);
		playisTsMoving || ($(".playprogress .progressbg .ts", $player)
			.css("left", 100 * (audio.currentTime / audio.duration)
				.toFixed(2) + "%"), $(".playprogress .progressbg .progressbg1", $player)
					.css("width", 100 * (audio.currentTime / audio.duration)
						.toFixed(2) + "%"), $(".time", $player)
							.text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration)))
	}
};
var Tips = {
	show: function (a) {
		clearTimeout(TipsTime);
		$tips.text(a)
			.addClass("show");
		consolelog('Tips', a);
		this.hide()
	},
	hide: function () {
		TipsTime = setTimeout(function () {
			$tips.removeClass("show")
		}, 3000)
	}
};
audio.addEventListener("play", Media.play, false);
audio.addEventListener("pause", Media.pause, false);
audio.addEventListener("ended", Media.next, false);
audio.addEventListener("playing", Media.playing, false);
audio.addEventListener("volumechange", Media.volumechange, false);
audio.addEventListener("error", Media.error, false);
audio.addEventListener("seeking", Media.seeking, false);
audio.addEventListener("timeupdate", Media.timeupdate, !1);
$songName.html("<span title='正在加载'>正在加载...</span>");
$songAlbum.html("<span>音乐播放器</span>");
$artist.html("<span>小枫</span>");
$cover.html("<img src='https://player.xfyun.club/img/music-player-logo.svg'>");
playList = {
	creat: {
		album: function () {
			$(".musicheader", $albumList)
				.html(playerinfo.playerName + " - 歌单列表")
			var b = playerinfo.Sheetlist.length,
				albumList = "";
			for (var c = 0; c < b; c++) {
				albumList += "<li><i class=\"fa fa-angle-right\"></i><span class=\"index\">" + (c + 1) + "</span><span class=\"artist\"></span>《" + playerinfo['Sheetlist'][c].SheetName + "》 - " + playerinfo['Sheetlist'][c].author + "</li>"
			};
			$(".list", $albumList)
				.html("<ul>" + albumList + "</ul>")
				.mCustomScrollbar();
			$(".current", $albumList)
				.click(function () {
					$player.addClass("showSongList");
					$albumList.hide(500);
					$(".musicheader", $albumList)
						.hide();
				});
			$("li", $albumList)
				.click(function () {
					var a = $(this)
						.index();
					$(this)
						.hasClass(cur) ? playList.creat.song(a, true) : playList.creat.song(a, false);
					$player.addClass("showSongList");
					$albumList.hide(500);
					$(".musicheader", $albumList)
						.hide();
				});
			songTotal = playerinfo.Sheetlist[albumId].songs.length;
			$.cookie("player_song") ? Media.getInfos(playList.creat.getSongId($.cookie("player_song")), playList.creat.getalbumId($.cookie("player_album"))) : random ? Media.getInfos(window.parseInt(Math.random() * songTotal), albumId) : Media.getInfos(0, albumId)
		},
		getSongId: function (n) {
			return n >= songTotal ? 0 : n < 0 ? songTotal - 1 : n
		},
		getalbumId: function (n) {
			return n >= playerinfo.Sheetlist.length ? 0 : n < 0 ? playerinfo.Sheetlist.length - 1 : n
		},
		song: function (a, b) {
			songTotal = playerinfo.Sheetlist[a].songs.length;
			$(".song-list .musicheader span", $player)
				.text(playerinfo.Sheetlist[a].SheetName + "(" + songTotal + ")");
			var c = "";
			for (var i = 0; i < songTotal; i++) {
				c += "<li><span class=\"index\">" + (i + 1) + "</span><span class=\"artist\"></span>" + playerinfo.Sheetlist[a].songs[i]['name'] + " - " + playerinfo.Sheetlist[a].songs[i]['artist'] + "</li>"
			};
			$("span", $songList)
				.html("<ul>" + c + "</ul>")
				.mCustomScrollbar();
			$("[data-album=" + albumId + "]")
				.find("li")
				.eq(songId)
				.addClass(cur)
				.siblings()
				.removeClass(cur);
			$songList.attr("data-album", a);
			$songList.mCustomScrollbar("update");
			$(".song-list .musicheader", $player)
				.click(function () {
					$albumList.show(500);
					$(".musicheader", $albumList)
						.show(200);
				})
			$("li", $songList)
				.click(function () {
					hasgeci = true;
					albumId = a;
					if ($(this)
						.hasClass(cur)) {
						Tips.show("正在播放 - " + playerinfo.Sheetlist[albumId].songs[songId].name)
					} else {
						songId = $(this)
							.index();
						Tips.show("开始播放 - " + playerinfo.Sheetlist[albumId].songs[songId].name)
						Media.getInfos(songId, albumId)
					}
				})
		}
	}
};
var lrcTimeLine = [],
	tempNum1 = 0,
	tempNum2 = 0,
	kscLineNow1 = false,
	kscLineNow2 = false,
	lrcTimeEnable = !1,
	lrcOutTime = 0,
	kscTime = null,
	lrcTime = null;
var Lrc = {
	load: function () {
		var e = localStorage.getItem("XPLrcHeight");
		if (e == "null") {
			localStorage.setItem("XPLrcHeight", $("#XPLrc").height());
			lrcHeight = $("#Lrc").height()
		} else {
			if (e == 40) {
				lrcHeight = 40
			} else {
				if (e == 20) {
					lrcHeight = 20
				} else {
					lrcHeight = $("#Lrc").height()
				}
			}
		};
		Lrc.lrc.hide();
		Lrc.ksc.hide();
		hasLrc = false;
		hasKsc = false;
		$("#Lrc").html("");
		$("#Ksc").html("");
		setTimeout(function () {
			$(".switch-ksclrc").show();
			var b = localStorage.getItem("XPlrc");
			var c = localStorage.getItem("XPksc");
			if (c.indexOf(playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name) >= 0) {
				if (c.indexOf("karaoke") >= 0) {
					setTimeout(function () {
						Lrc.ksc.format(c.replace(playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name, ""))
					}, 500)
				} else {
					$(".switch-ksclrc").hide()
				}
			} else {
				if (b.indexOf(playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name) >= 0) {
					if (b.indexOf("[00") >= 0) {
						setTimeout(function () {
							Lrc.lrc.format(b.replace(playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name, ""))
						}, 500)
					} else {
						$(".switch-ksclrc").hide()
					}
				} else {
					if (playerinfo.Sheetlist[albumId].songs[songId].type == "local") {
						lrcurl = api + "/api/index/musicLyric?url=" + playerinfo.Sheetlist[albumId].songs[songId].lyric + "&type=" + playerinfo.Sheetlist[albumId].songs[songId].type + "&id=" + key
					} else {
						//if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|Nokia|Black Berry|MIDP|Phone)/i)) {
						//	var d = "&ksc=" + api + "/Static/404"
						//} else {
						var d = "&ksc=" + api + "/Static/xplayer/" + playerinfo.Sheetlist[albumId].songs[songId].name + ".txt";
						//};
						lrcurl = api + "/api/index/musicLyric?songId=" + playerinfo.Sheetlist[albumId].songs[songId].id + "&type=" + playerinfo.Sheetlist[albumId].songs[songId].type + "&id=" + key + d
					};
					$.ajax({
						url: lrcurl,
						type: "GET",
						cache: false,
						dataType: "jsonp",
						jsonp: "jsoncallback",
						success: function (a) {
							if (a.type == "ksc") {
								localStorage.setItem("ksc", playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name + a.txt);
								Lrc.ksc.format(a.txt)
							} else {
								if (a.type == "lrc") {
									if (a.txt == "null" || a.txt == "") {
										$(".switch-ksclrc").hide()
									} else {
										localStorage.setItem("lrc", playerinfo.Sheetlist[albumId].songs[songId].id + playerinfo.Sheetlist[albumId].songs[songId].name + a.txt);
										Lrc.lrc.format(a.txt)
									}
								} else {
									$(".switch-ksclrc").hide()
								}
							}
						},
						error: function () {
							$(".switch-ksclrc").hide()
						}
					})
				}
			}
		}, 50)
	},
	lrc: {
		format: function (b) {
			hasLrc = true;

			function formatTime(t) {
				var a = t.split(":"),
					min = +a[0],
					sec = +a[1].split(".")[0],
					ksec = +a[1].split(".")[1];
				return min * 60 + sec + Math.round(ksec / 1000)
			}
			var c = b.replace(/\[[A-Za-z]+:(.*?)]/g, "").split(/[\]\[]/g),
				lrcLine = "";
			lrcTimeLine = [];
			for (var i = 1; i < c.length; i += 2) {
				var d = formatTime(c[i]);
				lrcTimeLine.push(d);
				if (i == 1) {
					lrcLine += "<li class=\"Lrc" + d + " current\" style=\"color:rgba(" + b + ",1)\">" + c[i + 1] + "</li>"
				} else {
					lrcLine += "<li class=\"Lrc" + d + "\">" + c[i + 1] + "</li>"
				}
			};
			$("#Lrc").html("<ul>" + lrcLine + "</ul>");
			setTimeout(function () {
				if (audio.paused) {
					$(".switch-ksclrc").hide();
					$(".switch-down").css("right", "35px")
				} else {
					$("#Lrc").addClass("show")
				}
			}, 500);
			lrcTime = setInterval(Lrc.lrc.play, 500)
		},
		play: function () {
			var a = Math.round(audio.currentTime);
			if ($.inArray(a, lrcTimeLine) > 0) {
				var b = $(".Lrc" + a);
				if (!b.hasClass(cur)) {
					b.addClass(cur).siblings().removeClass(cur).removeAttr("style");
					$("#Lrc").animate({
						scrollTop: lrcHeight * b.index()
					})
				}
			} else {
				lrcCont = ""
			}
		},
		hide: function () {
			clearInterval(lrcTime);
			$("#Lrc").removeClass("show")
		}
	},
	ksc: {
		format: function (b) {
			gcdw = true;
			hasKsc = true;
			var c = [],
				kscEndTimeLine = [],
				kscCont = [],
				kscTimePer = [],
				kscMain = "",
				lineNow = 0,
				sex = "b";
			b.replace(/'(\d*):(\d*).(\d*)','(\d*):(\d*).(\d*)','(.*)',\s'(.*)'/g, function () {
				var a = arguments[1] | 0,
					startSec = arguments[2] | 0,
					startKsec = arguments[3] | 0,
					endMin = arguments[4] | 0,
					endSec = arguments[5] | 0,
					endKsec = arguments[6] | 0;
				c.push(a * 600 + startSec * 10 + Math.round(startKsec / 100));
				kscEndTimeLine.push(endMin * 600 + endSec * 10 + Math.round(endKsec / 100));
				kscCont.push(arguments[7]);
				kscTimePer.push(arguments[8])
			});
			for (var i = 0; i < c.length; i++) {
				var d = false;
				var e = new Array();
				var f = 0;
				var g = "",
					kscTextPerTime = kscTimePer[i].split(",");
				if (kscCont[i].indexOf("男：") >= 0) {
					sex = "m";
					kscCont[i] = kscCont[i].replace("男：", " ")
				};
				if (kscCont[i].indexOf("女：") >= 0) {
					sex = "g";
					kscCont[i] = kscCont[i].replace("女：", " ")
				};
				if (kscCont[i].indexOf("合：") >= 0) {
					sex = "t";
					kscCont[i] = kscCont[i].replace("合：", " ")
				};
				var h = kscCont[i].match(/(\w+)'+(\w+)|(\w+)|([^\w\s])|(^\s+)|(\s+$)|\s+/g);
				for (var j = 0; j < h.length; j++) {
					if (h[j] == " ") {
						var d = true;
						e[j] = "0";
						f++
					} else {
						if (d) {
							e[j] = kscTextPerTime[j - f]
						} else {
							e[j] = kscTextPerTime[j]
						}
					};
					if (kscCont[i][j] == "，") {
						g += "<span class=\"blank\"><em dir=\"" + e[j] + "\"></em></span>"
					} else {
						g += "<span><em dir=\"" + e[j] + "\">" + h[j] + "</em></span>"
					}
				};
				kscMain += "<div id=\"Ksc" + kscEndTimeLine[i] + "\" class=\"Ksc" + c[i] + " line line" + (i % 2 == 0 ? 1 : 2) + " " + sex + "\"><div class=\"bg\">" + g + "</div><div class=\"lighter\">" + g + "</div></div>"
			};
			$("#Ksc").html(kscMain);
			kscTime = setInterval(Lrc.ksc.play, 100)
		},
		play: function () {
			var a = Math.round(audio.currentTime * 10);
			if ($(".Ksc" + (a + 10)).length && !$(".Ksc" + (a + 10)).hasClass(cur)) {
				if (ycgeci == true) {
					gcdw = false
				};
				if (hasKsc) {
					$("#Ksc").addClass("showPlayer")
				};
				var b = $(".Ksc" + (a + 10));
				b.addClass(cur).css("color", "rgba(35, 183, 229 ,1)");
				b.hasClass("line1") ? b.siblings(".line1").removeClass(cur).removeAttr("style") : b.siblings(".line2").removeClass(cur).removeAttr("style");
				setTimeout(function () {
					if (b.hasClass("line1")) {
						Lrc.ksc.showLetters.line1(b);
						kscLineNow1 = true
					} else {
						Lrc.ksc.showLetters.line2(b);
						kscLineNow2 = true
					}
				}, 1000)
			} else {
				kscCont = ""
			};
			if ($("#Ksc" + (a - 30)).length) {
				$("#Ksc" + (a - 30)).removeClass(cur)
			}
		},
		showLetters: {
			line1: function (a) {
				var b = $(".lighter span", a),
					$spanNow = b.eq(tempNum1++),
					$em = $("em", $spanNow),
					spanT = +$em.attr("dir");
				$em.animate({
					width: "100%"
				}, spanT);
				if (tempNum1 < b.length) {
					letterTime1 = setTimeout(function () {
						Lrc.ksc.showLetters.line1(a)
					}, spanT)
				} else {
					tempNum1 = 0;
					kscLineNow1 = false
				}
			},
			line2: function (a) {
				var b = $(".lighter span", a),
					$spanNow = b.eq(tempNum2++),
					$em = $("em", $spanNow),
					spanT = +$em.attr("dir");
				$em.animate({
					width: "100%"
				}, spanT);
				if (tempNum2 < b.length) {
					letterTime2 = setTimeout(function () {
						Lrc.ksc.showLetters.line2(a)
					}, spanT)
				} else {
					tempNum2 = 0;
					kscLineNow2 = false
				}
			}
		},
		hide: function () {
			clearInterval(kscTime);
			$("#Ksc").removeClass("showPlayer")
		}
	}
};
$.ajax({
	url: api + "/api/index/playerinfo?id=" + key,
	type: "GET",
	cache: false,
	dataType: "jsonp",
	jsonp: "jsoncallback",
	success: function (data) {
		playerinfo = data;
		auth = 0;
		if (playerinfo.showColors == "0") {
			$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + api + "/Static/player9/css/player2.css\">");
		} else if (playerinfo.showColors == "1") {
			$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + api + "/Static/player9/css/player2.css\">");
		}
		//默认音量
		if (!isNaN(playerinfo.defaultVolume)) {
			if (playerinfo.defaultVolume >= "100") {
				vol = "1"
			} else {
				vol = "0." + playerinfo.defaultVolume
			}
		} else {
			vol = "0.5"
		};
		volume = $.cookie("player_volume") ? $.cookie("player_volume") : vol;
		if (100 * volume != "0") {
			$(".volumeprogress .progressbg .ts", $player)
				.css("top", 100 * (1 - volume) + "px")
		} else {
			$(".volumeprogress .progressbg .ts", $player)
				.css("top", "40px")
		};
		$(".volumeprogress .progressbg .progressbg1", $player)
			.height(100 * volume);
		0 == volume ? $(".player .musicbottom .volume", $player)
			.addClass("fa-volume-off")
			.removeClass("fa-volume-up fa-volume-down") : 0.5 > volume ? $(".player .musicbottom .volume", $player)
				.addClass("fa-volume-down")
				.removeClass("fa-volume-up fa-volume-off") : $(".player .musicbottom .volume", $player)
					.addClass("fa-volume-up")
					.removeClass("fa-volume-off fa-volume-down");
		audio.volume = volume;
		//自动展开
		if (playerinfo.switchopen == 1) {
			if (!isNaN(playerinfo.time)) {
				setTimeout(function () {
					$player.toggleClass("show")
				}, playerinfo.time * 1000)
			}
		};
		//播放模式
		if ($.cookie("random_play") != null) {
			if ($.cookie("random_play") == "true") {
				$(".qhms", $player)
					.html("<i class = \"random fa fa-random\" title=\"随机播放\"></i>");
				random = true
			} else {
				$(".qhms", $player)
					.html("<i class = \"random fa fa-retweet\" title=\"专辑循环\"></i>");
				random = false
			}
		} else {
			if (playerinfo.randomPlayer != 1) {
				random = false;
				$(".qhms", $player)
					.html("<i class = \"random fa fa-retweet\" title=\"专辑循环\"></i>");
			}
		};

		//飘动音符
		if (playerinfo.showNotes !== 1) {
			$(".status .note", $player).hide()
		};
		$(".status .note", $player).css({ color: "rgb(255, 255, 255)" })

		if (playerinfo.showLrc == 0) {
			$("#Lrc")
				.addClass("hide");
			$("#Ksc")
				.addClass("hidePlayer");
			ycgeci = false;
			Tips.show("歌词显示已关闭");
			$songFrom4.html("<i class=\"fa fa-toggle-off\" title=\"打开歌词\"></i>")
		};
		//欢迎语
		if (playerinfo.showGreeting == 1) {
			setTimeout(function (a) {
				Tips.show(playerinfo.greeting)
			}, 1000)
		} else {
			setTimeout(function (a) {
				Tips.show("欢迎语已关闭")
			}, 1000)
		};

		albumTotals = playerinfo.Sheetlist.length;
		if (typeof xplayeralbum === "undefined") {
			albumIds = $.cookie("player_album") ? $.cookie("player_album") : playerinfo.defaultAlbum - 1;
			songId = $.cookie("player_song") ? $.cookie("player_song") : 0;
			if (albumIds >= albumTotals) {
				albumId = 0
			} else {
				albumId = $.cookie("player_album") ? $.cookie("player_album") : playerinfo.defaultAlbum - 1
			}
		} else {
			if (typeof xplayersong === "undefined") {
				if (xplayeralbum >= albumTotals) {
					albumId = 0;
					xplayerMedia.getInfos(0, 0)
				} else {
					albumId = xplayeralbum;
					xplayerMedia.getInfos(0, xplayeralbum - 1)
				}
			} else {
				if (xplayeralbum >= albumTotals) {
					albumId = 0;
					xplayerMedia.getInfos(xplayersong - 1, 0)
				} else {
					albumId = xplayeralbum;
					xplayerMedia.getInfos(xplayersong - 1, xplayeralbum - 1)
				}
			}
		};
		Media.getInfos(songId, albumId),
			setTimeout(function (a) {
				playList.creat.album()
			}, 500);
	},
	error: function () {
		$songName.html("<span title='获取失败'>获取失败咯~!</span>");
		$songAlbum.html("<span>音乐播放器</span>");
		$artist.html("<span>XPlayer</span>");
		Tips.show("歌曲列表获取失败")
	}
});

function netmusic() {
	Lrc.load();
	if (playerinfo.Sheetlist[albumId].songs[songId].type == "local") {
		audio.src = playerinfo.Sheetlist[albumId].songs[songId].url
	} else {
		audio.src = api + "/api/index/musicUrl?songId=" + playerinfo.Sheetlist[albumId].songs[songId].id + "&type=" + playerinfo.Sheetlist[albumId].songs[songId].type + "&id=" + key
	};
	$songName.html("<span title=\"" + playerinfo.Sheetlist[albumId].songs[songId].name + "\">" + LimitStr(playerinfo.Sheetlist[albumId].songs[songId].name) + "</span>");
	$artist.html("<span title=\"" + playerinfo.Sheetlist[albumId].songs[songId].artist + "\">" + LimitStr(playerinfo.Sheetlist[albumId].songs[songId].artist) + "</span>");
	$songAlbum.html("<span title=\"" + playerinfo.Sheetlist[albumId].songs[songId].album + "\">" + LimitStr(playerinfo.Sheetlist[albumId].songs[songId].album) + "</span>");
	var d = new Image();
	d.src = playerinfo.Sheetlist[albumId].songs[songId].cover;
	$cover.addClass("changing");
	d.onload = function () {
		$cover.removeClass("changing");
		$.ajax({
			url: api + "/api/index/mainColor",
			type: "GET",
			dataType: "script",
			data: {
				url: d.src,
				id: key
			},
			success: function () {
				playerColor()
			},
			error: function () {
				var a = "0,0,0";
				playerColor()
			}
		})
	};
	d.onerror = function () {
		d.src = "https://player.xfyun.club/img/music-player-logo.svg";
		$(".cover", $player)
			.html("<img src='" + d.src + "'>");
		setTimeout(function () {
			Tips.show("专辑图片获取失败")
		}, 4000)
	};
	$(".cover", $player)
		.html("<img src='" + d.src + "'>");
	if (first == 1) {
		first = 2;
		if (playerinfo.autoPlayer == 1 && ($.cookie("auto_playre") == null || $.cookie("auto_playre") === "yes")) {
			startPlay()
		} else {
			Tips.show("播放器自动暂停");
			audio.pause()
		}
	} else {
		startPlay()
	};
	$(window)
		.scroll(function () {
			var a = $(this)
				.scrollTop();
			var b = $(window.document)
				.height();
			var c = $(this)
				.height();
			if (a + c == b) {
				zdyc = false;
				if (hasgeci && ycgeci) {
					$songFrom4.hide();
					$("#Lrc")
						.addClass("hide");
					$("#Ksc")
						.addClass("hidePlayer");
					if (hasLrc || hasKsc) {
						Tips.show("歌词自动隐藏")
					}
				}
			} else {
				zdyc = true;
				if (hasgeci && ycgeci) {
					if (hasLrc || hasKsc) {
						$songFrom4.show()
					};
					$("#Lrc")
						.removeClass("hide");
					$("#Ksc")
						.removeClass("hidePlayer")
				}
			}
		});
}

function startPlay() {
	var a = audio.play();
	if (a) {
		a.then(() => {
			var t = audio.duration;
			$cover.addClass("coverplay");
			Tips.show("开始播放 - " + playerinfo.Sheetlist[albumId].songs[songId].name);
			if (playerinfo.showMsg === 1) {
				showMsgNotification(playerinfo.Sheetlist[albumId].songs[songId].name, playerinfo.Sheetlist[albumId].songs[songId].artist + " - " + playerinfo.Sheetlist[albumId].songs[songId].album, playerinfo.Sheetlist[albumId].songs[songId].cover)
			};
			consolelog("当前播放", playerinfo.Sheetlist[albumId].songs[songId].name + " - " + playerinfo.Sheetlist[albumId].songs[songId].artist + " 时长：" + Math.floor(t / 60) + ":" + (t % 60 / 100)
				.toFixed(2)
				.slice(-2));
		})
			.catch((e) => {
				consolelog("自动播放", "浏览器限制音频，请手动点击播放，下次无需点击")
			})
	}
}

function allmusic() {
	$("li", $albumList)
		.eq(albumId)
		.addClass(cur)
		.find(".artist")
		.html("当前播放&nbsp;>&nbsp;")
		.parent()
		.siblings()
		.removeClass(cur)
		.find(".artist")
		.html("")
		.parent();
	if (!$("ul", $songList)
		.html() == "" && $("[data-album=" + albumId + "]")
			.length) {
		$("[data-album=" + albumId + "]")
			.find("li")
			.eq(songId)
			.addClass(cur)
			.siblings()
			.removeClass(cur);
	}
}

function GetCurrentFrame() {
	var a = audio.buffered.length;
	if (1 == a) {
		return 0
	};
	for (var b = $(".playprogress .progressbg", $player)
		.width(), b = parseInt($(".playprogress .progressbg .ts", $player)
			.css("left")) / b * audio.duration, c = 0; c < a; c++) {
		if (b >= audio.buffered.start(c) && b <= audio.buffered.end(c)) {
			return c
		}
	};
	return 0
}

function playerColor() {

}

function xpCicle() {
	$songTime.attr("title", "" + formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration) + "");
}

function formatSecond(t) {
	return ("00" + Math.floor(t / 60))
		.substr(-2) + ":" + ("00" + Math.floor(t % 60))
			.substr(-2)
}

function LimitStr(a, b, t) {
	b = b || 6;
	t = t || "...";
	var c = "";
	var d = a.length;
	var h = 0;
	for (var i = 0; h < b * 2 && i < d; i++) {
		h += a.charCodeAt(i) > 128 ? 2 : 1;
		c += a.charAt(i)
	};
	if (i < d) {
		c += t
	};
	return c
}
$(document)
	.ready(function () {
		$(window)
			.keydown(function (a) {
				var b = a.keyCode;
				if (b == 192) {
					auto = "";
					if (audio.paused) {
						$(".play", $player)
							.click()
					} else {
						$(".pause", $player)
							.click()
					}
				}
			})
		audio.currentTime = parseFloat($.cookie("xfwl"));
	})

function consolelog(title, con) {
	console.log('\n' + ' %c ' + title + ' %c ' + con + ' ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
}