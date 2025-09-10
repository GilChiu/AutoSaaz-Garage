<?php
header('Content-Type: application/xml; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// DB connection
mysqli_report(MYSQLI_REPORT_OFF);
date_default_timezone_set('Europe/London');

if (strpos($_SERVER['SERVER_NAME'], "192.168") !== false || $_SERVER['SERVER_NAME'] == "musica.jukebox") {
    $_DBconn = mysqli_connect('localhost', 'root', 'bk001', 'musica');
} else {
    $_DBconn = mysqli_connect('dbconn.musica.co.uk', 'musicadev', 'dEvbox@123', 'musica_dev');
}

if (!$_DBconn) {
    echo "<error>Unable to connect to database</error>";
    exit;
}

$action = $_GET['action'] ?? 'session';

switch ($action) {
    case 'session':
        // Query current and next songs
        $currentSong = mysqli_fetch_assoc(mysqli_query($_DBconn, "SELECT * FROM songs WHERE is_playing = 1 LIMIT 1"));
        $upNextSong  = mysqli_fetch_assoc(mysqli_query($_DBconn, "SELECT * FROM songs WHERE is_upnext = 1 LIMIT 1"));
        $songListRes = mysqli_query($_DBconn, "SELECT * FROM songs ORDER BY votes DESC LIMIT 10");

        echo '<?xml version="1.0" encoding="utf-8"?>';
        echo '<session>';

        echo '<sessionInfo>
                <timestamp>' . date('Y-m-d H:i:s') . '</timestamp>
                <session_tags>#MUSICA</session_tags>
                <performer_name>Musica House Band</performer_name>
                <userValidationID>abc123</userValidationID>
                <credits>3</credits>
              </sessionInfo>';

        echo '<currentSong>';
        echo '<title>' . htmlspecialchars($currentSong['title'] ?? 'Unknown') . '</title>';
        echo '<artist>' . htmlspecialchars($currentSong['artist'] ?? 'Unknown') . '</artist>';
        echo '<shoutout>' . htmlspecialchars($currentSong['shoutout'] ?? '') . '</shoutout>';
        echo '<votes>' . ($currentSong['votes'] ?? 0) . '</votes>';
        echo '<user>' . htmlspecialchars($currentSong['user'] ?? 'Unknown') . '</user>';
        echo '<duration>' . htmlspecialchars($currentSong['duration'] ?? '0:00') . '</duration>';
        echo '</currentSong>';

        echo '<UpNextSong>';
        echo '<title>' . htmlspecialchars($upNextSong['title'] ?? 'Unknown') . '</title>';
        echo '<artist>' . htmlspecialchars($upNextSong['artist'] ?? 'Unknown') . '</artist>';
        echo '<shoutout>' . htmlspecialchars($upNextSong['shoutout'] ?? '') . '</shoutout>';
        echo '<votes>' . ($upNextSong['votes'] ?? 0) . '</votes>';
        echo '<user>' . htmlspecialchars($upNextSong['user'] ?? 'Unknown') . '</user>';
        echo '<duration>' . htmlspecialchars($upNextSong['duration'] ?? '0:00') . '</duration>';
        echo '</UpNextSong>';

        echo '<songs>';
        while ($song = mysqli_fetch_assoc($songListRes)) {
            echo '<song>';
            echo '<id>' . $song['id'] . '</id>';
            echo '<title>' . htmlspecialchars($song['title']) . '</title>';
            echo '<artist>' . htmlspecialchars($song['artist']) . '</artist>';
            echo '<votes>' . $song['votes'] . '</votes>';
            echo '<can_vote>1</can_vote>';
            echo '<can_add>1</can_add>';
            echo '<has_voted>0</has_voted>';
            echo '<in_playlist>' . ($song['in_playlist'] ?? 0) . '</in_playlist>';
            echo '</song>';
        }
        echo '</songs>';

        echo '</session>';
        break;

    // You can implement similar DB-driven logic for 'alphabet', 'tags', 'browse', 'search', etc.
    
    default:
        echo '<?xml version="1.0" encoding="utf-8"?>';
        echo '<session><error><error_id>404</error_id><error_message><![CDATA[Unknown action]]></error_message><terminal_error>0</terminal_error></error></session>';
        break;
}
