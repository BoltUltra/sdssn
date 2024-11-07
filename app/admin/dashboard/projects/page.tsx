import { Loading } from '@/app/components';
import Project from '@/app/components/AdminDashboard/Project';
import { Suspense } from 'react';

export default function Projects() {
  return (
    <main className="">
      <Suspense fallback={<Loading />}>
        <Project />
      </Suspense>
    </main>
  );
}
