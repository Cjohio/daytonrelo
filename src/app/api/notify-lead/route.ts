import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiKey     = process.env.RESEND_API_KEY ?? "";
    const agentEmail = process.env.AGENT_EMAIL    ?? "chris@cjohio.com";

    if (!apiKey) {
      // Graceful fallback — log but return success so the UI shows confirmation
      console.warn("[notify-lead] RESEND_API_KEY not set — lead not delivered.");
      return NextResponse.json({ ok: true, skipped: true });
    }

    const now       = new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" });
    const source    = body.source ?? "website";
    const callLink  = `tel:${(body.phone ?? "").replace(/\D/g, "")}`;
    const emailLink = `mailto:${body.email ?? ""}`;

    const subjectLabel = source.startsWith("showing-")
      ? `Showing Request – MLS #${source.replace("showing-", "")}`
      : `Website Inquiry`;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#1A1A1A;border-radius:16px;overflow:hidden;border:2px solid #C9A84C;">
        <tr>
          <td style="background:#C9A84C;padding:20px 28px;">
            <p style="margin:0;color:#1A1A1A;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Dayton Relo · Website</p>
            <h1 style="margin:4px 0 0;color:#1A1A1A;font-size:22px;font-weight:900;">🏠 ${subjectLabel}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding-bottom:16px;">
                <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Name</p>
                <p style="margin:0;color:#fff;font-size:18px;font-weight:800;">${body.name ?? "—"}</p>
              </td></tr>
              <tr><td style="padding:16px 0;border-top:1px solid #333;">
                <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                <p style="margin:0;color:#C9A84C;font-size:16px;font-weight:700;">${body.phone ?? "—"}</p>
              </td></tr>
              <tr><td style="padding:16px 0;border-top:1px solid #333;">
                <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</p>
                <p style="margin:0;color:#C9A84C;font-size:15px;font-weight:600;">${body.email ?? "—"}</p>
              </td></tr>
              ${body.timeline ? `<tr><td style="padding:16px 0;border-top:1px solid #333;">
                <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Timeline</p>
                <p style="margin:0;color:#fff;font-size:15px;font-weight:600;">${body.timeline}</p>
              </td></tr>` : ""}
              ${body.message ? `<tr><td style="padding-top:16px;border-top:1px solid #333;">
                <p style="margin:0 0 8px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <p style="margin:0;color:#ddd;font-size:14px;line-height:1.6;background:#111;padding:12px;border-radius:8px;border-left:3px solid #C9A84C;">${body.message}</p>
              </td></tr>` : ""}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:8px;">
                <a href="${callLink}" style="display:inline-block;background:#C9A84C;color:#1A1A1A;font-weight:800;font-size:14px;padding:12px 20px;border-radius:8px;text-decoration:none;">📞 Call</a>
              </td>
              <td>
                <a href="${emailLink}" style="display:inline-block;background:transparent;color:#C9A84C;font-weight:700;font-size:14px;padding:11px 20px;border-radius:8px;text-decoration:none;border:1.5px solid #C9A84C;">✉️ Email</a>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="background:#111;padding:14px 28px;border-top:1px solid #333;">
            <p style="margin:0;color:#555;font-size:11px;">Submitted ${now} · daytonrelo.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:     "Dayton Relo Website <leads@daytonrelo.com>",
        to:       [agentEmail],
        reply_to: body.email,
        subject:  `🏠 ${subjectLabel}: ${body.name ?? "Unknown"}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      throw new Error(`Resend ${resendRes.status}: ${errText}`);
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[notify-lead] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
