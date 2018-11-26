Page({
    data: {
        invite_list: [],
        info: [],
        page: 2,
        loading: !1
    },
    onLoad: function(t) {
        var n = this;
        getApp().request({
            url: getApp().api.step.invite_detail,
            data: {
                page: 1
            },
            success: function(t) {
                var i = t.data.info, a = t.data.invite_list;
                n.setData({
                    info: i,
                    invite_list: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var a = this, n = a.data.over, e = a.data.invite_list;
        if (!n) {
            var o = this.data.page;
            this.setData({
                loading: !0
            }), getApp().request({
                url: getApp().api.step.invite_detail,
                data: {
                    page: o
                },
                success: function(t) {
                    for (var i = 0; i < t.data.invite_list.length; i++) e.push(t.data.invite_list[i]);
                    t.data.invite_list.length < 10 && (n = !0), a.setData({
                        page: o + 1,
                        over: n,
                        loading: !1,
                        invite_list: e
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {}
});