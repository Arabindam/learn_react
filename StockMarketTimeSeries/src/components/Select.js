import styles from "./select.module.css";
function Select({ value, options, onChange }) {
  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>{value.name}</span>
      <button className={styles.cross}>&times;</button>
      <span className={styles.column}></span>
      <span className={styles.caret}></span>
      <ul className={`${styles.options} ${styles.show}`}>
        {options.map((option, idx) => (
          <li key={idx} className={styles.option} onClick={e=>{
            e.stopPropagation()
            onChange(option)
          }}>{option.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
