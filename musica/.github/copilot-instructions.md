<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MUSICA Mobile-First Jukebox Frontend

This is a mobile-first responsive frontend for a music jukebox system built with vanilla HTML, CSS, and JavaScript.

## Key Principles

- **Mobile-First**: Always design and code for mobile devices first, then enhance for larger screens
- **No Frameworks**: Use only vanilla HTML, CSS, and JavaScript - avoid Bootstrap, React, Vue, etc.
- **Responsive Design**: Support phones, tablets, and desktop screens
- **Progressive Enhancement**: Basic functionality works everywhere, enhanced features for modern browsers
- **Performance**: Optimize for mobile networks and devices

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Optimize for mobile viewport and touch interactions

### CSS
- Use CSS Grid and Flexbox for layouts
- Implement mobile-first media queries
- Use CSS custom properties (variables) for theming
- Prefer CSS animations over JavaScript animations
- Use backdrop-filter for modern blur effects

### JavaScript
- Use modern ES6+ features (const/let, arrow functions, async/await)
- Implement proper error handling
- Use debouncing for search inputs
- Cache DOM elements for performance
- Handle offline/online states gracefully

## Architecture

- **config.js**: All configuration constants and settings
- **api.js**: API communication and data parsing
- **ui.js**: UI components and user interactions
- **app.js**: Main application initialization and coordination

## API Integration

The backend provides XML responses. All API calls should:
- Handle errors gracefully
- Parse XML responses properly
- Implement proper loading states
- Support user session management

## Mobile Considerations

- Touch-friendly button sizes (minimum 44px)
- Swipe gestures where appropriate
- Proper viewport configuration
- Handle device orientation changes
- Optimize for various screen densities

## Browser Support

Target modern browsers with ES6+ support:
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- Focus on mobile browsers: iOS Safari, Chrome Mobile

When suggesting code changes:
1. Always consider mobile users first
2. Ensure touch accessibility
3. Test responsive behavior
4. Optimize for performance
5. Follow the established patterns in the codebase
