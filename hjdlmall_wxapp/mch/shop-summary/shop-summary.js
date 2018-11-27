Page({
    data: {
        markers: []
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t), t.mch_id && (this.setData({
            mch_id: t.mch_id
        }), this.getShopData());
    },
    onShow: function() {
        getApp().page.onShow(this);
    },
    getShopData: function() {
        var t = this;
        getApp().core.showLoading({
            title: "加载中"
        }), getApp().request({
            url: getApp().api.mch.shop,
            data: {
                mch_id: t.data.mch_id,
                tab: 0,
                cat_id: 0
            },
            success: function(e) {
                if (0 == e.code) {
                    var a = e.data.shop, o = [ {
                        iconPath: "/mch/images/img-map.png",
                        id: 0,
                        width: 20,
                        height: 43,
                        longitude: a.longitude,
                        latitude: a.latitude
                    } ];
                    t.setData({
                        markers: o,
                        shop: e.data.shop
                    });
                }
            },
            complete: function() {
                getApp().core.hideLoading(), t.setData({
                    loading: !1
                });
            }
        });
    },
    callPhone: function(t) {
        getApp().core.makePhoneCall({
            phoneNumber: t.target.dataset.info
        });
    },
    map_power: function() {
        var t = this;
        getApp().getConfig(function(e) {
            var a = t.data.shop;
            void 0 !== a ? t.map_goto(a) : getApp().core.getSetting({
                success: function(e) {
                    e.authSetting["scope.userLocation"] ? t.map_goto(a) : getApp().getauth({
                        content: "需要获取您的地理位置授权，请到小程序设置中打开授权！",
                        cancel: !1,
                        success: function(e) {
                            e.authSetting["scope.userLocation"] && t.map_goto(a);
                        }
                    });
                }
            });
        });
    },
    map_goto: function(t) {
        getApp().core.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            address: t.address
        });
    }
});