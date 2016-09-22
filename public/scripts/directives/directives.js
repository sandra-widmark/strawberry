app.directive('mainNavbar', function(){
    return {
        templateUrl: 'templates/main-navbar.html'
    };
});

app.directive('loggedInNavbar', function(){
    return {
        templateUrl: 'templates/logged-in-navbar.html'
    };
});

app.directive('appDescription', function(){
    return {
        templateUrl: 'templates/app-description.html'
    };
});

app.directive('filter', function(){
    return {
        templateUrl: 'templates/filter.html'
    };
});

app.directive('popularSearches', function(){
    return {
        templateUrl: 'templates/popular-searches.html'
    };
});

app.directive('searchField', function(){
    return {
        templateUrl: 'templates/search-field.html'
    };
});

app.directive('activityCards', function(){
    return {
        templateUrl: 'templates/activity-cards.html'
    };
});

app.directive('userCards', function(){
    return {
        templateUrl: 'templates/user-cards.html'
    };
});


app.directive('userSection', function(){
    return {
        templateUrl: 'templates/user-section.html'
    };
});