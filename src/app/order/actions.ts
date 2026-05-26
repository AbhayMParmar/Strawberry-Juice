"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Slnt2aieOZXUo8",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "oo8dWXCfOqnAYbSZisF8WFgR",
});

export async function createRazorpayOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Parse fields supporting both single product checkout and multi-product cart checkout
  const total = parseFloat(formData.get("total") as string) || 
                (parseInt(formData.get("quantity") as string) || 1) * (parseFloat(formData.get("price") as string) || 150.00);
  const itemsCount = parseInt(formData.get("items_count") as string) || 
                      parseInt(formData.get("quantity") as string) || 1;
  const details = (formData.get("details") as string) || 
                  `${parseInt(formData.get("quantity") as string) || 1} x ${formData.get("productName") || "Original Strawberry Blend"} (${formData.get("edition") || "Genesis Edition"})`;

  // Store the pending order in the database immediately
  const { data: dbOrder, error: dbError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total: total,
      items_count: itemsCount,
      details: details,
      status: "PENDING",
    })
    .select()
    .single();

  if (dbError) {
    console.error("Error creating pending order:", dbError);
    throw new Error(dbError.message);
  }

  const totalAmount = Math.round(total * 100); // Amount in paise

  const options = {
    amount: totalAmount,
    currency: "INR",
    receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return { 
      orderId: order.id, 
      dbOrderId: dbOrder.id, 
      amount: options.amount, 
      currency: options.currency 
    };
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    throw new Error(error.message);
  }
}

export async function confirmPayment(dbOrderId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: "PAID" })
    .eq("id", dbOrderId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to confirm payment:", error);
    throw new Error(error.message);
  }

  revalidatePath("/account");
  return { success: true };
}
