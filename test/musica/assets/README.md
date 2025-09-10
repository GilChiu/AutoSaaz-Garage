# Assets Folder

This folder contains all the media assets for the MUSICA jukebox frontend.

## Required Files

Please add the following files to this folder:

### Background Image
- **background.jpg** - Main background image for the application
  - Recommended size: 1920x1080 or larger
  - Format: JPEG (optimized for web)
  - Should have good contrast to ensure text readability

### Default Artwork
- **default-artwork.jpg** - Default image for songs without artwork
  - Recommended size: 300x300 pixels
  - Format: JPEG or PNG
  - Should match the app's design theme

### Icons (Optional)
Create an `icons/` subfolder for any custom icons:
- **search-icon.svg** - Custom search icon
- **vote-icon.svg** - Custom voting icon
- **add-icon.svg** - Custom add to playlist icon
- **refresh-icon.svg** - Custom refresh icon

## Image Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Responsive Images**: Consider different sizes for different screen densities
3. **WebP Format**: Consider using WebP for better compression (with JPEG fallback)
4. **Lazy Loading**: Images are loaded as needed by the application

## File Naming Convention

- Use lowercase letters
- Use hyphens for spaces
- Be descriptive but concise
- Include size in filename if multiple versions exist

Example: `background-1920x1080.jpg`, `default-artwork-300x300.jpg`

## Current Fallback

The application includes a CSS fallback (`background-fallback.css`) that creates a gradient background if no background image is provided. This ensures the app still looks good while you add your custom assets.

## Usage in Code

Images are referenced in the JavaScript and CSS files:
- Background: Set as CSS background-image in `body` element
- Artwork: Used in song items via JavaScript template literals
- Icons: Referenced in CSS or as inline SVG

Make sure file paths match the references in the code when you add your assets.
