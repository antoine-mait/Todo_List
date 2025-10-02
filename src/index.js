import "./styles.css";

import createList from "./create_list.js" ;

document.querySelector("#List_container").addEventListener("click", (e) => {
  if (e.target && e.target.id === "add_list") {
    createList();
  }
});

