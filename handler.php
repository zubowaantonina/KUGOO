<?php
// $user_name=htmlspecialchars($_POST['username']);
$user_phone=htmlspecialchars($_POST['userphone']);
$user_email=htmlspecialchars($_POST['useremail']);
$token="5450624367:AAGrfRbI80TawYDsrYKBW5LDp5lCBmDW428";
$chat_id="-716921482";
// $text="";

$formData=array(
    // "Клиент: " =>$user_name,
    "Телефон: " =>$user_phone,
    "Почта: "=>$user_email
);
foreach($formData as $key => $value){
    $text .= $key . "<b>" . urlencode($value) . "</b>" ."%0A";
}
$sendToTelegram=fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$text}&parse_mode=html","r");


// if($sendToTelegram){
//     echo'Success';
// } else{
//     echo'error';
//     }
//     echo'Привет, '.$user_name.'<br/>';
//     echo'Ваш телефон: <b>'.$user_phone.'<b/>,<br/>';
// echo'Ваша почта: <b>'.$user_email.'<b/>';
?>