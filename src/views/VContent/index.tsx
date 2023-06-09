import classnames from 'classnames'
import styles from './styles/index.module.scss'

const VContent = ({ children, className = '' }) => {
    return (
      <div
        className={classnames({
          [styles.details__content]: true,
          [className]: !!className
        })}
      >
        {children}
      </div>
    )
  }

  export default VContent