<?php

$values = array_map('trim', $_POST);

$to = $values['Recipient'];
$subject = $values['Subject'];
$header = "Content-type: text/html; charset=\"utf-8\"";
$header .= "From: <$to>";
$header .= "Subject: " . $subject;
$header .= "Content-type: text/html; charset=\"utf-8\"";
$body = "";

foreach ($values as $key => &$value) {
	$body .= "<b>$key</b>: $value<br>";
}

mail($to, $subject, $body, $header);