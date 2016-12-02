export default function (title, context, url, icon) {
    if (!Notification) {
        console.log("Your browser is not support desktop notifications.");
        return false;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        let notification = new Notification(title, {
            icon: icon || "http://ob9oayzh3.bkt.clouddn.com/images.png",
            body: context,
        });
        notification.onclick = function () {
            if (url)
                window.open(url);
            notification.close();
        };
    }
}