<?php

function RequestCURL($url, $header = [], $postArr = '')
{
    $post = http_build_query($postArr, '&');
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    if (!empty($post)) {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
    }
    $data = curl_exec($curl);
    curl_close($curl);
    return $data;
}

function query($text)
{
    // Content-Type: application/json
    $response = RequestCURL(
        'https://textanalysis.p.rapidapi.com/spacy-noun-chunks-extraction',
        [
            'X-Mashape-Key: 3dc6d5ecc5mshe81c5f553bd8b11p145d0ejsne0c531c5e372',
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: application/json',
        ],
        [
            'text' => $text,
        ]
    );
    return $response;
}

$text = $_GET['text'];
echo query($text);
