import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from 'primereact/toast';

const AdminCustomerSupportPage = () => {
    const toast = useRef(null);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketDialog, setTicketDialog] = useState(false);
    const [replyDialog, setReplyDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);
    const [typeFilter, setTypeFilter] = useState(null);
    const [adminReply, setAdminReply] = useState('');
    const [replyTicketStatus, setReplyTicketStatus] = useState('');

    const ticketStatusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Waiting for User', value: 'Waiting for User' }
    ];

    const ticketTypeOptions = [
        { label: 'Complaint', value: 'Complaint' },
        { label: 'Feedback', value: 'Feedback' },
        { label: 'Bug Report', value: 'Bug Report' },
        { label: 'General Query', value: 'General Query' }
    ];

    const initialTickets = [
        { id: uuidv4(), user: { name: 'Alice Wonderland', email: 'alice@example.com' }, subject: 'Login Issue on Mobile', description: 'I cannot log in to my account using the mobile app. It shows an error message.', dateSubmitted: new Date('2023-10-25T10:00:00Z'), status: 'Open', type: 'Bug Report', priority: 'High', replies: [] },
        { id: uuidv4(), user: { name: 'Bob The Builder', email: 'bob@example.com' }, subject: 'Feature Request: Dark Mode', description: 'It would be great to have a dark mode option in the user dashboard.', dateSubmitted: new Date('2023-10-24T14:30:00Z'), status: 'In Progress', type: 'Feedback', priority: 'Medium', replies: [{ by: 'Admin', text: 'Thanks for the feedback! We are considering this for a future update.', date: new Date() }] },
        { id: uuidv4(), user: { name: 'Charlie Brown', email: 'charlie@example.com' }, subject: 'Complaint about a lead', description: 'The lead ID L1005 seems to be inaccurate. The contact details are wrong.', dateSubmitted: new Date('2023-10-26T09:15:00Z'), status: 'Resolved', type: 'Complaint', priority: 'High', replies: [{by: 'Admin', text: 'We have investigated and corrected the lead. Apologies for the inconvenience.', date: new Date()}] },
        { id: uuidv4(), user: { name: 'Diana Prince', email: 'diana@example.com' }, subject: 'How to upgrade membership?', description: 'I want to upgrade my free membership to Premium. How can I do that?', dateSubmitted: new Date('2023-10-27T11:00:00Z'), status: 'Closed', type: 'General Query', priority: 'Medium', replies: [{by: 'Admin', text: 'You can upgrade your membership from the My Account > Membership section.', date: new Date()}] },
    ];

    useEffect(() => {
        setTickets(initialTickets);
    }, []);

    const openTicketDialog = (ticket) => {
        setSelectedTicket(ticket);
        setTicketDialog(true);
    };

    const hideTicketDialog = () => {
        setTicketDialog(false);
        setSelectedTicket(null);
    };
    
    const openReplyDialog = (ticket) => {
        setSelectedTicket(ticket);
        setAdminReply('');
        setReplyTicketStatus(ticket.status);
        setReplyDialog(true);
    };

    const hideReplyDialog = () => {
        setReplyDialog(false);
        setSelectedTicket(null);
        setAdminReply('');
        setReplyTicketStatus('');
    };

    const handleStatusChange = (ticketId, newStatus) => {
        setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    };

    const submitAdminReply = () => {
        if (!adminReply.trim() || !selectedTicket) {
            toast.current.show({ severity: 'warn', summary: 'Missing Information', detail: 'Reply text cannot be empty.', life: 3000 });
            return;
        }

        const newStatus = replyTicketStatus || selectedTicket.status;

        const updatedTickets = tickets.map(ticket => {
            if (ticket.id === selectedTicket.id) {
                return {
                    ...ticket,
                    replies: [...(ticket.replies || []), { by: 'Admin', text: adminReply, date: new Date() }],
                    status: newStatus 
                };
            }
            return ticket;
        });
        setTickets(updatedTickets);
        toast.current.show({ severity: 'success', summary: 'Reply Sent', detail: 'Your reply has been added and status updated.', life: 3000 });
        hideReplyDialog();
    };

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'Open': return 'danger';
            case 'In Progress': return 'warning';
            case 'Resolved': return 'success';
            case 'Closed': return 'info';
            case 'Waiting for User': return 'primary';
            default: return null;
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} rounded />;
    };

    const typeBodyTemplate = (rowData) => {
        let severity = 'secondary';
        if (rowData.type === 'Complaint') severity = 'danger';
        if (rowData.type === 'Bug Report') severity = 'warning';
        if (rowData.type === 'Feedback') severity = 'info';
        return <Tag value={rowData.type} severity={severity} rounded />;
    };
    
    const formatDate = (value) => {
        return new Date(value).toLocaleString();
    };

    const dateBodyTemplate = (rowData) => formatDate(rowData.dateSubmitted);

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-eye" rounded text className="p-button-info" onClick={() => openTicketDialog(rowData)} tooltip="View Details" tooltipOptions={{position: 'bottom'}}/>
            <Button icon="pi pi-reply" rounded text className="p-button-success" onClick={() => openReplyDialog(rowData)} tooltip="Reply/Update" tooltipOptions={{position: 'bottom'}}/>
             {/* <Button icon="pi pi-check-square" rounded text className="p-button-help" onClick={() => handleStatusChange(rowData.id, 'Resolved')} tooltip="Mark Resolved" tooltipOptions={{position: 'bottom'}}/> */}
        </div>
    );

    const onFilterChange = (e, filterKey) => {
        if (filterKey === 'status') setStatusFilter(e.value);
        if (filterKey === 'type') setTypeFilter(e.value);
    };

    const filteredTickets = tickets.filter(ticket => {
        const globalMatch = globalFilter ? 
            (ticket.subject.toLowerCase().includes(globalFilter.toLowerCase()) || 
            ticket.user.name.toLowerCase().includes(globalFilter.toLowerCase()) || 
            ticket.user.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
            ticket.id.toLowerCase().includes(globalFilter.toLowerCase())) : true;
        const statusMatch = statusFilter ? ticket.status === statusFilter : true;
        const typeMatch = typeFilter ? ticket.type === typeFilter : true;
        return globalMatch && statusMatch && typeMatch;
    });

    const tableToolbar = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 p-4 bg-gray-50 border-round-top border-bottom-1 surface-border">
            <h2 className="text-2xl font-semibold m-0 text-color">Support Tickets</h2>
            <div className="flex flex-column sm:flex-row gap-2 w-full sm:w-auto">
                <Dropdown value={statusFilter} options={[{label: 'All Statuses', value: null}, ...ticketStatusOptions]} onChange={(e) => onFilterChange(e, 'status')} placeholder="Filter by Status" className="p-inputtext-sm w-full sm:w-14rem" showClear/>
                <Dropdown value={typeFilter} options={[{label: 'All Types', value: null}, ...ticketTypeOptions]} onChange={(e) => onFilterChange(e, 'type')} placeholder="Filter by Type" className="p-inputtext-sm w-full sm:w-14rem" showClear/>
                <span className="p-input-icon-left w-full sm:w-auto">
                    <i className="pi pi-search" />
                    <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search tickets..." className="p-inputtext-sm w-full"/>
                </span>
            </div>
        </div>
    );

    const ticketDialogFooter = (
        <Button label="Close" icon="pi pi-times" onClick={hideTicketDialog} className="p-button-text p-button-sm" />
    );

    const replyDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideReplyDialog} className="p-button-sm"/>
            <Button label="Submit Reply & Update" icon="pi pi-send" onClick={submitAdminReply} autoFocus className="p-button-sm"/>
        </>
    );

    return (
        <div className="p-4 surface-card min-h-screen">
            <Toast ref={toast} />
            <div className="card shadow-2 border-round">
                {tableToolbar}
                <DataTable 
                    value={filteredTickets} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25, 50]} 
                    emptyMessage="No tickets found matching your criteria."
                    dataKey="id"
                    responsiveLayout="scroll"
                    sortField="dateSubmitted"
                    sortOrder={-1} // Newest first
                    size="small"
                    selectionMode="single"
                    onSelectionChange={(e) => openTicketDialog(e.value)} 
                >
                    <Column field="id" header="Ticket ID" sortable style={{ minWidth: '10rem' }} body={(rowData) => <span className="text-xs">{rowData.id.substring(0,8)}...</span>}/>
                    <Column field="subject" header="Subject" sortable filter filterPlaceholder="Search subject" style={{ minWidth: '20rem' }} body={(rowData) => <span className="font-semibold">{rowData.subject}</span>}/>
                    <Column field="user.name" header="User" sortable filter filterPlaceholder="Search user" style={{ minWidth: '12rem' }} />
                    <Column field="dateSubmitted" header="Date Submitted" body={dateBodyTemplate} sortable style={{ minWidth: '12rem' }} />
                    <Column field="type" header="Type" body={typeBodyTemplate} sortable style={{ minWidth: '10rem' }} className="text-center"/>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }} className="text-center"/>
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} header="Actions" frozen alignFrozen="right" className="text-center" />
                </DataTable>
            </div>

            <Dialog visible={ticketDialog} style={{ width: '50rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                    header="Ticket Details" modal footer={ticketDialogFooter} onHide={hideTicketDialog}>
                {selectedTicket && (
                    <div className="p-fluid">
                        <div className="field grid">
                            <label htmlFor="ticketIdDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Ticket ID:</label>
                            <div className="col-12 md:col-9"><p id="ticketIdDetail">{selectedTicket.id}</p></div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="subjectDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Subject:</label>
                            <div className="col-12 md:col-9"><p id="subjectDetail">{selectedTicket.subject}</p></div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="userDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">User:</label>
                            <div className="col-12 md:col-9"><p id="userDetail">{selectedTicket.user.name} ({selectedTicket.user.email})</p></div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="dateSubmittedDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Date Submitted:</label>
                            <div className="col-12 md:col-9"><p id="dateSubmittedDetail">{formatDate(selectedTicket.dateSubmitted)}</p></div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="typeDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Type:</label>
                            <div className="col-12 md:col-9">{typeBodyTemplate(selectedTicket)}</div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="statusDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Status:</label>
                            <div className="col-12 md:col-9">{statusBodyTemplate(selectedTicket)}</div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="priorityDetail" className="col-12 mb-2 md:col-3 md:mb-0 font-semibold">Priority:</label>
                             <div className="col-12 md:col-9"><Tag value={selectedTicket.priority} severity={selectedTicket.priority === 'High' ? 'danger' : selectedTicket.priority === 'Medium' ? 'warning' : 'info'} /></div>
                        </div>
                        <div className="field mt-3">
                            <label htmlFor="descriptionDetail" className="font-semibold block mb-2">Description:</label>
                            <p id="descriptionDetail" className="p-2 surface-100 border-round white-space-pre-wrap">{selectedTicket.description}</p>
                        </div>
                        
                        {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                            <div className="field mt-4">
                                <h5 className="font-semibold mb-2">Conversation History:</h5>
                                {selectedTicket.replies.map((reply, index) => (
                                    <div key={index} className={`mb-3 p-3 border-round ${reply.by === 'Admin' ? 'bg-blue-50 surface-border border-1' : 'bg-green-50 surface-border border-1'}`}>
                                        <div className="flex justify-content-between align-items-center mb-2">
                                            <span className="font-semibold text-sm">{reply.by}</span>
                                            <span className="text-xs text-color-secondary">{formatDate(reply.date)}</span>
                                        </div>
                                        <p className="white-space-pre-wrap text-sm">{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-content-end mt-4">
                            <Button label="Reply / Update Status" icon="pi pi-reply" onClick={() => { hideTicketDialog(); openReplyDialog(selectedTicket); }} className="p-button-sm"/>
                        </div>
                    </div>
                )}
            </Dialog>
            
            <Dialog visible={replyDialog} style={{ width: '40rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                    header={`Reply to Ticket: ${selectedTicket?.subject?.substring(0,30) || ''}...`} 
                    modal 
                    footer={replyDialogFooter} 
                    onHide={hideReplyDialog}
            >
                {selectedTicket && (
                    <div className="p-fluid">
                        <div className="field">
                            <label htmlFor="adminReply" className="font-semibold">Your Reply</label>
                            <InputTextarea id="adminReply" value={adminReply} onChange={(e) => setAdminReply(e.target.value)} rows={5} autoResize required autoFocus />
                        </div>
                        <div className="field mt-3">
                            <label htmlFor="ticketStatusUpdate" className="font-semibold">Update Ticket Status</label>
                            <Dropdown 
                                id="ticketStatusUpdate" 
                                value={replyTicketStatus} 
                                options={ticketStatusOptions} 
                                onChange={(e) => setReplyTicketStatus(e.value)} 
                                placeholder="Select new status (optional)"
                                className="w-full"
                            />
                        </div>
                        <div className="text-sm mt-2">Current Status: <Tag value={selectedTicket.status} severity={getStatusSeverity(selectedTicket.status)} rounded /></div>
                    </div>
                )}
            </Dialog>

        </div>
    );
};

export default AdminCustomerSupportPage; 