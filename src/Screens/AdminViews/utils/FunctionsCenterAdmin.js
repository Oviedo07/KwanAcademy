import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useSidebar = () => {
    const [expanded, setExpanded] = useState(true);
    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const [footerTop, setFooterTop] = useState(0);

    useEffect(() => {
        const updateSidebarHeight = () => {
            const footer = document.querySelector(".footer");
            if (footer) {
                setFooterTop(footer.getBoundingClientRect().top);
            }
        };

        updateSidebarHeight();
        window.addEventListener("resize", updateSidebarHeight);

        return () => {
            window.removeEventListener("resize", updateSidebarHeight);
        };
    }, []);

    return { expanded, toggleSidebar, footerTop };
};

export default useSidebar;

