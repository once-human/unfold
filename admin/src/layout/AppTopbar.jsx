import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, showConfigSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const configbuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        configbutton: configbuttonRef.current
    }));

    const onConfigButtonClick = () => {
        showConfigSidebar();
    };

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
                
                <div className="ml-3">
                    <Button className="p-link layout-topbar-button" style={{padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center'}}>
                        <Avatar icon="pi pi-user" shape="circle" className="mr-2" />
                        <span className="hidden md:inline">Admin</span>
                    </Button>
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