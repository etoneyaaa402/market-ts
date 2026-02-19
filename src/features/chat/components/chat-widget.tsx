import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, isConnected } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {isOpen ? (
        <Card className="w-80 h-[450px] flex flex-col shadow-2xl border-none rounded-[24px] overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-[#e67e7e] text-white p-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400" : "bg-slate-400")} />
              Support Echo Bot
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2 opacity-60">
                <MessageCircle className="h-8 w-8" />
                <p className="text-xs font-medium">Say hello to our echo bot!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                  msg.sender === 'user' ? "bg-[#e67e7e] text-white rounded-br-none" : "bg-white text-slate-800 shadow-sm rounded-bl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>

          <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
            <Input 
              placeholder="Type a message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="rounded-full bg-slate-100 border-none"
            />
            <Button type="submit" size="icon" className="rounded-full bg-[#e67e7e] shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#e67e7e] hover:bg-[#d66e6e] shadow-lg shadow-red-200"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}