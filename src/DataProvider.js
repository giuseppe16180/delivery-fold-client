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

  isGuest = () => {
    return sessionStorage.getItem("user") == "guest";
  };

  doGetSpecialOffers = () => {
    console.debug("DataProvider", "doGetSpecialOffers");
    var data = {
      value: this.token
    };
    return new Promise((resolve, reject) => {
      this.doPost("cliente/offerta-speciale/all", data)
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
  };

  doGuestLogin = () => {
    console.debug("DataProvider", "doGuestLogin");
    return new Promise((resolve, reject) => {
      this.doGet("not-signed-access")
        .then(response => {
          if (response != null) {
            sessionStorage.setItem("token", response.value);
            sessionStorage.setItem("user", "guest");
            this.navigateCustomerHome();
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
  };

  doLogin = (email, password) => {
    console.debug("DataProvider", "doLogin");

    var data = {
      email: email,
      password: password
    };

    return new Promise((resolve, reject) => {
      this.doPost("/login", data)
        .then(response => {
          if (response.token != null) {
            sessionStorage.setItem("token", response.token);
            if (response.tipo === "cliente") {
              sessionStorage.setItem("user", "customer");
              this.navigateCustomerHome();
            }
            else {
              sessionStorage.setItem("user", "restaurant"); //a che serve? ahah
              this.navigateRestaurantHome();
             }
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

  doLogout = () => {
    console.debug("DataProvider", "doLogout");
    const data = {
      value: this.token
    };

    return new Promise((resolve, reject) => {
      this.doPost("/logout", data)
        .then(response => {
          if (response != null) {
            sessionStorage.clear();
            this.navigateLogin();
          } else {
            reject("NoResults");
          }
        })
        .catch(error => {
          console.error(error);
          if (error === "NoResults") reject("Riprova più tardi.");
          else reject("FailedToFetch");
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
          if (response.lenght != 0) {
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

  doGet(route) {
    console.debug("DataProvider", "doGet", this.setRoute(route));
    return new Promise((resolve, reject) => {
      fetch(this.setRoute(route))
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  doGetAllRestaurants() {
    console.debug("DataProvider", "getAllRestaurants");

    return new Promise((resolve, reject) => {
      this.doGet("/ristorante/all")
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

  navigateRestaurantHome() {
    window.location.href = "RestaurantHome";
  }

  navigateSearch() {
    window.location.href = "Search";
  }

  navigateRestaurantMenu(restaurant) {
    sessionStorage.setItem("restaurant", restaurant);
    window.location.href = "RestaurantMenu";
  }

  navigateCart() {
    window.location.href = "Cart";
  }

  navigateCheckOut() {
    window.location.href = "CheckOut";
  }

  navigateCustomerProfile() {
    window.location.href = "CustomerProfile";
  }

  navigateLogin() {
    window.location.href = "Login";
  }

  doAddToCart(menuEntryId) {
    console.debug("DataProvider", "doAddToCart");
    const data = {
      token: this.token,
      piatto: {
        id: menuEntryId
      }
    };

    return new Promise((resolve, reject) => {
      this.doPost("/cliente/carrello/add", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  doRemoveCartEntry(id, quantity) {
    const data = {
      token: this.token,
      piatto: {
        id: id
      },
      quantita: quantity
    };

    return new Promise((resolve, reject) => {
      this.doPost("cliente/carrello/remove", data)
        .then(response => {
          if (response != null) {
            resolve();
            this.navigateCart();
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

  doCheckOut(data) {
    data.token = this.token;

    if (data.ordine.tipo) {
      return new Promise((resolve, reject) => {
        this.doPost("cliente/ordini/domicilio/add", data)
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
    } else {
      return new Promise((resolve, reject) => {
        this.doPost("cliente/ordini/prenotazione/add", data)
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
  }

  doAddInfoToNotSignedUser(data) {
    data.token = this.token;

    return new Promise((resolve, reject) => {
      this.doPost("cliente/not-signed-user/addInfo", data)
        .then(response => {
          if (response != null) resolve(response);
          else reject("NoResults");
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  doGetCartEntries() {
    const data = {
      value: this.token
    };

    return new Promise((resolve, reject) => {
      this.doPost("cliente/carrello/get", data)
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

  doGetRestaurant() {
    const data = {
      id: sessionStorage.getItem("restaurant")
    };
    return new Promise((resolve, reject) => {
      this.doPost("ristorante/menu", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  getAllRestOrders() {
    const data = {
      value: this.token
    };

    return new Promise((resolve, reject) => {
      this.doPost("/ristorante/ordini/all", data)
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

  getRestOrder(order) {
    sessionStorage.setItem("id", order);
    window.location.href = "RestOrder";
  }

  getRestReservation(order) {
    sessionStorage.setItem("id", order);
    window.location.href = "RestReservation";
  }

  getRestReservationOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      }
    };
    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/prenotazione/details", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  getRestBookedOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      }
    };
    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/domicilio/details", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  doAcceptOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      },
      orario: ""
    };

    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/accept", data)
        .then(response => {
          if (response != null) {
            resolve(response);
            if(sessionStorage.getItem("tipo"))
              window.location.href = "RestOrder";
            else
              window.location.href = "RestReservation";
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });      
    });
  }

  doCancelOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      }
    };

    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/delete", data)
        .then(response => {
          if (response != null) {
            resolve(response);
            if(sessionStorage.getItem("tipo"))
              window.location.href = "RestOrder";
            else
              window.location.href = "RestReservation";
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });      
    });
  }

  doShipOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      },
      orario: "2020-01-07T14:00:00"
    };

    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/delivery", data)
        .then(response => {
          if (response != null) {
            resolve(response);
            window.location.href = "RestOrder";
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });      
    });
  }

  doCompleteOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      },
      orario: "2020-01-07T14:00:00"
    };

    return new Promise((resolve, reject) => {
      this.doPost("ristorante/ordini/complete", data)
        .then(response => {
          if (response != null) {
            resolve(response);
            if(sessionStorage.getItem("tipo"))
              window.location.href = "RestOrder";
            else
              window.location.href = "RestReservation";
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });      
    });
  }

  getAllOrders() {
    const data = {
      value: this.token
    };

    return new Promise((resolve, reject) => {
      this.doPost("/cliente/ordini/all", data)
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

  navigateOrders() {
    window.location.href = "OrdersHistory";
  }

  getOrder(order) {
    sessionStorage.setItem("id", order);
    window.location.href = "Order";
  }

  getBookedOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      }
    };
    return new Promise((resolve, reject) => {
      this.doPost("cliente/ordini/domicilio/details", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }

  getReservation(resv) {
    sessionStorage.setItem("id", resv);
    window.location.href = "Reservation";
  }

  getReservationOrder() {
    const data = {
      token: this.token,
      ordine: {
        id: sessionStorage.getItem("id")
      }
    };

    return new Promise((resolve, reject) => {
      this.doPost("cliente/ordini/prenotazione/details", data)
        .then(response => {
          if (response != null) {
            resolve(response);
          } else {
            reject("NoResult");
          }
        })
        .catch(error => {
          console.error(error);
          reject("FailedToFetch");
        });
    });
  }
}

export default DataProvider;
