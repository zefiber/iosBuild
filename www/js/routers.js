angular.module('starter.routers', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        /*
         .state('welcome', {
         url: '/welcome',
         templateUrl: 'templates/welcome.html',
         controller: 'WelcomeCtrl'
         })


         .state('app', {
         url: '/app',
         abstract: true,
         templateUrl: 'templates/menu.html',
         controller: 'AppCtrl'
         })



         .state('app.search', {
         url: '/search',
         views: {
         'menuContent': {
         templateUrl: 'templates/search.html'
         }
         }
         })

         .state('app.browse', {
         url: '/browse',
         views: {
         'menuContent': {
         templateUrl: 'templates/browse.html'
         }
         }
         })
         .state('app.playlists', {
         url: '/playlists',
         views: {
         'menuContent': {
         templateUrl: 'templates/playlists.html',
         controller: 'PlaylistsCtrl'
         }
         }
         })

         .state('app.single', {
         url: '/playlists/:playlistId',
         views: {
         'menuContent': {
         templateUrl: 'templates/playlist.html',
         controller: 'PlaylistCtrl'
         }
         }
         });

         */

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                cache: false
            })

            // Each tab has its own nav history stack:

            .state('tab.holdings', {
                url: '/holdings',
                views: {
                    'tab-holdings': {
                        templateUrl: 'templates/tab-holdings.html',
                        //controller: 'AcctHoldingsCtrl',
                        cache: true
                    }
                }
            })


            .state('tab.orders', {
                url: '/orders',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/tab-orders.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.activities', {
                url: '/activities',
                views: {
                    'tab-activities': {
                        templateUrl: 'templates/tab-activities.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.acctsummary', {
                url: '/acctsummary',
                views: {
                    'tab-acctsummary': {
                        templateUrl: 'templates/tab-acct-summary.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('welcome', {
                url: '/welcome',
                templateUrl: 'templates/welcome.html',
                controller: 'WelcomeCtrl'
            })


            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                // controller: 'LoginCtrl'
            })

            .state('listWatchlist', {
                url: '/listWatchList',
                templateUrl: 'templates/list-watchlist.html',
                //controller: 'listWatchListCtrl',
                cache: false
            })

            .state('listAcctlist', {
                url: '/listAcctList',
                templateUrl: 'templates/list-accountlist.html',
                //controller: 'listAcctListCtrl',
                cache: false
            })

            .state('detailWatchlist', {
                url: '/detailWatchList',
                templateUrl: 'templates/detail-watchlist.html',
                controller: 'detailWatchListCtrl',
                cache: false
            })


            .state('forgotpassword', {
                url: '/forgotPassword',
                templateUrl: 'templates/forgot-password.html',
                controller: 'forgotPwdCtrl'
            })

            .state('signUp', {
                url: '/signUp',
                templateUrl: 'templates/signup.html',
                // controller: 'SignUpCtrl'
            })

            .state('customizeWatchList', {
                url: '/customizeWatchList',
                templateUrl: 'templates/customize-watchlist.html',
                // controller: 'customizeWatchListCtrl',
                cache: false
            })

            .state('editListWatchList', {
                url: '/editListWatchList',
                templateUrl: 'templates/edit-list-watchlist.html',
                // controller: 'customizeWatchListCtrl',
                cache: true
            })

            .state('customizeAccount', {
                url: '/customizeAccount',
                templateUrl: 'templates/customize-account.html',
                //controller: 'customizeAcctCtrl',
                cache: true
            })

            .state('searchNewStock', {
                url: '/searchNewStock',
                templateUrl: 'templates/search-new-stock.html',
                //controller: 'searchNewStockCtrl'
                cache: false
            })

            .state('editWatchList', {
                url: '/editWatchList/:isNew',
                templateUrl: 'templates/edit-list-watchlist.html',
                cache: false
            })

            .state('addNewAcct', {
                url: '/addNewAcct/:isEdit?index',
                templateUrl: 'templates/add-new-account.html',
                // controller: 'addNewAcctCtrl',
                cache: false
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/welcome');
    });
