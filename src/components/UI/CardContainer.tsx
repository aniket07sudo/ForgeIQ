import type { ReactNode } from 'react'
import styles from './CardContainer.module.scss'

type Props = {
  children?: ReactNode
  className?: string
}

export function CardContainer({ children, className = '' }: Props){
  const cls = [styles.container, className].filter(Boolean).join(' ')
  return <div className={cls}>{children}</div>
}

export default CardContainer
