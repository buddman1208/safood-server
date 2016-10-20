# safood-server

Safood Project (Samsung Junior Software Cup 2016) Node.JS Backend

# Contributor

* Android Application, Server Backend Programmer [Junseok Oh](http://github.com/kotohana5706)
* UI/UX Designer [Luminon Canoness](http://github.com/Luminon)

## API Document

* Common Response

    HTTP 200: Success

    HTTP 401: Bad Request

    HTTP 403: Params Missing
    
    HTTP 405: not found in DB

    HTTP 409: Conflict

* POST /auth/login : User Login

> Params

    userid : User's ID [String]

    password : User's    Password [String]

> Response

     HTTP 200 : User

     HTTP 401 : ID / Password Incorrect

* POST /auth/register : User Register

> Params

    userid : User's ID [String]

    username : User's Name [String]

    password : User's Password [String]

> Response

    HTTP 200 : User

    HTTP 409 : ID Conflict

* POST /auth/login/auto : Auto Login

> Params

    userid : User's ID [String]

    apikey : User's apikey [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Access Denied

* POST /user/destroySelf

> Params

    apikey : User's Apikey [String]

> Response

    HTTP 200: Success

* POST /user/getSelfInfo

> Params

    apikey : User's Apikey [String]

> Response

    HTTP 200: return User

* POST /user/getSearchHistory

> Params

    apikey : User's Apikey [String]

> Response

    HTTP 200 : return User

* POST /user/updateSelfInfo

> Params

    apikey : User's apikey [String]
    
    userid : User's id [String]

    password : User's Password [String]

    username : User Name [String]

    profileImage : User's Profile Image [File]

> Response

    HTTP 200 : return User

    HTTP 403 : Params Missing

* POST /user/updateAllergicException

> Params

    apikey : User's Apikey [String]

    allergic : selected allergic type [Number]

> Response

    HTTP 200 : Success

    HTTP 401 : Bad Request

* POST /user/updateReligiousException

> Params

    apikey : User's Apikey [String]

    allergic : selected religious type [Number]

> Response

    HTTP 200 : Success

    HTTP 401 : Bad Request

* POST /user/addKeywordException

> Params

    apikey : User's Apikey [String]

    keyword : Exception Keyword [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Bad Request

    HTTP 409 : Conflict

* POST /user/removeKeywordException

> Params

    apikey : User's Apikey [String]

    keyword : Exception Keyword [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Bad Request

* POST /user/searchUser

> Params

    searchByName : selected whether search by name or not [Boolean]

    username : User's name [String]

    userid : User's id [String]

> Response

    HTTP 200 : return User List [String Json]

    HTTP 401 : No User Found

* POST /group/searchGroup

> Params

    query : Group's Name [String]

> Response

    HTTP 200 : return Group List [String Json]

    HTTP 401 : No Group Found

* POST /group/joinGroup

> Params

    apikey : User's Apikey [String]

    groupid : Group's ID [String]

> Response

    HTTP 200 : Join Success

    HTTP 401 : No Group Found

* POST /group/leaveGroup

> Params

    apikey : User's Apikey [String]

    groupid : Group's ID [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Information incorrect

* POST /group/getGroupInfo

> Params

    groupid : Group's ID [String]

> Response

    HTTP 200 : return Group

    HTTP 401 : No group found

* POST /group/admin/checkGroupName

> Params

    groupname : Group's Name [String]

> Response

    HTTP 200 : No Conflict

    HTTP 409 : Conflict

* POST /group/admin/createGroup

> Params

    groupname : Group's name [String]

    groupid : Group's id [String]

    admin : User, which will be admin of this group [String]

> Response

    HTTP 200 : return Group

    HTTP 409 : Group Tag Conflict

* POST /group/admin/destroyGroup

> Params

    userid : User's id, to check if user is admin [String]

    groupid : Group's id [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Access Denied

* POST /group/admin/modifyGroupInfo

> Params

    userid : User's id, to check if user is admin [String]

    groupname : Group's name [String]

    groupid : Group's id [String]

    grouptag : Group's Tag (@GroupTag) [String]

> Response

    HTTP 200 : Success [String]

    HTTP 401 : Access Denied

* POST /group/admin/addUser

> Params

    userid : User's id to check if user is admin [String]

    groupid : Group's id [String]

    targetid : Target user's id [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Access Denied

* POST /group/admin/removeUser

> Params

    userid : User's id to check if user is admin [String]

    groupid : Group's id [String]

    targetid : Target user's id [String]

> Response

    HTTP 200 : Success

    HTTP 401 : Access Denied

    HTTP 402 : User is not in group

* POST /food/getFoodInfo
* POST /food/group/add
* POST /food/group/remove
* POST /food/foodDic/postArticle
* POST /food/foodDic/modifyArticle
* POST /food/foodDic/deleteArticle
* POST /food/foodDic/searchArticle


* POST /search/barcode

> Params

    apikey : User's Apikey [String]

    barcode : barcode number [String]

> Response

    HTTP 200 : Success

    HTTP 405 : not found
    
* POST /search/

> Params

    foodname : foodname [String]

> Response

    HTTP 200 : Success

    HTTP 405 : not found   

* POST /food/create

> Params

    name : food name [String]

    material : food contain material [String]
    
    content : content

> Response

    HTTP 200 : Success

    HTTP 405 : not found

* POST /group/memo

> Params

    groupid : groupid [String]

> Response

    HTTP 200 : Success send memo

    HTTP 405 : not found

* POST /group/memoAdd

> Params

    title : title [String]
    content : content [String]
    color : color [Number]
    foods : foods [String]
    groupid : groupid [String]

> Response

    HTTP 200 : Success addmemo

    HTTP 405 : not found
    
    
* POST /search/foodDic

> Params

    foodname : foodname [String]
  
> Response

    HTTP 200 : Success send foodDic

    HTTP 405 : not found

## Database Schema

### User

> userid : User's id [String]

> password : User's Password [String]

> username : User Name [String]

> groupid : User's Group Id [String]

> apikey : User's ApiKey [String]

> profileImage : User's Profile Image Address [String]

> history : 

>> foodname: [String]

>> searchdate: [Date]

>> Array Contains ONLY food's id

> exception: 

>> religion : User's Religion Exception Code [Number Array]
    
>> allergy : User's Allergic Exception Code [Number Array]
    
>> custom : User's Custom Exception [String Array]
    

### UserGroup

> groupname : Group's name [String]

> grouptag : Group's tag (@GroupTag) [String]

> groupid : Group's id [String]

> admin : Group's Admin [String]

> members : Group's members [String Array]

>> Array Contains ONLY user's id


### Food

> name : Food's Name [String]

> thumbnail : Food's thumbnail [String]

> barcode : Food's barcode [String]

> foodAllergic : Food's allergic ingredient [String]

> foodIngredient : Food's full ingredient [String]

### SafoodGroup

> name : FoodGroup's name [String]

> admin : FoodGroup's admin (user/group, not defined) [String]

> color : FoodGroup's theme color [String]

> lastUpdate : FoodGroup's last updated date [Date]

> foodList : Food list in this group [String Array]

>> Array Contains ONLY food's id
