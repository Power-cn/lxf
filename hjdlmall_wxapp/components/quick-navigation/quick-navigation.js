module.exports = {
    init: function(t) {
        var e = this;
        e.currentPage = t, e.setNavi(), void 0 === t.cutover && (t.cutover = function(t) {
            e.cutover(t);
        }), void 0 === t.to_dial && (t.to_dial = function(t) {
            e.to_dial(t);
        }), void 0 === t.map_goto && (t.map_goto = function(t) {
            e.map_goto(t);
        }), void 0 === t.map_power && (t.map_power = function(t) {
            e.map_power(t);
        });
    },
    setNavi: function() {
        var t = this.currentPage;
        -1 != [ "pages/index/index", "pages/book/details/details", "pages/pt/details/details", "pages/goods/goods" ].indexOf(this.getCurrentPageUrl()) && t.setData({
            home_icon: !0
        }), getApp().getConfig(function(e) {
            var o = e.store.quick_navigation;
            o.home_img || (o.home_img = "/images/quick-home.png"), t.setData({
                setnavi: o
            });
        });
    },
    getCurrentPageUrl: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    to_dial: function() {
        getApp().getConfig(function(t) {
            var e = t.store.contact_tel;
            console.log(e), getApp().core.makePhoneCall({
                phoneNumber: e
            });
        });
    },
    map_power: function() {
        var t = this.currentPage;
        getApp().getConfig(function(e) {
            var o = e.store.option.quick_map;
            void 0 !== o ? t.map_goto(o) : getApp().core.getSetting({
                success: function(e) {
                    e.authSetting["scope.userLocation"] ? t.map_goto(o) : getApp().getauth({
                        content: "需要获取您的地理位置授权，请到小程序设置中打开授权！",
                        cancel: !1,
                        success: function(e) {
                            e.authSetting["scope.userLocation"] && t.map_goto(o);
                        }
                    });
                }
            });
        });
    },
    map_goto: function(t) {
        this.currentPage;
        var e = t.lal.split(",");
        getApp().core.openLocation({
            latitude: parseFloat(e[0]),
            longitude: parseFloat(e[1]),
            address: t.address
        });
    },
    cutover: function() {
        var t = this.currentPage;
        t.setData({
            quick_icon: !t.data.quick_icon
        });
        var e = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        }), o = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        }), i = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        }), a = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        }), n = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        }), p = getApp().core.createAnimation({
            duration: 350,
            timingFunction: "ease-out"
        });
        getApp().getConfig(function(c) {
            var r = t.data.store, s = -55;
            t.data.quick_icon ? (r.option && r.option.wxapp && r.option.wxapp.pic_url && (n.translateY(s).opacity(1).step(), 
            s -= 55), r.show_customer_service && 1 == r.show_customer_service && r.service && (a.translateY(s).opacity(1).step(), 
            s -= 55), r.option && r.option.web_service && (i.translateY(s).opacity(1).step(), 
            s -= 55), 1 == r.dial && r.dial_pic && (o.translateY(s).opacity(1).step(), s -= 55), 
            r.option && 1 == r.option.quick_map.status && (p.translateY(s).opacity(1).step(), 
            s -= 55), e.translateY(s).opacity(1).step()) : (e.opacity(0).step(), i.opacity(0).step(), 
            o.opacity(0).step(), a.opacity(0).step(), n.opacity(0).step(), p.opacity(0).step()), 
            t.setData({
                animationPlus: e.export(),
                animationcollect: i.export(),
                animationPic: o.export(),
                animationTranspond: a.export(),
                animationInput: n.export(),
                animationMapPlus: p.export()
            });
        });
    }
};