import { FriendCard } from '../components/FriendCard'
import { friends } from '../data/friends'
import { useLang } from '../i18n/useLang'

export function FriendsSection() {
  const { t } = useLang()
  return (
    <>
      <h2 className="section-title reveal">{t('friends.title')}</h2>
      <p className="section-subtitle reveal">{t('friends.subtitle')}</p>
      <div className="grid">
        {friends.map((f) => (
          <div key={f.slug} className="reveal">
            <FriendCard friend={f} />
          </div>
        ))}
      </div>
    </>
  )
}
