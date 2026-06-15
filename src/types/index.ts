export interface Category {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  is_available: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  category_name?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Order {
  id: number;
  order_ref: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_notes: string;
  preferred_timing: string;
  items_json: string;
  subtotal: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNotes: string;
  preferredTiming: string;
}
