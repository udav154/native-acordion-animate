import classnames from 'classnames'
import styles from '../styles/index.module.scss'

const VSummary = ({ children, className = '', ...props }: any) => {
  return (
    <summary
      className={classnames({
        [styles.details__summary]: true,
        [className]: !!className
      })}
      {...props}
    >
      {children}
    </summary>
  )
}

export default VSummary
