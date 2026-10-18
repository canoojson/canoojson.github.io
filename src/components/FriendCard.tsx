import { domain, type Friend } from '../data/friends'
import { socialIcons } from '../data/socialIcons'
import { useLang } from '../i18n/useLang'

/** Toda la tarjeta lleva a la web del amigo; las píldoras de redes quedan por encima con sus propios enlaces. */
export function FriendCard({ friend }: { friend: Friend }) {
  const { lang, t } = useLang()
  const fit = friend.imageFit ?? 'cover'
  return (
    <article className="card friend-card">
      <div className={`media media-${fit}`}>
        <img src={friend.images[0]} alt="" loading="lazy" width={1600} height={900} />
      </div>
      <div className="card-body">
        <h3>
          <a href={friend.url} target="_blank" rel="noreferrer" title={t('friends.visit')}>
            {friend.name[lang]}
          </a>
        </h3>
        <span className="friend-domain">{domain(friend.url)} ↗</span>
        <p>{(friend.longSummary ?? friend.summary)[lang]}</p>
        <ul className="socials">
          {friend.socials.map(({ network, url }) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={socialIcons[network].path} />
                </svg>
                {socialIcons[network].label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
