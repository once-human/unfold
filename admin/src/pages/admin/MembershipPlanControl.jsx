import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for new plans/codes
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

const MembershipPlanControl = () => {
    const toast = useRef(null);
    const dtPlans = useRef(null);
    const dtCodes = useRef(null);

    // --- Membership Plans State ---
    const [plans, setPlans] = useState([]);
    const [planDialog, setPlanDialog] = useState(false);
    const [deletePlanDialog, setDeletePlanDialog] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null); // For editing or creating a new plan
    const [isNewPlan, setIsNewPlan] = useState(false);
    const [globalFilterPlans, setGlobalFilterPlans] = useState('');
    
    // --- Discount Codes State ---
    const [discountCodes, setDiscountCodes] = useState([]);
    const [codeDialog, setCodeDialog] = useState(false);
    const [deleteCodeDialog, setDeleteCodeDialog] = useState(false);
    const [currentCode, setCurrentCode] = useState(null);
    const [isNewCode, setIsNewCode] = useState(false);
    const [globalFilterCodes, setGlobalFilterCodes] = useState('');


    const initialPlanState = {
        id: null,
        name: '',
        price: 0,
        leadsPerMonth: 0,
        features: [], // Array of strings
        durationMonths: 1, // Default to 1 month
        active: true
    };

    const initialCodeState = {
        id: null,
        code: '',
        discountPercentage: 0,
        validityStartDate: null,
        validityEndDate: null,
        isActive: true,
        maxUses: null, // Optional: Maximum number of uses
        timesUsed: 0  // Optional: How many times it has been used, should always start at 0 and be non-editable by admin directly
    };
    
    // --- Dummy Data ---
    useEffect(() => {
        setPlans([
            { id: 'P001', name: 'Basic Free', price: 0, leadsPerMonth: 5, durationMonths: 12, features: ['Limited Lead Access', 'Basic Support'], active: true },
            { id: 'P002', name: 'Silver Monthly', price: 49, leadsPerMonth: 50, durationMonths: 1, features: ['Full Lead Access', 'Priority Support', 'Analytics Dashboard'], active: true },
            { id: 'P003', name: 'Gold Yearly', price: 499, leadsPerMonth: 75, durationMonths: 12, features: ['Full Lead Access', 'Dedicated Support', 'Advanced Analytics', 'Verified Supplier Badge'], active: true },
            { id: 'P004', name: 'Platinum Yearly', price: 999, leadsPerMonth: 150, durationMonths: 12, features: ['All Gold Features', 'Early Access to Leads', 'Account Manager'], active: false },
        ]);

        setDiscountCodes([
            { id: 'D001', code: 'WELCOME10', discountPercentage: 10, validityStartDate: new Date('2023-01-01'), validityEndDate: new Date('2024-12-31'), isActive: true, maxUses: 100, timesUsed: 25 },
            { id: 'D002', code: 'SAVEBIG20', discountPercentage: 20, validityStartDate: new Date('2023-06-01'), validityEndDate: new Date('2023-12-31'), isActive: true, maxUses: 50, timesUsed: 45 },
            { id: 'D003', code: 'EXPIRED5', discountPercentage: 5, validityStartDate: new Date('2023-01-01'), validityEndDate: new Date('2023-05-31'), isActive: false, maxUses: null, timesUsed: 10 },
        ]);
    }, []);

    // --- Membership Plan Handlers ---
    const openNewPlanDialog = () => {
        setCurrentPlan({...initialPlanState, features: ['']}); // Start with one empty feature line
        setIsNewPlan(true);
        setPlanDialog(true);
    };

    const openEditPlanDialog = (plan) => {
        setCurrentPlan({...plan, features: plan.features.length > 0 ? [...plan.features] : ['']});
        setIsNewPlan(false);
        setPlanDialog(true);
    };
    
    const hidePlanDialog = () => {
        setPlanDialog(false);
        setCurrentPlan(null);
    };

    const handlePlanInputChange = (e, name) => {
        const val = (e.target && e.target.value !== undefined) ? e.target.value : e.value;
        setCurrentPlan({ ...currentPlan, [name]: val });
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...currentPlan.features];
        updatedFeatures[index] = value;
        setCurrentPlan({ ...currentPlan, features: updatedFeatures });
    };

    const addFeature = () => {
        setCurrentPlan({ ...currentPlan, features: [...currentPlan.features, ''] });
    };

    const removeFeature = (index) => {
        const updatedFeatures = currentPlan.features.filter((_, i) => i !== index);
        setCurrentPlan({ ...currentPlan, features: updatedFeatures });
    };


    const savePlan = () => {
        if (!currentPlan.name || currentPlan.price < 0 || currentPlan.leadsPerMonth < 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Name, Price, and Leads per Month must be valid.', life: 3000 });
            return;
        }
        
        let _plans = [...plans];
        const planToSave = { ...currentPlan, features: currentPlan.features.filter(f => f && f.trim() !== '') };

        if (isNewPlan) {
            _plans.push({ ...planToSave, id: uuidv4() });
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Created', life: 3000 });
        } else {
            const index = _plans.findIndex(p => p.id === currentPlan.id);
            _plans[index] = planToSave;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Updated', life: 3000 });
        }
        setPlans(_plans);
        hidePlanDialog();
    };

    const confirmDeletePlan = (plan) => {
        setCurrentPlan(plan);
        setDeletePlanDialog(true);
    };
    
    const hideDeletePlanDialog = () => setDeletePlanDialog(false);

    const deletePlan = () => {
        setPlans(plans.filter(p => p.id !== currentPlan.id));
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Deleted', life: 3000 });
        hideDeletePlanDialog();
        setCurrentPlan(null);
    };

    // --- Discount Code Handlers ---
     const openNewCodeDialog = () => {
        setCurrentCode(initialCodeState);
        setIsNewCode(true);
        setCodeDialog(true);
    };

    const openEditCodeDialog = (code) => {
        setCurrentCode({
            ...code,
            validityStartDate: code.validityStartDate ? new Date(code.validityStartDate) : null,
            validityEndDate: code.validityEndDate ? new Date(code.validityEndDate) : null,
        });
        setIsNewCode(false);
        setCodeDialog(true);
    };
    
    const hideCodeDialog = () => {
        setCodeDialog(false);
        setCurrentCode(null);
    };

    const handleCodeInputChange = (e, name) => {
        const val = (e.target && e.target.value !== undefined) ? e.target.value : e.value;
        setCurrentCode({ ...currentCode, [name]: val });
    };
    
    const saveCode = () => {
        if (!currentCode.code || currentCode.discountPercentage <= 0 || currentCode.discountPercentage > 100) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Code and a valid Discount Percentage (1-100) are required.', life: 3000 });
            return;
        }
         if (currentCode.validityStartDate && currentCode.validityEndDate && currentCode.validityStartDate > currentCode.validityEndDate) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Start date cannot be after end date.', life: 3000 });
            return;
        }

        let _codes = [...discountCodes];
        if (isNewCode) {
            _codes.push({ ...currentCode, id: uuidv4(), timesUsed: currentCode.timesUsed || 0 });
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Discount Code Created', life: 3000 });
        } else {
            const index = _codes.findIndex(c => c.id === currentCode.id);
            _codes[index] = currentCode;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Discount Code Updated', life: 3000 });
        }
        setDiscountCodes(_codes);
        hideCodeDialog();
    };
    
    const confirmDeleteCode = (code) => {
        setCurrentCode(code);
        setDeleteCodeDialog(true);
    };

    const hideDeleteCodeDialog = () => setDeleteCodeDialog(false);

    const deleteCode = () => {
        setDiscountCodes(discountCodes.filter(c => c.id !== currentCode.id));
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Discount Code Deleted', life: 3000 });
        hideDeleteCodeDialog();
        setCurrentCode(null);
    };

    const exportPlansCSV = () => {
        dtPlans.current.exportCSV();
    };

    const exportCodesCSV = () => {
        dtCodes.current.exportCSV();
    };

    const plansLeftToolbarTemplate = () => (
        <Button label="New Plan" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNewPlanDialog} />
    );

    const plansRightToolbarTemplate = () => (
        <React.Fragment>
            <span className="p-input-icon-left mr-2">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterPlans} onChange={(e) => setGlobalFilterPlans(e.target.value)} placeholder="Search plans..." className="p-inputtext-sm" />
            </span>
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportPlansCSV} />
        </React.Fragment>
    );

    const codesLeftToolbarTemplate = () => (
        <Button label="New Code" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNewCodeDialog} />
    );

    const codesRightToolbarTemplate = () => (
        <React.Fragment>
            <span className="p-input-icon-left mr-2">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterCodes} onChange={(e) => setGlobalFilterCodes(e.target.value)} placeholder="Search codes..." className="p-inputtext-sm" />
            </span>
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCodesCSV} />
        </React.Fragment>
    );

    // --- Templates & Renderers ---
    const planActionsTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text className="p-button-warning" onClick={() => openEditPlanDialog(rowData)} tooltip="Edit Plan" />
            <Button icon="pi pi-trash" rounded text className="p-button-danger" onClick={() => confirmDeletePlan(rowData)} tooltip="Delete Plan" />
        </div>
    );
    
    const planStatusTemplate = (rowData) => (
        <Tag value={rowData.active ? "Active" : "Inactive"} severity={rowData.active ? "success" : "danger"} rounded />
    );

    const planFeaturesTemplate = (rowData) => (
        <ul className="list-disc pl-5 text-sm">
            {rowData.features.map((feature, i) => <li key={i}>{feature}</li>)}
        </ul>
    );

    const planDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hidePlanDialog} className="p-button-sm"/>
            <Button label={isNewPlan ? "Create" : "Save Changes"} icon="pi pi-check" onClick={savePlan} className="p-button-sm" autoFocus />
        </>
    );
    
    const deletePlanDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePlanDialog} className="p-button-sm"/>
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deletePlan} className="p-button-sm" autoFocus />
        </>
    );

    const codeActionsTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text className="p-button-warning" onClick={() => openEditCodeDialog(rowData)} tooltip="Edit Code" />
            <Button icon="pi pi-trash" rounded text className="p-button-danger" onClick={() => confirmDeleteCode(rowData)} tooltip="Delete Code" />
        </div>
    );

    const codeStatusTemplate = (rowData) => {
        const today = new Date();
        const endDate = rowData.validityEndDate ? new Date(rowData.validityEndDate) : null;
        let isActiveSystem = rowData.isActive;
        if (endDate && endDate < today) {
            isActiveSystem = false; // Override if past expiry
        }
        
        return <Tag value={isActiveSystem ? "Active" : "Inactive"} severity={isActiveSystem ? "success" : "danger"} rounded />;
    };
    
    const codeDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideCodeDialog} className="p-button-sm"/>
            <Button label={isNewCode ? "Create Code" : "Save Changes"} icon="pi pi-check" onClick={saveCode} className="p-button-sm" autoFocus />
        </>
    );

    const deleteCodeDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCodeDialog} className="p-button-sm"/>
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deleteCode} className="p-button-sm" autoFocus />
        </>
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    return (
        <div className="p-4 surface-card">
            <Toast ref={toast} />
            
            <Accordion activeIndex={0}>
                <AccordionTab header={<><i className="pi pi-list mr-2"></i> Membership Plans Management</>}>
                    <Card className="shadow-2 border-round">
                        <Toolbar 
                            className="mb-4 p-4 border-round-top border-bottom-1 surface-border" 
                            start={plansLeftToolbarTemplate} 
                            end={plansRightToolbarTemplate}
                            pt={{ root: { className: 'border-noround' } }}
                        />
                        <DataTable 
                            ref={dtPlans}
                            value={plans} 
                            paginator 
                            rows={5} 
                            rowsPerPageOptions={[5, 10, 20]}
                            globalFilter={globalFilterPlans} 
                            emptyMessage="No plans found."
                            responsiveLayout="scroll"
                            header={<h3 className="text-xl font-semibold m-0 pl-2 pt-2">Plan List</h3>}
                        >
                            <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }} headerClassName="font-semibold"/>
                            <Column field="price" header="Price (INR)" body={(rowData) => `₹${rowData.price}` } sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold"/>
                            <Column field="leadsPerMonth" header="Leads/Month" sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="durationMonths" header="Duration (Months)" sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="features" header="Features" body={planFeaturesTemplate} style={{ minWidth: '20rem' }} headerClassName="font-semibold"/>
                            <Column field="active" header="Status" body={planStatusTemplate} sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold"/>
                            <Column body={planActionsTemplate} exportable={false} style={{ minWidth: '8rem' }} header="Actions" frozen alignFrozen="right" headerClassName="font-semibold"/>
                        </DataTable>
                    </Card>
                </AccordionTab>

                <AccordionTab header={<><i className="pi pi-tags mr-2"></i> Discount Code Tool</>}>
                     <Card className="shadow-2 border-round">
                        <Toolbar 
                            className="mb-4 p-4 border-round-top border-bottom-1 surface-border" 
                            start={codesLeftToolbarTemplate} 
                            end={codesRightToolbarTemplate}
                            pt={{ root: { className: 'border-noround' } }}
                        />
                        <DataTable 
                            ref={dtCodes}
                            value={discountCodes} 
                            paginator 
                            rows={5} 
                            rowsPerPageOptions={[5, 10, 20]}
                            globalFilter={globalFilterCodes} 
                            emptyMessage="No discount codes found."
                            responsiveLayout="scroll"
                            header={<h3 className="text-xl font-semibold m-0 pl-2 pt-2">Discount Code List</h3>}
                        >
                            <Column field="code" header="Code" sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="discountPercentage" header="Discount (%)" body={(rowData) => `${rowData.discountPercentage}%`} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="validityStartDate" header="Valid From" body={(rowData) => formatDate(rowData.validityStartDate)} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="validityEndDate" header="Valid Until" body={(rowData) => formatDate(rowData.validityEndDate)} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                            <Column field="maxUses" header="Max Uses" body={(rowData) => rowData.maxUses === null ? 'Unlimited' : rowData.maxUses} sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold"/>
                            <Column field="timesUsed" header="Times Used" sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold"/>
                            <Column field="isActive" header="Status" body={codeStatusTemplate} sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold"/>
                            <Column body={codeActionsTemplate} exportable={false} style={{ minWidth: '8rem' }} header="Actions" frozen alignFrozen="right" headerClassName="font-semibold"/>
                        </DataTable>
                    </Card>
                </AccordionTab>
            </Accordion>


            {/* Plan Dialog */}
            <Dialog visible={planDialog} style={{ width: '45rem' }} header={isNewPlan ? "Create New Plan" : "Edit Plan"} modal className="p-fluid" footer={planDialogFooter} onHide={hidePlanDialog}>
                <div className="formgrid grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="planName" className="font-semibold">Plan Name</label>
                        <InputText id="planName" value={currentPlan?.name || ''} onChange={(e) => handlePlanInputChange(e, 'name')} required autoFocus className={!currentPlan?.name ? 'p-invalid' : ''}/>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="planPrice" className="font-semibold">Price (INR)</label>
                        <InputNumber id="planPrice" value={currentPlan?.price || 0} onValueChange={(e) => handlePlanInputChange(e, 'price')} mode="currency" currency="INR" locale="en-IN" min={0} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="planLeads" className="font-semibold">Leads per Month</label>
                        <InputNumber id="planLeads" value={currentPlan?.leadsPerMonth || 0} onValueChange={(e) => handlePlanInputChange(e, 'leadsPerMonth')} integeronly min={0} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="planDuration" className="font-semibold">Duration (Months)</label>
                        <InputNumber id="planDuration" value={currentPlan?.durationMonths || 1} onValueChange={(e) => handlePlanInputChange(e, 'durationMonths')} integeronly min={1} />
                    </div>
                    <div className="field col-12">
                        <label className="font-semibold">Features</label>
                        {currentPlan?.features?.map((feature, index) => (
                            <div key={index} className="p-inputgroup mb-2">
                                <InputText value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder={`Feature ${index + 1}`} />
                                <Button icon="pi pi-minus" className="p-button-danger" onClick={() => removeFeature(index)} disabled={currentPlan.features.length === 1 && index === 0 && feature === ''} /> 
                            </div>
                        ))}
                        <Button label="Add Feature" icon="pi pi-plus" className="p-button-outlined p-button-sm mt-2" onClick={addFeature} />
                    </div>
                    <div className="field col-12">
                        <div className="flex align-items-center">
                            <Checkbox inputId="planActive" checked={currentPlan?.active || false} onChange={e => setCurrentPlan({...currentPlan, active: e.checked})} className="mr-2" />
                            <label htmlFor="planActive" className="font-semibold">Active Plan</label>
                        </div>
                    </div>
                </div>
            </Dialog>
            
            {/* Delete Plan Confirmation Dialog */}
            <Dialog visible={deletePlanDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deletePlanDialogFooter} onHide={hideDeletePlanDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                    {currentPlan && <span>Are you sure you want to delete the plan <strong>{currentPlan.name}</strong>? This action cannot be undone.</span>}
                </div>
            </Dialog>

             {/* Code Dialog */}
            <Dialog visible={codeDialog} style={{ width: '40rem' }} header={isNewCode ? "Create Discount Code" : "Edit Discount Code"} modal className="p-fluid" footer={codeDialogFooter} onHide={hideCodeDialog}>
                <div className="formgrid grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="codeValue" className="font-semibold">Discount Code</label>
                        <InputText id="codeValue" value={currentCode?.code || ''} onChange={(e) => handleCodeInputChange(e, 'code')} required autoFocus className={!currentCode?.code ? 'p-invalid' : ''} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="discountPercentage" className="font-semibold">Discount Percentage</label>
                        <InputNumber id="discountPercentage" value={currentCode?.discountPercentage || 0} onValueChange={(e) => handleCodeInputChange(e, 'discountPercentage')} suffix="%" min={1} max={100} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="validityStartDate" className="font-semibold">Valid From</label>
                        <Calendar id="validityStartDate" value={currentCode?.validityStartDate} onChange={(e) => handleCodeInputChange(e, 'validityStartDate')} dateFormat="dd/mm/yy" showIcon />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="validityEndDate" className="font-semibold">Valid Until</label>
                        <Calendar id="validityEndDate" value={currentCode?.validityEndDate} onChange={(e) => handleCodeInputChange(e, 'validityEndDate')} dateFormat="dd/mm/yy" showIcon minDate={currentCode?.validityStartDate} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="maxUses" className="font-semibold">Maximum Uses (optional)</label>
                        <InputNumber id="maxUses" value={currentCode?.maxUses === null || currentCode?.maxUses === undefined ? null : currentCode.maxUses} onValueChange={(e) => handleCodeInputChange(e, 'maxUses')} placeholder="Unlimited" integeronly min={1} />
                    </div>
                     <div className="field col-12 md:col-6">
                        <label htmlFor="timesUsed" className="font-semibold">Times Used</label>
                        <InputNumber id="timesUsed" value={currentCode?.timesUsed || 0} onValueChange={(e) => handleCodeInputChange(e, 'timesUsed')} integeronly min={0} disabled={true} /> 
                    </div>
                    <div className="field col-12">
                        <div className="flex align-items-center">
                            <Checkbox inputId="codeActive" checked={currentCode?.isActive || false} onChange={e => setCurrentCode({...currentCode, isActive: e.checked})} className="mr-2" />
                            <label htmlFor="codeActive" className="font-semibold">Active Code</label>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* Delete Code Confirmation Dialog */}
            <Dialog visible={deleteCodeDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deleteCodeDialogFooter} onHide={hideDeleteCodeDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                    {currentCode && <span>Are you sure you want to delete the code <strong>{currentCode.code}</strong>? This action cannot be undone.</span>}
                </div>
            </Dialog>

        </div>
    );
};

export default MembershipPlanControl; 