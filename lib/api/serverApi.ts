// import axios from 'axios';
// import { cookies } from 'next/headers';

// export const getMe = async (cookieStore: ReturnType<typeof cookies>) => {
//     const token = cookieStore.get('token')?.value;

//     const res = await axios.get(
//         process.env.NEXT_PUBLIC_API_URL + '/api/users/me',
//         {
//             headers: {
//                 Cookie: `token=${token}`,
//             },
//         }
//     );

//     return res.data;
// };

import axios from 'axios';
import { cookies } from 'next/headers';

export const getMe = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/api/users/me',
        {
            headers: {
                Cookie: `token=${token}`,
            },
        }
    );

    return res.data;
};