import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    const nombre = data.get('nombre') as string
    const email = data.get('email') as string
    const tipo = data.get('tipo') as string
    const mensaje = data.get('mensaje') as string
    const referencias = data.getAll('referencias') as File[]

    const tipoLabels: Record<string, string> = {
      tatuaje: 'Consulta de tatuaje',
      'cover-up': 'Cover-up',
      escritura: 'Sobre escritura',
      otro: 'Otro',
    }

    const attachments = await Promise.all(
      referencias
        .filter((f) => f && f.size > 0)
        .map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
    )

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; color: #222;">
        <h2 style="margin: 0 0 24px; font-size: 18px; font-weight: 600; color: #111;">
          Nuevo mensaje — stevanmarroquin.com
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; width: 110px;">Nombre</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #222;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #888;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #222;"><a href="mailto:${email}" style="color: #333;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #888;">Tipo</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #222;">${tipoLabels[tipo] ?? tipo}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; vertical-align: top;">Mensaje</td>
            <td style="padding: 10px 0; font-size: 14px; color: #222; line-height: 1.6;">${mensaje.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        ${attachments.length > 0 ? `<p style="margin-top: 16px; font-size: 12px; color: #888;">${attachments.length} imagen(es) adjunta(s).</p>` : ''}
      </div>
    `

    await transporter.sendMail({
      from: `"stevanmarroquin.com" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[stevanmarroquin.com] ${tipoLabels[tipo] ?? tipo} — ${nombre}`,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
