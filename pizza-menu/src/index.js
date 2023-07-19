import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data.js";
import "./index.css";

console.log("pizzaData: ", pizzaData);

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Order Your Pizza Now</h1>
    </div>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Discover Our Menu</h2>
      {pizzaData.length > 0 ? (
        <div className="pizzas">
          {pizzaData.map((pizza) => {
            return <Pizza pizzaObject={pizza} key={pizza.name} />;
          })}
        </div>
      ) : (
        <p>
          Sorry, We are still working with our menu, Please Comeback Later 😁
        </p>
      )}
    </main>
  );
}

function Pizza(props) {
  if (props.pizzaObject.soldOut)
    return (
      <div className="pizza sold-out">
        <img src={props.pizzaObject.photoName} alt="pizza-img"></img>
        <div>
          <h3>{props.pizzaObject.name}</h3>
          <p>{props.pizzaObject.ingredients}</p>
          <span>Sold Out</span>
        </div>
      </div>
    );
  return (
    <div className="pizza">
      <img src={props.pizzaObject.photoName} alt="pizza-img"></img>
      <div>
        <h3>{props.pizzaObject.name}</h3>
        <p>{props.pizzaObject.ingredients}</p>
        <span>{props.pizzaObject.price}</span>
      </div>
    </div>
  );
}

function Footer() {
  const time = new Date().toLocaleTimeString();
  const hour = new Date().getHours();
  const isOpen = hour >= 8 && hour <= 22;
  return (
    <div className="footer">
      {isOpen ? (
        <div className="order">
          <p>{time}, We are open 😎 - place your order now 👌 </p>
          <button className="btn">Place Order</button>
        </div>
      ) : (
        <p>{time}, Sorry, We are Closed Now 😔</p>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
