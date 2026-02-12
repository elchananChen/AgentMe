export type AskPortfolioAgentRequest = {
    question: string;
    settings?: {
        isShort?: boolean;
    };
};