(function (window, document, location) {
  var embedUrl = '{{request.resource_url(context, "embed.js")}}';
  var isHTTPS = location.protocol.indexOf('https') === 0;
  var isEmbedHTTPS = embedUrl.indexOf('https') === 0;
  var isLocal = location.protocol === 'file:';
  var isPDF = location.pathname.toLowerCase().indexOf('.pdf') > 0;
  var hasPDFjs = typeof window.PDFJS !== 'undefined';
  var embed;

  if (isLocal && !isPDF) {
    window.alert('Sorry, Hypothesis doesn\'t work on this type of file. Only PDF\'s can be annotated locally.');
    return;
  }
  if (isPDF && !hasPDFjs) {
    window.alert('Sorry, this bookmarklet doesn\'t work with PDF documents. Please use one of our browser extensions or the Firefox browser.');
    return;
  }
  if (isHTTPS && !isEmbedHTTPS) {
    window.alert('Sorry, but this bookmarklet is unavailable on pages served with HTTPS at this time. Please contact support for further assistance.');
    return;
  }

  window.hypothesisConfig = function () {
    return {showHighlights: true};
  };
  embed = document.createElement('script');
  embed.setAttribute('src', embedUrl);
  document.body.appendChild(embed);
})(this, this.document, this.location);
