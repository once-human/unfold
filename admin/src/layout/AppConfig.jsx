import React, { useContext, useEffect, useState } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';

// Assuming props.simple is not used for now, or passed down from Layout.jsx if needed
const AppConfig = (props) => { 
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    
    // PrimeReactContext might not have setRipple and changeTheme directly in older versions or depending on setup.
    // These are often handled by directly manipulating layoutConfig and linking/unlinking theme CSS files.
    // For simplicity, direct manipulation of layoutConfig for ripple. Theme changing is complex and deferred.
    // const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: false }));
    };

    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e) => {
        // For PrimeReact ripple, typically you set PrimeReact.ripple = true/false globally,
        // or manage through context if PrimeReactContext provides setRipple.
        // Here, we just update layoutConfig. The actual ripple enabling/disabling might need global setup.
        if (PrimeReact && typeof PrimeReact.ripple === 'boolean') {
             PrimeReact.ripple = e.value;
        }
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };

    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    // Simplified: Theme changing UI and logic removed for now.
    // const _changeTheme = (theme, colorScheme) => {
    //     // This requires dynamic stylesheet loading/unloading
    // };

    const decrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
    };

    const applyScale = () => {
        if (document.documentElement) {
            document.documentElement.style.fontSize = layoutConfig.scale + 'px';
        }
    };

    useEffect(() => {
        if (layoutConfig && layoutConfig.scale) {
            applyScale();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig?.scale]);

    // Conditional rendering if layoutState or layoutConfig is not ready
    if (!layoutState || !layoutConfig) {
        return null; // Or a loading indicator
    }

    return (
        <>
            <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-20rem">
                {/* Simplified: Removed !props.simple condition for now */}
                <h5>Scale</h5>
                <div className="flex align-items-center">
                    <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                    <div className="flex gap-2 align-items-center">
                        {scales.map((item) => {
                            return <i className={classNames('pi pi-circle-fill', { 'text-primary-500': item === layoutConfig.scale, 'text-300': item !== layoutConfig.scale })} key={item}></i>;
                        })}
                    </div>
                    <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
                </div>

                <h5>Menu Type</h5>
                <div className="flex">
                    <div className="field-radiobutton flex-1">
                        <RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                        <label htmlFor="mode1">Static</label>
                    </div>
                    <div className="field-radiobutton flex-1">
                        <RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                        <label htmlFor="mode2">Overlay</label>
                    </div>
                </div>

                <h5>Input Style</h5>
                <div className="flex">
                    <div className="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value={'outlined'} checked={layoutConfig.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></RadioButton>
                        <label htmlFor="outlined_input">Outlined</label>
                    </div>
                    <div className="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value={'filled'} checked={layoutConfig.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                        <label htmlFor="filled_input">Filled</label>
                    </div>
                </div>

                <h5>Ripple Effect</h5>
                <InputSwitch checked={layoutConfig.ripple} onChange={(e) => changeRipple(e)}></InputSwitch>
                
                {/* Theme options removed for simplification */}
            </Sidebar>
        </>
    );
};

export default AppConfig; 