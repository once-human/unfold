import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from 'primereact/dropdown';

const LeadsManagement = () => {
    const toast = useRef(null);
    const dt = useRef(null);
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [viewLeadDialog, setViewLeadDialog] = useState(false);
    const [manageLeadDialog, setManageLeadDialog] = useState(false);
    const [deleteLeadDialog, setDeleteLeadDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);
    const [leadStatusUpdate, setLeadStatusUpdate] = useState('');

    const leadStatusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Negotiating', value: 'Negotiating' },
        { label: 'Closed - Won', value: 'Closed - Won' },
        { label: 'Closed - Lost', value: 'Closed - Lost' },
        { label: 'Archived by Admin', value: 'Archived by Admin' }
    ];

    const initialLeads = [
        { id: uuidv4(), userId: 'U001', userName: 'Alice Wonderland', datePosted: new Date('2023-11-01'), category: 'Electronics', title: 'Bulk order for 1000 USB-C chargers', description: 'Need high-quality USB-C chargers, 20W, with custom branding option. Delivery to London.', status: 'Open' },
        { id: uuidv4(), userId: 'U002', userName: 'Bob The Builder', datePosted: new Date('2023-11-03'), category: 'Construction Material', title: 'Request for 10 tons of cement', description: 'Looking for OPC 53 grade cement for a construction project in Manchester. Best price needed.', status: 'Contacted' },
        { id: uuidv4(), userId: 'U004', userName: 'Diana Prince', datePosted: new Date('2023-10-28'), category: 'Software Services', title: 'Need a custom CRM developed', description: 'Requirement for a bespoke CRM solution for a small e-commerce business. SaaS preferred.', status: 'Negotiating' },
    ];

    useEffect(() => {
        setLeads(initialLeads);
    }, []);

    const openViewLeadDialog = (lead) => {
        setSelectedLead(lead);
        setViewLeadDialog(true);
    };
    const hideViewLeadDialog = () => setViewLeadDialog(false);

    const openManageLeadDialog = (lead) => {
        setSelectedLead(lead);
        setLeadStatusUpdate(lead.status);
        setManageLeadDialog(true);
    };
    const hideManageLeadDialog = () => {
        setManageLeadDialog(false);
        setSelectedLead(null);
    };

    const openDeleteLeadDialog = (lead) => {
        setSelectedLead(lead);
        setDeleteLeadDialog(true);
    };

    const hideDeleteLeadDialog = () => {
        setDeleteLeadDialog(false);
        setSelectedLead(null);
    };

    const handleLeadUpdate = () => {
        if (!selectedLead) return;
        setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, status: leadStatusUpdate } : l));
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Lead ${selectedLead.title.substring(0,20)}... status updated.`, life: 3000 });
        hideManageLeadDialog();
    };

    const deleteSelectedLead = () => {
        if (!selectedLead) return;
        setLeads(prevLeads => prevLeads.filter(l => l.id !== selectedLead.id));
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Lead '${selectedLead.title.substring(0,20)}...' deleted.`, life: 3000 });
        hideDeleteLeadDialog();
    };

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'Open': return 'info';
            case 'Contacted': return 'primary';
            case 'Negotiating': return 'warning';
            case 'Closed - Won': return 'success';
            case 'Closed - Lost': return 'danger';
            case 'Archived by Admin': return 'secondary';
            default: return null;
        }
    };

    const statusBodyTemplate = (rowData) => <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} rounded />;
    const dateBodyTemplate = (rowData) => new Date(rowData.datePosted).toLocaleDateString();

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-1">
            <Button icon="pi pi-eye" rounded text className="p-button-info" onClick={() => openViewLeadDialog(rowData)} tooltip="View Lead" tooltipOptions={{position: 'bottom'}}/>
            <Button icon="pi pi-pencil" rounded text className="p-button-help" onClick={() => openManageLeadDialog(rowData)} tooltip="Manage Lead Status" tooltipOptions={{position: 'bottom'}}/>
            <Button icon="pi pi-trash" rounded text className="p-button-danger" onClick={() => openDeleteLeadDialog(rowData)} tooltip="Delete Lead" tooltipOptions={{position: 'bottom'}}/>
        </div>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h5 className="m-0">Manage User Leads</h5>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Dropdown 
                    value={statusFilter}
                    options={leadStatusOptions}
                    onChange={(e) => setStatusFilter(e.value)}
                    placeholder="Filter by Status"
                    showClear
                    className="p-inputtext-sm mr-2" 
                    style={{ minWidth: '12rem' }}
                />
                <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search leads..." className="p-inputtext-sm" />
                </span>
                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help p-button-sm" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const viewLeadDialogFooter = <Button label="Close" icon="pi pi-times" outlined onClick={hideViewLeadDialog} className="p-button-sm" />;
    const manageLeadDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideManageLeadDialog} className="p-button-sm" />
            <Button label="Update Status" icon="pi pi-check" onClick={handleLeadUpdate} className="p-button-sm" autoFocus />
        </>
    );

    const deleteLeadDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteLeadDialog} className="p-button-sm" />
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deleteSelectedLead} className="p-button-sm" autoFocus />
        </>
    );
    
    // Apply filters before rendering DataTable
    const filteredLeads = leads.filter(lead => {
        const globalSearchMatch = !globalFilter || 
            (lead.title && lead.title.toLowerCase().includes(globalFilter.toLowerCase())) || 
            (lead.userName && lead.userName.toLowerCase().includes(globalFilter.toLowerCase())) || 
            (lead.category && lead.category.toLowerCase().includes(globalFilter.toLowerCase())) ||
            (lead.description && lead.description.toLowerCase().includes(globalFilter.toLowerCase()));
        
        const statusMatch = !statusFilter || lead.status === statusFilter;

        return globalSearchMatch && statusMatch;
    });

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
                    value={filteredLeads}
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    globalFilter={globalFilter}
                    emptyMessage="No leads found."
                    dataKey="id"
                    responsiveLayout="scroll"
                    sortField="datePosted" 
                    sortOrder={-1} 
                    header={<h3 className="text-xl font-semibold m-0 pl-2 pt-2">Posted Leads</h3>}
                >
                    <Column field="title" header="Lead Title" sortable style={{ minWidth: '20rem' }} headerClassName="font-semibold" body={(rowData) => <span className='font-medium'>{rowData.title}</span>} />
                    <Column field="userName" header="Posted By User" sortable style={{ minWidth: '12rem' }} headerClassName="font-semibold" />
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold" />
                    <Column field="datePosted" header="Date Posted" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold" />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }} headerClassName="font-semibold" className="text-center" />
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} header="Actions" frozen alignFrozen="right" className="text-center" headerClassName="font-semibold" />
                </DataTable>
            </div>

            <Dialog visible={viewLeadDialog} style={{ width: '45rem' }} header="Lead Details" modal footer={viewLeadDialogFooter} onHide={hideViewLeadDialog}>
                {selectedLead && (
                    <div className="p-fluid">
                        <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">Lead ID:</label>
                            <div className="col-12 md:col-9">{selectedLead.id}</div>
                        </div>
                        <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">Title:</label>
                            <div className="col-12 md:col-9">{selectedLead.title}</div>
                        </div>
                        <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">User:</label>
                            <div className="col-12 md:col-9">{selectedLead.userName} ({selectedLead.userId})</div>
                        </div>
                        <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">Category:</label>
                            <div className="col-12 md:col-9">{selectedLead.category}</div>
                        </div>
                        <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">Date Posted:</label>
                            <div className="col-12 md:col-9">{new Date(selectedLead.datePosted).toLocaleString()}</div>
                        </div>
                         <div className="field grid mb-3">
                            <label className="col-12 md:col-3 font-semibold">Current Status:</label>
                            <div className="col-12 md:col-9">{statusBodyTemplate(selectedLead)}</div>
                        </div>
                        <div className="field">
                            <label className="font-semibold block mb-2">Full Description:</label>
                            <p className="p-2 surface-100 border-round white-space-pre-wrap">{selectedLead.description}</p>
                        </div>
                    </div>
                )}
            </Dialog>

            <Dialog visible={manageLeadDialog} style={{ width: '30rem' }} header="Manage Lead Status" modal footer={manageLeadDialogFooter} onHide={hideManageLeadDialog}>
                {selectedLead && (
                     <div className="p-fluid">
                        <p className="mb-3">Update status for lead: <strong>{selectedLead.title}</strong></p>
                        <div className="field">
                            <label htmlFor="leadStatus" className="font-semibold">New Status</label>
                            <Dropdown 
                                id="leadStatus" 
                                value={leadStatusUpdate} 
                                options={leadStatusOptions} 
                                onChange={(e) => setLeadStatusUpdate(e.value)} 
                                placeholder="Select a status" 
                                className="w-full mt-1"
                            />
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Delete Lead Confirmation Dialog */}
            <Dialog visible={deleteLeadDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deleteLeadDialogFooter} onHide={hideDeleteLeadDialog}>
                {selectedLead && (
                    <div className="flex align-items-center p-dialog-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                        <span>Are you sure you want to delete the lead: <strong>{selectedLead.title}</strong>? This action cannot be undone.</span>
                    </div>
                )}
            </Dialog>

        </div>
    );
};

export default LeadsManagement; 