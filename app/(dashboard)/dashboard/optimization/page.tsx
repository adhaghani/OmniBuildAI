"use client";

import { useState } from "react";
import { 
  Conversation, 
  ConversationContent, 
  ConversationEmptyState,
  ConversationScrollButton 
} from "@/components/ai/conversation";
import { Message, MessageContent } from "@/components/ai/message";
import { 
  PromptInput, 
  PromptInputProvider, 
  PromptInputTextarea, 
  PromptInputSubmit 
} from "@/components/ai/prompt-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Droplets, 
  Leaf, 
  Zap, 
  ExternalLink,
  Book,
  Database,
  MapPin
} from "lucide-react";

interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const suggestedQueries = [
  { icon: Zap, text: "How to reach Gold status?", color: "text-yellow-500" },
  { icon: Droplets, text: "Improve water efficiency score", color: "text-blue-500" },
  { icon: Leaf, text: "Reduce embodied carbon", color: "text-green-500" },
  { icon: Zap, text: "Fix energy efficiency issues", color: "text-orange-500" },
];

const quickResources = [
  { icon: Book, text: "GBL 2019 Standard Guide", href: "#" },
  { icon: Database, text: "Material EPD Database", href: "#" },
  { icon: MapPin, text: "Local Supplier Directory", href: "#" },
];

export default function OptimizationPage() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your **Intelligent Optimization Assistant** powered by Gemini 1.5 Pro. I've analyzed your project "Nanning Office Tower" and identified several opportunities to improve your GBL 3-Star certification score.

**Current Status:**
- Overall Score: **76%** (Silver)
- Credits Achieved: **42/55**
- Gap to Gold: **6 more credits needed**

Would you like me to suggest specific improvements for any category?`,
      suggestions: [
        "Show water efficiency gaps",
        "Find local sustainable materials",
        "Optimize HVAC design"
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: { text: string; files: any[] }) => {
    const input = message.text;
    if (!input.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(input),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

//   temporary for demonstration purposes
  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("water") || lowerInput.includes("efficiency")) {
      return `Based on your project's current water efficiency metrics, here are the key areas for improvement:

**Water Efficiency Analysis:**
- Current Score: 8/12 points
- Gap to Gold: Need 3 more points

**Recommendations:**
1. **Install Water-Efficient Fixtures** (+1 point)
   - Low-flow faucets with aerators
   - Dual-flush toilets (3/6L)
   
2. **Rainwater Harvesting System** (+1.5 points)
   - Estimated savings: 30% reduction in potable water use
   - ROI: ~3-4 years
   
3. **Greywater Recycling** (+1 point)
   - Reuse for toilet flushing and irrigation
   - Compliance with local regulations needed

Would you like detailed specifications for any of these systems?`;
    }
    
    if (lowerInput.includes("gold") || lowerInput.includes("status")) {
      return `To reach **Gold status**, you need 6 more credits. Here's a strategic roadmap:

**Quick Wins (3-4 months):**
1. **Energy Monitoring System** (+2 credits)
   - Smart metering installation
   - Cost: ~$15,000
   
2. **Local Material Sourcing** (+1 credit)
   - Identify suppliers within 500km
   - Focus on structural materials
   
3. **Enhanced Commissioning** (+1 credit)
   - Third-party verification
   - Cost: ~$8,000

**Medium-term (6-8 months):**
4. **Green Roof Installation** (+2 credits)
   - 30% roof coverage minimum
   - Added benefits: insulation, stormwater management

**Total estimated investment:** $80,000-120,000
**Payback period:** 4-6 years through energy savings

Would you like me to create a detailed implementation timeline?`;
    }
    
    if (lowerInput.includes("carbon") || lowerInput.includes("embodied")) {
      return `Let's address the **embodied carbon** in your project:

**Current Status:**
- Embodied Carbon: 520 kgCO2e/m²
- Target for Gold: <450 kgCO2e/m²
- Reduction needed: 13.5%

**High-Impact Strategies:**

1. **Optimize Concrete Mix** (Save ~60 kgCO2e/m²)
   - Replace 30% cement with fly ash or slag
   - Use local aggregates
   
