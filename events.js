async function getEventDataFromXML() {
    try {
        const response = await fetch('events.xml'); // Укажите путь к вашему файлу XML
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        return xmlDoc;
    } catch (error) {
        console.error('Ошибка при получении данных из XML:', error);
        return null;
    }
}

async function getEventContent(eventId) {
    const xmlDoc = await getEventDataFromXML();

    if (xmlDoc) {
        const eventName = xmlDoc.getElementsByTagName('name')[eventId - 1].childNodes[0].nodeValue;
        const eventDescription = xmlDoc.getElementsByTagName('description')[eventId - 1].childNodes[0].nodeValue;
        const eventImage = xmlDoc.getElementsByTagName('image')[eventId - 1].childNodes[0].nodeValue;
        const eventDate = xmlDoc.getElementsByTagName('date')[eventId - 1].childNodes[0].nodeValue;
        const eventLateDate = xmlDoc.getElementsByTagName('lateDate')[eventId - 1].childNodes[0].nodeValue;

        return { name: eventName, description: eventDescription, image: eventImage, date: eventDate, lateDate: eventLateDate };
    } else {
        return null;
    }
}