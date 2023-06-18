import { createTransport } from "nodemailer";

type MailOptions = Parameters<ReturnType<typeof createTransport>["sendMail"]>[0];

export type SMTPParams = {
  host: string;
  user: string;
  pass: string;
};

export type NameAndAddress = {
  name: string;
  address: string;
};

function formatNameAndAddress(nameAndAddress: NameAndAddress) {
  return `${nameAndAddress.name} <${nameAndAddress.address}>`;
}

export async function sendMail(
  smtpParams: SMTPParams,
  from: NameAndAddress,
  to: NameAndAddress,
  subject: string | undefined,
  body: { text?: string; html?: string },
) {
  const transporter = createTransport({
    host: smtpParams.host,
    secure: true,
    auth: {
      user: smtpParams.user,
      pass: smtpParams.pass,
    },
  });

  const mailOptions: MailOptions = {
    from: formatNameAndAddress(from),
    to: formatNameAndAddress(to),
    bcc: formatNameAndAddress(from),
    subject: subject,
    text: body.text,
    html: body.html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}
