/*********
 * API:
 * Web Speech API
 * Geolocation API
 * Place API
 * News API
 * 
 * AI:
 * NLP
 * Classification
 * Opinion Mining
 * 
 * Main function is texttospeech function at the end of the file
 *********/
var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var speakingStatus;
var sayText;
rate = 1;
volume = 1;


function directShow() {
    var str = document.getElementById("say");
    texttospeech(str.value);
}

//This is inicial functions
//Say some welcome speech and show this place
var x = document.getElementById("response");

function showAndsay(str) {
    showsomething(str);
    saysomething(str);
}

//This is help user to look what the system said, like a Console
function showsomething(str) {
    document.getElementById("response").innerHTML = str;
}

function saysomething(str) {
    var u = new SpeechSynthesisUtterance();
    u.text = str;
    u.lang = 'en-AU';
    u.rate = window.rate;
    u.volume = window.volume;
    u.onstart = function () {
        recognition.stop();
        recognizing = false;
    }
    //if the computer finishes responding, the system restarts recognising speech.
    u.onend = function (event) {
        recognition.start();
        recognizing = true;
    }
    speechSynthesis.speak(u);
}

var langs = [
    ['Afrikaans', ['af-ZA']],
    ['Bahasa Indonesia', ['id-ID']],
    ['Bahasa Melayu', ['ms-MY']],
    ['Català', ['ca-ES']],
    ['Čeština', ['cs-CZ']],
    ['Deutsch', ['de-DE']],
    ['English', ['en-AU', 'Australia'],
        ['en-CA', 'Canada'],
        ['en-IN', 'India'],
        ['en-NZ', 'New Zealand'],
        ['en-ZA', 'South Africa'],
        ['en-GB', 'United Kingdom'],
        ['en-US', 'United States']
    ],
    ['Español', ['es-AR', 'Argentina'],
        ['es-BO', 'Bolivia'],
        ['es-CL', 'Chile'],
        ['es-CO', 'Colombia'],
        ['es-CR', 'Costa Rica'],
        ['es-EC', 'Ecuador'],
        ['es-SV', 'El Salvador'],
        ['es-ES', 'España'],
        ['es-US', 'Estados Unidos'],
        ['es-GT', 'Guatemala'],
        ['es-HN', 'Honduras'],
        ['es-MX', 'México'],
        ['es-NI', 'Nicaragua'],
        ['es-PA', 'Panamá'],
        ['es-PY', 'Paraguay'],
        ['es-PE', 'Perú'],
        ['es-PR', 'Puerto Rico'],
        ['es-DO', 'República Dominicana'],
        ['es-UY', 'Uruguay'],
        ['es-VE', 'Venezuela']
    ],
    ['Euskara', ['eu-ES']],
    ['Français', ['fr-FR']],
    ['Galego', ['gl-ES']],
    ['Hrvatski', ['hr_HR']],
    ['IsiZulu', ['zu-ZA']],
    ['Íslenska', ['is-IS']],
    ['Italiano', ['it-IT', 'Italia'],
        ['it-CH', 'Svizzera']
    ],
    ['Magyar', ['hu-HU']],
    ['Nederlands', ['nl-NL']],
    ['Norsk bokmål', ['nb-NO']],
    ['Polski', ['pl-PL']],
    ['Português', ['pt-BR', 'Brasil'],
        ['pt-PT', 'Portugal']
    ],
    ['Română', ['ro-RO']],
    ['Slovenčina', ['sk-SK']],
    ['Suomi', ['fi-FI']],
    ['Svenska', ['sv-SE']],
    ['Türkçe', ['tr-TR']],
    ['български', ['bg-BG']],
    ['Pусский', ['ru-RU']],
    ['Српски', ['sr-RS']],
    ['한국어', ['ko-KR']],
    ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
        ['cmn-Hans-HK', '普通话 (香港)'],
        ['cmn-Hant-TW', '中文 (台灣)'],
        ['yue-Hant-HK', '粵語 (香港)']
    ],
    ['日本語', ['ja-JP']],
    ['Lingua latīna', ['la']]
];
for (var i = 0; i < langs.length; i++) {
    select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 6;
updateCountry();
select_dialect.selectedIndex = 6;
showInfo('info_start');

function updateCountry() {
    for (var i = select_dialect.options.length - 1; i >= 0; i--) {
        select_dialect.remove(i);
    }
    var list = langs[select_language.selectedIndex];
    for (var i = 1; i < list.length; i++) {
        select_dialect.options.add(new Option(list[i][1], list[i][0]));
    }
    select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {

    start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
        recognizing = true;
        showInfo('info_speak_now');
        start_img.src = 'mic-animate.gif';

    };
    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            start_img.src = 'mic.gif';
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = 'mic.gif';
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };
    recognition.onend = function () {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = 'mic.gif';
        if (!final_transcript) {
            showInfo('info_start');
            return;
        }
        showInfo('');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }
        if (create_email) {
            create_email = false;
            createEmail();
        }
    };
    recognition.onresult = function (event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript = event.results[i][0].transcript;

                texttospeech(final_transcript);

                speakingStatus = "stopped";


            } else {
                interim_transcript = event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
            showButtons('inline-block');
        }
    };
}


