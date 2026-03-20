// Procurement Request Types
export interface RequestItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  selectedPrice?: number;
}

export interface ProcurementRequest {
  id: string;
  requestNumber: string;
  department: string;
  date: string;
  estimatedBudget: number;
  currency: string;
  items: RequestItem[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  linkedProject?: string;
}

// Quotation Types
export interface Quotation {
  id: string;
  quotationNumber: string;
  requestNumber: string;
  requestId: string;
  supplier: string;
  amount: number;
  currency: string;
  delivery: string;
  warranty: string;
  rfStatus: 'RF Pending' | 'Rejected' | 'RF Approved';
  poStatus?: string;
  validUntil: string;
}

// RF Approval Types
export interface RFApproval {
  id: string;
  rfNumber: string;
  requestNumber: string;
  description: string;
  supplier: string;
  totalAmount: number;
  currency: string;
  state: 'Pending' | 'Approved' | 'Rejected';
  requestedDate: string;
  poNumber?: string;
}

// Purchase Order Types
export interface POItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface POSupplier {
  name: string;
  id: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
}

export interface PODelivery {
  location: string;
  warehouse: string;
  department: string;
  project?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected' | 'Received';
  rfNumber: string;
  requestNumber: string;
  supplier: POSupplier;
  deliveryInfo: PODelivery;
  items: POItem[];
  subtotal: number;
  taxes: number;
  total: number;
  currency: string;
  paymentTerms: string;
  deliveryDate: string;
  createdDate: string;
  complianceChecklist: ComplianceCheck[];
  paymentMethod: string;
  paymentDueDate: string;
  activityLog: ActivityLogEntry[];
}

export interface ComplianceCheck {
  id: string;
  name: string;
  status: boolean;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  actor: string;
  date: string;
  details?: string;
}

// Payment Types
export interface Payment {
  id: string;
  poNumber: string;
  supplier: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'Pending' | 'Due Today' | 'Overdue' | 'Paid';
  paymentMethod?: string;
  proofUploaded?: boolean;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  itemNumber: number;
  stockId: string;
  name: string;
  warehouse: string;
  onHand: number;
  unit: string;
  status: 'Active' | 'Inactive';
  actions?: string;
}

export interface ReceivingHistory {
  date: string;
  po: string;
  supplier: string;
  warehouse: string;
}

export interface LowStockItem {
  name: string;
  warehouse: string;
  onHand: number;
  unit: string;
  minimumLevel?: number;
  status: 'Low Stock' | 'Out of Stock';
}

// Catalog Types
export interface CatalogItem {
  id: string;
  itemNumber?: number;
  image?: string;
  name: string;
  category: string;
  supplier: string;
  active: 'Active' | 'Inactive';
  unitPrice: number;
  currency: string;
  actions?: string;
  supplierLogo?: string;
}

// Dashboard Types
export interface DashboardKPI {
  label: string;
  value: number;
  color: 'blue' | 'orange' | 'red' | 'green';
}

export interface RequestOverviewItem {
  id: string;
  requestNumber: string;
  item: string;
  dueToday?: string;
  amount?: string;
  status?: string;
  date?: string;
  poNumber?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// Filter & Sort Types
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}
