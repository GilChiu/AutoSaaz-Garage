// function fetchSongs() {
//     fetch('getData.php?action=session')
//         .then(response => response.text())
//         .then(xmlString => {
//             const parser = new DOMParser();
//             const xml = parser.parseFromString(xmlString, 'application/xml');
//             const songNodes = xml.querySelectorAll('songs > song');
//             const songs = Array.from(songNodes).map(song => ({
//                 id: song.querySelector('id')?.textContent,
//                 title: song.querySelector('title')?.textContent,
//                 artist: song.querySelector('artist')?.textContent,
//                 artwork: song.querySelector('artwork')?.textContent,
//                 votes: song.querySelector('votes')?.textContent,
//                 can_vote: song.querySelector('can_vote')?.textContent,
//                 can_add: song.querySelector('can_add')?.textContent,
//                 has_voted: song.querySelector('has_voted')?.textContent,
//                 in_playlist: song.querySelector('in_playlist')?.textContent
//             }));
//             console.log('Songs:', songs);
//         })
//         .catch(err => console.error('Error fetching songs:', err));
// }

// Call the function on page load for now
window.addEventListener('DOMContentLoaded', fetchSongs);// Main application entry point for MUSICA
    // Redirect to /songs-title when Songs by Title tab/button is clicked
    document.addEventListener('DOMContentLoaded', function() {
      var songsTitleTabs = document.querySelectorAll('[data-tab="songs-title"], .tab-btn.songs-title');
      songsTitleTabs.forEach(function(tab) {
        tab.style.cursor = 'pointer';
        tab.addEventListener('click', function() {
          window.location.href = '/songs-title.html';
        });
      });
      var songsTagsTabs = document.querySelectorAll('[data-tab="songs-tags"], .tab-btn.songs-tags');
      songsTagsTabs.forEach(function(tab) {
        tab.style.cursor = 'pointer';
        tab.addEventListener('click', function() {
          window.location.href = '/songs-tags.html';
        });
      });
    });
