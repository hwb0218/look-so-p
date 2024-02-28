import React from 'react';

import { cn } from '@src/lib/utils';
import { Button, buttonVariants } from '@components/ui/button';

const ModalMain = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const ModalHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex items-center space-x-2 text-center sm:text-left', className)} {...props}>
      {children}
    </div>
  );
};

const ModalTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  );
};

const ModalDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props}>
      {children}
    </div>
  );
};

const ModalConfirm = ({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button className={cn(buttonVariants(), className)} {...props}>
      {children}
    </Button>
  );
};

const ModalCancel = ({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button className={cn(buttonVariants({ variant: 'outline' }), 'text-black mt-2 sm:mt-0', className)} {...props}>
      {children}
    </Button>
  );
};

const Modal = Object.assign(ModalMain, {
  Title: ModalTitle,
  Header: ModalHeader,
  Description: ModalDescription,
  Footer: ModalFooter,
  Confirm: ModalConfirm,
  Cancel: ModalCancel,
});

export default Modal;
