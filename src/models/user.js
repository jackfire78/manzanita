export default class User{
    constructor (username, password, email, phoneNumber, unitNumber, role){
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNum = phoneNumber;
        this.unitNumber = unitNumber;
        this.role = role;
    }
}