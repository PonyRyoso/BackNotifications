const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey" :  "BDeiIze-ySzURzW38H6tX5Kuuci70hM04pJCiaF_Gk_S8OMw5IBEi11ZQsEa5m87oO_ZsMnDVkPbml-jtUDeg3I",
    "privateKey":   "-bKdrtN_T74Ja6HmE7cqXtDkZuOCxieADCpky9yFmA0"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: "https://fcm.googleapis.com/fcm/send/eP0vcfde6Rg:APA91bErWEBj6Ad7PIxCO3Q10JX99HcawnxESYJv7DzWWb1RWlEPOKfk0DjQYQZ-JI-iWnarXGrhsAsEKFdi7q_5BlIesymn1lO-SIPetfP6zbr92yAtL-B6OABhGGE0aj5R0Zc5glPI",
        keys: {
            auth:   "CBPrRE5jrWg38fwu3Rq63Q",
            p256dh: "BKvtFUEHkKSBIqHia39aanIPFzbMowdfKb5L3-S-NObL197mCqLqNL_Vz6qkRtn_QALavpCIqoVaRhlSw3bTlWw"
        }
    };

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Este es un Saludo de parte de la familia Unimed",
            "vibrate": [100, 50, 100],
            "image": "https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/11/doctor-strange-en-spider-man-no-way-home_2560x1440_8490.jpg?resize=1200%2C675&ssl=1",
            "actions": [{
                "action": "explore",
                "title": "Ir a UnimedHn -> http://127.0.0.1:8080/"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se ha enviado' })

}

app.route('/api/enviar').post(enviarNotificacion);
app.set('host', '0.0.0.0');

const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
