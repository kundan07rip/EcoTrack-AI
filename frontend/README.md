# 🌿 EcoTrack AI: Neural Sustainability Auditor

**EcoTrack AI** is a professional MERN stack application that leverages Generative AI to perform real-time sustainability audits. It transforms raw product data into actionable environmental insights using a resilient, fail-safe API architecture.

---

## 🚀 Key Engineering Highlights

* **Resilient AI Handshake:** Built a custom "Model Failover" system. If the primary **Gemini 2.0 Flash** model hits a rate limit (429 error), the system automatically switches to **Gemini 2.5 Flash-Lite** using Exponential Backoff logic.
* **Neural Audit Engine:** Performs deep-analysis on item categories to generate a 1-100 "Footprint Intensity" score and expert eco-tips.
* **MERN Architecture:** * **Frontend:** React.js with Tailwind CSS & Framer Motion for a high-performance, glassmorphic UI.
    * **Backend:** Node.js & Express.js handling asynchronous AI processing.
    * **Database:** MongoDB Atlas with Mongoose schema validation to ensure data integrity.
* **Live Synchronization:** Real-time state management ensures the dashboard updates instantly after an audit without page refreshes.

---

## 🏗️ System Architecture

1.  **Input:** User provides an asset name and category via the React dashboard.
2.  **Process:** The backend triggers an AI audit, parsing the response into structured JSON.
3.  **Persistence:** Enriched sustainability data is committed to the MongoDB "Neural Registry."
4.  **Display:** The UI renders dynamic progress bars and animated insight cards.



---

## 🛠️ Technical Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons, Axios, Framer Motion
- **Backend:** Node.js, Express, Google Generative AI SDK
- **Database:** MongoDB Atlas
- **Tools:** Git, VS Code, Postman

---

## 🔧 Installation

1. Clone the repo:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/EcoTrack-AI.git](https://github.com/YOUR_USERNAME/EcoTrack-AI.git)