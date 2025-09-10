    
// UI handling for MUSICA app
class MusicaUI {
    constructor() {
        // Do not set any tab as active on landing
        this.currentTab = null;
        this.searchDebounceTimer = null;
        this.refreshTimer = null;
        this.isLoading = false;
        this.tooltipShown = localStorage.getItem(CONFIG.UI.TOOLTIP_STORAGE_KEY) === 'true';
        
        // DOM elements
        this.elements = {};
        
        // Initialize UI
        this.init();
    }
    
    // Initialize UI
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupAutoRefresh();
        // Remove all active states from tab buttons and tab content on page load
        if (this.elements.tabBtns && this.elements.tabBtns.length) {
            this.elements.tabBtns.forEach(btn => btn.classList.remove('active'));
        }
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        // Only activate tab if user preferences exist
        const preferences = JSON.parse(localStorage.getItem(CONFIG.STORAGE.USER_PREFERENCES) || '{}');
        if (preferences.selectedTab) {
            this.switchTab(preferences.selectedTab);
        }
    }
    
    // Cache DOM elements
    cacheElements() {
        this.elements = {
            // Navigation
            hamburgerMenu: document.getElementById('hamburgerMenu'),
            searchInput: document.getElementById('searchInput'),
            
            // Tabs
            tabBtns: document.querySelectorAll('.tab-btn'),
            creditsCount: document.getElementById('creditsCount'),
            timeRemaining: document.getElementById('timeRemaining'),
            
            // Content sections
            nowPlaying: document.getElementById('nowPlaying'),
            currentSong: document.getElementById('currentSong'),
            refreshBtn: document.getElementById('refreshBtn'),
            upNext: document.getElementById('upNext'),
            songList: document.getElementById('songList'),
            
            // Browse sections
            browseSection: document.getElementById('browseSection'),
            songsTitle: document.getElementById('songs-title-content'),
            songsTags: document.getElementById('songs-tags-content'),
            alphabetNav: document.getElementById('alphabetNav'),
            tagsNav: document.getElementById('tagsNav'),
            songResults: document.getElementById('songResults'),
            tagResults: document.getElementById('tagResults'),
            
            // Playlist
            playlistBtn: document.getElementById('playlistBtn'),
            
            // UI elements
            tooltip: document.getElementById('voteTooltip'),
            tooltipClose: document.getElementById('tooltipClose'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            errorMessage: document.getElementById('errorMessage'),
            errorText: document.getElementById('errorText'),
            errorClose: document.getElementById('errorClose')
        };
    }

    // Update playlist (Up Next)
    
    // Bind event handlers
    bindEvents() {
        // Search
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            this.elements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        // Tabs
        if (this.elements.tabBtns && this.elements.tabBtns.length) {
            this.elements.tabBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tab = e.target.dataset.tab;
                    // On index.html, navigate to songs-tags.html when Songs by Tags is clicked
                    if (window.location.pathname.endsWith('index.html') && tab === 'songs-tags') {
                        window.location.href = '/songs-tags.html';
                        return;
                    }
                    this.switchTab(tab);
                });
            });
        }

        // Refresh
        if (this.elements.refreshBtn) {
            this.elements.refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // Playlist
        if (this.elements.playlistBtn) {
            this.elements.playlistBtn.addEventListener('click', () => {
                this.showPlaylist();
            });
        }

        // Tooltip
        if (this.elements.tooltipClose) {
            this.elements.tooltipClose.addEventListener('click', () => {
                this.hideTooltip();
            });
        }

        // Error message
        if (this.elements.errorClose) {
            this.elements.errorClose.addEventListener('click', () => {
                this.hideError();
            });
        }

        // Hamburger menu
        if (this.elements.hamburgerMenu) {
            this.elements.hamburgerMenu.addEventListener('click', () => {
                this.toggleMenu();
            });
        }
        
        // Window events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        window.addEventListener('beforeunload', () => {
            this.saveUserPreferences();
        });
    }
    
    // Setup auto refresh
    setupAutoRefresh() {
        this.refreshTimer = setInterval(() => {
            if (!this.isLoading) {
                this.refreshData(true); // Silent refresh
            }
        }, CONFIG.UI.REFRESH_INTERVAL);
    }
    
    // Load user preferences
    loadUserPreferences() {
        const preferences = JSON.parse(localStorage.getItem(CONFIG.STORAGE.USER_PREFERENCES) || '{}');
        
        if (preferences.selectedTab) {
            this.switchTab(preferences.selectedTab);
        }
        
        if (preferences.lastSearch) {
            this.elements.searchInput.value = preferences.lastSearch;
        }
    }
    
    // Save user preferences
    saveUserPreferences() {
        const preferences = {
            selectedTab: this.currentTab,
            lastSearch: this.elements.searchInput.value
        };
        
        localStorage.setItem(CONFIG.STORAGE.USER_PREFERENCES, JSON.stringify(preferences));
    }
    
    // Handle search with debouncing
    handleSearch(query) {
        clearTimeout(this.searchDebounceTimer);
        
        this.searchDebounceTimer = setTimeout(async () => {
            if (query.trim().length >= 3) {
                await this.performSearch(query.trim());
            } else if (query.trim().length === 0) {
                this.clearSearchResults();
            }
        }, CONFIG.UI.SEARCH_DEBOUNCE_DELAY);
    }
    
    // Perform search
    async performSearch(query) {
        this.showLoading();
        
        try {
            const response = await musicaAPI.searchSongs(query);
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.displaySearchResults(response.searchResults);
            
        } catch (error) {
            CONFIG.error('Search failed', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // Clear search results
    clearSearchResults() {
        this.elements.songResults.innerHTML = '';
        this.elements.tagResults.innerHTML = '';
    }
    
    // Display search results
    displaySearchResults(results) {
        if (!results || !results.songs || results.songs.length === 0) {
            this.elements.songResults.innerHTML = `
                <div class="no-results">
                    <p>${CONFIG.ERRORS.NO_RESULTS}</p>
                </div>
            `;
            return;
        }
        
        const songsHTML = results.songs.map(song => this.createSongHTML(song)).join('');
        this.elements.songResults.innerHTML = songsHTML;
        
        // Bind events to new elements
        this.bindSongEvents();
        
        // Add fade-in animation
        this.elements.songResults.classList.add(CONFIG.ANIMATIONS.FADE_IN);
    }
    
    // Switch tabs
    switchTab(tabName) {
        // Update tab buttons
        this.elements.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-content`);
        });
        
        this.currentTab = tabName;
        
        // Load tab-specific data
        this.loadTabData(tabName);
    }
    
    // Load tab-specific data
    async loadTabData(tabName) {
        if (tabName === 'songs-title') {
            await this.loadAlphabetNavigation();
        } else if (tabName === 'songs-tags') {
            await this.loadTagsNavigation();
        }
    }
    
    // Load alphabet navigation
    async loadAlphabetNavigation() {
        try {
            const response = await musicaAPI.getAlphabetList();
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.displayAlphabetNavigation(response.alphabetList || []);
            
        } catch (error) {
            CONFIG.error('Failed to load alphabet navigation', error);
            this.showError(error.message);
        }
    }
    
    // Display alphabet navigation
    displayAlphabetNavigation(alphabetList) {
        const alphabetHTML = alphabetList.map(item => `
            <button class="alphabet-btn" data-letter="${item.value}">
                ${item.letter}
            </button>
        `).join('');
        
        this.elements.alphabetNav.innerHTML = alphabetHTML;
        
        // Bind events
        this.elements.alphabetNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('alphabet-btn')) {
                this.browseSongsByLetter(e.target.dataset.letter);
                
                // Update active state
                this.elements.alphabetNav.querySelectorAll('.alphabet-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }
    
    // Load tags navigation
    async loadTagsNavigation() {
        try {
            const response = await musicaAPI.getTagsList();
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.displayTagsNavigation(response.tagsList || []);
            
        } catch (error) {
            CONFIG.error('Failed to load tags navigation', error);
            this.showError(error.message);
        }
    }
    
    // Display tags navigation
    displayTagsNavigation(tagsList) {
        const tagsHTML = tagsList.map(item => `
            <button class="tag-btn" data-tag="${item.value}">
                ${item.name}
            </button>
        `).join('');
        
        this.elements.tagsNav.innerHTML = tagsHTML;
        
        // Bind events
        this.elements.tagsNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-btn')) {
                this.browseSongsByTag(e.target.dataset.tag);
                
                // Update active state
                this.elements.tagsNav.querySelectorAll('.tag-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }
    
    // Browse songs by letter
    async browseSongsByLetter(letter) {
        this.showLoading();
        
        try {
            const response = await musicaAPI.browseSongsByLetter(letter);
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.displayBrowseResults(response.songs || [], 'songResults');
            
        } catch (error) {
            CONFIG.error('Failed to browse songs by letter', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // Browse songs by tag
    async browseSongsByTag(tag) {
        this.showLoading();
        
        try {
            const response = await musicaAPI.browseSongsByTag(tag);
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.displayBrowseResults(response.songs || [], 'tagResults');
            
        } catch (error) {
            CONFIG.error('Failed to browse songs by tag', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    // Display browse results
    displayBrowseResults(songs, containerId) {
        const container = document.getElementById(containerId);
        
        if (!songs || songs.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>${CONFIG.ERRORS.NO_RESULTS}</p>
                </div>
            `;
            return;
        }
        
        const songsHTML = songs.map(song => this.createSongHTML(song)).join('');
        container.innerHTML = songsHTML;
        
        // Bind events to new elements
        this.bindSongEvents();
        
        // Add fade-in animation
        container.classList.add(CONFIG.ANIMATIONS.FADE_IN);
    }
    
    // Create song HTML
    createSongHTML(song) {
        let voteButton = '';
        if (song.canVote) {
            voteButton = `
                <button class="vote-btn${song.hasVoted ? ' voted' : ''}" 
                        data-song-id="${song.id}" 
                        data-action="vote">
                    <span class="${song.hasVoted ? 'vote-count-filled' : 'vote-count-box'}">${song.votes || 0}</span>
                </button>
            `;
        } else {
            voteButton = `<span class="vote-count-hollow">${song.votes || 0}</span>`;
        }

        // Only show shoutout box for songs requested by the user
        let shoutoutBox = '';
        if (song.requestedByUser) {
            shoutoutBox = `
                <span class="shoutout-box" title="Shoutout">
                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.75 21.2093H14.75L9.1875 24.8904C8.99978 25.0149 8.7816 25.0864 8.55625 25.0972C8.3309 25.108 8.10683 25.0578 7.90794 24.9518C7.70905 24.8459 7.5428 24.6882 7.42693 24.4956C7.31105 24.303 7.2499 24.0827 7.25 23.8582V21.2093C3.5 21.2093 1 18.7221 1 14.9913V7.52959C1 3.79875 3.5 1.31152 7.25 1.31152H19.75C23.5 1.31152 26 3.79875 26 7.52959V14.9913C26 18.7221 23.5 21.2093 19.75 21.2093Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.875 11.915H15.5323C14.9117 11.915 14.4921 11.4984 14.4921 10.997V9.8475C14.4921 9.34604 14.9117 8.92944 15.5323 8.92944H16.8348C17.403 8.92944 17.875 9.34604 17.875 9.8475V11.915ZM17.875 11.915C17.875 14.0675 17.4205 14.43 16.0481 15.1475ZM12.5079 11.915H10.1652C9.54458 11.915 9.125 11.4984 9.125 10.997V9.8475C9.125 9.34604 9.54458 8.92944 10.1652 8.92944H11.4677C12.0358 8.92944 12.5079 9.34604 12.5079 9.8475V11.915ZM12.5079 11.915C12.5079 14.0675 12.0533 14.43 10.6809 15.1475Z" fill="#BFBFBF"/>
                        <path d="M17.875 11.915H15.5323C14.9117 11.915 14.4921 11.4984 14.4921 10.997V9.8475C14.4921 9.34604 14.9117 8.92944 15.5323 8.92944H16.8348C17.403 8.92944 17.875 9.34604 17.875 9.8475V11.915ZM17.875 11.915C17.875 14.0675 17.4205 14.43 16.0481 15.1475M12.5079 11.915H10.1652C9.54458 11.915 9.125 11.4984 9.125 10.997V9.8475C9.125 9.34604 9.54458 8.92944 10.1652 8.92944H11.4677C12.0358 8.92944 12.5079 9.34604 12.5079 9.8475V11.915ZM12.5079 11.915C12.5079 14.0675 12.0533 14.43 10.6809 15.1475" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            `;
        }

        const addButton = song.canAdd && !song.inPlaylist ? `
            <button class="add-btn" 
                    data-song-id="${song.id}" 
                    data-action="add">
                +
            </button>
        ` : '';

        return `
            <div class="song-item" data-song-id="${song.id}">
                <div class="song-artwork" style="background-image: url('${song.artwork || 'assets/default-artwork.svg'}')"></div>
                <div class="song-info">
                    <div class="song-title">${song.title || 'Unknown Title'}</div>
                    <div class="song-artist">${song.artist || 'Unknown Artist'}</div>
                </div>
                ${voteButton}
                ${shoutoutBox}
                ${addButton}
            </div>
        `;
    }
    
    // Bind events to song elements
    bindSongEvents() {
        // Vote buttons
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.voteSong(e.target.dataset.songId);
                this.showTooltipIfNeeded();
            });
        });
        
        // Add buttons
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addSong(e.target.dataset.songId);
            });
        });
    }
    
    // Vote for song
    async voteSong(songId) {
        try {
            const response = await musicaAPI.voteSong(songId);
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.showMessage(CONFIG.MESSAGES.VOTE_SUCCESS);
            this.refreshData(true); // Silent refresh
            
        } catch (error) {
            CONFIG.error('Failed to vote for song', error);
            this.showError(error.message);
        }
    }
    
    // Add song to playlist
    async addSong(songId) {
        try {
            const response = await musicaAPI.addSong(songId);
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.showMessage(CONFIG.MESSAGES.SONG_ADDED);
            this.refreshData(true); // Silent refresh
            
        } catch (error) {
            CONFIG.error('Failed to add song', error);
            this.showError(error.message);
        }
    }
    
    // Show tooltip for first-time users
    showTooltipIfNeeded() {
        if (!this.tooltipShown) {
            this.elements.tooltip.style.display = 'block';
            this.tooltipShown = true;
            localStorage.setItem(CONFIG.UI.TOOLTIP_STORAGE_KEY, 'true');
        }
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.style.display = 'none';
    }
    
    // Refresh data
    async refreshData(silent = false) {
        if (!silent) {
            this.showLoading();
        }
        
        try {
            const response = await musicaAPI.getSession();
            
            if (response.error) {
                this.showError(response.error.message);
                return;
            }
            
            this.updateSessionInfo(response.sessionInfo);
            this.updateCurrentSong(response.currentSong);
            this.updatePlaylist(response.songs);
            
            if (!silent) {
                this.showMessage(CONFIG.MESSAGES.REFRESH_SUCCESS);
            }
            
        } catch (error) {
            CONFIG.error('Failed to refresh data', error);
            if (!silent) {
                this.showError(error.message);
            }
        } finally {
            if (!silent) {
                this.hideLoading();
            }
        }
    }
    
    // Update session info
    updateSessionInfo(sessionInfo) {
        if (sessionInfo) {
            this.elements.creditsCount.textContent = sessionInfo.credits || '0';
            this.elements.timeRemaining.textContent = sessionInfo.timeRemaining || '0:00';
        }
    }
    
    // Update current song
    updateCurrentSong(currentSong) {
        if (currentSong) {
            this.elements.currentSong.innerHTML = `
                <div class="song-artwork" style="background-image: url('${currentSong.artwork || 'assets/default-artwork.svg'}')"></div>
                <div class="song-info">
                    <div class="song-title">${currentSong.title || 'No song playing'}</div>
                    <div class="song-artist">${currentSong.artist || ''}</div>
                </div>
                <div class="vote-count-square">${currentSong.votes || '0'}</div>
            `;
        } else {
            this.elements.currentSong.innerHTML = `
                <div class="song-artwork"></div>
                <div class="song-info">
                    <div class="song-title">No song playing</div>
                    <div class="song-artist">Waiting for music...</div>
                </div>
                <div class="vote-count-square">0</div>
            `;
        }
    }
    
    // Update playlist (Up Next)
    updatePlaylist(songs) {
        // Get the containers for the first and other up-next songs
        const firstSongContainer = document.getElementById('upNextFirstSong');
        const otherSongsContainer = document.getElementById('upNextOtherSongs');

        if (!songs || songs.length === 0) {
            if (firstSongContainer) firstSongContainer.innerHTML = '';
            if (otherSongsContainer) {
                otherSongsContainer.innerHTML = `<div class="no-results"><p>No songs in playlist</p></div>`;
            }
            return;
        }

        // First up-next song in the white-outline box
        if (firstSongContainer) {
            // Render first up-next song with a special hollow box (no plus icon, right-aligned)
            const song = { ...songs[0] };
            // Use a custom render for this special case
            firstSongContainer.innerHTML = `
                <div class="song-artwork" style="background-image: url('${song.artwork || 'assets/default-artwork.svg'}')"></div>
                <div class="song-info">
                    <div class="song-title">${song.title || 'Unknown Title'}</div>
                    <div class="song-artist">${song.artist || 'Unknown Artist'}</div>
                </div>
                <span class="vote-count-hollow-upnext">${song.votes || 0}</span>
            `;
        }

        // Remaining up-next songs
        if (otherSongsContainer) {
            if (songs.length > 1) {
                otherSongsContainer.innerHTML = songs.slice(1).map(song => {
                    // Use filled background for the vote box in these songs
                    const isVoted = song.hasVoted;
                    const plusIcon = `<span class=\"vote-plus-icon\">+</span>`;
                    const voteBox = isVoted
                        ? `<span class=\"vote-count-filled-next\">${song.votes || 0}</span>`
                        : `<span class=\"vote-count-hollow-upnext\">${plusIcon}<span class=\"vote-count-number\">${song.votes || 0}</span></span>`;
                    return `
                        <div class="song-item">
                            <div class="song-artwork" style="background-image: url('${song.artwork || 'assets/default-artwork.svg'}')"></div>
                            <div class="song-info">
                                <div class="song-title">${song.title || 'Unknown Title'}</div>
                                <div class="song-artist">${song.artist || 'Unknown Artist'}</div>
                            </div>
                            ${voteBox}
                        </div>
                    `;
                }).join('');
            } else {
                otherSongsContainer.innerHTML = '';
            }
        }

        // Bind events to new elements
        this.bindSongEvents();
    }
    
    // Show playlist (placeholder for future implementation)
    showPlaylist() {
        // This could open a modal or navigate to a playlist page
        CONFIG.log('Playlist button clicked');
    }
    
    // Toggle hamburger menu
    toggleMenu() {
        // This could open a side menu
        CONFIG.log('Menu button clicked');
    }
    
    // Handle window resize
    handleResize() {
        // Adjust UI for different screen sizes if needed
        CONFIG.log('Window resized');
    }
    
    // Show loading spinner
    showLoading() {
        this.isLoading = true;
        this.elements.loadingSpinner.style.display = 'flex';
    }
    
    // Hide loading spinner
    hideLoading() {
        this.isLoading = false;
        this.elements.loadingSpinner.style.display = 'none';
    }
    
    // Show error message
    showError(message) {
        this.elements.errorText.textContent = message;
        this.elements.errorMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }
    
    // Hide error message
    hideError() {
        this.elements.errorMessage.style.display = 'none';
    }
    
    // Show success message
    showMessage(message) {
        // You could implement a toast notification system here
        CONFIG.log('Message:', message);
    }
    
    // Cleanup
    destroy() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
        }
        
        this.saveUserPreferences();
    }
    
}

// Create global UI instance
const musicaUI = new MusicaUI();
