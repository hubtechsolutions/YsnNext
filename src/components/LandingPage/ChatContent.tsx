"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { onSnapshot, getDoc, doc } from "firebase/firestore";
import { messagesForMatch, sendMatchMessage } from "@/lib/chat-service";
import ChatAuthGate from "@/components/chat/ChatAuthGate";

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  createdAt?: { seconds: number; nanoseconds: number };
};

export default function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useState<ChatMessage[]>(
    []
  );
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const matchId = "1"; // demo match id

  // Subscribe to match chat messages
  useEffect(() => {
    const q = messagesForMatch(matchId);
    const unsub = onSnapshot(q, async (snap) => {
      const msgs: ChatMessage[] = [];
      const newSenderIds: string[] = [];
      snap.forEach((d) => {
        const data = d.data();
        if (
          data.senderId &&
          !userNames[data.senderId] &&
          data.senderId !== auth.currentUser?.uid
        ) {
          newSenderIds.push(data.senderId);
        }
        msgs.push({
          id: d.id,
          senderId: data.senderId,
          text: data.text,
          createdAt: data.createdAt,
        });
      });
      // Fetch missing display names
      // Fetch missing display names using db (dynamic import to avoid circular refs in SSR)
      try {
        const missing = Array.from(new Set(newSenderIds));
        if (missing.length) {
          const nameMapUpdates: Record<string, string> = {};
          for (const uid of missing) {
            try {
              const { db } = await import("@/lib/firebase");
              const uSnap = await getDoc(doc(db, "users", uid));
              if (uSnap.exists()) {
                const data = uSnap.data() as { displayName?: string };
                if (data.displayName) nameMapUpdates[uid] = data.displayName;
              }
            } catch {
              /* ignore */
            }
          }
          if (Object.keys(nameMapUpdates).length) {
            setUserNames((prev) => ({ ...prev, ...nameMapUpdates }));
          }
        }
      } catch {
        /* ignore fetch names */
      }
      setMessages(msgs);
      // Clear optimistic (server now authoritative)
      if (msgs.length) setOptimisticMessages([]);
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    try {
      // optimistic
      setOptimisticMessages((prev) => [
        ...prev,
        {
          id: "temp-" + Date.now(),
          senderId: auth.currentUser?.uid || "me",
          text: trimmed,
        },
      ]);
      await sendMatchMessage(matchId, trimmed);
      setInput("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <ChatAuthGate>
      <div className="flex flex-col h-full min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 mb-4 pr-2">
          {[...messages, ...optimisticMessages].map((message) => {
            const isMe = auth.currentUser?.uid === message.senderId;
            const display = isMe
              ? "@you"
              : "@" + (userNames[message.senderId] || "user");
            return (
              <div key={message.id} className="flex gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ${
                    isMe
                      ? "bg-gradient-to-br from-purple-400 to-pink-500"
                      : "bg-gradient-to-br from-pink-400 to-purple-500"
                  }`}
                >
                  <Image
                    src="/ysnlogo.webp"
                    alt="user"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">
                      {display}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {message.createdAt
                        ? new Date(
                            message.createdAt.seconds * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed break-words">
                    {message.text}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center ">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Message"
            className="flex-1 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-400 rounded-xl h-12"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 px-4 h-10 rounded-xl"
          >
            <Send size={18} color="white" />
          </Button>
        </form>
      </div>
    </ChatAuthGate>
  );
}
