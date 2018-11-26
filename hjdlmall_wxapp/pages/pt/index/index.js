var a = require("../../../components/quick-navigation/quick-navigation.js");

Page({
    data: {
        cid: 0,
        scrollLeft: 600,
        scrollTop: 0,
        emptyGoods: 0,
        page_count: 0,
        pt_url: !1,
        page: 1,
        is_show: 0
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t), this.systemInfo = getApp().core.getSystemInfoSync();
        var e = getApp().core.getStorageSync(getApp().const.STORE);
        this.setData({
            store: e
        }), a.init(this);
        var o = this;
        if (t.cid) {
            t.cid;
            return this.setData({
                pt_url: !1
            }), getApp().core.showLoading({
                title: "正在加载",
                mask: !0
            }), void getApp().request({
                url: getApp().api.group.index,
                method: "get",
                success: function(a) {
                    if (o.switchNav({
                        currentTarget: {
                            dataset: {
                                id: t.cid
                            }
                        }
                    }), 0 == a.code) {
                        var e = {
                            data: {
                                pic_list: a.data.ad
                            }
                        };
                        o.setData({
                            banner: a.data.banner,
                            ad: a.data.ad,
                            page: a.data.goods.page,
                            page_count: a.data.goods.page_count,
                            block: e
                        });
                    }
                }
            });
        }
        this.setData({
            pt_url: !0
        }), this.loadIndexInfo(this);
    },
    onReady: function(a) {
        getApp().page.onReady(this);
    },
    onShow: function(a) {
        getApp().page.onShow(this);
    },
    onHide: function(a) {
        getApp().page.onHide(this);
    },
    onUnload: function(a) {
        getApp().page.onUnload(this);
    },
    onPullDownRefresh: function(a) {
        getApp().page.onPullDownRefresh(this);
    },
    onReachBottom: function(a) {
        getApp().page.onReachBottom(this);
        var t = this;
        t.setData({
            show_loading_bar: 1
        }), t.data.page < t.data.page_count ? (t.setData({
            page: t.data.page + 1
        }), t.getGoods(t)) : t.setData({
            is_show: 1,
            emptyGoods: 1,
            show_loading_bar: 0
        });
    },
    loadIndexInfo: function(a) {
        var t = a;
        getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.group.index,
            method: "get",
            data: {
                page: t.data.page
            },
            success: function(a) {
                if (0 == a.code) {
                    getApp().core.hideLoading();
                    var e = {
                        data: {
                            pic_list: a.data.ad
                        }
                    };
                    t.setData({
                        cat: a.data.cat,
                        banner: a.data.banner,
                        ad: a.data.ad,
                        goods: a.data.goods.list,
                        page: a.data.goods.page,
                        page_count: a.data.goods.page_count,
                        block: e
                    }), a.data.goods.row_count <= 0 && t.setData({
                        emptyGoods: 1
                    });
                }
            }
        });
    },
    getGoods: function(a) {
        var t = a;
        getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.group.list,
            method: "get",
            data: {
                page: t.data.page,
                cid: t.data.cid
            },
            success: function(a) {
                0 == a.code && (getApp().core.hideLoading(), t.data.goods = t.data.goods.concat(a.data.list), 
                t.setData({
                    goods: t.data.goods,
                    page: a.data.page,
                    page_count: a.data.page_count,
                    show_loading_bar: 0
                }));
            }
        });
    },
    switchNav: function(a) {
        var t = this;
        getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        });
        var e = a.currentTarget.dataset.id;
        if (t.setData({
            cid: e
        }), "undefined" == typeof my) {
            var o = this.systemInfo.windowWidth, d = a.currentTarget.offsetLeft, p = this.data.scrollLeft;
            p = d > o / 2 ? d : 0, t.setData({
                scrollLeft: p
            });
        } else {
            for (var n = t.data.cat, s = !0, i = 0; i < n.length; ++i) if (n[i].id === a.currentTarget.id) {
                s = !1, i >= 1 ? t.setData({
                    toView: n[i - 1].id
                }) : t.setData({
                    toView: "0"
                });
                break;
            }
            s && t.setData({
                toView: "0"
            });
        }
        t.setData({
            cid: e,
            page: 1,
            scrollTop: 0,
            emptyGoods: 0,
            goods: [],
            show_loading_bar: 1,
            is_show: 0
        }), getApp().request({
            url: getApp().api.group.list,
            method: "get",
            data: {
                cid: e
            },
            success: function(a) {
                if (getApp().core.hideLoading(), 0 == a.code) {
                    var e = a.data.list;
                    a.data.page_count >= a.data.page ? t.setData({
                        goods: e,
                        page: a.data.page,
                        page_count: a.data.page_count,
                        row_count: a.data.row_count,
                        show_loading_bar: 0
                    }) : t.setData({
                        emptyGoods: 1
                    });
                }
            }
        });
    },
    pullDownLoading: function(a) {
        var t = this;
        if (1 != t.data.emptyGoods && 1 != t.data.show_loading_bar) {
            t.setData({
                show_loading_bar: 1
            });
            var e = parseInt(t.data.page + 1), o = t.data.cid;
            getApp().request({
                url: getApp().api.group.list,
                method: "get",
                data: {
                    page: e,
                    cid: o
                },
                success: function(a) {
                    if (0 == a.code) {
                        var e = t.data.goods;
                        a.data.page > t.data.page && Array.prototype.push.apply(e, a.data.list), a.data.page_count >= a.data.page ? t.setData({
                            goods: e,
                            page: a.data.page,
                            page_count: a.data.page_count,
                            row_count: a.data.row_count,
                            show_loading_bar: 0
                        }) : t.setData({
                            emptyGoods: 1
                        });
                    }
                }
            });
        }
    },
    navigatorClick: function(a) {
        var t = a.currentTarget.dataset.open_type, e = a.currentTarget.dataset.url;
        return "wxapp" != t || (e = function(a) {
            var t = /([^&=]+)=([\w\W]*?)(&|$|#)/g, e = /^[^\?]+\?([\w\W]+)$/.exec(a), o = {};
            if (e && e[1]) for (var d, p = e[1]; null != (d = t.exec(p)); ) o[d[1]] = d[2];
            return o;
        }(e), e.path = e.path ? decodeURIComponent(e.path) : "", getApp().core.navigateToMiniProgram({
            appId: e.appId,
            path: e.path,
            complete: function(a) {}
        }), !1);
    },
    to_dial: function() {
        var a = this.data.store.contact_tel;
        getApp().core.makePhoneCall({
            phoneNumber: a
        });
    }
});