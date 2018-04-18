<?php
	if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['mail'])&&$_POST['mail']!="")&&(isset($_POST['text'])&&$_POST['text']!="")){ 
	    $to = 'andreev_nikita@list.ru'; 
	    $subject = 'Message from site'; 
	    $message = '
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Имя: '.$_POST['name'].'</p>
                    <p>Адрес: '.$_POST['mail'].'</p> 
                    <p>Сообщение:<br> '.$_POST['text'].'</p>              
                </body>
            </html>'; 
	    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
	    $headers .= "From: Отправитель <from@example.com>\r\n"; 
	    mail($to, $subject, $message, $headers);
	}
?>