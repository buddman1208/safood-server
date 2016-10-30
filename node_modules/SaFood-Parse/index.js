var parse = require('./route/parse.js');

parse.createUserKey('c3a5142c-ad30-4589-b67f-9eac3cdfab6c', '20', 'M', '1100000000', function (result) {
    console.log(result);
});

parse.setAppKey("asdf", function (result) {
    console.log(result);
});

parse.getFoodInfo('c3a5142c-ad30-4589-b67f-9eac3cdfab6c', 'a165bdd3-346a-4877-9b22-fb01edd2cb16', {
        foodType: 'PFD',
        searchField: 'foodName',
        searchValue: '자갈치',
        offset: 1,
        limit: 10
    }, function (result) {
        console.log(result);

})