/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        console.log(window);
        document.getElementById('platform').innerHTML = cordova.platformId;
        app.setupPush();



    },
    setupPush: function () {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "123894434698",
                "icon": "phonegap",
                "iconColor": "blue"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function (data) {
            console.log('registration event: ' + data.registrationId);
            document.getElementById('regisid').innerHTML = data.registrationId;

            alert(data.registrationId);
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function (e) {
            console.log("push error = " + e.message);
        });

        push.on('notification').subscribe((notification) => {
            console.log('Received a notification', notification);
            document.getElementById('regisid').innerHTML = JSON.stringify(notification);
        });

        // push.on('notification', function (data) {
        //     console.log('notification event');
        //     console.log(data);
        //     document.getElementById('regisid').innerHTML = JSON.stringify(data);



        //     var title;
        //     var msg;
        //     if (data.title) {
        //         title = data.title;
        //         msg = data.message;
        //     } else if (data.additionalData["pinpoint.notification.title"]) {
        //         title = data.additionalData["pinpoint.notification.title"];
        //         msg = data.additionalData["pinpoint.notification.body"];
        //     } else {
        //         msg = data.message;
        //     }

        //     if (data.additionalData) {
        //         navigator.notification.alert(
        //             msg,         // message
        //             null,                 // callback
        //             title,           // title
        //             'Ok'                  // buttonName
        //         );
        //     }

        // });

        // var msg1 = {
        //     "message": "hi angang",
        //     "additionalData": {
        //         "google.message_id": "0:1518080052371131%811191f0f9fd7ecd",
        //         "coldstart": false,
        //         "foreground": true
        //     }
        // }

        // var msg2 = {
        //     "title": "PushPushDemo",
        //     "message": "hi ang2",
        //     "additionalData": {
        //         "google.message_id": "0:1518080140642390%811191f0f9fd7ecd",
        //         "coldstart": false,
        //         "foreground": false
        //     }
        // }

        // var msg3 = {
        //     "additionalData": {
        //         "pinpoint.openApp": "true",
        //         "pinpoint.notification.title": "test1",
        //         "pinpoint.notification.body": "Hi angstrom1",
        //         "pinpoint.campaign.campaign_id": "_DIRECT",
        //         "google.message_id": "0:1518080210403754%811191f0f9fd7ecd",
        //         "coldstart": false,
        //         "pinpoint.notification.silentPush": "0",
        //         "foreground": true
        //     }
        // }

    }
};
