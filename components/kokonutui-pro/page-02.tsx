"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingCart, Grid, List } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
    id: string;
    code: string;
    name: string;
    price: number;
    image: string;
    color: string;
    sizes: string[];
}

const products: Product[] = [
    {
        id: "1",
        code: "Frutos Secos",
        name: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
        price: 45000,
        image: "https://images.unsplash.com/photo-1579783902915-f0b0de2c2eb3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "White",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "2",
        code: "Pueblo Mágico",
        name: "by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
        price: 85900,
        image: "https://images.unsplash.com/photo-1532479255663-1ded0438a701?q=80&w=818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "Gray",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "3",
        code: "Colina en Chiapas",
        name: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        price: 95000,
        image: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=856&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "White",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "4",
        code: "Angeles en el Cielo",
        name: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        price: 12000000,
        image: "https://images.unsplash.com/photo-1556005693-00fff02f134c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "Gray",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "5",
        code: "Centro de Monterrey",
        name: "Donate: If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bil",
        price: 65000,
        image: "https://images.unsplash.com/photo-1579762593131-b8945254345c?q=80&w=954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "White",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "6",
        code: "Piedars y Monolitos",
        name: "The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from",
        price: 75850,
        image: "https://images.unsplash.com/photo-1579541591970-e5780dc6b31f?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color: "Gray",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
];

interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface HeaderProps {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    cartLength: number;
    onCartOpen: () => void;
}

interface ProductGridProps {
    viewMode: "grid" | "list";
    products: Product[];
    onProductSelect: (product: Product) => void;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    selectedSize: string;
    setSelectedSize: (size: string) => void;
    onAddToCart: (product: Product, size: string) => void;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onRemoveFromCart: (productId: string) => void;
}

function Header({
    viewMode,
    setViewMode,
    cartLength,
    onCartOpen,
}: HeaderProps) {
    return (
        <header className="w-full top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            <div className="container mx-auto px-6">
                <div className="h-14 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-xs tracking-[0.2em] uppercase">
                        Collection - Riquiza Rupestre
                    </span>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                        <button
                            type="button"
                            className="flex items-center space-x-2 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300"
                            onClick={onCartOpen}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </motion.div>
                            <span className="text-xs">({cartLength})</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

function ProductGrid({
    viewMode,
    products,
    onProductSelect,
}: ProductGridProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
                viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6"
            }
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    layoutId={`product-${product.id}`}
                    className={`cursor-pointer ${viewMode === "list" ? "flex gap-6 bg-zinc-50 dark:bg-zinc-900 p-4" : ""}`}
                    onClick={() => onProductSelect(product)}
                >
                    <div
                        className={`${
                            viewMode === "grid" ? "aspect-3/4" : "w-32 h-32"
                        } bg-zinc-50 dark:bg-zinc-900 relative group`}
                    >
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:blur-xs transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 dark:bg-white/40">
                            <p className="text-sm tracking-widest bg-white/95 dark:bg-black/95 px-4 py-2 rounded-full">
                                {product.code}
                            </p>
                        </div>
                    </div>
                    {viewMode === "list" && (
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-xs tracking-widest mb-1">
                                {product.code}
                            </p>
                            <h3 className="text-sm font-medium mb-1">
                                {product.name}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                ${product.price}
                            </p>
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}

function ProductModal({
    product,
    onClose,
    selectedSize,
    setSelectedSize,
    onAddToCart,
}: ProductModalProps) {
    if (!product) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black"
                onClick={onClose}
            />
            <motion.div
                layoutId={`product-${product.id}`}
                className="fixed inset-4 md:inset-[10%] lg:inset-[15%] z-50 bg-white dark:bg-black p-4 md:p-6 overflow-y-auto"
            >
                <div className="h-full flex flex-col md:flex-row gap-6 md:gap-8">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-1/2 h-[50vh] md:h-auto object-cover object-center bg-zinc-50 dark:bg-zinc-900"
                    />
                    <div className="flex-1 flex flex-col min-h-[50vh] md:min-h-0">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-xs tracking-widest mb-2">
                                    {product.code}
                                </p>
                                <h2 className="text-lg">{product.name}</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    {product.color}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-xs"
                            >
                                Close
                            </button>
                        </div>
                        <div className="mt-auto">
                            <div className="flex flex-col space-y-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        ${product.price}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            type="button"
                                            key={size}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                            className={`px-3 py-1.5 text-xs border rounded-lg transition-colors
                                                ${
                                                    selectedSize === size
                                                        ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent"
                                                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                disabled={!selectedSize}
                                onClick={() => {
                                    onAddToCart(product, selectedSize);
                                    onClose();
                                    setSelectedSize("");
                                }}
                                className="w-full py-3 bg-zinc-900 text-white dark:bg-white dark:text-black text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {selectedSize ? "Add to Cart" : "Select a Size"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

function CartSidebar({
    isOpen,
    onClose,
    cart,
    onRemoveFromCart,
}: CartSidebarProps) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black"
                onClick={onClose}
            />
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="fixed right-0 top-0 h-full w-full md:w-90 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-xl border-l border-zinc-200 dark:border-zinc-800 p-6"
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs tracking-widest uppercase">
                            Cart
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-xs"
                        >
                            Close
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Vacío - No hay Articulos seleccionados
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 py-4 border-b border-zinc-100 dark:border-zinc-900"
                                    >
                                        <div className="w-24 h-32 bg-zinc-50 dark:bg-zinc-900">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs tracking-widest mb-1">
                                                        {item.code}
                                                    </p>
                                                    <h3 className="text-sm mb-2">
                                                        {item.name.substring(0,50)}
                                                    </h3>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                                        Size:{" "}
                                                        {item.selectedSize}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onRemoveFromCart(
                                                            item.id
                                                        )
                                                    }
                                                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">
                                                    ${item.price}
                                                </span>
                                                <span className="text-xs">
                                                    Qty: {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                                <button
                                    type="button"
                                    className="w-full py-3 bg-zinc-900 text-white dark:bg-white dark:text-black text-xs tracking-widest"
                                >
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
}

export default function MinimalStore() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const addToCart = (product: Product, size: string) => {
        setCart((prev) => {
            const exists = prev.find(
                (item) => item.id === product.id && item.selectedSize === size
            );
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, selectedSize: size }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-['Neue_Montreal',sans-serif]">
            <Header
                viewMode={viewMode}
                setViewMode={setViewMode}
                cartLength={cart.length}
                onCartOpen={() => setIsCartOpen(true)}
            />

            <main className="container mx-auto px-6 pt-20 pb-16">
                <ProductGrid
                    viewMode={viewMode}
                    products={products}
                    onProductSelect={setSelectedProduct}
                />
            </main>

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        onAddToCart={(product, size) => {
                            addToCart(product, size);
                            setSelectedProduct(null);
                            setSelectedSize("");
                            setIsCartOpen(true);
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCartOpen && (
                    <CartSidebar
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                        cart={cart}
                        onRemoveFromCart={removeFromCart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
