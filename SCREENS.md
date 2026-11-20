# **Ajova — UI/UX Product Specification**

## **1. Product experience**

Ajova is a group savings and investment app that helps people participate in traditional ajo while building investment portfolios through tokenized stocks.

The application has three core pillars:

1. **Savings:** Create or join ajo groups, contribute periodically and receive payouts.
2. **Investments:** Invest a percentage of your ajo payouts in stocks and track your portfolio.
3. **Learn:** Understand financial investments, stocks, the stock market and how to build wealth.

**Design philosophy:** Ajova should feel like a modern fintech application. Users should never need to understand blockchain, wallets, gas fees, smart contracts or tokenized assets to use it.

## **2. Application structure**

The application has two main experiences:

- Public landing page: Introduces Ajova and converts visitors into users.
- Authenticated application: Manages savings, investments and financial education.

**Authenticated app navigation:**

- **Savings**

- **Investments**

- **Learn**

## **3. Page-by-page breakdown**

### **A. Public landing page**

**Purpose:** Explain Ajova in a few seconds and encourage visitors to get started.

**Sections**

1\. Navigation bar

- Ajova logo.
- How it works.
- Sign in.
- Get started CTA.

2\. Hero section

- Headline: **Save together. Grow together.**
- Supporting copy: "Join a savings circle, receive your payout, and turn a portion of it into investments in the global stock market."
- Primary CTA: Get started.
- Secondary CTA: How it works.
- Visual: A stylized savings-to-investment flow.

3\. How it works

- Create or join a savings group.
- Contribute with your group.
- Receive your payout and invest a portion.

4\. Investment proposition

- Introduce access to global companies.
- Emphasize that investing is optional.

5\. Financial education proposition

- Headline: "Learn as you grow."
- Briefly explain that Ajova helps users understand investing.
- CTA: Explore Learn.

6\. Final CTA

- "Your savings can do more."
- Get started.

**Interactions**

- Get started → Authentication.
- Sign in → Login.
- How it works → Scroll to explanation.
- Explore Learn → Landing page education section.

Keep the landing page minimal. Avoid unnecessary testimonials, pricing tables and lengthy explanations.

### **B. Authentication and onboarding**

**Pages**

1\. Sign up

- Full name.
- Email.
- Password.
- Create account.

2\. Login

- Email.
- Password.
- Sign in.

3\. Basic profile setup

- Phone number.
- Country.
- Currency preference.

**Interactions**

- Toggle password visibility.
- Switch between login and signup.
- Form validation.
- Loading and success states.
- Redirect to Savings after authentication.

Wallet creation happens automatically in the background.

### **C. Savings dashboard**

**Page layout**

1\. Header

- Ajova logo.
- Greeting.
- Profile/avatar button.
- Notification icon (optional).

2\. Savings overview

- Total amount contributed.
- Total payouts received.
- Active savings groups.
- Pending contributions.

3\. Action shortcuts

- Create group (+).
- Join a group.

4\. My savings groups

Each group card displays:

- Group name.
- Group avatar/icon.
- Contribution amount.
- Contribution frequency.
- Number of members.
- Next contribution date.
- Group progress.
- User's payout position.

Example:

**Family Ajo**

Active

# **₦20,000**

Monthly contribution

Members

**8 / 10**

Your payout position

**4th**

Round 4 of 10Next contribution: Dec 1

Your next action

Contribution due

**Interactions**

- Tap group card → Group details.
- Create group → Group creation flow.
- Join group → Join using invitation link/code.
- Tap contribution reminder → Deposit flow.
- Tap notification → Notification details.

### **D. Group details page**

**Page layout**

1\. Group header

- Group name.
- Group status.
- Share/invite button.

2\. Group overview

- Contribution amount.
- Contribution frequency.
- Number of members.
- Total group pool.
- Current round.
- Your payout position.

3\. Your contribution status

- Amount due.
- Due date.
- Payment status.
- Make contribution CTA.

4\. Group members

- Member names and avatars.
- Payout positions.
- Contribution status.

5\. Payout information

- Next recipient.
- Expected payout amount.
- Expected payout date.

**Interactions**

- Make contribution → Deposit flow.
- Share group → Copy invitation link or native share sheet.
- Back → Savings dashboard.

### **E. Create group flow**

A short multi-step form.

**Step 1: Group information**

- Group name.
- Short description (optional).
- Group image/avatar (optional).

**Step 2: Contribution settings**

- Contribution amount.
- Contribution frequency (weekly/monthly).
- Group size.
- Start date.

Show a live calculation:

10 members × ₦10,000 = ₦100,000 per payout.

**Step 3: Payout order**

- Administrator-defined order for MVP.
- Group creator occupies the first position by default.
- Explain that members must agree on the order.

**Step 4: Review and create**

Display a summary of all group settings.

CTA: Create group.

**Success screen**

- Group successfully created.
- Invitation link.
- Copy invitation.
- Share invitation.
- Go to group dashboard.

