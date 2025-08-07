import { ChatInput } from '@/components/chat-input';

const Index = () => {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Handle message sending logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-xl font-semibold text-foreground">Chat Demo</h1>
        <div className="text-sm text-muted-foreground">
          Custom Chat Input Component
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Beautiful Chat Input
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            A modern, responsive chat input with auto-resize, keyboard shortcuts, and smooth animations.
          </p>
          
          {/* Demo features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="font-medium mb-1">Auto-resize</div>
              <div className="text-muted-foreground">Grows with your message</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="font-medium mb-1">Enter to send</div>
              <div className="text-muted-foreground">Shift+Enter for new line</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="font-medium mb-1">Smooth UI</div>
              <div className="text-muted-foreground">Beautiful animations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        placeholder="Type your message here..."
        maxLength={1000}
      />
    </div>
  );
};

export default Index;
