<?php
/**
 * link: http://www.zjhejiang.com/
 * copyright: Copyright (c) 2018 浙江禾匠信息科技有限公司
 * author: wxf
 */

namespace app\models\common\api;

class CommonOrder
{
    /**
     * 持续更新...
     * 下单前的检测
     */
    public static function checkOrder()
    {
        $user = \Yii::$app->user->identity;

        if ($user->blacklist) {
            return [
                'code' => 1,
                'msg' => '无法下单'
            ];
        }
    }
}