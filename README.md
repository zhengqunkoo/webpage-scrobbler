# Webpage Scrobbler

Scrobbles information from a webpage.

Currently, the only host supported is "www.midomi.com".

## Usage
1. Navigate to a tab.

2. Click this addon's logo:
   ![](/icons/icon.svg)
   to scrobble and updateNowPlaying.

   If this addon is not authorized, a new tab opens where you can key in your username and password.

   Your username and password are not stored, only the session key is stored in your browser.

3. Watch this addon's logo.

   The logo will flash light
   ![](/icons/icon-ok.svg)
   if:
   - the scrobble and updateNowPlaying are both ok.

   The logo will flash dark
   ![](/icons/icon-error.svg)
   if either:
   - the scrobble errors;
   - the updateNowPlaying errors;
   - the session key is not stored in your browser (this can happen if a new tab was opened in step 2, but you close this new tab without authorizing this addon); or
   - the current tab's host was not configured in this addon's options (this can happen if the host of the tab in step 1 is "www.google.com" and this addon has default options).
   If the logo flashes dark, check your browser's console for more details.

# TODO
- Allow user to configure track/artist/album separand index.
- Screenshots
