import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Dashboard = () => {
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const dtSearches = useRef(null);

    // Dummy summary data
    const getSummaryData = () => {
        return {
            activeUsers: 120,
            totalLeads: 560,
            pendingSupportTickets: 15,
            revenueThisMonth: 7200
        };
    };

    // Dummy recent searches
    const getRecentSearches = () => {
        return [
            { id: 1, query: 'React developers in London', user: 'John Doe', timestamp: '2024-07-28 10:30 AM' },
            { id: 2, query: 'Urgent plumbing services', user: 'Jane Smith', timestamp: '2024-07-28 09:15 AM' },
            { id: 3, query: 'Best local restaurants', user: 'Alice Brown', timestamp: '2024-07-27 05:45 PM' },
            { id: 4, query: 'Node.js backend projects', user: 'Bob Green', timestamp: '2024-07-27 03:20 PM' },
            { id: 5, query: 'Graphic designer for logo', user: 'Eve White', timestamp: '2024-07-27 01:00 PM' }
        ];
    };

    useEffect(() => {
        setSummaryData(getSummaryData());
        setRecentSearches(getRecentSearches());
    }, []);

    const summaryCardStyle = { marginBottom: '20px' };
    const quickLinkButtonStyle = { marginRight: '10px', marginBottom: '10px' };

    const exportSearchesCSV = () => {
        dtSearches.current.exportCSV();
    };

    const searchesTableHeader = (
        <div className="flex justify-content-between align-items-center">
            <h5 className="m-0">Recent User Searches</h5>
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help p-button-sm" onClick={exportSearchesCSV} />
        </div>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <Card title="Admin Dashboard" className="mb-4">
                    <p className="m-0">Welcome to the BazaarLeads Admin Panel.</p>
                </Card>
            </div>

            <div className="col-12 md:col-6 lg:col-3">
                <Card title="Active Users" style={summaryCardStyle} className="h-full">
                    <div className="flex justify-content-between align-items-center">
                        <span className="text-xl font-semibold">{summaryData?.activeUsers || 0}</span>
                        <i className="pi pi-users p-3 border-round bg-blue-100 text-blue-600 text-xl"></i>
                    </div>
                </Card>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <Card title="Total Leads Generated" style={summaryCardStyle} className="h-full">
                    <div className="flex justify-content-between align-items-center">
                        <span className="text-xl font-semibold">{summaryData?.totalLeads || 0}</span>
                        <i className="pi pi-briefcase p-3 border-round bg-green-100 text-green-600 text-xl"></i>
                    </div>
                </Card>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <Card title="Pending Support Tickets" style={summaryCardStyle} className="h-full">
                    <div className="flex flex-column justify-content-between h-full">
                        <div className="flex justify-content-between align-items-center">
                            <span className="text-xl font-semibold">{summaryData?.pendingSupportTickets || 0}</span>
                            <i className="pi pi-comments p-3 border-round bg-orange-100 text-orange-600 text-xl"></i>
                        </div>
                        <Button label="View Tickets" icon="pi pi-arrow-right" className="p-button-sm p-button-text mt-2 align-self-start" onClick={() => navigate('/admin/customer-support')} />
                    </div>
                </Card>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <Card title="Revenue (This Month)" style={summaryCardStyle} className="h-full">
                     <div className="flex justify-content-between align-items-center">
                        <span className="text-xl font-semibold">₹{summaryData?.revenueThisMonth || 0}</span>
                        {/* Assuming INR, if it was USD, it would be $ */}
                        <i className="pi pi-chart-line p-3 border-round bg-purple-100 text-purple-600 text-xl"></i>
                    </div>
                </Card>
            </div>

            <div className="col-12">
                <Card title="Quick Actions" className="mb-4">
                    <Button label="Manage Users" icon="pi pi-users" style={quickLinkButtonStyle} onClick={() => navigate('/admin/user-management')} />
                    <Button label="Membership Plans" icon="pi pi-dollar" style={quickLinkButtonStyle} onClick={() => navigate('/admin/membership-plans')} />
                    <Button label="Post New Requirement" icon="pi pi-plus-circle" style={quickLinkButtonStyle} onClick={() => navigate('/admin/admin-requirements')} />
                    <Button label="View Leads" icon="pi pi-list" style={quickLinkButtonStyle} onClick={() => navigate('/admin/leads-management')} />
                </Card>
            </div>
            
            <div className="col-12">
                <Card title="Recent User Search Queries">
                    <DataTable 
                        ref={dtSearches}
                        value={recentSearches} 
                        paginator 
                        rows={5} 
                        emptyMessage="No recent searches found."
                        header={searchesTableHeader}
                        globalFilterFields={['query', 'user', 'timestamp']}
                    >
                        <Column field="query" header="Search Query" sortable filter filterPlaceholder="Search by query"></Column>
                        <Column field="user" header="User" sortable filter filterPlaceholder="Search by user"></Column>
                        <Column field="timestamp" header="Timestamp" sortable></Column>
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard; 