### **F. Join group flow**

Users can join groups through invitation links.

**Flow**

1. Open invitation link.
2. View group information.
3. Review contribution amount, frequency, group size and payout order.
4. Click Join group.
5. Confirm.
6. Success → Group details.

Prevent joining full or already-started groups.

### **G. Deposit flow**

**Step 1: Enter deposit amount**

- Group name.
- Contribution amount due.
- Amount input, prefilled with required contribution.
- Available balance (if applicable).

**Step 2: Select payment method**

- Bank transfer.
- Card payment.
- Wallet balance (if implemented).

**Step 3: Payment confirmation**

- Amount.
- Group.
- Payment method.
- Applicable fees.
- Confirm payment CTA.

**Step 4: Processing/success**

- Processing animation.
- Payment confirmation.
- Updated contribution status.
- Return to group.

**Interactions**

- Edit amount.
- Select payment method.
- Confirm payment.
- Cancel.
- Retry failed payment.

For the hackathon, a simulated payment provider is acceptable.

### **H. Savings preview**

A dedicated page accessible from a group card.

**Page layout**

- Group name and status.
- Total amount contributed.
- Total number of rounds.
- Completed rounds.
- Remaining rounds.
- Contribution history.
- Payout schedule.
- Next expected payout.
- Group funding progress.

Example:

| Round | Amount  | Status  |
| ----- | ------- | ------- |
| 1     | ₦10,000 | Paid    |
| 2     | ₦10,000 | Paid    |
| 3     | ₦10,000 | Paid    |
| 4     | ₦10,000 | Pending |

**Interactions**

- Select contribution → Transaction details.
- Make contribution if pending.
- View payout schedule.
- Navigate to group details.

### **I. Withdraw / payout flow**

Most important user journey

The user receives a notification when their payout becomes available.

This is a two-step investment and withdrawal wizard, followed by confirmation.

**Step 1: Payout allocation**

Display:

- Group name.
- Total payout amount.
- Allocation slider from 0% to 100%.
- Cash withdrawal amount.
- Investment amount.

Example:

PAYOUT AVAILABLE

# **₦100,000**

Investment percentage

**30%**

Cash withdrawal

**₦70,000**

Investment

**₦30,000**

Interactions:

- Drag slider.
- Preset percentages: 0%, 10%, 25%, 50%, 75%, 100%.
- Update amounts in real time.
- If allocation is 0%, skip stock selection.
- If allocation is above 0%, continue to stock selection.

CTA: Continue.

**Step 2: Select stock**

Display a curated list of available tokenized stocks.

Each stock card displays:

- Company logo.
- Company name.
- Stock ticker.
- Current price.
- Daily percentage change.

Example:

