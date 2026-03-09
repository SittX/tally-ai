export interface Activity {
  id: string;
  accountName: string;
  type: "login" | "update" | "create" | "sync";
  description: string;
  timestamp: Date;
  details?: string;
}

export const getMockActivityData = (): Activity[] => {
  const now = new Date();
  return [
    {
      id: "1",
      accountName: "OpenAI Account",
      type: "sync",
      description: "Quota synchronized",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: "Monthly quota reset completed",
    },
    {
      id: "2",
      accountName: "Gemini Account",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      details: "Successful connection established",
    },
    {
      id: "3",
      accountName: "Cursor Account",
      type: "update",
      description: "Details updated",
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      details: "Subscription tier changed to Pro",
    },
    {
      id: "4",
      accountName: "OpenAI Account",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      details: "Last successful login",
    },
    {
      id: "5",
      accountName: "Cursor Account",
      type: "create",
      description: "Account created",
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      details: "New account added to dashboard",
    },
    {
      id: "6",
      accountName: "Gemini Account",
      type: "update",
      description: "Settings modified",
      timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      details: "API quota limits updated",
    },
    {
      id: "7",
      accountName: "OpenAI Account",
      type: "sync",
      description: "Quota synchronized",
      timestamp: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      details: "Automatic sync completed",
    },
    {
      id: "8",
      accountName: "Cursor Account",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      details: "Regular usage check",
    },
  ];
};
