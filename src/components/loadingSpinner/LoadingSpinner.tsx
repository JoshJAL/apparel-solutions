import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  additionalClasses?: string;
}

export default function LoadingSpinner({ additionalClasses = ''}: LoadingSpinnerProps) {
  return (
    <span className={`${styles.loader} text-backgroundLightButtons dark:text-teal-600 ${additionalClasses}`}></span>
  );
}
