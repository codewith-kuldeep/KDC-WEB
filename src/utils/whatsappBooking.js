import { CLINIC_INFO } from "../data/clinicData.js";

/**
 * Normalize a phone number to digits only for WhatsApp APIs / wa.me links.
 * @param {string} [rawNumber]
 * @returns {string}
 */
export function normalizeWhatsAppNumber(rawNumber = CLINIC_INFO.phone) {
    return String(rawNumber || "").replace(/\D/g, "");
}

/**
 * Format all appointment booking details into a clean WhatsApp message.
 * @param {object} booking
 * @returns {string}
 */
export function formatBookingWhatsAppMessage(booking) {
    const fullName = `${booking.firstName?.trim() || ""} ${booking.lastName?.trim() || ""}`.trim();
    const complaint = booking.chiefComplaint ? .trim() || "Not provided";

    return [
            `*New Appointment Booking - ${CLINIC_INFO.name}*`,
            booking.bookingReference ? `*Booking Ref:* ${booking.bookingReference}` : null,
            "",
            "*1. Protocol & Setting*",
            `• Setting: ${booking.appointmentType || "In-Clinic Site"}`,
            `• Service: ${booking.serviceTitle || "Not selected"} (${booking.serviceDuration || ""})`,
            `• Doctor: ${booking.doctorName || "Not selected"}`,
            "",
            "*2. Date & Time*",
            `• Date: ${booking.selectedDate || "Not selected"}`,
            `• Time: ${booking.selectedTime || "Not selected"}`,
            "",
            "*3. Patient Profile & Symptoms*",
            `• Name: ${fullName}`,
            `• Mobile: ${booking.phone?.trim() || ""}`,
            `• Email: ${booking.email?.trim() || ""}`,
            `• Discomfort Level: ${booking.painLevel ?? 5} / 10`,
            `• Pain Movement / Activity: ${complaint}`,
            `• Recent MRI / X-Ray Reports: ${booking.hasImaging ? "Yes" : "No"}`,
            `• Previous Orthopedic/Spinal Surgery: ${booking.hasPriorSurgery ? "Yes" : "No"}`,
        ]
        .filter((line) => line !== null)
        .join("\n");
}

/**
 * Build a WhatsApp click-to-chat (wa.me) URL pre-filled with all booking details.
 * @param {object} booking
 * @param {string} [clinicPhone]
 * @returns {string}
 */
export function buildWhatsAppUrl(booking, clinicPhone = CLINIC_INFO.phone) {
    const number = normalizeWhatsAppNumber(clinicPhone);
    const text = encodeURIComponent(formatBookingWhatsAppMessage(booking));
    return `https://wa.me/${number}?text=${text}`;
}

/**
 * Send booking payload to the Vercel Serverless Function (/api/book-appointment)
 * for automatic background WhatsApp delivery.
 * @param {object} booking
 * @returns {Promise<object>}
 */
export async function submitBookingToWhatsAppApi(booking) {
    const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Automatic WhatsApp notification failed.");
    }

    return response.json();
}