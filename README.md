# Budget App (v1)

A simple personal finance dashboard built with React that tracks income, expenses, savings, and emergency funds.

---

## Features (v1)

- **Monthly & daily budget tracking*  
  See your monthly income, expenses, daily budget, and leftover funds.

- **Savings allocation*
  - Set a percentage of your monthly income to save.  
  - Daily savings are calculated automatically.

- **Emergency Fund (EF) first allocation*
  - Daily savings are automatically added to your emergency fund until the target is reached.  
  - Remaining savings go to the general savings account.

- **One allocation per day* 
  - Prevents double allocation by tracking the `lastUpdated` date.

- **Responsive dashboard*  
  - Displays current income, expenses, daily budgets, savings progress, and emergency fund status.

---

## v2 Roadmap

Planned improvements for the next version:

- Backend allocation logic for reliability and multi-device consistency.
- Daily record history for both emergency fund and savings.
- Catch-up allocations for missed days.
- Mid-day savings percentage updates that apply immediately.
- Multiple savings goals and priorities.
- Notifications and progress milestones.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git

### Installation

```bash
git clone https://github.com/OertMahmutaj/budget-app.git
cd budget-app
npm install
npm start


