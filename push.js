let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAhKn7i-0a_48pTOq7POsccH5HB0Xz5OhWoeuofvZxFgcovLT3raKiJR7XDgVDG_KGk9ZXf6cduzSCGVhgR1RZY",
    "privateKey": "mPw0jR8dYjuZnuzb8SQbKNlLMfW1uRKYgGiXRtUO1YU"
};

webPush.setVapidDetails(
    'mailto:nurrahmanirham@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
    "keys": {
        "p256dh": "BLhWbewHymdBskdtUR+gLzWxO+ZZkdvOwTXEXc4UxHsYSALGfDuQ/ecLq0f7UtmtHZVi/qCwpI2L3tUc0BFvmYA=",
        "auth": "1xpmi4A3dhtS/cLyCv98Mg=="
    }
};

let payload = 'Selamat! Aplikasi anda sudah dapat menerima push notifikasi';

let options = {
    gcmAPIKey: '548604067402',
    TTL: 60
};

webPush.sendNotification(pushSubscription, payload, options);