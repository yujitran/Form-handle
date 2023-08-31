<?php
$imgs = $_FILES['images'];

function reArrayFiles($file)
{
    $file_ary = array();
    $file_count = count($file['name']);
    $file_key = array_keys($file);
    
    for($i=0;$i<$file_count;$i++)
    {
        foreach($file_key as $val)
        {
            $file_ary[$i][$val] = $file[$val][$i];
        }
    }
    return $file_ary;
}

if(!empty($imgs))
{
    $img_desc = reArrayFiles($imgs);
    print_r($img_desc);
    
    foreach($img_desc as $val)
    {
        if($_POST['form_token'] != $_COOKIE['form_token']) {
            echo "Access denied";
        } else {
            // $newname = date('YmdHis',time()).mt_rand().'.jpg';
            move_uploaded_file($val['tmp_name'],'./uploads/'.$val['name']);              
        }
    }
}

$_COOKIE['form_token'] = '';


