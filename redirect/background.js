/**
 * Background script for Draft Board Redirect. Redirect requests to the Draft
 * Board Chrome app.
 */
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Let JOIN requests from draft board go through.
    if (details.url.indexOf("fantasydraft.espn.go.com") != -1
        && details.url.indexOf("JOIN") != -1
        // Prevent redirecting our app's requests.
        && details.url.indexOf("&foo") == -1
        && details.url.indexOf("crossdomain") == -1) {
      // Redirect to the local app.
      // TODO(erielt): Get this address from the chrome app
      //     to avoid port conflicts in the app.
      console.log("Redirecting draft request: " + details.url);
      return {redirectUrl: "http://localhost:9999/ffl"};
    }
    
    if (details.url.indexOf("games.espn.go.com/ffl/draft/external/config") != -1
        // Prevent redirecting our app's requests.
        && details.url.indexOf("&foo") == -1) {
      console.log("Redirecting config request: " + details.url);
      return {redirectUrl: "http://localhost:9999/config"};
    }

    console.log("Not redirecting URL: " + details.url);
  },
  // Applies to following url patterns
  {urls: ["http://fantasydraft.espn.go.com/*", 
          "http://games.espn.go.com/ffl/draft/external/config*"]},
  // In request blocking mode
  ["blocking"]
);
