export const sendWelcomeEmail = async (to: string, name: string): Promise<boolean> => {
    console.log(`[EmailService] Preparing to send welcome email to ${to}...`);

    // Simulate network delay to mimic real SMTP transport
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate Nodemailer transport logging
    console.log(`
%c[MOCK NODEMAILER TRANSPORT] Email Sent Successfully
----------------------------------------
From: "WebApp Store Team" <no-reply@webappstore.com>
To: "${name}" <${to}>
Subject: Welcome to WebApp Store Vendor Portal!

Hello ${name},

Welcome to the WebApp Store Vendor Portal! We are excited to have you on board.
You can now start uploading your apps and managing your portfolio.

Best Regards,
The WebApp Store Team
----------------------------------------
    `, 'color: #4ade80; font-weight: bold;');

    return true;
};
