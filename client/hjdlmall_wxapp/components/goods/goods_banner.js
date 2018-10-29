module.exports = {
    currentPage: null,
    init: function(e) {
        var i = this;
        i.currentPage = e, void 0 === e.onGoodsImageClick && (e.onGoodsImageClick = function(e) {
            i.onGoodsImageClick(e);
        }), void 0 === e.hide && (e.hide = function(e) {
            i.hide(e);
        });
    },
    onGoodsImageClick: function(e) {
        var i = this.currentPage, t = [], o = e.currentTarget.dataset.index;
        for (var a in i.data.goods.pic_list) t.push(i.data.goods.pic_list[a]);
        getApp().core.previewImage({
            urls: t,
            current: t[o]
        });
    },
    hide: function(e) {
        var i = this.currentPage;
        0 == e.detail.current ? i.setData({
            img_hide: ""
        }) : i.setData({
            img_hide: "hide"
        });
    }
};