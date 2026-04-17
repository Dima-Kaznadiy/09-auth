


// 'use client';

// import { useRouter } from 'next/navigation';
// import { createNote } from '@/lib/api';
// import { useNoteStore } from '@/lib/store/noteStore';

// import css from './NoteForm.module.css';
// import { NoteTag } from '@/types/note';

// export default function NoteForm() {
//     const router = useRouter();

//     const { draft, setDraft, clearDraft } = useNoteStore();

//     // 🔥 submit
//     const handleSubmit = async (formData: FormData) => {
//         const newNote = {
//             title: formData.get('title') as string,
//             content: formData.get('content') as string,
//             tag: formData.get('tag') as NoteTag,
//         };

//         await createNote(newNote);

//         clearDraft(); // ✅ очищаємо draft
//         router.back(); // ✅ повертаємось назад
//     };

//     return (
//         <form action={handleSubmit} className={css.form}>
//             {/* TITLE */}
//             <input
//                 name="title"
//                 value={draft.title}
//                 onChange={(e) => setDraft({ title: e.target.value })}
//                 placeholder="Title"
//                 className={css.input}
//             />

//             {/* CONTENT */}
//             <textarea
//                 name="content"
//                 value={draft.content}
//                 onChange={(e) => setDraft({ content: e.target.value })}
//                 placeholder="Content"
//                 className={css.textarea}
//             />

//             {/* TAG */}
//             <select
//                 name="tag"
//                 value={draft.tag}
//                 onChange={(e) => setDraft({ tag: e.target.value })}
//                 className={css.select}
//             >
//                 <option value="Todo">Todo</option>
//                 <option value="Work">Work</option>
//                 <option value="Personal">Personal</option>
//                 <option value="Meeting">Meeting</option>
//                 <option value="Shopping">Shopping</option>
//             </select>

//             {/* BUTTONS */}
//             <div className={css.actions}>
//                 <button type="submit">Create</button>

//                 <button type="button" onClick={() => router.back()}>
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// }


'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

export default function NoteForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteStore();


    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['notes'] });

            clearDraft();
            router.back();
        },
    });


    const handleSubmit = (formData: FormData) => {
        const newNote = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as NoteTag,
        };

        mutation.mutate(newNote);
    };

    return (
        <form action={handleSubmit} className={css.form}>

            <input
                name="title"
                value={draft.title}
                onChange={(e) => setDraft({ title: e.target.value })}
                placeholder="Title"
                className={css.input}
            />


            <textarea
                name="content"
                value={draft.content}
                onChange={(e) => setDraft({ content: e.target.value })}
                placeholder="Content"
                className={css.textarea}
            />


            <select
                name="tag"
                value={draft.tag}
                onChange={(e) =>
                    setDraft({ tag: e.target.value as NoteTag })
                }
                className={css.select}
            >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </select>


            <div className={css.actions}>
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Creating...' : 'Create'}
                </button>

                <button type="button" onClick={() => router.back()}>
                    Cancel
                </button>
            </div>
        </form>
    );
}