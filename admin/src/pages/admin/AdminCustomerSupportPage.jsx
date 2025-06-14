import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

const AdminCustomerSupportPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketDialog, setTicketDialog] = useState(false);
    const [replyDialog, setReplyDialog] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [currentTicketDetail, setCurrentTicketDetail] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const initialTickets = [
        { id: 'T001', subject: 'Login Issue', user: 'user1@example.com', date: '2024-07-20', status: 'Open', priority: 'High', messages: [{sender: 'user', text: 'I cannot login.', timestamp: '2024-07-20 10:00'}, {sender: 'admin', text: 'We are looking into it.', timestamp: '2024-07-20 11:00'}]},
        { id: 'T002', subject: 'Billing Inquiry', user: 'user2@example.com', date: '2024-07-21', status: 'In Progress', priority: 'Medium', messages: [{sender: 'user', text: 'Question about my invoice.', timestamp: '2024-07-21 14:00'}]},
        { id: 'T003', subject: 'Feature Request', user: 'user3@example.com', date: '2024-07-22', status: 'Closed', priority: 'Low', messages: [{sender: 'user', text: 'Please add X feature.', timestamp: '2024-07-22 09:30'}, {sender: 'admin', text: 'Thank you for your feedback. We have added it to our backlog.', timestamp: '2024-07-22 10:30'}]},
        { id: 'T004', subject: 'Password Reset Failed', user: 'user4@example.com', date: '2024-07-23', status: 'Open', priority: 'High', messages: [{sender: 'user', text: 'Password reset link is not working.', timestamp: '2024-07-23 11:00'}]},
        { id: 'T005', subject: 'Slow Performance', user: 'user5@example.com', date: '2024-07-23', status: 'Open', priority: 'Medium', messages: [{sender: 'user', text: 'The app is very slow today.', timestamp: '2024-07-23 15:00'}]},
    ];

    useEffect(() => {
        setTickets(initialTickets);
    }, []);

    const openTicketDialog = (ticket) => {
        setCurrentTicketDetail(ticket);
        setTicketDialog(true);
    };

    const hideTicketDialog = () => {
        setTicketDialog(false);
        setCurrentTicketDetail(null);
    };

    const openReplyDialog = (ticket) => {
        setSelectedTicket(ticket);
        setReplyText('');
        setReplyDialog(true);
    };

    const hideReplyDialog = () => {
        setReplyDialog(false);
        setSelectedTicket(null);
        setReplyText('');
    };

    const handleReplySubmit = () => {
        if (replyText.trim() && selectedTicket) {
            const updatedTickets = tickets.map(t => 
                t.id === selectedTicket.id ? { ...t, status: selectedTicket.status, messages: [...t.messages, { sender: 'admin', text: replyText, timestamp: new Date().toLocaleString() }] } : t
            );
            setTickets(updatedTickets);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Reply Sent', life: 3000 });
            hideReplyDialog();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reply cannot be empty.', life: 3000 });
        }
    };
    
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'Open': return 'danger';
            case 'In Progress': return 'warning';
            case 'Closed': return 'success';
            default: return null;
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };
    
    const priorityBodyTemplate = (rowData) => {
        const priorityColors = {
            'High': 'danger',
            'Medium': 'warning',
            'Low': 'info'
        };
        return <Tag value={rowData.priority} severity={priorityColors[rowData.priority]} />;
    };

    const actionsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" rounded text className="mr-2" onClick={() => openTicketDialog(rowData)} tooltip="View Details" tooltipOptions={{position: 'top'}}/>
                <Button icon="pi pi-reply" rounded text severity="success" onClick={() => openReplyDialog(rowData)} disabled={rowData.status === 'Closed'} tooltip="Reply/Update" tooltipOptions={{position: 'top'}}/>
            </React.Fragment>
        );
    };
    
    const tableHeader = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between p-4 border-round-top surface-border">
            <h4 className="m-0 text-xl font-semibold">Manage Support Tickets</h4>
            <div className="flex flex-wrap gap-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search tickets..." className="p-inputtext-sm"/>
                </span>
                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help p-button-sm" onClick={exportCSV} />
            </div>
        </div>
    );

    const filteredTickets = tickets.filter(ticket => {
        if (!globalFilter) return true;
        const filterLower = globalFilter.toLowerCase();
        return Object.values(ticket).some(value =>
            String(value).toLowerCase().includes(filterLower)
        );
    });

    const ticketDialogFooter = (
        <Button label="Close" icon="pi pi-times" outlined onClick={hideTicketDialog} />
    );

    const ticketStatusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Closed', value: 'Closed' }
    ];
    
    const replyDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideReplyDialog} />
            <Button label="Send Reply" icon="pi pi-send" onClick={handleReplySubmit} />
        </>
    );

    return (
        <div className="card surface-card p-0 border-round shadow-2">
            <Toast ref={toast} />
            <DataTable
                ref={dt}
                value={filteredTickets}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={tableHeader}
                globalFilter={globalFilter}
                emptyMessage="No support tickets found."
                dataKey="id"
                className="p-datatable-striped"
            >
                <Column field="id" header="Ticket ID" sortable style={{ minWidth: '8rem' }} />
                <Column field="subject" header="Subject" sortable filter filterPlaceholder="Search by subject" style={{ minWidth: '16rem' }}/>
                <Column field="user" header="User" sortable filter filterPlaceholder="Search by user" style={{ minWidth: '12rem' }}/>
                <Column field="date" header="Date" sortable style={{ minWidth: '10rem' }} />
                <Column field="priority" header="Priority" body={priorityBodyTemplate} sortable style={{ minWidth: '8rem' }} />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}/>
                <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem', textAlign: 'center' }} />
            </DataTable>

            <Dialog header="Ticket Details" visible={ticketDialog} style={{ width: '50vw' }} onHide={hideTicketDialog} footer={ticketDialogFooter}>
                {currentTicketDetail && (
                    <div>
                        <h5>{currentTicketDetail.subject}</h5>
                        <p><strong>User:</strong> {currentTicketDetail.user}</p>
                        <p><strong>Date:</strong> {currentTicketDetail.date}</p>
                        <p><strong>Status:</strong> <Tag value={currentTicketDetail.status} severity={getSeverity(currentTicketDetail.status)} /></p>
                        <p><strong>Priority:</strong> <Tag value={currentTicketDetail.priority} severity={priorityBodyTemplate(currentTicketDetail).props.severity} /> </p>
                        
                        <div className="mt-4">
                            <h6>Conversation History:</h6>
                            {currentTicketDetail.messages.map((msg, index) => (
                                <div key={index} className={`p-2 mb-2 border-round ${msg.sender === 'user' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                                    <strong>{msg.sender === 'user' ? currentTicketDetail.user : 'Support Team'}:</strong> {msg.text}
                                    <div className="text-xs text-right">{msg.timestamp}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Dialog>

            <Dialog header="Reply to Ticket" visible={replyDialog} style={{ width: '450px' }} footer={replyDialogFooter} onHide={hideReplyDialog}>
                {selectedTicket && (
                     <div className="field">
                        <label htmlFor="replyText" className="font-bold">Your Reply</label>
                        <InputTextarea id="replyText" value={replyText} onChange={(e) => setReplyText(e.target.value)} required rows={5} cols={40} className="w-full mt-1" autoFocus />
                    </div>
                )}
                {selectedTicket && (
                    <div className="field mt-3">
                        <label htmlFor="ticketStatus" className="font-bold">Update Status</label>
                        <Dropdown id="ticketStatus" value={selectedTicket.status} options={ticketStatusOptions} 
                                  onChange={(e) => setSelectedTicket({...selectedTicket, status: e.value})} 
                                  placeholder="Select a Status" className="w-full mt-1"/>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default AdminCustomerSupportPage;
