import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

const ThemeToggle = () => {
     const [theme, setTheme] = useState<string>("light");
     const [screenSize, setScreenSize] = useState("");

     useEffect(() => {
          const savedTheme = localStorage.getItem("theme");
          if (savedTheme) {
               setTheme(savedTheme);
               document.documentElement.setAttribute("data-theme", savedTheme);
          }
     }, []);

     useEffect(() => {
          function handleResize() {
               const width = window.innerWidth;
               if (width <= 600) {
                    setScreenSize("small");
               } else if (width >= 600 && width <= 1199) {
                    setScreenSize("medium");
               } else {
                    setScreenSize("large");
               }
          }

          handleResize(); // Call it once to set the initial screen size

          // Attach the event listener
          window.addEventListener("resize", handleResize);

          // Clean up the event listener when the component unmounts
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     const toggleTheme = () => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);

          // Trigger custom event
          const event = new Event("theme-change");
          window.dispatchEvent(event);
     };

     return screenSize === "large" ? (
          <div>
               <input type="checkbox" className={styles.checkbox} id="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
               <label htmlFor="checkbox" className={styles.checkbox_label}>
                    <span className={`material-icons ${styles.fa_moon}`}>bedtime</span>
                    <span className={`material-icons ${styles.fa_sun}`}>light_mode</span>
                    <span className={styles.ball}></span>
               </label>
          </div>
     ) : (
          <button onClick={toggleTheme} className="material-icons">
               {theme === "light" ? "light_mode" : "nights_stay"}
          </button>
     );
};

export default ThemeToggle;
