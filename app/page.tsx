import PostCard from '@/components/PostCard';

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <div className="min-w-350 m-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </main>
  );
}
