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

  doLogin(email, password) {
    console.debug("DataProvider", "doLogin");

    /*
    fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        this.token = responseJson.movies;
      })
      .catch(error => {
        console.error(error);
      });
  */
  }
}

export default DataProvider;
