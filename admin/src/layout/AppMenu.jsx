import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext'; // This context will also need to be created
import { Link } from 'react-router-dom'; // Changed from next/link
// import { AppMenuItem } from '@/types'; // Type removed

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    // Define the menu model based on your screenshots
    // All 'to' paths should be prefixed with '/admin' for the admin section
    const model = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            to: '/admin/dashboard'
        },
        {
            label: 'User Management',
            icon: 'pi pi-fw pi-users',
            to: '/admin/user-management'
        },
        {
            label: 'Membership Plans',
            icon: 'pi pi-fw pi-dollar',
            to: '/admin/membership-plans'
        },
        { label: 'Categories Management', icon: 'pi pi-fw pi-sitemap', to: '/admin/categories-management' },
        { label: 'Leads Management', icon: 'pi pi-fw pi-list', to: '/admin/leads-management' },
        { label: 'Admin Requirements', icon: 'pi pi-fw pi-file-edit', to: '/admin/admin-requirements' },
        { label: 'Customer Support', icon: 'pi pi-fw pi-comments', to: '/admin/customer-support' },
        { label: 'Advertise With Us', icon: 'pi pi-fw pi-megaphone', to: '/admin/advertise-with-us' },
        {
            label: 'Affiliate Program',
            icon: 'pi pi-fw pi-share-alt',
            to: '/admin/affiliate-program'
        },
        {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            to: '/admin/settings'
        }
    ];

    return (
        <MenuProvider>
            {/* Logo / Brand Name Section Added Here */}
            <div className="layout-menu-logo">
                <Link to="/admin/dashboard" className="flex align-items-center">
                    {/* <img src="/layout/images/logo-placeholder.svg" alt="Logo" height="35" className="mr-2" /> Placeholder for image logo */}
                    <span className="text-xl font-bold">bazaarleads</span>
                </Link>
            </div>
            
            <ul className="layout-menu">
                {model.map((item, i) => {
                    // Check if item itself is a separator, or use !item.items for simple top-level links
                    // The original Sakai model had item.seperator, adjust if your model uses that
                    const isSeparator = item.separator; // Assuming your model might use a separator property
                    return !isSeparator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                {/* Optional: Banner for Prime Blocks or other promotions, remove if not needed */}
                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>\n                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig?.colorScheme === 'light' ? '' : '-dark'}.png`} />\n                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu; 