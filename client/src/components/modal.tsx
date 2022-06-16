import { ReactNode } from 'react';
import { Icon } from '.';
import { isString } from '../utils';

type ModalProps = {
  isOpen?: boolean;
  header?: ReactNode | string;
  body?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
};

const Modal = ({ isOpen, header, body, footer, onClose }: ModalProps) => {
  return (
    <div
      className={`${
        isOpen ? '' : 'hidden'
      } overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center`}
    >
      <div className='relative w-full max-w-2xl px-4 h-full md:h-auto'>
        <div className='bg-white rounded-lg shadow relative'>
          <div className='flex items-start justify-between p-5 border-b rounded-t'>
            {isString(header) ? (
              <h3 className='text-gray-900 text-xl lg:text-2xl font-semibold'>
                {header}
              </h3>
            ) : (
              header
            )}
            <Icon icon='close' onClick={onClose} />
          </div>
          <div className='p-6 space-y-6'> {body}</div>
          {footer ? (
            <div className='flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b'>
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Modal };
export type { ModalProps };
