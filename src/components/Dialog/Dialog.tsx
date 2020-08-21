import React from "react";
import { useDialogState } from "reakit/Dialog";

import * as S from "./Dialog.style";

const Dialog = ({ disclosure, ...props }) => {
  const dialog = useDialogState();
  return (
    <>
      {disclosure && (
        <S.DialogDisclosure
          {...dialog}
          ref={disclosure.ref}
          {...disclosure.props}
        >
          {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
        </S.DialogDisclosure>
      )}
      <S.DialogBackdrop {...dialog}>
        <S.Dialog {...dialog} {...props} />
      </S.DialogBackdrop>
    </>
  );
};

Dialog.useDialogState = useDialogState;
Dialog.Disclosure = React.forwardRef((props, ref) => (
  <S.DialogDisclosure {...props} ref={ref} />
));
Dialog.Dialog = ({ children, ...rest }) => (
  <S.DialogBackdrop {...rest}>
    <S.Dialog {...rest}>{children}</S.Dialog>
  </S.DialogBackdrop>
);

export default Dialog;
