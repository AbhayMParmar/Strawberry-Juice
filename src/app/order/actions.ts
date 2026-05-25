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
  const quantity = parseInt(formData.get("quantity") as string) || 1;
<<<<<<< HEAD
  const price = parseFloat(formData.get("price") as string) || 150.00;
  const totalAmount = Math.round(quantity * price * 100); // Amount in paise
=======
  const totalAmount = quantity * 2.00 * 100; // Amount in paise
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270

  const options = {
    amount: totalAmount,
    currency: "INR",
    receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return { orderId: order.id, amount: options.amount, currency: options.currency };
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    throw new Error(error.message);
  }
}

export async function placeOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const quantity = parseInt(formData.get("quantity") as string) || 1;
<<<<<<< HEAD
  const price = parseFloat(formData.get("price") as string) || 150.00;
  const productName = (formData.get("productName") as string) || "Original Strawberry Blend";
  const edition = (formData.get("edition") as string) || "Genesis Edition";
  const total = quantity * price;
  const details = `${quantity} x ${productName} (${edition})`;
=======
  const total = quantity * 2.00; // pricePerBottle is 2.00
  const details = `${quantity} x Premium Strawberry Blend`;
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270

  const { error } = await supabase.from("orders").insert({
    user_id: user.id,
    total: total,
    items_count: quantity,
    details: details,
    status: 'PAID'
  });

  if (error) {
    console.error("Failed to place order:", error);
    throw new Error(error.message);
  }

  revalidatePath('/account');
  return { success: true };
}
