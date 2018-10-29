<?php
/**
 * link: http://www.zjhejiang.com/
 * copyright: Copyright (c) 2018 浙江禾匠信息科技有限公司
 * author: wxf
 */

namespace app\models\common;


use app\models\FormId;

class CommonFormId
{
    public static function save($formId)
    {
        $model = FormId::find();
    }
}