getApp(), getApp().api;

Page({
    data: {
        cash_val: ""
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t);
        var a = this, e = getApp().core.getStorageSync("mch_account_data");
        e && a.setData(e), getApp().core.showNavigationBarLoading(), getApp().request({
            url: getApp().api.mch.user.account,
            success: function(t) {
                getApp().core.hideNavigationBarLoading(), 0 == t.code ? (a.setData(t.data), getApp().core.setStorageSync("mch_account_data", t.data)) : getApp().core.showModal({
                    title: "提示",
                    content: t.msg,
                    success: function() {}
                });
            },
            complete: function() {
                getApp().core.hideNavigationBarLoading();
            }
        });
    },
    onReady: function() {
        getApp().page.onReady(this);
    },
    onShow: function() {
        getApp().page.onShow(this);
    },
    onHide: function() {
        getApp().page.onHide(this);
    },
    onUnload: function() {
        getApp().page.onUnload(this);
    },
    showDesc: function() {
        var t = this;
        getApp().core.showModal({
            title: "交易手续费说明",
            content: t.data.desc,
            showCancel: !1
        });
    },
    showCash: function() {
        return void getApp().core.navigateTo({
            url: "/mch/m/cash/cash"
        });
    },
    hideCash: function() {
        this.setData({
            show_cash: !1
        });
    },
    cashInput: function(t) {
        var a = this, e = t.detail.value;
        e = parseFloat(e), isNaN(e) && (e = 0), e = e.toFixed(2), a.setData({
            cash_val: e || ""
        });
    },
    cashSubmit: function(t) {
        var a = this;
        a.data.cash_val ? a.data.cash_val <= 0 ? a.showToast({
            title: "请输入提现金额。"
        }) : (getApp().core.showLoading({
            title: "正在提交",
            mask: !0
        }), getApp().request({
            url: getApp().api.mch.user.cash,
            method: "POST",
            data: {
                cash_val: a.data.cash_val
            },
            success: function(t) {
                getApp().core.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function() {
                        0 == t.code && getApp().core.redirectTo({
                            url: "/mch/m/account/account"
                        });
                    }
                });
            },
            complete: function(t) {
                getApp().core.hideLoading();
            }
        })) : a.showToast({
            title: "请输入提现金额。"
        });
    }
});