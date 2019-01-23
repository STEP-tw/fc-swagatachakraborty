class User {
  constructor(id = "ADMIN") {
    this.id = id;
    this.hasLogedIn = false;
  }

  setUser(id) {
    this.id = id;
  }

  removeUser() {
    this.setUser("ADMIN");
  }

  getLogedInStatus() {
    return this.hasLogedIn;
  }

  getId() {
    return this.id;
  }

  logIn() {
    this.hasLogedIn = true;
  }

  logOff() {
    this.hasLogedIn = false;
  }

  changeId(newId) {
    this.id = newId;
  }
}

module.exports = { User };
