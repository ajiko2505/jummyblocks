import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = mounted ? items.reduce((s, i) => s + i.quantity, 0) : 0;
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "NGN";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button aria-label="Open cart" className="relative grid h-9 w-9 place-items-center rounded-sm border hover:bg-secondary">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-safety px-1 font-mono text-[10px] font-bold text-safety-foreground">{totalItems}</span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>{totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center text-center text-muted-foreground">
            <div><ShoppingCart className="mx-auto mb-3 h-10 w-10" />Add products from the catalogue.</div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4">
              {items.map((item) => {
                const img = item.product.node.images?.edges?.[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-3 border-b pb-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                      {img && <img src={img.url} alt={item.product.node.title} className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold">{item.product.node.title}</h4>
                      {item.variantTitle !== "Default Title" && <p className="text-sm text-muted-foreground">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>}
                      <p className="font-mono text-sm font-bold">{formatMoney(item.price.amount, item.price.currencyCode)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button aria-label="Remove" onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-foreground"><Trash2 className="h-4 w-4" /></button>
                      <div className="flex items-center gap-1">
                        <button aria-label="Decrease" onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-sm border"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                        <button aria-label="Increase" onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-sm border"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4 border-t p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-mono text-xl font-bold">{formatMoney(totalPrice, currency)}</span>
              </div>
              <button onClick={handleCheckout} disabled={isLoading || isSyncing} className="flex w-full items-center justify-center gap-2 rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85 disabled:opacity-60">
                {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="h-4 w-4" />Checkout & pay</>}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