function upgrade() {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;

function capitalize(s) {
    return s.replace(first_char, function (m) {
        return m.toUpperCase();
    });
}

function createEmail() {
    var n = final_transcript.indexOf('\n');
    if (n < 0 || n >= 80) {
        n = 40 + final_transcript.substring(40).indexOf(' ');
    }
    var subject = encodeURI(final_transcript.substring(0, n));
    var body = encodeURI(final_transcript.substring(n + 1));
    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}

function copyButton() {
    if (recognizing) {
        recognizing = false;
        recognition.stop();
    }
    copy_button.style.display = 'none';
    copy_info.style.display = 'inline-block';
    showInfo('');
}

function emailButton() {
    if (recognizing) {
        create_email = true;
        recognizing = false;
        recognition.stop();
    } else {
        createEmail();
    }
    email_button.style.display = 'none';
    email_info.style.display = 'inline-block';
    showInfo('');
}

function startButton(event) {
    speakingStatus = "stopped";
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    recognition.lang = select_dialect.value;
    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    start_img.src = 'mic-slash.gif';
    showInfo('info_allow');
    showButtons('none');
    start_timestamp = event.timeStamp;
}

function showInfo(s) {
    if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
            if (child.style) {
                child.style.display = child.id == s ? 'inline' : 'none';
            }
        }
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }
}
var current_style;

function showButtons(style) {
    if (style == current_style) {
        return;
    }
    current_style = style;
    copy_button.style.display = style;
    email_button.style.display = style;
    copy_info.style.display = 'none';
    email_info.style.display = 'none';
}

var feedback = false;

// Main part
function texttospeech(dialog) {
    // If I say something after already say other words, it will have whitespace before the text, so the text should be trimmed.
    // For example, if I say hello and say hello again, the dialog is whitespace->" hello" not "hello", so the user should click the microphone again.
    dialog = dialog.trim().toLowerCase();

    if (feedback) {
        //Opinion mining
        $.ajaxSetup({
            async: false
        });
        $.ajax({
            url: "opinion.php",
            data: {
                text: dialog
            },
            success: function (data) {
                if (data == "pos") {
                    showAndsay("Thank you for your feedback, hope you have a good user experience.");
                } else if (data == "neu") {
                    showAndsay("Thank you for your feedback.");
                } else if (data == "neg") {
                    showAndsay("I'm sorry, I will improve the user experience.");
                }
                $("#news").hide();
                feedback = false
            }
        });
    } else if (dialog == "hi" || dialog == "hello") {
        showAndsay("Hello, How are you.");
    } else if (dialog == "show my location") {
        //Geolocation API
        //Places API
        showAndsay("I am checking your location, wait a minute.");
        getMyLocation()
            .then(
                (position) => showMyPosition(position)
            );
    } else if (dialog == "show restaurants near me") {
        //Geolocation API
        //Places API
        getMyLocation()
            .then(
                (position) => showAllRestaurant(position)
            );
    } else if (dialog == "i want to find a restaurant to eat") {
        //Geolocation API
        //Places API
        //NLP AI
        //Classification
        if (dialog.indexOf("restaurant") != -1) {
            $.ajaxSetup({
                async: false
            });
            $.ajax({
                url: "noun_phrase.php",
                data: {
                    text: dialog
                },
                success: function (data) {
                    nlp = data;
                    $("#googleMap").hide();
                    if (data.indexOf("restaurant") != -1) {
                        $("#form").show();
                        showAndsay("Please fill the form and I will provide results for you.");
                        // Execute checkDecision function (in form) in place.js
                    }
                }
            });
        }
    } else if (dialog.indexOf("news") != -1) {
        //News API
        $.ajaxSetup({
            async: false
        });
        $.ajax({
            url: "noun_phrase.php",
            data: {
                text: dialog
            },
            success: function (data) {
                nlp = data;
                array = JSON.parse(data)
                $("#googleMap").hide();
                $("#news").show();
                $("#news").load("./news.html")
                $("#term").val(array.result[0]);
                $("#bingForm").submit();
                showAndsay("Here are the news for you. Do you like my service?");
            }
        });
        feedback = true;
    } else {
        showAndsay("Sorry, I don't understand");
    }
}