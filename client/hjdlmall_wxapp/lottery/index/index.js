var t = !1, a = !0, o = require("../../components/quick-navigation/quick-navigation.js");

Page({
    data: {
        p: 1,
        naver: "index"
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t), o.init(this);
    },
    onShow: function() {
        getApp().page.onShow(this), getApp().core.showLoading({
            title: "加载中"
        });
        var t = this;
        getApp().request({
            url: getApp().api.lottery.index,
            success: function(o) {
                0 == o.code && (t.setData(o.data), null != o.data.goods_list && o.data.goods_list.length > 0 && (a = !1));
            },
            complete: function(t) {
                getApp().core.hideLoading();
            }
        });
    },
    submit: function(t) {
        var a = t.detail.formId, o = t.currentTarget.dataset.lottery_id;
        getApp().core.navigateTo({
            url: "/lottery/detail/detail?lottery_id=" + o + "&form_id=" + a
        });
    },
    onReachBottom: function() {
        a || this.loadData();
    },
    loadData: function() {
        if (!t) {
            t = !0, getApp().core.showLoading({
                title: "加载中"
            });
            var o = this, e = o.data.p + 1;
            getApp().request({
                url: getApp().api.lottery.index,
                data: {
                    page: e
                },
                success: function(t) {
                    if (0 == t.code) {
                        var i = o.data.goods_list, s = o.data.list;
                        if (null == t.data.goods_list || 0 == t.data.goods_list.length) return void (a = !0);
                        s.num = s.num.concat(t.data.list.num), s.status = s.status.concat(t.data.list.status), 
                        i = i.concat(t.data.goods_list), o.setData({
                            goods_list: i,
                            list: s,
                            p: e
                        });
                    } else o.showToast({
                        title: t.msg
                    });
                },
                complete: function(a) {
                    getApp().core.hideLoading(), t = !1;
                }
            });
        }
    }
});