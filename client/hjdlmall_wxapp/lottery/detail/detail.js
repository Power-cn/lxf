Page({
    data: {
        page_num: 1,
        is_loading: !1
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t);
        var i = this;
        getApp().core.showLoading({
            title: "加载中"
        }), getApp().request({
            url: getApp().api.lottery.detail,
            data: {
                id: t.id ? t.id : 0,
                lottery_id: t.lottery_id ? t.lottery_id : 0,
                form_id: t.form_id,
                page_num: 1
            },
            success: function(t) {
                0 == t.code && i.setData(t.data);
            },
            complete: function(t) {
                getApp().core.hideLoading();
            }
        });
    },
    onShow: function() {
        getApp().page.onShow(this);
    },
    submit: function(t) {
        var i = this.data.list.goods_id, e = JSON.parse(this.data.list.attr);
        getApp().core.navigateTo({
            url: "/pages/order-submit/order-submit?lottery_id=" + this.data.list.id + "&goods_info=" + JSON.stringify({
                goods_id: i,
                attr: e,
                num: 1
            })
        });
    },
    userload: function() {
        if (!this.data.is_loading) {
            this.data;
            var t = this, i = this.data.page_num + 1;
            getApp().core.showLoading({
                title: "加载中"
            }), getApp().request({
                url: getApp().api.lottery.detail,
                data: {
                    id: this.data.list.id,
                    page_num: i
                },
                success: function(e) {
                    if (0 == e.code) {
                        if (null == e.data.user_list || 0 == e.data.user_list) return void t.setData({
                            is_loading: !0
                        });
                        t.setData({
                            user_list: t.data.user_list.concat(e.data.user_list),
                            page_num: i
                        });
                    }
                },
                complete: function(t) {
                    getApp().core.hideLoading();
                }
            });
        }
    },
    onShareAppMessage: function() {
        getApp().page.onShareAppMessage(this);
        var t = getApp().getUser(), i = this.data.list.lottery_id;
        return {
            path: "/lottery/goods/goods?user_id=" + t.id + "&id=" + i,
            title: "抽奖"
        };
    }
});