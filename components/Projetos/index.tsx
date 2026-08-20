import { useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Member, Tutor } from "../../types/types";
import styles from "./projetos.module.css";
import { GitHub, LinkedIn, Mail } from "@mui/icons-material";

async function copyEmailToClipboard(email: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      /* tenta fallback abaixo */
    }
  }
  if (typeof document === "undefined") return false;
  const ta = document.createElement("textarea");
  ta.value = email;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
  return ok;
}

function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (!email?.trim()) return null;

  const handleClick = async () => {
    const ok = await copyEmailToClipboard(email.trim());
    if (ok) setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.socialLink} ${className ?? ""}`}
        title="Copiar e-mail"
        aria-label="Copiar e-mail para a área de transferência"
        onClick={() => void handleClick()}
      >
        <Mail fontSize="small" />
      </button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          E-mail copiado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
  className,
}: {
  href?: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  if (!href?.trim()) return null;

  return (
    <a
      href={href}
      className={`${styles.socialLink} ${className ?? ""}`}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function memberKey(member: Member) {
  return member.id ?? (member as Member & { _id?: string })._id ?? member.email;
}

function tutorKey(tutor: Tutor) {
  return tutor.id ?? (tutor as Tutor & { _id?: string })._id ?? tutor.nome;
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className={styles.memberCard}>
      <div className={styles.avatarWrap}>
        <img
          src={member.urlImg}
          alt={`Foto de ${member.nome}`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.personName}>{member.nome}</h3>
        {member.role ? <p className={styles.personRole}>{member.role}</p> : null}
        <div className={styles.socialRow}>
          <CopyEmailButton
            email={member.email}
            className={styles.socialMail}
          />
          <SocialLink
            href={member.github}
            label={`GitHub de ${member.nome}`}
            className={styles.socialGithub}
          >
            <GitHub fontSize="small" />
          </SocialLink>
          <SocialLink
            href={member.linkedin}
            label={`LinkedIn de ${member.nome}`}
            className={styles.socialLinkedin}
          >
            <LinkedIn fontSize="small" />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <article className={styles.tutorCard}>
      <div className={styles.tutorAccent} aria-hidden="true" />
      <div className={styles.avatarWrap}>
        <img
          src={tutor.urlImg}
          alt={`Foto de ${tutor.nome}`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.personName}>{tutor.nome}</h3>
        <div className={styles.socialRow}>
          <CopyEmailButton email={tutor.email} className={styles.socialMail} />
          <SocialLink
            href={tutor.linkedin}
            label={`LinkedIn de ${tutor.nome}`}
            className={styles.socialLinkedin}
          >
            <LinkedIn fontSize="small" />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}

export function ProjectMembersGrid({ items }: { items: Member[] }) {
  return (
    <div className={styles.membersGrid}>
      {items.map((member) => (
        <MemberCard key={memberKey(member)} member={member} />
      ))}
    </div>
  );
}

export function ProjectTutorsGrid({ items }: { items: Tutor[] }) {
  return (
    <div className={styles.tutorsGrid}>
      {items.map((tutor) => (
        <TutorCard key={tutorKey(tutor)} tutor={tutor} />
      ))}
    </div>
  );
}
