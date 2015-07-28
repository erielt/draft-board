var port = 9999;

if (Server) {
  // Listen for HTTP connections.
  var server = new http.Server();
  server.listen(port);

  server.addEventListener('request', function(req) {
    console.log("got request, serving");
    var url = req.headers.url;
    
    if (url == '/ffl') {
      req.serveDraftUrl(url);
    } else if (url == '/config') {
      req.serveConfigUrl(url);
    } else if (url == '/crossdomain.xml') {
      req.serveCrossdomainUrl(url);
    }
    
    return true;
  });
}
