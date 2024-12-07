import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import classes from "./lang-dropdown.module.css";
import Image from "next/image";

interface Language {
     locale: string;
     key: number;
     icon: string;
     title: string;
}

const languages: Language[] = [
     {
          locale: "en",
          key: 1,
          icon: "/flags/United-states_flag.svg",
          title: "English",
     },
     {
          locale: "tr",
          key: 2,
          icon: "/flags/Flag_of_Turkey.svg",
          title: "Turkish",
     },
     {
          locale: "fr",
          key: 3,
          icon: "/flags/Flag_of_France.svg",
          title: "French",
     },
     {
          locale: "nl",
          key: 4,
          icon: "/flags/Flag_of_the_Netherlands.svg",
          title: "Dutch",
     },
     {
          locale: "de",
          key: 5,
          icon: "/flags/Flag_of_Germany.svg",
          title: "German",
     },
     {
          locale: "fa",
          key: 6,
          icon: "/flags/Flag_of_Iran.svg",
          title: "Persian",
     },
     {
          locale: "ar",
          key: 7,
          icon: "/flags/arabic-Language-Flag.svg",
          title: "Arabic",
     },
];

const LangButton: React.FC = () => {
     const { locale, locales, push } = useRouter();
     const [openDropdown, setOpenDropdown] = useState<boolean>(false);
     const [selectedLocale, setSelectedLocale] = useState<string>(locale || "");
     const dropdownRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          if (selectedLocale) {
               localStorage.setItem("locale", selectedLocale);
          }
     }, [selectedLocale]);

     useEffect(() => {
          setSelectedLocale(locale || "");
     }, [locale]);

     const handleClick = (locale: string) => {
          push("", undefined, { locale });
          setSelectedLocale(locale);
          setOpenDropdown(false);
     };

     const dropdownHandler = () => {
          setOpenDropdown(!openDropdown);
     };

     // Close dropdown if click outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setOpenDropdown(false);
               }
          };

          document.addEventListener("mousedown", handleClickOutside);

          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, [dropdownRef]);

     const selectedLanguage = languages.find((lang) => lang.locale === selectedLocale);
     console.log(locale);

     return (
          <div ref={dropdownRef}>
               {selectedLanguage && (
                    <div className={classes.dropdownBtn} onClick={dropdownHandler}>
                         <Image className={classes.flagImage} src={selectedLanguage.icon} width={24} height={24} alt="flag" />
                         <span className="material-icons">expand_more</span>
                    </div>
               )}

               {openDropdown && (
                    <div className={classes.showDropdown}>
                         {locales?.map((locale: string) => {
                              const lang = languages.find((lang) => lang.locale === locale);
                              return (
                                   lang && (
                                        <button className={classes.langBtn} key={locale} onClick={() => handleClick(locale)}>
                                             <Image className={classes.flagImage} src={lang.icon} width={24} height={24} alt="flag" />
                                             {lang.title}
                                        </button>
                                   )
                              );
                         })}
                    </div>
               )}
          </div>
     );
};

export default LangButton;
