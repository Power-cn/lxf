
ALTER TABLE `hjmallind_pt_goods` ADD is_level tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否享受会员折扣 0-不享受 1--享受';
ALTER TABLE `hjmallind_pt_goods_detail` ADD is_level tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否享受会员折扣 0-不享受 1--享受';
ALTER TABLE `hjmallind_yy_goods` ADD is_level tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否享受会员折扣 0-不享受 1--享受';
ALTER TABLE `hjmallind_miaosha_goods` ADD is_level tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否享受会员折扣 0-不享受 1--享受';

ALTER TABLE `hjmallind_store` ADD is_official_account tinyint(1) NOT NULL DEFAULT '0' COMMENT '公众号关注组件 0.否 | 1.是';
AlTER TABLE `hjmallind_user` ADD parent_user_id int(11) NOT NULL DEFAULT '0' COMMENT '可能成为上级的ID';
ALTER TABLE `hjmallind_mch` ADD COLUMN `main_content` varchar(255) NOT NULL DEFAULT '' COMMENT '主营范围', ADD COLUMN `summary` varchar(255) NULL DEFAULT '';
ALTER TABLE `hjmallind_lottery_log` ADD COLUMN `child_id` int(11) NOT NULL DEFAULT 0 COMMENT '下级用户', ADD COLUMN `lucky_code` varchar(255) NOT NULL DEFAULT '' COMMENT '幸运码';
CREATE TABLE `hjmallind_lottery_setting` ( `id` int(11) NOT NULL AUTO_INCREMENT, `store_id` int(11) NOT NULL DEFAULT '0', `rule` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则', `title` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序标题', `type` int(10) NULL DEFAULT 0 COMMENT '0不强制 1强制', PRIMARY KEY (`id`) ) DEFAULT CHARSET=utf8;

ALTER TABLE `hjmallind_bargain_setting` ADD COLUMN `share_title`  longtext NULL;

ALTER TABLE `hjmallind_pond` ADD COLUMN `name`  varchar(255) NULL DEFAULT '' COMMENT '别名' AFTER `attr`;