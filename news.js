async function getNewsDataFromXML() {
    try {
        const response = await fetch('news.xml');
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        return xmlDoc;
    } catch (error) {
        console.error('Ошибка при получении данных из XML:', error);
        return null;
    }
}

async function getNewsContent(newsId) {
    const xmlDoc = await getNewsDataFromXML();

    if (xmlDoc) {
        const newsTitle = xmlDoc.getElementsByTagName('title')[newsId - 1].childNodes[0].nodeValue;
        const newsDescription = xmlDoc.getElementsByTagName('description')[newsId - 1].childNodes[0].nodeValue;
        const newsImage = xmlDoc.getElementsByTagName('image')[newsId - 1].childNodes[0].nodeValue;
        const newsDate = xmlDoc.getElementsByTagName('date')[newsId - 1].childNodes[0].nodeValue;

        return { title: newsTitle, description: newsDescription, image: newsImage, date: newsDate };
    } else {
        return null;
    }
}