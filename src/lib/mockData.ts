import {
  ProcurementRequest,
  Quotation,
  RFApproval,
  PurchaseOrder,
  Payment,
  InventoryItem,
  CatalogItem,
  LowStockItem,
  ReceivingHistory,
  ComplianceCheck,
  ActivityLogEntry,
} from './types';

// Mock Procurement Requests
export const mockRequests: ProcurementRequest[] = [
  {
    id: '1',
    requestNumber: 'PR-1042',
    department: 'Operations',
    date: '12 Mar 2026',
    estimatedBudget: 12000,
    currency: 'USD',
    status: 'draft',
    linkedProject: undefined,
    items: [
      {
        id: '1',
        description: 'Pump Filter',
        quantity: 5,
        unitPrice: 2400,
        selectedPrice: 2000,
      },
    ],
  },
  {
    id: '2',
    requestNumber: 'PR-1041',
    department: 'Operations',
    date: '10 Mar 2026',
    estimatedBudget: 8600,
    currency: 'USD',
    status: 'submitted',
    items: [
      {
        id: '1',
        description: 'Maintenance Tools',
        quantity: 2,
        unitPrice: 4300,
      },
    ],
  },
];

// Mock Quotations
export const mockQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QUO-5072',
    requestNumber: 'PR-1042',
    requestId: '1',
    supplier: 'Baker Hughes',
    amount: 12000,
    currency: 'USD',
    delivery: '10 days',
    warranty: '1 year',
    rfStatus: 'RF Pending',
    validUntil: '15 Mar 2026',
  },
  {
    id: '2',
    quotationNumber: 'QUO-5073',
    requestNumber: 'PR-1046',
    requestId: '2',
    supplier: 'Halliburton',
    amount: 24500,
    currency: 'USD',
    delivery: '5 days',
    warranty: '6 months',
    rfStatus: 'Rejected',
    validUntil: '12 Mar 2026',
  },
  {
    id: '3',
    quotationNumber: 'QUO-5075',
    requestNumber: 'PR-1050',
    requestId: '1',
    supplier: 'Schlumberger',
    amount: 8000,
    currency: 'USD',
    delivery: '7 days',
    warranty: '1 year',
    rfStatus: 'RF Approved',
    poStatus: 'PO Awaiting A...',
    validUntil: '18 Mar 2026',
  },
];

// Mock RF Approvals
export const mockRFApprovals: RFApproval[] = [
  {
    id: '1',
    rfNumber: 'RF-332',
    requestNumber: 'PR-1042',
    description: 'Pumps Spare Parts',
    supplier: 'Baker Hughes',
    totalAmount: 12000,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '12 Mar 2026',
  },
  {
    id: '2',
    rfNumber: 'RF-336',
    requestNumber: 'PR-1051',
    description: 'Chemical Reagents',
    supplier: 'Halliburton',
    totalAmount: 15250,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '10 Mar 2026',
  },
  {
    id: '3',
    rfNumber: 'RF-338',
    requestNumber: 'PR-1052',
    description: 'Maintenance Tools',
    supplier: 'Schlumberger',
    totalAmount: 8400,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '9 Mar 2026',
  },
  {
    id: '4',
    rfNumber: 'RF-341',
    requestNumber: 'PR-1054',
    description: 'Submersible Pump',
    supplier: 'Weir Oil & Gas',
    totalAmount: 27000,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '7 Mar 2026',
  },
  {
    id: '5',
    rfNumber: 'RF-342',
    requestNumber: 'PR-1055',
    description: 'IT Consultancy Service',
    supplier: 'Deloitte',
    totalAmount: 5000,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '6 Mar 2026',
    poNumber: 'PO-211',
  },
  {
    id: '6',
    rfNumber: 'RF-343',
    requestNumber: 'PR-1057',
    description: 'Catering Service',
    supplier: 'Sodexo',
    totalAmount: 7600,
    currency: 'USD',
    state: 'Pending',
    requestedDate: '5 Mar 2026',
  },
];

