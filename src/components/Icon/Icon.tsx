import icons from '../../assets/icons'
import styles from './Icon.module.scss'

export type IconName = keyof typeof icons

type Props = {
  name: IconName
  size?: number
  alt?: string
  className?: string
}

export default function Icon({ name, size = 20, alt, className }: Props){
  const src = icons[name]
  const cls = [styles.icon, className].filter(Boolean).join(' ')
  return <img src={src} alt={alt ?? name} width={size} height={size} className={cls} />
}