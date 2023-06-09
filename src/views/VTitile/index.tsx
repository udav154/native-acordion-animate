import classnames from 'classnames'
import styles from './styles/index.module.scss'

const VTitle = ({ title, className = '' }) => {
    return (
      <p
        className={classnames({
          [styles.details__summary_title]: true,
          [className]: !!className
        })}
      >
        {title}
      </p>
    )
  }
  
  export default VTitle