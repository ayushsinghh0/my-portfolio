import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only instantiate Resend if the API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // 1. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // 2. Check if Resend is configured
    if (!resend) {
      console.error('RESEND_API_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // 3. Send the email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // standard resend testing email
      to: ['ayushraj4820@gmail.com'],
      subject: 'New Portfolio Contact Message',
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
       console.error('Resend API Error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // 4. Return success
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (err: unknown) {
    console.error('Error in contact route:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'An unexpected error occurred.';

    return NextResponse.json(
      { error: errorMessage || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
