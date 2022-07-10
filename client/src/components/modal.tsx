import { ReactNode } from 'react';

type ModalProps = {
  isOpen?: boolean;
  content?: ReactNode;
  footer?: ReactNode;
};

const Modal = ({ isOpen, content, footer }: ModalProps) => {
  return (
    <div
      className={`relative z-10 ${
        isOpen
          ? 'visible opacity-100 duration-300 ease-out'
          : 'invisible opacity-0 duration-200 ease-in'
      }`}
    >
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
      />

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${
              isOpen
                ? 'translate-y-0 opacity-100 duration-300 ease-out sm:scale-100'
                : 'translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95'
            }`}
          >
            <div className='bg-white px-4 pt-5 pb-4 sm:flex sm:items-start sm:p-6 sm:pb-4'>
              <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
                {content}
              </div>
            </div>

            {footer ? (
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 w-full'>
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
export type { ModalProps };
