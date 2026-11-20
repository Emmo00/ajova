'use client';

import { useState } from 'react';
import { stockCatalog, type AjoGroup, type Stock } from '../lib/ajova-data';

export type PayoutResult = {
  groupId: string;
  payoutAmount: number;
  investmentPercent: number;
  investmentAmount: number;
  cashAmount: number;
  stock: Stock | null;
  shares: number;
};

type PayoutFlowProps = { group: AjoGroup; onClose: () => void; onComplete: (result: PayoutResult) => void; onViewInvestments: () => void };

export default function PayoutFlow({ group, onClose, onComplete, onViewInvestments }: PayoutFlowProps) {
  const [step, setStep] = useState(1);
  const [percent, setPercent] = useState(30);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<PayoutResult | null>(null);
  const investmentAmount = Math.round((group.payoutAmount * percent) / 100);
  const cashAmount = group.payoutAmount - investmentAmount;
  const shares = selectedStock ? investmentAmount / selectedStock.price : 0;

  const continueFromAllocation = () => {
    setError('');
    setStep(percent === 0 ? 3 : 2);
  };

  const continueFromStock = () => {
    if (!selectedStock) {
      setError('Select a stock before continuing.');
      return;
    }
    setError('');
    setStep(3);
  };

  const confirm = () => {
    if (group.payoutStatus !== 'available') {
      setError('This payout has already been claimed.');
      return;
    }
    if (percent > 0 && !selectedStock) {
      setError('Select a stock before confirming your payout.');
      setStep(2);
      return;
    }
    setProcessing(true);
    const result = { groupId: group.id, payoutAmount: group.payoutAmount, investmentPercent: percent, investmentAmount, cashAmount, stock: selectedStock, shares };
    window.setTimeout(() => {
      onComplete(result);
      setSuccess(result);
      setProcessing(false);
    }, 900);
  };

  if (success) {
    return <div className="modal-backdrop"><section className="creation-modal confirm-form"><div className="confirm-icon">✓</div><p className="eyebrow">Payout complete</p><h2>Your money is on its way.</h2><p>Your payout has been claimed and your investment has been recorded in the mock portfolio.</p><div className="review-grid"><div><span>Total payout</span><strong>₦{success.payoutAmount.toLocaleString('en-NG')}</strong></div><div><span>Cash received</span><strong>₦{success.cashAmount.toLocaleString('en-NG')}</strong></div><div><span>Invested</span><strong>₦{success.investmentAmount.toLocaleString('en-NG')}</strong></div></div>{success.stock && <div className="protection-box"><div className="company-mark" style={{ backgroundColor: success.stock.color }}>{success.stock.mark}</div><div><h3>{success.stock.company} ({success.stock.ticker}) purchased</h3><p>{success.shares.toFixed(4)} estimated shares at ${success.stock.price.toFixed(2)} per share.</p></div></div>}<div className="creation-actions"><button className="outline-button" onClick={onClose}>View group details</button><button className="primary-button" onClick={onViewInvestments}>View investments <span>↗</span></button></div></section></div>;
  }

  return <div className="modal-backdrop" onClick={onClose}><section className="creation-modal" onClick={(event) => event.stopPropagation()}><div className="creation-header"><div><p className="eyebrow">Payout available · {group.name}</p><h2>{step === 1 ? 'Give your payout a direction.' : step === 2 ? 'Choose a company to own.' : 'Review your payout.'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close payout flow">×</button></div><div className="flow-steps"><span className={step >= 1 ? 'active' : ''}>01 Allocation</span><i /><span className={step >= 2 ? 'active' : ''}>02 Stock</span><i /><span className={step >= 3 ? 'active' : ''}>03 Confirm</span></div>{step === 1 && <div className="creation-form"><div className="stat-grid"><div className="stat-card stat-dark"><span>Total payout</span><strong>₦{group.payoutAmount.toLocaleString('en-NG')}</strong><small>Available now</small></div><div className="stat-card"><span>Amount to invest</span><strong>₦{investmentAmount.toLocaleString('en-NG')}</strong><small className="positive">{percent}% of payout</small></div><div className="stat-card"><span>Cash to receive</span><strong>₦{cashAmount.toLocaleString('en-NG')}</strong><small className="muted">After allocation</small></div></div><div className="allocation-control"><div className="allocation-value"><strong>{percent}%</strong><span>invested in stocks</span></div><input type="range" min="0" max="100" step="1" value={percent} onChange={(event) => setPercent(Number(event.target.value))} /><div className="range-labels"><span>0% cash</span><span>100% invested</span></div><div className="preset-row">{[0, 10, 25, 50, 75, 100].map((value) => <button className={percent === value ? 'active' : ''} key={value} onClick={() => setPercent(value)}>{value}%</button>)}</div></div><div className="creation-actions"><button className="text-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={continueFromAllocation}>Continue <span>→</span></button></div></div>}{step === 2 && <div className="creation-form"><p className="modal-copy">You are investing ₦{investmentAmount.toLocaleString('en-NG')}. Select one stock to estimate your shares.</p><div className="stock-options">{stockCatalog.map((stock) => <button className={`stock-option ${selectedStock?.ticker === stock.ticker ? 'selected' : ''}`} key={stock.ticker} onClick={() => { setSelectedStock(stock); setError(''); }}><span className="company-mark" style={{ backgroundColor: stock.color }}>{stock.mark}</span><b>{stock.company}</b><small>{stock.ticker} · {stock.change}</small><strong>${stock.price.toFixed(2)}</strong></button>)}</div>{selectedStock && <div className="how-it-works"><p className="eyebrow">Estimated quantity</p><p><strong>{shares.toFixed(4)} {selectedStock.ticker}</strong> based on a mock price of ${selectedStock.price.toFixed(2)}.</p></div>}{error && <p className="form-error">{error}</p>}<div className="creation-actions"><button className="under-link" onClick={() => setStep(1)}>← Back</button><button className="primary-button" disabled={!selectedStock} onClick={continueFromStock}>Review payout <span>→</span></button></div></div>}{step === 3 && <div className="creation-form"><div className="review-grid"><div><span>Group</span><strong>{group.name}</strong></div><div><span>Total payout</span><strong>₦{group.payoutAmount.toLocaleString('en-NG')}</strong></div><div><span>Investment</span><strong>{percent}%</strong></div></div><div className="how-it-works"><p className="eyebrow">Payout split</p><p>Cash received: <strong>₦{cashAmount.toLocaleString('en-NG')}</strong><br />Investment amount: <strong>₦{investmentAmount.toLocaleString('en-NG')}</strong></p></div>{selectedStock ? <div className="protection-box"><div className="company-mark" style={{ backgroundColor: selectedStock.color }}>{selectedStock.mark}</div><div><h3>{selectedStock.company} ({selectedStock.ticker})</h3><p>Estimated quantity: <strong>{shares.toFixed(4)} shares</strong><br />Mock price: ${selectedStock.price.toFixed(2)}</p></div></div> : <div className="how-it-works"><p className="eyebrow">Cash-only payout</p><p>Your full ₦{group.payoutAmount.toLocaleString('en-NG')} payout will be received as cash.</p></div>}{error && <p className="form-error">{error}</p>}<div className="creation-actions"><button className="under-link" onClick={() => setStep(percent === 0 ? 1 : 2)}>← Back</button><button className="primary-button" disabled={processing} onClick={confirm}>{processing ? 'Processing payout…' : 'Confirm Payout'} <span>↗</span></button></div></div>}</section></div>;
}
