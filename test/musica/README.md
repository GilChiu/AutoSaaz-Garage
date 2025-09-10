# MUSICA - Mobile-First Music Jukebox Frontend

A responsive, mobile-first frontend for the MUSICA music jukebox system. Built with vanilla HTML, CSS, and JavaScript - no frameworks required.

## Features

- **Mobile-First Design**: Optimized for mobile devices, tablets, and larger phones
- **Responsive Layout**: Adapts seamlessly to different screen sizes
- **Real-time Updates**: Automatic refresh of playlist and current song data
- **Search Functionality**: Search for songs and artists with debounced input
- **Browse Navigation**: Browse songs by alphabet or tags
- **Voting System**: Vote for songs in the playlist
- **Add to Playlist**: Add songs to the current session playlist
- **Session Management**: Handles user sessions and credits
- **Offline Detection**: Graceful handling of network connectivity issues
- **Accessibility**: Built with accessibility best practices

## Technology Stack

- **HTML5**: Semantic markup for better accessibility
- **CSS3**: Modern CSS with Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript
- **Web APIs**: Fetch, Local Storage, DOM APIs

## Project Structure

```
musica/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main styles (mobile-first)
│   └── responsive.css      # Responsive breakpoints
├── js/
│   ├── config.js           # Configuration and constants
│   ├── api.js              # API handling and data processing
│   ├── ui.js               # UI components and interactions
│   └── app.js              # Main application logic
├── assets/                 # Images and media files
│   ├── background.jpg      # Main background image
│   ├── default-artwork.jpg # Default song artwork
│   └── icons/              # UI icons and graphics
└── README.md               # This file
```

## Setup and Installation

1. **Upload Files**: Upload all files to your web server
2. **Add Assets**: Place background images and artwork in the `assets/` folder
3. **Configure API**: Update `js/config.js` with your API endpoints if needed
4. **Test**: Open `index.html` in a web browser

## Configuration

### API Endpoints
Update the API configuration in `js/config.js`:

```javascript
API: {
    BASE_URL: window.location.origin,
    ENDPOINTS: {
        GET_DATA: '/getData.php',
        ERROR_PAGE: '/error.php'
    }
}
```

### UI Settings
Customize UI behavior in `js/config.js`:

```javascript
UI: {
    REFRESH_INTERVAL: 30000,        // Auto-refresh interval (ms)
    SEARCH_DEBOUNCE_DELAY: 500,     // Search input delay (ms)
    TOOLTIP_STORAGE_KEY: 'musica_tooltip_shown'
}
```

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: ES6+, CSS Grid, Flexbox, Fetch API, Local Storage

## Responsive Breakpoints

- **Small phones**: 320px and up
- **Large phones**: 375px and up
- **Tablets**: 568px and up
- **Large tablets**: 768px and up
- **Desktop**: 1024px and up
- **Large desktop**: 1200px and up

## API Integration

The frontend expects XML responses from the backend with the following structure:

### Session Data
```xml
<session>
    <sessionInfo>
        <session_id>123</session_id>
        <credits>3</credits>
        <time_remaining>4:39</time_remaining>
    </sessionInfo>
</session>
```

### Song Data
```xml
<songs>
    <song>
        <id>1</id>
        <title>Song Title</title>
        <artist>Artist Name</artist>
        <artwork>path/to/artwork.jpg</artwork>
        <votes>42</votes>
        <can_vote>1</can_vote>
        <can_add>1</can_add>
    </song>
</songs>
```

### Error Handling
```xml
<error>
    <error_id>100</error_id>
    <error_message><![CDATA[Error message]]></error_message>
    <terminal_error>1</terminal_error>
</error>
```

## User Interface Features

### First-Time User Tooltip
- Shows voting instruction tooltip on first visit
- Stores preference in localStorage
- Won't show again after dismissal

### Search Functionality
- Minimum 3 characters to trigger search
- Debounced input for performance
- Real-time results display

### Voting System
- Visual feedback for voted songs
- Updates vote counts in real-time
- Handles voting restrictions

### Navigation
- Tab-based navigation between song lists and tags
- Alphabet navigation for browsing songs
- Tag-based filtering

## Performance Optimizations

- **Debounced Search**: Prevents excessive API calls
- **Lazy Loading**: Images loaded as needed
- **Efficient DOM Updates**: Minimal DOM manipulation
- **CSS Animations**: Hardware-accelerated transitions
- **Local Storage**: Caches user preferences

## Development

### Debug Mode
Enable debug mode by setting `CONFIG.DEBUG = true` in `config.js`:
- Enables console logging
- Exposes debug objects to window
- Shows performance metrics

### Adding New Features
1. Add configuration to `config.js`
2. Implement API methods in `api.js`
3. Add UI components to `ui.js`
4. Update styles in CSS files
5. Test across different screen sizes

## Deployment

1. **Minify Files**: Minify CSS and JavaScript for production
2. **Optimize Images**: Compress background and artwork images
3. **Cache Headers**: Set appropriate cache headers for static assets
4. **HTTPS**: Ensure secure connection for API calls
5. **Testing**: Test on various devices and browsers

## Known Issues

- **iOS Safari**: Viewport height issues with bottom bars
- **Android Chrome**: Touch event handling differences
- **Internet Explorer**: Not supported (requires modern browser features)

## Future Enhancements

- **Playlist Modal**: Full-screen playlist view
- **Dark/Light Theme**: User-selectable themes
- **Push Notifications**: Real-time updates
- **Progressive Web App**: Offline functionality
- **Accessibility**: Screen reader improvements

## Support

For support and bug reports, contact the development team or create an issue in the project repository.

## License

This project is proprietary software for the MUSICA jukebox system.
