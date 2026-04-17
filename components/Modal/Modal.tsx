

// 'use client';

// import { useEffect, useState } from 'react';
// import { createPortal } from 'react-dom';
// import type { ReactNode } from 'react';
// import css from './Modal.module.css';

// interface ModalProps {
//     children: ReactNode;
//     onClose: () => void;
// }

// export default function Modal({ children, onClose }: ModalProps) {
//     const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

//     useEffect(() => {
//         setModalRoot(document.getElementById('modal-root'));

//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') onClose();
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'hidden';

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'auto';
//         };
//     }, [onClose]);

//     if (!modalRoot) return null;

//     return createPortal(
//         <div
//             className={css.backdrop}
//             onClick={(e) => {
//                 if (e.target === e.currentTarget) onClose();
//             }}
//         >
//             <div className={css.modal}>{children}</div>
//         </div>,
//         modalRoot
//     );
// }

'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children }: ModalProps) {
    const router = useRouter();

    // 🔥 закриття
    const handleClose = () => {
        router.back();
    };

    // 🔥 ESC + scroll lock
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, []);

    // 🔥 щоб не падало на SSR
    const modalRoot =
        typeof window !== 'undefined'
            ? document.getElementById('modal-root')
            : null;

    if (!modalRoot) return null;

    return createPortal(
        <div
            onClick={handleClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#fff',
                    padding: '20px',
                    margin: '100px auto',
                    width: '400px',
                    borderRadius: '8px',
                }}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
}