import * as brevo from '@getbrevo/brevo';
import { IEmailService, ResetPasswordProps } from "../../contracts/services/email";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);

export class EmailService implements IEmailService {
  async resetPassword(props: ResetPasswordProps): Promise<void> {
    try {
      const { email, token } = props;
      const senderEmail = process.env.SENDER_EMAIL || '';
      const senderName = process.env.SENDER_NAME || 'WalletWise';
      const resetUrl = `${process.env.WEB_BASE_URL}/reset-password/${token}`;

      const sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.sender = { email: senderEmail, name: senderName };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.subject = "Redefinição de senha - WalletWise";
      sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <h2 style="color: #1e293b; text-align: center;">Redefinição de senha</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Olá! Recebemos uma solicitação para redefinir a senha da sua conta no <strong>WalletWise</strong>.
              Se foi você quem fez essa solicitação, clique no botão abaixo para escolher uma nova senha:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                style="background-color: #10b981; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">
                Redefinir Senha
              </a>
            </div>

            <p style="color: #64748b; font-size: 14px;">
              Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.
              O link expirará automaticamente após um período de tempo por motivos de segurança.
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">
            <p style="color: #94a3b8; font-size: 13px; text-align: center;">
              © WalletWise. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `;
      sendSmtpEmail.textContent = `
        Redefinição de senha - WalletWise

        Recebemos uma solicitação para redefinir sua senha.
        Se foi você, acesse o link abaixo para definir uma nova senha:

        ${resetUrl}

        Se não foi você, ignore este e-mail.
      `;

      await apiInstance.sendTransacEmail(sendSmtpEmail);

    } catch (err) {
      console.error("Erro ao enviar e-mail:", (err as Error).message);
    }
  }

  async activeAccount(email: string): Promise<void> {
    try {
      const senderEmail = process.env.SENDER_EMAIL || '';
      const senderName = process.env.SENDER_NAME || 'WalletWise';
      const activationUrl = `${process.env.WEB_BASE_URL}/active-account`;

      const sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.sender = { email: senderEmail, name: senderName };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.subject = "Ative sua conta - WalletWise";
      sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <h2 style="color: #1e293b; text-align: center;">Bem-vindo(a) ao WalletWise!</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Olá! Estamos muito felizes por ter você conosco.  
              Para começar a usar sua conta no <strong>WalletWise</strong>, basta clicar no botão abaixo e confirmar seu e-mail:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${activationUrl}" 
                style="background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">
                Ativar Minha Conta
              </a>
            </div>

            <p style="color: #64748b; font-size: 14px;">
              Se você não criou uma conta no WalletWise, pode ignorar este e-mail com segurança.
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">
            <p style="color: #94a3b8; font-size: 13px; text-align: center;">
              © WalletWise. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `;
      sendSmtpEmail.textContent = `
        Bem-vindo(a) ao WalletWise!

        Para ativar sua conta, acesse o link abaixo:

        ${activationUrl}

        Se você não criou uma conta, ignore este e-mail.
      `;

      await apiInstance.sendTransacEmail(sendSmtpEmail);

    } catch (err) {
      console.log((err as Error).message);
    }
  }
}