// Mock Purchase Orders
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-210',
    status: 'Pending Approval',
    rfNumber: 'RF-332',
    requestNumber: 'PR-1042',
    supplier: {
      name: 'Baker Hughes',
      id: 'SUP-048',
      contact: 'John Matthews',
      email: 'j.matthews@bakerhughes.com',
      phone: '+1 (713) 555-0198',
      country: 'USA',
    },
    deliveryInfo: {
      location: 'Luanda Base',
      warehouse: 'Main Warehouse',
      department: 'Operations',
      project: 'Drilling Project',
    },
    items: [
      {
        id: '1',
        description: 'Pump Filter',
        quantity: 5,
        unitPrice: 2400,
        total: 12000,
      },
    ],
    subtotal: 12000,
    taxes: 0,
    total: 12000,
    currency: 'USD',
    paymentTerms: '30 Days',
    deliveryDate: '20 Mar 2026',
    createdDate: '12 Mar 2026',
    complianceChecklist: [
      { id: '1', name: 'Supplier Registered', status: true },
      { id: '2', name: 'Supplier Compliance', status: true },
      { id: '3', name: 'Budget Approved', status: true },
      { id: '4', name: 'RF Approved', status: true },
      { id: '5', name: 'Invoice Verified', status: false },
    ],
    paymentMethod: 'Bank Transfer',
    paymentDueDate: '20 Mar 2026',
    activityLog: [
      {
        id: '1',
        action: 'PO Created',
        actor: 'Procurement',
        date: '12 Mar 2026',
      },
      {
        id: '2',
        action: 'RF Approved',
        actor: 'Board',
        date: '12 Mar 2026',
      },
    ],
  },
  {
    id: '2',
    poNumber: 'PO-208',
    status: 'Approved',
    rfNumber: 'RF-336',
    requestNumber: 'PR-1046',
    supplier: {
      name: 'Schlumberger',
      id: 'SUP-045',
      contact: 'Jane Smith',
      email: 'j.smith@slb.com',
      phone: '+1 (713) 555-0199',
      country: 'USA',
    },
    deliveryInfo: {
      location: 'Luanda Base',
      warehouse: 'Secondary Warehouse',
      department: 'Operations',
    },
    items: [
      {
        id: '1',
        description: 'Chemical Reagents',
        quantity: 10,
        unitPrice: 1525,
        total: 15250,
      },
    ],
    subtotal: 15250,
    taxes: 0,
    total: 15250,
    currency: 'USD',
    paymentTerms: '45 Days',
    deliveryDate: '18 Mar 2026',
    createdDate: '10 Mar 2026',
    complianceChecklist: [
      { id: '1', name: 'Supplier Registered', status: true },
      { id: '2', name: 'Supplier Compliance', status: true },
      { id: '3', name: 'Budget Approved', status: true },
      { id: '4', name: 'RF Approved', status: true },
      { id: '5', name: 'Invoice Verified', status: true },
    ],
    paymentMethod: 'Bank Transfer',
    paymentDueDate: '24 Apr 2026',
    activityLog: [
      {
        id: '1',
        action: 'PO Created',
        actor: 'Procurement',
        date: '10 Mar 2026',
      },
      {
        id: '2',
        action: 'RF Approved',
        actor: 'Board',
        date: '10 Mar 2026',
      },
    ],
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    poNumber: 'PO-210',
    supplier: 'Baker Hughes',
    amount: 12000,
    currency: 'USD',
    dueDate: '20 Mar 2026',
    status: 'Pending',
  },
  {
    id: '2',
    poNumber: 'PO-208',
    supplier: 'Schlumberger',
    amount: 8400,
    currency: 'USD',
    dueDate: 'Today',
    status: 'Due Today',
  },
  {
    id: '3',
    poNumber: 'PO-205',
    supplier: 'Halliburton',
    amount: 15200,
    currency: 'USD',
    dueDate: 'Yesterday',
    status: 'Overdue',
  },
  {
    id: '4',
    poNumber: 'PO-207',
    supplier: 'Sodexo',
    amount: 5800,
    currency: 'USD',
    dueDate: 'Yesterday',
    status: 'Pending',
  },
  {
    id: '5',
    poNumber: 'PO-199',
    supplier: 'Deloitte',
    amount: 57000,
    currency: 'USD',
    dueDate: '14 Mar 2026',
    status: 'Pending',
  },
  {
    id: '6',
    poNumber: 'PO-198',
    supplier: 'Weir Oil & Gas',
    amount: 27000,
    currency: 'USD',
    dueDate: '13 Mar 2026',
    status: 'Pending',
  },
];

// Mock Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    itemNumber: 1,
    stockId: 'STK-1042',
    name: 'Pump Filter',
    warehouse: 'Luanda Base',
    onHand: 150,
    unit: 'EA',
    status: 'Active',
  },
  {
    id: '2',
    itemNumber: 2,
    stockId: 'STK-261',
    name: 'Drill Bit',
    warehouse: 'Luanda Base',
    onHand: 320,
    unit: 'EA',
    status: 'Active',
  },
  {
    id: '3',
    itemNumber: 3,
    stockId: 'STK-832',
    name: 'Chemical Reagent',
    warehouse: 'Offshore Rig 2',
    onHand: 30,
    unit: 'LT',
    status: 'Active',
  },
  {
    id: '4',
    itemNumber: 4,
    stockId: 'STK-1160',
    name: 'Laptop Dell Latitude',
    warehouse: 'Onshore Rig 3',
    onHand: 9,
    unit: 'EA',
    status: 'Active',
  },
  {
    id: '5',
    itemNumber: 5,
    stockId: 'STK-901',
    name: 'Steel Pipes',
    warehouse: 'Onshore Rig 7',
    onHand: 640,
    unit: 'M',
    status: 'Active',
  },
];

