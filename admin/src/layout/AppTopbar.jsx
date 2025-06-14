import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, showConfigSidebar } = useContext(LayoutContext);
    const { adminUser, logout } = useAdminAuth();
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const configbuttonRef = useRef(null);
    const menu = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        configbutton: configbuttonRef.current
    }));

    const onConfigButtonClick = () => {
        showConfigSidebar();
    };

    const menuItems = [
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
                logout();
            }
        }
    ];

    return (
        <div className="layout-topbar">
            <Link to="/admin/dashboard" className="layout-topbar-logo">
                <span className="font-bold text-xl" style={{ color: layoutConfig.colorScheme === 'light' ? 'var(--text-color)' : 'var(--surface-a)'}}>bazaarleads</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-bell"></i>
                    <span>Notifications</span>
                </button>
                
                <div 
                    className="relative ml-3 flex items-center py-2 min-h-[2.5rem]"
                >
                    {adminUser ? (
                        <>
                            <div 
                                className="cursor-pointer flex items-center"
                                style={{ backgroundColor: 'transparent !important', borderRadius: '0 !important', padding: '0 !important', margin: '0 !important' }}
                                onClick={(event) => menu.current.toggle(event)}
                                aria-controls="popup_menu" aria-haspopup
                            >
                                <span className="hidden md:inline text-gray-900 font-medium">Hey, {adminUser.username || adminUser.email}</span>
                                <i className="pi pi-angle-down ml-2"></i>
                            </div>
                            <Menu model={menuItems} popup ref={menu} id="popup_menu" />
                        </>
                    ) : (
                        <Link to="/admin/login" className="text-white flex items-center">
                            <span className="hidden md:inline">Login</span>
                        </Link>
                    )}
                </div>

                <button ref={configbuttonRef} type="button" className="p-link layout-topbar-button ml-2" onClick={onConfigButtonClick}>
                    <i className="pi pi-cog"></i>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar; 