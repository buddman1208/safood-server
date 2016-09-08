# safood-server

Safood Project (Samsung Junior Software Cup 2016) Node.JS Backend

# Contributor

* Android Application, Server Backend Programmer [Junseok Oh](http://github.com/kotohana5706)
* UI/UX Designer [Luminon Canoness](http://github.com/Luminon)

## API Document

* POST /auth/login : User Login

> Required Params

>> userid : User's ID [String]

>> password : User's Password [String]

> Response

>> HTTP 200 : User

>> HTTP 401 : ID / Password Incorrect

* POST /auth/register : User Register

> Required Params

>> userid : User's ID [String]

>> username : User's Name [String]

>> password : User's Password [String]

> Response

>> HTTP 200 : User

>> HTTP 409 : ID Conflict

## Database Schema

### User

> userid : User's id [String]

> password : User's Password [String]

> username : User Name [String]

> groupid : User's Group Id [String]

> history : User's Search History [Array]

>> Array Contains ONLY food's id

> exception: 

>> religion : User's Religion Exception Code [Number Array]
    
>> allergy : User's Allergic Exception Code [Number Array]
    
>> custom : User's Custom Exception [String Array]
    

### UserGroup

> name : Group's name [String]

> groupid : Group's id [String]

> admin : Group's Admin [String]

> members : Group's members [String Array]

>> Array Contains ONLY user's id


### Food

> name : Food's Name [String]

> weight : Food's weight [String]

> weightUnit : Food's weight unit [String]

> barcode : Food's barcode [String]

> foodType : Food's type [String]

> foodAllergic : Food's allergic ingredient [String]

> foodIngredient : Food's full ingredient [String]

> foodCalorie : Food's calorie [Number]

> foodOnceIntake : Food's recommended intake at once [String]

### SafoodGroup

> name : FoodGroup's name [String]

> admin : FoodGroup's admin (user/group, not defined) [String]

> color : FoodGroup's theme color [String]

> lastUpdate : FoodGroup's last updated date [Date]

> foodList : Food list in this group [String Array]

>> Array Contains ONLY food's id
