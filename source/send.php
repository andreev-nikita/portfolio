<?php
    if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['mail'])&&$_POST['mail']!="")&&(isset($_POST['text'])&&$_POST['text']!="")){ 
        $to = 'nikitaandreevcb@gmail.com'; 
        $subject = 'Message from site'; 
        $message = '
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Имя: '.$_POST['name'].'</p>
                    <p>E-mail: '.$_POST['mail'].'</p> 
                    <p>Сообщение:<br> '.$_POST['text'].'</p>              
                </body>
            </html>'; 
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Отправитель <admin@nikita-andreev.ru>\r\n"; 
        mail($to, $subject, $message, $headers);
    }
?>