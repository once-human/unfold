/* eslint-disable react-hooks/exhaustive-deps */
// 'use client'; // Removed for Vite

import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
// import AppConfig from './AppConfig'; // Temporarily comment out
import { LayoutContext } from './context/layoutcontext';
// import { PrimeReactContext } from 'primereact/api';

const Layout = () => {
    const { layoutConfig, layoutState } = useContext(LayoutContext);

    if (!layoutConfig || !layoutState) {
        return <div>Loading...</div>;
    }

    const containerClass = classNames('layout-wrapper', {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });

    return (
        <div className={containerClass}>
            <AppTopbar />
            <div className="layout-sidebar">
                <AppSidebar />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    <Outlet />
                </div>
                <AppFooter />
            </div>
            {/* <AppConfig /> */}
            {/* <div className="layout-mask"></div> */}
        </div>
    );
};

export default Layout; 