// ==UserScript==
// @name MoodleVizConfig
// ==/UserScript==

/*
 * imgPrefix and imgSuffix are used to create the URL of the image to show to
 * the participants. Example: imgPrefix can be 'http://abc.com?user=' and
 * imgSuffix can be '&format=png'.
 *
 * targetPrefix and targetSuffix are used to create the URL where the user is
 * redirected to.
 *
 * classIds is a list of Moodle class IDs where the visualizations should be
 * embedded. You can see this ID in the URL of the main page of the course.
 *
 * contextIds is a list of Moodle context IDs. These are shown in the URL of the
 * course participants page.
 *
 * title and linkLable are used to format the image in the main page of the
 * course.
 *
 * domainPatter is used to find the username by analyzing the email shown at the
 * profile page.
 *
 */

var mkConfig = {
  imgPrefix: '',
  imgSuffix: '',
  targetPrefix: '',
  targetSuffix: '',
  classIds: [],
  contextIds: [],
  title: 'Visualization',
  linkLabel: 'More info',
  locationElement: '#sb-1',
  domainPattern: '\\.example\\.com'
}; 

