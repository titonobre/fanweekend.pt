import emailTemplate from "../../data/templates/registration-email.md?raw";
import { SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_SUBJECT, MAIL_FROM_NAME, MAIL_FROM_ADDRESS } from "../env";

import { NameAndAddress, sendMail } from "./sendMail";

const smtpParams = {
  host: SMTP_HOST,
  user: SMTP_USER,
  pass: SMTP_PASS,
};

const subject = MAIL_SUBJECT;

const from = {
  name: MAIL_FROM_NAME,
  address: MAIL_FROM_ADDRESS,
};

export async function sendRegistrationMail(to: NameAndAddress) {
  const replacements = {
    NAME: to.name,
  };

  await sendMail(smtpParams, from, to, subject, emailTemplate, replacements);
}
