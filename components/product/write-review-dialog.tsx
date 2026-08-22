"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { addReview } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function WriteReviewDialog({
  productId,
  productName,
  onReviewAdded,
}: {
  productId: string;
  productName: string;
  onReviewAdded?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please provide both your name and a review comment.");
      return;
    }

    setLoading(true);
    try {
      const res = await addReview({
        productId,
        userName: name,
        rating,
        comment,
      });

      if (res.success) {
        toast.success("Thank you! Your verified review has been published.");
        setName("");
        setComment("");
        setRating(5);
        setOpen(false);
        if (onReviewAdded) onReviewAdded();
      } else {
        toast.error(res.error || "Failed to submit review");
      }
    } catch (e) {
      toast.error("An error occurred while submitting your review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90 cursor-pointer"
          >
            Write a Review
          </button>
        }
      />
      <DialogContent className="sm:max-w-[480px] p-6 bg-white rounded-2xl">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-2xl font-bold font-heading">Write a Review</DialogTitle>
          <p className="text-sm text-black/60">Share your thoughts on {productName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Star Rating Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Your Overall Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition hover:scale-115"
                >
                  <Star
                    className={`size-7 ${
                      (hoverRating || rating) >= star
                        ? "fill-[#FFC633] text-[#FFC633]"
                        : "text-black/20"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-black">{rating} / 5 Stars</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="reviewer-name" className="text-sm font-medium text-black">
              Your Name
            </label>
            <Input
              id="reviewer-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="h-11 rounded-xl bg-[#F0F0F0] border-0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reviewer-comment" className="text-sm font-medium text-black">
              Review Details
            </label>
            <Textarea
              id="reviewer-comment"
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about the fit, material, and quality?"
              className="rounded-xl bg-[#F0F0F0] border-0 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full h-11 bg-black text-white hover:bg-black/90"
            >
              {loading ? "Submitting..." : "Post Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
