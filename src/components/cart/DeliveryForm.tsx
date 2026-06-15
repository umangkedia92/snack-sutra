"use client";

import { useState, FormEvent } from "react";
import { DeliveryDetails } from "@/types";
import { DELIVERY_TIMINGS } from "@/lib/constants";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface DeliveryFormProps {
  onSubmit: (details: DeliveryDetails) => void;
  disabled: boolean;
}

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
}

export default function DeliveryForm({ onSubmit, disabled }: DeliveryFormProps) {
  const [form, setForm] = useState<DeliveryDetails>({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryNotes: "",
    preferredTiming: DELIVERY_TIMINGS[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.customerName.trim()) {
      errs.customerName = "Name is required";
    }
    if (!form.customerPhone.trim()) {
      errs.customerPhone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.customerPhone.trim())) {
      errs.customerPhone = "Enter a valid 10-digit phone number";
    }
    if (!form.deliveryAddress.trim()) {
      errs.deliveryAddress = "Delivery address is required";
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (
    field: keyof DeliveryDetails,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(validate());
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({
      customerName: true,
      customerPhone: true,
      deliveryAddress: true,
    });
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-heading text-xl text-brand-700 mb-4">
        Delivery Details
      </h2>

      <Input
        label="Customer Name"
        placeholder="Your full name"
        value={form.customerName}
        onChange={(e) => handleChange("customerName", e.target.value)}
        onBlur={() => handleBlur("customerName")}
        error={touched.customerName ? errors.customerName : undefined}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="10-digit mobile number"
        value={form.customerPhone}
        onChange={(e) => handleChange("customerPhone", e.target.value)}
        onBlur={() => handleBlur("customerPhone")}
        error={touched.customerPhone ? errors.customerPhone : undefined}
        required
      />

      <Input
        as="textarea"
        label="Delivery Address"
        placeholder="Full delivery address with landmark"
        value={form.deliveryAddress}
        onChange={(e) => handleChange("deliveryAddress", e.target.value)}
        onBlur={() => handleBlur("deliveryAddress")}
        error={touched.deliveryAddress ? errors.deliveryAddress : undefined}
        required
      />

      <Input
        label="Delivery Notes"
        placeholder="Any special instructions (optional)"
        value={form.deliveryNotes}
        onChange={(e) => handleChange("deliveryNotes", e.target.value)}
      />

      <Input
        as="select"
        label="Preferred Timing"
        value={form.preferredTiming}
        onChange={(e) => handleChange("preferredTiming", e.target.value)}
      >
        {DELIVERY_TIMINGS.map((timing) => (
          <option key={timing} value={timing}>
            {timing}
          </option>
        ))}
      </Input>

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        disabled={disabled}
        className="w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Confirm &amp; Order via WhatsApp
      </Button>
    </form>
  );
}
