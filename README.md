# SVC Internal Invoice System 🏗️
**Proprietary Billing Tool for SHRI VINAYAKA CONSTRUCTION AND INTERIOR DESIGNS**

This is a customized, high-performance invoice generation system built for the internal use of Shri Vinayaka Construction. It automates the creation of professional PDFs, tracks payments via Google Sheets, and facilitates quick WhatsApp reminders.

## 🚀 Key Features

- **Automated Calculations:** Handles subtotal, GST, and grand totals for construction and interior work items.
- **Google Sheets Integration:** Automatically logs every generated invoice (Number, Date, Client, Amount) to a central master sheet for payment tracking.
- **WhatsApp Reminders:** One-click integration to send payment notifications directly to clients via WhatsApp.
- **INR Formatting:** Optimized for Indian currency standards (₹ Lakhs/Crores formatting).
- **Print-Ready:** Perfectly formatted for A4 paper and PDF export.

## 🛠️ Technical Setup

### 1. Database (Google Sheets)
This application uses **Google Apps Script** as a backend bridge.
- The data is sent to a private Google Sheet.
- **Note:** Ensure your `app.js` contains the correct `GOOGLE_SCRIPT_URL` from your deployment.

### 2. Branding
- **Company Name:** SHRI VINAYAKA CONSTRUCTION AND INTERIOR DESIGNS
- **Location:** PEENYA INDUSTRIAL AREA, BANGLORE-560091
- **Assets:** The system uses `logo.png` for the header.

## 📖 Usage Guide

1. **Fill Details:** Enter the client information and work description.
2. **Generate:** Click **"Print & Save to Sheets"**. This will:
   - Open the browser print dialog (Save as PDF).
   - Silently send the record to your Google Sheet.
3. **Follow Up:** Use the **"Send WhatsApp Reminder"** button to message the client regarding the specific invoice and amount.

## 📂 File Structure

- `index.html`: The core structure and hardcoded business information.
- `styles.css`: Industrial-themed styling (Blueprint Blue & Gold).
- `app.js`: Logic for calculations, PDF generation, and Google Sheets API calls.
- `LICENSE`: MIT License.

## ⚖️ License

Copyright (c) 2025 Shivam Kumar S.
Licensed under the **MIT License**. 

---
*Built & Maintained by Shivam Kumar S.*