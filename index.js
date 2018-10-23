$(document).ready(function() {
  $("#off-box").hide();
  $("#on-box").hide();

  var urlStreams = "https://api.twitch.tv/kraken/streams/";
  var urlChannel = "https://api.twitch.tv/kraken/channels/";
  var callBack = "?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un";
  var urlStream = '';

  var twitchUsers = [
    "ESL_SC2",
    "ESL_CSGO",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "comster404",
    "brunofin",
    "medrybw",
    "monstercat",
    "aces_tv",
    "loserfruit",
    "behkuhtv",
    "fakename",
    "food",
    "nonexistant",
    "otherthings"
  ];

  loadAllTwitch();
  loadOnTwitch();
  loadOffTwitch();

  $("#btn1").click(function() {
    loadAllTwitch();
    $("#all-box").show();
    $("#off-box").hide();
    $("#on-box").hide();
  });

  $("#btn2").click(function() {
    loadOnTwitch();
    $("#off-box").hide();
    $("#all-box").hide();
    $("#on-box").show();
  });

  $("#btn3").click(function() {
    loadOffTwitch();
    $("#all-box").hide();
    $("#on-box").hide();
    $("#off-box").show();
  });
  
  $("#stream").click(function(urlStream) {
    console.log(urlStream);
    console.log("empty")
    // window.open(urlStream);
    // return false;
  });

  function loadAllTwitch() {
    $("#all-box").empty();
    twitchUsers.forEach(function(user) {
      var url = urlChannel + user + callBack;

      $.getJSON(url, function(user) {
        $("#all-box").append(`
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <img class="card-img-top" src="${user.logo}">
              <div class="card-body">
                <h2>${user.display_name}</h2>
                <p class="card-text">${user.status}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button id="stream" class="btn btn-sm btn-outline-secondary">Stream</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Profile</button>
                  </div>
                  <small class="text-muted">${user.followers} followers</small>
                </div>
              </div>
            </div>
          </div>
        `);
        urlStream = user.url;
      });
    });
  }

  function loadOnTwitch() {
    $("#on-box").empty();
    twitchUsers.forEach(function(user) {
      var url = urlChannel + user + callBack;

      $.getJSON(url, function(user) {
        if (user.video_banner != null) {
          $("#on-box").append(`
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${user.logo}">
                <div class="card-body">
                  <h2>${user.display_name}</h2>
                  <p class="card-text">${user.status}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button id="stream" type="button" class="btn btn-sm btn-outline-secondary">Stream</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Profile</button>
                    </div>
                    <small class="text-muted">${user.followers} followers</small>
                  </div>
                </div>
              </div>
            </div>
          `);
          urlStream = user.url;
        }
      });
    });
  }

  function loadOffTwitch() {
    $("#off-box").empty();
    twitchUsers.forEach(function(user) {
      var url = urlChannel + user + callBack;

      $.getJSON(url, function(user) {
        if (user.video_banner === null) {
          $("#off-box").append(`
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${user.logo}">
                <div class="card-body">
                  <h2>${user.display_name}</h2>
                  <p class="card-text">${user.status}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="${user.url}"><button type="button" id="stream" class="btn btn-sm btn-outline-secondary">Stream</button></a>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Profile</button>
                    </div>
                    <small class="text-muted">${user.followers} followers</small>
                  </div>
                </div>
              </div>
            </div>
          `);
          urlStream = user.url;
        }
      });
    });
  }
});
