"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface CartItem {
  id: number;
  name: string;
  ref: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

type CardType = "mastercard" | "visa" | "verve";

// ── Initial cart data ──────────────────────────────────────────────────────────
const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Denim T-Shirt",
    ref: "007197456",
    color: "Blue",
    quantity: 2,
    price: 3750,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Denim Pants",
    ref: "011015233",
    color: "Blue",
    quantity: 3,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    name: "Sony Smartwatch",
    ref: "004822981",
    color: "Black",
    quantity: 1,
    price: 24500,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
  },
  {
    id: 4,
    name: "Cognac Oxford",
    ref: "035772962",
    color: "Brown",
    quantity: 1,
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=80&h=80&fit=crop",
  },
];

// ── Card type logos ────────────────────────────────────────────────────────────
function MastercardLogo({ active }: { active: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-14 h-9 rounded-md transition-all duration-200 ${
        active ? "opacity-100 scale-110" : "opacity-40"
      }`}
    >
      <div className="relative flex">
        <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
        <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90 -ml-3" />
      </div>
    </div>
  );
}

function VisaLogo({ active }: { active: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-14 h-9 rounded-md transition-all duration-200 ${
        active ? "opacity-100 scale-110" : "opacity-40"
      }`}
    >
      <span className="text-blue-400 font-black text-xl italic tracking-tight">
        VISA
      </span>
    </div>
  );
}

function VerveLogo({ active }: { active: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-14 h-9 rounded-md transition-all duration-200 ${
        active ? "opacity-100 scale-110" : "opacity-40"
      }`}
    >
      <span className="text-orange-400 font-black text-sm tracking-widest uppercase">
        Verve
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [selectedCard, setSelectedCard] = useState<CardType>("mastercard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // ── Handlers ────────────────────────────────────────────────────────────────
  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Card number formatter
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  // Expiry formatter
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    /*
     * ROOT — flex en mobile (columna), grid en lg (2 columnas fijas)
     * Cubre TODOS los conceptos de Tailwind pedidos:
     * Grid, Flex, Posicionamiento, Responsive, Espaciado, Colores, Tipografía
     */
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* ── GRID principal: 1 col en mobile → 2 cols en lg ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen">

        {/* ════════════════════════════════════════════════════
            PANEL IZQUIERDO — Carrito
        ════════════════════════════════════════════════════ */}
        <div className="flex flex-col px-6 py-8 sm:px-10 md:px-16 lg:px-20 xl:px-28">

          {/* Header — FLEX + espaciado */}
          <div className="flex items-center gap-4 mb-10">
            {/* Logo "Q" — posicionamiento relativo */}
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="text-3xl font-black text-gray-800 leading-none">
                Q
              </span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-yellow-400" />
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <h1 className="text-2xl sm:text-3xl font-light text-gray-700 tracking-wide">
              Your Shopping Cart
            </h1>
          </div>

          {/* ── Lista de productos — FLEX COLUMN + gap ── */}
          <div className="flex flex-col gap-3 flex-1">
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 py-20 text-gray-400">
                <span className="text-5xl mb-4">🛒</span>
                <p className="text-lg">Tu carrito está vacío</p>
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                /* FLEX ROW en sm+ — GRID en xs para apilar */
                className="grid grid-cols-[64px_1fr] sm:flex sm:flex-row sm:items-center
                           gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm
                           hover:shadow-md transition-shadow duration-200 group"
              >
                {/* Imagen — posición relativa */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Nombre + ref */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Ref. {item.ref}
                  </p>
                </div>

                {/* Color — oculto en xs, visible en sm */}
                <span className="hidden sm:inline text-sm text-gray-500 w-16 text-center">
                  {item.color}
                </span>

                {/* Controles de cantidad — FLEX + gap */}
                <div className="flex flex-col items-center gap-1 col-span-1 sm:col-span-auto">
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-gray-400 hover:bg-yellow-500
                               text-white text-xs font-bold flex items-center justify-center
                               transition-colors duration-150 active:scale-95"
                  >
                    +
                  </button>
                  <span className="text-sm font-semibold text-gray-700 w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-gray-400 hover:bg-yellow-500
                               text-white text-xs font-bold flex items-center justify-center
                               transition-colors duration-150 active:scale-95"
                  >
                    −
                  </button>
                </div>

                {/* Precio */}
                <span className="text-sm sm:text-base font-semibold text-gray-700 w-32 text-right">
                  {(item.price * item.quantity).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  NGN
                </span>

                {/* Eliminar — posicionamiento absoluto en hover */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-400 text-lg font-light
                             transition-colors duration-150 flex-shrink-0 ml-1"
                  aria-label="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* ── Footer del carrito — FLEX BETWEEN + spacing ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                          mt-8 pt-6 border-t border-gray-200 gap-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800
                                text-sm font-medium transition-colors duration-150 group">
              <span className="group-hover:-translate-x-1 transition-transform duration-150">
                ←
              </span>
              Back to Shop
            </button>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Subtotal:</span>
              <span className="text-xl font-bold text-gray-800">
                {subtotal.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}{" "}
                NGN
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            PANEL DERECHO — Card Details (fondo oscuro)
        ════════════════════════════════════════════════════ */}
        <div className="relative flex flex-col bg-[#2c2a24] text-white">

          {/* Indicadores de paso — POSICIONAMIENTO ABSOLUTO */}
          <div className="absolute left-0 top-1/3 -translate-y-1/2 flex flex-col gap-2 pl-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === 1
                    ? "bg-yellow-400 scale-125"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Contenido del panel — FLEX COLUMN + padding */}
          <div className="flex flex-col flex-1 px-10 pt-16 pb-0">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-10 tracking-wide">
              Card Details
            </h2>

            {/* Select Card Type — FLEX ROW + gap */}
            <div className="mb-8">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-medium">
                Select Card Type
              </p>
              <div className="flex items-center gap-6">
                <button onClick={() => setSelectedCard("mastercard")}>
                  <MastercardLogo active={selectedCard === "mastercard"} />
                </button>
                <button onClick={() => setSelectedCard("visa")}>
                  <VisaLogo active={selectedCard === "visa"} />
                </button>
                <button onClick={() => setSelectedCard("verve")}>
                  <VerveLogo active={selectedCard === "verve"} />
                </button>
              </div>
            </div>

            {/* Card Number — input con borde inferior */}
            <div className="mb-8">
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-3 font-medium">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                placeholder="0000 0000 0000 0000"
                className="w-full bg-transparent border-b border-gray-600
                           focus:border-yellow-400 outline-none text-white
                           text-base tracking-widest pb-2 placeholder-gray-700
                           transition-colors duration-200"
              />
            </div>

            {/* Expiry + CVV — GRID 2 COLUMNAS */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-3 font-medium">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM / YY"
                  className="w-full bg-transparent border-b border-gray-600
                             focus:border-yellow-400 outline-none text-white
                             text-base tracking-widest pb-2 placeholder-gray-700
                             transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-3 font-medium">
                  CVV
                </label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="•••"
                  className="w-full bg-transparent border-b border-gray-600
                             focus:border-yellow-400 outline-none text-white
                             text-base tracking-widest pb-2 placeholder-gray-700
                             transition-colors duration-200"
                />
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />
          </div>

          {/* ── Checkout button — anclado al fondo ── */}
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500
                       text-gray-900 font-bold text-lg py-6
                       tracking-widest uppercase
                       transition-colors duration-200
                       mt-auto"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}