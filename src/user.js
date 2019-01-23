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

  changeLoginStatus() {
    this.hasLogedIn = !this.hasLogedIn;
  }

  changeId(newId) {
    this.id = newId;
  }
}

module.exports = { User };
