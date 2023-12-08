import { ChatBox } from "@/features/chat/components";

export default function ChannelPage({ params }: { params: { channel: string } }) {
  const { channel } = params;
  console.log(channel);
  return (
    <div className="w-full pt-8 py-4 flex flex-col" style={{ height: "calc(100vh - 70px)" }}>
      {/* メッセージ */}
      <div className="w-full h-full">
        <div className="flex flex-col border-b-[1px] px-4 pb-8">
          {/* 初期メッセージ */}
          <h1 className="text-[32px] font-bold mb-4"># チャンネル1</h1>
          <p className="text-[16px] font-bold text-gray-400"># チャンネル1 チャンネルへようこそ！このチャンネルで色んな人とチャットして繋がろう！</p>
          {/* TODO: 色々説明加える!! */}
          {/* TODO: 色々説明加える!! */}
          {/* TODO: 色々説明加える!! */}
        </div>
      </div>
      <div className="w-full px-4">
        <ChatBox />
      </div>
    </div>
  );
}