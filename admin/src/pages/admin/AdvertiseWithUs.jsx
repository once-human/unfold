import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { v4 as uuidv4 } from 'uuid';

const BannerManagement = () => {
    const toast = useRef(null);
    const dt = useRef(null);

    const emptyBanner = {
        id: null,
        name: '',
        imageUrl: '', // This will store the object URL for preview
        imageFile: null, // This will store the actual file for upload
        targetUrl: 'https://',
        placement: null,
        status: true, // true for Active, false for Inactive
        startDate: null,
        endDate: null,
        dimensions: '', // e.g., '300x250'
    };

    const [banners, setBanners] = useState([]);
    const [bannerDialog, setBannerDialog] = useState(false);
    const [deleteBannerDialog, setDeleteBannerDialog] = useState(false);
    const [deleteBannersDialog, setDeleteBannersDialog] = useState(false);
    const [banner, setBanner] = useState(emptyBanner);
    const [selectedBanners, setSelectedBanners] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');

    const placementOptions = [
        { label: 'Homepage - Top Banner', value: 'homepage_top' },
        { label: 'Homepage - Middle Banner', value: 'homepage_middle' },
        { label: 'Sidebar - All Pages', value: 'sidebar_all' },
        { label: 'Category Page - Top Banner', value: 'category_top' },
        { label: 'Article Page - Inline', value: 'article_inline' },
        { label: 'Footer - All Pages', value: 'footer_all' },
    ];

    // Dummy Data
    useEffect(() => {
        setBanners([
            { id: uuidv4(), name: 'Summer Sale Banner', imageUrl: 'https://via.placeholder.com/300x250.png?text=Summer+Sale', targetUrl: 'https://example.com/summer-sale', placement: 'homepage_top', status: true, startDate: new Date('2024-07-01'), endDate: new Date('2024-07-31'), dimensions: '728x90' },
            { id: uuidv4(), name: 'New Product Launch', imageUrl: 'https://via.placeholder.com/300x250.png?text=New+Product', targetUrl: 'https://example.com/new-product', placement: 'sidebar_all', status: true, startDate: new Date('2024-08-01'), endDate: null, dimensions: '300x250' },
            { id: uuidv4(), name: 'Old Campaign (Inactive)', imageUrl: 'https://via.placeholder.com/300x250.png?text=Old+Campaign', targetUrl: 'https://example.com/old-campaign', placement: 'category_top', status: false, startDate: new Date('2023-01-15'), endDate: new Date('2023-02-15'), dimensions: '468x60' },
        ]);
    }, []);

    const openNew = () => {
        setBanner(emptyBanner);
        setSubmitted(false);
        setBannerDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBannerDialog(false);
    };

    const hideDeleteBannerDialog = () => {
        setDeleteBannerDialog(false);
    };

    const hideDeleteBannersDialog = () => {
        setDeleteBannersDialog(false);
    };

    const saveBanner = () => {
        setSubmitted(true);

        if (banner.name.trim() && banner.placement && banner.targetUrl.trim()) {
            let _banners = [...banners];
            let _banner = { ...banner };

            if (banner.id) { // Update
                const index = findIndexById(banner.id);
                _banners[index] = _banner;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Banner Updated', life: 3000 });
            } else { // Create
                _banner.id = uuidv4();
                // In a real app, you would upload _banner.imageFile here and store the returned URL in _banner.imageUrl
                // For now, if imageFile exists, we'll keep the preview URL, otherwise, a placeholder.
                if (!_banner.imageUrl && !_banner.imageFile) _banner.imageUrl = 'https://via.placeholder.com/300x250.png?text=New+Banner';
                _banners.push(_banner);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Banner Created', life: 3000 });
            }

            setBanners(_banners);
            setBannerDialog(false);
            setBanner(emptyBanner);
        }
    };

    const editBanner = (banner) => {
        setBanner({ ...banner, imageFile: null }); // Reset imageFile on edit, keep imageUrl
        setBannerDialog(true);
    };

    const confirmDeleteBanner = (banner) => {
        setBanner(banner);
        setDeleteBannerDialog(true);
    };

    const deleteBanner = () => {
        let _banners = banners.filter(val => val.id !== banner.id);
        setBanners(_banners);
        setDeleteBannerDialog(false);
        setBanner(emptyBanner);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Banner Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < banners.length; i++) {
            if (banners[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const confirmDeleteSelected = () => {
        setDeleteBannersDialog(true);
    };

    const deleteSelectedBanners = () => {
        let _banners = banners.filter(val => !selectedBanners.includes(val));
        setBanners(_banners);
        setDeleteBannersDialog(false);
        setSelectedBanners(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Banners Deleted', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _banner = { ...banner };
        _banner[`${name}`] = val;
        setBanner(_banner);
    };
    
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _banner = { ...banner };
        _banner[`${name}`] = val;
        setBanner(_banner);
    };

    const onStatusChange = (e) => {
        let _banner = { ...banner };
        _banner['status'] = e.value;
        setBanner(_banner);
    };
    
    const onDateChange = (e, name) => {
        let _banner = { ...banner };
        _banner[`${name}`] = e.value;
        setBanner(_banner);
    };

    const onPlacementChange = (e) => {
        let _banner = { ...banner };
        _banner['placement'] = e.value;
        setBanner(_banner);
    };

    const onUpload = (event) => {
        // In a real app, you'd handle the upload to a server.
        // For this demo, we'll use the object URL for preview.
        const file = event.files[0];
        let _banner = { ...banner };
        _banner.imageFile = file; // Store the file object
        _banner.imageUrl = URL.createObjectURL(file); // Create a URL for preview
        setBanner(_banner);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'Image selected. Click Save to apply changes.' });
    };

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New Banner" icon="pi pi-plus" severity="success" onClick={openNew} />
            <Button label="Delete Selected" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedBanners || !selectedBanners.length} />
        </div>
    );

    const rightToolbarTemplate = () => (
        <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    );
    
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const imageBodyTemplate = (rowData) => (
        <img src={rowData.imageUrl || 'https://via.placeholder.com/100x50.png?text=No+Image'} alt={rowData.name} className="shadow-2 border-round" style={{ width: '100px', height: 'auto', maxHeight: '50px', objectFit: 'contain' }} />
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status ? 'Active' : 'Inactive'} severity={rowData.status ? 'success' : 'danger'} rounded />
    );

    const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A';
    
    const dateBodyTemplate = (date) => formatDate(date);

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text className="p-button-info" onClick={() => editBanner(rowData)} tooltip="Edit" tooltipOptions={{position: 'bottom'}} />
            <Button icon="pi pi-trash" rounded text className="p-button-danger" onClick={() => confirmDeleteBanner(rowData)} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
        </div>
    );
    
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0 text-xl font-semibold">Manage Banners</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="p-inputtext-sm"/>
            </span>
        </div>
    );

    const bannerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} className="p-button-sm"/>
            <Button label="Save" icon="pi pi-check" onClick={saveBanner} autoFocus className="p-button-sm"/>
        </>
    );

    const deleteBannerDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteBannerDialog} className="p-button-sm"/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteBanner} className="p-button-sm"/>
        </>
    );

    const deleteBannersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteBannersDialog} className="p-button-sm"/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedBanners} className="p-button-sm"/>
        </>
    );
    
    const filteredBanners = banners.filter(b => {
        const globalMatch = globalFilter ? 
            (b.name?.toLowerCase().includes(globalFilter.toLowerCase()) || 
            b.placement?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            b.targetUrl?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            b.dimensions?.toLowerCase().includes(globalFilter.toLowerCase())
            ) : true;
        return globalMatch;
    });


    return (
        <div className="p-4 surface-card min-h-screen">
            <Toast ref={toast} />
            <div className="card shadow-2 border-round">
                <Toolbar className="mb-4 pt-2 pb-2 border-round-top surface-border" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    ref={dt}
                    value={filteredBanners}
                    selection={selectedBanners}
                    onSelectionChange={(e) => setSelectedBanners(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} banners"
                    globalFilter={globalFilter} // Though we use a custom filter logic, this can be kept for Paginator's search field if any
                    emptyMessage="No banners found."
                    header={header}
                    responsiveLayout="scroll"
                    size="small"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }} body={(rowData) => <span className="font-semibold">{rowData.name}</span>}/>
                    <Column header="Image" body={imageBodyTemplate} style={{ minWidth: '8rem', textAlign: 'center' }} />
                    <Column field="targetUrl" header="Target URL" sortable style={{ minWidth: '15rem' }} body={(rowData) => <a href={rowData.targetUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{rowData.targetUrl}</a>} />
                    <Column field="placement" header="Placement" sortable filter filterElement={(options) => 
                        <Dropdown value={options.value} options={placementOptions} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" showClear style={{minWidth: '10rem'}}/>
                    } style={{ minWidth: '12rem' }} />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem', textAlign: 'center' }} />
                    <Column field="startDate" header="Start Date" body={(rowData) => dateBodyTemplate(rowData.startDate)} sortable style={{ minWidth: '10rem' }} />
                    <Column field="endDate" header="End Date" body={(rowData) => dateBodyTemplate(rowData.endDate)} sortable style={{ minWidth: '10rem' }} />
                    <Column field="dimensions" header="Dimensions" sortable style={{ minWidth: '8rem' }}/>
                    <Column body={actionsBodyTemplate} exportable={false} style={{ minWidth: '8rem', textAlign:'center' }} header="Actions" frozen alignFrozen="right" />
                </DataTable>
            </div>

            <Dialog visible={bannerDialog} style={{ width: '40rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header={banner.id ? "Edit Banner" : "Create New Banner"} modal className="p-fluid" footer={bannerDialogFooter} onHide={hideDialog}>
                
                <div className="field">
                    <label htmlFor="name" className="font-semibold">Banner Name*</label>
                    <InputText id="name" value={banner.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus 
                               className={submitted && !banner.name ? 'p-invalid' : ''} />
                    {submitted && !banner.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field mt-3">
                    <label htmlFor="targetUrl" className="font-semibold">Target URL*</label>
                    <InputText id="targetUrl" value={banner.targetUrl} onChange={(e) => onInputChange(e, 'targetUrl')} required 
                               className={submitted && !banner.targetUrl ? 'p-invalid' : ''}/>
                    {submitted && !banner.targetUrl && <small className="p-error">Target URL is required.</small>}
                </div>

                <div className="field mt-3">
                    <label htmlFor="placement" className="font-semibold">Placement*</label>
                    <Dropdown id="placement" value={banner.placement} options={placementOptions} onChange={onPlacementChange} 
                              placeholder="Select a Placement" required className={submitted && !banner.placement ? 'p-invalid' : ''}/>
                    {submitted && !banner.placement && <small className="p-error">Placement is required.</small>}
                </div>
                
                <div className="field mt-3">
                    <label htmlFor="dimensions" className="font-semibold">Dimensions (e.g., 300x250)</label>
                    <InputText id="dimensions" value={banner.dimensions} onChange={(e) => onInputChange(e, 'dimensions')} />
                </div>

                <div className="formgrid grid mt-3">
                    <div className="field col">
                        <label htmlFor="startDate" className="font-semibold">Start Date</label>
                        <Calendar id="startDate" value={banner.startDate} onChange={(e) => onDateChange(e, 'startDate')} dateFormat="mm/dd/yy" showIcon />
                    </div>
                    <div className="field col">
                        <label htmlFor="endDate" className="font-semibold">End Date</label>
                        <Calendar id="endDate" value={banner.endDate} onChange={(e) => onDateChange(e, 'endDate')} dateFormat="mm/dd/yy" showIcon minDate={banner.startDate}/>
                    </div>
                </div>

                <div className="field mt-3">
                    <label className="font-semibold">Banner Image</label>
                    {banner.imageUrl && !banner.imageFile && ( // Show current image if editing and no new file selected
                        <div className="mb-2">
                            <p className="text-sm mb-1">Current Image:</p>
                            <img src={banner.imageUrl} alt="Current Banner" style={{maxWidth: '200px', maxHeight: '100px', objectFit: 'contain'}} className="border-round"/>
                        </div>
                    )}
                     {banner.imageFile && banner.imageUrl && ( // Show preview of newly selected image
                        <div className="mb-2">
                            <p className="text-sm mb-1">New Image Preview:</p>
                            <img src={banner.imageUrl} alt="New Banner Preview" style={{maxWidth: '200px', maxHeight: '100px', objectFit: 'contain'}} className="border-round"/>
                        </div>
                    )}
                    <FileUpload name="bannerImage" url="./upload" // Dummy URL, PrimeReact FileUpload needs it. Will be handled by onUpload.
                                accept="image/*" maxFileSize={1000000} // 1MB
                                onUpload={onUpload} // This is deprecated, use customUpload and uploadHandler
                                customUpload uploadHandler={onUpload} // Use customUpload and pass the handler
                                auto chooseLabel="Choose Image" 
                                className="p-button-sm"
                                invalidFileSizeMessageSummary="{name}: File size exceeds limit of {0}."
                                invalidFileSizeMessageDetail="Maximum upload size is 1MB."
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload, or click "Choose Image".</p>} 
                    />
                    <small className="p-d-block mt-1">Max file size: 1MB. Recommended types: JPG, PNG, GIF.</small>
                </div>
                 {submitted && !banner.imageUrl && !banner.id && <small className="p-error">Image is required for new banners.</small>}


                <div className="field-checkbox mt-4 flex align-items-center">
                    <InputSwitch inputId="status" checked={banner.status} onChange={onStatusChange} />
                    <label htmlFor="status" className="ml-2 font-semibold">Active</label>
                </div>
            </Dialog>

            <Dialog visible={deleteBannerDialog} style={{ width: '30rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm Delete" modal footer={deleteBannerDialogFooter} onHide={hideDeleteBannerDialog}>
                <div className="confirmation-content flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {banner && <span>Are you sure you want to delete the banner <b>{banner.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteBannersDialog} style={{ width: '30rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm Delete" modal footer={deleteBannersDialogFooter} onHide={hideDeleteBannersDialog}>
                <div className="confirmation-content flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {banner && <span>Are you sure you want to delete the selected banners?</span>}
                </div>
            </Dialog>
        </div>
    );
};

export default BannerManagement; 