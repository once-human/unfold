import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Panel } from 'primereact/panel';

const AdminSettings = () => {

    const [pinSecurityEnabled, setPinSecurityEnabled] = useState(false);
    const [autoBillingEnabled, setAutoBillingEnabled] = useState(true);

    const dataExportOptions = [
        {name: 'Users (CSV)', icon: 'pi pi-users', action: () => console.log('Exporting Users CSV...')},
        {name: 'Leads (CSV)', icon: 'pi pi-briefcase', action: () => console.log('Exporting Leads CSV...')},
        {name: 'Membership Plans (PDF)', icon: 'pi pi-id-card', action: () => console.log('Exporting Plans PDF...')},
        {name: 'Sales Data (CSV)', icon: 'pi pi-chart-line', action: () => console.log('Exporting Sales CSV...')}
    ];

    const securityReportTypes = [
        {name: 'System Error Logs', icon: 'pi pi-exclamation-triangle', action: () => console.log('Viewing System Error Logs...')},
        {name: 'Payment Error Logs', icon: 'pi pi-credit-card', action: () => console.log('Viewing Payment Error Logs...')},
        {name: 'Access Attempts', icon: 'pi pi-shield', action: () => console.log('Viewing Access Logs...')},
        {name: 'Internal Bug Reports', icon: 'pi pi-bug', action: () => console.log('Viewing Internal Bug Reports...')}
    ];

    const pageTitle = <h2 className="text-2xl font-semibold m-0">Admin Settings & Tools</h2>;

    return (
        <div className="p-4 surface-card min-h-screen">
            <Card title={pageTitle} className="shadow-2 border-round">
                <Accordion multiple activeIndex={[0, 1, 2]}>
                    <AccordionTab header={<><i className="pi pi-credit-card mr-2"></i> Payment & Billing</>}>
                        <Panel header="Automatic Payment Billing" className="mb-3" toggleable collapsed={true}>
                            <div className="flex align-items-center justify-content-between mb-3">
                                <label className="font-semibold">Enable Automatic Billing</label>
                                <InputSwitch checked={autoBillingEnabled} onChange={(e) => setAutoBillingEnabled(e.value)} />
                            </div>
                            <p className="mt-0 text-color-secondary text-sm">
                                Manage settings related to automated subscription renewals and payment processing. 
                                (Full implementation requires backend integration.)
                            </p>
                            <Button label="Configure Billing Settings" icon="pi pi-cog" className="p-button-sm p-button-outlined mt-2" disabled/>
                        </Panel>
                    </AccordionTab>

                    <AccordionTab header={<><i className="pi pi-shield mr-2"></i> Security & Access</>}>
                        <Panel header="Admin Panel PIN Security" className="mb-3" toggleable collapsed={true}>
                            <div className="flex align-items-center justify-content-between mb-3">
                                <label className="font-semibold">Enable PIN Security</label>
                                <InputSwitch checked={pinSecurityEnabled} onChange={(e) => setPinSecurityEnabled(e.value)} />
                            </div>
                            <p className="mt-0 text-color-secondary text-sm">
                                Secure different areas of the admin panel with PIN verification. 
                                (Configuration options would appear here if enabled; requires backend logic.)
                            </p>
                            {pinSecurityEnabled && (
                                <div className="mt-2">
                                    <Button label="Configure PIN Settings" icon="pi pi-key" className="p-button-sm p-button-outlined" disabled/>
                                </div>
                            )}
                        </Panel>
                        <Panel header="Security & Privacy Reporting" toggleable collapsed={false}>
                            <p className="mt-0 mb-3 text-color-secondary text-sm">Access various security and system reports. (Links/actions are placeholders.)</p>
                            <div className="grid">
                                {securityReportTypes.map(report => (
                                    <div key={report.name} className="col-12 md:col-6 mb-2">
                                        <Button label={report.name} icon={report.icon || 'pi pi-file-text'} className="w-full p-button-outlined p-button-secondary p-button-sm" onClick={report.action}/>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    </AccordionTab>

                    <AccordionTab header={<><i className="pi pi-download mr-2"></i> Data Export</>}>
                        <Panel header="Export Data" toggleable collapsed={false}>
                            <p className="mt-0 mb-3 text-color-secondary text-sm">Export various data sets from the system. (Functionality requires backend implementation.)</p>
                            <div className="grid">
                                {dataExportOptions.map(option => (
                                    <div key={option.name} className="col-12 md:col-6 mb-2">
                                        <Button label={option.name} icon={option.icon || 'pi pi-download'} className="w-full p-button-outlined p-button-sm" onClick={option.action}/>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    </AccordionTab>
                </Accordion>
            </Card>
        </div>
    );
};

export default AdminSettings;