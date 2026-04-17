// import './layout.module.css';

// export default function FilterLayout({
//     children,
//     sidebar,
// }: {
//     children: React.ReactNode;
//     sidebar: React.ReactNode;
// }) {
//     return (
//         <div style={{ display: 'flex', gap: '20px' }}>
//             <aside>{sidebar}</aside>
//             <main>{children}</main>
//         </div>
//     );
// }

import css from "./layout.module.css";

export default function FilterLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <main className={css.notesWrapper}>{children}</main>
        </div>
    );
}