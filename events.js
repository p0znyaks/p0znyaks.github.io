window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var eventNum = urlParams.get('event');

    var eventName, eventImage, eventDescription;

    // Загрузка XML-файла events.xml
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDoc = this.responseXML;
            var events = xmlDoc.getElementsByTagName("event");

            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var name = event.querySelector('name').textContent;
                var description = event.querySelector('description').textContent;
                var image = event.querySelector('image').textContent;

                if (eventNum === (i + 1).toString()) {
                    eventName = name;
                    eventImage = image;
                    eventDescription = description;
                    break;
                }
            }

            document.getElementById("eventName").innerHTML = eventName;
            document.getElementById("eventImage").src = eventImage;
            document.getElementById("eventDesc").innerHTML = eventDescription;
        }
    };
    xhttp.open("GET", "events.xml", true);
    xhttp.send();
};
