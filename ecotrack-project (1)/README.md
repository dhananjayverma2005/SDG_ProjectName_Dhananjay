# EcoTrack – Carbon Footprint Tracker

## Selected SDG: SDG 13 – Climate Action

**What it focuses on:** Taking urgent action to combat climate change and its impacts.

**Why it matters:** Climate change affects every country. Rising temperatures, extreme weather, and rising sea levels impact billions of people worldwide. Individual awareness and action are critical to reducing greenhouse gas emissions.

---

## Problem Statement

Many individuals are **unaware of their daily carbon footprint** — the CO₂ emissions generated through everyday activities like commuting, electricity use, food choices, and shopping.

- **Where:** This problem exists globally, especially in urban areas with high consumption.
- **Who is affected:** Everyone, but particularly communities vulnerable to climate change impacts.
- **Why it's serious:** Without awareness, people cannot make informed decisions to reduce emissions. If individuals don't act, global warming will continue to accelerate, leading to more severe droughts, floods, and food shortages.

---

## Proposed Solution

**EcoTrack** is a web application that helps users **calculate, track, and visualize** their personal carbon footprint across four categories:

- 🚗 **Transport** – Car, bus, train, flights, cycling
- ⚡ **Energy** – Electricity, natural gas, heating oil
- 🍽️ **Food** – Beef, chicken, fish, dairy, vegetables, fruits
- 🛍️ **Shopping** – Clothing, electronics, furniture, books

Users log daily activities, and the app calculates CO₂ emissions using standard emission factors. A visual dashboard helps users understand their impact and identify areas for improvement.

---

## Project Features

1. **Carbon Calculator** – Users select a category, choose an activity, enter the amount, and instantly see estimated CO₂ emissions before logging the entry.

2. **Activity Logging** – All entries are saved with date, category, activity name, amount, and calculated CO₂. Data persists in the browser using localStorage.

3. **Interactive Dashboard** – A pie chart shows emissions breakdown by category, and a bar chart displays daily CO₂ trends. A sortable table lists all logged entries with a delete option.

4. **Actionable Tips** – Curated sustainability tips help users reduce emissions in each category (e.g., switching to public transport, eating less red meat).

5. **Responsive Design** – Fully responsive layout that works on desktop, tablet, and mobile devices.

---

## Technology Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, TypeScript                |
| Styling    | Tailwind CSS, Custom Design System  |
| Charts     | Recharts                            |
| Animations | Framer Motion                       |
| Build Tool | Vite 5                              |
| Storage    | Browser localStorage                |

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit http://localhost:5173
```

---

## Future Scope

- **User Authentication** – Allow users to create accounts and sync data across devices.
- **Database Integration** – Store data in a cloud database for long-term tracking.
- **Monthly/Yearly Reports** – Generate downloadable PDF reports of carbon footprint trends.
- **Goal Setting** – Let users set emission reduction targets and track progress.
- **Community Features** – Compare footprints anonymously and participate in group challenges.
- **Mobile App** – Develop a native mobile application for on-the-go tracking.
- **AI Recommendations** – Use machine learning to provide personalized emission reduction suggestions.
- **API Integration** – Connect with real-time data sources for more accurate emission factors by region.

---

## License

This project was built as a capstone project for Web Development, addressing **UN SDG 13: Climate Action**.

© 2026 EcoTrack
