'use client';

import { useState } from 'react';
import type { AjoGroup, Schedule } from '../lib/ajova-data';

type CreateAjoFlowProps = { onClose: () => void; onCreated: (group: AjoGroup) => void };

export default function CreateAjoFlow({ onClose, onCreated }: CreateAjoFlowProps) {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [amount, setAmount] = useState('');
  const [schedule, setSchedule] = useState<Schedule>('Monthly');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const numericAmount = Number(amount);
    if (!groupName.trim()) {
      setError('Enter a group name to continue.');
      return false;
    }
    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter a contribution amount greater than zero.');
      return false;
    }
    setError('');
    return true;
  };

  const create = () => {
    if (!validate()) {
      setStep(1);
      return;
    }
    setLoading(true);
    const amountValue = Number(amount);
    const id = `${groupName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    const group: AjoGroup = { id, name: groupName.trim(), amount: `₦${amountValue.toLocaleString('en-NG')}`, amountValue, members: '1 / 10', round: '1 of 10', date: 'To be scheduled', color: 'teal', position: '1st', schedule, protectionReserve: amountValue, creator: 'Jessica Mensah', status: 'Accepting participants', inviteLink: `${window.location.origin}/?group=${id}`, payoutAmount: 0, payoutStatus: 'not-ready', payoutRecipient: 'Jessica Mensah' };
    window.setTimeout(() => onCreated(group), 650);
  };

  return <div className="modal-backdrop" onClick={onClose}><section className="creation-modal" onClick={(event) => event.stopPropagation()}><div className="creation-header"><div><p className="eyebrow">Create an ajo group</p><h2>{step === 1 ? 'Bring your circle together.' : 'Make the details clear.'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close group creation">×</button></div><div className="flow-steps"><span className={step >= 1 ? 'active' : ''}>01 Details</span><i /><span className={step >= 2 ? 'active' : ''}>02 Review</span><i /><span className={step >= 3 ? 'active' : ''}>03 Create</span></div>{step === 1 && <div className="creation-form"><label>Group name<input value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="e.g. The Sunday Circle" autoFocus /></label><label>Contribution per participant<div className="input-with-prefix"><span>₦</span><input type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="20,000" /></div></label><fieldset><legend>Contribution schedule</legend><div className="schedule-options">{(['Weekly', 'Bi-weekly', 'Monthly'] as Schedule[]).map((option) => <button type="button" className={schedule === option ? 'selected' : ''} key={option} onClick={() => setSchedule(option)}>{option}<span>{option === 'Weekly' ? 'Every 7 days' : option === 'Bi-weekly' ? 'Every 14 days' : 'Every month'}</span></button>)}</div></fieldset>{error && <p className="form-error">{error}</p>}<div className="creation-actions"><button className="text-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => validate() && setStep(2)}>Review group <span>→</span></button></div></div>}{step === 2 && <div className="creation-form review-form"><div className="review-grid"><div><span>Group name</span><strong>{groupName}</strong></div><div><span>Contribution</span><strong>₦{Number(amount).toLocaleString('en-NG')}</strong></div><div><span>Schedule</span><strong>{schedule}</strong></div></div><div className="how-it-works"><p className="eyebrow">How this group works</p><p>Every participant contributes the agreed amount on the selected schedule. Contributions collect into a shared payout pool, and members receive payouts according to the group&apos;s agreed order.</p></div><div className="protection-box"><div className="protection-icon">◈</div><div><h3>Contribution Protection / Insurance</h3><p>The first contribution from every participant is held separately as a protection reserve. It is not part of the regular payout pool.</p><ul><li>Every participant must pay the initial ₦{Number(amount).toLocaleString('en-NG')} protection contribution.</li><li>Regular contributions count toward payouts only after protection is complete.</li><li>The reserve may help cover contribution shortfalls caused by defaults.</li></ul><small>This reserve is a group protection mechanism, not regulated insurance, and it does not guarantee every default will be covered.</small></div></div>{error && <p className="form-error">{error}</p>}<div className="creation-actions"><button className="under-link" onClick={() => { setError(''); setStep(1); }}>← Edit details</button><button className="primary-button" onClick={() => setStep(3)}>Continue to confirm <span>→</span></button></div></div>}{step === 3 && <div className="creation-form confirm-form"><div className="confirm-icon">✦</div><h3>Ready to create {groupName}?</h3><p>Your group will be open for participants after creation. You can share its invitation link from the next screen.</p><div className="confirm-summary"><span>{schedule} contributions</span><strong>₦{Number(amount).toLocaleString('en-NG')} per participant</strong><small>Protection reserve: ₦{Number(amount).toLocaleString('en-NG')} per participant</small></div>{error && <p className="form-error">{error}</p>}<div className="creation-actions"><button className="under-link" onClick={() => setStep(2)}>← Back to review</button><button className="primary-button" disabled={loading} onClick={create}>{loading ? 'Creating group…' : 'Confirm and create'} <span>↗</span></button></div></div>}</section></div>;
}