2. **Steel Specifications** (Save ~25 kgCO2e/m²)
   - Specify recycled content steel (>50%)
   - Reduce over-engineering by 10%
   
3. **Timber Where Possible** (Save ~15 kgCO2e/m²)
   - Interior partitions
   - Ceiling systems

**Tools Available:**
- Material EPD Database (see Quick Resources)
- Carbon calculator integration

Would you like specific product recommendations for any of these categories?`;
    }
    
    return `Thank you for your question! I'm analyzing your project data to provide specific recommendations for "${input}".

Based on your current certification progress:
- You're at **76% (Silver)** with 42/55 credits
- 6 more credits needed for Gold status
- Primary focus areas: Energy efficiency, Water management, Materials selection

I can help you with:
- Detailed gap analysis for any category
- Cost-benefit analysis of improvements
- Local supplier and material recommendations
- Compliance verification

What specific aspect would you like to explore further?`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage({ text: suggestion, files: [] });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <Card className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <CardHeader className="border-b px-6! pt-2! pb-4!">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Intelligent Optimization Assistant</CardTitle>
                <Badge variant="outline" className="mt-1">
                  Gemini 1.5 Pro
                </Badge>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
            <PromptInputProvider>
              <Conversation className="flex-1">
                <ConversationContent>
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      icon={<Sparkles className="h-8 w-8" />}
                      title="Start optimizing your project"
                      description="Ask me anything about improving your certification score"
                    />
                  ) : (
                    <>
                      {messages.map((message) => (
                        <Message key={message.id} from={message.role}>
                          <MessageContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {message.content.split('\n').map((line, i) => {
                                if (line.startsWith('**') && line.endsWith('**')) {
                                  return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
                                }
                                if (line.startsWith('# ')) {
                                  return <h1 key={i}>{line.slice(2)}</h1>;
                                }
                                if (line.startsWith('## ')) {
                                  return <h2 key={i}>{line.slice(3)}</h2>;
                                }
                                if (line.match(/^\d+\./)) {
                                  return <li key={i} className="pl-4">{line}</li>;
                                }
                                if (line.startsWith('- ')) {
                                  return <li key={i} className="pl-4 list-disc">{line.slice(2)}</li>;
                                }
                                return line ? <p key={i}>{line}</p> : <br key={i} />;
                              })}
                            </div>
                            
                            {message.suggestions && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </MessageContent>
                        </Message>
                      ))}
                      {isLoading && (
                        <Message from="assistant">
                          <MessageContent>
                            <div className="flex items-center p-4 gap-2">
                              <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                              <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                              <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                            </div>
                          </MessageContent>
                        </Message>
                      )}
                    </>
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>

              {/* Input */}
              <div className="border-t p-4">
                <PromptInput className="flex items-center" onSubmit={handleSendMessage}>
                  <PromptInputTextarea 
                    placeholder="Ask about optimizations, materials, or compliance strategies..."
                    rows={1}
                    disabled={isLoading}
                  />
                  <div className="p-4">
                  <PromptInputSubmit disabled={isLoading} />
                  </div>
                </PromptInput>
              </div>
            </PromptInputProvider>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="flex w-80 flex-col gap-4">
        {/* Suggested Queries */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Suggested Queries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQueries.map((query, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleSendMessage({ text: query.text, files: [] })}
              >
                <query.icon className={`mr-2 h-4 w-4 ${query.color}`} />
                {query.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Project Context */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Project Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs">Project</p>
              <p className="font-medium text-sm">Nanning Office Tower</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Standard</p>
              <p className="font-medium text-sm">China GBL 3-Star</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Current Score</p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">76% (Silver)</p>
                <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                  Silver
                </Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Gap to Gold</p>
              <p className="font-semibold text-orange-500 text-sm">6 credits</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Resources */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Quick Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickResources.map((resource, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full justify-start text-left"
                asChild
              >
                <a href={resource.href} target="_blank" rel="noopener noreferrer">
                  <resource.icon className="mr-2 h-4 w-4" />
                  {resource.text}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