// Main application entry point for MUSICA
class MusicaApp {
    constructor() {
        this.state = CONFIG.STATES.LOADING;
        this.initialized = false;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    // Initialize the application
    async init() {
        CONFIG.log('Initializing MUSICA app');
        
        try {
            // Check for session and initialize
            await this.checkSession();
            
            // Initialize components
            this.setupErrorHandling();
            this.setupPerformanceMonitoring();
            
            // Load initial data
            await this.loadInitialData();
            
            this.state = CONFIG.STATES.READY;
            this.initialized = true;
            
            CONFIG.log('MUSICA app initialized successfully');
            
        } catch (error) {
            CONFIG.error('Failed to initialize app', error);
            this.state = CONFIG.STATES.ERROR;
            this.handleInitializationError(error);
        }
    }
    
    // Check session status
    async checkSession() {
        try {
            const response = await musicaAPI.getSession();
            
            if (response.error) {
                if (response.error.isTerminal) {
                    // Terminal error will redirect automatically
                    return;
                } else {
                    // Non-terminal error, show message but continue
                    musicaUI.showError(response.error.message);
                }
            }
            
            if (!response.sessionInfo || response.sessionInfo.sessionId === '0') {
                this.state = CONFIG.STATES.NO_SESSION;
                this.handleNoSession();
                return;
            }
            
            // Session is valid, update UI
            musicaUI.updateSessionInfo(response.sessionInfo);
            
        } catch (error) {
            CONFIG.error('Session check failed', error);
            throw error;
        }
    }
    
    // Handle no active session
    handleNoSession() {
        musicaUI.showError('No active session. Please wait for the next session to start.');
        
        // Poll for active session every 30 seconds
        setInterval(async () => {
            try {
                const response = await musicaAPI.getSession();
                if (response.sessionInfo && response.sessionInfo.sessionId !== '0') {
                    location.reload(); // Reload page when session becomes active
                }
            } catch (error) {
                CONFIG.error('Session polling failed', error);
            }
        }, 30000);
    }
    
    // Load initial data
    async loadInitialData() {
        if (this.state === CONFIG.STATES.NO_SESSION) {
            return;
        }
        
        try {
            // Load current song and playlist
            await musicaUI.refreshData(true);
            
            // Load alphabet navigation for default tab
            await musicaUI.loadTabData('songs-title');
            
        } catch (error) {
            CONFIG.error('Failed to load initial data', error);
            // Don't throw error here, let the app continue with limited functionality
            musicaUI.showError('Some features may not work properly. Please refresh the page.');
        }
    }
    
    // Setup global error handling
    setupErrorHandling() {
        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            CONFIG.error('Uncaught error', event.error);
            this.handleGlobalError(event.error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            CONFIG.error('Unhandled promise rejection', event.reason);
            this.handleGlobalError(event.reason);
            event.preventDefault(); // Prevent console error
        });
        
        // Handle fetch errors
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                return await originalFetch(...args);
            } catch (error) {
                CONFIG.error('Fetch error', error);
                throw error;
            }
        };
    }
    
    // Setup performance monitoring
    setupPerformanceMonitoring() {
        if (CONFIG.DEBUG) {
            // Monitor page load performance
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                CONFIG.log('Page load performance', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    totalTime: perfData.loadEventEnd - perfData.fetchStart
                });
            });
            
            // Monitor API response times
            const originalMakeRequest = musicaAPI.makeRequest.bind(musicaAPI);
            musicaAPI.makeRequest = async function(...args) {
                const startTime = performance.now();
                try {
                    const result = await originalMakeRequest(...args);
                    const endTime = performance.now();
                    CONFIG.log(`API request completed in ${endTime - startTime}ms`);
                    return result;
                } catch (error) {
                    const endTime = performance.now();
                    CONFIG.log(`API request failed after ${endTime - startTime}ms`);
                    throw error;
                }
            };
        }
    }
    
    // Handle global errors
    handleGlobalError(error) {
        if (!this.initialized) {
            // App is still initializing, don't show UI errors
            return;
        }
        
        // Check if it's a network error
        if (error.message && error.message.includes('fetch')) {
            musicaUI.showError(CONFIG.ERRORS.NETWORK_ERROR);
        } else {
            musicaUI.showError(CONFIG.ERRORS.GENERAL_ERROR);
        }
    }
    
    // Handle initialization errors
    handleInitializationError(error) {
        // Show basic error message
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #1a1a1a;
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h1 style="color: #d4af37; margin-bottom: 20px;">MUSICA</h1>
                    <p style="margin-bottom: 20px;">Failed to initialize the application.</p>
                    <p style="margin-bottom: 30px; color: #ccc;">${error.message}</p>
                    <button onclick="location.reload()" style="
                        background: #d4af37;
                        color: #1a1a1a;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: bold;
                    ">Reload Page</button>
                </div>
            </div>
        `;
    }
    
    // Get app state
    getState() {
        return this.state;
    }
    
    // Check if app is ready
    isReady() {
        return this.state === CONFIG.STATES.READY;
    }
    
    // Restart the app
    restart() {
        CONFIG.log('Restarting MUSICA app');
        location.reload();
    }
    
    // Cleanup before page unload
    cleanup() {
        CONFIG.log('Cleaning up MUSICA app');
        
        if (musicaUI) {
            musicaUI.destroy();
        }
        
        // Clear any remaining timers
        clearTimeout();
        clearInterval();
    }
}

// Initialize the application
const musicaApp = new MusicaApp();

// Handle page unload
window.addEventListener('beforeunload', () => {
    musicaApp.cleanup();
});

// Export for debugging (only in development)
if (CONFIG.DEBUG) {
    window.MUSICA = {
        app: musicaApp,
        api: musicaAPI,
        ui: musicaUI,
        config: CONFIG
    };
    CONFIG.log('Debug mode enabled. Access via window.MUSICA');
}
