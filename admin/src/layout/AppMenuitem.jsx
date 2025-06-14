import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Adapted for react-router-dom
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
// AppMenuItemProps type is removed, props are used directly

const AppMenuitem = (props) => {
    const location = useLocation(); // Replaces usePathname and useSearchParams
    // const navigate = useNavigate(); // Replaces useRouter, if imperative navigation is needed
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);

    // isActiveRoute for react-router-dom: Check if the current location.pathname matches item.to
    const isActiveRoute = item && item.to && location.pathname === item.to;
    const active = activeMenu === key || (activeMenu && activeMenu.startsWith(key + '-'));

    // Removed Next.js specific onRouteChange and its useEffect.
    // Active link styling is handled by react-router-dom's Link/NavLink or manual classNames based on isActiveRoute.

    useEffect(() => {
        if (item && item.to && location.pathname === item.to) {
            // If navigating directly to a URL, try to set the active menu
            // This might need refinement based on how MenuContext is structured
            // and if direct URL navigation should open parent menus.
            setActiveMenu(key);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, item, key, setActiveMenu]);

    // itemClick will now only be relevant for items that are explicitly not item.to (e.g. ones with submenus, which we don't have)
    const itemClick = (event) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }
        if (item.items) {
            setActiveMenu(active ? props.parentKey : key);
            // Prevent default browser action for an <a> tag with href="#" if it's just a toggle
            event.preventDefault();
        } else {
            // This is a clickable navigation item (leaf node)
            setActiveMenu(key);
            // If item.to is present, react-router Link will handle navigation.
            // If it were a manual navigation via item.command, you might use navigate() here.
            // No preventDefault needed here as the Link component will handle navigation.
        }
    };

    const subMenu = item.items && item.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item.label}>
            <ul>
                {item.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label || i} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={classNames({ /* 'layout-root-menuitem': props.root, */ 'active-menuitem': active })}>
            {/* {props.root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>} REMOVED THIS LINE */}

            {/* Case 1: Item has URL (external link) or is a header for a submenu (has items) */}
            {(!item.to || item.items) && item.visible !== false ? (
                <a href={item.url || '#'} onClick={(e) => itemClick(e)} className={classNames(item.class, 'p-ripple')} target={item.target} tabIndex={0} role="menuitem">
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </a>
            ) : null}

            {/* Case 2: Item has 'to' prop (internal navigation link) and no sub-items - Restored to react-router Link */}
            {item.to && !item.items && item.visible !== false ? (
                <Link to={item.to} 
                      replace={item.replaceUrl} 
                      target={item.target} 
                      onClick={(e) => itemClick(e)} 
                      className={classNames(item.class, 'p-ripple', { 'active-route': isActiveRoute })} 
                      tabIndex={0} 
                      role="menuitem"
                >
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    <Ripple />
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem; 