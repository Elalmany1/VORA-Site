import { reactive, computed } from "vue";

export const cartStore = reactive({
    // Cart items matching Image 1
    items: [
        {
            id: "samsung-fridge",
            name: "Samsung 634L SpaceMax Refrigerator",
            sku: "SMX-634-SS",
            variant: "Stainless Steel",
            price: 1749.00,
            originalPrice: 1899.00,
            quantity: 1,
            inStock: true,
            image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&auto=format&fit=crop&q=80",
        },
        {
            id: "corsair-ssd",
            name: "Corsair MP600 PRO XT 2TB Gen4 PCIe x4 NVMe M.2 SSD",
            sku: "CSSD-F2000GBMP600PXT",
            variant: "2TB",
            price: 189.99,
            originalPrice: null,
            quantity: 2,
            inStock: true,
            image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&auto=format&fit=crop&q=80",
        },
    ],

    savedForLater: [],

    // Price drop alert notification
    priceAlert: {
        productName: "Samsung 634L SpaceMax Refrigerator",
        oldPrice: 1899.00,
        newPrice: 1749.00,
        active: true,
    },

    // Shipping Addresses (matching Image 2)
    addresses: [
        {
            id: "addr-1",
            name: "Alex Mercer",
            line1: "124 Industrial Way, Suite 300",
            city: "Neo Tokyo",
            postalCode: "NT 100-0001",
            country: "Japan",
            phone: "+81 (03) 555-0192",
            isDefault: true,
        },
        {
            id: "addr-2",
            name: "Alex Mercer (Work)",
            line1: "VORA HQ, Floor 12",
            city: "San Francisco",
            postalCode: "CA 94105",
            country: "United States",
            phone: "+1 (415) 555-0188",
            isDefault: false,
        },
    ],
    selectedAddressId: "addr-1",

    // Shipping Methods
    shippingMethods: [
        {
            id: "standard",
            name: "Standard Delivery",
            deliveryDate: "Oct 24 - Oct 26",
            price: 0,
            badge: "FREE",
        },
        {
            id: "express",
            name: "Express Dispatch",
            deliveryDate: "Oct 22 - Oct 23",
            price: 25.00,
            badge: "EXPRESS",
        },
    ],
    selectedShippingMethodId: "standard",

    // Payment Methods (matching Image 3)
    paymentMethod: "card", // card, wallet, paypal, wire
    cardDetails: {
        number: "4532 9012 3456 7890",
        name: "ALEX MERCER",
        expiry: "09 / 28",
        cvv: "842",
        saveCard: true,
        brand: "VISA",
    },
    billingSameAsShipping: true,
    differentBillingAddress: {
        name: "",
        line1: "",
        city: "",
        postalCode: "",
        country: "United States",
    },

    // Completed Order state (matching Image 5)
    lastOrder: {
        orderNumber: "#TS-88291",
        deliveryEstimate: "Thursday, Oct 26",
        email: "user@example.com",
    },

    // Getters & Calculations
    get totalItemsCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    get subtotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    get discount() {
        // Flat $150 promo discount as seen in Image 1
        return 150.00;
    },

    get shippingCost() {
        const method = this.shippingMethods.find((m) => m.id === this.selectedShippingMethodId);
        return method ? method.price : 0;
    },

    get estimatedTax() {
        // Calculated tax (~6.5% or fixed as per checkout designs)
        return (this.subtotal - this.discount) * 0.065;
    },

    get grandTotal() {
        const total = this.subtotal - this.discount + this.shippingCost;
        return total > 0 ? total : 0;
    },

    // Actions
    updateQuantity(id, qty) {
        const item = this.items.find((i) => i.id === id);
        if (item) {
            if (qty <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = qty;
            }
        }
    },

    removeItem(id) {
        this.items = this.items.filter((i) => i.id !== id);
    },

    saveForLater(id) {
        const item = this.items.find((i) => i.id === id);
        if (item) {
            this.savedForLater.push({ ...item });
            this.removeItem(id);
        }
    },

    moveToCart(id) {
        const item = this.savedForLater.find((i) => i.id === id);
        if (item) {
            this.items.push({ ...item });
            this.savedForLater = this.savedForLater.filter((i) => i.id !== id);
        }
    },

    addAddress(newAddr) {
        const id = "addr-" + Date.now();
        this.addresses.push({ id, ...newAddr, isDefault: false });
        this.selectedAddressId = id;
    },

    dismissPriceAlert() {
        this.priceAlert.active = false;
    },
});
