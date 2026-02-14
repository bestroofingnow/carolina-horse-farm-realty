"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Home,
  TreeDeciduous,
  Fence,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  Send,
  Loader2,
  ChevronRight,
} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  acreage: string;
  propertyType: string;
  numberOfStalls: string;
  hasArena: string;
  hasBarns: string;
  additionalDetails: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const valuationReasons = [
  {
    icon: DollarSign,
    title: "Accurate Pricing",
    description:
      "Equestrian properties require specialized knowledge to price correctly. Barns, arenas, and fencing add significant value that generic appraisals miss.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Get current market data for horse properties in your area, including recent sales of comparable equestrian estates.",
  },
  {
    icon: Shield,
    title: "Expert Assessment",
    description:
      "Our team evaluates equestrian-specific features — stall quality, arena footing, pasture condition, and water sources — that directly impact value.",
  },
];

export default function EstimateContent() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    city: "",
    state: "NC",
    zipCode: "",
    acreage: "",
    propertyType: "",
    numberOfStalls: "",
    hasArena: "",
    hasBarns: "",
    additionalDetails: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const webhookData = {
        formName: "Property Valuation Request",
        formSource: "Carolina Horse Farm Realty Website",
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        propertyAddress: formData.propertyAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        acreage: formData.acreage,
        propertyType: formData.propertyType,
        numberOfStalls: formData.numberOfStalls,
        hasArena: formData.hasArena,
        hasBarns: formData.hasBarns,
        additionalDetails: formData.additionalDetails,
      };

      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/OTLRU5jdjnOObaWbFyny/webhook-trigger/05419169-3e67-4ec5-8d8f-17c2a7358945",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookData),
        }
      );

      if (!response.ok) {
        throw new Error("Webhook submission failed");
      }

      setFormStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        city: "",
        state: "NC",
        zipCode: "",
        acreage: "",
        propertyType: "",
        numberOfStalls: "",
        hasArena: "",
        hasBarns: "",
        additionalDetails: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-forest-900">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 opacity-95" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Free Property Valuation
          </h1>
          <p className="text-xl md:text-2xl text-forest-200 max-w-3xl mx-auto mb-8">
            Find out what your equestrian property is worth with a complimentary
            market analysis from our horse farm specialists.
          </p>
          <div className="flex items-center justify-center gap-6 text-forest-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold-400" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold-400" />
              <span>Equestrian expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold-400" />
              <span>Local market data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Get a Valuation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-forest-900 text-center mb-4">
            Why Get a Professional Equestrian Property Valuation?
          </h2>
          <p className="text-forest-600 text-center max-w-2xl mx-auto mb-12">
            Horse properties are not like standard homes. Specialized features
            can add — or subtract — hundreds of thousands from your property value.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {valuationReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-cream-50 rounded-xl p-8 border border-forest-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mb-6">
                  <reason.icon className="w-7 h-7 text-gold-700" />
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-forest-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Form */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest-900 mb-4">
                Request Your Free Valuation
              </h2>
              <p className="text-forest-600 max-w-xl mx-auto">
                Tell us about your property and we will provide a complimentary
                market analysis within 48 hours.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="bg-white rounded-xl p-12 shadow-lg border border-forest-100 text-center">
                <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-forest-600" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-4">
                  Valuation Request Received!
                </h3>
                <p className="text-forest-600 mb-8 max-w-md mx-auto">
                  Thank you for your interest. Our equestrian property specialist
                  will review your details and reach out within 48 hours with your
                  complimentary market analysis.
                </p>
                <Link
                  href="/properties"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg"
                >
                  Browse Properties <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-forest-100"
              >
                {/* Contact Information */}
                <h3 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold-600" />
                  Your Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-forest-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-forest-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-forest-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>

                {/* Property Information */}
                <h3 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <Home className="w-5 h-5 text-gold-600" />
                  Property Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-forest-700 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      id="propertyAddress"
                      name="propertyAddress"
                      required
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-forest-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="City"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-forest-700 mb-2">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="select-field w-full"
                      >
                        <option value="NC">NC</option>
                        <option value="SC">SC</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-forest-700 mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="input-field w-full"
                        placeholder="28000"
                      />
                    </div>
                  </div>
                </div>

                {/* Equestrian Details */}
                <h3 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <Fence className="w-5 h-5 text-gold-600" />
                  Equestrian Features
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="acreage" className="block text-sm font-medium text-forest-700 mb-2">
                      Total Acreage
                    </label>
                    <input
                      type="text"
                      id="acreage"
                      name="acreage"
                      value={formData.acreage}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-forest-700 mb-2">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="select-field w-full"
                    >
                      <option value="">Select type...</option>
                      <option value="horse-farm">Horse Farm</option>
                      <option value="equestrian-estate">Equestrian Estate</option>
                      <option value="land">Land / Acreage</option>
                      <option value="hobby-farm">Hobby Farm</option>
                      <option value="boarding-facility">Boarding Facility</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="numberOfStalls" className="block text-sm font-medium text-forest-700 mb-2">
                      Number of Stalls
                    </label>
                    <input
                      type="text"
                      id="numberOfStalls"
                      name="numberOfStalls"
                      value={formData.numberOfStalls}
                      onChange={handleInputChange}
                      className="input-field w-full"
                      placeholder="e.g. 6"
                    />
                  </div>
                  <div>
                    <label htmlFor="hasArena" className="block text-sm font-medium text-forest-700 mb-2">
                      Riding Arena
                    </label>
                    <select
                      id="hasArena"
                      name="hasArena"
                      value={formData.hasArena}
                      onChange={handleInputChange}
                      className="select-field w-full"
                    >
                      <option value="">Select...</option>
                      <option value="indoor">Indoor Arena</option>
                      <option value="outdoor">Outdoor Arena</option>
                      <option value="both">Both Indoor & Outdoor</option>
                      <option value="none">No Arena</option>
                    </select>
                  </div>
                </div>

                <div className="mb-10">
                  <label htmlFor="additionalDetails" className="block text-sm font-medium text-forest-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="additionalDetails"
                    name="additionalDetails"
                    rows={4}
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Tell us about any other features: barns, pastures, fencing, water sources, recent improvements, etc."
                  />
                </div>

                {formStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700 text-sm">
                      Something went wrong. Please try again or call us at{" "}
                      <a href="tel:+17049293289" className="underline font-medium">
                        (704) 929-3289
                      </a>.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="btn-primary w-full py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Request Free Valuation
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prefer to Talk to Someone?
          </h2>
          <p className="text-forest-200 max-w-xl mx-auto mb-8">
            Our equestrian property specialists are happy to discuss your
            property over the phone. No pressure, just honest advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+17049293289"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold"
            >
              <Phone className="w-5 h-5" />
              (704) 929-3289
            </a>
            <Link
              href="/contact"
              className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-white border-white hover:bg-white hover:text-forest-900"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
