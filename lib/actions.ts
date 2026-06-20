'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import type { ReactElement } from 'react'

type ContactFormInputs = z.infer<typeof ContactFormSchema>

// Log if API key exists
console.log('🔑 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
console.log('🔑 RESEND_API_KEY starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'))

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  console.log('📨 sendEmail called with:', { name: data.name, email: data.email })
  
  // Validate the data
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    console.log('❌ Validation failed:', result.error.format())
    return { 
      error: 'Invalid form data', 
      details: result.error.format() 
    }
  }

  const { name, email, message } = result.data
  console.log('✅ Validation passed')

  try {
    console.log('📧 Attempting to send email...')
    
    // Send the email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio <bezawitnisrane23@gmail.com>',
      to: ['Bezawitnisrane23@gmail.com'],
      cc: ['Bezawitnisrane23@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      react: ContactFormEmail({ name, email, message }) as ReactElement
    })

    console.log('📬 Resend response:', { emailData, error })

    if (error) {
      console.error('❌ Resend error:', error)
      return { 
        error: error.message || 'Failed to send email' 
      }
    }

    console.log('✅ Email sent successfully!')
    return { success: true }

  } catch (error) {
    console.error('❌ Catch block error:', error)
    return { 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }
  }
}