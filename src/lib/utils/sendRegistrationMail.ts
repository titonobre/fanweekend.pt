import emailTemplate from "@/documents/registration-email.md?raw";
import { env } from "@/env";

import { hydrateTemplate } from "./hydrate-template";
import { parseDocument } from "./parse-document";
import { type NameAndAddress, sendMail, type SMTPParams } from "./sendMail";

const smtpParams: SMTPParams = {
  host: env.SMTP_HOST,
  user: env.SMTP_USER,
  pass: env.SMTP_PASS,
};

const from: NameAndAddress = {
  name: env.MAIL_FROM_NAME,
  address: env.MAIL_FROM_ADDRESS,
};

function getSubject(frontmatter: Record<string, unknown>): string | undefined {
  if ("subject" in frontmatter && typeof frontmatter.subject === "string") {
    return frontmatter.subject;
  }
}

export async function sendRegistrationMail(to: NameAndAddress) {
  const replacements = {
    NAME: to.name,
  };

  const hydratedTemplate = hydrateTemplate(emailTemplate, replacements);

  const { html, plain: text, frontmatter } = await parseDocument(hydratedTemplate);

  const subject = getSubject(frontmatter);

  await sendMail(smtpParams, from, to, subject, { text, html });
}
