import styles from './button.module.css';
export default function Button({onClick, children}) {
  return (
    <button
    className={styles.myButton}
   onClick={onClick}
  >
            {children}
  </button>
  )
}
