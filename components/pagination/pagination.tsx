import { useEffect, useState } from "react";
import styles from "./pagination.module.css";
import { useTranslation } from "react-i18next";
import Select, { StylesConfig, SingleValue, ActionMeta } from "react-select";

interface Props {
     currentPage: number;
     setCurrentPage: (page: number) => void;
     setItemsPerPage: (page: number) => void;
     itemsPerPage: number;
     totalItems: number | null;
}
const PagePagination: React.FC<Props> = ({ currentPage, setCurrentPage, totalItems, itemsPerPage, setItemsPerPage }) => {
     const { t } = useTranslation("atwallet");
     const [screenSize, setScreenSize] = useState<string>("");

     const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 25;

     const getPageNumbers = () => {
          const pageNumbers = [];
          if (totalPages <= 6) {
               for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
               }
          } else {
               if (currentPage <= 4) {
                    screenSize == "large" ? pageNumbers.push(1, 2, 3, 4, 5, "more", totalPages) : pageNumbers.push(1, 2, 3, "more", totalPages);
               } else if (currentPage >= totalPages - 3) {
                    pageNumbers.push(1, "more", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
               } else {
                    pageNumbers.push(1, "more", currentPage - 1, currentPage, currentPage + 1, "more", totalPages);
               }
          }
          return pageNumbers;
     };

     const handlePageClick = (page: number) => setCurrentPage(page);

     const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setItemsPerPage(Number(event.target.value));
          setCurrentPage(1); // Reset to page 1 when items per page changes
     };
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
     return (
          <div className={styles.paginationContainer}>
               <div className={styles.itemsPerPageSelector}>
                    {screenSize === "large" && <label htmlFor="itemsPerPage">{t("text.itemsPerPage")}: </label>}
                    <div className={styles.selectWrapper}>
                         <select className={styles.pageSelector} id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                              {[15, 25, 50, 100, 200].map((option) => (
                                   <option key={option} value={option}>
                                        {option}
                                   </option>
                              ))}
                         </select>
                         <span className={`material-icons ${styles.expandMoreIcon}`}>expand_more</span>
                    </div>
               </div>

               {/* Display current page info */}
               {screenSize === "large" && (
                    <div className={styles.pageInfo}>
                         Page <b>{currentPage}</b> of <b> {totalPages}</b> | Total Item <b>{totalItems}</b>
                    </div>
               )}

               <div className={styles.paginationWrapper}>
                    <button className={styles.paginationButton} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} title={t("text.buttons.previous")}>
                         <span className="material-icons">chevron_left</span>
                    </button>

                    {getPageNumbers().map((page, index) => (
                         <button
                              key={index}
                              className={`${page === currentPage ? styles.pageNumberActive : styles.pageNumberNormal}`}
                              onClick={() => typeof page === "number" && handlePageClick(page)}
                              disabled={page === "more"}
                         >
                              {page === "more" ? <span className="material-icons">more_horiz</span> : page}
                         </button>
                    ))}

                    <button className={styles.paginationButton} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages} title={t("text.buttons.next")}>
                         <span className="material-icons">chevron_right</span>
                    </button>
               </div>
          </div>
     );
};

export default PagePagination;
