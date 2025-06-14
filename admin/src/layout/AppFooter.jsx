/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    // const logoColor = layoutConfig?.colorScheme === 'light' ? 'dark' : 'white';
    // const logoSrc = `/layout/images/logo-${logoColor}.svg`;

    return (
        <div className="layout-footer">
            {/* <img src={logoSrc} alt="Logo" height="20" className="mr-2" /> */}
            {/* Using text instead of image for simplicity for now, or use your actual logo image */}
            <span className="font-medium mr-2">ClassyShop</span>
            by
            <span className="font-medium ml-2">Your Company Name</span> {/* Update with your company name */}
        </div>
    );
};

export default AppFooter; 