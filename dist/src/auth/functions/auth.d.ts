export declare const sendEmail: ({ to, subject, text, }: {
    to: string;
    text: string;
    subject: string;
}) => Promise<void>;
