import {
  formatBookingWhatsAppMessage,
  normalizeWhatsAppNumber,
} from "../src/utils/whatsappBooking.js";

/**
 * Send a WhatsApp text message using Meta WhatsApp Cloud API.
 * @param {string} message
 */
async function sendViaMetaCloudApi(message) {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = normalizeWhatsAppNumber(process.env.CLINIC_WHATSAPP_NUMBER);

  if (!token || !phoneNumberId || !recipient) {
    throw new Error("Missing Meta WhatsApp Cloud API environment variables.");
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipient,
      type: "text",
      text: { body: message },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Meta WhatsApp API error (${res.status}): ${errText}`);
  }
  return res.json();
}

/**
 * Send a WhatsApp message using Twilio WhatsApp API.
 * @param {string} message
 */
async function sendViaTwilio(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const recipient = normalizeWhatsAppNumber(process.env.CLINIC_WHATSAPP_NUMBER);

  if (!accountSid || !authToken || !from || !recipient) {
    throw new Error("Missing Twilio WhatsApp environment variables.");
  }

  const body = new URLSearchParams({
    From: from,
    To: `whatsapp:+${recipient}`,
    Body: message,
  });
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Twilio API error (${res.status}): ${errText}`);
  }
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const booking = req.body || {};
  if (
    !booking.firstName?.trim() ||
    !booking.lastName?.trim() ||
    !booking.email?.trim() ||
    !booking.phone?.trim()
  ) {
    return res.status(400).json({ error: "Patient contact fields are required." });
  }

  const message = formatBookingWhatsAppMessage(booking);
  const provider = (process.env.WHATSAPP_PROVIDER || "meta").toLowerCase();

  try {
    const result =
      provider === "twilio"
        ? await sendViaTwilio(message)
        : await sendViaMetaCloudApi(message);

    return res.status(200).json({ ok: true, provider, result });
  } catch (err) {
    console.error("WhatsApp notification failed:", err);
    return res.status(500).json({ error: err.message || "Could not send WhatsApp notification." });
  }
}
