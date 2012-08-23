// ==UserScript==
// @name MoodleVizAdmin
// @include http://aulaglobal2.uc3m.es/user/index.php
// @include https://aulaglobal2.uc3m.es/user/index.php
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
  var ids = mkConfig.contextIds;
  for (var i = 0; !found && i < ids.length; i++) {
    found = (queryString == '?contextid=' + ids[i]);
  }
  return found;
}

var isAdmin = function() {
  /*
   * Check whether the user is an administrator of the course. We currently do
   * this through checking the visibility of the "Grades" tab in the
   * participants page.
   *
   */

  var tab;

  tab = $('div.tabtree li.last a').attr('title');

  return (tab == 'Notas' || tab == 'Notes');
}

var embedGraphs = function() {
  /*
   * Embedding the LearnGLASS graph in the desired location.
   * TO-DO: Allow to set the location through properties and the layout with a
   * template.
   *
   */

  var contentDiv, graphImg, userId, url;

  $('#participants tr').each(function() {
      var profileLink, profileUrl, imgUrl, userLink, targetUrl;
      profileLink = $(this).find('td.c0 a');
      profileUrl = profileLink.attr('href');
      getUserId(profileUrl, function(userId) {
          imgUrl = generateImg(userId);
          targetUrl = generateTarget(userId);

          graphLink = $('<a />', {href: targetUrl}).insertAfter(profileLink);
  
          // Build the graph block
          graphImg = $('<img />', {src: imgUrl})
              .css('height', '220px')
              .appendTo(graphLink);
      });
  });
}

if (isClassWithPlugin() && isAdmin()) {
  embedGraphs();
}

