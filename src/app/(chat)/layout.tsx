import { Channel, Sidebar } from "@/features/chat/components";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-row">
      {/* サイドバー */}
      <Sidebar />
      {/* チャンネルリスト */}
      <Channel />
      <div className="w-full">{children}</div>
    </div>
  );
}
