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

> exception: 

>> religion : User's Religion Exception Code [Number Array]
    
>> allergy : User's Allergic Exception Code [Number Array]
    
>> custom : User's Custom Exception [String Array]
    

### Group

> name : Group's name [String]

> groupid : Group's id [String]

> members : Group's members [String Array]


