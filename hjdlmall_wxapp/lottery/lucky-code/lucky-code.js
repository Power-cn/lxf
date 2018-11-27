var t = !1;

Page({
    data: {
        page: 1,
        num: 0
    },
    onLoad: function(t) {
        if (getApp().page.onLoad(this, t), t) {
            var a = this;
            a.setData(t), getApp().core.showLoading({
                title: "加载中"
            }), getApp().request({
                url: getApp().api.lottery.lucky_code,
                data: {
                    id: t.id
                },
                success: function(t) {
                    if (0 == t.code) {
                        a.setData(t.data);
                        var e = t.data;
                        if (e.award && e.award.lucky_code == t.data.own.lucky_code) n = t.data.parent.length; else var n = t.data.parent.length + 1;
                        a.setData({
                            num: n
                        });
                    }
                },
                complete: function(t) {
                    getApp().core.hideLoading();
                }
            });
        }
    },
    onShow: function() {
        getApp().page.onShow(this);
    },
    userload: function() {
        if (!t) {
            t = !0, getApp().core.showLoading({
                title: "加载中"
            });
            var a = this, e = a.data.page + 1;
            getApp().request({
                url: getApp().api.lottery.lucky_code,
                data: {
                    id: a.data.id,
                    page: e
                },
                success: function(n) {
                    if (0 == n.code) {
                        if (null == n.data.parent || 0 == n.data.parent.length) return void (t = !0);
                        a.setData({
                            parent: a.data.parent.concat(n.data.parent),
                            page: e,
                            num: n.data.parent.length + 1
                        });
                    } else a.showToast({
                        title: n.msg
                    });
                },
                complete: function() {
                    getApp().core.hideLoading(), this.data.is_loading = !1;
                }
            });
        }
    }
});