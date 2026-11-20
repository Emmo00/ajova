'use client';

import type { AjoGroup } from '../lib/ajova-data';

type GroupInviteViewProps = { group: AjoGroup; onBack: () => void; onClaimPayout: () => void; onNotice: (message: string) => void };

export default function GroupInviteView({ group, onBack, onClaimPayout, onNotice }: GroupInviteViewProps) {
  const copyInvite = async () => {
    await navigator.clipboard?.writeText(group.inviteLink);
    onNotice('Invitation link copied.');
  };
  const shareInvite = async () => {
    if (navigator.share) {
      await navigator.share({ title: `Join ${group.name} on Ajova`, text: `You are invited to join ${group.name}.`, url: group.inviteLink });
    } else {
      await copyInvite();
    }
  };
  const payoutAvailable = group.payoutStatus === 'available' && group.payoutRecipient === 'Amaka Mensah';
  const payoutClaimed = group.payoutStatus === 'claimed';

  return <div className="view-wrap group-invite-view"><button className="under-link back-link" onClick={onBack}>← Back to savings</button><div className="success-heading"><div className="success-icon">{payoutAvailable ? '₦' : payoutClaimed ? '✓' : '✓'}</div><p className="eyebrow">{payoutAvailable ? 'Payout available' : payoutClaimed ? 'Payout claimed' : 'Group details'}</p><h1>{group.name}</h1><p>{payoutAvailable ? 'Your ajo round is complete. Choose how much to invest and how much to receive as cash.' : payoutClaimed ? 'This payout has already been processed and cannot be claimed again.' : 'Your group is open for participants. Share the invitation link to bring your circle in.'}</p></div>{payoutAvailable && <div className="stat-grid payout-available-panel"><div className="stat-card stat-dark"><span>Total payout available</span><strong>₦{group.payoutAmount.toLocaleString('en-NG')}</strong><small>Recipient: {group.payoutRecipient}</small></div><div className="stat-card"><span>Payout status</span><strong>Ready</strong><small className="positive">Available to claim now</small></div><div className="stat-card"><span>Current round</span><strong>{group.round}</strong><small className="muted">All contributions received</small></div><button className="primary-button" onClick={onClaimPayout}>Claim Payout <span>↗</span></button></div>}{payoutClaimed && <div className="protection-box payout-claimed-box"><div className="protection-icon">✓</div><div><h3>Payout claimed</h3><p>This payout was processed successfully. Return to Investments to view the stock purchase and updated portfolio.</p></div></div>}<div className="invite-summary"><div className="group-card teal invite-card"><div className="card-top"><div className="group-avatar">{group.name.charAt(0)}</div><span className="status"><i /> {group.status}</span></div><h3>{group.name}</h3><p className="group-amount">{group.amount} <span>/ {group.schedule.toLowerCase()}</span></p><div className="group-details"><span><b>{group.members}</b> members</span><span><b>₦{group.protectionReserve.toLocaleString('en-NG')}</b> protection reserve</span></div><div className="group-footer"><span>Created by {group.creator}</span><span>Round {group.round}</span></div></div><div className="invite-panel"><p className="eyebrow">Invite participants</p><h2>Grow the circle together.</h2><p>Send this link to people you trust. They&apos;ll see the group details and can request to join.</p><div className="invite-link-box"><span>{group.inviteLink}</span><button onClick={copyInvite}>Copy</button></div><div className="invite-actions"><button className="primary-button" onClick={shareInvite}>Share invitation <span>↗</span></button><button className="outline-button" onClick={copyInvite}>Copy link</button></div></div></div><div className="reserve-reminder"><span>◈</span><p><strong>Protection reserve required</strong> Every participant, including you, must complete the initial ₦{group.protectionReserve.toLocaleString('en-NG')} protection contribution before regular contributions count toward the payout pool.</p></div></div>;
}