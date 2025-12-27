import type { Contact } from "../types/profile.types";
import { t } from "../types/profile.types";

export const contact: Contact = {
  email: "talktorief@gmail.com",
  message: t(
    "Have an idea or tricky problem? Let’s discuss and ship a solid solution.",
    "Punya ide atau masalah sulit? Yuk diskusikan dan eksekusi solusinya."
  ),
  availabilityNote: t(
    "I usually reply within 1–2 business days. Happy to jump on a quick call if needed.",
    "Biasanya membalas dalam 1–2 hari kerja. Siap untuk panggilan singkat jika perlu."
  ),
};
