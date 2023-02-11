<?php

$email = $_POST['client_email']; // получаем почту клиента



$token= '5372352621:AAE7AbXnV6IlSTdCet8wO4i1EfxlVnR_F04';
// вставляем номер чата, который можно найти на странице 
// api.telegram.org/botXXXXXXXXX/getUpdates — где XXX это токен бота
$chat_id= '1621032163';
$arr = array(
  
    'Email: ' => $email,
  
  );
// составляем сообщение из данных массива
foreach($arr as $key => $value) {
    $txt .= $key."<b> ". urlencode($value)."</b> "."%0A";
  };
// даем команду боту отправить сообщение с текстом
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) { 
    return true; // если прошло успешно, возвращаем ответ true
  } else {
    return false; // если ошибка, возвращаем false
  }
  ?>
?>