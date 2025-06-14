import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from 'primereact/toast';

const AffiliateManagement = () => {
    const toast = useRef(null);
    const [affiliates, setAffiliates] = useState([]);
    const [selectedAffiliate, setSelectedAffiliate] = useState(null);
    const [bankDetailsDialog, setBankDetailsDialog] = useState(false);
    const [payoutDialog, setPayoutDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const initialAffiliates = [
        { 
            id: uuidv4(), 
            name: 'Affiliate Alpha', 
            email: 'alpha@affiliate.com', 
            referralCode: 'ALPHA25', 
            referredUsers: 25, 
            totalSalesReferred: 1250.00, 
            commissionRate: 0.10, // 10%
            commissionEarned: 125.00, 
            commissionPaid: 50.00, 
            lastPaymentDate: new Date('2023-09-15'),
            status: 'Active',
            bankDetails: { bankName: 'Global Bank', accountNumber: '1234567890', accountHolder: 'Affiliate Alpha', ifscCode: 'GBIN0001234' }
        },
        { 
            id: uuidv4(), 
            name: 'Beta Partners', 
            email: 'beta@partner.com', 
            referralCode: 'BETA50', 
            referredUsers: 50, 
            totalSalesReferred: 3500.00, 
            commissionRate: 0.12, // 12%
            commissionEarned: 420.00, 
            commissionPaid: 420.00, 
            lastPaymentDate: new Date('2023-10-01'),
            status: 'Active',
            bankDetails: { bankName: 'City National', accountNumber: '0987654321', accountHolder: 'Beta Partners Inc.', ifscCode: 'CNAT0005678' }
        },
        { 
            id: uuidv4(), 
            name: 'Gamma Promos', 
            email: 'gamma@promo.net', 
            referralCode: 'GAMMA10', 
            referredUsers: 10, 
            totalSalesReferred: 500.00, 
            commissionRate: 0.08, // 8%
            commissionEarned: 40.00, 
            commissionPaid: 0.00, 
            lastPaymentDate: null,
            status: 'Pending Approval',
            bankDetails: null
        },
    ];

    useEffect(() => {
        setAffiliates(initialAffiliates);
    }, []);

    const openBankDetailsDialog = (affiliate) => {
        setSelectedAffiliate(affiliate);
        setBankDetailsDialog(true);
    };

    const hideBankDetailsDialog = () => {
        setBankDetailsDialog(false);
        setSelectedAffiliate(null);
    };

    const openPayoutDialog = (affiliate) => {
        setSelectedAffiliate(affiliate);
        setPayoutDialog(true);
    };

    const hidePayoutDialog = () => {
        setPayoutDialog(false);
        setSelectedAffiliate(null);
    };

    const processPayoutAndReset = () => {
        if (!selectedAffiliate) return;
        const commissionToPay = selectedAffiliate.commissionEarned - selectedAffiliate.commissionPaid;
        
        setAffiliates(affiliates.map(aff => {
            if (aff.id === selectedAffiliate.id) {
                return {
                    ...aff,
                    commissionPaid: aff.commissionPaid + commissionToPay,
                    lastPaymentDate: new Date(),
                };
            }
            return aff;
        }));
        toast.current.show({ 
            severity: 'success', 
            summary: 'Payout Processed', 
            detail: `Payout of ${formatCurrency(commissionToPay)} for ${selectedAffiliate.name} marked as complete.`, 
            life: 3000 
        });
        hidePayoutDialog();
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    };
    
    const commissionBalance = (rowData) => {
        return rowData.commissionEarned - rowData.commissionPaid;
    };

    const statusBodyTemplate = (rowData) => {
        let severity = 'info';
        if (rowData.status === 'Active') severity = 'success';
        if (rowData.status === 'Pending Approval') severity = 'warning';
        if (rowData.status === 'Suspended') severity = 'danger';
        return <Tag value={rowData.status} severity={severity} rounded />;
    };

    const commissionBalanceBodyTemplate = (rowData) => {
        const balance = commissionBalance(rowData);
        return <Badge value={formatCurrency(balance)} severity={balance > 0 ? 'warning' : 'success'} />
    };
    
    const formatDate = (value) => {
        return value ? new Date(value).toLocaleDateString() : 'N/A';
    };

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-1">
            <Button icon="pi pi-wallet" rounded text className="p-button-info" onClick={() => openBankDetailsDialog(rowData)} tooltip="View Bank Details" tooltipOptions={{position: 'bottom'}} disabled={!rowData.bankDetails}/>
            <Button icon="pi pi-money-bill" rounded text className="p-button-success" onClick={() => openPayoutDialog(rowData)} tooltip="Process Payout / Reset" tooltipOptions={{position: 'bottom'}} disabled={commissionBalance(rowData) <= 0} />
            {/* Add edit affiliate details button if needed */}
        </div>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const tableToolbar = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between p-4 border-round-top surface-border">
            <h4 className="m-0 text-xl font-semibold">Affiliate Performance Dashboard</h4>
            <div className="flex flex-wrap gap-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" value={globalFilter} onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search affiliates..." className="p-inputtext-sm" />
                </span>
                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help p-button-sm" onClick={exportCSV} />
            </div>
        </div>
    );

    const bankDetailsDialogFooter = (
        <Button label="Close" icon="pi pi-times" onClick={hideBankDetailsDialog} className="p-button-text p-button-sm" />
    );

    const payoutDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hidePayoutDialog} className="p-button-sm"/>
            <Button label="Confirm Payout & Reset" icon="pi pi-check" onClick={processPayoutAndReset} autoFocus className="p-button-success p-button-sm"/>
        </>
    );

    return (
        <div className="p-4 surface-card min-h-screen">
            <Toast ref={toast} />
            <div className="card shadow-2 border-round">
                <DataTable
                    ref={dt}
                    value={affiliates}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    globalFilter={globalFilter}
                    emptyMessage="No affiliates found."
                    dataKey="id"
                    responsiveLayout="scroll"
                    size="small"
                    header={tableToolbar}
                >
                    <Column field="name" header="Affiliate Name" sortable style={{ minWidth: '14rem' }} body={(rd) => <span className="font-semibold">{rd.name}</span>}/>
                    <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                    <Column field="referralCode" header="Referral Code" sortable style={{ minWidth: '10rem' }} />
                    <Column field="referredUsers" header="Referred Users" sortable style={{ minWidth: '10rem' }} className="text-center"/>
                    <Column field="totalSalesReferred" header="Total Sales (₹)" body={(rd) => formatCurrency(rd.totalSalesReferred)} sortable style={{ minWidth: '12rem' }} />
                    <Column field="commissionEarned" header="Commission Earned (₹)" body={(rd) => formatCurrency(rd.commissionEarned)} sortable style={{ minWidth: '14rem' }} />
                    <Column field="commissionPaid" header="Commission Paid (₹)" body={(rd) => formatCurrency(rd.commissionPaid)} sortable style={{ minWidth: '14rem' }} />
                    <Column header="Pending Payout (₹)" body={commissionBalanceBodyTemplate} sortable style={{ minWidth: '12rem' }} className="text-center"/>
                    <Column field="lastPaymentDate" header="Last Payment" body={(rd) => formatDate(rd.lastPaymentDate)} sortable style={{ minWidth: '10rem' }} />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }} className="text-center"/>
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '9rem' }} header="Actions" frozen alignFrozen="right" className="text-center" />
                </DataTable>
            </div>

            <Dialog visible={bankDetailsDialog} style={{ width: '35rem' }} header="Affiliate Bank Details" modal footer={bankDetailsDialogFooter} onHide={hideBankDetailsDialog}>
                {selectedAffiliate && selectedAffiliate.bankDetails && (
                    <div className="p-fluid">
                        <div className="field grid">
                            <label className="col-12 mb-2 md:col-4 md:mb-0 font-semibold">Account Holder:</label>
                            <div className="col-12 md:col-8"><p>{selectedAffiliate.bankDetails.accountHolder}</p></div>
                        </div>
                        <div className="field grid">
                            <label className="col-12 mb-2 md:col-4 md:mb-0 font-semibold">Bank Name:</label>
                            <div className="col-12 md:col-8"><p>{selectedAffiliate.bankDetails.bankName}</p></div>
                        </div>
                        <div className="field grid">
                            <label className="col-12 mb-2 md:col-4 md:mb-0 font-semibold">Account Number:</label>
                            <div className="col-12 md:col-8"><p>{selectedAffiliate.bankDetails.accountNumber}</p></div>
                        </div>
                        <div className="field grid">
                            <label className="col-12 mb-2 md:col-4 md:mb-0 font-semibold">IFSC/Swift Code:</label>
                            <div className="col-12 md:col-8"><p>{selectedAffiliate.bankDetails.ifscCode}</p></div>
                        </div>
                    </div>
                )}
                 {selectedAffiliate && !selectedAffiliate.bankDetails && (
                    <p>No bank details submitted by this affiliate yet.</p>
                )}
            </Dialog>

            <Dialog visible={payoutDialog} style={{ width: '30rem' }} header="Confirm Payout and Reset" modal footer={payoutDialogFooter} onHide={hidePayoutDialog}>
                {selectedAffiliate && (
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--orange-500)' }} />
                        <span>
                            Are you sure you want to process a payout of <strong>{formatCurrency(commissionBalance(selectedAffiliate))}</strong> for <br />
                            <strong>{selectedAffiliate.name}</strong> and mark it as paid?
                            <br/><br/>
                            <small>This action will update their paid commission and last payment date. Optionally, you can also reset their referral counters if configured in the backend.</small>
                        </span>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default AffiliateManagement; 