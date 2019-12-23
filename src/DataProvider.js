export const routes = {
  login: "Login",
  customerHome: "CustomerHome"
};

class DataProvider {
  constructor() {
    if (!!DataProvider.instance) {
      console.debug("DataProvider", "constructor", "old instance");
      return DataProvider.instance;
    }

    DataProvider.instance = this;

    //private members
    this.apiUrl = "http://localhost:8080/";
    this.headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    };

    if (sessionStorage.getItem("token") !== undefined) {
      console.debug("DataProvider", "constructor", "token found");

      this.token = sessionStorage.getItem("token");
    } else {
      console.debug("DataProvider", "constructor", "token not found");
      this.token = null;
    }

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

  doLogin = (email, password) => {
    console.debug("DataProvider", "doLogin");

    var data = {
      email: email,
      password: password
    };

    return new Promise((resolve, reject) => {
      this.doPost("/cliente/login", data)
        .then(response => {
          if (response.value != null) {
            sessionStorage.setItem("token", response.value);
            this.navigateCustomerHome();
          } else {
            reject("LoginIncorrect");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  };

  doSearch(query) {
    console.debug("DataProvider", "doSearch");

    var data = {
      nome: query
    };

    return new Promise((resolve, reject) => {
      this.doPost("/ristorante/find", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResults");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  navigateCustomerHome() {
    window.location.href = "CustomerHome";
  }

  navigateSearch() {
    window.location.href = "Search";
  }
}

export default DataProvider;
