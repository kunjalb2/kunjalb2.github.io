class User {
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.score = 0;
    }
    login() {
        console.log(this.email, 'just logged in');
    }
    logout() {
        console.log(this.email, 'just logged out');
    }
    updateScore(scoreToUpdate) {
        this.score += parseInt(scoreToUpdate);
        console.log(this.email + ' score is now ' + this.score);
        return this;
    }
}

var userOne = new User('bhavsarkunjal228@gmail.com', 'kunjal');
var userTwo = new User('kajal@gmail.com', 'kajal');

userOne.login();
userOne.updateScore(2);
userOne.updateScore(1);
userOne.logout();