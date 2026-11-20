'use client';

import { useState } from 'react';
import CreateAjoFlow from './components/CreateAjoFlow';
import GroupInviteView from './components/GroupInviteView';
import InvestView from './components/InvestView';
import Landing from './components/Landing';
import LearnView from './components/LearnView';
import SaveView from './components/SaveView';
import { getLinkedGroup, getStoredGroups, type AjoGroup } from './lib/ajova-data';

type Tab = 'save' | 'invest' | 'learn';

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [tab, setTab] = useState<Tab>('save');
  const [groups, setGroups] = useState<AjoGroup[]>(getStoredGroups);
  const [creationOpen, setCreationOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<AjoGroup | null>(() => getLinkedGroup(getStoredGroups()));
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [allocation, setAllocation] = useState(30);
  const [selectedStock, setSelectedStock] = useState('Apple');
  const [completedLesson, setCompletedLesson] = useState(false);
  const [notice, setNotice] = useState('');
  const [isApp, setIsApp] = useState(() => Boolean(getLinkedGroup(getStoredGroups())));

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  };

  const enterApp = () => {
    setShowAuth(false);
    setIsApp(true);
  };

  const createGroup = (group: AjoGroup) => {
    setGroups((currentGroups) => {
      const nextGroups = [group, ...currentGroups];
      window.localStorage.setItem('ajova-groups', JSON.stringify(nextGroups));
      return nextGroups;
    });
    setSelectedGroup(group);
    setCreationOpen(false);
  };

  if (!isApp) {
    return <Landing showAuth={showAuth} setShowAuth={setShowAuth} authMode={authMode} setAuthMode={setAuthMode} enterApp={enterApp} />;
  }

  const selectTab = (nextTab: Tab) => {
    setTab(nextTab);
    setSelectedGroup(null);
  };

  return <main className="app-shell"><aside className="side-nav"><button className="brand side-brand" aria-label="Ajova" onClick={() => setIsApp(false)} /><div className="side-label">YOUR MONEY</div><button className={`side-link ${tab === 'save' ? 'active' : ''}`} onClick={() => selectTab('save')}><span>◒</span> Save</button><button className={`side-link ${tab === 'invest' ? 'active' : ''}`} onClick={() => selectTab('invest')}><span>↗</span> Invest</button><button className={`side-link ${tab === 'learn' ? 'active' : ''}`} onClick={() => selectTab('learn')}><span>✦</span> Learn</button><div className="side-bottom"><button className="side-link"><span>?</span> Help center</button><button className="profile-mini" onClick={() => flash('Profile settings are coming next.')}><span className="avatar">AM</span><span><b>Amaka Mensah</b><small>Personal account</small></span><i>•••</i></button></div></aside><div className="app-content"><header className="app-header"><div className="mobile-brand brand" aria-label="Ajova" /><div className="breadcrumb">{tab === 'save' ? 'Savings' : tab === 'invest' ? 'Investments' : 'Learn'}<span> / </span><b>{tab === 'save' ? 'Overview' : tab === 'invest' ? 'My portfolio' : 'For you'}</b></div><div className="header-actions"><button className="icon-button" onClick={() => flash('You’re all caught up.')} aria-label="Notifications">♧<span className="notification-dot" /></button><button className="avatar header-avatar" onClick={() => flash('Profile settings are coming next.')}>AM</button></div></header>{selectedGroup ? <GroupInviteView group={selectedGroup} onBack={() => setSelectedGroup(null)} onNotice={flash} /> : tab === 'save' ? <SaveView groups={groups} onCreate={() => setCreationOpen(true)} onOpenGroup={setSelectedGroup} onNotice={flash} /> : tab === 'invest' ? <InvestView allocation={allocation} setAllocation={setAllocation} selectedStock={selectedStock} setSelectedStock={setSelectedStock} onNotice={flash} /> : <LearnView completed={completedLesson} onComplete={() => { setCompletedLesson(true); flash('Lesson marked complete.'); }} />}</div>{notice && <div className="toast">{notice}</div>}{creationOpen && <CreateAjoFlow onClose={() => setCreationOpen(false)} onCreated={createGroup} />}</main>;
}
