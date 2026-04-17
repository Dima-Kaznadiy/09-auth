

// import type { Metadata } from 'next';
// import { Roboto } from 'next/font/google';

// import './globals.css';

// import AuthProvider from '@/components/AuthProvider/AuthProvider';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
// import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   display: 'swap',
//   variable: '--font-roboto',
// });


// export const metadata: Metadata = {
//   title: 'NoteHub',
//   description: 'Manage your notes easily',
//   openGraph: {
//     title: 'NoteHub',
//     description: 'Manage your notes easily',
//     url: 'https://your-site.vercel.app',
//     images: [
//       {
//         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'NoteHub',
//       },
//     ],
//   },
// };

// export default function RootLayout({
//   children,
//   modal,
// }: {
//   children: React.ReactNode;
//   modal: React.ReactNode;
// }) {
//   return (
//     <html lang="en">

//       <body className={roboto.variable}>
//         <TanStackProvider>
//           <AuthProvider>
//             <Header />
//             {children}
//           </AuthProvider>
//         </TanStackProvider>

//         {/* modal portal */}
//         <div id="modal-root"></div>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your notes easily',
  openGraph: {
    title: 'NoteHub',
    description: 'Manage your notes easily',
    url: 'https://your-site.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            {children}


            {modal}


            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}