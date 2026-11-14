/**
 * Root application router.
 * Reads `phase` from the store and renders the correct screen.
 * No third-party router — phase is the entire navigation model.
 */

import { useStore } from './store/gameStore'
import MenuScreen from './screens/MenuScreen'
import OriginScreen from './screens/OriginScreen'
import HubScreen from './screens/HubScreen'
import CutsceneScreen from './screens/CutsceneScreen'
import MatchScreen from './screens/MatchScreen'
import TeamTalkScreen from './screens/TeamTalkScreen'
import PressConferenceScreen from './screens/PressConferenceScreen'
import NotificationStack from './components/ui/NotificationStack'
import LoadingOverlay from './components/ui/LoadingOverlay'

export default function App() {
  const phase = useStore(s => s.phase)
  const setPhase = useStore(s => s.setPhase)
  const loading = useStore(s => s.loading)

  return (
    <div className="relative w-full h-full overflow-hidden bg-noir-950 font-serif">
      {/* Phase router */}
      {phase === 'menu'      && <MenuScreen />}
      {phase === 'origin'    && <OriginScreen />}
      {phase === 'prologue'  && <CutsceneScreen />}
      {phase === 'hub'       && <HubScreen />}
      {phase === 'cutscene'  && <CutsceneScreen />}
      {phase === 'team_talk' && <TeamTalkScreen onComplete={() => setPhase('match')} />}
      {phase === 'match'     && <MatchScreen onFinish={() => setPhase('hub')} />}
      {phase === 'press'     && <PressConferenceScreen onComplete={() => setPhase('hub')} />}

      {/* Global overlays — always rendered on top */}
      <NotificationStack />
      {loading && <LoadingOverlay />}
    </div>
  )
}
