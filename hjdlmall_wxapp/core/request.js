module.exports = function(a) {
    a.data || (a.data = {});
    var e = this.core, t = this.core.getStorageSync(this.const.ACCESS_TOKEN);
    t && (a.data.access_token = t), a.data._version = this._version, a.data._platform = this.platform, 
    !this.is_login && this.page.currentPage && (this.is_login = !0, this.login({}));
    var o = this;
    e.request({
        url: a.url,
        header: a.header || {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: a.data || {},
        method: a.method || "GET",
        dataType: a.dataType || "json",
        success: function(t) {
            -1 == t.data.code ? (o.core.hideLoading(), o.page.setUserInfoShow(), o.is_login = !1) : -2 == t.data.code ? e.redirectTo({
                url: "/pages/store-disabled/store-disabled"
            }) : a.success && a.success(t.data);
        },
        fail: function(t) {
            console.warn("--- request fail >>>"), console.warn("--- " + a.url + " ---"), console.warn(t), 
            console.warn("<<< request fail ---");
            var o = getApp();
            o.is_on_launch ? (o.is_on_launch = !1, e.showModal({
                title: "网络请求出错",
                content: t.errMsg || "",
                showCancel: !1,
                success: function(e) {
                    e.confirm && a.fail && a.fail(e);
                }
            })) : (e.showToast({
                title: t.errMsg,
                image: "/images/icon-warning.png"
            }), a.fail && a.fail(t));
        },
        complete: function(t) {
            if (200 != t.statusCode && t.data.code && 500 == t.data.code) {
                var o = t.data.data.message;
                e.showModal({
                    title: "系统错误",
                    content: o + ";\r\n请将错误内容复制发送给我们，以便进行问题追踪。",
                    cancelText: "关闭",
                    confirmText: "复制",
                    success: function(o) {
                        o.confirm && e.setClipboardData({
                            data: JSON.stringify({
                                data: t.data.data,
                                object: a
                            })
                        });
                    }
                });
            }
            a.complete && a.complete(t);
        }
    });
};