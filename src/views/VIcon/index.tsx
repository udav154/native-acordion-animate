import classnames from 'classnames'
import styles from './styles/index.module.scss'
import icons from './icons'

const VIcon = ({ type = 'IconArrow', className = '' }) => {
  const icon = icons?.[type]() || null

  return (
    <div
      className={classnames({
        [styles.details__summary_icon]: true,
        [className]: !!className
      })}
    >
      {icon}
    </div>
  )
}


export default VIcon