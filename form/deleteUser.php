<?php
$data = [];
$id = $_GET['id'];

$data = json_decode($_COOKIE['listUser']);
foreach ($data as $user => $key) {
    // var_dump($user);
    foreach ($key as $val => $item) {
        if ($item == $id) {
            $key = ["id" => "", "images" => "", "fullname" => "", "phone" => "", "email" => "", "country" => "", "district" => "", "street" => "", "gender" => ""];
            $data[(int)$user] = $key;
        }
    }
}
 setcookie('listUser', json_encode($data), time() + (86400 * 30), "/");