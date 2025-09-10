// // Configuration settings for the MUSICA app
// const CONFIG = {
//     // API endpoints
//     API: {
//         BASE_URL: window.location.origin,
//         ENDPOINTS: {
//             GET_DATA: '/getData.php',
//             ERROR_PAGE: '/error.php'
//         }
//     },
    
//     // User interface settings
//     UI: {
//         TOOLTIP_STORAGE_KEY: 'musica_tooltip_shown',
//         REFRESH_INTERVAL: 30000, // 30 seconds
//         SEARCH_DEBOUNCE_DELAY: 500, // 500ms
//         FADE_ANIMATION_DURATION: 300,
//         LOAD_MORE_THRESHOLD: 100, // px from bottom
//     },
    
//     // API request parameters
//     REQUEST: {
//         DEFAULT_PARAMS: {
//             xml: '1'
//         },
//         SEARCH_PARAMS: {
//             action: 'search'
//         },
//         BROWSE_PARAMS: {
//             action: 'browse'
//         },
//         VOTE_PARAMS: {
//             action: 'vote'
//         },
//         ADD_PARAMS: {
//             action: 'add'
//         }
//     },
    
//     // Error codes and messages
//     ERRORS: {
//         NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
//         SERVER_ERROR: 'Server error. Please try again later.',
//         NO_RESULTS: 'No results found.',
//         SEARCH_TOO_SHORT: 'Please enter at least 3 characters to search.',
//         SESSION_EXPIRED: 'Your session has expired. Please refresh the page.',
//         BANNED_USER: 'You have been banned from using the MUSICA Jukebox.',
//         CREDITS_EXHAUSTED: 'You cannot request any more songs. You can still upvote songs on the Playlist.',
//         GENERAL_ERROR: 'An error occurred. Please try again.'
//     },
    
//     // Success messages
//     MESSAGES: {
//         VOTE_SUCCESS: 'Vote added successfully!',
//         SONG_ADDED: 'Song added to playlist!',
//         REFRESH_SUCCESS: 'Playlist refreshed!'
//     },
    
//     // App states
//     STATES: {
//         LOADING: 'loading',
//         READY: 'ready',
//         ERROR: 'error',
//         NO_SESSION: 'no_session'
//     },
    
//     // Local storage keys
//     STORAGE: {
//         USER_PREFERENCES: 'musica_user_preferences',
//         LAST_SEARCH: 'musica_last_search',
//         SELECTED_TAB: 'musica_selected_tab',
//         ALPHABET_FILTER: 'musica_alphabet_filter',
//         TAG_FILTER: 'musica_tag_filter'
//     },
    
//     // Animation and transition settings
//     ANIMATIONS: {
//         FADE_IN: 'fade-in',
//         PULSE: 'pulse',
//         SLIDE_UP: 'slide-up',
//         BOUNCE: 'bounce'
//     },
    
//     // Breakpoints for responsive design (should match CSS)
//     BREAKPOINTS: {
//         SMALL_PHONE: 320,
//         LARGE_PHONE: 375,
//         TABLET: 568,
//         LARGE_TABLET: 768,
//         DESKTOP: 1024,
//         LARGE_DESKTOP: 1200
//     },
    
//     // Debug mode (set to false in production)
//     DEBUG: false
// };

// // Development vs Production configuration
// if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     CONFIG.DEBUG = true;
//     CONFIG.UI.REFRESH_INTERVAL = 10000; // Shorter refresh interval for development
// }

// // Utility function to get config values safely
// CONFIG.get = function(path, defaultValue = null) {
//     return path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : defaultValue, this);
// };

// // Utility function to log debug messages
// CONFIG.log = function(message, data = null) {
//     if (this.DEBUG) {
//         console.log(`[MUSICA] ${message}`, data || '');
//     }
// };

// // Utility function to log errors
// CONFIG.error = function(message, error = null) {
//     console.error(`[MUSICA ERROR] ${message}`, error || '');
// };

// // Export for use in other modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = CONFIG;
// }
