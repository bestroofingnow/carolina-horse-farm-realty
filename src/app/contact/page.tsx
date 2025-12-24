"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyInterest: string;
  preferredContact: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const propertyInterestOptions = [
  { value: "", label: "Select an option" },
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Both" },
  { value: "browsing", label: "Just Browsing" },
];

const faqs = [
  {
    question: "What makes Carolina Horse Farm Realty different from other realtors?",
    answer:
      "We specialize exclusively in equestrian properties. Our team has hands-on experience with horses and understands the unique requirements of equestrian facilities, from proper barn construction to pasture management, fencing, and arena specifications. This expertise ensures you get a property that truly meets your equestrian needs.",
  },
  {
    question: "Do I need to have horses to buy an equestrian property?",
    answer:
      "Not at all! Many of our clients purchase equestrian properties as lifestyle investments, for future horse ownership, or simply for the privacy and acreage these properties offer. We can help you understand the maintenance requirements and potential of any property, whether you plan to house horses immediately or in the future.",
  },
  {
    question: "What should I look for when buying a horse farm?",
    answer:
      "Key factors include adequate pasture acreage per horse, quality of fencing, barn construction and ventilation, water sources, soil drainage, access to trails or riding facilities, and local zoning regulations. We guide you through all these considerations and more during your property search.",
  },
  {
    question: "Can you help me sell my equestrian property?",
    answer:
      "Absolutely! We have extensive experience marketing equestrian properties to qualified buyers. We understand how to highlight the features that matter most to horse owners and can connect your property with our network of serious equestrian buyers throughout the Charlotte Metro area.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyInterest: "",
    preferredContact: "email",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredContact: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Send to Go High Level webhook
      const webhookData = {
        // Form source
        formName: "Contact Page Form",
        formSource: "Carolina Horse Farm Realty Website",
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",

        // Contact information
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,

        // Form-specific fields
        propertyInterest: formData.propertyInterest,
        preferredContact: formData.preferredContact,
        message: formData.message,
      };

      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/OTLRU5jdjnOObaWbFyny/webhook-trigger/05419169-3e67-4ec5-8d8f-17c2a7358945",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        propertyInterest: "",
        preferredContact: "email",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://blog.carolinahorsefarmrealty.com/wp-content/uploads/2025/12/Untitled-design-4.gif"
            alt="Get in Touch with Carolina Horse Farm Realty"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-forest-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-3xl mx-auto">
            Whether you are looking to buy your dream equestrian property or sell your horse farm,
            our team of specialists is here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-cream-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-forest-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-forest-900">Send Us a Message</h2>
                    <p className="text-forest-600">We typically respond within 24 hours</p>
                  </div>
                </div>

                {/* Success Message */}
                {formStatus === "success" && (
                  <div className="mb-6 p-4 bg-forest-50 border border-forest-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-forest-900">Message Sent Successfully!</h3>
                      <p className="text-forest-700 text-sm">
                        Thank you for reaching out. One of our equestrian property specialists will
                        contact you shortly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {formStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900">Something went wrong</h3>
                      <p className="text-red-700 text-sm">
                        We could not send your message. Please try again or contact us directly by phone.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-forest-700 mb-2"
                      >
                        First Name <span className="text-saddle-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-forest-700 mb-2"
                      >
                        Last Name <span className="text-saddle-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-forest-700 mb-2"
                      >
                        Email <span className="text-saddle-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-forest-700 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="(704) 555-0123"
                      />
                    </div>
                  </div>

                  {/* Property Interest */}
                  <div>
                    <label
                      htmlFor="propertyInterest"
                      className="block text-sm font-medium text-forest-700 mb-2"
                    >
                      Property Interest <span className="text-saddle-600">*</span>
                    </label>
                    <select
                      id="propertyInterest"
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleInputChange}
                      required
                      className="select-field"
                    >
                      {propertyInterestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={() => handleRadioChange("email")}
                          className="w-4 h-4 text-forest-600 border-forest-300 focus:ring-forest-500"
                        />
                        <span className="text-forest-700">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={() => handleRadioChange("phone")}
                          className="w-4 h-4 text-forest-600 border-forest-300 focus:ring-forest-500"
                        />
                        <span className="text-forest-700">Phone</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-forest-700 mb-2"
                    >
                      Message <span className="text-saddle-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us about your equestrian property needs..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Panel */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl shadow-lg border border-cream-200 p-6">
                <h2 className="text-xl font-bold text-forest-900 mb-6">Contact Information</h2>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="text-sm text-forest-600 mb-1">Phone</p>
                      <a
                        href="tel:+17045550123"
                        className="text-forest-900 font-semibold hover:text-saddle-600 transition-colors"
                      >
                        (704) 555-0123
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="text-sm text-forest-600 mb-1">Email</p>
                      <a
                        href="mailto:info@carolinahorsefarmrealty.com"
                        className="text-forest-900 font-semibold hover:text-saddle-600 transition-colors break-all"
                      >
                        info@carolinahorsefarmrealty.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="text-sm text-forest-600 mb-1">Office Address</p>
                      <p className="text-forest-900 font-semibold">
                        123 Equestrian Way<br />
                        Suite 200<br />
                        Charlotte, NC 28277
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="text-sm text-forest-600 mb-1">Office Hours</p>
                      <div className="text-forest-900 font-semibold space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-forest-100 to-forest-200 flex flex-col items-center justify-center p-6">
                  <MapPin className="w-12 h-12 text-forest-400 mb-4" />
                  <p className="text-forest-700 font-semibold text-lg">Map Coming Soon</p>
                  <p className="text-forest-500 text-sm text-center mt-2">
                    Interactive map with directions to our office
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-forest-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Common questions about working with an equestrian property specialist
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-cream-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-cream-50 transition-colors"
                >
                  <span className="font-semibold text-forest-900 pr-4">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-forest-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-forest-600 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-forest-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Equestrian Journey?
          </h2>
          <p className="text-xl text-cream-200 mb-8 max-w-2xl mx-auto">
            Our team is passionate about connecting horse lovers with their perfect property.
            Let us put our expertise to work for you.
          </p>
          <a
            href="tel:+17045550123"
            className="inline-flex items-center gap-3 btn-secondary text-lg px-8 py-4"
          >
            <Phone className="w-5 h-5" />
            Call (704) 555-0123
          </a>
        </div>
      </section>
    </div>
  );
}
