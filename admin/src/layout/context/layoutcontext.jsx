import React, { useState, createContext } from 'react';

// Default empty object for context to avoid undefined errors if not properly provided initially
export const LayoutContext = createContext({});

export const LayoutProvider = ({ children }) => {
    const [layoutConfig, setLayoutConfig] = useState({
        ripple: false, // PrimeReact ripple effect
        inputStyle: 'outlined', // or 'filled'
        menuMode: 'static', // or 'overlay'
        colorScheme: 'light', // or 'dark'
        theme: 'lara-light-indigo', // example theme
        scale: 14 // base font size
    });

    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        // Ensure window is defined (it won't be during SSR, though less of an issue with Vite CSR)
        return typeof window !== 'undefined' && window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
 