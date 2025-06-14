import React, { useState, useEffect, useRef } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toolbar } from 'primereact/toolbar';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';

const CategoriesManagement = () => {
    const toast = useRef(null);
    const tt = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null); // For editing/creating
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [parentKeyForNewSubcategory, setParentKeyForNewSubcategory] = useState(null); // Renamed for clarity
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [editingNode, setEditingNode] = useState(null); // For editing existing node
    const [currentParentNode, setCurrentParentNode] = useState(null); // For adding subcategory
    const [categoryName, setCategoryName] = useState('');
    const [categorySlug, setCategorySlug] = useState('');

    const initialDialogCategoryState = { // Renamed for clarity, defines structure for dialog
        key: null, // Will be set for existing, or generated for new
        data: { name: '', slug: '', description: '' },
        children: [] // Important for new categories that might become parents
    };

    // Helper function to find and update/add node in tree
    const updateNode = (key, newCategoryData, parentNodes) => {
        return parentNodes.map(node => {
            if (node.key === key) {
                return { ...node, data: newCategoryData.data };
            }
            if (node.children && node.children.length > 0) {
                const updatedChildren = updateNode(key, newCategoryData, node.children);
                if (updatedChildren.some(child => child.key === key || JSON.stringify(child) !== JSON.stringify(node.children.find(c => c.key === child.key)))) {
                     return { ...node, children: updatedChildren };
                }
            }
            return node;
        });
    };

    const addNode = (parentNodeKey, newCategoryNode, currentNodes) => {
        if (parentNodeKey === null) { // Adding a root category
            return [...currentNodes, newCategoryNode];
        }
        return currentNodes.map(node => {
            if (node.key === parentNodeKey) {
                return { ...node, children: [...(node.children || []), newCategoryNode] };
            }
            if (node.children && node.children.length > 0) {
                return { ...node, children: addNode(parentNodeKey, newCategoryNode, node.children) };
            }
            return node;
        });
    };
    
    // Helper to remove node
    const removeNodeRecursive = (keyToRemove, currentNodes) => {
        return currentNodes.filter(node => node.key !== keyToRemove).map(node => {
            if (node.children && node.children.length > 0) {
                return { ...node, children: removeNodeRecursive(keyToRemove, node.children) };
            }
            return node;
        });
    };


    useEffect(() => {
        // Dummy data
        const initialNodes = [
            {
                key: 'cat-001',
                data: { name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
                children: [
                    {
                        key: 'cat-001-001',
                        data: { name: 'Mobile Phones', slug: 'mobile-phones', description: 'Smartphones and accessories' },
                        children: [
                             { key: 'cat-001-001-001', data: { name: 'Smartphones', slug: 'smartphones', description: 'Latest smartphones' } },
                             { key: 'cat-001-001-002', data: { name: 'Mobile Accessories', slug: 'mobile-accessories', description: 'Chargers, cases, etc.' } },
                        ]
                    },
                    { key: 'cat-001-002', data: { name: 'Laptops', slug: 'laptops', description: 'Notebooks and ultrabooks' } }
                ]
            },
            {
                key: 'cat-002',
                data: { name: 'Fashion', slug: 'fashion', description: 'Apparel and accessories' },
                 children: [
                    { key: 'cat-002-001', data: { name: 'Men\'s Fashion', slug: 'mens-fashion', description: 'Clothing for men' } },
                    { key: 'cat-002-002', data: { name: 'Women\'s Fashion', slug: 'womens-fashion', description: 'Clothing for women' } }
                ]
            },
             { key: 'cat-003', data: { name: 'Home & Garden', slug: 'home-garden', description: 'Furniture and decor' } }
        ];
        setNodes(initialNodes);
    }, []);

    const openNewNodeDialog = (parentNodeData = null) => {
        setCurrentCategory({ ...initialDialogCategoryState, data: { ...initialDialogCategoryState.data }, children: [] });
        setIsNewCategory(true);
        setParentKeyForNewSubcategory(parentNodeData ? parentNodeData.key : null);
        setCategoryDialog(true);
    };

    const openEditNodeDialog = (nodeToEdit) => {
        // Deep copy the node to avoid direct state mutation if user cancels
        const categoryCopy = JSON.parse(JSON.stringify(nodeToEdit));
        setCurrentCategory(categoryCopy);
        setIsNewCategory(false);
        setParentKeyForNewSubcategory(null); // Not adding a subcategory, but editing
        setCategoryDialog(true);
    };

    const hideCategoryDialog = () => {
        setCategoryDialog(false);
        setCurrentCategory(null); // Clear current category
        setParentKeyForNewSubcategory(null); // Clear parent key
        setIsNewCategory(false); // Reset flag
    };

    const handleCategoryInputChange = (e, fieldName) => {
        const val = e.target.value;
        setCurrentCategory(prev => {
            if (!prev) return initialDialogCategoryState; // Should not happen if dialog is open
            return {
                ...prev,
                data: { ...prev.data, [fieldName]: val }
            };
        });
    };

    const saveCategory = () => {
        if (!currentCategory || !currentCategory.data || !currentCategory.data.name || !currentCategory.data.slug) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Category Name and Slug are required.', life: 3000 });
            return;
        }
        
        let _nodes = [...nodes]; //ทำงานบน copy ของ state

        if (isNewCategory) {
            const newKey = `cat-${uuidv4().substring(0, 8)}`;
            // Ensure currentCategory has a children array for future subcategories
            const newCategoryNode = { 
                ...currentCategory, 
                key: newKey, 
                children: currentCategory.children || [] 
            };
            _nodes = addNode(parentKeyForNewSubcategory, newCategoryNode, _nodes);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
        } else { // Editing existing category
            if (!currentCategory.key) { // Should not happen in edit mode
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Cannot update category without a key.', life: 3000 });
                return;
            }
            _nodes = updateNode(currentCategory.key, currentCategory, _nodes); // Pass the whole currentCategory
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
        }
        setNodes(_nodes);
        hideCategoryDialog();
    };

    const confirmDeleteNode = (categoryNode) => {
        setCurrentCategory(categoryNode);
        setDeleteCategoryDialog(true);
    };
    
    const hideDeleteCategoryDialog = () => setDeleteCategoryDialog(false);

    const deleteCategory = () => {
        if (!currentCategory) return;
        let _nodes = removeNodeRecursive(currentCategory.key, nodes);
        setNodes(_nodes);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
        hideDeleteCategoryDialog();
        setCurrentCategory(null);
    };

    const exportCSV = () => {
        tt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            // Passing null to openNewNodeDialog to indicate a root category
            <Button label="New Root Category" icon="pi pi-plus" className="p-button-success" onClick={() => openNewNodeDialog(null)} />
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        )
    }
    
    const actionTemplate = (node, column) => {
        return <div className="flex gap-2">
            <Button icon="pi pi-plus-circle" tooltip="Add Subcategory" tooltipOptions={{position: 'top'}} className="p-button-rounded p-button-success p-button-text" onClick={() => openNewNodeDialog(node)} />
            <Button icon="pi pi-pencil" tooltip="Edit" tooltipOptions={{position: 'top'}} className="p-button-rounded p-button-info p-button-text" onClick={() => openEditNodeDialog(node)} />
            <Button icon="pi pi-trash" tooltip="Delete" tooltipOptions={{position: 'top'}} className="p-button-rounded p-button-danger p-button-text" onClick={() => confirmDeleteNode(node)} />
        </div>;
    }

    const categoryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideCategoryDialog} className="p-button-sm"/>
            <Button label={isNewCategory ? (parentKeyForNewSubcategory ? "Add New Subcategory" : "Add New Root Category") : "Save Changes"} icon="pi pi-check" onClick={saveCategory} className="p-button-sm" autoFocus />
        </>
    );

    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoryDialog} className="p-button-sm"/>
            <Button label="Yes, Delete" icon="pi pi-trash" severity="danger" onClick={deleteCategory} className="p-button-sm" autoFocus />
        </>
    );

    return (
        <div className="card surface-card p-4 border-round shadow-2"> {/* Outer card for page background/padding */}
            <Toast ref={toast} />
            <Card title="Manage Categories & Subcategories" className="shadow-none"> {/* Inner card as per previous UI enhancements */}
                <Toolbar 
                    className="mb-4 p-2 surface-border border-1 border-round" 
                    left={leftToolbarTemplate} 
                    right={rightToolbarTemplate}
                    pt={{ root: {className: 'border-noround'}}} 
                />
                <TreeTable 
                    ref={tt} 
                    value={nodes} 
                    globalFilter={null} /* Global filter for TreeTable is more complex, not implementing for now */
                    emptyMessage="No categories found."
                    tableStyle={{ minWidth: '50rem' }}
                    selectionMode="single"
                    selectionKeys={selectedNodeKey}
                    onSelectionChange={(e) => setSelectedNodeKey(e.value)}
                    scrollable 
                    scrollHeight="calc(100vh - 350px)" /* Adjusted scrollHeight slightly */
                >
                    <Column field="name" header="Category Name" expander style={{ minWidth: '20rem' }} headerClassName="font-semibold"/>
                    <Column field="slug" header="Slug" style={{ minWidth: '15rem' }} headerClassName="font-semibold"/>
                    <Column field="id" header="ID" style={{ minWidth: '20rem' }} headerClassName="font-semibold" body={(node) => node.key}/> {/* Displaying node.key as ID */}
                    <Column body={actionTemplate} header="Actions" style={{ width: '10rem', textAlign: 'center' }} headerClassName="font-semibold" />
                </TreeTable>
            </Card>

            <Dialog visible={categoryDialog} style={{ width: '35rem' }} 
                    header={isNewCategory ? (parentKeyForNewSubcategory ? "Add New Subcategory" : "Add New Root Category") : "Edit Category"} 
                    modal className="p-fluid" footer={categoryDialogFooter} onHide={hideCategoryDialog}>
                {currentCategory && currentCategory.data && (
                    <>
                        <div className="field">
                            <label htmlFor="catName" className="font-semibold">Category Name*</label>
                            <InputText id="catName" value={currentCategory.data.name || ''} onChange={(e) => handleCategoryInputChange(e, 'name')} required autoFocus className={!currentCategory.data.name ? 'p-invalid' : ''}/>
                        </div>
                        <div className="field mt-3">
                            <label htmlFor="catSlug" className="font-semibold">Slug*</label>
                            <InputText id="catSlug" value={currentCategory.data.slug || ''} onChange={(e) => handleCategoryInputChange(e, 'slug')} required  className={!currentCategory.data.slug ? 'p-invalid' : ''}/>
                        </div>
                        <div className="field mt-3">
                            <label htmlFor="catDescription" className="font-semibold">Description</label>
                            <InputTextarea id="catDescription" value={currentCategory.data.description || ''} onChange={(e) => handleCategoryInputChange(e, 'description')} rows={3} autoResize />
                        </div>
                    </>
                )}
            </Dialog>

            <Dialog visible={deleteCategoryDialog} style={{ width: '30rem' }} header="Confirm Deletion" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                <div className="flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'var(--orange-500)' }} />
                    {currentCategory && currentCategory.data && (
                        <span>
                            Are you sure you want to delete the category <strong>{currentCategory.data.name}</strong>?
                            {currentCategory.children && currentCategory.children.length > 0 && <strong className='block mt-2 text-red-500'>This will also delete all its subcategories!</strong>}
                        </span>
                        
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default CategoriesManagement; 