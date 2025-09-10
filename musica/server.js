// // Mock API server using Node.js - simple alternative to PHP
// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');

// const PORT = 8000;

// // Mock data responses
// const mockResponses = {
//     session: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <sessionInfo>
//         <session_id>123</session_id>
//         <timestamp>2025-07-11 12:00:00</timestamp>
//         <session_tags>#MUSICA</session_tags>
//         <performer_name>Musica House Band</performer_name>
//         <userValidationID>abc123</userValidationID>
//         <credits>3</credits>
//         <time_remaining>4:39</time_remaining>
//     </sessionInfo>
//     <currentSong>
//         <title>THE ONE AND ONLY</title>
//         <artist>ADELE</artist>
//         <artwork>assets/default-artwork.svg</artwork>
//         <votes>15</votes>
//         <duration>3:45</duration>
//     </currentSong>
//     <songs>
//         <song>
//             <id>1</id>
//             <title>THE ARCHER</title>
//             <artist>TAYLOR SWIFT</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>42</votes>
//             <can_vote>1</can_vote>
//             <can_add>0</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//         <song>
//             <id>2</id>
//             <title>THE WAY YOU LOOK TONIGHT</title>
//             <artist>LEWIS CAPALDI</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>23</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//         <song>
//             <id>3</id>
//             <title>SHIVER</title>
//             <artist>ED SHEERAN</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>53</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//         <song>
//             <id>4</id>
//             <title>EARTH ANGEL</title>
//             <artist>THE PENGUINS</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>42</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//         <song>
//             <id>5</id>
//             <title>BEAUTIFUL GIRLS</title>
//             <artist>SEAN KINGSTON</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>37</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//         <song>
//             <id>6</id>
//             <title>ALEJANDRO</title>
//             <artist>LADY GAGA</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>45</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>1</in_playlist>
//         </song>
//     </songs>
// </session>`,

//     alphabet: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <alphabetList>
//         <item>
//             <letter>A</letter>
//             <value>A</value>
//             <count>25</count>
//         </item>
//         <item>
//             <letter>B</letter>
//             <value>B</value>
//             <count>18</count>
//         </item>
//         <item>
//             <letter>C</letter>
//             <value>C</value>
//             <count>22</count>
//         </item>
//         <item>
//             <letter>T</letter>
//             <value>T</value>
//             <count>35</count>
//         </item>
//     </alphabetList>
// </session>`,

//     tags: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <tagsList>
//         <item>
//             <name>#MUSICA</name>
//             <value>1</value>
//             <count>150</count>
//         </item>
//         <item>
//             <name>#ROCK</name>
//             <value>2</value>
//             <count>85</count>
//         </item>
//         <item>
//             <name>#POP</name>
//             <value>3</value>
//             <count>120</count>
//         </item>
//     </tagsList>
// </session>`,

//     browse: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <songs>
//         <song>
//             <id>3</id>
//             <title>AMAZING GRACE</title>
//             <artist>VARIOUS ARTISTS</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>0</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>0</in_playlist>
//         </song>
//         <song>
//             <id>4</id>
//             <title>ALL OF ME</title>
//             <artist>JOHN LEGEND</artist>
//             <artwork>assets/default-artwork.svg</artwork>
//             <votes>5</votes>
//             <can_vote>1</can_vote>
//             <can_add>1</can_add>
//             <has_voted>0</has_voted>
//             <in_playlist>0</in_playlist>
//         </song>
//     </songs>
// </session>`,

//     search: (query) => `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <searchResults>
//         <query>${query}</query>
//         <total>2</total>
//         <songs>
//             <song>
//                 <id>5</id>
//                 <title>SEARCH RESULT FOR "${query}"</title>
//                 <artist>TEST ARTIST</artist>
//                 <artwork>assets/default-artwork.svg</artwork>
//                 <votes>0</votes>
//                 <can_vote>1</can_vote>
//                 <can_add>1</can_add>
//                 <has_voted>0</has_voted>
//                 <in_playlist>0</in_playlist>
//             </song>
//         </songs>
//     </searchResults>
// </session>`,

//     vote: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <result>success</result>
//     <message>Vote added successfully</message>
// </session>`,

//     add: `<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <result>success</result>
//     <message>Song added to playlist</message>
// </session>`
// };

// // MIME types for static files
// const mimeTypes = {
//     '.html': 'text/html',
//     '.css': 'text/css',
//     '.js': 'application/javascript',
//     '.svg': 'image/svg+xml',
//     '.jpg': 'image/jpeg',
//     '.png': 'image/png',
//     '.ico': 'image/x-icon'
// };

// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     const query = parsedUrl.query;

//     // CORS headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.writeHead(200);
//         res.end();
//         return;
//     }

//     // Handle API requests
//     if (pathname === '/getData.php') {
//         const action = query.action || 'session';
        
//         res.setHeader('Content-Type', 'application/xml; charset=utf-8');
//         res.writeHead(200);
        
//         if (action === 'search' && query.query) {
//             res.end(mockResponses.search(query.query));
//         } else if (mockResponses[action]) {
//             res.end(mockResponses[action]);
//         } else {
//             res.end(`<?xml version="1.0" encoding="utf-8"?>
// <session>
//     <error>
//         <error_id>404</error_id>
//         <error_message><![CDATA[Unknown action: ${action}]]></error_message>
//         <terminal_error>0</terminal_error>
//     </error>
// </session>`);
//         }
//         return;
//     }

//     // Serve static files
//     let filePath = pathname === '/' ? '/index.html' : pathname;
//     filePath = path.join(__dirname, filePath);

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('File not found');
//             return;
//         }

//         const ext = path.extname(filePath);
//         const contentType = mimeTypes[ext] || 'text/plain';
        
//         res.writeHead(200, {'Content-Type': contentType});
//         res.end(data);
//     });
// });

// server.listen(PORT, () => {
//     console.log(`🎵 MUSICA Development Server running at http://localhost:${PORT}`);
//     console.log(`📱 Open http://localhost:${PORT} in your browser`);
//     console.log(`🔧 API endpoint: http://localhost:${PORT}/getData.php`);
//     console.log(`⏹️  Press Ctrl+C to stop the server`);
// });

// // Handle graceful shutdown
// process.on('SIGINT', () => {
//     console.log('\n👋 Shutting down MUSICA server...');
//     server.close(() => {
//         console.log('✅ Server stopped');
//         process.exit(0);
//     });
// });
