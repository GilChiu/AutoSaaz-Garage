// API handling for MUSICA app
class MusicaAPI {
    constructor() {
        this.baseUrl = CONFIG.API.BASE_URL;
        this.userValidationID = null;
        this.sessionInfo = null;
        this.isOnline = navigator.onLine;
        
        // Bind event handlers
        this.handleOnlineStatus();
    }
    
    // Handle online/offline status
    handleOnlineStatus() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            CONFIG.log('Connection restored');
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            CONFIG.log('Connection lost');
        });
    }
    
    // Check if user is online
    checkConnection() {
        if (!this.isOnline) {
            throw new Error(CONFIG.ERRORS.NETWORK_ERROR);
        }
    }
    
    // Make API request
    async makeRequest(params = {}) {
        this.checkConnection();
        
        const url = new URL(CONFIG.API.ENDPOINTS.GET_DATA, this.baseUrl);
        
        // Add default parameters
        const allParams = { ...CONFIG.REQUEST.DEFAULT_PARAMS, ...params };
        
        // Add user validation ID if available
        if (this.userValidationID) {
            allParams.userID = this.userValidationID;
        }
        
        // Add parameters to URL
        Object.keys(allParams).forEach(key => {
            if (allParams[key] !== null && allParams[key] !== undefined) {
                url.searchParams.append(key, allParams[key]);
            }
        });
        
        CONFIG.log('Making API request', url.toString());
        
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const xmlText = await response.text();
            CONFIG.log('API response received', xmlText.substring(0, 200) + '...');
            
            return this.parseXMLResponse(xmlText);
            
        } catch (error) {
            CONFIG.error('API request failed', error);
            
            if (error.name === 'TypeError') {
                throw new Error(CONFIG.ERRORS.NETWORK_ERROR);
            } else {
                throw new Error(CONFIG.ERRORS.SERVER_ERROR);
            }
        }
    }
    
    // Parse XML response
    parseXMLResponse(xmlText) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Invalid XML response');
            }
            
            // Check for errors in response
            const errorElement = xmlDoc.querySelector('error');
            if (errorElement) {
                return this.handleAPIError(errorElement);
            }
            
            return this.processXMLData(xmlDoc);
            
        } catch (error) {
            CONFIG.error('XML parsing failed', error);
            throw new Error(CONFIG.ERRORS.SERVER_ERROR);
        }
    }
    
    // Handle API errors
    handleAPIError(errorElement) {
        const errorId = errorElement.querySelector('error_id')?.textContent;
        const errorToken = errorElement.querySelector('error_id_token')?.textContent;
        const errorMessage = errorElement.querySelector('error_message')?.textContent;
        const isTerminal = errorElement.querySelector('terminal_error')?.textContent === '1';
        
        const error = {
            id: errorId,
            token: errorToken,
            message: errorMessage || CONFIG.ERRORS.GENERAL_ERROR,
            isTerminal: isTerminal
        };
        
        CONFIG.log('API returned error', error);
        
        // Handle terminal errors
        if (isTerminal) {
            const errorUrl = `${CONFIG.API.ENDPOINTS.ERROR_PAGE}?e=${errorId}&etkn=${errorToken}`;
            window.location.href = errorUrl;
            return;
        }
        
        return { error: error };
    }
    
    // Process XML data
    processXMLData(xmlDoc) {
        const result = {
            sessionInfo: this.extractSessionInfo(xmlDoc),
            songs: this.extractSongs(xmlDoc),
            currentSong: this.extractCurrentSong(xmlDoc),
            alphabetList: this.extractAlphabetList(xmlDoc),
            tagsList: this.extractTagsList(xmlDoc),
            searchResults: this.extractSearchResults(xmlDoc)
        };
        
        // Update session info
        if (result.sessionInfo) {
            this.sessionInfo = result.sessionInfo;
            if (result.sessionInfo.userValidationID) {
                this.userValidationID = result.sessionInfo.userValidationID;
            }
        }
        
        return result;
    }
    
    // Extract session information
    extractSessionInfo(xmlDoc) {
        const sessionElement = xmlDoc.querySelector('sessionInfo');
        if (!sessionElement) return null;
        
        return {
            sessionId: sessionElement.querySelector('session_id')?.textContent,
            timestamp: sessionElement.querySelector('timestamp')?.textContent,
            sessionTags: sessionElement.querySelector('session_tags')?.textContent,
            performerName: sessionElement.querySelector('performer_name')?.textContent,
            userValidationID: sessionElement.querySelector('userValidationID')?.textContent,
            credits: sessionElement.querySelector('credits')?.textContent,
            timeRemaining: sessionElement.querySelector('time_remaining')?.textContent
        };
    }
    
    // Extract current song
    extractCurrentSong(xmlDoc) {
        const currentElement = xmlDoc.querySelector('currentSong');
        if (!currentElement) return null;
        
        return {
            title: currentElement.querySelector('title')?.textContent,
            artist: currentElement.querySelector('artist')?.textContent,
            artwork: currentElement.querySelector('artwork')?.textContent,
            votes: currentElement.querySelector('votes')?.textContent,
            duration: currentElement.querySelector('duration')?.textContent
        };
    }
    
    // Extract songs list
    extractSongs(xmlDoc) {
        const songsElements = xmlDoc.querySelectorAll('song');
        return Array.from(songsElements).map(song => ({
            id: song.querySelector('id')?.textContent,
            title: song.querySelector('title')?.textContent,
            artist: song.querySelector('artist')?.textContent,
            artwork: song.querySelector('artwork')?.textContent,
            votes: song.querySelector('votes')?.textContent,
            canVote: song.querySelector('can_vote')?.textContent === '1',
            canAdd: song.querySelector('can_add')?.textContent === '1',
            hasVoted: song.querySelector('has_voted')?.textContent === '1',
            inPlaylist: song.querySelector('in_playlist')?.textContent === '1'
        }));
    }
    
    // Extract alphabet list
    extractAlphabetList(xmlDoc) {
        const alphabetElements = xmlDoc.querySelectorAll('alphabet item');
        return Array.from(alphabetElements).map(item => ({
            letter: item.querySelector('letter')?.textContent,
            value: item.querySelector('value')?.textContent,
            count: item.querySelector('count')?.textContent
        }));
    }
    
    // Extract tags list
    extractTagsList(xmlDoc) {
        const tagsElements = xmlDoc.querySelectorAll('tags item');
        return Array.from(tagsElements).map(item => ({
            name: item.querySelector('name')?.textContent,
            value: item.querySelector('value')?.textContent,
            count: item.querySelector('count')?.textContent
        }));
    }
    
    // Extract search results
    extractSearchResults(xmlDoc) {
        const resultsElement = xmlDoc.querySelector('searchResults');
        if (!resultsElement) return null;
        
        return {
            query: resultsElement.querySelector('query')?.textContent,
            total: resultsElement.querySelector('total')?.textContent,
            songs: this.extractSongs(resultsElement)
        };
    }
    
    // API Methods
    
    // Get session data
    async getSession() {
        const response = await this.makeRequest({
            action: 'session'
        });
        return response;
    }
    
    // Search for songs
    async searchSongs(query) {
        if (!query || query.length < 3) {
            throw new Error(CONFIG.ERRORS.SEARCH_TOO_SHORT);
        }
        
        const response = await this.makeRequest({
            ...CONFIG.REQUEST.SEARCH_PARAMS,
            query: query
        });
        return response;
    }
    
    // Browse songs by letter
    async browseSongsByLetter(letter) {
        const response = await this.makeRequest({
            ...CONFIG.REQUEST.BROWSE_PARAMS,
            type: 'letter',
            value: letter
        });
        return response;
    }
    
    // Browse songs by tag
    async browseSongsByTag(tag) {
        const response = await this.makeRequest({
            ...CONFIG.REQUEST.BROWSE_PARAMS,
            type: 'tag',
            value: tag
        });
        return response;
    }
    
    // Vote for a song
    async voteSong(songId) {
        const response = await this.makeRequest({
            ...CONFIG.REQUEST.VOTE_PARAMS,
            song_id: songId
        });
        return response;
    }
    
    // Add song to playlist
    async addSong(songId) {
        const response = await this.makeRequest({
            ...CONFIG.REQUEST.ADD_PARAMS,
            song_id: songId
        });
        return response;
    }
    
    // Get current playlist
    async getPlaylist() {
        const response = await this.makeRequest({
            action: 'playlist'
        });
        return response;
    }
    
    // Get alphabet list for current session
    async getAlphabetList() {
        const response = await this.makeRequest({
            action: 'alphabet'
        });
        return response;
    }
    
    // Get tags list for current session
    async getTagsList() {
        const response = await this.makeRequest({
            action: 'tags'
        });
        return response;
    }
}

// Create global API instance
const musicaAPI = new MusicaAPI();
