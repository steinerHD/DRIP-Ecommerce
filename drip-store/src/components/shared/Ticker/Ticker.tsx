import styles from './Ticker.module.scss';

const messages = [
  'FREE SHIPPING OVER $150',
  'EASY RETURNS',
  'SUSTAINABLY MADE',
  'NEW SEASON DROP NOW LIVE',
];

const Ticker = () => {
  const repeated = [...messages, ...messages, ...messages];

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {repeated.map((msg, i) => (
          <span key={i} className={styles.item}>
            {msg} <span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;