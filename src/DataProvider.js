class DataProvider {
  constructor() {
    if (!!DataProvider.instance) {
      console.debug("DataProvider", "constructor", "old instance");

      return DataProvider.instance;
    }

    DataProvider.instance = this;

    this.token = "";
    console.debug("DataProvider", "constructor", "new instance");
    return this;
  }

  doLogin(data) {
    console.debug("DataProvider", "doLogin");
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
      "Access-Control-Allow-Origin": "xiaomi-air-vincenzo"
    };
    fetch("http://xiaomi-air-vincenzo:8080/cliente/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        this.token = responseJson.value;
        console.debug("DataProvider", "token: " + this.token);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default DataProvider;
