import clsx from "clsx";
import { PropsWithChildren, RefAttributes } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styles from "./anchor.module.css";

interface AnchorType extends RefAttributes<HTMLAnchorElement> {
  contrast?: boolean;
  outline?: boolean;
  muted?: boolean;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const Anchor = ({
  children,
  className,
  muted,
  external,
  contrast,
  outline,
  role,fullWidth,
  ...props
}: PropsWithChildren<NavLinkProps & AnchorType>) => {
  const AnchorComponent = external ? SimpleAnchor : NavLink;
  return (
    <>
      <AnchorComponent
        className={clsx(
          !role && styles.anchor,
          outline && "outline",
          contrast && "outline",
          muted && "secondary",
          fullWidth && styles.fullWidth,
          className
        )}
        role={role}
        {...props}
      >
        {children}
      </AnchorComponent>
    </>
  );
};

export default Anchor;

const SimpleAnchor = ({
  to,
  ...props
}: AnchorType & { to: NavLinkProps["to"] }) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to.toString()} {...props} />;
};
