"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/actions";
import { Badge } from "@/components/ui/badge";

export function OrderStatusSelect({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        toast.success(`Order ${orderId.slice(0, 8)} status updated to ${newStatus}!`);
      } else {
        toast.error("Failed to update order status.");
        setStatus(initialStatus);
      }
    });
  };

  const getVariant = (st: string) => {
    if (st === "DELIVERED" || st === "PAID") return "default";
    if (st === "SHIPPED") return "secondary";
    if (st === "CANCELLED") return "destructive";
    return "outline";
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer"
      >
        <option value="PENDING">PENDING</option>
        <option value="PAID">PAID</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      {isPending && <span className="text-[10px] text-gray-400">Saving...</span>}
    </div>
  );
}
