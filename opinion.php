<?php
require_once __DIR__ . '/./autoload.php';
$sentiment = new \PHPInsight\Sentiment();
header('Content-Type: text/plain');

echo $sentiment->categorise($_GET['text']);
