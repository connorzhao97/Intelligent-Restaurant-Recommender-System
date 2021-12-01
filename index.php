<!DOCTYPE html>
<meta charset="utf-8">
<title>Restaurant Finder System</title>

<head>
  <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBD4AxjOOsT7jZZOb84LDU7naEAramEXqo&libraries=places">
  </script>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1 class="center" id="headline">
    <a style="color:black" href="http://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html">
      Restaurant Finder System</a></h1>
  <div id="info">
    <p id="info_start">Click on the microphone icon and begin speaking.</p>
    <p id="info_speak_now">Speak now.</p>
    <p id="info_no_speech">No speech was detected. You may need to adjust your
      <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">
        microphone settings</a>.</p>
    <p id="info_no_microphone" style="display:none">
      No microphone was found. Ensure that a microphone is installed and that
      <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">
        microphone settings</a> are configured correctly.</p>
    <p id="info_allow">Click the "Allow" button above to enable your microphone.</p>
    <p id="info_denied">Permission to use microphone was denied.</p>
    <p id="info_blocked">Permission to use microphone is blocked. To change,
      go to chrome://settings/contentExceptions#media-stream</p>
    <p id="info_upgrade">Web Speech API is not supported by this browser.
      Upgrade to <a href="//www.google.com/chrome">Chrome</a>
      version 25 or later.</p>
  </div>
  <div class="right">
    <button id="start_button" onclick="startButton(event)">
      <img id="start_img" src="mic.gif" alt="Start"></button>
  </div>
  <div id="results">
    <span id="final_span" class="final"></span>
    <span id="interim_span" class="interim"></span>
    <p>
  </div>
  <div class="center">
    <div class="sidebyside" style="text-align:right">
      <button id="copy_button" class="button" onclick="copyButton()">
        Copy and Paste</button>
      <div id="copy_info" class="info">
        Press Control-C to copy text.<br>(Command-C on Mac.)
      </div>
    </div>
    <div class="sidebyside">
      <button id="email_button" class="button" onclick="emailButton()">
        Create Email</button>
      <div id="email_info" class="info">
        Text sent to default email application.<br>
        (See chrome://settings/handlers to change.)
      </div>
    </div>
    <p>
      <div id="div_language">
        <select id="select_language" onchange="updateCountry()"></select>
        &nbsp;&nbsp;
        <select id="select_dialect"></select>
      </div>
  </div>
  <div class="center">
    <input type="text" id="say" style="width:500px;height:50px; font-size:20pt" />
    <input type="button" id="btn" onclick="directShow();" value="I say" />
    <p id="response"></p>

    <div id="news">
    </div>


    <div id="googleMap" style="height:380px;"></div>
    <div id="form">
      <form id="decisionForm">
        <fieldset>
          Day :<br>
          <input type="radio" name="day" value="mon"> Monday<br>
          <input type="radio" name="day" value="tue"> Tuesday<br>
          <input type="radio" name="day" value="wed"> Wednesday <br>
          <input type="radio" name="day" value="thu"> Thursday<br>
          <input type="radio" name="day" value="fri"> Friday<br>
          <br>

          Have enough time to enjoy the meal :<br>
          <input type="radio" name="time" value="TRUE"> True<br>
          <input type="radio" name="time" value="FALSE"> False<br>
          <br>

          Seafood :<br>
          <input type="radio" name="seafood" value="TRUE"> True<br>
          <input type="radio" name="seafood" value="FALSE"> False<br>
          <br>

          Spicy :<br>
          <input type="radio" name="spicy" value="TRUE"> True<br>
          <input type="radio" name="spicy" value="FALSE"> False<br>
          <br>
          <input id="button" type="button" name="button" onclick="checkDecision();" value="Submit" />
          <input type="reset" value="Reset">
        </fieldset>
      </form>
    </div>
  </div>
</body>

<script src="./place.js"></script>
<script src="./speech.js"></script>

<script>
  window.onload = function () {
    //Welcome Speech
    var welcomeStr = "Hello, welcome to use the restaurant finder system.";
    $("#googleMap").hide();
    $("#news").hide();
    $("#form").hide();
    showAndsay(welcomeStr);
  }
</script>