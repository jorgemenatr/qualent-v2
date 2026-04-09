"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Button } from "@/components/ui/button";

// Helper to extract text content from message parts
function getMessageContent(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

interface ChatInterfaceProps {
  initialMessage?: string;
}

export function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const t = useTranslations("Chat");

  const SUGGESTED_QUESTIONS = [
    t("suggestedQuestion1"),
    t("suggestedQuestion2"),
    t("suggestedQuestion3"),
    t("suggestedQuestion4"),
  ];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
  } = useChat({
    transport,
    messages: initialMessage
      ? [{ id: "initial", role: "user" as const, parts: [{ type: "text" as const, text: initialMessage }] }]
      : undefined,
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleFormSubmit = async () => {
    if (input.trim() && !isLoading) {
      const message = input;
      setInput("");
      await sendMessage({ text: message });
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold">{t("heading")}</h2>
            <p className="mt-2 text-center text-muted-foreground">
              {t("welcomeMessage")}
              <br />
              {t("welcomeSubMessage")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => {
              const role = message.role as "user" | "assistant";
              return (
                <ChatMessage
                  key={message.id}
                  role={role}
                  content={getMessageContent(message)}
                  isStreaming={
                    isLoading &&
                    message.id === messages[messages.length - 1]?.id &&
                    role === "assistant"
                  }
                />
              );
            })}

            {/* Error State */}
            {error && (
              <div className="my-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t("errorTitle")}
                  </p>
                  <p className="text-xs opacity-80">
                    {error.message || t("errorDefaultMessage")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => regenerate()}
                  className="shrink-0"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  {t("retryButton")}
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {t("disclaimerPrefix")}{" "}
          <Link href="/talk" className="text-primary hover:underline">
            {t("consultLink")}
          </Link>
          {t("disclaimerSuffix")}
        </p>
      </div>
    </div>
  );
}
