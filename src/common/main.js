// ==UserScript==
// @name MoodleVizMain
// @include http://aulaglobal2.uc3m.es/course/view.php
// @include https://aulaglobal2.uc3m.es/course/view.php
// ==/UserScript==

var isClassWithPlugin = function() {
  /*
   * The @include parameter doesn't take into account the queryString of the
   * HTTP request, so we check this here. The queryString will have the
   * following format: '?id=<ID>', where <ID> is the ID of the class.
   *
   */

  var queryString = window.location.search;
  var found = false;
  var ids = mkConfig.classIds;
  for (var i = 0; !found && i < ids.length; i++) {
    found = (queryString == '?id=' + ids[i]);
  }
  return found;
};

var embedMainGraph = function() {
  /*
   * Embedding the LearnGLASS graph in the desired location.
   * TO-DO: Allow to set the location through properties and the layout with a
   * template.
   *
   */

  var profile, graphBlock, contentDiv, graphImg, userId, url;

  profile = $('div.headermenu div.logininfo a').attr('href');

  getUserId(profile, function(userId) {
    imgUrl = generateImg(userId);
    targetUrl = generateTarget(userId);
    
    // Build the graph block
    graphBlock = $('<div />')
        .addClass('sideblock')
        .html('<div class="header"><div class="title"><h2>' + mkConfig.title + '</h2></div></div>');
  
    contentDiv = $('<div />')
        .addClass('content')
        .appendTo(graphBlock);
  
    /*
    graphFrame = $('<iframe />', {src: url, frameBorder: 0, scrolling: 'no'})
        .css('height', '220px')
        .appendTo(contentDiv);
    */
    graphLink = $('<a />', {href: targetUrl}).appendTo(contentDiv);
  
    graphImg = $('<img />', {src: imgUrl})
        .css('height', '220px')
        .appendTo(graphLink);
    $('<a />', {href: targetUrl, text: mkConfig.linkLabel})
        .css({marginLeft: 'auto', marginRight: 'auto'})
        .appendTo(contentDiv);
  
    graphBlock.insertBefore(mkConfig.locationElement);
  });

}

if (isClassWithPlugin()) {
  embedMainGraph();
}

