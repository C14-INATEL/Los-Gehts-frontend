import os
import smtplib
from email.mime.text import MIMEText

def main():
    email_to = os.environ.get("EMAIL_TO")  # Destinatário do e-mail
    smtp_server = os.environ.get("SMTP_SERVER")  # Servidor SMTP padrão
    smtp_port = int(os.environ.get("SMTP_PORT"))  # Porta SMTP padrão
    smtp_user = os.environ.get("SMTP_USER")  # Usuário SMTP
    smtp_pass = os.environ.get("SMTP_PASS")  # Senha SMTP

    if not email_to:
        # Destinatário do e-mail obrigatório
        raise RuntimeError("Variável de ambiente EMAIL_TO não definida.")
    if not smtp_user or not smtp_pass:
        # Credenciais SMTP obrigatórias
        raise RuntimeError("Variáveis SMTP_USER/SMTP_PASS não definidas.")

    body = "Pipeline executado com sucesso!"  # Corpo do e-mail
    subject = "Status do pipeline Jenkins"  # Assunto do e-mail

    recipients = [email.strip() for email in email_to.split(",")] # Múltiplos destinatários separados por vírgula

    # Configura o e-mail
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = ", ".join(recipients)

    # Envia o e-mail via SMTP
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)

    print(f"E-mail enviado para {', '.join(recipients)} com sucesso.")


if __name__ == "__main__":
    main()
