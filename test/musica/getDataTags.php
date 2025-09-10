<?php
header('Content-Type: application/xml; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$action = $_GET['action'] ?? 'tagsongs';

switch ($action) {
    case 'tagsongs':
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <sessionInfo>
        <timestamp>2025-07-11 12:00:00</timestamp>
        <session_tags>#MUSICA</session_tags>
        <performer_name>Musica House Band</performer_name>
        <userValidationID>abc123</userValidationID>
        <credits>3</credits>
    </sessionInfo>
    <currentSong>
        <title>THE ONE AND ONLY</title>
        <artist>ADELE</artist>
        <votes>15</votes>
        <duration>3:45</duration>
    </currentSong>
    <songs>
        <song>
            <id>1</id>
            <title>EARTH ANGEL</title>
            <artist>THE PENGUINS</artist>
            <votes>42</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>2</id>
            <title>BEAUTIFUL STRANGER</title>
            <artist>MADONNA</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>3</id>
            <title>STAY WITH ME</title>
            <artist>SAM SMITH</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>4</id>
            <title>WHEN I WAS YOUR MAN</title>
            <artist>BRUNO MARS</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>5</id>
            <title>OCEAN EYES</title>
            <artist>BILLIE EILISH</artist>
            <votes>26</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>6</id>
            <title>SOMEONE LIKE YOU</title>
            <artist>ADELE</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>7</id>
            <title>WHEN I WAS YOUR MAN</title>
            <artist>BRUNO MARS</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>8</id>
            <title>OCEAN EYES</title>
            <artist>BILLIE EILISH</artist>
            <votes>12</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
    </songs>
</session>';
        break;
    default:
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <error>
        <error_id>404</error_id>
        <error_message><![CDATA[Unknown action]]></error_message>
        <terminal_error>0</terminal_error>
    </error>
</session>';
        break;
}
