import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from 'primereact/dropdown'; // For category selection, etc.
import { Calendar } from 'primereact/calendar'; // If a date is needed for requirements

const AdminRequirements = () => {
    const toast = useRef(null);
    const dt = useRef(null);
    const [requirements, setRequirements] = useState([]);
    const [requirementDialog, setRequirementDialog] = useState(false);
    const [deleteRequirementDialog, setDeleteRequirementDialog] = useState(false);
    const [currentRequirement, setCurrentRequirement] = useState(null);
    const [isNewRequirement, setIsNewRequirement] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedRequirements, setSelectedRequirements] = useState(null); // For multi-delete
    const [deleteRequirementsDialog, setDeleteRequirementsDialog] = useState(false); // For multi-delete confirmation

    // Example categories - in a real app, this might come from a shared source or API
    const categories = [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Fashion', value: 'Fashion' },
        { label: 'Home & Garden', value: 'Home & Garden' },
        { label: 'Software Services', value: 'Software Services' },
        { label: 'Construction Material', value: 'Construction Material' },
        { label: 'Other', value: 'Other' }
    ];

    const initialRequirementState = {
        id: null,
        title: '',
        description: '',
        category: null,
        contactPerson: 'Admin', // Default admin contact
        contactEmail: 'admin@bazaarleads.com',
        contactPhone: '123-456-7890',
        location: '',
        agentName: 'BazaarLeads Team', // Default agent name
        datePosted: new Date(),
        status: 'Active' // e.g., Active, Fulfilled, Cancelled
    };

    useEffect(() => {
        // Dummy initial data
        setRequirements([
            { ...initialRequirementState, id: uuidv4(), title: 'Need 5000 custom printed T-shirts', category: 'Fashion', location: 'Mumbai', datePosted: new Date('2023-11-05') },
            { ...initialRequirementState, id: uuidv4(), title: 'Bulk purchase of A4 paper reams', category: 'Office Supplies', location: 'Delhi', contactPerson: 'Procurement Dept.', status: 'Active', datePosted: new Date('2023-11-02') },
        ]);
    }, []);

    const openNewRequirementDialog = () => {
        setCurrentRequirement({...initialRequirementState, id: null, datePosted: new Date() });
        setIsNewRequirement(true);
        setRequirementDialog(true);
    };

    const openEditRequirementDialog = (req) => {
        setCurrentRequirement({...req, datePosted: new Date(req.datePosted) }); // Ensure date is a Date object
        setIsNewRequirement(false);
        setRequirementDialog(true);
    };

    const hideRequirementDialog = () => {
        setRequirementDialog(false);
        setCurrentRequirement(null);
    };

    const handleInputChange = (e, name) => {
        const val = (e.target && e.target.value !== undefined) ? e.target.value : e.value;
        setCurrentRequirement(prev => ({ ...prev, [name]: val }));
    };

    const saveRequirement = () => {
        if (!currentRequirement.title || !currentRequirement.category || !currentRequirement.description) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Title, Category, and Description are required.', life: 3000 });
            return;
        }
        let _requirements = [...requirements];
        if (isNewRequirement) {
            _requirements.push({ ...currentRequirement, id: uuidv4(), datePosted: new Date() });
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Requirement Posted', life: 3000 });
        } else {
            const index = _requirements.findIndex(r => r.id === currentRequirement.id);
            _requirements[index] = { ...currentRequirement };
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Requirement Updated', life: 3000 });
        }
        setRequirements(_requirements);
        hideRequirementDialog();
    };

    const confirmDeleteRequirement = (req) => {
        setCurrentRequirement(req);
        setDeleteRequirementDialog(true);
    };
    const hideDeleteRequirementDialog = () => setDeleteRequirementDialog(false);

    const deleteRequirement = () => {
        setRequirements(requirements.filter(r => r.id !== currentRequirement.id));
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Requirement Deleted', life: 3000 });
        hideDeleteRequirementDialog();
        setCurrentRequirement(null);
    };

    // Functions for multi-delete
    const confirmDeleteSelected = () => {
        setDeleteRequirementsDialog(true);
    };

    const hideDeleteRequirementsDialog = () => {
        setDeleteRequirementsDialog(false);
    };

    const deleteSelectedRequirements = () => {
        let _requirements = requirements.filter(val => !selectedRequirements.includes(val));
        setRequirements(_requirements);
        setDeleteRequirementsDialog(false);
        setSelectedRequirements(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Selected Requirements Deleted', life: 3000 });
    };

    const statusBodyTemplate = (rowData) => <Tag value={rowData.status} severity={rowData.status === 'Active' ? 'success' : 'info'} rounded />;
    const dateBodyTemplate = (rowData) => new Date(rowData.datePosted).toLocaleDateString();

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text className="p-button-warning" onClick={() => openEditRequirementDialog(rowData)} tooltip="Edit Requirement" />
            <Button icon="pi pi-trash" rounded text className="p-button-danger" onClick={() => confirmDeleteRequirement(rowData)} tooltip="Delete Requirement" />
        </div>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New Requirement" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNewRequirementDialog} />
                <Button label="Delete Selected" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedRequirements || !selectedRequirements.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search requirements..." className="p-inputtext-sm" />
                </span>
                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const requirementDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideRequirementDialog} className="p-button-sm"/>
            <Button label={isNewRequirement ? "Post Requirement" : "Save Changes"} icon="pi pi-check" onClick={saveRequirement} className="p-button-sm" autoFocus />
        </>
    );
    const deleteRequirementDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRequirementDialog} className="p-button-sm" />
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deleteRequirement} className="p-button-sm" autoFocus />
        </>
    );

    const deleteRequirementsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRequirementsDialog} className="p-button-sm"/>
            <Button label="Yes, Delete Selected" icon="pi pi-trash" severity="danger" onClick={deleteSelectedRequirements} className="p-button-sm" autoFocus />
        </>
    );

    return (
        <div className="p-4 surface-card min-h-screen">
            <Toast ref={toast} />
            <div className="card shadow-2 border-round">
                <Toolbar 
                    className="mb-4 p-4 border-round-top border-bottom-1 surface-border"
                    left={leftToolbarTemplate} 
                    right={rightToolbarTemplate} 
                    pt={{ root: {className: 'border-noround'}}}
                />
                <DataTable 
                    ref={dt}
                    value={requirements} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    globalFilter={globalFilter}
                    emptyMessage="No admin requirements found."
                    dataKey="id"
                    responsiveLayout="scroll"
                    sortField="datePosted" 
                    sortOrder={-1}
                    header={<h3 className="text-xl font-semibold m-0 pl-2 pt-2">Admin Posted Requirements</h3>}
                    selection={selectedRequirements}
                    onSelectionChange={(e) => setSelectedRequirements(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '20rem' }} headerClassName="font-semibold" body={(rowData) => <span className='font-medium'>{rowData.title}</span>}/>
                    <Column field="category" header="Category" sortable style={{ minWidth: '12rem' }} headerClassName="font-semibold"/>
                    <Column field="location" header="Location" sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                    <Column field="agentName" header="Posting Agent" sortable style={{ minWidth: '12rem' }} headerClassName="font-semibold"/>
                    <Column field="datePosted" header="Date Posted" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold"/>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }} headerClassName="font-semibold" className="text-center"/>
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} header="Actions" frozen alignFrozen="right" className="text-center" headerClassName="font-semibold"/>
                </DataTable>
            </div>

            <Dialog visible={requirementDialog} style={{ width: '50rem' }} header={isNewRequirement ? "Post New Admin Requirement" : "Edit Admin Requirement"} modal className="p-fluid" footer={requirementDialogFooter} onHide={hideRequirementDialog}>
                <div className="formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="reqTitle" className="font-semibold">Requirement Title*</label>
                        <InputText id="reqTitle" value={currentRequirement?.title || ''} onChange={(e) => handleInputChange(e, 'title')} required autoFocus className={!currentRequirement?.title ? 'p-invalid' : ''} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="reqDescription" className="font-semibold">Full Description*</label>
                        <InputTextarea id="reqDescription" value={currentRequirement?.description || ''} onChange={(e) => handleInputChange(e, 'description')} required rows={4} autoResize className={!currentRequirement?.description ? 'p-invalid' : ''} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="reqCategory" className="font-semibold">Category*</label>
                        <Dropdown id="reqCategory" value={currentRequirement?.category} options={categories} onChange={(e) => handleInputChange(e, 'category')} placeholder="Select a Category" className={!currentRequirement?.category ? 'p-invalid' : ''} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="reqLocation" className="font-semibold">Location</label>
                        <InputText id="reqLocation" value={currentRequirement?.location || ''} onChange={(e) => handleInputChange(e, 'location')} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="reqContactPerson" className="font-semibold">Contact Person</label>
                        <InputText id="reqContactPerson" value={currentRequirement?.contactPerson || ''} onChange={(e) => handleInputChange(e, 'contactPerson')} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="reqContactEmail" className="font-semibold">Contact Email</label>
                        <InputText id="reqContactEmail" type="email" value={currentRequirement?.contactEmail || ''} onChange={(e) => handleInputChange(e, 'contactEmail')} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="reqContactPhone" className="font-semibold">Contact Phone</label>
                        <InputText id="reqContactPhone" value={currentRequirement?.contactPhone || ''} onChange={(e) => handleInputChange(e, 'contactPhone')} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="reqAgentName" className="font-semibold">Posting Agent Name</label>
                        <InputText id="reqAgentName" value={currentRequirement?.agentName || ''} onChange={(e) => handleInputChange(e, 'agentName')} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="reqStatus" className="font-semibold">Status</label>
                        <Dropdown id="reqStatus" value={currentRequirement?.status} options={[{label: 'Active', value: 'Active'}, {label: 'Fulfilled', value: 'Fulfilled'}, {label: 'Cancelled', value: 'Cancelled'}]} onChange={(e) => handleInputChange(e, 'status')} placeholder="Select Status" />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteRequirementDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deleteRequirementDialogFooter} onHide={hideDeleteRequirementDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                    {currentRequirement && <span>Are you sure you want to delete the requirement: <strong>{currentRequirement.title}</strong>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteRequirementsDialog} style={{ width: '30rem' }} header="Confirm Delete Selected" modal footer={deleteRequirementsDialogFooter} onHide={hideDeleteRequirementsDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                    <span>Are you sure you want to delete the selected requirements? This action cannot be undone.</span>
                </div>
            </Dialog>
        </div>
    );
};

export default AdminRequirements; 