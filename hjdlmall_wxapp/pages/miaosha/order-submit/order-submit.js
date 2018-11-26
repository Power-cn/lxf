var t = "", e = "", a = require("../../../utils/helper.js");

Page({
    data: {
        total_price: 0,
        address: null,
        express_price: 0,
        content: "",
        offline: 0,
        express_price_1: 0,
        name: "",
        mobile: "",
        integral_radio: 1,
        new_total_price: 0,
        show_card: !1,
        payment: -1,
        show_payment: !1
    },
    onLoad: function(t) {
        getApp().page.onLoad(this, t);
        var e = this, i = a.formatData(new Date());
        getApp().core.removeStorageSync(getApp().const.INPUT_DATA), e.setData({
            options: t,
            time: i
        });
    },
    bindkeyinput: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    KeyName: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    KeyMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    getOffline: function(t) {
        var e = this, a = this.data.express_price, i = this.data.express_price_1;
        1 == t.target.dataset.index ? this.setData({
            offline: 1,
            express_price: 0,
            express_price_1: a
        }) : this.setData({
            offline: 0,
            express_price: i
        }), e.getPrice();
    },
    dingwei: function() {
        var a = this;
        getApp().core.chooseLocation({
            success: function(i) {
                t = i.longitude, e = i.latitude, a.setData({
                    location: i.address
                });
            },
            fail: function(t) {
                getApp().getauth({
                    content: "需要获取您的地理位置授权，请到小程序设置中打开授权",
                    success: function(t) {
                        t && (t.authSetting["scope.userLocation"] ? a.dingwei() : getApp().core.showToast({
                            title: "您取消了授权",
                            image: "/images/icon-warning.png"
                        }));
                    }
                });
            }
        });
    },
    orderSubmit: function(t) {
        var e = this, a = e.data.offline, i = {};
        if (0 == a) {
            if (!e.data.address || !e.data.address.id) return void getApp().core.showToast({
                title: "请选择收货地址",
                image: "/images/icon-warning.png"
            });
            i.address_id = e.data.address.id;
        } else {
            if (i.address_name = e.data.name, i.address_mobile = e.data.mobile, !e.data.shop.id) return void getApp().core.showModal({
                title: "警告",
                content: "请选择门店",
                showCancel: !1
            });
            if (i.shop_id = e.data.shop.id, !i.address_name || void 0 == i.address_name) return void e.showToast({
                title: "请填写收货人",
                image: "/images/icon-warning.png"
            });
            if (!i.address_mobile || void 0 == i.address_mobile) return void e.showToast({
                title: "请填写联系方式",
                image: "/images/icon-warning.png"
            });
            if (!/^\+?\d[\d -]{8,12}\d/.test(i.address_mobile)) return void getApp().core.showModal({
                title: "提示",
                content: "手机号格式不正确",
                showCancel: !1
            });
        }
        if (i.offline = a, -1 == e.data.payment) return e.setData({
            show_payment: !0
        }), !1;
        e.data.cart_id_list && (i.cart_id_list = JSON.stringify(e.data.cart_id_list)), e.data.goods_info && (i.goods_info = JSON.stringify(e.data.goods_info)), 
        e.data.picker_coupon && (i.user_coupon_id = e.data.picker_coupon.user_coupon_id), 
        e.data.content && (i.content = e.data.content), 1 == e.data.integral_radio ? i.use_integral = 1 : i.use_integral = 2, 
        i.payment = e.data.payment, i.formId = t.detail.formId, e.order_submit(i, "ms");
    },
    onReady: function(t) {
        getApp().page.onReady(this);
    },
    onShow: function(t) {
        getApp().page.onShow(this);
        var e = this, a = getApp().core.getStorageSync(getApp().const.PICKER_ADDRESS);
        a && (e.setData({
            address: a,
            name: a.name,
            mobile: a.mobile
        }), getApp().core.removeStorageSync(getApp().const.PICKER_ADDRESS), e.getInputData()), 
        e.getOrderData(e.data.options);
    },
    getOrderData: function(a) {
        var i = this, o = "";
        i.data.address && i.data.address.id && (o = i.data.address.id), a.goods_info && (getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.miaosha.submit_preview,
            data: {
                goods_info: a.goods_info,
                address_id: o,
                longitude: t,
                latitude: e
            },
            success: function(t) {
                if (getApp().core.hideLoading(), 0 == t.code) {
                    var e = t.data.shop_list, a = {};
                    1 == e.length && (a = e[0]);
                    var o = getApp().core.getStorageSync(getApp().const.INPUT_DATA);
                    o || (o = {
                        address: t.data.address,
                        name: t.data.address ? t.data.address.name : "",
                        mobile: t.data.address ? t.data.address.mobile : "",
                        shop: a
                    }, t.data.pay_type_list.length > 0 && (o.payment = t.data.pay_type_list[0].payment, 
                    t.data.pay_type_list.length > 1 && (o.payment = -1))), o.total_price = t.data.total_price, 
                    o.level_price = t.data.level_price, o.is_level = t.data.is_level, o.goods_list = t.data.list, 
                    o.goods_info = t.data.goods_info, o.express_price = parseFloat(t.data.express_price), 
                    o.coupon_list = t.data.coupon_list, o.shop_list = t.data.shop_list, o.send_type = t.data.send_type, 
                    o.level = t.data.level, o.integral = t.data.integral, o.new_total_price = t.data.level_price, 
                    o.is_payment = t.data.is_payment, o.is_coupon = t.data.list[0].coupon, o.is_discount = t.data.list[0].is_discount, 
                    o.is_area = t.data.is_area, o.pay_type_list = t.data.pay_type_list, i.setData(o), 
                    i.getInputData(), 1 == t.data.send_type && i.setData({
                        offline: 0
                    }), 2 == t.data.send_type && i.setData({
                        offline: 1
                    }), i.getPrice();
                }
                1 == t.code && getApp().core.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    confirmText: "返回",
                    success: function(t) {
                        t.confirm && (1 == getCurrentPages().length ? getApp().core.redirectTo({
                            url: "/pages/index/index"
                        }) : getApp().core.navigateBack({
                            delta: 1
                        }));
                    }
                });
            }
        }));
    },
    copyText: function(t) {
        var e = t.currentTarget.dataset.text;
        e && getApp().core.setClipboardData({
            data: e,
            success: function() {
                self.showToast({
                    title: "已复制内容"
                });
            },
            fail: function() {
                self.showToast({
                    title: "复制失败",
                    image: "/images/icon-warning.png"
                });
            }
        });
    },
    showCouponPicker: function() {
        var t = this;
        t.getInputData(), t.data.coupon_list && t.data.coupon_list.length > 0 && t.setData({
            show_coupon_picker: !0
        });
    },
    pickCoupon: function(t) {
        var e = this, a = getApp().core.getStorageSync(getApp().const.INPUT_DATA);
        getApp().core.removeStorageSync(getApp().const.INPUT_DATA);
        var i = t.currentTarget.dataset.index;
        a.show_coupon_picker = !1, a.picker_coupon = "-1" != i && -1 != i && e.data.coupon_list[i], 
        e.setData(a), e.getPrice();
    },
    numSub: function(t, e, a) {
        return 100;
    },
    showShop: function(t) {
        var e = this;
        e.getInputData(), e.dingwei(), e.data.shop_list && e.data.shop_list.length >= 1 && e.setData({
            show_shop: !0
        });
    },
    pickShop: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = getApp().core.getStorageSync(getApp().const.INPUT_DATA);
        getApp().core.removeStorageSync(getApp().const.INPUT_DATA), i.show_shop = !1, i.shop = "-1" != a && -1 != a && e.data.shop_list[a], 
        e.setData(i), e.getPrice();
    },
    integralSwitchChange: function(t) {
        var e = this;
        0 != t.detail.value ? e.setData({
            integral_radio: 1
        }) : e.setData({
            integral_radio: 2
        }), e.getPrice();
    },
    integration: function(t) {
        var e = this.data.integral.integration;
        getApp().core.showModal({
            title: "积分使用规则",
            content: e,
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#ff4544",
            success: function(t) {
                t.confirm;
            }
        });
    },
    getPrice: function() {
        var t = this, e = (t.data.total_price, t.data.level_price), a = t.data.express_price, i = t.data.picker_coupon, o = t.data.integral, s = t.data.integral_radio, n = (t.data.level, 
        t.data.is_level, t.data.offline);
        i && (e -= i.sub_price), o && 1 == s && (e -= parseFloat(o.forehead)), e <= .01 && (e = .01), 
        0 == n && (e += a), t.setData({
            new_total_price: e.toFixed(2)
        });
    },
    cardDel: function() {
        this.setData({
            show_card: !1
        }), getApp().core.redirectTo({
            url: "/pages/order/order?status=1"
        });
    },
    cardTo: function() {
        this.setData({
            show_card: !1
        }), getApp().core.redirectTo({
            url: "/pages/card/card"
        });
    },
    formInput: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = e.data.form, o = i.list;
        o[a].default = t.detail.value, i.list = o, e.setData({
            form: i
        });
    },
    selectForm: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = t.currentTarget.dataset.k, o = e.data.form, s = o.list;
        if ("radio" == s[a].type) {
            var n = s[a].default_list;
            for (var r in n) r == i ? n[i].is_selected = 1 : n[r].is_selected = 0;
            s[a].default_list = n;
        }
        "checkbox" == s[a].type && (1 == (n = s[a].default_list)[i].is_selected ? n[i].is_selected = 0 : n[i].is_selected = 1, 
        s[a].default_list = n), o.list = s, e.setData({
            form: o
        });
    },
    showPayment: function() {
        this.setData({
            show_payment: !0
        });
    },
    payPicker: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            payment: e,
            show_payment: !1
        });
    },
    payClose: function() {
        this.setData({
            show_payment: !1
        });
    },
    getInputData: function() {
        var t = this, e = {
            address: t.data.address,
            name: t.data.name,
            mobile: t.data.mobile,
            content: t.data.content,
            payment: t.data.payment,
            shop: t.data.shop
        };
        getApp().core.setStorageSync(getApp().const.INPUT_DATA, e);
    },
    onHide: function(t) {
        getApp().page.onHide(this), this.getInputData();
    },
    onUnload: function(t) {
        getApp().page.onUnload(this), getApp().core.removeStorageSync(getApp().const.INPUT_DATA);
    }
});