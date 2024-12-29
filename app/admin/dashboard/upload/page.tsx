import { Loading } from '@/app/components';
import Uploads from '@/app/components/AdminDashboard/Uploads';
import { Suspense } from 'react';

export default function Upload() {
  return (
    <main className="">
      <Suspense fallback={<Loading />}>
        <Uploads />
      </Suspense>
    </main>
  );
}
