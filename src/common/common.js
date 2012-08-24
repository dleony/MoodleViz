// ==UserScript==
// @name MoodleVizCommon
// ==/UserScript==

var generateToken = function(time, userId) {
  var token, str;
  str = time + '' + userId;
  token = hex_md5(str);
  return token;
};

var generateImg = function(userId) {
  /*
   * Generate the URL that shows the user main graph.
   *
   */

  var token, time, url;

  time = Math.floor( (new Date()).getTime() / 1000 ); 
  //  token = generateToken(time, userId);
  // url =  + '?token=' + token + '&timestamp=' + time + '&user=' + userId;
  
  url = mkConfig.imgPrefix + userId + mkConfig.imgSuffix;

  return url;
};

var generateTarget = function(userId) {
  /*
   * Generate the URL of the link shown to the user.
   *
   */

  var url;
  url = mkConfig.targetPrefix + userId + mkConfig.targetSuffix;

  return url;
};

var getUserId = function(profileUrl, callback) {
  /*
   * We obtain the user ID from the profile page, whose URL is received as a
   * parameter.
   *
   */

  var pattern, result, varName, userId;

  pattern = new RegExp('id=(\\d+)&', 'g');
  result = pattern.exec(profileUrl);
  pattern.lastIndex = 0;
  if (result) {
      varName = "MK_user_id_" + result[1];
      kango.invokeAsync('kango.storage.getItem', varName, function(userId) {
          if (userId == null) {
              $.get(profileUrl, function(data) {
                 var str, temp, pattern, result;
                 temp = document.createElement('p');
                 temp.innerHTML = data;
                 str = temp.textContent || temp.innerText;
                 temp = null;
   
                 pattern = new RegExp('(\\w+)@' + mkConfig.domainPattern, 'g');
                 result = pattern.exec(str);
                 pattern.lastIndex = 0;
                 pattern.lastIndex = 0;
                 if (result && result.length >= 2) {
                     userId = result[1];
                     kango.invokeAsync('kango.storage.setItem', varName, userId);
                     if (typeof callback === 'function')
                         callback(userId);
                 }
              });
          } else {
              if (typeof callback === 'function')
                  callback(userId);
          }
      });
  } // if result
};

