import React, { useEffect, useRef, useState } from "react";
import IMask from "imask";

export type MaskedEvent = {
  value: any;
  name?: string;
};

type InputMask = {
  onAccept?: (
    event: MaskedEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => void;
  onComplete?: (
    event: MaskedEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  options: IMask.AnyMaskedOptions;
} & InputMask;

const MaskedInput: React.FC<Props> = ({
  options,
  onAccept,
  onComplete,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name } = props;
  const [mask, setMask] = useState<IMask.InputMask<
    IMask.AnyMaskedOptions
  > | null>(null);

  useEffect(() => {
    if (inputRef.current && !mask) {
      setMask(IMask(inputRef.current, { ...options }));
    }
  }, [mask, options]);

  useEffect(() => {
    if (inputRef.current) {
      if (mask) {
        if (onAccept) {
          mask.on("accept", () => {
            if (inputRef.current) {
              onAccept({ name, value: inputRef.current.value }, inputRef);
            }
          });
        }
        if (onComplete) {
          mask.on("complete", () => {
            if (inputRef.current) {
              onComplete({ name, value: inputRef.current.value }, inputRef);
            }
          });
        }
      }
    }
  }, [mask, name, onAccept, onComplete]);

  return <input ref={inputRef} {...props} />;
};

export default MaskedInput;