[ICONSIAM : Shopping](https://images.openai.com/static-rsc-4/s4RDqF0kL6VC0nhemzMS3O0yN0a7Kqv3rf078ActcqbMgvqkdEvxsEW8C5eSWsqmPQreg4K9O0HhHmnNLpSKsM5AxvAZ1tAHJ9dWRL4YVsPNqA3ZlqjMHEkS7cymhcP2ZbywUn5zFeqdjX9ONHfeyhxtt6wnY0vRQwGIvM0nufc?purpose=inline)

**Apple**

AAPL

**$270.00**

+1.8%

[Nvidia Logo Png | Nvidia Logo Vector  - freepng](https://images.openai.com/static-rsc-4/5EEqs5MTCagikuy-XR40Tgz4ZYQ6RzfMuT3dkME_H5-UzilcM6Tr57_HjrxMYkXQW4tVVH9eN05-7fUbEDqIAOOeIkqr-ZV_8IoMeNeUXbQ5vdlXLDhwd_r5b_hxv_sq9QxhOiv5gRTFkwKGeFkHgOFoj0Rp4dQYu7iiLxF9LGk?purpose=inline)

**NVIDIA**

NVDA

**$180.00**

+2.4%

[Tesla - Maxton Design](https://images.openai.com/static-rsc-4/KnGO0jP1aMJvSkJ9ifq8k6MlAaKrEvUN0_2pvGdPAutV31zg10qgMHzRgYbaNU6XvV30o51lw09POjLGn5zEA5USWbGHwuR3p3t-6SJN0gOf3Q1fQlqceDj_s3d55hS0yyav2_YVmZrSmyE8nZ_8CR_8cQOHfBZXr1ig0s1Hcc8?purpose=inline)

**Tesla**

TSLA

**$350.00**

-0.9%

Interactions:

- Select one stock.
- Highlight selected stock.
- View stock details (optional bottom sheet).
- Search stocks (optional).

CTA: Review investment.

**Step 3: Review and confirm**

Display:

- Total payout.
- Cash withdrawal amount.
- Selected stock.
- Investment amount.
- Estimated stock quantity.
- Exchange rate.
- Fees.

CTA: Confirm withdrawal.

**Step 4: Processing and success**

Display:

- Payout processing.
- Cash amount withdrawn.
- Investment amount.
- Stock purchased.
- Transaction reference.

CTA: View investments.

If stock execution fails, explain the failure and provide a retry/refund path. Never show a successful purchase before settlement is confirmed.

### **J. Investments dashboard**

**Page layout**

1\. Header

- Investments.
- Profile icon.

2\. Portfolio overview

- Total portfolio value.
- Total invested.
- Overall profit/loss.
- Percentage return.

3\. Portfolio performance

- Simple line chart.
- Time filters: 1W, 1M, 3M, ALL.

4\. My holdings

Each holding displays:

- Company logo.
- Company name.
- Ticker.
- Quantity owned.
- Current value.
- Profit/loss.

5\. Investment history

- Stock purchases.
- Source ajo group.
- Date.
- Amount invested.

**Interactions**

- Tap holding → Stock details.
- Tap transaction → Transaction details.
- Switch chart time range.
- View all holdings.

**Stock details page**

Display:

- Company name and ticker.
- Current price.
- Price performance chart.
- Quantity owned.
- Current holding value.
- Average purchase price.
- Profit/loss.

Stock selling and independent portfolio top-ups are excluded from the initial MVP.

### **K. Learn dashboard**

Third primary application tab

**Purpose:** Help users understand personal finance, saving, investing and the stock market, regardless of their previous financial knowledge.

The Learn section should feel like a simple, approachable learning hub rather than a complicated online course platform.

The objective is to help users become more confident investors while using Ajova.

**Page layout**

1\. Header

- Title: Learn.
- Supporting copy: "Build your financial knowledge, one lesson at a time."
- Optional search icon.

2\. Featured lesson

A prominent card highlighting a beginner-friendly topic.

Example:

[Stock Market Courses FREE with Certificate | StockShaala by Kotak Neo](https://images.openai.com/static-rsc-4/ntwFpUZy_RTOEzPSiPFL73jLWbrL5O8PHzjHsqKo7CfJOP9rYfNuk0HRGif_deFUCXDnmovNKOJdJFUi78hwdf1AufwtBJ-4yPiSwKiIoE_-VbRGBvYOCOJFnDo-jKz3a3XUibfDv-GvTNqYxmwmuyRT66SX51QbG1PJ339TzSA?purpose=inline)

[kotakneo.com](https://www.kotakneo.com/stockshaala/?utm_source=chatgpt.com)

Featured lesson

**Understanding the stock market**

Learn what stocks are, how the stock market works, and why people invest in companies.

Beginner · 5 min read

Start learning

3\. Learning categories

Display topic categories as horizontal cards or chips.

- Personal finance.
- Saving and budgeting.
- Introduction to investing.
- Understanding stocks.
- Stock market fundamentals.
- Risk and diversification.

4\. Recommended lessons

Display educational content in a list of cards.

Each lesson card should include:

- Cover image or illustration.
- Lesson title.
- Short description.
- Category.
- Reading time.
- Difficulty level.

5\. Learning progress

A small section showing:

- Lessons completed.
- Current learning streak (optional).
- Recently viewed lessons.

For the MVP, keep progress tracking simple.

**Interactions**

- Tap featured lesson → Lesson details.
- Select category → Filter lessons.
- Tap lesson card → Open lesson.
- Search → Search lessons (optional).
- Mark lesson as completed.
- Continue learning → Resume last opened lesson.

**Recommended MVP content categories**

| Category         | Example topics                       |
| ---------------- | ------------------------------------ |
| Personal finance | Budgeting, emergency funds           |
| Saving           | Building consistent saving habits    |
| Investing basics | What is investing?                   |
| Stocks           | What are stocks and shares?          |
| Stock market     | How stock markets work               |
| Risk management  | Risk, diversification and volatility |

### **L. Lesson details page**

This page displays the actual educational content.

**Page layout**

- Lesson title.
- Category and difficulty.
- Estimated reading time.
- Cover illustration.
- Lesson content.
- Key takeaways.
- Related lessons.
- Mark as completed button.

Example lesson:

**What are stocks?**

A stock represents a unit of ownership in a company. When you purchase a stock, you gain exposure to the company's financial performance and may benefit if its value increases.

Lessons should use:

- Simple language.
- Short paragraphs.
- Illustrations.
- Practical examples.
- Financial terminology explained in context.

**Interactions**

- Scroll through lesson content.
- Expand glossary definitions.
- Mark lesson as completed.
- Navigate to next lesson.
- Return to Learn dashboard.

**Optional enhancement:** Include short knowledge checks after selected lessons. These can be simple multiple-choice questions, but they are not required for the MVP.

### **M. Profile and settings**

Keep this minimal.

**Page contents**

- Profile information.
- Email and phone number.
- Country.
- Account verification status.
- Wallet status (abstracted).
- Logout.

**Interactions**

- Edit profile.
- Logout.
- View account details.
