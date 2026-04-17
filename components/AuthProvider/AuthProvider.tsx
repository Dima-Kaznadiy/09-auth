// 'use client';

// import { useEffect } from 'react';
// import { checkSession } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';

// export default function AuthProvider({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const setUser = useAuthStore((state) => state.setUser);
//     const clear = useAuthStore((state) => state.clearIsAuthenticated);

//     useEffect(() => {
//         const fetchSession = async () => {
//             try {
//                 const data = await checkSession();
//                 setUser(data);
//             } catch {
//                 clear();
//             }
//         };

//         fetchSession();
//     }, [setUser, clear]);

//     return <>{children}</>;
// }

'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setUser = useAuthStore((state) => state.setUser);
    const clear = useAuthStore((state) => state.clearIsAuthenticated);

    useEffect(() => {
        const fetchSession = async () => {
            try {

                await checkSession();


                const user = await getMe();

                setUser(user);
            } catch {
                clear();
            }
        };

        fetchSession();
    }, [setUser, clear]);

    return <>{children}</>;
}