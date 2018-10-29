var e, t = getApp().helper, o = "", a = require("../../wxParse/wxParse.js");

Page({
    data: {
        hide: "hide",
        time_list: {
            day: 0,
            hour: "00",
            minute: "00",
            second: "00"
        },
        p: 1,
        user_index: 0,
        show_animate: !0,
        animationTranspond: {},
        award_bg: !1
    },
    onLoad: function(e) {
        if (getApp().page.onLoad(this, e), "undefined" == typeof my) {
            var o = decodeURIComponent(e.scene);
            if (void 0 !== o) {
                var a = t.scene_decode(o);
                a.gid && (e.id = a.gid);
            }
        } else if (null !== getApp().query) {
            var i = app.query;
            getApp().query = null, e.id = i.gid;
        }
        this.getGoods(e);
    },
    getGoods: function(e) {
        var t = this, o = e.id;
        console.log(e), getApp().core.showLoading({
            title: "加载中"
        });
        t = this;
        getApp().request({
            url: getApp().api.lottery.goods,
            data: {
                id: o
            },
            success: function(e) {
                if (0 == e.code) {
                    var o = e.data.goods.detail;
                    a.wxParse("detail", "html", o, t), t.setData(e.data);
                } else getApp().core.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && getApp().core.navigateBack({
                            delta: -1
                        });
                    }
                });
            },
            complete: function(e) {
                getApp().core.hideLoading();
            }
        });
    },
    buyZero: function() {
        var t = this, o = !t.data.award_bg;
        t.setData({
            award_bg: o
        });
        var a = getApp().core.createAnimation({
            duration: 1e3,
            timingFunction: "linear",
            transformOrigin: "50% 50%"
        });
        t.data.award_bg ? a.width("360rpx").height("314rpx").step() : a.scale(0, 0).opacity(0).step(), 
        t.setData({
            animationTranspond: a.export()
        });
        var i = 0;
        e = setInterval(function() {
            i % 2 == 0 ? a.scale(.9).opacity(1).step() : a.scale(1).opacity(1).step(), t.setData({
                animationTranspond: a.export()
            }), 500 == ++i && (i = 0);
        }, 500);
    },
    submitTime: function() {
        var t = this, o = getApp().core.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%"
        }), t = this, a = 0;
        e = setInterval(function() {
            a % 2 == 0 ? o.scale(2.3, 2.3).opacity(1).step() : o.scale(2.5, 2.5).opacity(1).step(), 
            t.setData({
                animationTranspond: o.export()
            }), 500 == ++a && (a = 0);
        }, 500);
    },
    submit: function(t) {
        var o = this, a = t.detail.formId, i = t.currentTarget.dataset.lottery_id;
        getApp().core.navigateTo({
            url: "/lottery/detail/detail?lottery_id=" + i + "&form_id=" + a
        }), clearInterval(e), o.setData({
            award_bg: !1
        });
    },
    onShow: function() {},
    play: function(e) {
        var t = e.target.dataset.url;
        this.setData({
            url: t,
            hide: "",
            show: !0
        }), (o = getApp().core.createVideoContext("video")).play();
    },
    close: function(e) {
        if ("video" == e.target.id) return !0;
        this.setData({
            hide: "hide",
            show: !1
        }), o.pause();
    },
    onGoodsImageClick: function(e) {
        var t = this, o = [], a = e.currentTarget.dataset.index;
        for (var i in t.data.goods.pic_list) o.push(t.data.goods.pic_list[i].pic_url);
        getApp().core.previewImage({
            urls: o,
            current: o[a]
        });
    },
    hide: function(e) {
        0 == e.detail.current ? this.setData({
            img_hide: ""
        }) : this.setData({
            img_hide: "hide"
        });
    },
    buyNow: function(e) {
        var t = this, o = [], a = {
            goods_id: t.data.goods.id,
            num: 1,
            attr: JSON.parse(t.data.lottery_info.attr)
        };
        o.push(a);
        var i = [];
        i.push({
            mch_id: 0,
            goods_list: o
        }), getApp().core.navigateTo({
            url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(i)
        });
    },
    onShareAppMessage: function() {
        getApp().page.onShareAppMessage(this);
        var e = getApp().getUser();
        return {
            path: "/lottery/goods/goods?id=" + this.data.lottery_info.id + "&user_id=" + e.id
        };
    },
    showShareModal: function() {
        this.setData({
            share_modal_active: "active"
        });
    },
    shareModalClose: function() {
        this.setData({
            share_modal_active: ""
        });
    },
    getGoodsQrcode: function() {
        var e = this;
        if (e.setData({
            qrcode_active: "active",
            share_modal_active: ""
        }), e.data.goods_qrcode) return !0;
        getApp().request({
            url: getApp().api.lottery.qrcode,
            data: {
                goods_id: e.data.lottery_info.id
            },
            success: function(t) {
                0 == t.code && e.setData({
                    goods_qrcode: t.data.pic_url
                }), 1 == t.code && (e.goodsQrcodeClose(), getApp().core.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                }));
            }
        });
    },
    qrcodeClick: function(e) {
        var t = e.currentTarget.dataset.src;
        getApp().core.previewImage({
            urls: [ t ]
        });
    },
    qrcodeClose: function() {
        this.setData({
            qrcode_active: ""
        });
    },
    goodsQrcodeClose: function() {
        this.setData({
            goods_qrcode_active: "",
            no_scroll: !1
        });
    },
    saveQrcode: function() {
        var e = this;
        getApp().core.saveImageToPhotosAlbum ? (getApp().core.showLoading({
            title: "正在保存图片",
            mask: !1
        }), getApp().core.downloadFile({
            url: e.data.goods_qrcode,
            success: function(e) {
                getApp().core.showLoading({
                    title: "正在保存图片",
                    mask: !1
                }), getApp().core.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function() {
                        getApp().core.showModal({
                            title: "提示",
                            content: "商品海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(e) {
                        getApp().core.showModal({
                            title: "图片保存失败",
                            content: e.errMsg,
                            showCancel: !1
                        });
                    },
                    complete: function(e) {
                        getApp().core.hideLoading();
                    }
                });
            },
            fail: function(t) {
                getApp().core.showModal({
                    title: "图片下载失败",
                    content: t.errMsg + ";" + e.data.goods_qrcode,
                    showCancel: !1
                });
            },
            complete: function(e) {
                getApp().core.hideLoading();
            }
        })) : getApp().core.showModal({
            title: "提示",
            content: "当前版本过低，无法使用该功能，请升级到最新版本后重试。",
            showCancel: !1
        });
    }
});