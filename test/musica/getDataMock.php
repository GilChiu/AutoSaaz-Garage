<?php
header('Content-Type: application/xml; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$action = $_GET['action'] ?? 'session';

switch ($action) {
    case 'session':
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
        <shoutout>Im Loving this so far! Keep the vibes up!</shoutout>
        <votes>15</votes>
        <user>User</user>
        <duration>3:45</duration>
    </currentSong>
    <UpNextSong>
        <title>Midnight Echoes</title>
        <artist>Lana Gray</artist>
        <shoutout>This song hits different at night!</shoutout>
        <votes>27</votes>
        <user>Jaycee</user>
        <duration>4:12</duration>
    </UpNextSong>
    <songs>
        <song>
            <id>1</id>
            <title>THE ARCHER</title>
            <artist>TAYLOR SWIFT</artist>
            <votes>42</votes>
            <can_vote>1</can_vote>
            <can_add>0</can_add>
            <has_voted>0</has_voted>
            <in_playlist>1</in_playlist>
        </song>
        <song>
            <id>2</id>
            <title>THE WAY YOU LOOK TONIGHT</title>
            <artist>LEWIS CAPALDI</artist>
            <votes>23</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
        </song>
        <song>
            <id>3</id>
            <title>SHAPE OF YOU</title>
            <artist>ED SHEERAN</artist>
            <votes>30</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>4</id>
            <title>BLINDING LIGHTS</title>
            <artist>THE WEEKND</artist>
            <votes>27</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>5</id>
            <title>BAD GUY</title>
            <artist>BILLIE EILISH</artist>
            <votes>19</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>6</id>
            <title>LEVITATING</title>
            <artist>DUA LIPA</artist>
            <votes>12</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>7</id>
            <title>WATERMELON SUGAR</title>
            <artist>HARRY STYLES</artist>
            <votes>8</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>1</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>8</id>
            <title>DON&apos;T START NOW</title>
            <artist>DUA LIPA</artist>
            <votes>14</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>9</id>
            <title>PEACHES</title>
            <artist>JUSTIN BIEBER</artist>
            <votes>6</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>1</has_voted>
            <in_playlist>0</in_playlist>
        </song>
    </songs>
</session>';
        break;
        
    case 'alphabet':
echo <<<XML
<?xml version="1.0" encoding="utf-8"?>
<session>
    <alphabetList>
        <item>
            <letter>A</letter>
            <value>A</value>
            <count>25</count>
        </item>
        <item>
            <letter>B</letter>
            <value>B</value>
            <count>18</count>
        </item>
        <item>
            <letter>C</letter>
            <value>C</value>
            <count>22</count>
        </item>
        <item>
            <letter>T</letter>
            <value>T</value>
            <count>35</count>
        </item>
    </alphabetList>
</session>
XML;
        break;
        
    case 'tags':
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <tagsList>
        <item>
            <name>#MUSICA</name>
            <value>1</value>
            <count>150</count>
        </item>
        <item>
            <name>#ROCK</name>
            <value>2</value>
            <count>85</count>
        </item>
        <item>
            <name>#POP</name>
            <value>3</value>
            <count>120</count>
        </item>
    </tagsList>
</session>';
        break;
        
    case 'browse':
        $type = $_GET['type'] ?? 'letter';
        $value = $_GET['value'] ?? 'A';
        
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <songs>
        <song>
            <id>3</id>
            <title>AMAZING GRACE</title>
            <artist>VARIOUS ARTISTS</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
        <song>
            <id>4</id>
            <title>ALL OF ME</title>
            <artist>JOHN LEGEND</artist>
            <votes>5</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
    </songs>
</session>';
        break;
        
    case 'search':
        $query = $_GET['query'] ?? '';
        
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <searchResults>
        <query>' . htmlspecialchars($query) . '</query>
        <total>2</total>
    <songs>
        <song>
            <id>5</id>
            <title>SEARCH RESULT 1</title>
            <artist>TEST ARTIST</artist>
            <votes>0</votes>
            <can_vote>1</can_vote>
            <can_add>1</can_add>
            <has_voted>0</has_voted>
            <in_playlist>0</in_playlist>
        </song>
    </songs>
    </searchResults>
</session>';
        break;
        
    case 'vote':
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <result>success</result>
    <message>Vote added successfully</message>
</session>';
        break;
        
    case 'add':
        echo '<?xml version="1.0" encoding="utf-8"?>
<session>
    <result>success</result>
    <message>Song added to playlist</message>
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