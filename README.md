# Bulk Mail Sender — Frontend Only

A production-ready Bulk Mail Application built with **React (Vite)** + **EmailJS**. No backend needed — works 100% from the browser and deploys perfectly on Vercel.

## Features

- **Bulk Email Sending**: Send to up to 500 recipients via EmailJS (no server required).
- **Smart Validation**: Parses comma, space, or newline-separated emails. Deduplicates, trims, and validates format.
- **Sequential Sending**: Each email sent one by one for reliability.
- **Detailed Results**: Shows total, sent, failed counts and a list of failed addresses.
- **Modern UI**: Premium glassmorphism design with gradients, animations, and full mobile responsiveness.

---

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── EmailForm.jsx
│   │   ├── ResultDisplay.jsx
│   │   └── Spinner.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
└── package.json
```

---

## Setup EmailJS (Required)

1. Go to [https://www.emailjs.com](https://www.emailjs.com) and create a free account.
2. **Add an Email Service**: Connect your Gmail account under **Email Services**.
3. **Create an Email Template**: Go to **Email Templates** → **Create New Template**.
   - Set **To Email** field to: `{{to_email}}`
   - Set **Subject** to: `{{subject}}`
   - Set **Content/Body** to: `{{message}}`
   - Save the template and note the **Template ID**.
4. Go to **Account** → **General** to find your **Public Key**.

---

## Installation & Local Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Run locally:
```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Deploy on Vercel

1. Push this repository to GitHub.
2. Go to [https://vercel.com](https://vercel.com) → **New Project**.
3. Import your GitHub repository.
4. Set **Root Directory** to `frontend`.
5. Set **Framework Preset** to `Vite`.
6. Add Environment Variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
7. Click **Deploy**. Done! ✅

---

## Future Improvements

- Support HTML/rich text email body.
- Show per-email send progress bar.
- Add CSV file upload for recipient list.
- Add email scheduling support.
