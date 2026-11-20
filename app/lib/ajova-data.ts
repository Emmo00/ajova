export type Schedule = 'Weekly' | 'Bi-weekly' | 'Monthly';

export type AjoGroup = {
  id: string;
  name: string;
  amount: string;
  amountValue: number;
  members: string;
  round: string;
  date: string;
  color: string;
  position: string;
  schedule: Schedule;
  protectionReserve: number;
  creator: string;
  status: 'Accepting participants' | 'Active';
  inviteLink: string;
};

export const initialGroups: AjoGroup[] = [
  {
    id: 'family-ajo',
    name: 'Family Ajo',
    amount: '₦20,000',
    amountValue: 20000,
    members: '8 / 10',
    round: '4 of 10',
    date: 'Dec 1',
    color: 'coral',
    position: '4th',
    schedule: 'Monthly',
    protectionReserve: 20000,
    creator: 'Amaka Mensah',
    status: 'Active',
    inviteLink: 'https://ajova.app/join/family-ajo',
  },
  {
    id: 'sunday-circle',
    name: 'Sunday Circle',
    amount: '₦10,000',
    amountValue: 10000,
    members: '6 / 8',
    round: '2 of 8',
    date: 'Dec 8',
    color: 'teal',
    position: '6th',
    schedule: 'Monthly',
    protectionReserve: 10000,
    creator: 'Amaka Mensah',
    status: 'Active',
    inviteLink: 'https://ajova.app/join/sunday-circle',
  },
];

export const getStoredGroups = (): AjoGroup[] => {
  if (typeof window === 'undefined') return initialGroups;
  const storedGroups = window.localStorage.getItem('ajova-groups');
  if (!storedGroups) return initialGroups;
  try {
    return JSON.parse(storedGroups) as AjoGroup[];
  } catch {
    return initialGroups;
  }
};

export const getLinkedGroup = (availableGroups: AjoGroup[]) => {
  if (typeof window === 'undefined') return null;
  const groupId = new URLSearchParams(window.location.search).get('group');
  return availableGroups.find((group) => group.id === groupId) ?? null;
};

export const holdings = [
  { company: 'Apple', ticker: 'AAPL', value: '$428.40', change: '+18.4%', units: '1.58 shares', color: '#1c63d5', mark: 'A' },
  { company: 'NVIDIA', ticker: 'NVDA', value: '$312.10', change: '+12.7%', units: '1.73 shares', color: '#78b82a', mark: 'N' },
  { company: 'Tesla', ticker: 'TSLA', value: '$184.70', change: '-2.1%', units: '0.53 shares', color: '#e84343', mark: 'T' },
];

export const lessons = [
  { title: 'The 50/30/20 Rule', description: 'Learn how to divide income between needs, wants and savings.', category: 'Saving and budgeting', source: 'NerdWallet', href: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator?utm_source=chatgpt.com', time: '6 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'SEC Nigeria Investor Education', description: 'Explore investment basics, strategies, market risks and investor protection.', category: 'Saving and budgeting', source: 'SEC Nigeria', href: 'https://www.sec.gov.ng/our-mandate/development/investor-education/?utm_source=chatgpt.com', time: '8 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'How to Start Investing', description: "A beginner's guide to getting started and building an investment habit.", category: 'Introduction to investing', source: 'Vanguard', href: 'https://investor.vanguard.com/investor-resources-education/article/how-to-start-investing?utm_source=chatgpt.com', time: '7 min read', level: 'Beginner', tone: 'lesson-blue' },
  { title: 'Introduction to Investing', description: 'Learn the basics of investing, returns and compound growth.', category: 'Introduction to investing', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing?utm_source=chatgpt.com', time: '6 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'Investing Basics: What Are Stocks?', description: 'Understand what stocks are and what it means to own part of a company.', category: 'Understanding stocks', source: 'Charles Schwab', href: 'https://www.schwab.com/learn/story/stock-investing-basics?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'Stocks: Frequently Asked Questions', description: 'Learn about shares, ownership, dividends and how stocks can generate returns.', category: 'Understanding stocks', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-blue' },
  { title: 'Asset Allocation and Diversification', description: 'Understand how to balance investments based on your goals and risk tolerance.', category: 'Investment fundamentals', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation?utm_source=chatgpt.com', time: '8 min read', level: 'Intermediate', tone: 'lesson-green' },
  { title: 'What Is Dollar-Cost Averaging?', description: 'Learn about investing consistently instead of trying to predict market movements.', category: 'Investment fundamentals', source: 'Charles Schwab', href: 'https://www.schwab.com/learn/story/what-is-dollar-cost-averaging?utm_source=chatgpt.com', time: '6 min read', level: 'Intermediate', tone: 'lesson-blue' },
  { title: 'What Is Compound Interest?', description: 'Understand how your returns can generate additional returns over time.', category: 'Growing wealth', source: 'Fidelity', href: 'https://www.fidelity.com/learning-center/trading-investing/compound-interest?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'What Is a Dividend?', description: 'Learn why some companies distribute part of their earnings to shareholders.', category: 'Growing wealth', source: 'Fidelity', href: 'https://www.fidelity.com/learning-center/smart-money/what-is-a-dividend?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'Known Investment Scams', description: 'Learn to recognise Ponzi schemes, fake platforms and unregistered operators.', category: 'Investor protection', source: 'SEC Nigeria', href: 'https://sec.gov.ng/for-investors/known-investment-scams/?utm_source=chatgpt.com', time: '7 min read', level: 'Essential', tone: 'lesson-coral' },
  { title: 'How to Avoid Investment Scams', description: 'Identify common fraud tactics, unrealistic promises and pressure-selling techniques.', category: 'Investor protection', source: 'Investor.gov', href: 'https://www.investor.gov/protect-your-investments/fraud/protect-your-money?utm_source=chatgpt.com', time: '6 min read', level: 'Essential', tone: 'lesson-blue' },
];