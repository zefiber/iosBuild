var services = angular.module('starter.services', []);

services.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});

services.factory('signInService', function ($q, $http, socketServ, $timeout) {

    var signInService = {};
    // Create a new deferred object

    signInService.validateUser = function (bodyData) {
        var defer = $q.defer();
        var myobject = {
            password: bodyData.password,
            username: bodyData.username,
        };

        //ws.send('{"action":"subscribe","symbol":"uwti"}');
        var msg = {"action": "loginrequest", "username": myobject.username, "password": myobject.password};
        var jsonObj = angular.toJson(msg);
        console.log("jsonObj:" + jsonObj);

        socketServ.doReq(jsonObj).then(function success(data) {
            console.log("do Req notify resp:" + data);
             defer.resolve(data);
        },function error(err) {
            console.log("do Req error resp:" + err);
            defer.reject(err);
        },function notify(data) {
            console.log("do Req notify resp:" + data);
            defer.notify(data);

        });
        return defer.promise;


    };

    return signInService;
});


services.factory('sendEmailForResetService', function ($q, $http) {

    var sendEmailForResetService = {};
    // Create a new deferred object
    var defer = $q.defer();
    sendEmailForResetService.sendEmail = function (bodyData) {

        var jsonObj = angular.toJson(bodyData.email);
        //TBD for connecting smtp to send email
        var url = "http://localhost:8200/signup";

        return $http.post(url, jsonObj);

    };

    return sendEmailForResetService;
});


services.factory('signUpService', function ($q, $http, socketServ) {

    var signUpService = {};
    // Create a new deferred object

    signUpService.create = function (bodyData) {
        var defer = $q.defer();
        var myobject = {
            email: bodyData.email,
            password: bodyData.password,
            username: bodyData.username,
            firstname: bodyData.firstname,
            lastname: bodyData.lastname
        };

        var msg = {action:"registerrequest", username:myobject.username, password:myobject.password, email:myobject.email};
        var jsonObj = angular.toJson(msg);

        // var url = "http://localhost:8200/signup";
        // return $http.post(url, jsonObj);

        socketServ.doReq(jsonObj).then( function success(data) {
            console.log("do Req success resp:" + data);
             defer.resolve(data);
        }, function error(err) {
            console.log("do Req error resp:" + err);
            defer.reject(err);
        },function resolve(data) {
            console.log("do Req notify resp:" + data);
            defer.notify(data);
        });

        return defer.promise;
    };

    return signUpService;
});

services.factory('crossPageService', function ($rootScope) {
    this.reorder = 'false';

    this.getReorder = function () {
        return this.reorder;
    };

    this.setReorder = function (reorder) {
        this.reorder = reorder;
    };

    this.prepForBroadcast = function (reorder) {
        this.setReorder(reorder);
        $rootScope.$broadcast('handleBroadcast');
    };

    return this;
});

services.factory('pageNameService', function () {
    this.pageName = 'login';
    return {
        getPageName: function () {
            return this.pageName;
        },
        setPageName: function (pageName) {
            this.pageName = pageName;
        }

    };

});

services.factory('socketServ', function ($log, $q, localStorageService, ApiEndpoint, $timeout) {

    this.doReq = function (msgArr) {
        var d = $q.defer();

        var ws = ApiEndpoint.webSocketConnection;

        if(ws.readyState == 1){
            $log.log("ws readyState:" + ws.readyState);
            //ws.send('{"action":"subscribe","symbol":"uwti"}');
            ws.send(msgArr);
        }

        ws.onerror = function(event){
            $log.log("on error" + event);
        }

        ws.onopen = function (event) {
            $log.log("Web Socket connection has been established successfully");
            //{"action":"subscribe","equityid":0}
            $log.log("send msg:" + msgArr);
            // ws.send(msgArr);
        };



        ws.onmessage = function (event) {
            //[{"symbol": "uwti","ask": 66.92539153943089,"bid": 10.900888923043798,"bidsize": 347,"asksize": 354}]
            $log.log("received a message", event.data);
            var stockObjArr = JSON.parse(event.data);
            d.notify(stockObjArr);
             //d.resolve(stockObjArr);
        };

        ws.onclose = function (event) {
            $log.log("connection closed:" );
        };

        return d.promise;
    }

    return this;
})

services.factory('restfulApiService', function ($log, $http, $q, $base64, $rootScope) {


    this.doRestfulReq = function (url) {
        var d = $q.defer();
        // $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($rootScope.username + ':' + $rootScope.token);
        $http.get(url).then(function (resp) {
            console.log(resp);
            // var respData = JSON.parse(resp.data);
            d.resolve("success:"+resp.data);
        }, function (err) {
            d.reject("err:"+err);
        }, function notify(data){
            d.notify("notify:"+data);
        })
        return d.promise;
    }

    return this;

});

services.factory('localStorageService', function () {

    // Helper methods to manage an array of data through localstorage
    return {
        // This pulls out an item from localstorage and tries to parse it as JSON strings
        get: function LocalStorageServiceGet(key, defaultValue) {
            var stored = localStorage.getItem(key);
            try {
                stored = angular.fromJson(stored);
            } catch (error) {
                stored = null;
            }
            console.log("local storage:" + stored);
            if (defaultValue && stored === null) {
                stored = defaultValue;
            }
            return stored;
        },
        // This stores data into localstorage, but converts values to a JSON string first
        update: function LocalStorageServiceUpdate(key, value) {
            if (value) {
                localStorage.setItem(key, angular.toJson(value));
            }
        },
        // This will remove a key from localstorage
        clear: function LocalStorageServiceClear(key) {
            localStorage.removeItem(key);
        },
        generateMsgArr: function LocalStorageServiceGenMsgArr(action, symbols) {
            var retArr = [];
            var msgObj = {};

            for (var i in symbols) {
                msgObj = {action: action, symbol: symbols[i]};
                retArr.push(angular.toJson(msgObj));
            }

            return retArr;
        },
        generateStockIdMsgArr: function generateStockIdMsgArr(action, ids) {
            var retArr = [];
            var msgObj = {};

            msgObj = {action: action, equitylist: ids};
            retArr.push(angular.toJson(msgObj));

            return retArr;
        },

        getSymbolById: function getSymbolById(id) {
            var stockObjs = LocalStorageServiceGet('stockObjs');
            if (!stockObjs) {
                return;
            }
            angular.forEach(stockObjs, function (stock) {
                if (stock && stock.ss_id === id) {
                    return stock.symbol;
                }
            });
        }

    };

});



