// export default function DefaultSidebar() {
//     return null;
// }

import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
    return (
        <ul className={css.menuList}>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={
                            tag === 'All'
                                ? '/notes/filter/all'
                                : `/notes/filter/${tag}`
                        }
                        className={css.menuLink}
                    >
                        {tag === 'All' ? 'All notes' : tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}