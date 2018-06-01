import React from "react";

export default () => {
  return (
    <div>
      <footer className="bg-dark text-secondary mt-5 p-3 text-center">
        <a href="mailto:rumsa.dominykas@gmail.com" target="_top">
          Dominykas Rumša
        </a>{" "}
        &copy; {new Date().getFullYear()}{" "}
      </footer>
    </div>
  );
};
