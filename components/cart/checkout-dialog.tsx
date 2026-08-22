"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/components/cart-provider";
import { processOrder } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CheckoutDialog({
  trigger,
}: {
  trigger?: React.ReactElement;
}) {
  const router = useRouter();
  const { cart, cartSubtotal, discountAmount, deliveryFee, cartTotal, promoCode, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    address: "123 Fashion Avenue, Suite 4B",
    city: "New York",
    postal: "10001",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    startTransition(async () => {
      const payload = {
        items: cart.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
          size: i.size,
          color: i.color,
          name: i.name,
          image: i.image,
        })),
        shippingName: formData.name,
        shippingEmail: formData.email,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingPostal: formData.postal,
        shippingCountry: formData.country,
        paymentMethod:
          formData.paymentMethod === "card"
            ? `Credit Card (${formData.cardNumber.slice(-4)})`
            : formData.paymentMethod.toUpperCase(),
        subtotal: cartSubtotal,
        discountAmount,
        deliveryFee,
        totalAmount: cartTotal,
        promoCode: promoCode || undefined,
      };

      const res = await processOrder(payload);

      if (res.success && res.orderId) {
        clearCart();
        setOpen(false);
        toast.success("Order confirmed! Redirecting to receipt...");
        router.push(`/order/success/${res.orderId}`);
      } else {
        toast.error(res.error || "Failed to process payment. Please try again.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger || (
            <button
              type="button"
              disabled={cart.length === 0}
              className="inline-flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-medium text-white transition hover:bg-black/90 disabled:opacity-50 cursor-pointer shadow-md"
            >
              <span>Go to Checkout</span>
              <span aria-hidden="true">→</span>
            </button>
          )
        }
      />
      <DialogContent className="sm:max-w-[580px] p-6 sm:p-8 bg-white rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center gap-2 text-black/60 text-xs font-semibold uppercase tracking-wider">
            <Lock className="size-3.5" />
            <span>Secure 256-Bit Encrypted Checkout</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold font-heading text-black">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handlePlaceOrder} className="space-y-6 pt-4">
          {/* Shipping Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <Truck className="size-4" />
              1. Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name" className="text-xs text-black/60">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-black/60">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-xs text-black/60">Street Address</Label>
              <Input
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="city" className="text-xs text-black/60">City</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
                />
              </div>
              <div>
                <Label htmlFor="postal" className="text-xs text-black/60">Postal Code</Label>
                <Input
                  id="postal"
                  name="postal"
                  required
                  value={formData.postal}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-xs text-black/60">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-black/10" />

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <CreditCard className="size-4" />
              2. Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "card", label: "Credit Card" },
                { id: "applepay", label: "Apple Pay" },
                { id: "paypal", label: "PayPal" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    formData.paymentMethod === p.id
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/70 hover:bg-black/5"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {formData.paymentMethod === "card" && (
              <div className="rounded-2xl border border-black/10 p-4 bg-[#F9F9F9] space-y-3 mt-2">
                <div>
                  <Label htmlFor="cardNumber" className="text-xs text-black/60">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="mt-1 h-10 rounded-xl bg-white border-black/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardExpiry" className="text-xs text-black/60">Expires</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="mt-1 h-10 rounded-xl bg-white border-black/10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvc" className="text-xs text-black/60">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="mt-1 h-10 rounded-xl bg-white border-black/10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator className="bg-black/10" />

          {/* Price Summary */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-black/60">
              <span>Subtotal ({cart.length} items)</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#ff3333] font-medium">
                <span>Discount ({promoCode})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-black/60">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-extrabold text-black pt-2 border-t border-black/10">
              <span>Total Amount</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <Button
            type="submit"
            disabled={isPending || cart.length === 0}
            className="w-full h-14 rounded-full bg-black text-white text-base font-bold hover:bg-black/90 cursor-pointer shadow-lg"
          >
            {isPending ? "Authorizing Payment..." : `Pay $${cartTotal.toFixed(2)} & Place Order`}
          </Button>

          <div className="flex items-center justify-center gap-1 text-xs text-black/40 text-center">
            <ShieldCheck className="size-4 text-green-600" />
            <span>Simulated Local Sandbox Payment • No real charge</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
