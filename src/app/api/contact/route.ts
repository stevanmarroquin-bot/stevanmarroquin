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

    const nombre     = data.get('nombre') as string
    const whatsapp   = data.get('whatsapp') as string
    const correo     = data.get('correo') as string
    const descripcion = data.get('descripcion') as string
    const estilo     = data.get('estilo') as string
    const area       = data.get('area') as string
    const tamano     = data.get('tamano') as string
    const files      = data.getAll('referencias') as File[]

    const attachments = await Promise.all(
      files
        .filter((f) => f && f.size > 0)
        .map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
    )

    const row = (label: string, value: string) =>
      `<tr>
        <td style="padding:8px 0;color:#999;font-size:12px;white-space:nowrap;vertical-align:top;width:130px;">${label}</td>
        <td style="padding:8px 0 8px 16px;font-size:13px;color:#222;line-height:1.5;">${value || '—'}</td>
      </tr>`

    const html = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;padding:32px;border-radius:4px;">
        <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#bbb;margin:0 0 6px;">stevanmarroquin.com</p>
        <h2 style="font-size:20px;margin:0 0 24px;color:#111;font-weight:600;">Cita para Stevan · Tatuaje</h2>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;">
          ${row('Nombre', nombre)}
          ${row('WhatsApp', whatsapp)}
          ${row('Correo', `<a href="mailto:${correo}" style="color:#333;">${correo}</a>`)}
          ${row('Tatuaje', descripcion)}
          ${row('Estilo', estilo)}
          ${row('Área', area)}
          ${row('Tamaño', tamano)}
        </table>
        ${attachments.length > 0
          ? `<p style="margin-top:20px;font-size:12px;color:#999;">${attachments.length} imagen(es) adjunta(s).</p>`
          : ''}
      </div>
    `

    await transporter.sendMail({
      from: `"stevanmarroquin.com" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: correo,
      subject: `[Stevan] Solicitud de cita · ${nombre}`,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
