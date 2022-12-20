import { PropsWithChildren } from "react";
import styles from "./accordion.module.css";

interface AccordionType {
  title?: string;
}
const Accordion = ({ title, children }: PropsWithChildren<AccordionType>) => {
  return (
    <>
      <details className={styles.accordionContainer}>
        <summary className={styles.accordionTitle}>{title}</summary>
        <div className={styles.AccordionContentContainer}>{children}</div>
      </details>
    </>
  );
};

export default Accordion;
