import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { v4 as uuidv4 } from 'uuid';

const UserManagement = () => {
    const toast = useRef(null);
    const dt = useRef(null);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    
    const [userDialog, setUserDialog] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [suspendUserDialog, setSuspendUserDialog] = useState(false);
    const [viewUserDialog, setViewUserDialog] = useState(false);

    const initialUserState = {
        id: null,
        name: '',
        email: '',
        password: '',
        signUpDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        membership: 'Free',
        lastLogin: null
    };

    const dummyUsers = [
        { id: 'U001', name: 'Alice Wonderland', email: 'alice.w@example.com', signUpDate: '2023-01-15', status: 'Active', membership: 'Premium-Active', lastLogin: '2023-10-27' },
        { id: 'U002', name: 'Bob The Builder', email: 'bob.b@example.com', signUpDate: '2023-02-20', status: 'Active', membership: 'Free', lastLogin: '2023-10-25' },
        { id: 'U003', name: 'Charlie Brown', email: 'charlie.b@example.com', signUpDate: '2023-03-10', status: 'Suspended', membership: 'Premium-Expired', lastLogin: '2023-09-01' },
        { id: 'U004', name: 'Diana Prince', email: 'diana.p@example.com', signUpDate: '2023-04-05', status: 'Active', membership: 'Premium-Active', lastLogin: '2023-10-28' },
        { id: 'U005', name: 'Edward Scissorhands', email: 'edward.s@example.com', signUpDate: '2023-05-12', status: 'Active', membership: 'Free', lastLogin: '2023-10-20' },
        { id: 'U006', name: 'Fiona Gallagher', email: 'fiona.g@example.com', signUpDate: '2022-12-01', status: 'Active', membership: 'Premium-Expired', lastLogin: '2023-10-15'},
        { id: 'U007', name: 'George Jetson', email: 'george.j@example.com', signUpDate: '2023-06-22', status: 'Active', membership: 'Free', lastLogin: '2023-10-28'},
        { id: 'U008', name: 'Harry Potter', email: 'harry.p@example.com', signUpDate: '2023-07-30', status: 'Suspended', membership: 'Free', lastLogin: '2023-08-10'},
    ];

    useEffect(() => {
        setUsers(dummyUsers.map(u => ({...u, signUpDate: new Date(u.signUpDate).toISOString().split('T')[0], lastLogin: u.lastLogin ? new Date(u.lastLogin).toISOString().split('T')[0] : null })));
    }, []);

    const openNewUserDialog = () => {
        setCurrentUser(initialUserState);
        setIsNewUser(true);
        setUserDialog(true);
    };

    const openEditUserDialog = (user) => {
        setCurrentUser({...user});
        setIsNewUser(false);
        setUserDialog(true);
    };

    const hideUserDialog = () => {
        setUserDialog(false);
        setCurrentUser(null);
    };

    const openViewDialog = (user) => {
        setCurrentUser(user);
        setViewUserDialog(true);
    };
    const hideViewUserDialog = () => setViewUserDialog(false);

    const openSuspendDialog = (user) => {
        setCurrentUser(user);
        setSuspendUserDialog(true);
    };
    const hideSuspendUserDialog = () => setSuspendUserDialog(false);

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };
    const hideDeleteUsersDialog = () => setDeleteUsersDialog(false);
    
    const saveUser = () => {
        if (!currentUser.name || !currentUser.email || (isNewUser && !currentUser.password)) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Name, Email, and Password (for new user) are required.', life: 3000 });
            return;
        }
        let _users = [...users];
        if (isNewUser) {
            const newUserToAdd = {...currentUser, id: uuidv4(), signUpDate: new Date().toISOString().split('T')[0]};
            delete newUserToAdd.password;
            _users.push(newUserToAdd);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        } else {
            const index = _users.findIndex(u => u.id === currentUser.id);
            const userToUpdate = {...currentUser};
            delete userToUpdate.password;
            _users[index] = userToUpdate;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        }
        setUsers(_users);
        hideUserDialog();
    };

    const handleSuspendUser = () => {
        if (!currentUser) return;
        setUsers(users.map(u => u.id === currentUser.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
        toast.current.show({ 
            severity: 'success',
            summary: 'Success',
            detail: `User ${currentUser.name}'s status updated to ${currentUser.status === 'Active' ? 'Suspended' : 'Active'}!`, 
            life: 3000 
        });
        hideSuspendUserDialog();
    };

    const deleteSelectedUsers = () => {
        let _users = users.filter(val => !selectedUsers.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Selected Users Deleted', life: 3000 });
    };

    const handleInputChange = (e, name) => {
        const val = (e.target && e.target.value !== undefined) ? e.target.value : e.value;
        setCurrentUser(prev => ({ ...prev, [name]: val }));
    };

    const statusBodyTemplate = (rowData) => {
        const severity = rowData.status === 'Active' ? 'success' : 'danger';
        return <Tag value={rowData.status} severity={severity} rounded />;
    };

    const membershipBodyTemplate = (rowData) => {
        let severity;
        let icon;
        switch (rowData.membership) {
            case 'Premium-Active':
                severity = 'success';
                icon = 'pi pi-star-fill';
                break;
            case 'Premium-Expired':
                severity = 'warning';
                icon = 'pi pi-star';
                break;
            case 'Free':
                severity = 'info';
                icon = 'pi pi-user';
                break;
            default:
                severity = 'secondary';
                icon = 'pi pi-question-circle';
        }
        return <Tag value={rowData.membership.replace('-', ' ')} severity={severity} icon={icon} rounded />;
    };

    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-1">
                <Button icon="pi pi-eye" rounded text className="p-button-info" onClick={() => openViewDialog(rowData)} tooltip="View Details" tooltipOptions={{position: 'bottom'}}/>
                <Button icon="pi pi-pencil" rounded text className="p-button-warning" onClick={() => openEditUserDialog(rowData)} tooltip="Edit User" tooltipOptions={{position: 'bottom'}} />
                <Button 
                    icon={rowData.status === 'Active' ? "pi pi-user-minus" : "pi pi-user-plus"} 
                    rounded text className={rowData.status === 'Active' ? "p-button-danger" : "p-button-success"}
                    onClick={() => openSuspendDialog(rowData)} 
                    tooltip={rowData.status === 'Active' ? "Suspend User" : "Reactivate User"} 
                    tooltipOptions={{position: 'bottom'}}
                />
            </div>
        );
    };
    
    const exportCSV = () => dt.current.exportCSV();

    const leftToolbarTemplate = () => (
        <React.Fragment>
            <Button label="New User" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNewUserDialog} />
            <Button label="Delete Selected" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
        </React.Fragment>
    );

    const rightToolbarTemplate = () => (
        <React.Fragment>
             <span className="p-input-icon-left mr-2">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search users..." className="p-inputtext-sm"/>
            </span>
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        </React.Fragment>
    );
    
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h2 className="text-2xl font-semibold m-0">Manage Users</h2>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideUserDialog} className="p-button-sm"/>
            <Button label={isNewUser ? "Create" : "Save Changes"} icon="pi pi-check" onClick={saveUser} className="p-button-sm" autoFocus />
        </>
    );
    const viewUserDialogFooter = <Button label="Close" icon="pi pi-times" onClick={hideViewUserDialog} className="p-button-text p-button-sm"/>;
    const suspendUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideSuspendUserDialog} className="p-button-sm"/>
            <Button 
                label={currentUser?.status === 'Active' ? "Yes, Suspend" : "Yes, Reactivate"} 
                icon={currentUser?.status === 'Active' ? "pi pi-user-minus" : "pi pi-user-plus"} 
                severity={currentUser?.status === 'Active' ? "warning" : "success"} 
                onClick={handleSuspendUser} 
                className="p-button-sm" autoFocus />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} className="p-button-sm" />
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deleteSelectedUsers} className="p-button-sm" autoFocus />
        </>
    );

    const userStatusOptions = [{label: 'Active', value: 'Active'}, {label: 'Suspended', value: 'Suspended'}];
    const membershipOptions = [
        {label: 'Free', value: 'Free'},
        {label: 'Premium-Active', value: 'Premium-Active'},
        {label: 'Premium-Expired', value: 'Premium-Expired'}
    ];

    return (
        <div className="p-4 surface-card min-h-screen">
            <Toast ref={toast} />
            <div className="card shadow-2 border-round">
                <Toolbar className="mb-4 p-4" left={leftToolbarTemplate} right={rightToolbarTemplate} pt={{ root: {className: 'border-noround surface-ground'} }}/>
                <DataTable 
                    ref={dt}
                    value={users} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25, 50]} 
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    selectionMode="multiple" 
                    dataKey="id"
                    responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    sortField="signUpDate" 
                    sortOrder={-1}
                    header={<h2 className="text-2xl font-semibold m-0 pl-2 pt-2">User List</h2>}
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Filter by name" style={{ minWidth: '14rem' }} body={(rowData) => <div className="font-medium">{rowData.name}</div>}/>
                    <Column field="email" header="Email" sortable filter filterPlaceholder="Filter by email" style={{ minWidth: '16rem' }}/>
                    <Column field="signUpDate" header="Sign Up Date" sortable style={{ minWidth: '10rem' }}/>
                    <Column field="lastLogin" header="Last Login" sortable style={{ minWidth: '10rem' }}/>
                    <Column field="membership" header="Membership" body={membershipBodyTemplate} sortable style={{ minWidth: '12rem' }} className="text-center"/>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }} className="text-center"/>
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '10rem' }} header="Actions" frozen alignFrozen="right" className="text-center" />
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '450px' }} header={isNewUser ? "Create New User" : "Edit User Details"} modal className="p-fluid" footer={userDialogFooter} onHide={hideUserDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">Name*</label>
                    <InputText id="name" value={currentUser?.name || ''} onChange={(e) => handleInputChange(e, 'name')} required autoFocus className={!currentUser?.name ? 'p-invalid' : ''} />
                </div>
                <div className="field mt-3">
                    <label htmlFor="email" className="font-bold">Email*</label>
                    <InputText id="email" value={currentUser?.email || ''} onChange={(e) => handleInputChange(e, 'email')} required className={!currentUser?.email ? 'p-invalid' : ''} />
                </div>
                {isNewUser && (
                    <div className="field mt-3">
                        <label htmlFor="password">Password*</label>
                        <Password id="password" value={currentUser?.password || ''} onChange={(e) => handleInputChange(e, 'password')} feedback={false} toggleMask className={!currentUser?.password ? 'p-invalid' : ''}/>
                    </div>
                )}
                <div className="field mt-3">
                    <label htmlFor="status" className="font-bold">Status</label>
                    <Dropdown id="status" value={currentUser?.status} options={userStatusOptions} onChange={(e) => handleInputChange(e, 'status')} placeholder="Select Status" />
                </div>
                <div className="field mt-3">
                    <label htmlFor="membership" className="font-bold">Membership</label>
                    <Dropdown id="membership" value={currentUser?.membership} options={membershipOptions} onChange={(e) => handleInputChange(e, 'membership')} placeholder="Select Membership" />
                </div>
            </Dialog>

            <Dialog visible={viewUserDialog} style={{ width: '40rem' }} header="User Details" modal footer={viewUserDialogFooter} onHide={hideViewUserDialog}>
                {currentUser && (
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6"><label className="font-semibold">User ID:</label><p>{currentUser.id}</p></div>
                        <div className="field col-12 md:col-6"><label className="font-semibold">Name:</label><p>{currentUser.name}</p></div>
                        <div className="field col-12 md:col-6"><label className="font-semibold">Email:</label><p>{currentUser.email}</p></div>
                        <div className="field col-12 md:col-6"><label className="font-semibold">Sign Up Date:</label><p>{currentUser.signUpDate}</p></div>
                        <div className="field col-12 md:col-6"><label className="font-semibold">Last Login:</label><p>{currentUser.lastLogin}</p></div>
                        <div className="field col-12"><label className="font-semibold">Status:</label><div>{statusBodyTemplate(currentUser)}</div></div>
                        <div className="field col-12"><label className="font-semibold">Membership:</label><div>{membershipBodyTemplate(currentUser)}</div></div>
                    </div>
                )}
            </Dialog>

            <Dialog visible={suspendUserDialog} style={{ width: '30rem' }} header="Confirm Action" modal footer={suspendUserDialogFooter} onHide={hideSuspendUserDialog}>
                <div className="flex align-items-center">
                    <i className={`pi ${currentUser?.status === 'Active' ? 'pi-exclamation-triangle' : 'pi-info-circle'} mr-3`} style={{ fontSize: '2rem', color: currentUser?.status === 'Active' ? 'var(--orange-500)' : 'var(--blue-500)' }} />
                    {currentUser && (
                        <span>
                           Are you sure you want to <strong>{currentUser.status === 'Active' ? 'suspend' : 'reactivate'}</strong> the user <strong>{currentUser.name}</strong>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteUsersDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--red-500)' }} />
                    <span>Are you sure you want to delete the selected user(s)? This action cannot be undone.</span>
                </div>
            </Dialog>
        </div>
    );
};

export default UserManagement; 