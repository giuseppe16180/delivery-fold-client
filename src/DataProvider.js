class DataProvider {
  constructor() {
    if (!!DataProvider.instance) {
      console.debug("DataProvider", "constructor", "old instance");
      return DataProvider.instance;
    }

    DataProvider.instance = this;

    //private members
    this.apiUrl = "http://xiaomi-air-vincenzo:8080";
    this.headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    };

    //public members
    this.token = "";

    console.debug("DataProvider", "constructor", "new instance");
    return this;
  }

  setRoute(route) {
    return this.apiUrl + route;
  }

  doPost(route, data) {
    console.debug("DataProvider", "doPost", (this.setRoute(route), data));
    return new Promise((resolve, reject) => {
      fetch(this.setRoute(route), {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  doLogin(email, password) {
    console.debug("DataProvider", "doLogin");

    var data = {
      email: email,
      password: password
    };

    this.doPost("/cliente/login", data)
      .then(response => {
        console.debug("DataProvider", "doLogin", "token", response.value);
        this.token = response.value;
      })
      .catch(error => console.error(error));
  }
}

export default DataProvider;
