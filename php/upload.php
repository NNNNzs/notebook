<?php
header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:' . $_SERVER["HTTP_ORIGIN"]); //
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段 

$requestScheme = $_SERVER['REQUEST_SCHEME']; //协议
$host = $_SERVER['SERVER_NAME']; //域名
$baseUrl = $requestScheme . '://' . $host;


if ($_FILES["file"]["error"] > 0) {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
} else {
    $fileUrl =  $baseUrl . "/upload/" . $_FILES["file"]["name"];
    if (file_exists("upload/" . $_FILES["file"]["name"])) {
        $result = array('code' => 1001, 'content'=>$fileUrl,'msg' => '文件名已重复');
        echo json_encode($result);
    } else {
        move_uploaded_file(
            $_FILES["file"]["tmp_name"],
            "upload/" . $_FILES["file"]["name"]
        );
        $result = array('code' => 1000, 'content' => $fileUrl, 'msg' => '上传成功');
        echo json_encode($result);
    }
}