// Mock Low Stock Items
export const mockLowStockItems: LowStockItem[] = [
  {
    name: 'Hydraulic Pump',
    warehouse: 'Offshore Rig 2',
    onHand: 4,
    unit: 'EA',
    minimumLevel: 5,
    status: 'Low Stock',
  },
  {
    name: 'Laptop Dell Latitude',
    warehouse: 'Luanda Base',
    onHand: 2,
    unit: 'EA',
    minimumLevel: 20,
    status: 'Low Stock',
  },
  {
    name: 'Drill Bit',
    warehouse: 'Luanda Base',
    onHand: 12,
    unit: 'EA',
    minimumLevel: 50,
    status: 'Low Stock',
  },
  {
    name: 'Steel Pipes',
    warehouse: 'Onshore Rig 7',
    onHand: 80,
    unit: 'M',
    minimumLevel: 100,
    status: 'Low Stock',
  },
];

// Mock Receiving History
export const mockReceivingHistory: ReceivingHistory[] = [
  {
    date: '15 Mar 2026',
    po: 'PO-210',
    supplier: 'Baker Hughes',
    warehouse: 'Luanda Base',
  },
  {
    date: '12 Mar 2026',
    po: 'PO-207',
    supplier: 'Sodexo',
    warehouse: 'Onshore Rig 7',
  },
];

// Mock Catalog Items
export const mockCatalogItems: CatalogItem[] = [
  {
    id: '1',
    itemNumber: 1,
    name: 'Hammer Drill',
    category: 'Equipment',
    supplier: 'SUP-008 Ingersol Rand',
    active: 'Active',
    unitPrice: 30,
    currency: 'USD',
  },
  {
    id: '2',
    itemNumber: 2,
    name: 'Dell Latitude 5510',
    category: 'IT Equipment',
    supplier: 'SUP-012 Dell',
    active: 'Active',
    unitPrice: 1100,
    currency: 'USD',
  },
  {
    id: '3',
    itemNumber: 3,
    name: 'Chemical Reagent',
    category: 'Chemicals',
    supplier: 'SUP-008 Baker Hughes',
    active: 'Active',
    unitPrice: 25,
    currency: 'LTR',
  },
  {
    id: '4',
    itemNumber: 4,
    name: 'Hydraulic Pump',
    category: 'Equipment',
    supplier: 'SUP-008 Weir Oil & Gas',
    active: 'Active',
    unitPrice: 2400,
    currency: 'USD',
  },
  {
    id: '5',
    itemNumber: 5,
    name: 'Safety Gloves',
    category: 'PPE',
    supplier: 'SUP-012 Sodexo',
    active: 'Inactive',
    unitPrice: 8,
    currency: 'USD',
  },
  {
    id: '6',
    itemNumber: 6,
    name: 'Air Compressor',
    category: 'Equipment',
    supplier: 'SUP-012 Bauer',
    active: 'Active',
    unitPrice: 890,
    currency: 'USD',
  },
  {
    id: '7',
    itemNumber: 7,
    name: 'Steel Pipes',
    category: 'Construction',
    supplier: 'SUP-008 Tenaris',
    active: 'Active',
    unitPrice: 35,
    currency: 'USD',
  },
];

// Dashboard data functions
export function getDashboardKPIs() {
  return {
    requestsOpen: 8,
    quotationsPending: 12,
    rfWaitingApproval: 5,
    poWaitingApproval: 4,
    itemsAwaitingInventory: 7,
  };
}

export function getQuotationStats() {
  return {
    open: 25,
    approved: 10,
    rejected: 5,
  };
}

export function getPaymentStats() {
  return {
    pending: 26,
    dueToday: 4,
    overdue: 8,
    totalPaidThisMonth: 257400,
  };
}

export function getInventoryStats() {
  return {
    totalItems: 2472,
    lowStock: 56,
    outOfStock: 8,
    warehouseValue: 1370945,
  };
}

export function getCatalogStats() {
  return {
    totalItems: 644,
    activeItems: 622,
    inactiveItems: 22,
    preferredSuppliers: 42,
  };
}

// Get single records
export function getProcurementRequest(id: string) {
  return mockRequests.find((r) => r.id === id);
}

export function getQuotation(id: string) {
  return mockQuotations.find((q) => q.id === id);
}

export function getRFApproval(id: string) {
  return mockRFApprovals.find((rf) => rf.id === id);
}

export function getPurchaseOrder(id: string) {
  return mockPurchaseOrders.find((po) => po.id === id);
}

export function getPayment(id: string) {
  return mockPayments.find((p) => p.id === id);
}

// Get lists with filtering
export function getQuotationsByStatus(status: string) {
  return mockQuotations.filter((q) => q.rfStatus === status);
}

export function getRFApprovalsByState(state: string) {
  return mockRFApprovals.filter((rf) => rf.state === state);
}

export function getPaymentsByStatus(status: string) {
  return mockPayments.filter((p) => p.status === status);
}

export function getCatalogItemsByCategory(category: string) {
  return mockCatalogItems.filter((item) => item.category === category);
}

export function getCatalogItemsBySupplier(supplier: string) {
  return mockCatalogItems.filter((item) => item.supplier === supplier);
}
