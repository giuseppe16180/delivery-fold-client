console.debug("DataProvider", "doLogin");

var data = {
  email: "josef@gmail.gf",
  password: "789"
};
var headers = {
  "Content-Type": "application/json",
  "Access-Control-Origin": "*"
};

fetch("http://xiaomi-air-vincenzo:8080/cliente/login", {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(responseJson => {
    this.token = responseJson.value;
    console.log(this.token);
  })
  .catch(error => {
    console.error(error);
  });
