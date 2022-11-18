var url = document.URL;
var pageId = url.substring(url.lastIndexOf('=') + 1);



document.getElementById('orderId').innerText = pageId;