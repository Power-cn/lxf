module.exports = {
    currentPage: null,
    init: function(t) {
        var a = this;
        a.currentPage = t, void 0 === t.previewImage && (t.previewImage = function(t) {
            a.previewImage(t);
        }), void 0 === t.showAttrPicker && (t.showAttrPicker = function(t) {
            a.showAttrPicker(t);
        }), void 0 === t.hideAttrPicker && (t.hideAttrPicker = function(t) {
            a.hideAttrPicker(t);
        }), void 0 === t.storeAttrClick && (t.storeAttrClick = function(t) {
            a.storeAttrClick(t);
        }), void 0 === t.numberAdd && (t.numberAdd = function(t) {
            a.numberAdd(t);
        }), void 0 === t.numberSub && (t.numberSub = function(t) {
            a.numberSub(t);
        }), void 0 === t.numberBlur && (t.numberBlur = function(t) {
            a.numberBlur(t);
        });
    },
    previewImage: function(t) {
        var a = t.currentTarget.dataset.url;
        getApp().core.previewImage({
            urls: [ a ]
        });
    },
    hideAttrPicker: function() {
        this.currentPage.setData({
            show_attr_picker: !1
        });
    },
    showAttrPicker: function() {
        this.currentPage.setData({
            show_attr_picker: !0
        });
    },
    groupCheck: function() {
        var t = this, a = t.data.attr_group_num, r = t.data.attr_group_num.attr_list;
        for (var i in r) r[i].checked = !1;
        a.attr_list = r;
        t.data.goods;
        t.setData({
            group_checked: 0,
            attr_group_num: a
        });
        var e = t.data.attr_group_list, o = [], s = !0;
        for (var i in e) {
            var d = !1;
            for (var n in e[i].attr_list) if (e[i].attr_list[n].checked) {
                o.push(e[i].attr_list[n].attr_id), d = !0;
                break;
            }
            if (!d) {
                s = !1;
                break;
            }
        }
        s && (getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.group.goods_attr_info,
            data: {
                goods_id: t.data.goods.id,
                group_id: t.data.group_checked,
                attr_list: JSON.stringify(o)
            },
            success: function(a) {
                if (getApp().core.hideLoading(), 0 == a.code) {
                    var r = t.data.goods;
                    r.price = a.data.price, r.num = a.data.num, r.attr_pic = a.data.pic, r.original_price = a.data.single, 
                    t.setData({
                        goods: r
                    });
                }
            }
        }));
    },
    attrNumClick: function(t) {
        var a = this.currentPage, r = t.target.dataset.id, i = a.data.attr_group_num, e = i.attr_list;
        for (var o in e) e[o].id == r ? e[o].checked = !0 : e[o].checked = !1;
        i.attr_list = e, a.setData({
            attr_group_num: i,
            group_checked: r
        });
        var s = a.data.attr_group_list, d = [], n = !0;
        for (var o in s) {
            var p = !1;
            for (var c in s[o].attr_list) if (s[o].attr_list[c].checked) {
                d.push(s[o].attr_list[c].attr_id), p = !0;
                break;
            }
            if (!p) {
                n = !1;
                break;
            }
        }
        n && (getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.group.goods_attr_info,
            data: {
                goods_id: a.data.goods.id,
                group_id: a.data.group_checked,
                attr_list: JSON.stringify(d)
            },
            success: function(t) {
                if (getApp().core.hideLoading(), 0 == t.code) {
                    var r = a.data.goods;
                    r.price = t.data.price, r.num = t.data.num, r.attr_pic = t.data.pic, r.original_price = t.data.single, 
                    a.setData({
                        goods: r
                    });
                }
            }
        }));
    },
    storeAttrClick: function(t) {
        var a = this.currentPage, r = this, i = t.target.dataset.groupId, e = parseInt(t.target.dataset.id), o = a.data.attr_group_list;
        "string" == typeof (v = a.data.goods.attr) && (v = JSON.parse(v));
        for (var s in o) if (o[s].attr_group_id == i) {
            for (var d in o[s].attr_list) if ((n = o[s].attr_list[d]).attr_id === e && n.attr_num_0) return;
            for (var d in o[s].attr_list) {
                var n = o[s].attr_list[d];
                parseInt(n.attr_id) === e && n.checked ? n.checked = !1 : n.checked = parseInt(n.attr_id) === e;
            }
        }
        var p = [];
        for (var s in v) if (0 === v[s].num) {
            var c = [];
            for (var g in v[s].attr_list) c.push(v[s].attr_list[g].attr_id);
            p.push(c);
        }
        var u = [];
        for (var s in o) for (var d in o[s].attr_list) o[s].attr_list[d].checked && u.push(o[s].attr_list[d].attr_id);
        var _ = [];
        for (var s in u) for (var d in p) if (getApp().helper.inArray(u[s], p[d])) for (var l in p[d]) p[d][l] !== u[s] && _.push(p[d][l]);
        for (var s in o) for (var d in o[s].attr_list) {
            var f = o[s].attr_list[d];
            f.attr_num_0 = getApp().helper.inArray(f.attr_id, _);
        }
        a.setData({
            attr_group_list: o
        });
        var m = [], h = !0;
        for (var s in o) {
            k = !1;
            for (var d in o[s].attr_list) if (o[s].attr_list[d].checked) {
                if ("INTEGRAL" !== a.data.pageType) {
                    m.push(o[s].attr_list[d].attr_id), k = !0;
                    break;
                }
                var v = {
                    attr_id: o[s].attr_list[d].attr_id,
                    attr_name: o[s].attr_list[d].attr_name
                };
                m.push(v);
            }
            if ("INTEGRAL" !== a.data.pageType && !k) {
                h = !1;
                break;
            }
        }
        if ("INTEGRAL" === a.data.pageType || h) {
            getApp().core.showLoading({
                title: "正在加载",
                mask: !0
            });
            var A = a.data.pageType, k = 0;
            if ("STORE" === A) b = getApp().api.default.goods_attr_info; else if ("PINTUAN" === A) {
                b = getApp().api.group.goods_attr_info;
                k = a.data.group_checked;
            } else {
                if ("INTEGRAL" === A) return getApp().core.hideLoading(), void r.integralMallAttrClick(m);
                if ("BOOK" === A) b = getApp().api.book.goods_attr_info; else {
                    if ("MIAOSHA" !== A) return getApp().core.showModal({
                        title: "提示",
                        content: "pageType变量未定义或变量值不是预期的"
                    }), void getApp().core.hideLoading();
                    var b = getApp().api.default.goods_attr_info;
                }
            }
            getApp().request({
                url: b,
                data: {
                    goods_id: "MIAOSHA" === A ? a.data.id : a.data.goods.id,
                    group_id: a.data.group_checked,
                    attr_list: JSON.stringify(m),
                    type: "MIAOSHA" === A ? "ms" : "",
                    group_checked: k
                },
                success: function(t) {
                    if (getApp().core.hideLoading(), 0 == t.code) {
                        var r = a.data.goods;
                        if (r.price = t.data.price, r.num = t.data.num, r.attr_pic = t.data.pic, r.is_member_price = t.data.is_member_price, 
                        r.single_price = t.data.single_price ? t.data.single_price : 0, r.group_price = t.data.price, 
                        "MIAOSHA" === A) {
                            var i = t.data.miaosha;
                            r.price = i.price, r.is_member_price = i.is_member_price, a.setData({
                                miaosha_data: i
                            });
                        }
                        a.setData({
                            goods: r
                        });
                    }
                }
            });
        }
    },
    attrClick: function(t) {
        var a = this, r = t.target.dataset.groupId, i = t.target.dataset.id, e = a.data.attr_group_list;
        for (var o in e) if (e[o].attr_group_id == r) for (var s in e[o].attr_list) e[o].attr_list[s].attr_id == i ? e[o].attr_list[s].checked = !0 : e[o].attr_list[s].checked = !1;
        a.setData({
            attr_group_list: e
        });
        var d = [], n = !0;
        for (var o in e) {
            var p = !1;
            for (var s in e[o].attr_list) if (e[o].attr_list[s].checked) {
                d.push(e[o].attr_list[s].attr_id), p = !0;
                break;
            }
            if (!p) {
                n = !1;
                break;
            }
        }
        n && (getApp().core.showLoading({
            title: "正在加载",
            mask: !0
        }), getApp().request({
            url: getApp().api.default.goods_attr_info,
            data: {
                goods_id: a.data.id,
                attr_list: JSON.stringify(d),
                type: "ms"
            },
            success: function(t) {
                if (getApp().core.hideLoading(), 0 == t.code) {
                    var r = a.data.goods;
                    r.price = t.data.price, r.num = t.data.num, r.attr_pic = t.data.pic, a.setData({
                        goods: r,
                        miaosha_data: t.data.miaosha
                    });
                }
            }
        }));
    },
    integralMallAttrClick: function(t) {
        var a = this.currentPage, r = a.data.goods, i = r.attr, e = 0, o = 0;
        for (var s in i) JSON.stringify(i[s].attr_list) == JSON.stringify(t) && (e = parseFloat(i[s].price) > 0 ? i[s].price : r.price, 
        o = parseInt(i[s].integral) > 0 ? i[s].integral : r.integral, r.num = i[s].num, 
        a.setData({
            attr_integral: o,
            attr_num: i[s].num,
            attr_price: e,
            status: "attr",
            goods: r
        }));
    },
    numberSub: function() {
        var t = this.currentPage, a = t.data.form.number;
        if (a <= 1) return !0;
        a--, t.setData({
            form: {
                number: a
            }
        });
    },
    numberAdd: function() {
        var t = this.currentPage, a = t.data.form.number, r = t.data.pageType;
        if (!(++a > t.data.goods.one_buy_limit && 0 != t.data.goods.one_buy_limit)) return "MIAOSHA" === r && a > t.data.goods.miaosha.buy_max && 0 != t.data.goods.miaosha.buy_max ? (getApp().core.showToast({
            title: "一单限购" + t.data.goods.miaosha.buy_max,
            image: "/images/icon-warning.png"
        }), !0) : void t.setData({
            form: {
                number: a
            }
        });
        getApp().core.showModal({
            title: "提示",
            content: "数量超过最大限购数",
            showCancel: !1,
            success: function(t) {}
        });
    },
    numberBlur: function(t) {
        var a = this.currentPage, r = t.detail.value, i = a.data.pageType;
        if (r = parseInt(r), isNaN(r) && (r = 1), r <= 0 && (r = 1), r > a.data.goods.one_buy_limit && 0 != a.data.goods.one_buy_limit && (getApp().core.showModal({
            title: "提示",
            content: "数量超过最大限购数",
            showCancel: !1,
            success: function(t) {}
        }), r = a.data.goods.one_buy_limit), "MIAOSHA" === i && r > a.data.goods.miaosha.buy_max && 0 != a.data.goods.miaosha.buy_max) return getApp().core.showToast({
            title: "一单限购" + a.data.goods.miaosha.buy_max,
            image: "/images/icon-warning.png"
        }), !0;
        a.setData({
            form: {
                number: r
            }
        });
    }
};