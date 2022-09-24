import { marked } from "marked";
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

export type TemplateReplacements = {
  [k: string]: string | undefined;
};

function formatNameAndAddress(nameAndAddress: NameAndAddress) {
  return `${nameAndAddress.name} <${nameAndAddress.address}>`;
}

export async function sendMail(
  smtpParams: SMTPParams,
  from: NameAndAddress,
  to: NameAndAddress,
  subject: string,
  emailTemplate: string,
  replacements: TemplateReplacements
) {
  const text = emailTemplate.replaceAll(/\{\{([A-Z_]+)\}\}/g, (match, group1: string) => {
    return (typeof group1 === "string" && replacements[group1]) || match;
  });

  const html = marked.parse(text);

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
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent: " + info.response);
}
