import React, { useState, createContext } from 'react';

export const MenuContext = createContext({
    activeMenu: '',
    setActiveMenu: () => {},
    // Add other context values if needed from Sakai, e.g., for mobile state
    // staticMenuDesktopInactive: false,
    // onDesktopMenuBuyClick: () => {},
    // onStaticMenuLeave: () => {},
    // onSidebarClick: () => {},
    // onMobileTopbarMenuStillItemsClick: () => {},
    // onMobileSubTopbarMenuStillItemsClick: () => {},
    // isHorizontal: () => false,
    // isSlim: () => false,
    // isSlimPlus: () => false,
    // isStatic: () => false,
    // isOverlay: () => false,
    // isDesktop: () => true, // Assuming desktop for now
});

export const MenuProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('');

    // Add other state and functions if they were part of Sakai's MenuContext
    // and are used by AppMenuitem or other layout components.

    return (
        <MenuContext.Provider value={{
            activeMenu,
            setActiveMenu,
            // Provide other values here
        }}>
            {children}
        </MenuContext.Provider>
    );
}; 