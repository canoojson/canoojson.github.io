import { profile } from '../data/profile'
import { games, steamStore } from '../data/games'
import { useLang } from '../i18n/useLang'

export function Games() {
  const { t } = useLang()
  return (
    <div className="games">
      <div className="block-header">
        <h4 className="label">{t('games.title')}</h4>
        {profile.steam && (
          <a href={profile.steam} target="_blank" rel="noreferrer" className="block-link">
            {t('games.steam')} →
          </a>
        )}
      </div>
      <ul className="game-grid">
        {games.map((g) => (
          <li key={g.appId}>
            <a href={steamStore(g.appId)} target="_blank" rel="noreferrer" title={g.name}>
              <img src={g.image} alt={g.name} loading="lazy" width={460} height={215} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
