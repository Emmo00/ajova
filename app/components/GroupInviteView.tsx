'use client';

import type { AjoGroup } from '../lib/ajova-data';

type GroupInviteViewProps = { group: AjoGroup; onBack: () => void; onNotice: (message: string) => void };

export default function GroupInviteView({ group, onBack, onNotice }: GroupInviteViewProps) {
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

  return <div className="view-wrap group-invite-view"><button className="under-link back-link" onClick={onBack}>← Back to savings</button><div className="success-heading"><div className="success-icon">✓</div><p className="eyebrow">Group created successfully</p><h1>{group.name} is ready.</h1><p>Your group is open for participants. Share the invitation link to bring your circle in.</p></div><div className="invite-summary"><div className="group-card teal invite-card"><div className="card-top"><div className="group-avatar">{group.name.charAt(0)}</div><span className="status"><i /> {group.status}</span></div><h3>{group.name}</h3><p className="group-amount">{group.amount} <span>/ {group.schedule.toLowerCase()}</span></p><div className="group-details"><span><b>1 / 10</b> members</span><span><b>₦{group.protectionReserve.toLocaleString('en-NG')}</b> protection reserve</span></div><div className="group-footer"><span>Created by {group.creator}</span><span>Round 1 of 10</span></div></div><div className="invite-panel"><p className="eyebrow">Invite participants</p><h2>Grow the circle together.</h2><p>Send this link to people you trust. They&apos;ll see the group details and can request to join.</p><div className="invite-link-box"><span>{group.inviteLink}</span><button onClick={copyInvite}>Copy</button></div><div className="invite-actions"><button className="primary-button" onClick={shareInvite}>Share invitation <span>↗</span></button><button className="outline-button" onClick={copyInvite}>Copy link</button></div></div></div><div className="reserve-reminder"><span>◈</span><p><strong>Protection reserve required</strong> Every participant, including you, must complete the initial ₦{group.protectionReserve.toLocaleString('en-NG')} protection contribution before regular contributions count toward the payout pool.</p></div></div>;
}