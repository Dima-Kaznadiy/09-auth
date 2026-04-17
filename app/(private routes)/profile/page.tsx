import { cookies } from 'next/headers';
import { getMe } from '@/lib/api/serverApi';

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const data = await getMe(cookieStore);

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {data.email}</p>
            <p>Username: {data.username}</p>
            <img src={data.avatar} alt="avatar" width={100} />
        </div>
    );
}